import { useState, useEffect } from 'react'
import { SUBJECTS } from '../data'
import { ALL_MAPS, EDGE_CONFIG } from '../data/maps'
import type { MapNode, EdgeType } from '../data/maps'
import { TF_BANK, BOSS_BANK, KOMISE_BANK, ORAL_BANK } from '../data/trener-data'
import { SHRNUTI } from '../data/shrnuti-data'
import type { ShrnutiCard } from '../data/shrnuti-data'
import { DIPLOMA_HOOKS, KILLER_QUESTIONS, RESCUE_DECK } from '../data/gamifikace-data'
import type { KillerQuestion } from '../data/gamifikace-data'
import { HISTORICAL_ANSWER_TEMPLATES, HISTORICAL_SIGNAL_QUESTIONS, SZZ_SYLLABUS_TOPICS } from '../data/historicke-komise-data'
import type { HistoricalSignalQuestion, SignalExaminer, SignalSource } from '../data/historicke-komise-data'
import { useProgress } from '../hooks/useProgress'

type Mode = 'flashkarty' | 'tf' | 'quiz4' | 'edge' | 'oral' | 'komise' | 'boss' | 'mock' | 'sylabus' | 'killer20' | 'tahak' | 'historie' | 'auto' | 'duel' | 'confidence' | 'feynman' | 'blank' | 'last24' | 'smutny' | 'sos'
type NodeStatus = 'known' | 'unsure' | 'unknown'

const NODE_KEY = 'trener-nodes-v1'
const BOSS_KEY = 'trener-boss-v1'
const KILLER_KEY = 'trener-killer20-v1'
const HISTORIE_KEY = 'trener-historie-v1'
const WEAK_KEY = 'trener-auto-slabiny-v1'
const TIMER_SECS = 8
const ALL_EDGE_TYPES: EdgeType[] = ['je-soucasti','zavisi-na','kontrastuje-s','aplikuje-se-na','je-nadrzen','rozsiruje']
const SUBJECT_NAME: Record<string, string> = {
  ...Object.fromEntries(SUBJECTS.map(s => [s.id, s.label])),
  'přehled': 'Přehled',
}

