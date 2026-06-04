import { useState } from 'react'

type MemberId = 'smutny' | 'sedlacek' | 'sigmund'

interface KomiseQuestion { q: string; answer: string }

const MEMBERS: Record<MemberId, { name: string; style: string; color: string; questions: KomiseQuestion[] }> = {
  smutny: {
    name: 'doc. Smutný',
    color: '#3b82f6',
    style: 'Zaměřuje se na sociální informatiku, sociotechnické aspekty, metodologii výzkumu a vazbu na praxi. Rád propojuje teorii s konkrétním tématem práce.',
    questions: [
      {
        q: 'Jak byste vysvětlil vztah vaší praxe k sociální informatice?',
        answer: 'Sociální informatika (Kling) studuje vzájemné vztahy mezi informačními technologiemi a sociálním kontextem jejich vývoje a používání. Praktická aplikace se zabývá optimalizací procesů v klasickém on-premise ERP, přičemž řeší nejen technické aspekty konfigurace, ale i organizační a lidské faktory — kdo procesy provádí, jaká jsou jejich omezení a jak se mění jejich role. Technologie (SAP) a sociální kontext (organizace, uživatelé, role) se v mé práci vzájemně konstituují, což je podstatou sociotechnického přístupu.',
      },
      {
        q: 'V čem je vaše téma sociotechnický problém a co to znamená pro výsledky práce?',
        answer: 'Sociotechnický problém je situace, kde technické a sociální složky systému jsou vzájemně provázány a nelze je optimalizovat odděleně. Moje téma — optimalizace procesů v klasickém on-premise ERP — je sociotechnické, protože samotná rekonfigurace systému nestačí; klíčová je i změna rolí, odpovědností a pracovních návyků uživatelů. To znamená, že výsledky práce musí zahrnovat nejen technický návrh, ale i doporučení pro change management a governance.',
      },
      {
        q: 'Proč automatizace sama nezaručí zlepšení produktivity?',
        answer: 'Automatizace zvyšuje efektivitu jen tehdy, jsou-li optimalizovány i podpůrné procesy, kompetence pracovníků a organizační kultura — to potvrzuje i paradox produktivity (Solow, 1987). Pokud se automatizuje dysfunkční proces, výsledkem je jen rychleji špatně. V mé praxi to znamená, že navržená automatizace procesů v ERP má smysl pouze tehdy, jsou-li AS-IS procesy nejprve analyzovány a jsou-li identifikována kořenová omezení.',
      },
      {
        q: 'Jak byste popsal rezistenci uživatelů při zavádění ICT a jak jste ji v práci zohlednil?',
        answer: 'Rezistence uživatelů při zavádění ICT vychází z obav ze ztráty kontroly, zvýšení pracovní zátěže nebo nejistoty ohledně nových rolí — Kling hovoří o "politics of information systems". V mé práci jsem ji zohlednil analýzou stakeholderů a identifikací klíčových uživatelů, kteří mohou proces blokovat nebo podpořit. Navržený governance rámec proto zahrnuje explicitní kroky pro zapojení uživatelů do definice TO-BE procesů.',
      },
      {
        q: 'Kde ve vaší práci vidíte potřeby, zájmy, hodnoty a normy sociálních skupin?',
        answer: 'Každá sociální skupina zapojená do ERP procesů má odlišné potřeby a zájmy: IT oddělení chce minimalizovat customizace, finanční účtárna chce spolehlivost uzávěrek, management chce viditelnost nákladů. Tyto rozdílné zájmy se projevují v konfliktech při definici procesních požadavků. V mé práci jsem s tím pracoval přes analýzu stakeholderů a use-case matici, která mapuje, kdo má jaký zájem na navrhovaných změnách.',
      },
      {
        q: 'Jak byste napojil COBIT/EGIT na procesní optimalizaci v ERP?',
        answer: 'COBIT/EGIT poskytuje governance rámec, který definuje, kdo zodpovídá za IT-enabled procesy, jak se měří jejich výkonnost a jak se řídí rizika. V kontextu ERP optimalizace to znamená: COBIT APO02 (Managed Strategy) nastavuje cíle optimalizace; BAI02 (Managed Requirements) definuje procesní požadavky; DSS06 (Managed Business Process Controls) zajišťuje kontroly v ERP procesech. Výsledkem je, že moje procesní doporučení jsou zakotvena v governance struktuře, nikoli jen technické specifikaci.',
      },
      {
        q: 'Jak jste evaluoval navržený artefakt a jak byste ověřil, že návrh dává smysl pro uživatele?',
        answer: 'Evaluace artefaktu v DSR (Design Science Research) může probíhat funkčním testováním, případovou studií, odborným posouzením nebo simulací. V mé práci jsem artefakt — procesní a governance rámec — evaluoval kombinací expertního posouzení (konzultace s ERP odborníky a vedením organizace) a strukturovaného srovnání s požadavky definovanými v explorační fázi. Ověření smysluplnosti pro uživatele by vyžadovalo pilotní implementaci a sběr zpětné vazby od klíčových uživatelů.',
      },
      {
        q: 'Jak byste vysvětlil FOR cyklus někomu, kdo neprogramuje?',
        answer: 'FOR cyklus je instrukce, která říká: "Opakuj tento postup tolikrát, kolikrát je potřeba." Představte si účetní, který kontroluje každý řádek faktury — FOR cyklus je přesně to: vezmi první řádek, zkontroluj ho, přejdi na druhý, zkontroluj ho, a takto opakuj, dokud nedojdeš na konec. Počítač to dělá milionkrát rychleji než člověk, ale princip je stejný.',
      },
      {
        q: 'Proč LLM nemají vědomí, i když se tak mohou tvářit?',
        answer: 'LLM (Large Language Models) generují text statistickou predikcí — model odhaduje, které slovo má nejvyšší pravděpodobnost následovat po předchozích slovech na základě miliard tréninkových příkladů. Vědomí předpokládá subjektivní zkušenost, záměr a sebeuvědomění — LLM žádné z toho nemá, pouze modeluje povrchové vzory jazyka. Searle to ilustruje argumentem "čínského pokoje": systém, který správně manipuluje se symboly, nemusí danému jazyku rozumět.',
      },
      {
        q: 'Jak byste porovnal kvalitativní a kvantitativní výzkum a co jste použil v praxi?',
        answer: 'Kvantitativní výzkum pracuje s číselnými daty, statistickou analýzou a testováním hypotéz — odpovídá na "kolik" a "jak silná je korelace". Kvalitativní výzkum pracuje s textem, interpretací a hlubším porozuměním kontextu — odpovídá na "proč" a "jak to funguje". V praxi jsem použil primárně kvalitativní přístup (analýza procesní dokumentace, rozhovory se stakeholdery, případová studie), kombinovaný s kvantitativními metrikami tam, kde bylo možné měřit procesní výkonnost.',
      },
    ],
  },
  sedlacek: {
    name: 'doc. Sedláček',
    color: '#10b981',
    style: 'Zaměřuje se na kybernetickou bezpečnost, sítě, kryptografii a technické aspekty. Ptá se konkrétně a věcně. Ocení jasné definice a praktické příklady.',
    questions: [
      {
        q: 'Jak se liší identifikace, autentizace a autorizace? Příklad ze ERP.',
        answer: 'Identifikace je tvrzení identity — uživatel sděluje, kým je (ERP user ID). Autentizace je ověření tohoto tvrzení — systém ověří heslo, certifikát nebo TOTP token. Autorizace je přidělení oprávnění — ERP zkontroluje, zda ověřený uživatel smí spustit danou transakci (např. FB60 — účtování faktury). V ERP: identifikace = zadání SY-UNAME, autentizace = přihlášení heslem nebo SSO, autorizace = kontrola autorizačního objektu (M_BEST_BSA, F_BKPF_BUK atd.).',
      },
      {
        q: 'Co je RBAC a jak se používá ve správě ERP rolí?',
        answer: 'RBAC (Role-Based Access Control) je model přístupového řízení, kde oprávnění jsou navázána na role, nikoli přímo na jednotlivé uživatele. V ERP se role vytvářejí v transakci PFCG a přiřazují uživatelům přes SU01 nebo SU10. Výhoda RBAC: změna oprávnění pro skupinu uživatelů se provede jednou úpravou role, nikoli úpravou u každého uživatele zvlášť. Pro velké organizace se ERP role hierarchicky skládají: Single role → Composite role → User group.',
      },
      {
        q: 'Co je Segregation of Duties (SoD) a proč je kritická v ERP?',
        answer: 'Segregation of Duties (oddělení povinností) je princip, podle něhož žádný jednotlivý uživatel nesmí mít kombinaci oprávnění, která by mu umožnila spáchat a zakrýt podvod nebo chybu bez odhalení. Klasický příklad v ERP: stejný uživatel nesmí vytvořit dodavatele v MM a zároveň schválit platbu ve FI. SoD je klíčová kontrola pro SOX compliance, interní audit a snižování rizika podvodu v ERP. ERP GRC Access Control automatizuje detekci SoD konfliktů.',
      },
      {
        q: 'Jak byste chránil citlivá data při přenosu a uložení v ERP prostředí?',
        answer: 'Při přenosu: šifrování pomocí TLS 1.2/1.3 pro veškerou ERP GUI, Fiori a API komunikaci; SNC (Secure Network Communication) pro komunikaci mezi ERP komponentami. Při uložení: šifrování na úrovni databáze (ERP HANA Data Volume Encryption, Oracle TDE), šifrování záloh, správa klíčů přes ERP Enterprise Threat Detection nebo HSM. Doplňkově: pseudonymizace osobních dat v souladu s GDPR (maskování v testovacích systémech), auditní logy přes SM20 a ERP GRC.',
      },
      {
        q: 'Co je forward secrecy a proč je důležitá?',
        answer: 'Forward secrecy (nebo Perfect Forward Secrecy, PFS) je vlastnost kryptografického protokolu, která zajišťuje, že kompromitace dlouhodobého soukromého klíče serveru neohrozí dříve zaznamenané šifrované relace. Dosahuje se tím, že pro každou relaci je vygenerován nový dočasný (ephemeral) klíč — typicky ECDHE (Elliptic Curve Diffie-Hellman Ephemeral). Prakticky: i kdyby útočník získal privátní klíč serveru, nemůže dešifrovat minulé komunikace, protože ephemeral klíče nikde neuložil.',
      },
      {
        q: 'Jak funguje HTTPS a jakou roli hraje certifikační autorita?',
        answer: 'HTTPS je HTTP přenášené přes TLS. Při připojení proběhne TLS handshake: klient pošle ClientHello, server odpoví certifikátem a ServerHello, dohodne se šifrovací sada a klíčová výměna (ECDHE), vzniknou session keys, a veškerá další komunikace je symetricky šifrována. Certifikační autorita (CA) je důvěryhodná třetí strana, která svým digitálním podpisem potvrzuje, že veřejný klíč v certifikátu skutečně patří danému serveru (doméně). Prohlížeč důvěřuje certifikátu, protože důvěřuje CA, která ho podepsala (Root CA store v OS/prohlížeči).',
      },
      {
        q: 'Co jsou HTTP hlavičky HSTS a CSP a proti čemu chrání?',
        answer: 'HSTS (HTTP Strict Transport Security) je response header, který říká prohlížeči: "tento web používej vždy přes HTTPS, nikdy přes HTTP." Chrání před SSL stripping útoky, kdy útočník downgraduje spojení na nešifrované HTTP. CSP (Content Security Policy) definuje, odkud smí stránka načítat skripty, styly a obrázky. Chrání primárně před XSS (Cross-Site Scripting) útoky tím, že zabrání spuštění injektovaných skriptů z nedůvěryhodných zdrojů.',
      },
      {
        q: 'Jak se bránit SQL injection? Jak byste to vysvětlil business uživateli?',
        answer: 'SQL injection je útok, kdy uživatelský vstup modifikuje strukturu SQL dotazu a útočník tak může obejít přihlášení, číst nebo mazat data. Obrana: parametrizované dotazy (prepared statements) — hodnoty vstupu se nikdy nekoncatenují do SQL řetězce, ale předávají jako oddělené parametry; databáze je zpracuje jako data, ne jako příkazy. Business uživateli bych to vysvětlil: "Představte si formulář, do kterého někdo místo svého jména napíše příkaz \'smaž všechny záznamy\'. Parametrizovaný dotaz zajistí, že systém tento text vezme doslova jako jméno, nikoli jako příkaz."',
      },
      {
        q: 'Jak byste bezpečně ukládal hesla? Co je špatně na MD5 hash hesel?',
        answer: 'Hesla se nikdy neukládají v plaintextu ani jako prostý rychlý hash. MD5 je nevhodný, protože je extrémně rychlý (miliardy hashů za sekundu na GPU), což umožňuje brute-force a rainbow table útoky. Správný postup: použít záměrně pomalý hashovací algoritmus s unikátním saltem pro každého uživatele — doporučeno OWASP: Argon2id (nejlepší), bcrypt nebo scrypt. Salt je náhodný řetězec přidaný před hashováním, který zabrání rainbow table útokům. Doplňkově: MFA jako druhá vrstva ochrany.',
      },
      {
        q: 'Proč AI modely halucinují a jak to ovlivňuje jejich použití v podnikových procesech?',
        answer: 'LLM halucinuje, protože optimalizuje pravděpodobnost plausibilního pokračování textu, nikoli faktickou správnost — model nemá mechanismus ověřování pravdivosti. Způsobují to mezery v trénovacích datech, nejednoznačné dotazy a absence explicitního kontrolního mechanismu. V podnikových procesech to znamená, že výstupy LLM nelze bez validace použít v kritických procesech (finanční reporting, právní dokumenty, zdravotní záznamy). Mitigace: RAG (Retrieval-Augmented Generation) — model dotazuje ověřenou znalostní bázi, citace zdrojů, human-in-the-loop pro kritická rozhodnutí.',
      },
      {
        q: 'Co se děje krok po kroku, když uživatel zadá URL do prohlížeče?',
        answer: 'Krok 1: DNS lookup — prohlížeč přeloží doménové jméno na IP adresu (ptá se rekurzivního DNS resolveru, ten kontaktuje autoritativní DNS). Krok 2: TCP handshake — prohlížeč naváže spojení se serverem přes 3-way handshake (SYN → SYN-ACK → ACK). Krok 3: TLS handshake — pro HTTPS se vyjedná šifrování (ClientHello, certifikát, key exchange, session keys). Krok 4: HTTP GET request — prohlížeč pošle požadavek na stránku. Krok 5: server odpoví HTML, prohlížeč parsuje DOM, stáhne CSS/JS/obrázky a stránku vykreslí.',
      },
      {
        q: 'Jak byste porovnal cloud a on-prem z pohledu bezpečnostních rizik?',
        answer: 'On-premise: organizace má plnou kontrolu nad daty a infrastrukturou, ale nese veškerou odpovědnost za bezpečnost, záplatování a dostupnost. Cloud (IaaS/PaaS/SaaS): bezpečnost se sdílí s poskytovatelem dle modelu sdílené odpovědnosti — provider zajišťuje fyzickou bezpečnost a infrastrukturu, zákazník odpovídá za konfiguraci, přístupová práva a data. Klíčová rizika cloudu: misconfiguration (nesprávně nastavené S3 bucket = veřejně přístupná data), vendor lock-in, jurisdikce dat (GDPR vs. US Cloud Act), insider threat na straně providera. ERP BTP/S4HC = cloud, kde zákazník musí jasně pochopit, co je v jeho odpovědnosti.',
      },
    ],
  },
  sigmund: {
    name: 'doc. Sigmund',
    color: '#8b5cf6',
    style: 'Zaměřuje se na systémové myšlení, metodologii praxe, DSR a informační systémy jako sociální systémy. Ptá se na hlubší pochopení a vztahy mezi koncepty.',
    questions: [
      {
        q: 'Jak byste vymezil systém, který jste v praxi řešil? Kde jsou jeho hranice?',
        answer: 'Systém v mé praxi je soubor klasickém on-premise ERP procesů v doméně finančního účetnictví a nákupu, včetně jejich vazeb na organizační strukturu a uživatele. Hranice systému jsem definoval funkčně: zahrnuji procesy od zadání objednávky (MM) přes příjemku až po zaúčtování faktury (FI), ale nezahrnuji navazující logistické procesy ve skladu. Toto vymezení je důležité, protože definuje, co je v rozsahu navrhovaného artefaktu a co jsou vnější vstupy a výstupy.',
      },
      {
        q: 'Je vaše téma tvrdý, měkký nebo kritický systémový problém? Zdůvodněte.',
        answer: 'Moje téma je kombinací tvrdého a měkkého systémového problému. Tvrdá složka: existují jasně měřitelné procesní metriky (čas zpracování faktury, počet chyb, SoD konflikty), které lze optimalizovat. Měkká složka: definice "optimálního" procesu závisí na hodnotách a zájmech různých stakeholderů (IT, finance, management, uživatelé), kteří se neshodnou na cíli. Proto jsem použil kombinaci strukturované procesní analýzy (tvrdý přístup) a stakeholderské analýzy s workshopy (měkký přístup).',
      },
      {
        q: 'Jakou roli hrají AS-IS/TO-BE modely a jaká jsou jejich omezení jakožto modelů reality?',
        answer: 'AS-IS model zachycuje současný stav procesu — jak skutečně funguje v organizaci, nikoli jak je formálně popsán. TO-BE model definuje žádoucí budoucí stav po optimalizaci. Jejich klíčové omezení: jsou abstrakcí reality a tedy vždy neúplné — mapa není území (Korzybski). AS-IS nikdy nezachytí všechny neformální postupy a výjimky; TO-BE nikdy plně nepředpoví, jak se lidé v novém procesu skutečně zachovají. Proto je evaluace artefaktu (pilotní implementace, zpětná vazba) nezbytnou součástí DSR metodologie.',
      },
      {
        q: 'Co je black box a jaké riziko představuje v kontextu automatizace procesů?',
        answer: 'Black box je systém nebo komponenta, jejíž vnitřní fungování je skryté — vidíme pouze vstupy a výstupy, ale ne logiku transformace. V kontextu automatizace procesů (zejména AI/ML komponenty v ERP) to představuje riziko neauditovatelnosti: nelze vysvětlit, proč systém přijal konkrétní rozhodnutí, což je problematické pro audit, compliance a odpovědnost. V mé práci automatizuji pravidlová rozhodnutí, kde logika je transparentní; doporučuji se vyhnout black-box AI pro rozhodnutí s přímým finančním dopadem.',
      },
      {
        q: 'Jaké etické problémy může mít automatizace procesů? Kdo jsou stakeholdeři?',
        answer: 'Automatizace procesů přináší etické otázky v několika rovinách: pracovní dopad (přesun nebo zánik pracovních pozic — kdo odpovídá za rekvalifikaci?), transparentnost rozhodování (jsou automatizovaná rozhodnutí auditovatelná a spravedlivá?), odpovědnost za chyby (kdo odpovídá, když robot udělá chybu?). Stakeholdeři v mém kontextu: zaměstnanci vykonávající automatizované činnosti, management zodpovědný za implementaci, IT tým zodpovědný za provoz, odbory zastupující zájmy pracovníků, regulátoři (GDPR, zákoník práce). Etická dimenze je součástí sociotechnického přístupu.',
      },
      {
        q: 'Jak souvisí informace, interpretace a rozhodování v organizaci s vaší prací?',
        answer: 'Informace bez interpretace je pouhé datum — data v ERP (čísla transakcí, stavy schválení) se stávají informací teprve v kontextu rozhodovacích potřeb managementu. Různí stakeholdeři interpretují stejná data odlišně dle svého rámce (finanční controller vidí nákladový přesah, operations manager vidí zpoždění dodávky). V mé práci to znamená, že navrhované TO-BE procesy a KPI musejí být definovány společně se stakeholdery, aby reflektovaly jejich interpretační rámce a podpořily správná rozhodnutí.',
      },
      {
        q: 'Jak se liší tvrdé a měkké systémové přístupy? Kdy byste použil SSM?',
        answer: 'Tvrdé systémové přístupy (Hard Systems Thinking) předpokládají, že cíl systému je jasně definovaný a problém je "jak ho dosáhnout" — typicky operační výzkum, matematická optimalizace. Měkké systémové přístupy (Soft Systems Methodology, Checkland) začínají od "problémové situace", kde cíl není jasný a různí stakeholdeři ho vnímají odlišně. SSM bych použil v situaci, kde je nutné nejprve dosáhnout sdíleného porozumění problému — například při identifikaci procesních požadavků od diverzních stakeholderů na začátku ERP projektu.',
      },
      {
        q: 'Jak byste popsal informační přetížení v organizaci a jak s ním bojovat?',
        answer: 'Informační přetížení (information overload, Toffler) nastává, když objem a komplexita informací překračuje kapacitu jedince nebo organizace je efektivně zpracovat a využít pro rozhodnutí. Příznaky: pomalá rozhodnutí, ignorování relevantních dat, nadprodukce reportů, které nikdo nečte. V kontextu ERP: přílišné množství reportů a dashboardů bez jasné hierarchie. Řešení: design informační architektury orientovaný na rozhodovací potřeby (co potřebuje management vědět?), konsolidace reportingu, prioritizace KGI/KPI, alerting místo pasivního reportingu.',
      },
      {
        q: 'Jak se liší indukce a dedukce? Jak jste přistupoval k výzkumu v praxi?',
        answer: 'Indukce jde od konkrétních pozorování k obecné teorii nebo generalizaci (bottom-up). Dedukce jde od obecné teorie nebo hypotézy ke konkrétním testovatelným předpovědím (top-down). V praxi jsem kombinoval oba přístupy v souladu s DSR: dedukci při výběru teoretického rámce (COBIT, procesní management) a návrhu artefaktu; indukci při analýze AS-IS procesů a evaluaci, kde jsem z konkrétních zjištění vyvozoval obecnější doporučení pro governance rámec.',
      },
      {
        q: 'Jak byste zaváděl systém na podporu rozhodování a co jsou klíčové předpoklady úspěchu?',
        answer: 'Zavedení DSS (Decision Support System) by probíhalo: identifikace rozhodovacích potřeb managementu, definice datových zdrojů a jejich kvalita, výběr analytické platformy (Power BI, ERP Analytics Cloud), design dashboardů orientovaný na KGI/KPI, pilotní nasazení s klíčovými uživateli, iterativní ladění. Klíčové předpoklady úspěchu: (1) kvalita vstupních dat — "garbage in, garbage out"; (2) zapojení uživatelů od začátku; (3) jednoduchá a srozumitelná vizualizace; (4) napojení na existující rozhodovací procesy, nikoli izolovaný nástroj.',
      },
    ],
  },
}

