import type { WikiEntry } from './wiki'

export const WIKI_SYSTEMS: WikiEntry[] = [
  {
    id: 'systemove-mysleni',
    title: 'Systémové myšlení',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['gst', 'kybernetika', 'feedback', 'emergence', 'cas', 'senge-5-disciplin', 'cynefin'],
    body: `<p><strong>Systémové myšlení</strong> je způsob myšlení, který chápe svět jako síť vzájemně propojených a vzájemně závislých prvků, nikoliv jako soubor izolovaných příčin a efektů. Systémové myšlení je reakcí na redukcionismus — kontraproduktivní snahu porozumět komplexním celkům pouze rozkladem na části.</p>
<p>Klíčové principy systémového myšlení: <em>Propojení</em> (každá součást systému ovlivňuje jiné části), <em>Celkovost</em> (celek je více než součet částí — <a href="#emergence">emergence</a>), <em>Zpětná vazba</em> (<a href="#feedback">feedback loops</a> vytvářejí nelineární dynamiku), <em>Časová prodleva</em> (příčina a efekt jsou odděleny v čase), <em>Hranice</em> (kde system začíná a končí je záležitostí perspektivy pozorovatele).</p>
<p>Systémové archetypy (Peter Senge): Limits to Growth (omezení růstu — pozitivní feedback narází na balancing feedback), Shifting the Burden (symptomové řešení potlačuje kořenové), Tragedy of the Commons (sdílené zdroje jsou nadměrně využívány), Fixes that Fail (krátkodobá řešení způsobují dlouhodobé problémy).</p>
<p>Aplikace v IS/IT: systémové myšlení pomáhá pochopit, proč IT projekty selhávají navzdory technické úspěšnosti (organizační feedback loops), proč optimalizace jedné části systému zhoršuje celek (suboptimalizace), a proč "rychlá oprava" způsobuje nové problémy (shifting the burden archetype). Senge's 5th discipline je o systémovém myšlení jako základu učící se organizace.</p>`,
  },
  {
    id: 'gst',
    title: 'GST — Obecná teorie systémů',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['systemove-mysleni', 'kybernetika', 'feedback', 'emergence', 'cas', 'vsm'],
    body: `<p><strong>GST</strong> (General Systems Theory, Obecná teorie systémů) je interdisciplinární teorie formulovaná biologem Ludwigem von Bertalanffym (1968), která hledá obecné principy platné pro všechny typy systémů — biologické, sociální, technické, ekonomické. GST je reakcí na stále větší specializaci vědy a snahou o integrativní přístup.</p>
<p>Základní pojmy GST: <em>Systém</em> — množina prvků a vztahů mezi nimi. <em>Vstup/Výstup</em> — transformace materiálu, energie nebo informace. <em>Hranice systému</em> — dělí systém od prostředí. <em>Otevřený systém</em> — vyměňuje vstupy a výstupy s prostředím (živé organismy, organizace). <em>Uzavřený systém</em> — bez výměny s prostředím (idealizovaný koncept). <em>Entropie</em> — tendence k neuspořádanosti; otevřené systémy ji potlačují importem energie/informace (<em>negentropie</em>).</p>
<p>Klíčové systémové vlastnosti: <em>Ekvifinality</em> — různými cestami lze dosáhnout stejného cíle (zejm. v otevřených systémech), <em>Homeostáza</em> — tendence udržovat rovnováhu, <em>Morfogeneze</em> — schopnost systému se rozvíjet a růst, <em>Hierarchie</em> — systémy jsou vnořeny do supersystémů (holon). Isomorfizmy — podobné struktury a principy napříč různými typy systémů.</p>
<p>GST ovlivnila vznik <a href="#kybernetika">kybernetiky</a>, informační teorie, operační výzkum, systemiky a systémové dynamiky (Forrester). Je epistemologickým základem pro pochopení organizací jako komplexních otevřených systémů.</p>`,
  },
  {
    id: 'kybernetika',
    title: 'Kybernetika',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['gst', 'feedback', 'vsm', 'systemove-mysleni'],
    body: `<p><strong>Kybernetika</strong> je věda o řízení a komunikaci v živých organismech a strojích, formulovaná matematikem Norbertem Wienerem v díle "Cybernetics" (1948). Kybernetika studuje, jak systémy používají informace, modely a zpětnou vazbu pro řízení vlastního chování.</p>
<p>Klíčové pojmy kybernetiky: <em><a href="#feedback">Zpětná vazba</a></em> (feedback) — centrální mechanismus řízení. <em>Černá skříňka</em> (black box) — systém studovaný pouze přes vstupy a výstupy bez znalosti vnitřní struktury. <em>Homeostat</em> — systém udržující stabilní stav přes zpětnou vazbu. <em>Requisite variety</em> (Ashby's Law) — regulátor musí mít stejnou nebo vyšší varietou (počet možných stavů) než regulovaný systém — "only variety can destroy variety".</p>
<p>Kybernetika 1. řádu (First-order cybernetics): studuje systémy zvenku jako nezaujatý pozorovatel. Kybernetika 2. řádu (Second-order cybernetics — von Foerster): zahrnuje pozorovatele do systému samotného — jak naše pozorování ovlivňuje systém a jak jsme my sami součástí systémů, které studujeme. Relevantní pro sociální vědy a management.</p>
<p><a href="#vsm">Viable System Model</a> (Beer, 1972) je aplikací kybernetiky na organizační design. Kybernetika ovlivnila umělou inteligenci, teorii řízení, kognitivní vědu a organizační teorii.</p>`,
  },
  {
    id: 'feedback',
    title: 'Zpětná vazba (feedback loops)',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['kybernetika', 'gst', 'systemove-mysleni', 'cas', 'senge-5-disciplin'],
    body: `<p><strong>Zpětná vazba</strong> (feedback loop) je mechanismus, kdy výstup systému (nebo jeho části) je vrácen zpět jako vstup a ovlivňuje budoucí chování systému. Zpětná vazba je základem systémové dynamiky a řízení — bez zpětné vazby není možné regulovat systém.</p>
<p>Dva základní typy zpětné vazby:</p>
<ul>
  <li><strong>Reinforcing (positive) feedback</strong> — zesilující zpětná vazba: odchylka od počátečního stavu zesiluje sama sebe. Vede k exponenciálnímu růstu nebo kolapsu. Příklady: virální šíření, sněhová koule dluhů, inflační spirála, zájem ⟶ investice ⟶ výsledky ⟶ zájem. V organizaci: úspěch plodí úspěch (nebo naopak selhání plodí selhání).</li>
  <li><strong>Balancing (negative) feedback</strong> — vyrovnávací zpětná vazba: systém je přitahován k cílovému stavu. Vede ke stabilitě a homeostáze. Příklady: termostat, řízení rychlosti, fyziologická homeostáza. V organizaci: manažerské řídící smyčky (KPI → akce → korekce odchylky).</li>
</ul>
<p>Zpoždění (Delays) v feedback loops jsou zdrojem nestability — systém reaguje na "staré" informace, přestřelí, pak opraví v opačném směru → oscilace. Příklad: produkční a zásobovací cykly (Beer Distribution Game — Forrester's Bullwhip Effect).</p>
<p>Systémová dynamika (Jay Forrester, MIT) modeluje zpětné vazby a zpoždění matematicky pro simulaci chování komplexních systémů. Nástroje: Vensim, Stella/iThink, AnyLogic.</p>`,
  },
  {
    id: 'emergence',
    title: 'Emergence',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['gst', 'cas', 'systemove-mysleni', 'cynefin'],
    body: `<p><strong>Emergence</strong> je vlastnost systému, při níž na systémové úrovni vznikají vlastnosti nebo chování, které nelze vysvětlit ani předvídat pouze znalostí individuálních komponent. "Celek je více než součet svých částí" — emergentní vlastnosti jsou typické pro <a href="#cas">komplexní adaptivní systémy</a>.</p>
<p>Příklady emergence: <em>Vědomí</em> — neurony samy o sobě nemají vědomí, ale jejich interakce ho produkuje. <em>Dopravní zácpy</em> — každý řidič jedná individuálně, ale kolektivně vznikají vzory, které nikdo nevytvořil záměrně. <em>Trh</em> — miliony individuálních rozhodnutí producují tržní ceny a trendy. <em>Kultura organizace</em> — nikdo kulturu nevytváří záměrně, ale vzniká z interakcí lidí.</p>
<p>Slabá vs. silná emergence: <em>Slabá</em> — emergentní vlastnosti jsou principiálně redukovatelné na vlastnosti částí (komplikovanost). <em>Silná</em> — emergentní vlastnosti jsou skutečně iredukovatelné (komplexita). V IS/IT: behaviorální vlastnosti organizačních IS (např. jak uživatelé systém skutečně použijí vs. jak byl navržen) jsou emergentní — nelze je předvídat z technického designu.</p>
<p><a href="#cynefin">Cynefin framework</a> rozlišuje Complicated domain (kauzalita je vysledovatelná — expert může odvodit řešení) od Complex domain (emergence — kauzalitu lze poznat pouze retrospektivně). Management v Complex domain vyžaduje "probe-sense-respond" přístup, nikoliv "analyze-plan-implement".</p>`,
  },
  {
    id: 'ssm',
    title: 'SSM — Soft Systems Methodology',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['catwoe', 'dsr', 'systemove-mysleni', 'gst', 'cynefin'],
    body: `<p><strong>SSM</strong> (Soft Systems Methodology) je metodologie pro analýzu a řešení "messy" (nestrukturovaných) problémů v lidských aktivitách, vyvinutá Peterem Checklandem (Lancaster University, 1970s–80s). SSM uznává, že sociální a organizační problémy nemají jediné správné řešení — různí aktéři mají různé "světonázory" (Weltanschauungen).</p>
<p>SSM rozlišuje "tvrdé" systémy (hard systems — technické problémy s jasnou definicí a optimálním řešením) od "měkkých" systémů (soft systems — problémy zahrnující lidi, hodnoty, kulturu a moc, kde není shoda ani na definici problému). IS implementace jsou typicky "messy" — technicky banální, ale sociálně komplex.</p>
<p>Sedm kroků SSM: (1) Identifikace problémové situace, (2) Vyjádření problémové situace (rich picture — vizualizace vztahů, aktérů, konfliktů), (3) Formulace Root Definitions pomocí <a href="#catwoe">CATWOE</a>, (4) Budování konceptuálních modelů, (5) Porovnání modelů s realitou, (6) Identifikace žádoucích a proveditelných změn, (7) Implementace změn.</p>
<p>Rich Picture je klíčovým SSM nástrojem — volná vizualizace problémové situace, zahrnující aktéry, struktury, procesy, konflikty a zájmy. Pomáhá identifikovat skryté napětí a různé perspektivy před jakýmkoliv analytickým rámcem.</p>`,
  },
  {
    id: 'catwoe',
    title: 'CATWOE analýza',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    parentId: 'ssm',
    related: ['ssm', 'systemove-mysleni', 'dsr'],
    body: `<p><strong>CATWOE</strong> je mnemotechnická pomůcka z <a href="#ssm">SSM</a> (Soft Systems Methodology) pro formulaci Root Definition — explicitního popisu systému účelné aktivity z konkrétního světonázoru. CATWOE zajišťuje, že Root Definition je úplná a zahrnuje všechny klíčové perspektivy.</p>
<p>Šest prvků CATWOE:</p>
<ul>
  <li><strong>C — Customers</strong>: Kdo jsou příjemci (oběti nebo beneficienti) výstupů systému?</li>
  <li><strong>A — Actors</strong>: Kdo provádí aktivity systému?</li>
  <li><strong>T — Transformation</strong>: Jaká je základní transformace — co se přemění z vstupu na výstup?</li>
  <li><strong>W — Weltanschauung</strong>: Jaký světonázor (předpoklady, hodnoty) dává transformaci smysl?</li>
  <li><strong>O — Owner</strong>: Kdo může systém zastavit nebo zásadně změnit?</li>
  <li><strong>E — Environmental constraints</strong>: Jaká jsou prostředí omezení, která systém musí respektovat?</li>
</ul>
<p>Příklad CATWOE pro "systém správy IT incidentů": C = uživatelé IT (zákazníci), A = helpdesk technici (aktéři), T = nahlášený incident → vyřešený incident, W = IT je kritická infrastruktura pro business, O = IT management (owner), E = SLA závazky, dostupné kapacity (constraints). Root Definition: "Systém provozovaný IT techniiky pro obnovu IT služeb nahlášených uživateli v souladu s SLA, v rámci IT kapacit".</p>`,
  },
  {
    id: 'cynefin',
    title: 'Cynefin framework',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['systemove-mysleni', 'cas', 'emergence', 'ssm', 'bounded-rationality'],
    body: `<p><strong>Cynefin framework</strong> (Dave Snowden, IBM, 1999; kybernetika→Wales: "habitat/abode") je sense-making rámec, který kategoryzuje problémy do pěti domén dle povahy příčinnosti, a pro každou doménu navrhuje jiný management přístup. Cynefin pomáhá manažerům "vědět, co nevíme" — zvolit správný způsob reakce podle povahy situace.</p>
<p>Pět domén Cynefin:</p>
<ol>
  <li><strong>Clear/Obvious</strong> (dříve Simple): Příčinnost je zřejmá; nejlepší praxe existuje. Přístup: <em>Sense → Categorize → Respond</em>. Příklad: standardní IT change management.</li>
  <li><strong>Complicated</strong>: Příčinnost lze odhalit analýzou; dobré praxe (ne nejlepší). Přístup: <em>Sense → Analyze → Respond</em> (potřeba experta). Příklad: komplexní technická chyba.</li>
  <li><strong>Complex</strong>: Příčinnost je retroaktivně poznatelná; žádná správná odpověď předem. Přístup: <em>Probe → Sense → Respond</em>. Příklad: kulturní změna, agile software dev, digitální transformace.</li>
  <li><strong>Chaotic</strong>: Žádná příčinnost — krize, okamžitá akce nutná. Přístup: <em>Act → Sense → Respond</em>. Příklad: kybernetický útok, výpadek kritického systému.</li>
  <li><strong>Disorder</strong>: Neznáme, v jaké doméně se nacházíme. Riziko aplikace preferované domény bez ohledu na realitu.</li>
</ol>
<p>Cynefin upozorňuje na "complacency trap" — nečekaný přechod z Clear do Chaotic bez prochodu Complicated nebo Complex. IT incidenty jsou typicky v Chaotic → Complex → Complicated trajektorii při řešení.</p>`,
  },
  {
    id: 'dsr',
    title: 'DSR — Design Science Research',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['ssm', 'systemove-mysleni', 'gst'],
    body: `<p><strong>DSR</strong> (Design Science Research) je výzkumná paradigma v informačních systémech (Hevner et al., 2004), která kombinuje rigorozitu přírodních věd s relevancí inženýrství. DSR vytváří a hodnotí IT artefakty (konstrukty, modely, metody, instance) určené k řešení identifikovaných organizačních problémů.</p>
<p>DSR na rozdíl od behaviorálního výzkumu IS (který vysvětluje a předpovídá jevy) konstruuje — navrhuje nová řešení, která neexistovala. Zároveň na rozdíl od čistého inženýrství přidává teoretický příspěvek: zobecnění artefaktu do transferovatelných znalostí.</p>
<p>Hevnerovy tři cykly DSR: <em>Relevance Cycle</em> (propojení s prostředím — jaký problém řeší?), <em>Design Cycle</em> (build &amp; evaluate iterace), <em>Rigor Cycle</em> (propojení s existující znalostní základnou — co je nového oproti prior art?). Výzkum musí projít všemi třemi cykly, aby byl kompletní.</p>
<p>Sedm DSR guidelines (Hevner, March, Park, Ram): (1) Design as an Artifact, (2) Problem Relevance, (3) Design Evaluation, (4) Research Contributions, (5) Research Rigor, (6) Design as a Search Process, (7) Communication of Research. DSR je relevantní pro IS výzkum, který produkuje metodologie, rámce a prototypy jako výzkumné výstupy.</p>`,
  },
  {
    id: 'cas',
    title: 'Complex Adaptive Systems',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['systemove-mysleni', 'emergence', 'gst', 'cynefin', 'feedback'],
    body: `<p><strong>CAS</strong> (Complex Adaptive Systems, Komplexní adaptivní systémy) jsou systémy skládající se z velkého počtu interagujících agentů, jejichž lokální interakce vytvářejí <a href="#emergence">emergentní</a> makroskopické chování, a kteří se adaptují na změny prostředí. CAS jsou středem komplexity vědy (Santa Fe Institute).</p>
<p>Charakteristiky CAS: <em>Mnoho interagujících agentů</em> (každý sleduje jednoduché lokální pravidla). <em>Emergence</em> — globální chování vzniká z lokálních interakcí. <em>Adaptace</em> — agenti mění chování na základě zkušenosti a zpětné vazby. <em>Samoorganizace</em> — řád vzniká bez centrálního řízení. <em>Nelinearita</em> — malé změny mohou mít velké důsledky (motýlí efekt). <em>Path dependence</em> — historický vývoj ovlivňuje současný stav.</p>
<p>Příklady CAS v IS/IT kontextu: organizace (každý zaměstnanec je agent), trhy (ekonomické agenty), internet (routery, protokoly, uživatelé), ekosystémy softwarových platforem (vývojáři, uživatelé, partneři). Implementace ERP systémů v CAS prostředí (organizaci) produkuje nepředvídatelné výsledky — emergentní chování uživatelů obchází procesy designéry nepředvídanými způsoby.</p>
<p>Management implikace: v CAS nelze "řídit" ve tradičním smyslu. Vůdce CAS nastavuje podmínky (attractor landscapes), monitoruje emergentní vzory, posiluje žádoucí a tlumí nežádoucí. Agilní přístupy v IT reflektují CAS myšlení — iterace, zpětná vazba, adaptace.</p>`,
  },
  {
    id: 'vsm',
    title: 'VSM — Viable System Model',
    area: 'Teorie systémů',
    subjects: ['4SA420'],
    related: ['kybernetika', 'gst', 'systemove-mysleni', 'feedback'],
    body: `<p><strong>VSM</strong> (Viable System Model) je kybernetický model životaschopného (viable) systému vytvořený Staffordem Beerem (1972). VSM popisuje, jakou strukturu musí mít systém (organizace), aby byl schopen přežít v měnícím se prostředí. Je aplikací <a href="#kybernetika">kybernetiky</a> a Ashbyho Zákona variety na organizační design.</p>
<p>VSM definuje pět subsystémů (Systems 1–5), přičemž každý plní specifickou řídící funkci:</p>
<ul>
  <li><strong>S1 — Operations</strong>: Primární aktivity produkující výstupy (výroba, prodej, provoz IT)</li>
  <li><strong>S2 — Coordination</strong>: Koordinace mezi S1 jednotkami, eliminace konfliktů, standardizace</li>
  <li><strong>S3 — Control/Operational Management</strong>: Řízení interního prostředí, alokace zdrojů, monitoring výkonu S1</li>
  <li><strong>S3* — Audit</strong>: Přímé audity S1, bypass normálních kanálů pro ověření reality</li>
  <li><strong>S4 — Intelligence/Development</strong>: Monitorování externího prostředí, strategie, adaptace</li>
  <li><strong>S5 — Policy</strong>: Identita, hodnoty, etika, governance — definice "co system je"</li>
</ul>
<p>VSM diagnoze: Beer využíval VSM pro diagnostiku organizačních dysfunkcí — chybějící S4 (slepota k vnějšímu prostředí → neadaptace), přehnaný S3 bez S4 (jen operativní řízení bez strategie), zánik S5 identity. IT organizace mívají silné S3 (operational excellence) ale slabé S4 (intelligence/innovation).</p>`,
  },
  {
    id: 'senge-5-disciplin',
    title: 'Senge: 5 disciplín učící se organizace',
    area: 'Teorie systémů',
    subjects: ['4SA420', '4SA418'],
    related: ['systemove-mysleni', 'feedback', 'knowledge-management', 'cop'],
    body: `<p><strong>Peter Senge</strong> v díle "The Fifth Discipline" (1990) definoval pět disciplín, které musí organizace ovládnout, aby se stala <em>učící se organizací</em> (Learning Organization) — organizací schopnou kontinuálně se adaptovat, inovovat a zvyšovat svoji kapacitu.</p>
<p>Pět disciplín:</p>
<ol>
  <li><strong>Systems Thinking (Systémové myšlení)</strong> — "pátá disciplína", která integruje ostatní čtyři. Schopnost vidět vzory, smyčky a struktury místo izolovaných událostí. <a href="#systemove-mysleni">Systémové myšlení</a> je meta-kompetencí učící se organizace.</li>
  <li><strong>Personal Mastery</strong> — osobní vize, neustálé učení, kreativní napětí mezi vizí a realitou. Organizace se učí prostřednictvím jednotlivců.</li>
  <li><strong>Mental Models</strong> — hluboké předpoklady a generalizace, které ovlivňují naše vnímání a jednání. Nutno je neustále prověřovat a zpochybňovat (reflexe, inquiry).</li>
  <li><strong>Shared Vision</strong> — společná vize, která generuje autentický závazek, nikoliv pouhý souhlas. Vision must come from values.</li>
  <li><strong>Team Learning</strong> — dialog (suspension of assumptions) a diskuse (advocacy/inquiry balance). Inteligence týmu může překonat inteligenci jednotlivce.</li>
</ol>
<p>V IT kontextu: agile retrospectives jsou nástrojem Team Learning, knowledge management a CoP podporují Personal Mastery a Team Learning, incident post-mortems jsou příležitostí pro systémové myšlení a zpochybňování Mental Models.</p>`,
  },
  {
    id: 'socialni-informatika',
    title: 'Sociální informatika',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['scot', 'ant', 'stin', 'informacni-spolecnost', 'tam', 'digital-divide'],
    body: `<p><strong>Sociální informatika</strong> (Social Informatics) je interdisciplinární obor studující vztahy mezi informačními a komunikačními technologiemi (ICT) a sociálním, organizačním a kulturním kontextem, v němž jsou vyvíjeny, implementovány a používány. Rob Kling (Indiana University) byl klíčovým průkopníkem oboru v 90. letech.</p>
<p>Ústřední teze: ICT nejsou neutrální nástroje — jsou "sociálně formovány" (socially shaped) hodnotami, zájmy a mocenskými vztahy svých tvůrců a uživatelů. A zároveň ICT "formují" sociální vztahy a instituce. Tento obousměrný vztah technologie a společnosti se nazývá vzájemné utváření (mutual shaping).</p>
<p>Klíčové perspektivy: <a href="#scot">SCOT</a> (Social Construction of Technology — jak sociální faktory formují design technologie), <a href="#ant">ANT</a> (Actor-Network Theory — technologie i lidé jako aktéři v sociálních sítích), <a href="#stin">STIN</a> (Sociotechnical Interaction Networks). Tyto teorie odmítají technologický determinismus (technologie automaticky určuje společenské dopady).</p>
<p>Aplikace v IS/IT: proč systémy selhávají při přechodu do nového kontextu (funkce je sociálně konstruována — jiný kontext = jiné použití), proč nelze oddělit "technické" a "sociální" při IS designu, proč "one size fits all" technologická řešení selhávají. Sociální informatika informuje UX design, organizational IS research a policy making.</p>`,
  },
  {
    id: 'scot',
    title: 'SCOT — Social Construction of Technology',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['socialni-informatika', 'ant', 'stin', 'difuze-inovaci'],
    body: `<p><strong>SCOT</strong> (Social Construction of Technology) je teorie v sociologii vědy a techniky (Bijker, Pinch, Hughes — 1980s), tvrdící, že design a vývoj technologií není řízen pouze technickými imperativy, ale je formován sociálními skupinami se svými interpretacemi, zájmy a hodnotami.</p>
<p>Klíčové koncepty SCOT: <em>Relevantní sociální skupiny</em> (Relevant Social Groups) — různé skupiny lidí (vývojáři, uživatelé, regulátoři, média) mají různé "interpretační flexibility" — různé problémy a řešení pro totožnou technologii. <em>Interpretative Flexibility</em> — tutéž technologii různé skupiny interpretují odlišně (bicykl byl pro jedny rychlý dopravní prostředek, pro jiné nebezpečný stroj pro ženy). <em>Closure</em> — moment, kdy se kontroverzní interpretace "uzavřou" a dominantní design se stabilizuje. <em>Wider context</em> — makrosociální faktory (kultura, politika) ovlivňují uzavření.</p>
<p>Příklad z IS: design e-mailového systému byl sociálně konstruován — technicky by bylo možné mnoho různých designů, ale dominantní design (inbox, folders, CC/BCC) reflektuje organizační kulturu a pracovní postupy amerických korporací 80. let. Jiná sociální skupina by navrhla jinak.</p>
<p>Kritika SCOT: přílišný sociologický redukcionismus (ignoruje technická omezení), nedostatečná pozornost k moci a nerovnostem. ANT (Latour, Callon) přináší nuancovanější pohled zahrnující i materiální aktéry.</p>`,
  },
  {
    id: 'ant',
    title: 'ANT — Actor-Network Theory',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['socialni-informatika', 'scot', 'stin'],
    body: `<p><strong>ANT</strong> (Actor-Network Theory) je sociologická teorie a metoda Bruno Latoura, Michela Callona a Johna Lawa (80.–90. léta), která studuje, jak se heterogenní sítě lidí (humans) a ne-lidí (non-humans — stroje, texty, organizace) formují, stabilizují a rozpadají. ANT odmítá předem dané kategorie "sociálního" a "technického".</p>
<p>Klíčové pojmy ANT: <em>Aktant</em> (Actant) — cokoliv, co jedná a způsobuje efekty — lidé, technologie, instituce, texty. <em>Překlad</em> (Translation) — proces, jímž aktanti definují a redistribuují role, převádějí zájmy ostatních aktantů do "svého" programu. <em>Enrollment</em> — přesvědčení ostatních aktantů ke spolupráci. <em>Black boxing</em> — stabilizovaná síť, jejíž vnitřní složitost je skryta — funguje jako celek.</p>
<p>ANT v IS výzkumu: IS implementace jako proces překladu — IS projekt musí "přeložit" zájmy různých aktantů (management, uživatelé, technologie, legislativa) do soudržné sítě. Selhání IS projektu = selhání překladu — síť se rozpadla. Wanda Orlikowski aplikovala ANT perspektivu na studium technologie v práci.</p>
<p>Kritika ANT: příliš deskriptivní (nedostatečně normativní), problematické rovnocenné zacházení s lidmi a věcmi (agency non-humans), politická neutralita (přehlíží mocenské asymetrie). Přes kritiku zůstává ANT jedním z nejvlivnějších rámců pro IS a STS výzkum.</p>`,
  },
  {
    id: 'stin',
    title: 'STIN — Sociotechnical Interaction Networks',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['socialni-informatika', 'ant', 'scot'],
    body: `<p><strong>STIN</strong> (Sociotechnical Interaction Networks) je analytický rámec Rob Klinga a kolegů (Kling, McKim, King — 2003) pro analýzu toho, jak informační systémy, lidé, sociální vztahy a organizační struktury tvoří vzájemně propojené sítě. STIN rozšiřuje <a href="#ant">ANT</a> o explicitní zahrnutí sociálního kontextu a konfliktu.</p>
<p>STIN pracuje s konceptem "Web of Computing" — IS není jen software a hardware, ale komplex sociálních vztahů, politik, pracovních postupů, incentivních struktur a fyzického prostředí, v němž IS existuje. Změna IS bez změny "webu" kolem něj typicky selhává.</p>
<p>Klíčové analytické dimenze STIN: <em>Actors</em> — lidé a organizace interagující se systémem. <em>Artifacts</em> — hardware, software, data, dokumentace. <em>Relationships</em> — formální i neformální vztahy a závislosti. <em>Context</em> — politický, ekonomický, kulturní rámec. <em>Interaction patterns</em> — jak jsou artifacts zabudovány do sociálních praktik.</p>
<p>Aplikace: analýza proč systém fungující v jedné organizaci selhal při adopci jinou organizací — "web of computing" byl jiný. STIN je vhodný nástroj pro IS Due Diligence před implementací — mapování sociálního a organizačního kontextu, do nějž bude systém nasazen.</p>`,
  },
  {
    id: 'informacni-spolecnost',
    title: 'Informační společnost',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['socialni-informatika', 'digital-divide', 'surveillance-capitalism', 'digital-natives', 'difuze-inovaci'],
    body: `<p><strong>Informační společnost</strong> je společenskovědní koncept označující fázi vývoje společnosti, v níž klíčovým výrobním faktorem a zdrojem ekonomické hodnoty jsou informace a znalosti — oproti průmyslové společnosti, kde dominovaly fyzická práce a kapitál. Daniel Bell ("The Coming of Post-Industrial Society", 1973) byl průkopníkem konceptu.</p>
<p>Charakteristiky informační společnosti: dominance sektoru služeb a znalostního průmyslu, ICT jako klíčová infrastruktura, znalostní pracovníci jako dominantní třída, globalizace informačních toků, "digitalizace" ekonomiky a kultury.</p>
<p>Kritické perspektivy: <em>Techno-optimismus</em> (Toffler, Negroponte) — digitální revoluce demokratizuje přístup k informacím a emancipuje jednotlivce. <em>Kritická teorie</em> (Webster, Schiller) — "informační společnost" je ideologický konstrukt maskující pokračující kapitalistické vztahy v nové podobě — <a href="#surveillance-capitalism">surveillance capitalism</a>, koncentrace moci v technologických korporacích.</p>
<p>Digitální nerovnosti: <a href="#digital-divide">Digital divide</a> rozděluje informační společnost na ty, kdo mají přístup k ICT a kompetence je využívat, a na vyloučené. Přechod od "digital have/have-nots" k "digital skills divide" — samotný přístup nestačí bez digitální gramotnosti.</p>`,
  },
  {
    id: 'digital-divide',
    title: 'Digital divide',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['informacni-spolecnost', 'socialni-informatika', 'digital-natives'],
    body: `<p><strong>Digital divide</strong> (digitální propast nebo digitální nerovnost) je nerovnoměrné rozdělení přístupu k informačním a komunikačním technologiím a schopnosti je efektivně využívat. Koncept původně označoval propast mezi "tech haves" a "have-nots" (ti, kdo mají počítač a internet, a ti, kdo ne).</p>
<p>Tři úrovně digital divide (Jan Van Dijk): (1) <em>Motivational divide</em> — absence motivace nebo relevance k použití digitálních technologií. (2) <em>Material divide</em> — fyzický přístup k hardware, software a konektivitě. (3) <em>Skills divide</em> — digitální kompetence: operational skills (jak používat), information skills (jak najít a hodnotit informace), strategic skills (jak využít ICT pro vlastní cíle). (4) <em>Usage divide</em> — druh a kvalita využití (pasivní konzumace vs. aktivní tvorba).</p>
<p>Dimenze digital divide: geografická (Stadt vs. venkov), socioekonomická (příjem, vzdělání), věková (<a href="#digital-natives">digital natives vs. immigrants</a>), genderová, rasová. Mezinárodní propast: rozvinuté vs. rozvojové ekonomiky v přístupu k broadbandu.</p>
<p>Politické implikace: digitální exkluze vede k sociální exkluzi — přístup k vládním e-services, vzdělání online, telemedicína. EU Digital Compass (2030): 100 % pokrytí Gigabit sítí, 80 % digitálně kompetentní populace. Česká republika: Digitální Česko strategie, rozvoj 5G infrastruktury.</p>`,
  },
  {
    id: 'surveillance-capitalism',
    title: 'Surveillance capitalism',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['informacni-spolecnost', 'socialni-informatika', 'digital-divide'],
    body: `<p><strong>Surveillance capitalism</strong> (dozorový kapitalismus) je ekonomický systém definovaný Shoshanou Zuboff ("The Age of Surveillance Capitalism", 2019), ve kterém jsou lidské chování a zkušenosti transformovány do výrobního faktoru — "behavioral data" — a extrahovány bez vědomí nebo souhlasu uživatelů pro predikci a modifikaci lidského chování za účelem zisku.</p>
<p>Logika surveillance capitalism: Uživatel "platí" za bezplatné digitální služby (Google, Facebook) svými daty (aktivita, poloha, preferenci, sociální vazby). Platformy tato data analyzují, aby vytvořily "prediction products" — předpovědi budoucího chování, které prodávají inzerentům. Zuboff argumentuje, že jde o novou formu moci, která překračuje reklamu — cílem je modifikace chování (behavioural futures market).</p>
<p>Klíčové koncepty Zuboff: <em>Behavioral surplus</em> — data sbíraná nad rámec toho, co je potřeba k vylepšení služby. <em>Means of behavioral modification</em> — nástroje pro "nudging" chování (notifikace, gamifikace, personalizovaný feed). <em>Instrumentation power</em> — schopnost řídit chování bez fyzické moci.</p>
<p>Regulatorní odpověď: GDPR (právo na soukromí, consent, data minimization), DMA (Digital Markets Act) pro regulaci big tech platform. Etické dimenze AI a surveillance jsou klíčovým tématem digitální etiky a <a href="#socialni-informatika">sociální informatiky</a>.</p>`,
  },
  {
    id: 'digital-natives',
    title: 'Digital natives / Digital immigrants',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['informacni-spolecnost', 'digital-divide', 'tam', 'difuze-inovaci'],
    body: `<p><strong>Digital natives</strong> (digitální rodilci) je termín Marca Prenského (2001) označující generaci narozenou po roce přibližně 1980–1985, která vyrůstala s digitálními technologiemi a je proto "nativním mluvčím" digitálního světa. <strong>Digital immigrants</strong> (digitální přistěhovalci) jsou ti, kdo digitální technologie adoptovali až v dospělosti.</p>
<p>Prenského argument: digital natives myslí a zpracovávají informace zásadně odlišně od předchozích generací — preferují paralelní zpracování nad lineárním, grafiku před textem, hyperlinks před lineárním narativem, instant gratification. Tradiční vzdělávání bylo navrženo pro digital immigrants a "mluví zastaralým jazykem".</p>
<p>Kritika konceptu: empirické výzkumy (Bennet, Maton, Kervin, 2008) zpochybňují existenci kohortové digitální revoluce — digitální kompetence jsou výrazně heterogenní i uvnitř "digital native" generace a jsou determinovány socioekonomickým statusem, vzděláním a kontextem, nikoliv věkem. "Digital native" je mýtus, který zakrývá reálné digitální nerovnosti (<a href="#digital-divide">digital divide</a>).</p>
<p>Relevantnější pojmy pro IS výzkum: Digital literacy (digitální gramotnost — funkční kompetence pro využití ICT), e-skills (digitální dovednosti pro trh práce). Věková dimenze IS adoption může být lépe popsána <a href="#tam">TAM</a> nebo <a href="#difuze-inovaci">Difuzí inovací</a>.</p>`,
  },
  {
    id: 'difuze-inovaci',
    title: 'Difuze inovací',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['tam', 'socialni-informatika', 'informacni-spolecnost', 'digital-natives'],
    body: `<p><strong>Difuze inovací</strong> je teorie Everetta Rogerse ("Diffusion of Innovations", 1962, 5. vydání 2003), popisující, jak, proč a jakým tempem se nové myšlenky, produkty a technologie šíří v sociálním systému. Rogers identifikoval pět kategorií adoptérů a S-křivku adopce.</p>
<p>Pět kategorií adoptérů (dle rychlosti adopce): <em>Innovators</em> (2,5 %) — technofilové, první adoptoři za rizika. <em>Early Adopters</em> (13,5 %) — respektovaní opinion leaders, klíčoví pro mainstream. <em>Early Majority</em> (34 %) — deliberate, čekají na ověření. <em>Late Majority</em> (34 %) — skeptici, adoptují ze sociálního tlaku nebo ekonomické nutnosti. <em>Laggards</em> (16 %) — tradiční, adoptují velmi pomalu nebo vůbec.</p>
<p>Pět atributů inovace ovlivňujících rychlost difuze: <em>Relative advantage</em> (vnímaná výhoda oproti současnému řešení), <em>Compatibility</em> (soulad s hodnotami a potřebami), <em>Complexity</em> (obtížnost pochopení a použití), <em>Trialability</em> (možnost vyzkoušet bez závazku), <em>Observability</em> (viditelnost výsledků pro ostatní).</p>
<p>Geoffrey Moore "Crossing the Chasm" (1991) identifikoval "propast" mezi Early Adopters a Early Majority — technologické produkty zde typicky selhávají. Pro překlenutí propasti je nutné zaměřit se na konkrétní niche trh s kompletním řešením (whole product).</p>`,
  },
  {
    id: 'tam',
    title: 'TAM — Technology Acceptance Model',
    area: 'Sociální informatika',
    subjects: ['4SA440'],
    related: ['difuze-inovaci', 'socialni-informatika', 'bounded-rationality'],
    body: `<p><strong>TAM</strong> (Technology Acceptance Model) je model Freda Davise (1989), vysvětlující, proč uživatelé přijímají nebo odmítají konkrétní informační systém. TAM je jedním z nejvlivnějších a nejcitovanějších modelů v IS výzkumu.</p>
<p>Dvě klíčové konstrukty TAM: <em>Perceived Usefulness (PU)</em> — do jaké míry uživatel věří, že použití systému zlepší jeho výkon (utility). <em>Perceived Ease of Use (PEOU)</em> — do jaké míry uživatel věří, že systém bude bez námahy (usability). Kauzální řetězec: PEOU → PU → Attitude → Behavioral Intention → Actual Use. PEOU ovlivňuje PU — jednodušší systém je vnímán jako užitečnější.</p>
<p>TAM 2 (Venkatesh &amp; Davis, 2000) rozšiřuje PU o subjektivní normu (sociální vliv) a kognitivní instrumentalitu (job relevance, output quality, result demonstrability). TAM 3 (2008) integruje determinanty PEOU. UTAUT (Unified Theory of Acceptance and Use of Technology, Venkatesh et al., 2003) je meta-modelem integrující TAM s 7 dalšími modely.</p>
<p>Implikace pro IS design a implementaci: pokud uživatelé nevnímají systém jako užitečný nebo easy to use, nebude adoptován bez donucení. UX design, uživatelské školení a change management jsou klíčové pro PU a PEOU, a tedy pro úspěšnou adopci IS.</p>`,
  },
  {
    id: 'bounded-rationality',
    title: 'Bounded rationality',
    area: 'Organizace',
    subjects: ['4SA418', '4SA420'],
    related: ['satisficing', 'simon-model', 'cynefin', 'knowledge-management'],
    body: `<p><strong>Bounded rationality</strong> (omezená racionalita) je teorii Herberta Simona (1955, Nobelova cena za ekonomii 1978), která tvrdí, že lidé při rozhodování nemaximalizují racionalitu (na rozdíl od homo economicus neoklasické ekonomie), ale rozhodují v podmínkách omezené informace, omezeného kognitivního výkonu a omezeného času.</p>
<p>Tři omezení racionality: (1) <em>Omezená dostupnost informací</em> — rozhodovatel nemá přístup ke všem relevantním informacím. (2) <em>Omezený kognitivní výkon</em> — lidský mozek nemůže zpracovat neomezené množství dat. (3) <em>Omezený čas</em> — rozhodnutí musí být přijato ve stanoveném čase bez možnosti nekonečné analýzy.</p>
<p>V důsledku bounded rationality lidé používají heuristiky — jednoduché mentální zkratky, které dávají "dost dobrá" rozhodnutí s přijatelným úsilím. Místo maximalizace (klasická racionalita) dochází k <a href="#satisficing">satisficingu</a> — hledání "dostatečně dobrého" řešení.</p>
<p>Implikace pro IS design: IS mají za úkol rozšiřovat bounded rationality rozhodovatelů — dashboardy, DSS (Decision Support Systems) a BI nástroje filtrují, vizualizují a strukturují informace pro kognitivní zpracování. Příliš mnoho informací (information overload) paradoxně zhoršuje kvalitu rozhodování.</p>`,
  },
  {
    id: 'satisficing',
    title: 'Satisficing',
    area: 'Organizace',
    subjects: ['4SA418'],
    related: ['bounded-rationality', 'simon-model'],
    body: `<p><strong>Satisficing</strong> je termín Herberta Simona (portmanteau "satisfy" + "suffice"), popisující rozhodovací strategii, při níž jedinec hledá a přijímá první alternativu, která splňuje předem definované minimální prahové hodnoty (aspiration level), namísto hledání globálně optimálního řešení.</p>
<p>Simon argumentoval, že satisficing je racionalní strategií v reálném světě bounded rationality — náklady na hledání optimálního řešení (čas, kognitivní úsilí, zpracování informací) by přesáhly přínosy optimality. "Good enough is good enough".</p>
<p>Příklady satisficing v IS/IT kontextu: Manažer přijme první ERP systém, který splňuje minimální kritéria (funkce, cena, referenční zákazníci), aniž by systematicky hodnotil všechny alternativy. Výběrové řízení na dodavatele IS definuje minimální požadavky (RFP) a vybírá prvního uchazeče, který je splní za přijatelnou cenu. Výzkumník používá první "dostatečně dobrý" akademický zdroj k tématu.</p>
<p>Satisficing vs. Optimizing: v turbulentním prostředí s nejistotou může být satisficing adaptivnější než optimizing — optima se rychle mění, náklady na přepočet jsou vysoké, a "dostatečně dobré" rozhodnutí dnes je lepší než "optimální" rozhodnutí příliš pozdě. <a href="#cynefin">Cynefin</a> Complex domain vyžaduje probe-sense-respond, nikoliv optimize.</p>`,
  },
  {
    id: 'seci-model',
    title: 'SECI model',
    area: 'Organizace',
    subjects: ['4SA418'],
    related: ['tacit-knowledge', 'explicit-knowledge', 'knowledge-management', 'znalosti', 'cop'],
    body: `<p><strong>SECI model</strong> (Nonaka &amp; Takeuchi, "The Knowledge-Creating Company", 1995) popisuje čtyři způsoby konverze znalostí v organizaci — Socialization, Externalization, Combination, Internalization — čímž vzniká spirála tvorby organizačních znalostí.</p>
<p>Čtyři mody konverze:</p>
<ul>
  <li><strong>S — Socialization</strong> (Tacit → Tacit): Sdílení tacitních znalostí přímou zkušeností — mentoring, apprenticeship, sdílení pracovního prostoru, společná práce. "Přítomností u mistra se učíme jeho přístupu".</li>
  <li><strong>E — Externalization</strong> (Tacit → Explicit): Artikulace tacitní znalosti do explicitní formy — metafory, modely, principy, best practices. Nejobtížnější konverze — "jak popsat chuť čokolády".</li>
  <li><strong>C — Combination</strong> (Explicit → Explicit): Kombinování explicitních znalostí — databáze, dokumenty, systémy. Tradiční "knowledge management" se soustředí právě zde, ale je nejméně hodnotná konverze.</li>
  <li><strong>I — Internalization</strong> (Explicit → Tacit): Učení se praxí (learning by doing) — manuály a procesy se internalizují jako tacitní dovednosti. "Teorie se stane instinktem".</li>
</ul>
<p>"Ba" (japonsky: místo) je kontextem, v němž konverze probíhá — fyzický prostor (setkání), virtuální prostor (online spolupráce), mentální prostor (sdílené hodnoty). Ba nelze vytvořit příkazem — management musí vytvářet podmínky pro vznik Ba.</p>`,
  },
  {
    id: 'tacit-knowledge',
    title: 'Tacit knowledge',
    area: 'Organizace',
    subjects: ['4SA418'],
    parentId: 'seci-model',
    related: ['seci-model', 'explicit-knowledge', 'knowledge-management', 'znalosti'],
    body: `<p><strong>Tacit knowledge</strong> (tacitní/skryté znalosti) jsou znalosti, které "víme, ale nemůžeme říct" (Michael Polanyi: "We can know more than we can tell"). Tacitní znalosti jsou zakotveny v osobní zkušenosti, dovednostech, intuici, mentálních modelech a pracovních zvyklostech — obtížně artikulovatelné, přenositelné nebo kodifikovatelné.</p>
<p>Příklady tacitní znalosti: zkušeného technika "cit" pro identifikaci problému podle zvuku stroje, zkušenost obchodníka v čtení zákazníka, intuitivní porozumění organizační kultuře, umění jízdy na kole (nelze naučit pouze z popisu), kreativní design. Jednoduše: odborná praxe a "know-how" jsou z velké části tacitní.</p>
<p>Tacitní znalosti mají dvě dimenze (Polanyi): <em>Technická</em> — neformální dovednosti a kompetence (know-how). <em>Kognitivní</em> — mentální modely, přesvědčení, hodnoty formující naše vnímání.</p>
<p>Implikace pro KM: Organizace, která spoléhá výhradně na explicitní znalosti (dokumenty, databáze), ztrácí 70–80 % znalostního kapitálu. Ztráta klíčového zaměstnance = ztráta nenahraditelné tacitní znalosti (brain drain). KM musí zahrnovat i <a href="#seci-model">Socialization</a> a <a href="#cop">Communities of Practice</a> pro přenos tacitních znalostí.</p>`,
  },
  {
    id: 'explicit-knowledge',
    title: 'Explicit knowledge',
    area: 'Organizace',
    subjects: ['4SA418'],
    parentId: 'seci-model',
    related: ['seci-model', 'tacit-knowledge', 'knowledge-management', 'znalosti'],
    body: `<p><strong>Explicit knowledge</strong> (explicitní znalosti) jsou znalosti, které lze kodifikovat — vyjádřit v slovech, číslech, diagramech, manuálech, databázích nebo formálních procedurách. Explicitní znalosti jsou přenositelné a sdílitelné prostřednictvím formálních prostředků.</p>
<p>Příklady explicitních znalostí: technická dokumentace, procesní manuály, projektové plány, databáze best practices, vědecké publikace, datasheets, API dokumentace, FAQ, pravidla a politiky. Jednoduše: cokoliv, co může být zapsáno a přečteno.</p>
<p>Charakteristiky explicitních znalostí: <em>Kodifikovatelné</em> — lze zachytit v artefaktu. <em>Přenositelné</em> — lze sdílet bez přímé interakce. <em>Destillable</em> — lze extrahovat z kontextu. <em>Sharable simultaneously</em> — mnoho lidí může mít stejnou explicitní znalost najednou.</p>
<p>Limity explicitních znalostí: mnoho explicitní znalosti "ztratí" důležitý kontext při kodifikaci — "lost in translation" z tacitní do explicitní (viz <a href="#seci-model">SECI model</a> Externalization modus). Dokumenty zastarávají rychle. Přílišné spoléhání na explicitní KM platformy vytváří "knowledge graveyards" — databáze plné neaktuálních dokumentů, které nikdo nečte. Kombinace explicitního KM s CoP a mentoring programy je efektivnější.</p>`,
  },
  {
    id: 'knowledge-management',
    title: 'Knowledge Management',
    area: 'Organizace',
    subjects: ['4SA415', '4SA418'],
    related: ['seci-model', 'tacit-knowledge', 'explicit-knowledge', 'znalosti', 'cop', 'senge-5-disciplin'],
    body: `<p><strong>Knowledge Management (KM)</strong> je systémový přístup k identifikaci, vytváření, zachycování, sdílení a využívání organizačních znalostí za účelem dosažení podnikových cílů. KM uznává znalosti jako klíčové strategické aktivum a řídí je s odpovídající péčí.</p>
<p>Dvě základní KM strategie (Hansen, Nohria, Tierney, 1999): <em>Codification strategy</em> — znalosti jsou zachyceny v databázích, dokumentech a repositářích; vhodná pro organizace nabízející standardizované produkty/služby (konzultační firmy s metodikami jako McKinsey). <em>Personalization strategy</em> — znalosti jsou vázány na osoby a sdíleny přímou interakcí; vhodná pro organizace s vysoce individualizovanými, kreativními výstupy (právní firmy, research). Organizace by měla dominantně volit jednu strategii.</p>
<p>KM nástroje a procesy: <a href="#cop">Communities of Practice</a>, mentoring a apprenticeship programy, after-action reviews (lessons learned), knowledge repositories (SharePoint, Confluence), expert directories (yellow pages), storytelling, job rotation pro šíření tacitních znalostí. KM nemohou být vnuceny — jsou podmíněny kulturou, incentivami a důvěrou.</p>
<p>KM a IT: IT je enablerem KM (content management, search, collaboration tools), nikoliv KM samotným. Chyba: "zakoupíme KM systém a tím vyřešíme KM" — bez kultury a procesů je IT pouze prázdná databáze. <a href="#senge-5-disciplin">Senge</a> by řekl: KM je otázkou 5th Discipline (Team Learning a Mental Models).</p>`,
  },
  {
    id: 'cop',
    title: 'Communities of Practice',
    area: 'Organizace',
    subjects: ['4SA418'],
    related: ['knowledge-management', 'tacit-knowledge', 'seci-model', 'senge-5-disciplin'],
    body: `<p><strong>Communities of Practice (CoP)</strong> jsou skupiny lidí, kteří sdílejí zájem o konkrétní oblast praxe, se pravidelně setkávají (fyzicky nebo virtuálně) a společnou interakcí rozvíjejí vlastní znalosti a kompetence. Termín zavedli Etienne Wenger a Jean Lave (1991, "Situated Learning").</p>
<p>Tři dimenze CoP dle Wengera: <em>Domain</em> (doména) — sdílený zájem nebo oblast kompetence, která definuje identitu komunity. <em>Community</em> (komunita) — síť vztahů, setkávání, diskuse, vzájemná pomoc. <em>Practice</em> (praxe) — sdílené repertoire — nástroje, postupy, termíny, příběhy, způsoby řešení problémů.</p>
<p>CoP vs. formální týmy: tým je definován organizačně (kdo mu náleží), CoP je definována zájmem a dobrovolností (kdo se chce zapojit). Tým produkuje výstupy, CoP produkuje sdílené znalosti a kompetence. CoP se nespravuje — vytváří se podmínky pro její vznik a fungování (čas, prostor, uznání).</p>
<p>Příklady CoP v IT: Security guild v agilní organizaci (Spotify model), Backend developers community, ERP consultants regional community. CoP jsou klíčovým nástrojem pro sdílení <a href="#tacit-knowledge">tacitních znalostí</a> přes Socialization modus <a href="#seci-model">SECI modelu</a>. IT oddělení s aktivními CoP vykazují rychlejší difuzi best practices a nižší výskyt opakujících se chyb.</p>`,
  },
  {
    id: 'hofstede',
    title: 'Hofstedovy dimenze kultury',
    area: 'Organizace',
    subjects: ['4SA418', '4SA440'],
    related: ['socialni-informatika', 'knowledge-management', 'bounded-rationality'],
    body: `<p><strong>Hofstedovy dimenze kultury</strong> jsou rámec Geerta Hofstedeho (IBM studie 1967–1973, dílo "Culture's Consequences" 1980), který kvantitativně měří národní kultury na šesti dimenzích. Rámec je základem pro cross-cultural management a design globálních IS.</p>
<p>Šest Hofstedových dimenzí:</p>
<ol>
  <li><strong>Power Distance (PDI)</strong>: míra akceptace nerovné distribuce moci. Vysoké PDI = hierarchie je přirozená. Nízké = preference rovnosti. ČR: střední PDI.</li>
  <li><strong>Individualism vs. Collectivism (IDV)</strong>: míra, v jaké jedinci fungují jako individua vs. skupina. Západ: vysoký IDV. Asie/Latina: nízký.</li>
  <li><strong>Masculinity vs. Femininity (MAS)</strong>: preference pro výkon, hrdinství, materialismus (masculinity) vs. spolupráce, péče, kvalita života (femininity). Skandinávie: nejvíce feminine.</li>
  <li><strong>Uncertainty Avoidance (UAI)</strong>: tolerance k nejistotě a nejednoznačnosti. Vysoké UAI = preference pravidel, procedur, struktur. ČR: nadprůměrné UAI.</li>
  <li><strong>Long-term Orientation (LTO)</strong>: orientace na budoucnost vs. tradici.</li>
  <li><strong>Indulgence vs. Restraint (IVR)</strong>: míra, v jaké lidé mohou uspokojovat základní touhy.</li>
</ol>
<p>IS implikace: design globálního IS musí respektovat kulturní dimenze — IS navržený pro nízké PDI prostředí (plochá hierarchie, otevřené sdílení informací) bude neúčinný nebo odmítán ve vysokém PDI kontextu. <a href="#erp">ERP</a> roll-outs v různých kulturách vyžadují kulturně senzitivní change management.</p>`,
  },
  {
    id: 'media-richness',
    title: 'Media Richness Theory',
    area: 'Organizace',
    subjects: ['4SA418', '4SA440'],
    related: ['socialni-informatika', 'tam', 'knowledge-management'],
    body: `<p><strong>Media Richness Theory</strong> (Daft &amp; Lengel, 1986) tvrdí, že efektivní komunikace závisí na souladu "bohatosti" komunikačního média s komplexitou přenášené informace. Různá média mají různou schopnost přenášet komplexní, nejednoznačné informace.</p>
<p>Škála media richness od nejbohatšího k nejchudšímu: Face-to-face (nejbohatší — okamžitá zpětná vazba, verbální + neverbální, personalizované) → Video conference → Telefon → Psaný chat/IM → E-mail → Formální písemné dokumenty → Numerické reporty/databáze (nejchudší). Bohatost média závisí na: okamžitost zpětné vazby, paralelnost komunikačních kanálů, personalness, jazyková variabilita.</p>
<p>Thesis Media Richness Theory: Nejednoznačné (equivocal), komplexní úkoly vyžadují bohatá média — videohovor pro strategické rozhodnutí. Dobře definované, rutinní komunikace jsou efektivnější přes chudá média — e-mail pro předání faktury. Nesoulad media-task vede k neefektivitě (over/under communication).</p>
<p>Kritika a rozšíření: teorie dobře popisuje synchronní komunikaci, ale nedostatečně zachycuje asynchronní výhody (e-mail umožňuje reflexi a záznam). Social Influence Model (Fulk et al.) doplňuje, že volba média je ovlivněna sociálními normami a symbolickými hodnotami — lidé volí bohatá média nejen kvůli task complexity, ale i kvůli statusu a dojem managementu. Implikace pro design IS: správná volba komunikačních nástrojů pro různé typy spolupráce.</p>`,
  },
  {
    id: 'simon-model',
    title: 'Simon model rozhodování',
    area: 'Organizace',
    subjects: ['4SA418'],
    related: ['bounded-rationality', 'satisficing', 'knowledge-management', 'dikw-model'],
    body: `<p><strong>Simon model rozhodování</strong> je model procesu rozhodování formulovaný Herbertem Simonem, popisující tři fáze, jimiž každý rozhodovací proces prochází: Intelligence (Zpravodajství), Design (Návrh) a Choice (Výběr). Byl rozšířen Gory a Scottem Mortonem o čtvrtou fázi: Implementation (Implementace).</p>
<p>Tři (čtyři) fáze Simonova modelu:</p>
<ol>
  <li><strong>Intelligence</strong> — Skenování prostředí, identifikace problémů a příležitostí, sběr a zpracování informací. "Co se děje? Existuje problém?". Zahrnuje monitoring KPI, reporting, SIEM alerting, business intelligence.</li>
  <li><strong>Design</strong> — Vývoj, nalezení nebo generování alternativních řešení problému. "Jaké jsou možnosti?". Modelování, simulace, brainstorming, heuristiky.</li>
  <li><strong>Choice</strong> — Výběr jedné z alternativ pro realizaci. "Co uděláme?". Analýza, hodnocení kritérií, DSS (Decision Support Systems), risk assessment.</li>
  <li><strong>Implementation</strong> (Gory &amp; Scott Morton) — Realizace zvoleného rozhodnutí a zpětná vazba. "Funguje to?". Monitor and adapt.</li>
</ol>
<p>IS jsou navrženy pro podporu různých fází: MIS a BI systémy pro Intelligence, DSS pro Design a Choice, ERP a workflow systémy pro Implementation. Decision Support Systems (DSS) jsou přímo odvozeny od Simonova modelu jako nástroje pro analytické a design fáze.</p>`,
  },
]