function loadNS(): Record<string, NodeStatus> {
  try { const r = localStorage.getItem(NODE_KEY); if (r) return JSON.parse(r) } catch {}
  return {}
}
function saveNS(s: Record<string, NodeStatus>) {
  try { localStorage.setItem(NODE_KEY, JSON.stringify(s)) } catch {}
}
function loadBossDefeats(): Record<number, boolean> {
  try { const r = localStorage.getItem(BOSS_KEY); if (r) return JSON.parse(r) } catch {}
  return {}
}
function saveBossDefeats(d: Record<number, boolean>) {
  try { localStorage.setItem(BOSS_KEY, JSON.stringify(d)) } catch {}
}
function loadKillerDefeats(): Record<string, boolean> {
  try { const r = localStorage.getItem(KILLER_KEY); if (r) return JSON.parse(r) } catch {}
  return {}
}
function saveKillerDefeats(d: Record<string, boolean>) {
  try { localStorage.setItem(KILLER_KEY, JSON.stringify(d)) } catch {}
}
function loadHistorieWins(): Record<string, boolean> {
  try { const r = localStorage.getItem(HISTORIE_KEY); if (r) return JSON.parse(r) } catch {}
  return {}
}
function saveHistorieWins(d: Record<string, boolean>) {
  try { localStorage.setItem(HISTORIE_KEY, JSON.stringify(d)) } catch {}
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
function pickDistinct<T>(arr: T[], exclude: T, count: number): T[] {
  const pool = arr.filter(x => x !== exclude)
  const used = new Set<number>()
  const result: T[] = []
  while (result.length < Math.min(count, pool.length)) {
    const i = Math.floor(Math.random() * pool.length)
    if (!used.has(i)) { used.add(i); result.push(pool[i]) }
  }
  return result
}
function getDiplomaHook(subject: string): string {
  return DIPLOMA_HOOKS[subject] ?? DIPLOMA_HOOKS.default
}

const ALL_NODES: MapNode[] = (() => {
  const seen = new Set<string>()
  const out: MapNode[] = []
  for (const m of ALL_MAPS) for (const n of m.nodes) if (!seen.has(n.id)) { seen.add(n.id); out.push(n) }
  return out
})()
const NODE_BY_ID: Record<string, MapNode> = Object.fromEntries(ALL_NODES.map(n => [n.id, n]))
const RICH_NODES = ALL_NODES.filter(n => n.description.length > 30)

type RichEdge = { source: string; target: string; type: EdgeType; sourceLabel: string; targetLabel: string }
const ALL_RICH_EDGES: RichEdge[] = ALL_MAPS
  .flatMap(m => m.edges.map(e => ({
    source: e.source, target: e.target, type: e.type,
    sourceLabel: NODE_BY_ID[e.source]?.label ?? '',
    targetLabel: NODE_BY_ID[e.target]?.label ?? '',
  })))
  .filter(e => e.sourceLabel && e.targetLabel)

type DrillQuestion = {
  id: string
  subject: string
  title: string
  q: string
  modelAnswer: string
  hook: string
  followUp?: string
}

function cardToDrill(card: ShrnutiCard): DrillQuestion {
  const keyPoints = card.body.slice(0, 4).map((b, i) => `${i + 1}. ${b}`).join('\n')
  const contrast = card.contrast ? `\n\nKontrast: ${card.contrast}` : ''
  return {
    id: `shrnuti-${card.id}`,
    subject: card.subject,
    title: card.topic,
    q: `Vysvětlete: ${card.topic}`,
    modelAnswer: `${card.open}\n\n${keyPoints}\n\nHáček: ${card.gotcha}${contrast}`,
    hook: getDiplomaHook(card.subject),
  }
}

function killerToDrill(q: KillerQuestion): DrillQuestion {
  return {
    id: `killer-${q.id}`,
    subject: q.subject,
    title: q.title,
    q: q.q,
    modelAnswer: q.modelAnswer,
    hook: q.hook,
    followUp: q.followUp,
  }
}

const SYLLABUS_DRILL: DrillQuestion[] = SHRNUTI.map(cardToDrill)
const KILLER_DRILL: DrillQuestion[] = KILLER_QUESTIONS.map(killerToDrill)
const MIXED_DRILL: DrillQuestion[] = [...KILLER_DRILL, ...SYLLABUS_DRILL]

type AutoWeakItem = {
  id: string
  source: string
  subject: string
  title: string
  q: string
  modelAnswer: string
  hook: string
  followUp?: string
  misses: number
  wins: number
  lastMiss: number
  lastWin?: number
  nextReview: number
}

function loadWeakItems(): Record<string, AutoWeakItem> {
  try { const r = localStorage.getItem(WEAK_KEY); if (r) return JSON.parse(r) } catch {}
  return {}
}
function saveWeakItems(items: Record<string, AutoWeakItem>) {
  try { localStorage.setItem(WEAK_KEY, JSON.stringify(items)) } catch {}
}
function drillToWeak(q: DrillQuestion, source: string): AutoWeakItem {
  return {
    id: q.id,
    source,
    subject: q.subject,
    title: q.title,
    q: q.q,
    modelAnswer: q.modelAnswer,
    hook: q.hook,
    followUp: q.followUp,
    misses: 0,
    wins: 0,
    lastMiss: 0,
    nextReview: 0,
  }
}
function cardToWeak(card: ShrnutiCard): AutoWeakItem {
  return drillToWeak(cardToDrill(card), 'Sylabus run')
}
function historicalToWeak(q: HistoricalSignalQuestion): AutoWeakItem {
  return {
    id: `historie-${q.id}`,
    source: `Historický signál · ${q.examiner}`,
    subject: q.examiner,
    title: q.topic,
    q: q.question,
    modelAnswer: `${q.pattern}\n\n${q.modelAnswer}`,
    hook: q.practicalBridge,
    followUp: q.syllabusLink,
    misses: 0,
    wins: 0,
    lastMiss: 0,
    nextReview: 0,
  }
}
function registerWeakness(item: AutoWeakItem) {
  const now = Date.now()
  const items = loadWeakItems()
  const prev = items[item.id]
  items[item.id] = {
    ...item,
    misses: (prev?.misses ?? 0) + 1,
    wins: 0,
    lastMiss: now,
    lastWin: prev?.lastWin,
    nextReview: now,
  }
  saveWeakItems(items)
}
function registerWeakWin(id: string) {
  const now = Date.now()
  const items = loadWeakItems()
  const prev = items[id]
  if (!prev) return
  const wins = prev.wins + 1
  const delays = [15 * 60_000, 2 * 60 * 60_000, 8 * 60 * 60_000, 24 * 60 * 60_000, 48 * 60 * 60_000]
  items[id] = { ...prev, wins, lastWin: now, nextReview: now + delays[Math.min(wins - 1, delays.length - 1)] }
  saveWeakItems(items)
}
function weakStats() {
  const now = Date.now()
  const items = Object.values(loadWeakItems())
  return {
    total: items.length,
    due: items.filter(i => i.nextReview <= now).length,
    hot: items.filter(i => i.misses > i.wins).length,
  }
}
function autoFollowUp(item: AutoWeakItem): string {
  const base = [
    'Jak to jednou větou napojíš na praxi?',
    'Jaký je rozdíl oproti nejbližšímu podobnému pojmu?',
    'Kde je praktické riziko, když se to v organizaci zanedbá?',
    'Jak by ses bránil, kdyby komise řekla: tohle zní moc obecně?',
  ]
  const security = ['Kde je v tom identita, oprávnění, log nebo auditovatelnost?', 'Jak bys to vysvětlil přes CIA, riziko nebo kontrolu?']
  const social = ['Kdo jsou stakeholdeři a kde může vzniknout rezistence?', 'Proč to není čistě technický problém?']
  const systems = ['Kde jsou hranice systému a jaká je zpětná vazba?', 'Co je v tom model a co realita?']
  const extra =
    item.subject === '4SA313' || item.subject === 'Sedláček' ? security :
    item.subject === '4SA440' || item.subject === 'Smutný' ? social :
    item.subject === '4SA420' || item.subject === 'Sigmund' ? systems :
    []
  const pool = [...extra, ...base]
  const n = item.id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  return pool[n % pool.length]
}
function buildAutoDeck(): AutoWeakItem[] {
  const now = Date.now()
  const stored = Object.values(loadWeakItems())
  const due = stored
    .filter(i => i.nextReview <= now)
    .sort((a, b) => (b.misses - b.wins) - (a.misses - a.wins) || b.lastMiss - a.lastMiss)
  const fallbackWeak = stored
    .filter(i => i.nextReview > now)
    .sort((a, b) => (b.misses - b.wins) - (a.misses - a.wins))
    .slice(0, 4)
  const review = due.length ? due : fallbackWeak
  const fresh = shuffle([
    ...KILLER_DRILL.map(q => drillToWeak(q, 'Top 20 killer')),
    ...HISTORICAL_SIGNAL_QUESTIONS
      .filter(q => q.tags.includes('must_have') || q.tags.includes('surprise_basic') || q.tags.includes('defensive_basic'))
      .map(historicalToWeak),
    ...SYLLABUS_DRILL.map(q => drillToWeak(q, 'Sylabus')),
  ])
  const used = new Set(review.map(i => i.id))
  const fill = fresh.filter(i => !used.has(i.id)).slice(0, Math.max(0, 12 - review.length))
  return [...review, ...fill].slice(0, 12)
}

type Last24Priority = 'coverage' | 'weak' | 'killer' | 'history' | 'thesis'

type Last24Item = DrillQuestion & {
  source: string
  phase: string
  priority: Last24Priority
}

function toLast24Item(q: DrillQuestion, source: string, phase: string, priority: Last24Priority): Last24Item {
  return { ...q, source, phase, priority }
}

function weakToLast24(item: AutoWeakItem): Last24Item {
  return {
    id: item.id,
    subject: item.subject,
    title: item.title,
    q: item.q,
    modelAnswer: item.modelAnswer,
    hook: item.hook,
    followUp: item.followUp,
    source: item.source,
    phase: 'Červené slabiny',
    priority: 'weak',
  }
}

function historicalToLast24(q: HistoricalSignalQuestion): Last24Item {
  const weak = historicalToWeak(q)
  return {
    id: weak.id,
    subject: weak.subject,
    title: weak.title,
    q: weak.q,
    modelAnswer: weak.modelAnswer,
    hook: weak.hook,
    followUp: weak.followUp,
    source: `Komise · ${q.examiner}`,
    phase: 'Historický tlak',
    priority: 'history',
  }
}

function buildLast24Deck(): Last24Item[] {
  const coverage = SUBJECTS
    .filter(s => s.ready)
    .map(subject => {
      const pool = [...KILLER_DRILL, ...SYLLABUS_DRILL].filter(q => q.subject === subject.id)
      const picked = shuffle(pool)[0]
      return picked ? toLast24Item(picked, subject.id, 'Povinné pokrytí předmětů', 'coverage') : null
    })
    .filter((item): item is Last24Item => !!item)

  const used = new Set(coverage.map(i => i.id))
  const weak = Object.values(loadWeakItems())
    .sort((a, b) => (b.misses - b.wins) - (a.misses - a.wins) || b.lastMiss - a.lastMiss)
    .filter(i => !used.has(i.id))
    .slice(0, 4)
    .map(weakToLast24)
  weak.forEach(i => used.add(i.id))

  const historical = shuffle(HISTORICAL_SIGNAL_QUESTIONS.filter(q =>
    q.tags.includes('must_have') || q.tags.includes('surprise_basic') || q.tags.includes('defensive_basic')
  ))
    .map(historicalToLast24)
    .filter(i => !used.has(i.id))
    .slice(0, 4)
  historical.forEach(i => used.add(i.id))

  const killer = shuffle(KILLER_DRILL)
    .filter(i => !used.has(i.id))
    .slice(0, 4)
    .map(i => toLast24Item(i, 'Top 20 killer', 'Rozhodovací otázky', 'killer'))
  killer.forEach(i => used.add(i.id))

  const thesis = shuffle(SYLLABUS_DRILL.filter(i => i.subject === 'přehled' || i.hook.length > 80))
    .filter(i => !used.has(i.id))
    .slice(0, 2)
    .map(i => toLast24Item(i, 'Praxe most', 'Napojení na praxi', 'thesis'))

  return [...coverage, ...weak, ...historical, ...killer, ...thesis].slice(0, 24)
}

function last24WeakItem(item: Last24Item): AutoWeakItem {
  return {
    id: item.id,
    source: `Posledních 24h · ${item.phase}`,
    subject: item.subject,
    title: item.title,
    q: item.q,
    modelAnswer: item.modelAnswer,
    hook: item.hook,
    followUp: item.followUp,
    misses: 0,
    wins: 0,
    lastMiss: 0,
    nextReview: 0,
  }
}

function last24RescueIdeas(item: Last24Item): string[] {
  const rescue = RESCUE_DECK.flatMap(deck => deck.lines)
  const seed = item.id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  return [
    'Začni kostrou: definice → proč to existuje → rozdíl vůči podobnému pojmu → příklad → riziko nebo kontrola.',
    rescue[seed % rescue.length],
    `Převeď to na ERP/praxi: ${item.hook}`,
    item.followUp ? `Když komise tlačí: ${item.followUp}` : 'Když komise tlačí, řekni hranici pojmu a ukaž praktický příklad místo hádání detailu.',
  ]
}

type SmutnyPackItem = {
  id: string
  lane: string
  topic: string
  question: string
  expectedMove: string
  answer: string
  trap: string
  practicalBridge: string
  followUps: string[]
}

const SMUTNY_ATTACK_PACK: SmutnyPackItem[] = [
  {
    id: 'smutny-socio-not-tech',
    lane: 'Sociotechnika',
    topic: 'Praxe jako sociotechnický systém',
    question: 'Kdybych řekl, že vaše praxe je jen technická optimalizace ERP, jak se obhájíte?',
    expectedMove: 'Odmítni technický determinismus a ukaž technickou, organizační i sociální vrstvu.',
    answer: 'Řekl bych, že ERP je technický artefakt, ale problém optimalizace je sociotechnický. Technická vrstva je systém, data, workflow a integrace. Sociální vrstva jsou role, odpovědnosti, zvyklosti uživatelů, procesní vlastnictví a akceptace změny. Pokud změním jen konfiguraci a nevyjasním, kdo co dělá a podle jakých pravidel, výsledek se v praxi neudrží.',
    trap: 'Nespadnout do odpovědi “nastavím ERP a bude hotovo”. Smutný chce slyšet lidi, role, normy, rezistenci a kontext.',
    practicalBridge: 'Praktická aplikace proto řeší AS-IS/TO-BE proces, stakeholdery, data, kontroly a governance, ne jen transakce v ERP.',
    followUps: ['Kdo jsou sociální skupiny v tom procesu?', 'Kde se může objevit rezistence?', 'Co by se stalo, kdyby organizace nepřijala TO-BE proces?'],
  },
  {
    id: 'smutny-kling-social-informatics',
    lane: 'Sociální informatika',
    topic: 'Kling a sociální informatika',
    question: 'Co je sociální informatika a proč se vůbec týká podnikových systémů?',
    expectedMove: 'Definice → ICT v sociálním kontextu → podnikový příklad → diplomka.',
    answer: 'Sociální informatika studuje ICT v sociálním a organizačním kontextu. Neptá se jen, jak technologie funguje, ale jak mění práci, komunikaci, odpovědnosti, rozhodování a mocenské vztahy. Podnikový systém jako ERP je typický příklad, protože formálně nastavuje role, datové toky a kontrolní body, ale reálně funguje až ve spojení s uživateli a organizačními pravidly.',
    trap: 'Neříct jen “informatika plus společnost”. Je potřeba ukázat vzájemné ovlivňování technologie a organizace.',
    practicalBridge: 'Optimalizace ERP procesu je zásah do sociotechnického systému organizace, takže spadá přímo do logiky sociální informatiky.',
    followUps: ['Jaký je rozdíl proti čistě technickému pohledu?', 'Kde v ERP vidíte mocenský nebo organizační aspekt?', 'Jak byste měřil dopad na uživatele?'],
  },
  {
    id: 'smutny-productivity-paradox',
    lane: 'Produktivita',
    topic: 'Paradox produktivity',
    question: 'Proč investice do ICT nemusí zvýšit produktivitu?',
    expectedMove: 'Solow → komplementární změny → špatný proces → metriky.',
    answer: 'Paradox produktivity říká, že investice do ICT se nemusí automaticky projevit v produktivitě. Technologie sama nestačí, protože přínos vzniká až se změnou procesu, datové kvality, kompetencí, odpovědností a metrik. Pokud automatizujeme špatný nebo nejasný proces, jen zrychlíme chyby a přesuneme problém jinam.',
    trap: 'Neudělat z ICT magické řešení. Smutný bude tlačit na sociální a organizační podmínky přínosu.',
    practicalBridge: 'V praxi proto nejdřív analyzuji AS-IS, vlastnictví procesu, chybovost a ruční zásahy; automatizace je až navazující krok.',
    followUps: ['Jak poznáte, že přínos opravdu nastal?', 'Jaké metriky byste sledoval?', 'Co je komplementární organizační změna?'],
  },
  {
    id: 'smutny-dsr-validation',
    lane: 'Metodologie',
    topic: 'DSR a evaluace artefaktu',
    question: 'Jak víte, že váš navržený artefakt není jen hezká tabulka, ale dává smysl v praxi?',
    expectedMove: 'DSR → artefakt → evaluace → omezení.',
    answer: 'V DSR nestačí artefakt navrhnout, musí se také demonstrovat a evaluovat. U procesního a governance rámce bych evaluaci postavil na expertním posouzení, walkthrough s klíčovými uživateli, porovnání proti požadavkům z AS-IS fáze a metrikách typu čas, chybovost, ruční zásahy nebo úplnost dat. Zároveň bych jasně řekl omezení: bez plného pilotu nejde tvrdit kompletní kauzální dopad.',
    trap: 'Nepředstírat tvrdou kauzalitu, pokud máš hlavně návrh a validaci. Lepší je přesně vymezit sílu důkazu.',
    practicalBridge: 'Moje práce je návrhová: vytváří použitelný artefakt a ověřuje jeho smysluplnost vůči reálnému ERP kontextu.',
    followUps: ['Jaký typ artefaktu jste vytvořil?', 'Co je rozdíl mezi validací a evaluací?', 'Co by byl další krok po praxi?'],
  },
  {
    id: 'smutny-stakeholders-values',
    lane: 'Stakeholdeři',
    topic: 'Zájmy, hodnoty, normy',
    question: 'Kde v optimalizaci ERP vidíte zájmy, hodnoty a normy sociálních skupin?',
    expectedMove: 'Vyjmenuj skupiny → jejich cíle → konflikt → governance.',
    answer: 'IT může preferovat čisté a standardní řešení, finance spolehlivé uzávěrky a kontrolu, management měřitelné přínosy a uživatelé jednoduchost práce. Tyto skupiny mohou stejný ERP proces hodnotit jinak. Proto procesní optimalizace není jen hledání technicky nejlepší varianty, ale vyjednání udržitelného řešení, kde jsou jasné role, odpovědnosti, pravidla a kontrolní body.',
    trap: 'Nezůstat u obecného “stakeholdeři jsou důležití”. Je potřeba pojmenovat konkrétní skupiny a konflikt.',
    practicalBridge: 'V praxi to sedí na stakeholder analýzu, process ownership a akceptaci TO-BE návrhu.',
    followUps: ['Kdo je owner procesu?', 'Kdo může změnu blokovat?', 'Jak byste zapojil uživatele do návrhu?'],
  },
  {
    id: 'smutny-data-knowledge',
    lane: 'Informace',
    topic: 'Data, informace, znalost',
    question: 'Jaký je rozdíl mezi daty, informací a znalostí v ERP reportingu?',
    expectedMove: 'DIKW → kontext → interpretace → rozhodnutí.',
    answer: 'Data jsou zaznamenaná fakta, například čísla transakcí nebo stavy dokladů. Informace vzniká zasazením dat do kontextu, například že určitý typ faktur má zvýšenou chybovost. Znalost je schopnost informaci interpretovat a použít pro rozhodnutí, třeba změnit kontrolní bod nebo vlastnictví kmenových dat. Stejný report může mít pro různé role jiný význam.',
    trap: 'Neříct jen definice. Musí tam být interpretace a rozhodovací situace.',
    practicalBridge: 'Praxe není jen o získání ERP dat, ale o tom, jak z nich udělat podklad pro zlepšení procesu.',
    followUps: ['Kdo rozhoduje nad těmi informacemi?', 'Co je informační potřeba?', 'Jak poznáte kvalitu informace?'],
  },
  {
    id: 'smutny-ai-llm',
    lane: 'AI a etika',
    topic: 'LLM bez vědomí',
    question: 'Proč LLM může působit chytře, ale nemá vědomí ani odpovědnost?',
    expectedMove: 'Predikce textu → bez zkušenosti → riziko halucinací → governance.',
    answer: 'LLM generuje pravděpodobné pokračování textu podle vzorů v datech. Nemá subjektivní zkušenost, intencionalitu, odpovědnost ani vlastní porozumění ve smyslu člověka. Proto může vytvořit přesvědčivou, ale chybnou odpověď. V podnikovém kontextu je nutné mít zdroje, validaci, auditovatelnost a člověka odpovědného za kritická rozhodnutí.',
    trap: 'Neantropomorfizovat. Neříkat, že “AI ví”. Říkat model, výstup, validace, odpovědnost.',
    practicalBridge: 'V ERP kontextu by AI mohla pomáhat s dokumentací nebo návrhy, ale rozhodnutí o procesu a riziku zůstává na organizaci.',
    followUps: ['Jak byste omezil halucinace?', 'Kdy je AI v podniku riziková?', 'Jak do toho vstupuje etika?'],
  },
  {
    id: 'smutny-for-nonprogrammer',
    lane: 'Obranný základ',
    topic: 'FOR cyklus bez kódu',
    question: 'Vysvětlete FOR cyklus člověku, který neumí programovat, a řekněte typickou chybu.',
    expectedMove: 'Bez kódu → opakování nad seznamem → off-by-one → ERP proces.',
    answer: 'FOR cyklus je instrukce: opakuj stejný postup pro každou položku v seznamu nebo po daný počet opakování. Například vezmi každý řádek faktury a zkontroluj cenu. Typická chyba je off-by-one, kdy cyklus projde o jednu položku méně nebo více. Princip je důležitý i mimo programování, protože procesy v organizaci mají podobně kroky, podmínky a opakování.',
    trap: 'Neutopit se v syntaxi. Smutný chce neprogramátorské, srozumitelné vysvětlení.',
    practicalBridge: 'ERP proces lze číst podobně: kroky, výjimky, opakování nad doklady a kontrolní body.',
    followUps: ['Co je podmínka v procesu?', 'Jak byste vysvětlil O(n)?', 'Kde v ERP vzniká chyba z opakování?'],
  },
  {
    id: 'smutny-csv-json-xml',
    lane: 'Datové formáty',
    topic: 'CSV, JSON, XML',
    question: 'Kdy použít CSV, JSON a XML, a jaké je riziko špatné volby?',
    expectedMove: 'Tabulka → lehké API → validovaný strom → integrace.',
    answer: 'CSV je vhodné pro jednoduchá tabulková data. JSON je lehký stromový formát typický pro webová API a integrace. XML je vhodné pro hierarchická data, formální schémata a validaci. Špatná volba formátu může vést ke ztrátě struktury, problémům s validací, špatné integraci nebo nejasnému vlastnictví dat.',
    trap: 'Neodpovědět jen “jsou to formáty”. Musí zaznít účel a riziko.',
    practicalBridge: 'U ERP se to týká exportů, API, reportingu, migrace dat a kontroly kvality vstupů.',
    followUps: ['Proč XML přežívá v enterprise integracích?', 'Kde je validace?', 'Co je riziko CSV exportů?'],
  },
  {
    id: 'smutny-bsc-governance',
    lane: 'Governance',
    topic: 'BSC a IT governance',
    question: 'Jak by Balanced Scorecard pomohla řídit přínos ERP optimalizace?',
    expectedMove: 'Strategie → metriky → perspektivy → odpovědnost.',
    answer: 'Balanced Scorecard převádí strategii do cílů a metrik ve více perspektivách. U ERP optimalizace by pomohla propojit finanční přínos, procesní výkonnost, spokojenost uživatelů a učení organizace. Důležité je, že nejde jen o dashboard, ale o mechanismus řízení: kdo sleduje metriky, kdo rozhoduje a co se stane, když se cíl neplní.',
    trap: 'Nevyjmenovat jen čtyři perspektivy. Je nutné říct, jak se tím řídí rozhodování.',
    practicalBridge: 'Pro praxi je BSC dobrý most mezi technickou změnou v ERP a měřitelným business dopadem.',
    followUps: ['Jaká metrika by byla KGI a jaká KPI?', 'Kdo by BSC reportoval?', 'Co je riziko špatné metriky?'],
  },
]

function smutnyHistoricalPack(): SmutnyPackItem[] {
  return HISTORICAL_SIGNAL_QUESTIONS
    .filter(q => q.examiner === 'Smutný')
    .map(q => ({
      id: `hist-${q.id}`,
      lane: 'Historický signál',
      topic: q.topic,
      question: q.question,
      expectedMove: q.pattern,
      answer: q.modelAnswer,
      trap: 'Vrátit odpověď do sociotechnického kontextu, neuhnout do čistě technického detailu.',
      practicalBridge: q.practicalBridge,
      followUps: [q.syllabusLink, autoFollowUp(historicalToWeak(q))],
    }))
}

function smutnySyllabusPack(): SmutnyPackItem[] {
  return SZZ_SYLLABUS_TOPICS
    .filter(t => t.examiners.includes('Smutný'))
    .map(t => ({
      id: `syl-${t.id}`,
      lane: t.area,
      topic: t.title,
      question: `Zkuste téma „${t.title}“ vysvětlit tak, aby bylo jasné, proč by se na něj Smutný mohl zeptat.`,
      expectedMove: `Musí zaznít: ${t.mustHave.join(' · ')}`,
      answer: `Začal bych vymezením tématu a pak bych ho převedl na sociotechnický dopad v organizaci. Minimum: ${t.mustHave.join(', ')}. Důležité je ukázat, kdo je stakeholder, jaká je odpovědnost, jak se měří dopad a jak téma souvisí s informačním systémem v praxi.`,
      trap: 'Nezůstat u školní definice. Přidej organizaci, lidi, data, odpovědnost a měření dopadu.',
      practicalBridge: t.bridge,
      followUps: ['Jak byste to ukázal na ERP procesu?', 'Kde je v tom role uživatele?', 'Jaký je limit čistě technického řešení?'],
    }))
}

function buildSmutnyPack(): SmutnyPackItem[] {
  const used = new Set<string>()
  return shuffle([...SMUTNY_ATTACK_PACK, ...smutnyHistoricalPack(), ...smutnySyllabusPack()])
    .filter(item => {
      if (used.has(item.id)) return false
      used.add(item.id)
      return true
    })
}

function smutnyToWeak(item: SmutnyPackItem): AutoWeakItem {
  return {
    id: `smutny-${item.id}`,
    source: `Smutný pack · ${item.lane}`,
    subject: 'Smutný',
    title: item.topic,
    q: item.question,
    modelAnswer: `${item.expectedMove}\n\n${item.answer}\n\nPast: ${item.trap}`,
    hook: item.practicalBridge,
    followUp: item.followUps[0],
    misses: 0,
    wins: 0,
    lastMiss: 0,
    nextReview: 0,
  }
}

type DuelPair = {
  id: string
  left: string
  right: string
  subject: string
  answer: string
  trap: string
  hook: string
}

const DUEL_PAIRS: DuelPair[] = [
  {
    id: 'cobit-itil',
    left: 'COBIT',
    right: 'ITIL',
    subject: '4SA310',
    answer: 'COBIT je rámec pro governance a management I&T: cíle, odpovědnosti, kontroly a měření. ITIL je rámec ITSM pro návrh, provoz a zlepšování IT služeb. COBIT řekne, co a proč řídit; ITIL pomůže, jak službu provozně dodat.',
    trap: 'Neříkat, že ITIL je implementační metodika projektu. Je to best-practice rámec pro služby.',
    hook: 'U ERP změny COBIT rámuje odpovědnost a kontrolu, ITIL dopad na službu, incidenty, změny a SLA.',
  },
  {
    id: 'itil-iso20000',
    left: 'ITIL',
    right: 'ISO 20000',
    subject: '4IT418',
    answer: 'ITIL je framework best practices pro řízení IT služeb: popisuje doporučené postupy, praktiky a hodnotový tok. ISO/IEC 20000 je certifikovatelná norma pro systém řízení IT služeb organizace. ITIL pomáhá říct jak služby řídit; ISO 20000 říká, co musí být splněno pro auditovatelný SMS.',
    trap: 'Neříkat, že ITIL certifikuje organizaci. ITIL typicky certifikuje jednotlivce; organizaci certifikuje ISO 20000.',
    hook: 'U ERP služby bych ITIL použil na incident/change/release praxi a ISO 20000 jako rámec pro auditovatelné SLA, role a zlepšování.',
  },
  {
    id: 'sla-ola-uc',
    left: 'SLA',
    right: 'OLA / UC',
    subject: '4IT418',
    answer: 'SLA je dohoda mezi poskytovatelem a odběratelem služby. OLA je interní dohoda mezi IT týmy, která podporuje plnění SLA. UC je podkladová smlouva s externím dodavatelem. SLA stojí navenek, OLA dovnitř IT, UC vůči vendorovi.',
    trap: 'Neplést OLA s horším SLA. OLA není pro zákazníka, ale pro interní odpovědnosti IT.',
    hook: 'U ERP: business vidí SLA dostupnosti a podpory, L2/L3 týmy mají OLA a cloud nebo outsourcing partner má UC.',
  },
  {
    id: 'bcp-drp',
    left: 'BCP',
    right: 'DRP',
    subject: '4IT418',
    answer: 'BCP řeší, jak organizace udrží nebo rychle obnoví kritické business procesy při narušení. DRP je technická část obnovy IT systémů a infrastruktury. BCP je business kontinuita, DRP je IT obnova.',
    trap: 'Neříkat, že BCM je jen zálohování. Zálohování je jen jeden prostředek DRP.',
    hook: 'U ERP: BCP řeší ruční nebo náhradní zpracování faktur; DRP řeší obnovu ERP, databáze, integrací a dat.',
  },
  {
    id: 'tco-cba',
    left: 'TCO',
    right: 'CBA',
    subject: '4IT418',
    answer: 'TCO počítá skutečné náklady vlastnictví IS po celý životní cyklus, včetně skrytých provozních nákladů. CBA porovnává náklady a přínosy, včetně finančních, provozních, strategických a nehmotných efektů. TCO je primárně nákladová metoda, CBA rozhodovací bilance.',
    trap: 'Neříkat, že TCO měří přínosy. TCO odhaluje nákladovou stranu; přínosy přidává CBA, NPV, IRR nebo IT BSC.',
    hook: 'U ERP optimalizace bych TCO použil pro náklady změny a CBA pro přínos kratšího procesu, nižší chybovosti a menšího rizika.',
  },
  {
    id: 'governance-management',
    left: 'Governance',
    right: 'Management',
    subject: '4SA310',
    answer: 'Governance hodnotí, určuje směr a sleduje plnění cílů. Management plánuje, staví, provozuje a monitoruje konkrétní aktivity. Governance je odpovědnost boardu/top managementu, management realizuje rozhodnutí.',
    trap: 'Neudělat z governance jen hezčí slovo pro řízení IT oddělení.',
    hook: 'Praxe: governance říká, proč a podle jakých pravidel optimalizovat; management provede analýzu, návrh a nasazení.',
  },
  {
    id: 'authn-authz',
    left: 'Autentizace',
    right: 'Autorizace',
    subject: '4SA313',
    answer: 'Autentizace ověřuje, kdo uživatel je. Autorizace určuje, co ověřený uživatel smí dělat. Přihlášení tedy samo neznamená oprávnění k transakci.',
    trap: 'SSO řeší hlavně ověření identity, ne samo o sobě oprávnění v aplikaci.',
    hook: 'V ERP to vede k rolím, autorizačním objektům, SoD a recertifikaci.',
  },
  {
    id: 'rbac-sod',
    left: 'RBAC',
    right: 'SoD',
    subject: '4SA313',
    answer: 'RBAC přiřazuje oprávnění přes role podle pracovní funkce. SoD hlídá, aby jedna osoba neměla rizikovou kombinaci oprávnění. RBAC je model přiřazení, SoD je kontrolní princip.',
    trap: 'Role může být technicky správně přiřazená, ale pořád může vytvářet SoD konflikt.',
    hook: 'U ERP optimalizace nesmí zjednodušení procesu vytvořit neauditovatelnou kombinaci rolí.',
  },
  {
    id: 'asis-tobe',
    left: 'AS-IS',
    right: 'TO-BE',
    subject: '4SA516',
    answer: 'AS-IS popisuje současný stav procesu včetně výjimek, ručních zásahů a slabin. TO-BE popisuje cílový stav po optimalizaci. Rozdíl mezi nimi je základ pro gap analýzu a návrh změny.',
    trap: 'TO-BE není přání na papíře; musí být validované stakeholdery a provázané s metrikami.',
    hook: 'To je jádro praxe: nejdřív popsat reálný ERP proces, pak navrhnout změnu.',
  },
  {
    id: 'audittrail-chain',
    left: 'Audit trail',
    right: 'Chain of custody',
    subject: '4SA540',
    answer: 'Audit trail je aplikační nebo systémový záznam o tom, kdo, kdy a co provedl. Chain of custody je dokumentovaný řetězec nakládání s důkazem. Oba řeší důvěryhodnost stopy, ale v jiném kontextu.',
    trap: 'Audit trail není automaticky forenzně přijatelný důkaz, pokud nejde doložit integrita a manipulace.',
    hook: 'V ERP je audit trail analogie: původ dat, změny, osoba, čas a možnost kontroly.',
  },
  {
    id: 'qual-quant',
    left: 'Kvalitativní výzkum',
    right: 'Kvantitativní výzkum',
    subject: '4SA420',
    answer: 'Kvalitativní výzkum chápe kontext, významy a zkušenosti aktérů. Kvantitativní výzkum měří jevy číselně a umožňuje testovat hypotézy nebo porovnávat metriky. V IS se často kombinují.',
    trap: 'Kvalitativní není méně vědecký; rigoróznost je v postupu, ne jen v číslech.',
    hook: 'Praxe kombinuje rozhovory/pozorování procesu s metrikami času, chybovosti a zásahů.',
  },
  {
    id: 'sym-asym',
    left: 'Symetrická kryptografie',
    right: 'Asymetrická kryptografie',
    subject: '4SA313',
    answer: 'Symetrická kryptografie používá stejný klíč a je rychlá pro objemová data. Asymetrická používá veřejný a soukromý klíč, hodí se pro podpisy a výměnu klíčů. V praxi se často kombinuje hybridně.',
    trap: 'Asymetrická šifra není náhrada pro šifrování velkých objemů dat.',
    hook: 'V praxi je vazba nepřímá přes integritu, důvěryhodnost, přístupy a auditovatelnost ERP dat.',
  },
]

const FEYNMAN_AUDIENCES = [
  { id:'manager', label:'manažerovi', angle:'hodnota, riziko, odpovědnost a metrika' },
  { id:'tech', label:'technikovi', angle:'mechanismus, data, rozhraní, kontrola' },
  { id:'committee', label:'komisi', angle:'definice, rozdíl, příklad, limit, diplomka' },
  { id:'thesis', label:'jednou větou do praxe', angle:'ERP proces, stakeholder, data, kontrola, dopad' },
]

// ─── Shared UI ────────────────────────────────────────────────────────────────

function BackBtn({ onBack }: { onBack: () => void }) {
  return (
    <button onClick={onBack} style={{ fontSize:13, color:'#64748b', background:'none', border:'1px solid #e2e8f0', borderRadius:6, padding:'5px 12px', cursor:'pointer' }}>
      ← Zpět
    </button>
  )
}
function XPTag({ amount }: { amount: number }) {
  return <span style={{ background:'#dcfce7', color:'#16a34a', fontWeight:700, fontSize:11, padding:'2px 8px', borderRadius:20 }}>+{amount} XP</span>
}
function TopBar({ onBack, left, right }: { onBack: () => void; left?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
      <div style={{ display:'flex', gap:12, alignItems:'center' }}><BackBtn onBack={onBack} />{left}</div>
      <div style={{ display:'flex', gap:12, alignItems:'center' }}>{right}</div>
    </div>
  )
}
function SXP({ xp }: { xp: number }) {
  return xp > 0 ? <span style={{ fontSize:12, color:'#16a34a', fontWeight:700 }}>+{xp} XP session</span> : null
}

// ─── FLASHKARTY ───────────────────────────────────────────────────────────────

function FlashkartyMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [nodes] = useState(() => shuffle(RICH_NODES))
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [status, setStatus] = useState<Record<string, NodeStatus>>(loadNS)
  const [sessionXP, setSessionXP] = useState(0)
  const [flash, setFlash] = useState<number | null>(null)

  const node = nodes[idx % nodes.length]
  const ns = status[node.id]
  const known = Object.values(status).filter(v => v === 'known').length
  const unsure = Object.values(status).filter(v => v === 'unsure').length
  const total = RICH_NODES.length

  function rate(s: NodeStatus) {
    const xp = s === 'known' ? 15 : s === 'unsure' ? 5 : 0
    const updated = { ...status, [node.id]: s }
    setStatus(updated); saveNS(updated)
    if (xp > 0) {
      addXP(xp); setFlash(xp); setSessionXP(p => p + xp)
      setTimeout(() => setFlash(null), 1300)
    }
    setFlipped(false); setIdx(i => i + 1)
  }

  return (
    <div className="page">
      <TopBar onBack={onBack} right={<SXP xp={sessionXP} />} />
      <div style={{ fontSize:12, color:'#64748b', marginBottom:8 }}>
        {known} znám · {unsure} nejasných · {total - known - unsure} neznámých
      </div>
      <div style={{ display:'flex', height:5, borderRadius:3, overflow:'hidden', marginBottom:20, background:'#f1f5f9' }}>
        <div style={{ width:`${(known/total)*100}%`, background:'#16a34a', transition:'width 0.3s' }} />
        <div style={{ width:`${(unsure/total)*100}%`, background:'#f59e0b', transition:'width 0.3s' }} />
      </div>
      <div onClick={() => setFlipped(f => !f)}
        style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'36px 40px', minHeight:200, cursor:'pointer', position:'relative', marginBottom:20, userSelect:'none' }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.07em', textTransform:'uppercase', color:'#94a3b8', marginBottom:14 }}>{node.area}</div>
        {!flipped ? (
          <>
            <div style={{ fontSize:22, fontWeight:700, color:'#0f172a', letterSpacing:'-0.02em', marginBottom:8 }}>{node.label}</div>
            <div style={{ fontSize:12, color:'#94a3b8' }}>Klikni pro zobrazení definice</div>
          </>
        ) : (
          <>
            <div style={{ fontSize:13, fontWeight:600, color:'#64748b', marginBottom:10 }}>{node.label}</div>
            <div style={{ fontSize:13.5, color:'#1e293b', lineHeight:1.65 }}>{node.description}</div>
          </>
        )}
        {flash !== null && <div style={{ position:'absolute', top:16, right:16 }}><XPTag amount={flash} /></div>}
        {ns && (
          <div style={{ position:'absolute', bottom:16, right:16, fontSize:11, fontWeight:600,
            color: ns === 'known' ? '#16a34a' : ns === 'unsure' ? '#d97706' : '#94a3b8' }}>
            {ns === 'known' ? 'Znám' : ns === 'unsure' ? 'Nejasné' : 'Neznám'}
          </div>
        )}
      </div>
      <div style={{ display:'flex', gap:8 }}>
        {([
          { s:'unknown' as NodeStatus, label:'Neznám',         color:'#ef4444', brd:'#fecaca', bg:'#fef2f2' },
          { s:'unsure'  as NodeStatus, label:'Nejasné +5 XP',  color:'#d97706', brd:'#fde68a', bg:'#fffbeb' },
          { s:'known'   as NodeStatus, label:'Znám +15 XP',    color:'#16a34a', brd:'#bbf7d0', bg:'#f0fdf4' },
        ]).map(({ s, label, color, brd, bg }) => (
          <button key={s} onClick={() => rate(s)}
            style={{ flex:1, padding:'10px 0', border:`1px solid ${ns===s ? brd : '#e2e8f0'}`, borderRadius:8, background: ns===s ? bg : '#fff', color, fontWeight:600, fontSize:12, cursor:'pointer' }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── RYCHLOPALBA T/F ──────────────────────────────────────────────────────────

function TFMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [questions] = useState(() => shuffle(TF_BANK))
  const [qIdx, setQIdx] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECS)
  const [streak, setStreak] = useState(0)
  const [sessionXP, setSessionXP] = useState(0)
  const [flash, setFlash] = useState<number | null>(null)
  const [score, setScore] = useState({ c: 0, w: 0 })
  const finished = qIdx >= questions.length

  useEffect(() => {
    if (answered || finished) return
    if (timeLeft <= 0) {
      setAnswered(true); setCorrect(false); setStreak(0); setScore(s => ({ ...s, w: s.w + 1 }))
      return
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, answered, finished])

  function handleAnswer(userAnswer: boolean) {
    if (answered) return
    const q = questions[qIdx]
    const ok = userAnswer === q.answer
    setAnswered(true); setCorrect(ok)
    if (ok) {
      const ns = streak + 1
      setStreak(ns)
      const xp = 10 + (ns >= 3 ? 5 : 0)
      addXP(xp); setFlash(xp); setSessionXP(p => p + xp)
      setScore(s => ({ ...s, c: s.c + 1 }))
      setTimeout(() => setFlash(null), 1300)
    } else {
      setStreak(0); setScore(s => ({ ...s, w: s.w + 1 }))
    }
  }

  function next() { setQIdx(i => i + 1); setAnswered(false); setCorrect(false); setTimeLeft(TIMER_SECS) }

  const q = questions[qIdx]
  const timerPct = (timeLeft / TIMER_SECS) * 100
  const timerColor = timerPct > 50 ? '#16a34a' : timerPct > 25 ? '#f59e0b' : '#ef4444'

  if (finished) return (
    <div className="page">
      <BackBtn onBack={onBack} />
      <div style={{ textAlign:'center', padding:'48px 0' }}>
        <div style={{ fontSize:40, marginBottom:16 }}>⚡</div>
        <div style={{ fontSize:22, fontWeight:700, color:'#0f172a', marginBottom:8 }}>Hotovo!</div>
        <div style={{ fontSize:15, color:'#64748b', marginBottom:20 }}>{score.c} správně · {score.w} špatně z {questions.length}</div>
        <div style={{ fontSize:22, fontWeight:700, color:'#16a34a', marginBottom:32 }}>+{sessionXP} XP</div>
        <button onClick={() => { setQIdx(0); setAnswered(false); setTimeLeft(TIMER_SECS); setStreak(0); setScore({ c:0, w:0 }); setSessionXP(0) }}
          style={{ padding:'10px 28px', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer' }}>
          Zkusit znovu
        </button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <TopBar onBack={onBack}
        left={streak >= 3 ? <span style={{ fontSize:12, fontWeight:700, color:'#f59e0b' }}>Combo ×{streak}</span> : undefined}
        right={<><span style={{ fontSize:12, color:'#64748b' }}>{qIdx+1}/{questions.length} · {score.c}✓ {score.w}✗</span><SXP xp={sessionXP} /></>}
      />
      <div style={{ height:5, background:'#f1f5f9', borderRadius:3, marginBottom:20, overflow:'hidden' }}>
        <div style={{ width:`${timerPct}%`, background:timerColor, height:'100%', transition: answered ? 'none' : 'width 1s linear' }} />
      </div>
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'32px 36px', marginBottom:20, position:'relative' }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.07em', textTransform:'uppercase', color:'#94a3b8', marginBottom:16 }}>
          Pravda nebo lež?{!answered && ` · ${timeLeft}s`}
        </div>
        <div style={{ fontSize:17, fontWeight:600, color:'#0f172a', lineHeight:1.55 }}>{q.q}</div>
        {answered && (
          <div style={{ marginTop:16, padding:'12px 16px', borderRadius:8,
            background: correct ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${correct ? '#bbf7d0' : '#fecaca'}` }}>
            <div style={{ fontWeight:700, color: correct ? '#16a34a' : '#ef4444', marginBottom:4 }}>
              {correct ? '✓ Správně' : '✗ Špatně'} — {q.answer ? 'PRAVDA' : 'LEŽ'}
            </div>
            <div style={{ fontSize:12, color:'#475569' }}>{q.note}</div>
          </div>
        )}
        {flash !== null && <div style={{ position:'absolute', top:16, right:16 }}><XPTag amount={flash} /></div>}
      </div>
      {!answered ? (
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={() => handleAnswer(true)} style={{ flex:1, padding:'14px 0', border:'1px solid #bbf7d0', borderRadius:10, background:'#f0fdf4', color:'#16a34a', fontWeight:700, fontSize:15, cursor:'pointer' }}>Pravda</button>
          <button onClick={() => handleAnswer(false)} style={{ flex:1, padding:'14px 0', border:'1px solid #fecaca', borderRadius:10, background:'#fef2f2', color:'#ef4444', fontWeight:700, fontSize:15, cursor:'pointer' }}>Lež</button>
        </div>
      ) : (
        <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:10, fontSize:14, fontWeight:600, cursor:'pointer' }}>Další →</button>
      )}
    </div>
  )
}

// ─── QUIZ4 ────────────────────────────────────────────────────────────────────

type Q4Item = { node: MapNode; options: string[]; correct: string }

function makeQ4(): Q4Item {
  const node = RICH_NODES[Math.floor(Math.random() * RICH_NODES.length)]
  const options = shuffle([node.label, ...pickDistinct(RICH_NODES.map(n => n.label), node.label, 3)])
  return { node, options, correct: node.label }
}

function Quiz4Mode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [item, setItem] = useState<Q4Item>(makeQ4)
  const [selected, setSelected] = useState<string | null>(null)
  const [sessionXP, setSessionXP] = useState(0)
  const [flash, setFlash] = useState<number | null>(null)
  const [score, setScore] = useState({ c:0, w:0 })

  function pick(opt: string) {
    if (selected) return
    setSelected(opt)
    if (opt === item.correct) {
      addXP(15); setFlash(15); setSessionXP(p => p + 15); setScore(s => ({ ...s, c: s.c+1 }))
      setTimeout(() => setFlash(null), 1300)
    } else { setScore(s => ({ ...s, w: s.w+1 })) }
  }

  function next() { setItem(makeQ4()); setSelected(null) }

  const desc = item.node.description.length > 180 ? item.node.description.slice(0, 180) + '…' : item.node.description

  return (
    <div className="page">
      <TopBar onBack={onBack} right={<><span style={{ fontSize:12, color:'#64748b' }}>{score.c}✓ {score.w}✗</span><SXP xp={sessionXP} /></>} />
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'32px 36px', marginBottom:20, position:'relative' }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.07em', textTransform:'uppercase', color:'#94a3b8', marginBottom:14 }}>Quiz · {item.node.area}</div>
        <div style={{ fontSize:13.5, color:'#0f172a', lineHeight:1.65, marginBottom:8 }}>{desc}</div>
        <div style={{ fontSize:12, color:'#94a3b8' }}>Který pojem popisuje výše uvedený text?</div>
        {flash !== null && <div style={{ position:'absolute', top:16, right:16 }}><XPTag amount={flash} /></div>}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
        {item.options.map(opt => {
          const isCorrect = opt === item.correct
          const isSel = opt === selected
          const border = selected ? (isCorrect ? '#bbf7d0' : isSel ? '#fecaca' : '#e2e8f0') : '#e2e8f0'
          const bg    = selected ? (isCorrect ? '#f0fdf4' : isSel ? '#fef2f2' : '#fff') : '#fff'
          const color = selected ? (isCorrect ? '#16a34a' : isSel ? '#ef4444' : '#0f172a') : '#0f172a'
          return (
            <button key={opt} onClick={() => pick(opt)}
              style={{ padding:'12px 16px', border:`1px solid ${border}`, borderRadius:8, background:bg, color, fontWeight:500, fontSize:14, cursor: selected ? 'default' : 'pointer', textAlign:'left' }}>
              {opt}
            </button>
          )
        })}
      </div>
      {selected && <button onClick={next} style={{ width:'100%', padding:'11px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer' }}>Další →</button>}
    </div>
  )
}

// ─── EDGE CONNECT ─────────────────────────────────────────────────────────────

type EdgeItem = { edge: RichEdge; options: EdgeType[]; correct: EdgeType }

function makeEdge(): EdgeItem | null {
  if (!ALL_RICH_EDGES.length) return null
  const edge = ALL_RICH_EDGES[Math.floor(Math.random() * ALL_RICH_EDGES.length)]
  const options = shuffle([edge.type, ...pickDistinct(ALL_EDGE_TYPES, edge.type, 3)]) as EdgeType[]
  return { edge, options, correct: edge.type }
}

function EdgeMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [item, setItem] = useState<EdgeItem | null>(makeEdge)
  const [selected, setSelected] = useState<EdgeType | null>(null)
  const [sessionXP, setSessionXP] = useState(0)
  const [flash, setFlash] = useState<number | null>(null)
  const [score, setScore] = useState({ c:0, w:0 })

  function pick(opt: EdgeType) {
    if (selected || !item) return
    setSelected(opt)
    if (opt === item.correct) {
      addXP(20); setFlash(20); setSessionXP(p => p + 20); setScore(s => ({ ...s, c: s.c+1 }))
      setTimeout(() => setFlash(null), 1300)
    } else { setScore(s => ({ ...s, w: s.w+1 })) }
  }

  function next() { setItem(makeEdge()); setSelected(null) }

  if (!item) return <div className="page"><BackBtn onBack={onBack} /><div style={{ color:'#94a3b8', textAlign:'center', padding:40 }}>Žádné hrany.</div></div>

  return (
    <div className="page">
      <TopBar onBack={onBack} right={<><span style={{ fontSize:12, color:'#64748b' }}>{score.c}✓ {score.w}✗</span><SXP xp={sessionXP} /></>} />
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'32px 36px', marginBottom:20, position:'relative' }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.07em', textTransform:'uppercase', color:'#94a3b8', marginBottom:20 }}>Propojování hran — urči typ vztahu</div>
        <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <div style={{ padding:'8px 16px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, fontWeight:600, fontSize:14 }}>{item.edge.sourceLabel}</div>
          <div style={{ fontSize:13, color:'#94a3b8', fontWeight:500 }}>— ? →</div>
          <div style={{ padding:'8px 16px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, fontWeight:600, fontSize:14 }}>{item.edge.targetLabel}</div>
        </div>
        {flash !== null && <div style={{ position:'absolute', top:16, right:16 }}><XPTag amount={flash} /></div>}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
        {item.options.map(opt => {
          const cfg = EDGE_CONFIG[opt]
          const isCorrect = opt === item.correct
          const isSel = opt === selected
          const border = selected ? (isCorrect ? '#bbf7d0' : isSel ? '#fecaca' : '#e2e8f0') : '#e2e8f0'
          const bg    = selected ? (isCorrect ? '#f0fdf4' : isSel ? '#fef2f2' : '#fff') : '#fff'
          const color = selected ? (isCorrect ? '#16a34a' : isSel ? '#ef4444' : '#0f172a') : '#0f172a'
          return (
            <button key={opt} onClick={() => pick(opt)}
              style={{ padding:'12px 16px', border:`1px solid ${border}`, borderRadius:8, background:bg, color, fontWeight:500, fontSize:14, cursor: selected ? 'default' : 'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:10, height:10, borderRadius:'50%', background:cfg.color, flexShrink:0, display:'inline-block' }} />
              {cfg.label}
            </button>
          )
        })}
      </div>
      {selected && <button onClick={next} style={{ width:'100%', padding:'11px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer' }}>Další →</button>}
    </div>
  )
}

// ─── ZKOUŠKA NANEČISTO ────────────────────────────────────────────────────────

function OralMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [questions] = useState(() => shuffle(ORAL_BANK))
  const [qIdx, setQIdx] = useState(0)
  const [hintShown, setHintShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const [flash, setFlash] = useState<number | null>(null)

  const q = questions[qIdx % questions.length]

  function rate(xp: number) {
    if (rated) return
    setRated(true)
    if (xp > 0) {
      addXP(xp); setFlash(xp); setSessionXP(p => p + xp)
      setTimeout(() => setFlash(null), 1300)
    }
  }

  function next() { setQIdx(i => i + 1); setHintShown(false); setRated(false) }

  return (
    <div className="page">
      <TopBar onBack={onBack} right={<><span style={{ fontSize:12, color:'#64748b' }}>{(qIdx%questions.length)+1}/{questions.length}</span><SXP xp={sessionXP} /></>} />
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'32px 36px', marginBottom:20, position:'relative' }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.07em', textTransform:'uppercase', color:'#94a3b8', marginBottom:16 }}>Zkouška nanečisto — odpověz nahlas</div>
        <div style={{ fontSize:16, fontWeight:600, color:'#0f172a', lineHeight:1.6, marginBottom:20 }}>{q.q}</div>
        <button onClick={() => setHintShown(h => !h)}
          style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
          {hintShown ? '▲ Skrýt odpověď' : '▼ Vzorová odpověď'}
        </button>
        {hintShown && <div style={{ padding:'12px 16px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.6 }}>{q.modelAnswer}</div>}
        {flash !== null && <div style={{ position:'absolute', top:16, right:16 }}><XPTag amount={flash} /></div>}
      </div>
      {!rated ? (
        <div style={{ display:'flex', gap:8 }}>
          {[
            { label:'Nevím',              xp:0,  color:'#ef4444', brd:'#fecaca', bg:'#fef2f2' },
            { label:'Tak nějak +10 XP',  xp:10, color:'#d97706', brd:'#fde68a', bg:'#fffbeb' },
            { label:'Výborně +20 XP',    xp:20, color:'#16a34a', brd:'#bbf7d0', bg:'#f0fdf4' },
          ].map(({ label, xp, color, brd, bg }) => (
            <button key={xp} onClick={() => rate(xp)}
              style={{ flex:1, padding:'10px 4px', border:`1px solid ${brd}`, borderRadius:8, background:bg, color, fontWeight:600, fontSize:11, cursor:'pointer' }}>
              {label}
            </button>
          ))}
        </div>
      ) : (
        <button onClick={next} style={{ width:'100%', padding:'11px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer' }}>Další otázka →</button>
      )}
    </div>
  )
}

// ─── KOMISE ───────────────────────────────────────────────────────────────────

type Prof = 'smutny' | 'sedlacek' | 'sigmund'
const PROF_NAMES: Record<Prof, string> = { smutny:'Smutný', sedlacek:'Sedláček', sigmund:'Sigmund' }
const PROF_FOCUS: Record<Prof, string> = {
  smutny: 'IT Governance · COBIT · strategické řízení IT',
  sedlacek: 'ERP · projektové řízení · implementace systémů',
  sigmund: 'Systémové myšlení · sociální informatika · VSM',
}

function KomiseMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [prof, setProf] = useState<Prof | null>(null)
  const [questions, setQuestions] = useState<typeof KOMISE_BANK>([])
  const [qIdx, setQIdx] = useState(0)
  const [hintShown, setHintShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const [flash, setFlash] = useState<number | null>(null)

  function selectProf(p: Prof) {
    setProf(p)
    setQuestions(shuffle(KOMISE_BANK.filter(q => q.prof === p)))
    setQIdx(0); setHintShown(false); setRated(false)
  }

  function rate(xp: number) {
    if (rated) return
    setRated(true)
    if (xp > 0) {
      addXP(xp); setFlash(xp); setSessionXP(p => p + xp)
      setTimeout(() => setFlash(null), 1300)
    }
  }

  function next() { setQIdx(i => i + 1); setHintShown(false); setRated(false) }

  if (!prof) return (
    <div className="page">
      <div style={{ marginBottom:24 }}><BackBtn onBack={onBack} /></div>
      <div style={{ fontSize:18, fontWeight:700, color:'#0f172a', marginBottom:6 }}>Vyber člena komise</div>
      <div style={{ fontSize:13, color:'#64748b', marginBottom:24 }}>Každý examinátor má jiný fokus.</div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {(['smutny','sedlacek','sigmund'] as Prof[]).map(p => (
          <button key={p} onClick={() => selectProf(p)}
            style={{ padding:'20px 24px', border:'1px solid #e2e8f0', borderRadius:10, background:'#fff', cursor:'pointer', textAlign:'left' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
            <div style={{ fontWeight:700, fontSize:16, color:'#0f172a', marginBottom:4 }}>{PROF_NAMES[p]}</div>
            <div style={{ fontSize:12, color:'#64748b' }}>{PROF_FOCUS[p]}</div>
          </button>
        ))}
      </div>
    </div>
  )

  const q = questions[qIdx % questions.length]

  return (
    <div className="page">
      <TopBar onBack={onBack}
        left={<button onClick={() => setProf(null)} style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0 }}>Změnit examinátora</button>}
        right={<><span style={{ fontSize:12, color:'#64748b' }}>{(qIdx%questions.length)+1}/{questions.length}</span><SXP xp={sessionXP} /></>}
      />
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, padding:'10px 16px', background:'#f8fafc', borderRadius:8, border:'1px solid #e2e8f0' }}>
        <span style={{ fontSize:20 }}>◉</span>
        <div><div style={{ fontWeight:700, fontSize:14 }}>{PROF_NAMES[prof]}</div><div style={{ fontSize:11, color:'#64748b' }}>{PROF_FOCUS[prof]}</div></div>
      </div>
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'32px 36px', marginBottom:20, position:'relative' }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.07em', textTransform:'uppercase', color:'#94a3b8', marginBottom:16 }}>Komise · {PROF_NAMES[prof]}</div>
        <div style={{ fontSize:15, fontWeight:600, color:'#0f172a', lineHeight:1.65, marginBottom:20 }}>{q.q}</div>
        <button onClick={() => setHintShown(h => !h)}
          style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
          {hintShown ? '▲ Skrýt odpověď' : '▼ Vzorová odpověď'}
        </button>
        {hintShown && <div style={{ padding:'12px 16px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.6 }}>{q.modelAnswer}</div>}
        {flash !== null && <div style={{ position:'absolute', top:16, right:16 }}><XPTag amount={flash} /></div>}
      </div>
      {!rated ? (
        <div style={{ display:'flex', gap:8 }}>
          {[
            { label:'Zasekl jsem se',       xp:0,  color:'#ef4444', brd:'#fecaca', bg:'#fef2f2' },
            { label:'Odpověděl jsem +15 XP', xp:15, color:'#d97706', brd:'#fde68a', bg:'#fffbeb' },
            { label:'Zářil jsem +25 XP',    xp:25, color:'#16a34a', brd:'#bbf7d0', bg:'#f0fdf4' },
          ].map(({ label, xp, color, brd, bg }) => (
            <button key={xp} onClick={() => rate(xp)}
              style={{ flex:1, padding:'10px 4px', border:`1px solid ${brd}`, borderRadius:8, background:bg, color, fontWeight:600, fontSize:11, cursor:'pointer' }}>
              {label}
            </button>
          ))}
        </div>
      ) : (
        <button onClick={next} style={{ width:'100%', padding:'11px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer' }}>Další otázka →</button>
      )}
    </div>
  )
}

// ─── BOSS ─────────────────────────────────────────────────────────────────────

function BossMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [defeats, setDefeats] = useState<Record<number, boolean>>(loadBossDefeats)
  const [active, setActive] = useState<number | null>(null)
  const [hintShown, setHintShown] = useState(false)
  const [flash, setFlash] = useState<number | null>(null)

  function attempt(i: number) { setActive(i); setHintShown(false) }

  function markDefeated() {
    if (active === null) return
    if (!defeats[active]) {
      addXP(50); setFlash(50)
      setTimeout(() => setFlash(null), 1800)
    }
    const upd = { ...defeats, [active]: true }
    setDefeats(upd); saveBossDefeats(upd)
  }

  if (active !== null) {
    const boss = BOSS_BANK[active]
    return (
      <div className="page">
        <TopBar onBack={() => setActive(null)} right={flash !== null ? <XPTag amount={flash} /> : undefined} />
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <span style={{ fontSize:28 }}>★</span>
          <div>
            <div style={{ fontSize:11, color:'#94a3b8', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>Boss otázka · Okruh {boss.okruh}</div>
            <div style={{ fontSize:18, fontWeight:700, color:'#0f172a' }}>{boss.title}</div>
          </div>
          {defeats[active] && <span style={{ marginLeft:'auto', background:'#dcfce7', color:'#16a34a', fontWeight:700, fontSize:11, padding:'3px 10px', borderRadius:20 }}>Poražen</span>}
        </div>
        <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:20 }}>
          <div style={{ fontSize:14.5, color:'#0f172a', lineHeight:1.7, marginBottom:20 }}>{boss.q}</div>
          <button onClick={() => setHintShown(h => !h)}
            style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
            {hintShown ? '▲ Skrýt odpověď' : '▼ Vzorová odpověď'}
          </button>
          {hintShown && <div style={{ padding:'12px 16px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.65 }}>{boss.modelAnswer}</div>}
        </div>
        {!defeats[active] ? (
          <button onClick={markDefeated} style={{ width:'100%', padding:'13px 0', background:'#16a34a', color:'#fff', border:'none', borderRadius:10, fontSize:15, fontWeight:700, cursor:'pointer' }}>
            Boss poražen! +50 XP
          </button>
        ) : (
          <div style={{ textAlign:'center', padding:'12px 0', fontSize:14, color:'#16a34a', fontWeight:600 }}>✓ Otázka zodpovězena</div>
        )}
      </div>
    )
  }

  const defeatedCount = Object.values(defeats).filter(Boolean).length

  return (
    <div className="page">
      <div style={{ marginBottom:24 }}><BackBtn onBack={onBack} /></div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:18, fontWeight:700, color:'#0f172a', marginBottom:4 }}>Boss otázky</div>
        <div style={{ fontSize:13, color:'#64748b' }}>{defeatedCount} / {BOSS_BANK.length} poraženo · +50 XP za každého</div>
      </div>
      <div style={{ height:5, background:'#f1f5f9', borderRadius:3, marginBottom:20, overflow:'hidden' }}>
        <div style={{ width:`${(defeatedCount/BOSS_BANK.length)*100}%`, background:'#16a34a', height:'100%', transition:'width 0.3s' }} />
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {BOSS_BANK.map((b, i) => (
          <button key={i} onClick={() => attempt(i)}
            style={{ padding:'16px 20px', border:`1px solid ${defeats[i] ? '#bbf7d0' : '#e2e8f0'}`, borderRadius:10, background: defeats[i] ? '#f0fdf4' : '#fff', cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:16 }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
            <span style={{ fontSize:22, color: defeats[i] ? '#16a34a' : '#94a3b8', flexShrink:0 }}>{defeats[i] ? '★' : '☆'}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:'#94a3b8', marginBottom:3, fontWeight:600 }}>Okruh {b.okruh}</div>
              <div style={{ fontSize:14, fontWeight:600, color: defeats[i] ? '#16a34a' : '#0f172a' }}>{b.title}</div>
            </div>
            {!defeats[i] && <span style={{ fontSize:11, color:'#16a34a', fontWeight:700, background:'#dcfce7', padding:'2px 8px', borderRadius:20 }}>+50 XP</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

// ─── OSTRÝ MOCK ─────────────────────────────────────────────────────────────

function MockMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [deck] = useState(() => shuffle(MIXED_DRILL).slice(0, 12))
  const [idx, setIdx] = useState(0)
  const [hintShown, setHintShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [streak, setStreak] = useState(0)
  const [sessionXP, setSessionXP] = useState(0)
  const [flash, setFlash] = useState<number | null>(null)
  const [score, setScore] = useState({ miss: 0, ok: 0, top: 0 })

  const finished = idx >= deck.length
  const q = deck[idx]
  const pct = Math.round((idx / deck.length) * 100)

  function rate(kind: 'miss' | 'ok' | 'top') {
    if (rated) return
    const nextStreak = kind === 'top' ? streak + 1 : kind === 'ok' ? Math.max(0, streak) : 0
    const xp = kind === 'top' ? 35 + (nextStreak >= 3 ? 10 : 0) : kind === 'ok' ? 18 : 0
    setRated(true)
    setStreak(nextStreak)
    setScore(s => ({ ...s, [kind]: s[kind] + 1 }))
    if (kind === 'miss') registerWeakness(drillToWeak(q, 'Ostrý mock'))
    else registerWeakWin(q.id)
    if (xp > 0) {
      addXP(xp); setFlash(xp); setSessionXP(p => p + xp)
      setTimeout(() => setFlash(null), 1300)
    }
  }

  function next() {
    setIdx(i => i + 1)
    setHintShown(false)
    setRated(false)
  }

  if (finished) {
    const total = score.top * 2 + score.ok
    const max = deck.length * 2
    const pctScore = Math.round((total / max) * 100)
    const grade = pctScore >= 86 ? 'Jedničkový výkon' : pctScore >= 68 ? 'Dobrá dvojka' : 'Ještě dril'
    const color = pctScore >= 86 ? '#16a34a' : pctScore >= 68 ? '#d97706' : '#ef4444'
    return (
      <div className="page">
        <BackBtn onBack={onBack} />
        <div style={{ textAlign:'center', padding:'48px 0' }}>
          <div style={{ fontSize:42, marginBottom:14 }}>◆</div>
          <div style={{ fontSize:24, fontWeight:800, color, marginBottom:8 }}>{grade}</div>
          <div style={{ fontSize:14, color:'#64748b', marginBottom:18 }}>
            {score.top} výborně · {score.ok} použitelně · {score.miss} zaseknutí
          </div>
          <div style={{ fontSize:22, fontWeight:800, color:'#16a34a', marginBottom:28 }}>+{sessionXP} XP</div>
          <button onClick={onBack} style={{ padding:'10px 24px', border:'none', borderRadius:8, background:'#1d4ed8', color:'#fff', fontWeight:700, cursor:'pointer' }}>
            Zpět do trenéra
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <TopBar onBack={onBack}
        left={streak >= 3 ? <span style={{ fontSize:12, fontWeight:700, color:'#f59e0b' }}>Streak ×{streak}</span> : undefined}
        right={<><span style={{ fontSize:12, color:'#64748b' }}>{idx + 1}/{deck.length}</span><SXP xp={sessionXP} /></>}
      />
      <div style={{ height:6, background:'#f1f5f9', borderRadius:4, marginBottom:20, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:'#1d4ed8', transition:'width 0.25s' }} />
      </div>
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:18, position:'relative' }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap:12, alignItems:'center', marginBottom:14 }}>
          <span style={{ fontSize:10, fontWeight:800, color:'#64748b', letterSpacing:'0.07em', textTransform:'uppercase' }}>
            Ostrý mock · {SUBJECT_NAME[q.subject] ?? q.subject}
          </span>
          <span style={{ fontSize:11, fontWeight:700, color:'#1d4ed8', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:20, padding:'2px 8px' }}>2-5 vět</span>
        </div>
        <div style={{ fontSize:17, fontWeight:700, color:'#0f172a', lineHeight:1.55, marginBottom:16 }}>{q.q}</div>
        {q.followUp && <div style={{ fontSize:12.5, color:'#64748b', marginBottom:16 }}>Doplňující tlak: {q.followUp}</div>}
        <button onClick={() => setHintShown(h => !h)}
          style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
          {hintShown ? '▲ Skrýt kostru' : '▼ Kostra odpovědi'}
        </button>
        {hintShown && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{q.modelAnswer}</div>
            <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12.5, color:'#166534', lineHeight:1.55 }}>{q.hook}</div>
          </div>
        )}
        {flash !== null && <div style={{ position:'absolute', top:16, right:16 }}><XPTag amount={flash} /></div>}
      </div>
      {!rated ? (
        <div style={{ display:'flex', gap:8 }}>
          {[
            { id:'miss' as const, label:'Zasekl jsem se', xp:'0 XP', color:'#ef4444', brd:'#fecaca', bg:'#fef2f2' },
            { id:'ok' as const, label:'Použitelné', xp:'+18 XP', color:'#d97706', brd:'#fde68a', bg:'#fffbeb' },
            { id:'top' as const, label:'Jedničkově', xp:'+35 XP', color:'#16a34a', brd:'#bbf7d0', bg:'#f0fdf4' },
          ].map(b => (
            <button key={b.id} onClick={() => rate(b.id)}
              style={{ flex:1, padding:'11px 8px', border:`1px solid ${b.brd}`, borderRadius:9, background:b.bg, color:b.color, fontWeight:700, cursor:'pointer' }}>
              {b.label}<span style={{ display:'block', fontSize:10, marginTop:2 }}>{b.xp}</span>
            </button>
          ))}
        </div>
      ) : (
        <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontSize:14, fontWeight:700, cursor:'pointer' }}>Další otázka →</button>
      )}
    </div>
  )
}

// ─── SYLABUS RUN ────────────────────────────────────────────────────────────

function SyllabusMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [subject, setSubject] = useState<string | null>(null)
  const [deck, setDeck] = useState<ShrnutiCard[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [hintShown, setHintShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const [covered, setCovered] = useState<Record<string, number>>({})

  const subjects = Array.from(new Set(SHRNUTI.map(c => c.subject)))
  const current = deck?.[idx]
  const finished = !!deck && idx >= deck.length

  function start(s: string | null) {
    const pool = s ? SHRNUTI.filter(c => c.subject === s) : SHRNUTI
    setSubject(s)
    setDeck(shuffle(pool).slice(0, s ? Math.min(8, pool.length) : Math.min(18, pool.length)))
    setIdx(0); setHintShown(false); setRated(false); setSessionXP(0); setCovered({})
  }

  function rate(xp: number) {
    if (rated || !current) return
    setRated(true)
    setCovered(c => ({ ...c, [current.subject]: (c[current.subject] ?? 0) + 1 }))
    if (xp === 0) registerWeakness(cardToWeak(current))
    if (xp >= 25) registerWeakWin(`shrnuti-${current.id}`)
    if (xp > 0) {
      addXP(xp); setSessionXP(p => p + xp)
    }
  }

  function next() {
    setIdx(i => i + 1)
    setHintShown(false)
    setRated(false)
  }

  if (!deck) {
    return (
      <div className="page">
        <div style={{ marginBottom:24 }}><BackBtn onBack={onBack} /></div>
        <div className="page-title">Sylabus run</div>
        <div className="page-subtitle">Vyber celé spektrum nebo jeden předmět. Každé kolo tě donutí říct úvod, body, háček a vazbu na praxi.</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(190px, 1fr))', gap:10 }}>
          <button onClick={() => start(null)} style={{ padding:'18px', border:'1px solid #bfdbfe', borderRadius:10, background:'#eff6ff', color:'#1d4ed8', fontWeight:800, cursor:'pointer', textAlign:'left' }}>
            Celé spektrum
            <span style={{ display:'block', marginTop:6, fontSize:11, color:'#64748b', fontWeight:500 }}>{SHRNUTI.length} karet</span>
          </button>
          {subjects.map(s => {
            const count = SHRNUTI.filter(c => c.subject === s).length
            return (
              <button key={s} onClick={() => start(s)}
                style={{ padding:'18px', border:'1px solid #e2e8f0', borderRadius:10, background:'#fff', cursor:'pointer', textAlign:'left' }}>
                <span style={{ fontWeight:800, color:'#0f172a', fontSize:13 }}>{s}</span>
                <span style={{ display:'block', marginTop:5, fontSize:11, color:'#64748b' }}>{SUBJECT_NAME[s] ?? s} · {count} karet</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="page">
        <BackBtn onBack={() => setDeck(null)} />
        <div style={{ textAlign:'center', padding:'42px 0 26px' }}>
          <div style={{ fontSize:36, marginBottom:12 }}>◈</div>
          <div style={{ fontSize:23, fontWeight:800, color:'#0f172a', marginBottom:8 }}>Run hotový</div>
          <div style={{ fontSize:14, color:'#64748b', marginBottom:16 }}>{Object.keys(covered).length} oblastí · +{sessionXP} XP</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center', marginBottom:24 }}>
            {Object.entries(covered).map(([s, n]) => (
              <span key={s} style={{ fontSize:11, fontWeight:700, background:'#f1f5f9', color:'#475569', padding:'4px 8px', borderRadius:20 }}>{s}: {n}</span>
            ))}
          </div>
          <button onClick={() => setDeck(null)} style={{ padding:'10px 24px', border:'none', borderRadius:8, background:'#1d4ed8', color:'#fff', fontWeight:700, cursor:'pointer' }}>Další run</button>
        </div>
      </div>
    )
  }

  const card = current!
  const pct = Math.round((idx / deck.length) * 100)

  return (
    <div className="page">
      <TopBar onBack={() => setDeck(null)}
        left={<span style={{ fontSize:12, color:'#64748b' }}>{subject ? (SUBJECT_NAME[subject] ?? subject) : 'Celé spektrum'}</span>}
        right={<><span style={{ fontSize:12, color:'#64748b' }}>{idx + 1}/{deck.length}</span><SXP xp={sessionXP} /></>}
      />
      <div style={{ height:6, background:'#f1f5f9', borderRadius:4, marginBottom:20, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:'#16a34a', transition:'width 0.25s' }} />
      </div>
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:18 }}>
        <div style={{ fontSize:10, fontWeight:800, color:'#94a3b8', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:12 }}>
          {card.subject} · {SUBJECT_NAME[card.subject] ?? card.subject}
        </div>
        <div style={{ fontSize:20, fontWeight:800, color:'#0f172a', marginBottom:10 }}>{card.topic}</div>
        <div style={{ fontSize:13, color:'#64748b', lineHeight:1.55, marginBottom:16 }}>Řekni odpověď jako u komise: otevření, 2-4 body, zkouškový háček, vazba na praxi.</div>
        <button onClick={() => setHintShown(h => !h)}
          style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
          {hintShown ? '▲ Skrýt kostru' : '▼ Kostra odpovědi'}
        </button>
        {hintShown && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.6 }}>
              <strong>Začátek:</strong> {card.open}
            </div>
            <div style={{ padding:'12px 14px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:8 }}>
              {card.body.slice(0, 5).map((b, i) => <div key={i} style={{ fontSize:12.5, color:'#334155', lineHeight:1.55, marginBottom: i === 4 ? 0 : 6 }}>{i + 1}. {b}</div>)}
            </div>
            <div style={{ padding:'12px 14px', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:8, fontSize:12.5, color:'#7c2d12', lineHeight:1.55 }}>{card.gotcha}</div>
            <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12.5, color:'#166534', lineHeight:1.55 }}>{getDiplomaHook(card.subject)}</div>
          </div>
        )}
      </div>
      {!rated ? (
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => rate(0)} style={{ flex:1, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:700, cursor:'pointer' }}>Nevím</button>
          <button onClick={() => rate(12)} style={{ flex:1, padding:'11px 8px', border:'1px solid #fde68a', borderRadius:9, background:'#fffbeb', color:'#d97706', fontWeight:700, cursor:'pointer' }}>S nápovědou +12 XP</button>
          <button onClick={() => rate(25)} style={{ flex:1, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:700, cursor:'pointer' }}>Bez koukání +25 XP</button>
        </div>
      ) : (
        <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontSize:14, fontWeight:700, cursor:'pointer' }}>Další karta →</button>
      )}
    </div>
  )
}

// ─── TOP 20 KILLER ──────────────────────────────────────────────────────────

function Killer20Mode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [defeats, setDefeats] = useState<Record<string, boolean>>(loadKillerDefeats)
  const [active, setActive] = useState<KillerQuestion | null>(null)
  const [hintShown, setHintShown] = useState(false)
  const [flash, setFlash] = useState<number | null>(null)
  const defeatedCount = KILLER_QUESTIONS.filter(q => defeats[q.id]).length

  function markDefeated(q: KillerQuestion) {
    if (!defeats[q.id]) {
      addXP(45); setFlash(45); setTimeout(() => setFlash(null), 1300)
    }
    const next = { ...defeats, [q.id]: true }
    setDefeats(next); saveKillerDefeats(next)
  }

  if (active) {
    return (
      <div className="page">
        <TopBar onBack={() => { setActive(null); setHintShown(false) }} right={flash !== null ? <XPTag amount={flash} /> : undefined} />
        <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:18 }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap:14, marginBottom:12 }}>
            <span style={{ fontSize:10, fontWeight:800, color:'#94a3b8', letterSpacing:'0.07em', textTransform:'uppercase' }}>{active.subject} · {SUBJECT_NAME[active.subject] ?? active.subject}</span>
            {defeats[active.id] && <span style={{ fontSize:11, fontWeight:700, color:'#16a34a', background:'#dcfce7', borderRadius:20, padding:'2px 8px' }}>Poraženo</span>}
          </div>
          <div style={{ fontSize:20, fontWeight:800, color:'#0f172a', marginBottom:10 }}>{active.title}</div>
          <div style={{ fontSize:15, color:'#0f172a', lineHeight:1.65, marginBottom:16 }}>{active.q}</div>
          <div style={{ fontSize:12.5, color:'#64748b', marginBottom:16 }}>Doptávka komise: {active.followUp}</div>
          <button onClick={() => setHintShown(h => !h)}
            style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
            {hintShown ? '▲ Skrýt vzor' : '▼ Vzorová odpověď'}
          </button>
          {hintShown && (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.6 }}>{active.modelAnswer}</div>
              <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12.5, color:'#166534', lineHeight:1.55 }}>{active.hook}</div>
            </div>
          )}
        </div>
        {!defeats[active.id] ? (
          <button onClick={() => markDefeated(active)} style={{ width:'100%', padding:'13px 0', background:'#16a34a', color:'#fff', border:'none', borderRadius:10, fontSize:15, fontWeight:800, cursor:'pointer' }}>
            Umím pod tlakem +45 XP
          </button>
        ) : (
          <div style={{ textAlign:'center', padding:'12px 0', fontSize:14, color:'#16a34a', fontWeight:700 }}>✓ Tohle už máš označené jako zvládnuté</div>
        )}
      </div>
    )
  }

  return (
    <div className="page">
      <div style={{ marginBottom:24 }}><BackBtn onBack={onBack} /></div>
      <div className="page-title">Top 20 killer otázek</div>
      <div className="page-subtitle">{defeatedCount} / {KILLER_QUESTIONS.length} poraženo · otázky, které umí rozhodnout známku.</div>
      <div style={{ height:6, background:'#f1f5f9', borderRadius:4, marginBottom:20, overflow:'hidden' }}>
        <div style={{ width:`${(defeatedCount / KILLER_QUESTIONS.length) * 100}%`, height:'100%', background:'#16a34a', transition:'width 0.25s' }} />
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {KILLER_QUESTIONS.map((q, i) => (
          <button key={q.id} onClick={() => setActive(q)}
            style={{ padding:'14px 16px', border:`1px solid ${defeats[q.id] ? '#bbf7d0' : '#e2e8f0'}`, borderRadius:9, background:defeats[q.id] ? '#f0fdf4' : '#fff', cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ width:26, height:26, borderRadius:'50%', background:defeats[q.id] ? '#16a34a' : '#f1f5f9', color:defeats[q.id] ? '#fff' : '#64748b', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, flexShrink:0 }}>{i + 1}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13.5, fontWeight:700, color:'#0f172a', marginBottom:3 }}>{q.title}</div>
              <div style={{ fontSize:11.5, color:'#64748b' }}>{q.subject} · {SUBJECT_NAME[q.subject] ?? q.subject}</div>
            </div>
            {!defeats[q.id] && <span style={{ fontSize:11, fontWeight:700, color:'#16a34a', background:'#dcfce7', borderRadius:20, padding:'2px 8px' }}>+45 XP</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── ZÁCHRANNÝ TAHÁK ────────────────────────────────────────────────────────

function TahakMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [active, setActive] = useState(RESCUE_DECK[0].id)
  const [randomLine, setRandomLine] = useState<string | null>(null)
  const [sessionXP, setSessionXP] = useState(0)
  const deck = RESCUE_DECK.find(d => d.id === active) ?? RESCUE_DECK[0]

  function draw() {
    const lines = RESCUE_DECK.flatMap(d => d.lines)
    setRandomLine(lines[Math.floor(Math.random() * lines.length)])
  }

  function used() {
    addXP(5)
    setSessionXP(x => x + 5)
  }

  return (
    <div className="page">
      <TopBar onBack={onBack} right={<SXP xp={sessionXP} />} />
      <div className="page-title">Tahák do ústní</div>
      <div className="page-subtitle">Krátké věty, které udrží odpověď v pohybu, když komise přitlačí.</div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:18 }}>
        {RESCUE_DECK.map(d => (
          <button key={d.id} onClick={() => { setActive(d.id); setRandomLine(null) }}
            style={{ padding:'7px 10px', border:`1px solid ${active === d.id ? '#1d4ed8' : '#e2e8f0'}`, borderRadius:7, background:active === d.id ? '#eff6ff' : '#fff', color:active === d.id ? '#1d4ed8' : '#475569', fontSize:12, fontWeight:700, cursor:'pointer' }}>
            {d.title}
          </button>
        ))}
      </div>
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'24px 28px', marginBottom:16 }}>
        <div style={{ fontSize:15, fontWeight:800, color:'#0f172a', marginBottom:14 }}>{deck.title}</div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {deck.lines.map(line => (
            <div key={line} style={{ padding:'11px 13px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, fontSize:13, color:'#334155', lineHeight:1.5 }}>{line}</div>
          ))}
        </div>
      </div>
      {randomLine && (
        <div style={{ padding:'14px 16px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, color:'#166534', fontWeight:700, fontSize:13, lineHeight:1.55, marginBottom:12 }}>
          {randomLine}
        </div>
      )}
      <div style={{ display:'flex', gap:8 }}>
        <button onClick={draw} style={{ flex:1, padding:'11px 0', border:'1px solid #bfdbfe', borderRadius:9, background:'#eff6ff', color:'#1d4ed8', fontWeight:800, cursor:'pointer' }}>Náhodná věta</button>
        <button onClick={used} style={{ flex:1, padding:'11px 0', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800, cursor:'pointer' }}>Použil jsem +5 XP</button>
      </div>
    </div>
  )
}

// ─── HISTORICKÝ SIGNÁL ─────────────────────────────────────────────────────────

type HistoricalExaminerFilter = SignalExaminer | 'Vše'
type HistoricalSourceFilter = SignalSource | 'all'

const HISTORICAL_EXAMINERS: HistoricalExaminerFilter[] = ['Vše', 'Smutný', 'Sedláček', 'Sigmund', 'Cross', 'Legacy']
const HISTORICAL_SOURCES: Array<{ id: HistoricalSourceFilter; label: string }> = [
  { id:'all', label:'Vše' },
  { id:'sylabus', label:'Sylabus 4IM_1' },
  { id:'committee_signal', label:'Komise signal' },
  { id:'legacy_outline', label:'Historické/Bc' },
]

function filterHistoricalDeck(examiner: HistoricalExaminerFilter, source: HistoricalSourceFilter): HistoricalSignalQuestion[] {
  return HISTORICAL_SIGNAL_QUESTIONS.filter(q =>
    (examiner === 'Vše' || q.examiner === examiner) &&
    (source === 'all' || q.source === source)
  )
}

function HistorieMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [examiner, setExaminer] = useState<HistoricalExaminerFilter>('Vše')
  const [source, setSource] = useState<HistoricalSourceFilter>('all')
  const [deck, setDeck] = useState<HistoricalSignalQuestion[]>(() => shuffle(HISTORICAL_SIGNAL_QUESTIONS))
  const [idx, setIdx] = useState(0)
  const [hintShown, setHintShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const [wins, setWins] = useState<Record<string, boolean>>(loadHistorieWins)
  const [timeLeft, setTimeLeft] = useState(90)
  const current = deck.length ? deck[idx % deck.length] : null
  const masteredCount = HISTORICAL_SIGNAL_QUESTIONS.filter(q => wins[q.id]).length
  const template = HISTORICAL_ANSWER_TEMPLATES[0]

  useEffect(() => {
    if (!current || rated || hintShown || timeLeft <= 0) return
    const timer = window.setTimeout(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => window.clearTimeout(timer)
  }, [current, rated, hintShown, timeLeft])

  function reset(nextExaminer = examiner, nextSource = source) {
    const pool = filterHistoricalDeck(nextExaminer, nextSource)
    setDeck(shuffle(pool))
    setIdx(0)
    setHintShown(false)
    setRated(false)
    setTimeLeft(90)
  }

  function changeExaminer(next: HistoricalExaminerFilter) {
    setExaminer(next)
    reset(next, source)
  }

  function changeSource(next: HistoricalSourceFilter) {
    setSource(next)
    reset(examiner, next)
  }

  function rate(xp: number, mastered: boolean) {
    if (rated || !current) return
    setRated(true)
    if (xp === 0) registerWeakness(historicalToWeak(current))
    if (mastered) registerWeakWin(`historie-${current.id}`)
    if (xp > 0) {
      addXP(xp)
      setSessionXP(p => p + xp)
    }
    if (mastered && !wins[current.id]) {
      const next = { ...wins, [current.id]: true }
      setWins(next)
      saveHistorieWins(next)
    }
  }

  function next() {
    setIdx(i => i + 1)
    setHintShown(false)
    setRated(false)
    setTimeLeft(90)
  }

  return (
    <div className="page">
      <TopBar onBack={onBack}
        left={<span style={{ fontSize:12, color:'#64748b' }}>{SZZ_SYLLABUS_TOPICS.length} okruhů 4IM_1 · {HISTORICAL_SIGNAL_QUESTIONS.length} signálů</span>}
        right={<SXP xp={sessionXP} />}
      />
      <div className="page-title">Historický signál</div>
      <div className="page-subtitle">Sylabus je zdroj pravdy. Historické otázky jsou tlakový drill: co může komise vytáhnout bokem a jak to vrátit do praxe.</div>

      <details style={{ border:'1px solid #e2e8f0', borderRadius:10, background:'#fff', padding:'12px 14px', marginBottom:16 }}>
        <summary style={{ cursor:'pointer', fontSize:13, fontWeight:800, color:'#0f172a' }}>
          Zdroj pravdy: {SZZ_SYLLABUS_TOPICS.length} okruhů ze sylabu 4IM_1
        </summary>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(210px, 1fr))', gap:8, marginTop:12 }}>
          {SZZ_SYLLABUS_TOPICS.map(t => (
            <div key={t.id} style={{ border:'1px solid #e2e8f0', borderRadius:8, padding:'10px 11px', background:'#f8fafc' }}>
              <div style={{ fontSize:10, color:'#64748b', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>{t.area}</div>
              <div style={{ fontSize:12.5, color:'#0f172a', fontWeight:800, lineHeight:1.35, marginBottom:6 }}>{t.title}</div>
              <div style={{ fontSize:11.5, color:'#475569', lineHeight:1.45 }}>{t.mustHave.slice(0, 3).join(' · ')}</div>
            </div>
          ))}
        </div>
      </details>

      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:10 }}>
        {HISTORICAL_EXAMINERS.map(e => (
          <button key={e} onClick={() => changeExaminer(e)}
            style={{ padding:'7px 10px', border:`1px solid ${examiner === e ? '#1d4ed8' : '#e2e8f0'}`, borderRadius:7, background:examiner === e ? '#eff6ff' : '#fff', color:examiner === e ? '#1d4ed8' : '#475569', fontSize:12, fontWeight:800, cursor:'pointer' }}>
            {e}
          </button>
        ))}
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:18 }}>
        {HISTORICAL_SOURCES.map(s => (
          <button key={s.id} onClick={() => changeSource(s.id)}
            style={{ padding:'7px 10px', border:`1px solid ${source === s.id ? '#16a34a' : '#e2e8f0'}`, borderRadius:7, background:source === s.id ? '#f0fdf4' : '#fff', color:source === s.id ? '#166534' : '#475569', fontSize:12, fontWeight:800, cursor:'pointer' }}>
            {s.label}
          </button>
        ))}
        <button onClick={() => reset()} style={{ padding:'7px 10px', border:'1px solid #e2e8f0', borderRadius:7, background:'#fff', color:'#475569', fontSize:12, fontWeight:800, cursor:'pointer' }}>
          Zamíchat
        </button>
      </div>

      {!current ? (
        <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', color:'#64748b' }}>
          Tahle kombinace filtru nemá otázky. Dej Vše nebo jiný zdroj.
        </div>
      ) : (
        <>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <div style={{ flex:1, height:8, background:'#f1f5f9', borderRadius:20, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${(timeLeft / 90) * 100}%`, background:timeLeft > 20 ? '#16a34a' : '#ef4444', transition:'width 0.25s' }} />
            </div>
            <span style={{ width:52, textAlign:'right', fontSize:12, fontWeight:800, color:timeLeft > 20 ? '#16a34a' : '#ef4444' }}>{timeLeft}s</span>
          </div>

          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'26px 30px', marginBottom:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', gap:12, marginBottom:12, flexWrap:'wrap' }}>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                <span style={{ fontSize:10, fontWeight:800, color:'#1d4ed8', background:'#eff6ff', borderRadius:20, padding:'3px 8px' }}>{current.examiner}</span>
                <span style={{ fontSize:10, fontWeight:800, color:'#166534', background:'#f0fdf4', borderRadius:20, padding:'3px 8px' }}>{current.source}</span>
                {wins[current.id] && <span style={{ fontSize:10, fontWeight:800, color:'#16a34a', background:'#dcfce7', borderRadius:20, padding:'3px 8px' }}>zvládnuto</span>}
              </div>
              <span style={{ fontSize:11, color:'#64748b' }}>{idx + 1}/{deck.length} · {masteredCount}/{HISTORICAL_SIGNAL_QUESTIONS.length} mastered</span>
            </div>
            <div style={{ fontSize:12, color:'#64748b', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8 }}>{current.topic}</div>
            <div style={{ fontSize:20, fontWeight:800, color:'#0f172a', lineHeight:1.35, marginBottom:12 }}>{current.question}</div>
            <div style={{ fontSize:12.5, color:'#64748b', lineHeight:1.55, marginBottom:14 }}>
              Vzor 90 s: {template.steps.join(' → ')}.
            </div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
              {current.tags.map(tag => (
                <span key={tag} style={{ fontSize:10, fontWeight:800, color:'#475569', background:'#f1f5f9', borderRadius:20, padding:'3px 8px' }}>{tag}</span>
              ))}
            </div>
            <button onClick={() => setHintShown(h => !h)}
              style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
              {hintShown ? '▲ Skrýt vzor' : '▼ Ukázat vzor odpovědi'}
            </button>
            {hintShown && (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div style={{ padding:'12px 14px', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:8, fontSize:12.5, color:'#7c2d12', lineHeight:1.55 }}>
                  <strong>Historický vzor:</strong> {current.pattern}
                </div>
                <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.65 }}>
                  {current.modelAnswer}
                </div>
                <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12.5, color:'#166534', lineHeight:1.55 }}>
                  <strong>Most do praxe:</strong> {current.practicalBridge}
                </div>
                <div style={{ fontSize:11.5, color:'#64748b' }}>Vazba na sylabus: {current.syllabusLink}</div>
              </div>
            )}
          </div>

          {!rated ? (
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={() => rate(0, false)} style={{ flex:1, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:800, cursor:'pointer' }}>Zasekl jsem se</button>
              <button onClick={() => rate(14, false)} style={{ flex:1, padding:'11px 8px', border:'1px solid #fde68a', borderRadius:9, background:'#fffbeb', color:'#d97706', fontWeight:800, cursor:'pointer' }}>Přežil jsem +14 XP</button>
              <button onClick={() => rate(30, true)} style={{ flex:1, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800, cursor:'pointer' }}>Jedničkově +30 XP</button>
            </div>
          ) : (
            <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontSize:14, fontWeight:800, cursor:'pointer' }}>Další historický signál →</button>
          )}
        </>
      )}
    </div>
  )
}