const SMUTNY_BATTLE_PLAN = {
  axes: [
    'ICT nikdy neobhajovat jen technicky: vždy technologie + lidé + organizace + data.',
    'U praxe pořád vracet odpověď na ERP proces, stakeholdery, role, odpovědnosti a měřitelný dopad.',
    'Když se ptá na teorii, dát definici a hned praktický příklad v organizaci.',
    'Když se ptá na AI nebo automatizaci, zdůraznit validaci, auditovatelnost, odpovědnost a limity.',
    'Když se ptá na metodologii, říct artefakt, evaluaci, omezení a další krok.',
  ],
  openings: [
    'Rozlišil bych technickou a sociální rovinu, protože u podnikového IS se nedají oddělit.',
    'Začal bych definicí a pak to převedu do kontextu ERP procesu a odpovědností v organizaci.',
    'Tady je důležité nebrat technologii jako automatické řešení; přínos vzniká až s procesní a organizační změnou.',
  ],
  traps: [
    'Neříkat: “ERP to vyřeší.” Říkat: ERP je nástroj, změna musí být organizačně ukotvená.',
    'Nezůstat u školní definice bez příkladu.',
    'Nepředstírat silnější evaluaci, než práce reálně má. Lepší je přesně říct limit.',
    'Neantropomorfizovat AI: model negeneruje pravdu, ale pravděpodobný text.',
  ],
}