// ─── X VS Y DUEL ───────────────────────────────────────────────────────────────

function DuelMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [deck, setDeck] = useState(() => shuffle(DUEL_PAIRS))
  const [idx, setIdx] = useState(0)
  const [hintShown, setHintShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const pair = deck[idx % deck.length]

  function rate(ok: boolean) {
    if (rated) return
    setRated(true)
    if (ok) {
      addXP(24)
      setSessionXP(x => x + 24)
    } else {
      registerWeakness({ ...drillToWeak({
        id: `duel-${pair.id}`,
        subject: pair.subject,
        title: `${pair.left} vs ${pair.right}`,
        q: `Rozliš: ${pair.left} vs ${pair.right}`,
        modelAnswer: pair.answer,
        hook: pair.hook,
        followUp: pair.trap,
      }, 'X vs Y duel') })
    }
  }

  function next() {
    if (idx + 1 >= deck.length) setDeck(shuffle(DUEL_PAIRS))
    setIdx(i => i + 1)
    setHintShown(false)
    setRated(false)
  }

  return (
    <div className="page">
      <TopBar onBack={onBack} right={<SXP xp={sessionXP} />} />
      <div className="page-title">X vs Y duel</div>
      <div className="page-subtitle">Krátké rozlišení pojmů, které komise ráda zkouší v doptávkách.</div>
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'30px 34px', marginBottom:16 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:14, alignItems:'center', marginBottom:16 }}>
          <div style={{ padding:'18px', border:'1px solid #bfdbfe', borderRadius:10, background:'#eff6ff', color:'#1d4ed8', fontSize:20, fontWeight:900, textAlign:'center' }}>{pair.left}</div>
          <div style={{ fontSize:12, color:'#64748b', fontWeight:900 }}>VS</div>
          <div style={{ padding:'18px', border:'1px solid #bbf7d0', borderRadius:10, background:'#f0fdf4', color:'#166534', fontSize:20, fontWeight:900, textAlign:'center' }}>{pair.right}</div>
        </div>
        <div style={{ fontSize:13, color:'#64748b', marginBottom:14 }}>Řekni rozdíl ve 3 větách: účel prvního, účel druhého, praktický dopad.</div>
        <button onClick={() => setHintShown(h => !h)} style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
          {hintShown ? '▲ Skrýt rozdíl' : '▼ Ukázat rozdíl'}
        </button>
        {hintShown && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, color:'#1e3a8a', fontSize:12.5, lineHeight:1.6 }}>{pair.answer}</div>
            <div style={{ padding:'12px 14px', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:8, color:'#7c2d12', fontSize:12.5, lineHeight:1.55 }}>Past: {pair.trap}</div>
            <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, color:'#166534', fontSize:12.5, lineHeight:1.55 }}>{pair.hook}</div>
          </div>
        )}
      </div>
      {!rated ? (
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => rate(false)} style={{ flex:1, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:800 }}>Pletu si to</button>
          <button onClick={() => rate(true)} style={{ flex:1, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800 }}>Rozlišeno +24 XP</button>
        </div>
      ) : <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontWeight:800 }}>Další duel →</button>}
    </div>
  )
}

// ─── CONFIDENCE CHECK ─────────────────────────────────────────────────────────

function ConfidenceMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [deck, setDeck] = useState(() => shuffle(MIXED_DRILL))
  const [idx, setIdx] = useState(0)
  const [confidence, setConfidence] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const q = deck[idx % deck.length]

  function verdict(ok: boolean) {
    if (rated) return
    setRated(true)
    if (ok) {
      const xp = confidence && confidence >= 4 ? 26 : 16
      addXP(xp)
      setSessionXP(x => x + xp)
      registerWeakWin(q.id)
    } else {
      registerWeakness(drillToWeak(q, confidence && confidence >= 4 ? 'Confidence chyba' : 'Confidence slabina'))
    }
  }

  function next() {
    if (idx + 1 >= deck.length) setDeck(shuffle(MIXED_DRILL))
    setIdx(i => i + 1)
    setConfidence(null)
    setRevealed(false)
    setRated(false)
  }

  return (
    <div className="page">
      <TopBar onBack={onBack} right={<SXP xp={sessionXP} />} />
      <div className="page-title">Confidence check</div>
      <div className="page-subtitle">Nejdřív odhadni jistotu 1-5. Appka chytá hlavně falešnou jistotu.</div>
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:16 }}>
        <div style={{ fontSize:11, color:'#64748b', fontWeight:800, textTransform:'uppercase', marginBottom:10 }}>{SUBJECT_NAME[q.subject] ?? q.subject}</div>
        <div style={{ fontSize:19, fontWeight:850, color:'#0f172a', lineHeight:1.45, marginBottom:16 }}>{q.q}</div>
        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setConfidence(n)}
              style={{ width:42, height:42, border:`1px solid ${confidence === n ? '#1d4ed8' : '#e2e8f0'}`, borderRadius:8, background:confidence === n ? '#eff6ff' : '#fff', color:confidence === n ? '#1d4ed8' : '#475569', fontWeight:900 }}>
              {n}
            </button>
          ))}
        </div>
        <button disabled={!confidence} onClick={() => setRevealed(true)} style={{ padding:'9px 14px', border:'1px solid #bfdbfe', borderRadius:8, background:confidence ? '#eff6ff' : '#f8fafc', color:confidence ? '#1d4ed8' : '#94a3b8', fontWeight:800 }}>
          Odkrýt vzor
        </button>
        {revealed && (
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:14 }}>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, color:'#1e3a8a', fontSize:12.5, lineHeight:1.6, whiteSpace:'pre-wrap' }}>{q.modelAnswer}</div>
            <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, color:'#166534', fontSize:12.5, lineHeight:1.55 }}>{q.hook}</div>
          </div>
        )}
      </div>
      {revealed && !rated ? (
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => verdict(false)} style={{ flex:1, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:800 }}>Netrefil jsem to</button>
          <button onClick={() => verdict(true)} style={{ flex:1, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800 }}>Sedí +XP</button>
        </div>
      ) : rated ? <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontWeight:800 }}>Další check →</button> : null}
    </div>
  )
}