export default function Komise() {
  const [member, setMember] = useState<MemberId | null>(null)
  const [activeQ, setActiveQ] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState<number | null>(null)

  if (!member) {
    return (
      <div className="page">
        <div className="page-title">Komise</div>
        <div className="page-subtitle">Procvičuj odpovědi v režimu konkrétního člena komise. Každý má jiný styl a jiné priority.</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
          {(Object.entries(MEMBERS) as [MemberId, typeof MEMBERS[MemberId]][]).map(([id, m]) => (
            <button key={id}
              onClick={() => { setMember(id); setActiveQ(null); setShowAnswer(null) }}
              style={{ flex: 1, padding: '22px 18px', border: `1px solid ${m.color}40`, borderRadius: 12, background: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'box-shadow 0.1s, border-color 0.1s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.boxShadow = `0 2px 12px ${m.color}20` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${m.color}40`; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: m.color + '1a', color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
                {m.name.split(' ')[1][0]}
              </div>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15, marginBottom: 8 }}>{m.name}</div>
              <div style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.55 }}>{m.style}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const m = MEMBERS[member]

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <button onClick={() => { setMember(null); setActiveQ(null); setShowAnswer(null) }}
          style={{ fontSize: 13, color: '#64748b', background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}>
          ← Zpět
        </button>
        <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: m.color + '1a', color: m.color }}>{m.name}</span>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${m.color}30`, borderLeft: `3px solid ${m.color}`, borderRadius: '0 8px 8px 0', padding: '14px 18px', marginBottom: 28, fontSize: 13.5, color: '#475569', lineHeight: 1.6 }}>
        {m.style}
      </div>

      {member === 'smutny' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 28 }}>
          <div style={{ background: '#fff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Osy odpovědi</div>
            {SMUTNY_BATTLE_PLAN.axes.map(line => <div key={line} style={{ fontSize: 12.5, color: '#334155', lineHeight: 1.45, marginBottom: 7 }}>• {line}</div>)}
          </div>
          <div style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Bezpečný start</div>
            {SMUTNY_BATTLE_PLAN.openings.map(line => <div key={line} style={{ fontSize: 12.5, color: '#334155', lineHeight: 1.45, marginBottom: 7 }}>• {line}</div>)}
          </div>
          <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Pasti</div>
            {SMUTNY_BATTLE_PLAN.traps.map(line => <div key={line} style={{ fontSize: 12.5, color: '#334155', lineHeight: 1.45, marginBottom: 7 }}>• {line}</div>)}
          </div>
        </div>
      )}

      <div className="section-label">Typické otázky</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {m.questions.map((q, i) => (
          <div key={i}>
            <button
              onClick={() => { setActiveQ(activeQ === i ? null : i); setShowAnswer(null) }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: activeQ === i ? m.color + '08' : '#fff', border: `1px solid ${activeQ === i ? m.color + '40' : '#e2e8f0'}`, borderRadius: activeQ === i ? '8px 8px 0 0' : 8, cursor: 'pointer', textAlign: 'left', transition: 'all 0.1s' }}>
              <span style={{ fontSize: 13.5, color: '#0f172a', fontWeight: activeQ === i ? 500 : 400 }}>{q.q}</span>
              <span style={{ color: '#94a3b8', fontSize: 14, marginLeft: 12, flexShrink: 0 }}>{activeQ === i ? '▲' : '▼'}</span>
            </button>
            {activeQ === i && (
              <div style={{ padding: '14px 16px', background: m.color + '06', border: `1px solid ${m.color}20`, borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
                <button
                  onClick={() => setShowAnswer(showAnswer === i ? null : i)}
                  style={{ fontSize: 12, color: '#1d4ed8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: showAnswer === i ? 10 : 0 }}>
                  {showAnswer === i ? '▲ Skrýt odpověď' : '▼ Vzorová odpověď'}
                </button>
                {showAnswer === i && (
                  <div style={{ padding: '12px 14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, fontSize: 13, color: '#1e3a8a', lineHeight: 1.65 }}>
                    {q.answer}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