// ─── FEYNMAN MÓD ──────────────────────────────────────────────────────────────

function FeynmanMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [deck, setDeck] = useState(() => shuffle(MIXED_DRILL))
  const [idx, setIdx] = useState(0)
  const [audienceIdx, setAudienceIdx] = useState(0)
  const [hintShown, setHintShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const q = deck[idx % deck.length]
  const audience = FEYNMAN_AUDIENCES[audienceIdx % FEYNMAN_AUDIENCES.length]

  function rate(ok: boolean) {
    if (rated) return
    setRated(true)
    if (ok) {
      addXP(22)
      setSessionXP(x => x + 22)
      registerWeakWin(q.id)
    } else registerWeakness(drillToWeak(q, 'Feynman mód'))
  }

  function next() {
    if (idx + 1 >= deck.length) setDeck(shuffle(MIXED_DRILL))
    setIdx(i => i + 1)
    setAudienceIdx(i => i + 1)
    setHintShown(false)
    setRated(false)
  }

  return (
    <div className="page">
      <TopBar onBack={onBack} right={<SXP xp={sessionXP} />} />
      <div className="page-title">Feynman mód</div>
      <div className="page-subtitle">Stejné téma vysvětli jinému publiku. Když to nejde jednoduše, ještě to není tvoje.</div>
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:16 }}>
        <div style={{ fontSize:12, color:'#64748b', marginBottom:8 }}>Vysvětli <strong>{audience.label}</strong>: {audience.angle}</div>
        <div style={{ fontSize:19, fontWeight:850, color:'#0f172a', lineHeight:1.45, marginBottom:14 }}>{q.title}</div>
        <div style={{ padding:'12px 14px', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:8, color:'#7c2d12', fontSize:13, fontWeight:800, lineHeight:1.5, marginBottom:14 }}>
          Zakázáno: recitovat definici. Povinně: příklad a jedna věta do praxe.
        </div>
        <button onClick={() => setHintShown(h => !h)} style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
          {hintShown ? '▲ Skrýt osnovu' : '▼ Osnova'}
        </button>
        {hintShown && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, color:'#1e3a8a', fontSize:12.5, lineHeight:1.6, whiteSpace:'pre-wrap' }}>{q.modelAnswer}</div>
            <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, color:'#166534', fontSize:12.5, lineHeight:1.55 }}>{q.hook}</div>
          </div>
        )}
      </div>
      {!rated ? (
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => rate(false)} style={{ flex:1, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:800 }}>Moc složité</button>
          <button onClick={() => rate(true)} style={{ flex:1, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800 }}>Srozumitelné +22 XP</button>
        </div>
      ) : <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontWeight:800 }}>Další publikum →</button>}
    </div>
  )
}

// ─── BLANK PAGE DRILL ─────────────────────────────────────────────────────────

function BlankPageMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [deck, setDeck] = useState(() => shuffle(MIXED_DRILL))
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [shown, setShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const q = deck[idx % deck.length]
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  function rate(ok: boolean) {
    if (rated) return
    setRated(true)
    if (ok) {
      addXP(26)
      setSessionXP(x => x + 26)
      registerWeakWin(q.id)
    } else registerWeakness(drillToWeak(q, 'Blank page drill'))
  }

  function next() {
    if (idx + 1 >= deck.length) setDeck(shuffle(MIXED_DRILL))
    setIdx(i => i + 1)
    setText('')
    setShown(false)
    setRated(false)
  }

  return (
    <div className="page">
      <TopBar onBack={onBack} right={<SXP xp={sessionXP} />} />
      <div className="page-title">Blank page drill</div>
      <div className="page-subtitle">Téma → prázdná plocha → checklist. Nejrychlejší test, jestli umíš vybavit strukturu.</div>
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'24px 28px', marginBottom:14 }}>
        <div style={{ fontSize:11, color:'#64748b', fontWeight:800, textTransform:'uppercase', marginBottom:8 }}>{SUBJECT_NAME[q.subject] ?? q.subject}</div>
        <div style={{ fontSize:20, fontWeight:900, color:'#0f172a', marginBottom:12 }}>{q.title}</div>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Napiš nebo si nahlas řekni osnovu: definice, rozdíl, příklad, riziko, diplomka..."
          style={{ width:'100%', minHeight:170, resize:'vertical', border:'1px solid #e2e8f0', borderRadius:8, padding:'12px 14px', font:'inherit', lineHeight:1.55, color:'#0f172a', marginBottom:10 }} />
        <div style={{ display:'flex', justifyContent:'space-between', gap:10, alignItems:'center' }}>
          <span style={{ fontSize:12, color:'#64748b' }}>{wordCount} slov</span>
          <button onClick={() => setShown(true)} style={{ padding:'9px 14px', border:'1px solid #bfdbfe', borderRadius:8, background:'#eff6ff', color:'#1d4ed8', fontWeight:800 }}>Ukázat checklist</button>
        </div>
        {shown && (
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:14 }}>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, color:'#1e3a8a', fontSize:12.5, lineHeight:1.6, whiteSpace:'pre-wrap' }}>{q.modelAnswer}</div>
            <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, color:'#166534', fontSize:12.5, lineHeight:1.55 }}>{q.hook}</div>
          </div>
        )}
      </div>
      {shown && !rated ? (
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => rate(false)} style={{ flex:1, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:800 }}>Chyběla struktura</button>
          <button onClick={() => rate(true)} style={{ flex:1, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800 }}>Měl jsem kostru +26 XP</button>
        </div>
      ) : rated ? <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontWeight:800 }}>Další blank page →</button> : null}
    </div>
  )
}

// ─── SMUTNÝ PACK ───────────────────────────────────────────────────────────────

function SmutnyMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [deck, setDeck] = useState<SmutnyPackItem[]>(() => buildSmutnyPack())
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const [answers, setAnswers] = useState<Record<string, 'miss' | 'survive' | 'dominate'>>({})
  const current = deck[idx]
  const finished = idx >= deck.length
  const misses = deck.filter(item => answers[item.id] === 'miss')
  const lanes = Array.from(new Set(deck.map(item => item.lane)))
  const doneLanes = new Set(Object.keys(answers).map(id => deck.find(item => item.id === id)?.lane).filter(Boolean))

  function rate(kind: 'miss' | 'survive' | 'dominate') {
    if (rated || !current) return
    const xp = kind === 'dominate' ? 32 : kind === 'survive' ? 14 : 0
    setRated(true)
    setShown(true)
    setAnswers(prev => ({ ...prev, [current.id]: kind }))
    if (kind === 'miss') registerWeakness(smutnyToWeak(current))
    else registerWeakWin(`smutny-${current.id}`)
    if (xp > 0) {
      addXP(xp)
      setSessionXP(p => p + xp)
    }
  }

  function next() {
    setIdx(i => i + 1)
    setShown(false)
    setRated(false)
  }

  function restartAll() {
    setDeck(buildSmutnyPack())
    setIdx(0)
    setShown(false)
    setRated(false)
    setAnswers({})
    setSessionXP(0)
  }

  function restartMisses() {
    if (!misses.length) return
    setDeck(misses)
    setIdx(0)
    setShown(false)
    setRated(false)
    setAnswers({})
  }

  if (finished) {
    return (
      <div className="page">
        <BackBtn onBack={onBack} />
        <div style={{ textAlign:'center', padding:'42px 0' }}>
          <div style={{ fontSize:24, fontWeight:900, color:'#0f172a', marginBottom:8 }}>Smutný pack hotový</div>
          <div style={{ fontSize:14, color:'#64748b', marginBottom:18 }}>
            Prošel jsi {Object.keys(answers).length}/{deck.length} karet · slabiny {misses.length} · +{sessionXP} XP
          </div>
          {misses.length > 0 && (
            <div style={{ maxWidth:720, margin:'0 auto 18px', textAlign:'left', background:'#fff', border:'1px solid #fecaca', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:12, fontWeight:900, color:'#ef4444', textTransform:'uppercase', marginBottom:10 }}>Tohle ještě otočit před komisí</div>
              {misses.slice(0, 10).map(m => (
                <div key={m.id} style={{ fontSize:13, color:'#334155', lineHeight:1.45, marginBottom:7 }}>
                  <strong>{m.lane}:</strong> {m.topic}
                </div>
              ))}
            </div>
          )}
          <button onClick={restartAll} style={{ padding:'11px 22px', border:'none', borderRadius:8, background:'#1d4ed8', color:'#fff', fontWeight:800, cursor:'pointer', marginRight:8 }}>Nový Smutný run</button>
          {misses.length > 0 && <button onClick={restartMisses} style={{ padding:'11px 22px', border:'1px solid #fecaca', borderRadius:8, background:'#fef2f2', color:'#ef4444', fontWeight:800, cursor:'pointer' }}>Jen co jsem nevěděl</button>}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <TopBar onBack={onBack}
        left={<span style={{ fontSize:12, color:'#64748b' }}>Smutný: sociotechnika · metodologie · praxe · doptávky</span>}
        right={<><span style={{ fontSize:12, color:'#64748b' }}>{idx + 1}/{deck.length}</span><SXP xp={sessionXP} /></>}
      />
      <div className="page-title">Smutný na chleba</div>
      <div className="page-subtitle">Cílený drill na to, co u něj může rozhodovat: sociální informatika, sociotechnický pohled, metodologie, stakeholdery, AI/etika, FOR/CSV/JSON a most do praxe.</div>

      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:16 }}>
        {lanes.map(lane => {
          const done = doneLanes.has(lane)
          return (
            <span key={lane} style={{
              fontSize:10.5, fontWeight:800, borderRadius:20, padding:'3px 8px',
              background: done ? '#dcfce7' : '#f8fafc',
              color: done ? '#166534' : '#64748b',
              border: `1px solid ${done ? '#bbf7d0' : '#e2e8f0'}`,
            }}>{lane}</span>
          )
        })}
      </div>

      <div style={{ height:6, background:'#f1f5f9', borderRadius:4, marginBottom:18, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${Math.round((idx / deck.length) * 100)}%`, background:'#1d4ed8', transition:'width 0.25s' }} />
      </div>

      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap:10, flexWrap:'wrap', marginBottom:12 }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            <span style={{ fontSize:10, color:'#1d4ed8', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>{current.lane}</span>
            <span style={{ fontSize:10, color:'#7c2d12', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>{current.topic}</span>
          </div>
          <span style={{ fontSize:11, color:'#64748b' }}>doc. Smutný pressure</span>
        </div>

        <div style={{ fontSize:18, fontWeight:850, color:'#0f172a', lineHeight:1.45, marginBottom:12 }}>{current.question}</div>
        <div style={{ padding:'12px 14px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, color:'#334155', fontSize:12.5, lineHeight:1.55, marginBottom:14 }}>
          <strong>Očekávaný tah:</strong> {current.expectedMove}
        </div>

        {current.followUps.length > 0 && (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:'#94a3b8', fontWeight:900, textTransform:'uppercase', marginBottom:6 }}>Možné doptávky</div>
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              {current.followUps.map(f => <div key={f} style={{ fontSize:12.5, color:'#475569' }}>• {f}</div>)}
            </div>
          </div>
        )}

        <button onClick={() => setShown(h => !h)}
          style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: shown ? 12 : 0 }}>
          {shown ? '▲ Skrýt tahy' : '▼ Ukázat odpověď, past a most'}
        </button>
        {shown && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.6 }}>{current.answer}</div>
            <div style={{ padding:'12px 14px', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:8, fontSize:12.5, color:'#7c2d12', lineHeight:1.55 }}><strong>Past:</strong> {current.trap}</div>
            <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12.5, color:'#166534', lineHeight:1.55 }}><strong>Most do praxe:</strong> {current.practicalBridge}</div>
          </div>
        )}
      </div>

      {!rated ? (
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <button onClick={() => rate('miss')} style={{ flex:1, minWidth:160, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:800, cursor:'pointer' }}>Zasekl jsem se</button>
          <button onClick={() => rate('survive')} style={{ flex:1, minWidth:160, padding:'11px 8px', border:'1px solid #fde68a', borderRadius:9, background:'#fffbeb', color:'#d97706', fontWeight:800, cursor:'pointer' }}>Přežil jsem +14 XP</button>
          <button onClick={() => rate('dominate')} style={{ flex:1, minWidth:160, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800, cursor:'pointer' }}>Rozebral jsem ho +32 XP</button>
        </div>
      ) : (
        <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontSize:14, fontWeight:800, cursor:'pointer' }}>Další Smutný karta →</button>
      )}
    </div>
  )
}

// ─── SOS KOMISE ────────────────────────────────────────────────────────────────

type SosScenario = {
  id: string
  label: string
  trigger: string
  start: string
  answer: string
  bridge: string
  followUp: string
  trap: string
}

const SOS_SCENARIOS: SosScenario[] = [
  {
    id: 'too-general',
    label: 'Moc obecné',
    trigger: 'Komise řekne: "To zní moc obecně. Ukažte to konkrétně."',
    start: 'Zkonkrétním to na procesu: kdo vstup vytváří, kdo ho schvaluje, jaká data se mění a kde je kontrolní bod.',
    answer: 'Nezůstal bych u definice. V podnikovém IS má každý pojem dopad na konkrétní proces, roli, datový objekt a rozhodnutí. Proto odpověď převedu na příklad v ERP: doklad, workflow, role, kontrola a metrika.',
    bridge: 'V praxi to ukazuji přes AS-IS/TO-BE proces a odpovědnosti v ERP optimalizaci.',
    followUp: 'Který stakeholder by s tím mohl nesouhlasit a proč?',
    trap: 'Neopakovat stejnou obecnou definici hlasitěji. Přejít na konkrétní mechanismus.',
  },
  {
    id: 'thesis-link',
    label: 'Diplomka',
    trigger: 'Komise se zeptá: "Jak to souvisí s vaší diplomkou?"',
    start: 'V mojí praxi se to projevuje na ERP procesu: stakeholder, data, kontrola, riziko a měřitelný dopad.',
    answer: 'Každé téma převedu do pěti prvků: kdo rozhoduje, jaký proces se mění, jaká data jsou potřeba, jak se řídí riziko a jak poznám přínos. Tím se obecná teorie napojí na návrh procesní a governance optimalizace.',
    bridge: 'Tahle vazba je moje bezpečná osa: ERP není jen technický systém, ale řízená organizační změna.',
    followUp: 'Jaký konkrétní artefakt z praxe byste ukázal jako důkaz?',
    trap: 'Neříkat jen název praxe. Říct přesný mechanismus vazby.',
  },
  {
    id: 'dont-know-detail',
    label: 'Nevím detail',
    trigger: 'Komise chce detail normy, roku, zkratky nebo přesné číslo a ty si nejsi jistý.',
    start: 'Nechci hádat přesné číslo; jistý jsem si principem a jeho dopadem v praxi.',
    answer: 'U zkoušky bych raději oddělil detail, kterým si nejsem jistý, od principu, který umím vysvětlit. Princip je: odpovědnost, kontrola, měření nebo bezpečnostní opatření musí být jasně navázané na proces a riziko.',
    bridge: 'V ERP kontextu je důležité hlavně to, kdo je accountable, jaká evidence existuje a jak se ověří dopad změny.',
    followUp: 'Jak byste si ten detail ověřil v reálné organizaci?',
    trap: 'Nevymýšlet si. Lepší je přiznat limit a držet princip.',
  },
  {
    id: 'x-vs-y',
    label: 'X vs Y',
    trigger: 'Komise dá srovnání dvou podobných pojmů a čeká jasné rozlišení.',
    start: 'Rozdíl bych postavil na účelu, úrovni řízení a praktickém použití.',
    answer: 'Nejdřív řeknu, co oba pojmy řeší společně. Pak je rozdělím: první typicky odpovídá na otázku proč/co/kdo, druhý na otázku jak/čím/kdy. Nakonec dám příklad, kdy by se použily společně.',
    bridge: 'U ERP optimalizace se podobné dvojice často potkají: governance určuje pravidla, management provádí změnu; kontrola definuje požadavek, audit ověřuje důkaz.',
    followUp: 'Může jeden pojem fungovat bez druhého?',
    trap: 'Neříct dvě izolované definice. Komise chce rozdíl.',
  },
  {
    id: 'blackout',
    label: 'Okno',
    trigger: 'Dostaneš okno a první věta nejde ven.',
    start: 'Rozložím si to na definici, účel, příklad a limit.',
    answer: 'Když nevím přesný začátek, použiju univerzální strukturu: pojem znamená X, používá se kvůli Y, v organizaci se projeví jako Z a jeho limit je W. Tím vytvořím rámec, do kterého můžu doplnit detaily.',
    bridge: 'V praxi pak skoro vždy navážu přes ERP proces, stakeholdera, data, kontrolu a dopad.',
    followUp: 'Jaký by byl nejjednodušší příklad z praxe?',
    trap: 'Neomlouvat se dlouho. Začít strukturou a mluvit pomaleji.',
  },
  {
    id: 'interruption',
    label: 'Přerušení',
    trigger: 'Komise tě přeruší v půlce odpovědi.',
    start: 'Ano, zpřesním to: klíčová pointa je...',
    answer: 'Přerušení neberu jako prohru, ale jako signál, kam odpověď zúžit. Navážu na jejich slovo, zopakuji jednu hlavní myšlenku a dám konkrétní příklad. Tím držím kontrolu nad strukturou odpovědi.',
    bridge: 'U ERP příkladu bych rovnou přešel k roli, datům, kontrole nebo procesu, podle toho, kam komise míří.',
    followUp: 'Jak byste to řekl jednou větou?',
    trap: 'Nezačít od začátku celé odpovědi. Navázat a zkrátit.',
  },
  {
    id: 'ai-ethics',
    label: 'AI / etika',
    trigger: 'Komise stočí otázku na AI, odpovědnost nebo etiku.',
    start: 'U AI bych vždy oddělil schopnost generovat výstup od odpovědnosti za rozhodnutí.',
    answer: 'AI nebo LLM může pomáhat s návrhem, dokumentací nebo vyhledáním vzoru, ale nemá odpovědnost ani záruku pravdivosti. V organizaci proto musí být jasné zdroje, validace, auditovatelnost a člověk, který výsledek schvaluje.',
    bridge: 'V praxi by AI mohla být podpůrný nástroj, ale governance ERP procesu a odpovědnost zůstává na lidech.',
    followUp: 'Kdy byste AI v procesu nepoužil?',
    trap: 'Neříkat, že AI "ví" nebo "rozhoduje" bez lidské odpovědnosti.',
  },
  {
    id: 'methodology-limit',
    label: 'Limit práce',
    trigger: 'Komise se ptá: "Jaký je limit vašeho výzkumu?"',
    start: 'Limit bych vymezil férově: návrh ověřuji v konkrétním kontextu, neprokazuji univerzální platnost pro všechny firmy.',
    answer: 'Silná odpověď není tvrdit, že práce dokazuje všechno. U návrhové práce je důležité říct, jaký artefakt vznikl, jak byl validován, proti jakým požadavkům a co by byl další krok: pilot, širší evaluace nebo měření po implementaci.',
    bridge: 'U ERP optimalizace to znamená, že rámec je opřený o konkrétní proces a stakeholdery, ale pro zobecnění by bylo potřeba další ověření.',
    followUp: 'Co byste udělal, kdybyste měl na práci další měsíc?',
    trap: 'Nebýt defenzivní. Limit je známka metodologické zralosti.',
  },
]

function sosToWeak(item: SosScenario): AutoWeakItem {
  return {
    id: `sos-${item.id}`,
    source: 'SOS komise',
    subject: 'přehled',
    title: item.label,
    q: item.trigger,
    modelAnswer: `${item.start}\n\n${item.answer}\n\nPast: ${item.trap}`,
    hook: item.bridge,
    followUp: item.followUp,
    misses: 0,
    wins: 0,
    lastMiss: 0,
    nextReview: 0,
  }
}

function SosMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [deck, setDeck] = useState<SosScenario[]>(() => shuffle(SOS_SCENARIOS))
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const current = deck[idx]
  const rescueLines = RESCUE_DECK.flatMap(d => d.lines)
  const rescue = rescueLines[(idx + current.id.length) % rescueLines.length]

  function rate(kind: 'panic' | 'ok' | 'clean') {
    if (rated) return
    const xp = kind === 'clean' ? 20 : kind === 'ok' ? 12 : 0
    setRated(true)
    setShown(true)
    if (kind === 'panic') registerWeakness(sosToWeak(current))
    else registerWeakWin(`sos-${current.id}`)
    if (xp > 0) {
      addXP(xp)
      setSessionXP(p => p + xp)
    }
  }

  function next() {
    const nextIdx = idx + 1
    if (nextIdx >= deck.length) {
      setDeck(shuffle(SOS_SCENARIOS))
      setIdx(0)
    } else {
      setIdx(nextIdx)
    }
    setShown(false)
    setRated(false)
  }

  return (
    <div className="page">
      <TopBar onBack={onBack}
        left={<span style={{ fontSize:12, color:'#64748b' }}>Anti-blackout · přerušení · doptávky · bezpečný návrat</span>}
        right={<><span style={{ fontSize:12, color:'#64748b' }}>{idx + 1}/{deck.length}</span><SXP xp={sessionXP} /></>}
      />
      <div className="page-title">SOS komise</div>
      <div className="page-subtitle">Rychlý trénink pro chvíle, kdy nevíš, komise tě přeruší, chce praxi, nebo odpověď zní moc obecně.</div>

      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:16 }}>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:12 }}>
          <span style={{ fontSize:10, color:'#1d4ed8', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>{current.label}</span>
          <span style={{ fontSize:10, color:'#7c2d12', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>krizová situace</span>
        </div>
        <div style={{ fontSize:19, fontWeight:850, color:'#0f172a', lineHeight:1.45, marginBottom:14 }}>{current.trigger}</div>
        <div style={{ padding:'12px 14px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, color:'#334155', fontSize:12.5, lineHeight:1.55, marginBottom:14 }}>
          <strong>První věta:</strong> {current.start}
        </div>
        <div style={{ padding:'12px 14px', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:8, color:'#7c2d12', fontSize:12.5, lineHeight:1.55, marginBottom:14 }}>
          <strong>Záchranná věta:</strong> {rescue}
        </div>
        <button onClick={() => setShown(h => !h)}
          style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: shown ? 12 : 0 }}>
          {shown ? '▲ Skrýt řešení' : '▼ Ukázat řešení'}
        </button>
        {shown && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.6 }}>{current.answer}</div>
            <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12.5, color:'#166534', lineHeight:1.55 }}><strong>Most:</strong> {current.bridge}</div>
            <div style={{ padding:'12px 14px', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:8, fontSize:12.5, color:'#7c2d12', lineHeight:1.55 }}><strong>Pozor:</strong> {current.trap}</div>
            <div style={{ fontSize:12.5, color:'#64748b' }}><strong>Doptávka:</strong> {current.followUp}</div>
          </div>
        )}
      </div>

      {!rated ? (
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <button onClick={() => rate('panic')} style={{ flex:1, minWidth:150, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:800, cursor:'pointer' }}>Zamrzl jsem</button>
          <button onClick={() => rate('ok')} style={{ flex:1, minWidth:150, padding:'11px 8px', border:'1px solid #fde68a', borderRadius:9, background:'#fffbeb', color:'#d97706', fontWeight:800, cursor:'pointer' }}>Ustál jsem +12 XP</button>
          <button onClick={() => rate('clean')} style={{ flex:1, minWidth:150, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800, cursor:'pointer' }}>Elegantně +20 XP</button>
        </div>
      ) : (
        <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontSize:14, fontWeight:800, cursor:'pointer' }}>Další SOS situace →</button>
      )}
    </div>
  )
}

// ─── AUTO KOUČ ─────────────────────────────────────────────────────────────────

function Last24Mode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [deck, setDeck] = useState<Last24Item[]>(() => buildLast24Deck())
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const [answers, setAnswers] = useState<Record<string, 'miss' | 'hint' | 'clean'>>({})
  const current = deck[idx]
  const finished = idx >= deck.length
  const seenSubjects = new Set(Object.entries(answers)
    .map(([id]) => deck.find(item => item.id === id)?.subject)
    .filter(Boolean))
  const solidSubjects = new Set(Object.entries(answers)
    .filter(([, value]) => value !== 'miss')
    .map(([id]) => deck.find(item => item.id === id)?.subject)
    .filter(Boolean))
  const missCount = Object.values(answers).filter(v => v === 'miss').length

  function rate(kind: 'miss' | 'hint' | 'clean') {
    if (rated || !current) return
    const xp = kind === 'clean' ? 24 : kind === 'hint' ? 10 : 0
    setAnswers(prev => ({ ...prev, [current.id]: kind }))
    setRated(true)
    setRevealed(true)
    if (kind === 'miss') registerWeakness(last24WeakItem(current))
    else registerWeakWin(current.id)
    if (xp > 0) {
      addXP(xp)
      setSessionXP(p => p + xp)
    }
  }

  function next() {
    setIdx(i => i + 1)
    setRevealed(false)
    setRated(false)
  }

  function restartFull() {
    setDeck(buildLast24Deck())
    setIdx(0)
    setRevealed(false)
    setRated(false)
    setAnswers({})
    setSessionXP(0)
  }

  function restartMissesOnly() {
    const misses = deck.filter(item => answers[item.id] === 'miss')
    if (!misses.length) return
    setDeck(misses)
    setIdx(0)
    setRevealed(false)
    setRated(false)
    setAnswers({})
  }

  if (finished) {
    const misses = deck.filter(item => answers[item.id] === 'miss')
    return (
      <div className="page">
        <BackBtn onBack={onBack} />
        <div style={{ textAlign:'center', padding:'42px 0' }}>
          <div style={{ fontSize:24, fontWeight:900, color:'#0f172a', marginBottom:8 }}>Posledních 24 hodin hotovo</div>
          <div style={{ fontSize:14, color:'#64748b', marginBottom:18 }}>
            Pokrytí {seenSubjects.size}/{SUBJECTS.filter(s => s.ready).length} předmětů · jistě {solidSubjects.size}/{SUBJECTS.filter(s => s.ready).length} · nevím {missCount} · +{sessionXP} XP
          </div>
          {misses.length > 0 && (
            <div style={{ maxWidth:680, margin:'0 auto 18px', textAlign:'left', background:'#fff', border:'1px solid #fecaca', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:12, fontWeight:900, color:'#ef4444', textTransform:'uppercase', marginBottom:10 }}>Ještě otočit dnes</div>
              {misses.slice(0, 8).map(m => (
                <div key={m.id} style={{ fontSize:13, color:'#334155', lineHeight:1.45, marginBottom:6 }}>
                  <strong>{SUBJECT_NAME[m.subject] ?? m.subject}:</strong> {m.title}
                </div>
              ))}
            </div>
          )}
          <button onClick={restartFull} style={{ padding:'11px 22px', border:'none', borderRadius:8, background:'#1d4ed8', color:'#fff', fontWeight:800, cursor:'pointer', marginRight:8 }}>Nový 24h průchod</button>
          {misses.length > 0 && <button onClick={restartMissesOnly} style={{ padding:'11px 22px', border:'1px solid #fecaca', borderRadius:8, background:'#fef2f2', color:'#ef4444', fontWeight:800, cursor:'pointer' }}>Jen co nevím</button>}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <TopBar onBack={onBack}
        left={<span style={{ fontSize:12, color:'#64748b' }}>24h režim: pokrytí všech předmětů → slabiny → komise</span>}
        right={<><span style={{ fontSize:12, color:'#64748b' }}>{idx + 1}/{deck.length}</span><SXP xp={sessionXP} /></>}
      />
      <div className="page-title">Posledních 24 hodin</div>
      <div className="page-subtitle">Kompletní průchod spektrem. Když něco nevíš, appka ti dá osnovu, záchranné věty a uloží otázku do slabin.</div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:8, marginBottom:14 }}>
        <div style={{ padding:'10px 12px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:8 }}>
          <div style={{ fontSize:10, color:'#64748b', fontWeight:800, textTransform:'uppercase' }}>Předměty bez paniky</div>
          <div style={{ fontSize:20, color:'#1d4ed8', fontWeight:900 }}>{seenSubjects.size}/{SUBJECTS.filter(s => s.ready).length}</div>
        </div>
        <div style={{ padding:'10px 12px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:8 }}>
          <div style={{ fontSize:10, color:'#64748b', fontWeight:800, textTransform:'uppercase' }}>Nevím</div>
          <div style={{ fontSize:20, color:'#ef4444', fontWeight:900 }}>{missCount}</div>
        </div>
        <div style={{ padding:'10px 12px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:8 }}>
          <div style={{ fontSize:10, color:'#64748b', fontWeight:800, textTransform:'uppercase' }}>Zbývá</div>
          <div style={{ fontSize:20, color:'#0f172a', fontWeight:900 }}>{Math.max(0, deck.length - idx - 1)}</div>
        </div>
      </div>

      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:16 }}>
        {SUBJECTS.filter(s => s.ready).map(s => {
          const done = solidSubjects.has(s.id)
          const hasMiss = deck.some(item => item.subject === s.id && answers[item.id] === 'miss')
          return (
            <span key={s.id} style={{
              fontSize:10.5, fontWeight:800, borderRadius:20, padding:'3px 8px',
              background: done ? '#dcfce7' : hasMiss ? '#fef2f2' : '#f8fafc',
              color: done ? '#166534' : hasMiss ? '#ef4444' : '#94a3b8',
              border: `1px solid ${done ? '#bbf7d0' : hasMiss ? '#fecaca' : '#e2e8f0'}`,
            }}>{s.id}</span>
          )
        })}
      </div>

      <div style={{ height:6, background:'#f1f5f9', borderRadius:4, marginBottom:18, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${Math.round((idx / deck.length) * 100)}%`, background:'#1d4ed8', transition:'width 0.25s' }} />
      </div>

      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap:10, flexWrap:'wrap', marginBottom:12 }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            <span style={{ fontSize:10, color:'#1d4ed8', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>{current.phase}</span>
            <span style={{ fontSize:10, color:'#475569', background:'#f1f5f9', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>{SUBJECT_NAME[current.subject] ?? current.subject}</span>
            <span style={{ fontSize:10, color:'#7c2d12', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>{current.source}</span>
          </div>
          <span style={{ fontSize:11, color:'#64748b' }}>{current.priority === 'coverage' ? 'kompletní pokrytí' : 'riziková část'}</span>
        </div>
        <div style={{ fontSize:18, fontWeight:850, color:'#0f172a', lineHeight:1.45, marginBottom:12 }}>{current.q}</div>
        <div style={{ padding:'12px 14px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, color:'#334155', fontSize:12.5, lineHeight:1.55, marginBottom:14 }}>
          Rychlá kostra: definice · rozdíl · příklad · riziko/kontrola · diplomka.
        </div>
        {current.followUp && <div style={{ fontSize:12, color:'#64748b', marginBottom:14 }}>Doptávka: {current.followUp}</div>}
        <button onClick={() => setRevealed(h => !h)}
          style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: revealed ? 12 : 0 }}>
          {revealed ? '▲ Skrýt nápady' : '▼ Ukázat nápady / vzor'}
        </button>
        {revealed && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ padding:'12px 14px', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:8, fontSize:12.5, color:'#7c2d12', lineHeight:1.55 }}>
              <strong>Když nevíš:</strong>
              <ul style={{ margin:'8px 0 0', paddingLeft:18 }}>
                {last24RescueIdeas(current).map(line => <li key={line} style={{ marginBottom:5 }}>{line}</li>)}
              </ul>
            </div>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{current.modelAnswer}</div>
          </div>
        )}
      </div>

      {!rated ? (
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <button onClick={() => rate('miss')} style={{ flex:1, minWidth:160, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:800, cursor:'pointer' }}>Nevím, dej nápady</button>
          <button onClick={() => rate('hint')} style={{ flex:1, minWidth:160, padding:'11px 8px', border:'1px solid #fde68a', borderRadius:9, background:'#fffbeb', color:'#d97706', fontWeight:800, cursor:'pointer' }}>S nápovědou +10 XP</button>
          <button onClick={() => rate('clean')} style={{ flex:1, minWidth:160, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800, cursor:'pointer' }}>Umím nahlas +24 XP</button>
        </div>
      ) : (
        <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontSize:14, fontWeight:800, cursor:'pointer' }}>Další 24h karta →</button>
      )}
    </div>
  )
}

function AutoKoucMode({ onBack, addXP }: { onBack: () => void; addXP: (n: number) => void }) {
  const [deck, setDeck] = useState<AutoWeakItem[]>(() => buildAutoDeck())
  const [idx, setIdx] = useState(0)
  const [hintShown, setHintShown] = useState(false)
  const [rated, setRated] = useState(false)
  const [sessionXP, setSessionXP] = useState(0)
  const [stats, setStats] = useState(() => weakStats())
  const current = deck[idx]
  const finished = idx >= deck.length

  function refresh() {
    setStats(weakStats())
  }

  function restart() {
    setDeck(buildAutoDeck())
    setIdx(0)
    setHintShown(false)
    setRated(false)
    setSessionXP(0)
    refresh()
  }

  function rate(kind: 'miss' | 'hint' | 'clean') {
    if (rated || !current) return
    const xp = kind === 'clean' ? 28 : kind === 'hint' ? 12 : 0
    setRated(true)
    if (kind === 'miss') registerWeakness(current)
    else registerWeakWin(current.id)
    if (xp > 0) {
      addXP(xp)
      setSessionXP(p => p + xp)
    }
    refresh()
  }

  function next() {
    setIdx(i => i + 1)
    setHintShown(false)
    setRated(false)
  }

  if (finished) {
    return (
      <div className="page">
        <BackBtn onBack={onBack} />
        <div style={{ textAlign:'center', padding:'46px 0' }}>
          <div style={{ fontSize:38, marginBottom:12 }}>A</div>
          <div style={{ fontSize:24, fontWeight:800, color:'#0f172a', marginBottom:8 }}>Auto run hotový</div>
          <div style={{ fontSize:14, color:'#64748b', marginBottom:14 }}>{stats.due} slabin čeká · {stats.hot} horkých · +{sessionXP} XP</div>
          <button onClick={restart} style={{ padding:'11px 22px', border:'none', borderRadius:8, background:'#1d4ed8', color:'#fff', fontWeight:800, cursor:'pointer', marginRight:8 }}>Další auto run</button>
          <button onClick={onBack} style={{ padding:'11px 22px', border:'1px solid #e2e8f0', borderRadius:8, background:'#fff', color:'#475569', fontWeight:800, cursor:'pointer' }}>Zpět</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <TopBar onBack={onBack}
        left={<span style={{ fontSize:12, color:'#64748b' }}>Automaticky: slabiny → killer → sylabus</span>}
        right={<><span style={{ fontSize:12, color:'#64748b' }}>{idx + 1}/{deck.length}</span><SXP xp={sessionXP} /></>}
      />
      <div className="page-title">Auto kouč</div>
      <div className="page-subtitle">Appka sama vrací otázky, kde ses zasekl, a přidává doptávky bez nastavování.</div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(130px, 1fr))', gap:8, marginBottom:16 }}>
        <div style={{ padding:'10px 12px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:8 }}>
          <div style={{ fontSize:10, color:'#64748b', fontWeight:800, textTransform:'uppercase' }}>K návratu</div>
          <div style={{ fontSize:20, color:'#0f172a', fontWeight:900 }}>{stats.due}</div>
        </div>
        <div style={{ padding:'10px 12px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:8 }}>
          <div style={{ fontSize:10, color:'#64748b', fontWeight:800, textTransform:'uppercase' }}>Horké slabiny</div>
          <div style={{ fontSize:20, color:'#ef4444', fontWeight:900 }}>{stats.hot}</div>
        </div>
        <div style={{ padding:'10px 12px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:8 }}>
          <div style={{ fontSize:10, color:'#64748b', fontWeight:800, textTransform:'uppercase' }}>Celkem uložené</div>
          <div style={{ fontSize:20, color:'#1d4ed8', fontWeight:900 }}>{stats.total}</div>
        </div>
      </div>

      <div style={{ height:6, background:'#f1f5f9', borderRadius:4, marginBottom:18, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${Math.round((idx / deck.length) * 100)}%`, background:'#1d4ed8', transition:'width 0.25s' }} />
      </div>

      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'28px 32px', marginBottom:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap:10, flexWrap:'wrap', marginBottom:12 }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            <span style={{ fontSize:10, color:'#1d4ed8', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>{current.source}</span>
            <span style={{ fontSize:10, color:'#475569', background:'#f1f5f9', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>{SUBJECT_NAME[current.subject] ?? current.subject}</span>
            {current.misses > 0 && <span style={{ fontSize:10, color:'#ef4444', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:20, padding:'3px 8px', fontWeight:800 }}>slabina ×{current.misses}</span>}
          </div>
          <span style={{ fontSize:11, color:'#64748b' }}>{current.wins > 0 ? `${current.wins} úspěšných návratů` : 'nový test'}</span>
        </div>
        <div style={{ fontSize:19, fontWeight:850, color:'#0f172a', lineHeight:1.45, marginBottom:12 }}>{current.q}</div>
        <div style={{ padding:'12px 14px', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:8, color:'#7c2d12', fontSize:13, fontWeight:800, lineHeight:1.5, marginBottom:14 }}>
          Automatická doptávka: {autoFollowUp(current)}
        </div>
        {current.followUp && <div style={{ fontSize:12, color:'#64748b', marginBottom:14 }}>Další tlak: {current.followUp}</div>}
        <button onClick={() => setHintShown(h => !h)}
          style={{ fontSize:12, color:'#1d4ed8', background:'none', border:'none', cursor:'pointer', padding:0, marginBottom: hintShown ? 12 : 0 }}>
          {hintShown ? '▲ Skrýt vzor' : '▼ Ukázat vzor'}
        </button>
        {hintShown && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ padding:'12px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:8, fontSize:12.5, color:'#1e3a8a', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{current.modelAnswer}</div>
            <div style={{ padding:'12px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12.5, color:'#166534', lineHeight:1.55 }}>{current.hook}</div>
          </div>
        )}
      </div>

      {!rated ? (
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => rate('miss')} style={{ flex:1, padding:'11px 8px', border:'1px solid #fecaca', borderRadius:9, background:'#fef2f2', color:'#ef4444', fontWeight:800, cursor:'pointer' }}>Zasekl jsem se</button>
          <button onClick={() => rate('hint')} style={{ flex:1, padding:'11px 8px', border:'1px solid #fde68a', borderRadius:9, background:'#fffbeb', color:'#d97706', fontWeight:800, cursor:'pointer' }}>S nápovědou +12 XP</button>
          <button onClick={() => rate('clean')} style={{ flex:1, padding:'11px 8px', border:'1px solid #bbf7d0', borderRadius:9, background:'#f0fdf4', color:'#16a34a', fontWeight:800, cursor:'pointer' }}>Bez koukání +28 XP</button>
        </div>
      ) : (
        <button onClick={next} style={{ width:'100%', padding:'12px 0', background:'#1d4ed8', color:'#fff', border:'none', borderRadius:9, fontSize:14, fontWeight:800, cursor:'pointer' }}>Další automatická otázka →</button>
      )}
    </div>
  )
}

const MODES: Array<{ id: Mode; icon: string; label: string; desc: string; xp: string }> = [
  { id:'sos',        icon:'!',  label:'SOS komise',          desc:'Anti-blackout situace: nevím, přerušení, moc obecné, diplomka, X vs Y.', xp:'+12 / +20 XP' },
  { id:'last24',     icon:'24', label:'Posledních 24 hodin', desc:'Kompletní pokrytí všech předmětů, slabiny, killer otázky a nápady při záseku.', xp:'+10 / +24 XP' },
  { id:'smutny',     icon:'S',  label:'Smutný na chleba',    desc:'Cílený pressure drill: sociotechnika, metodologie, doptávky, pasti a diplomka.', xp:'+14 / +32 XP' },
  { id:'auto',       icon:'A', label:'Auto kouč',          desc:'Sám vrací slabiny, míchá rizika a dává doptávky.',              xp:'+12 / +28 XP' },
  { id:'duel',       icon:'X', label:'X vs Y duel',        desc:'Rozdílové dvojice: COBIT/ITIL, auth/authz, AS-IS/TO-BE.',      xp:'+24 XP' },
  { id:'confidence', icon:'5', label:'Confidence check',   desc:'Jistota 1-5 před odhalením. Chytá falešné sebevědomí.',        xp:'+16 / +26 XP' },
  { id:'feynman',    icon:'F', label:'Feynman mód',        desc:'Vysvětli téma manažerovi, technikovi, komisi nebo praxi.',  xp:'+22 XP' },
  { id:'blank',      icon:'B', label:'Blank page drill',   desc:'Prázdná plocha, vlastní osnova a pak checklist.',              xp:'+26 XP' },
  { id:'historie',   icon:'H', label:'Historický signál', desc:'90s drill: sylabus jako pravda, historické otázky jako tlak komise.', xp:'+14 / +30 XP' },
  { id:'mock',       icon:'◆', label:'Ostrý mock',        desc:'12 náhodných otázek přes komisi, shrnutí a sylabus.',       xp:'+18 / +35 XP' },
  { id:'sylabus',    icon:'◈', label:'Sylabus run',       desc:'Odpovědi napříč předměty: úvod, body, háček, diplomka.',    xp:'+12 / +25 XP' },
  { id:'killer20',   icon:'◎', label:'Top 20 killer',     desc:'Rizikové otázky, které umí rozhodnout známku.',             xp:'+45 XP' },
  { id:'tahak',      icon:'≡', label:'Tahák do ústní',    desc:'Záchranné věty pro start, zásek, kontrast a praxi.',     xp:'+5 XP' },
  { id:'flashkarty', icon:'⧉', label:'Flashkarty',       desc:'Kartičky s pojmy — ohodnoť sám sebe.',              xp:'+5 / +15 XP' },
  { id:'tf',         icon:'⚡', label:'Rychlopalba T/F',  desc:'Pravda nebo lež? 8 sekund + combo bonus.',           xp:'+10 XP +combo' },
  { id:'quiz4',      icon:'✏', label:'Quiz4',             desc:'Vyber správný pojem ze 4 možností.',                 xp:'+15 XP' },
  { id:'edge',       icon:'◈', label:'Propojování hran',  desc:'Urči typ vztahu mezi dvěma pojmy v mapě.',           xp:'+20 XP' },
  { id:'oral',       icon:'◎', label:'Zkouška nanečisto', desc:'Odpověz nahlas na otázku, pak se ohodnoť.',          xp:'+10 – 20 XP' },
  { id:'komise',     icon:'◉', label:'Komise',            desc:'Otázky Smutného, Sedláčka nebo Sigmunda.',           xp:'+25 XP' },
  { id:'boss',       icon:'★', label:'Boss otázka',       desc:'Syntetické otázky přes celé okruhy — 50 XP za kus.', xp:'+50 XP' },
]

export default function Trener() {
  const [mode, setMode] = useState<Mode | null>(null)
  const { progress, addXP } = useProgress()

  if (mode === 'flashkarty') return <FlashkartyMode onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'tf')         return <TFMode         onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'quiz4')      return <Quiz4Mode      onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'edge')       return <EdgeMode       onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'oral')       return <OralMode       onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'komise')     return <KomiseMode     onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'boss')       return <BossMode       onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'mock')       return <MockMode       onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'sylabus')    return <SyllabusMode   onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'killer20')   return <Killer20Mode   onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'tahak')      return <TahakMode      onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'historie')   return <HistorieMode   onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'auto')       return <AutoKoucMode   onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'duel')       return <DuelMode       onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'confidence') return <ConfidenceMode onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'feynman')    return <FeynmanMode    onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'blank')      return <BlankPageMode  onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'last24')     return <Last24Mode     onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'smutny')     return <SmutnyMode     onBack={() => setMode(null)} addXP={addXP} />
  if (mode === 'sos')        return <SosMode        onBack={() => setMode(null)} addXP={addXP} />

  const autoStats = weakStats()
  return (
    <div className="page">
      <div className="page-title">Trenér</div>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28 }}>
        <span className="page-subtitle" style={{ margin:0 }}>{MODES.length} módů · {ALL_NODES.length} pojmů z map · {SHRNUTI.length} karet shrnutí · {autoStats.due} slabin k návratu</span>
        <span style={{ fontSize:13, color:'#16a34a', fontWeight:700, background:'#dcfce7', padding:'3px 10px', borderRadius:20 }}>
          {progress.totalXP} XP celkem
        </span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(210px, 1fr))', gap:12 }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)}
            style={{ padding:'18px 20px', border:'1px solid #e2e8f0', borderRadius:10, background:'#fff', cursor:'pointer', textAlign:'left', transition:'box-shadow 0.1s' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
            <div style={{ fontSize:22, marginBottom:10 }}>{m.icon}</div>
            <div style={{ fontWeight:700, fontSize:14, color:'#0f172a', marginBottom:4 }}>{m.label}</div>
            <div style={{ fontSize:12, color:'#64748b', lineHeight:1.5, marginBottom:10 }}>{m.desc}</div>
            <div style={{ fontSize:11, fontWeight:700, color:'#16a34a', background:'#dcfce7', display:'inline-block', padding:'2px 8px', borderRadius:20 }}>{m.xp}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
