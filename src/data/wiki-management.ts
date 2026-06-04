import type { WikiEntry } from './wiki'

export const WIKI_MANAGEMENT: WikiEntry[] = [
  {
    id: 'informacni-management',
    title: 'Informační management',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['dikw-model', 'data-governance', 'cio', 'mcfarlan-grid', 'tco', 'it-governance'],
    body: `<p><strong>Informační management (IM)</strong> je multidisciplinární obor zabývající se řízením informačních zdrojů v organizaci s cílem podporovat rozhodování, realizaci strategie a tvorbu hodnoty. IM zahrnuje celý životní cyklus informací od jejich vzniku, zpracování, ukládání a distribuce až po likvidaci.</p>
<p>IM jako disciplína stojí na průsečíku managementu, informatiky a informační vědy. Klíčovými koncepty jsou <a href="#dikw-model">DIKW pyramida</a> (Data → Informace → Znalosti → Moudrost), řízení kvality informací (Information Quality Management) a správa informačních aktiv.</p>
<p>Strategický IM zahrnuje: IS/IT strategii a její sladění s podnikovou strategií (IT-Business Alignment), řízení IT portfolia (<a href="#it-portfolio">IT Portfolio Management</a>), hodnocení hodnoty IT investic (Business Case, TCO, ROI), <a href="#mcfarlan-grid">McFarlan Strategic Grid</a> pro klasifikaci IS portfolia a <a href="#nolan-model">Nolan Stage Model</a> pro pochopení stádia IT zralosti organizace.</p>
<p>Organizační zabezpečení IM: role <a href="#cio">CIO</a> (Chief Information Officer) jako strategického lídra IT, IT governance struktury a výbory, <a href="#data-governance">Data Governance</a> pro správu datových aktiv a <a href="#mdm">MDM</a> (Master Data Management) pro správu kmenových dat. Paradox produktivity IT (<a href="#solow-paradox">Solow paradox</a>) staví otázku, zda IT investice skutečně přinášejí měřitelnou produktivitu.</p>`,
  },
  {
    id: 'dikw-model',
    title: 'DIKW model',
    area: 'Informační management',
    subjects: ['4SA415', '4SA418'],
    related: ['data', 'informace', 'znalosti', 'informacni-management', 'knowledge-management'],
    body: `<p><strong>DIKW model</strong> (Data-Information-Knowledge-Wisdom pyramid) je hierarchický model popisující vztahy mezi daty, informacemi, znalostmi a moudrostí. Každá vyšší úroveň přidává kontext, interpretaci a hodnotu k podkladové vrstvě.</p>
<p>Čtyři úrovně DIKW:</p>
<ul>
  <li><strong><a href="#data">Data</a></strong> — surové, neinterpretované záznamy a symboly bez kontextu (čísla, textové řetězce, měření). Příklad: "42", "Praha", "2026-01-15".</li>
  <li><strong><a href="#informace">Informace</a></strong> — data v kontextu, která zodpovídají otázky "kdo, co, kde, kdy". Data + kontext + relevance = informace. Příklad: "Pobočka Praha vykázala 42 mil. Kč tržeb v Q1 2026".</li>
  <li><strong><a href="#znalosti">Znalosti</a></strong> — informace pochopené, integrované a aplikovatelné. Odpovídají "jak" a "proč". Znalost vzorců, kauzalit a principů. Příklad: "Tržby jsou nižší kvůli sezónnosti — leden je vždy slabý".</li>
  <li><strong>Moudrost (Wisdom)</strong> — schopnost aplikovat znalosti pro správná rozhodnutí za nejistoty. Odpovídá "co dělat". Příklad: strategické rozhodnutí o expanzi nebo restrukturalizaci.</li>
</ul>
<p>DIKW se kritizuje za zjednodušenost — přechody nejsou vždy lineární a "wisdom" je obtížně definovatelná. Přesto je model cenným pedagogickým nástrojem pro pochopení informační hierarchie v organizaci.</p>`,
  },
  {
    id: 'data',
    title: 'Data',
    area: 'Informační management',
    subjects: ['4SA415'],
    parentId: 'dikw-model',
    related: ['dikw-model', 'informace', 'znalosti', 'master-data', 'mdm', 'data-governance'],
    body: `<p><strong>Data</strong> jsou surové, neinterpretované záznamy, symboly nebo měření bez inherentního kontextu nebo významu. Data jsou základní stavební kamen <a href="#dikw-model">DIKW pyramidy</a> a klíčové aktivum každé organizace v digitální ekonomice.</p>
<p>Typy dat: <em>Strukturovaná data</em> — organizovaná v definovaném formátu (databázové tabulky, CSV, XML, JSON). Snadno zpracovatelná stroji. <em>Nestrukturovaná data</em> — text (e-maily, dokumenty), obrázky, video, audio — tvoří 80–90 % podnikových dat, obtížně zpracovatelná bez AI/ML. <em>Semistrukturovaná data</em> — mají definovanou strukturu ale neodpovídají relačnímu modelu (XML se schématem, JSON).</p>
<p>Data quality dimenze: Accuracy (přesnost), Completeness (úplnost), Consistency (konzistence napříč systémy), Timeliness (aktuálnost), Uniqueness (bez duplikátů), Validity (v souladu se schématem a obchodními pravidly). <a href="#mdm">MDM</a> a <a href="#data-governance">Data Governance</a> jsou klíčové procesy pro zajištění kvality dat.</p>
<p>Moderní datové architektury: Data Warehouse (strukturovaná analytická data, OLAP), Data Lake (surová data v nativním formátu), Data Lakehouse (kombinace), Data Mesh (decentralizovaná správa doménových dat). Datové platformy: Snowflake, Databricks, Google BigQuery, Microsoft Fabric.</p>`,
  },
  {
    id: 'informace',
    title: 'Informace',
    area: 'Informační management',
    subjects: ['4SA415', '4SA418'],
    parentId: 'dikw-model',
    related: ['dikw-model', 'data', 'znalosti', 'informacni-management'],
    body: `<p><strong>Informace</strong> jsou <a href="#data">data</a> obohacená o kontext, relevanci a účel, čímž nabývají schopnosti ovlivnit rozhodování příjemce. Informace zodpovídají otázky "Kdo?", "Co?", "Kde?", "Kdy?". Shannon (1948) definoval informaci matematicky jako míru snížení nejistoty.</p>
<p>Vlastnosti hodnotné informace: <em>Relevance</em> (vztahuje se k rozhodnutí), <em>Přesnost</em> (odpovídá skutečnosti), <em>Úplnost</em> (neobsahuje podstatné mezery), <em>Aktuálnost</em> (není zastaralá), <em>Dostupnost</em> (přístupná tomu, kdo ji potřebuje v pravý čas), <em>Srozumitelnost</em> (pochopitelná příjemcem).</p>
<p>Informace jako aktivum: na rozdíl od fyzických aktiv se informace nespotřebovávají použitím, mohou být sdíleny bez ztráty původní hodnoty (non-rival) a jejich hodnota závisí na kontextu a příjemci. Ochrana informací jako aktiva je cílem <a href="#isms">ISMS</a> — <a href="#cia-triada">CIA triáda</a> definuje klíčové vlastnosti, které musí být chráněny.</p>
<p>Shannonova informační teorie: informace je měřena v bitech, entropie je mírou nejistoty v zdroji zpráv. Čím méně pravděpodobná událost, tím více informace přenáší. Tento matematický základ je základem kódování a komprese dat (Huffmanovo kódování, LZW).</p>`,
  },
  {
    id: 'znalosti',
    title: 'Znalosti',
    area: 'Informační management',
    subjects: ['4SA415', '4SA418'],
    parentId: 'dikw-model',
    related: ['dikw-model', 'data', 'informace', 'tacit-knowledge', 'explicit-knowledge', 'seci-model', 'knowledge-management'],
    body: `<p><strong>Znalosti</strong> jsou <a href="#informace">informace</a> pochopené, integrované do mentálních modelů a aplikovatelné pro řešení problémů. Na rozdíl od informací jsou znalosti vázány na znalostního nositele (osobu nebo organizaci) a vycházejí z zkušeností, kontextu a interpretace.</p>
<p>Klíčové rozlišení dle Nonaky a Takeuchie: <a href="#tacit-knowledge">Tacit knowledge</a> (tacitní/mlčenlivé znalosti) — osobní, kontextuální, obtížně artikulovatelné (know-how, intuice, dovednosti, mentální modely). <a href="#explicit-knowledge">Explicit knowledge</a> (explicitní znalosti) — kodifikovatelné, přenositelné (dokumenty, manuály, databáze).</p>
<p>Organizační znalosti jsou kritickým konkurenčním aktivem — jejich správa je cílem <a href="#knowledge-management">Knowledge Managementu</a>. Ztráta klíčového zaměstnance může znamenat ztrátu kritického know-how (Brain Drain). <a href="#seci-model">SECI model</a> popisuje spirálu tvorby a přenosu znalostí v organizaci.</p>
<p>Znalostní ekonomika: Peter Drucker identifikoval "knowledge workers" (znalostní pracovníci) jako klíčový výrobní faktor postindustriální ekonomiky. Řízení znalostního kapitálu (Intellectual Capital Management) zahrnuje Human Capital, Structural Capital a Relational Capital.</p>`,
  },
  {
    id: 'master-data',
    title: 'Master Data',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['mdm', 'data-governance', 'data', 'erp', 'sap'],
    body: `<p><strong>Master Data</strong> (kmenová data) jsou klíčová, sdílená data o podnikových entitách — zákaznících, dodavatelích, produktech, zaměstnancích, obchodních partnerech — která jsou konzistentně používána napříč podnikovými systémy a procesy. Master data jsou "zlatý zdroj pravdy" pro transakční systémy.</p>
<p>Charakteristiky master dat: vysoká obchodní hodnota, sdílené napříč systémy (ERP, CRM, SCM, BI), relativně stabilní (mění se méně než transakční data), vyžadují governance a ownership. Příklady: zákazník (jméno, adresa, daňové ID, platební podmínky), produkt (číslo, popis, cena, sazba DPH), dodavatel.</p>
<p>Problémy bez MDM: duplicitní záznamy (stejný zákazník v systémech 10×, každý trochu jinak), nekonzistentní data (adresa zákazníka v CRM se liší od ERP), siloování dat (každé oddělení má "svou" verzi zákazníka). Tyto problémy způsobují chybné reporty, špatné zákaznické zkušenosti a compliance problémy.</p>
<p>Správa master dat: <a href="#mdm">MDM</a> (Master Data Management) definuje procesy a technologie pro správu kmenových dat. <a href="#sap">SAP</a> pracuje s master daty jako Material Master, Customer Master, Vendor Master — jejich kvalita je kritická pro hladký chod procesů P2P, O2C a R2R.</p>`,
  },
  {
    id: 'mdm',
    title: 'MDM — Master Data Management',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['master-data', 'data-governance', 'data', 'erp'],
    body: `<p><strong>MDM</strong> (Master Data Management) jsou procesy, governance struktury a technologie pro vytváření, udržování a distribuci konzistentních, přesných a aktuálních <a href="#master-data">master dat</a> napříč organizací. MDM je základním předpokladem pro spolehlivou podnikovou analytiku a integraci systémů.</p>
<p>MDM architektonické styly: <em>Registry style</em> — MDM hub udržuje reference na záznamy v source systémech. <em>Consolidation style</em> — MDM hub sbírá data ze source systémů, čistí je a vytváří konsolidovaný pohled (read-only). <em>Co-existence style</em> — MDM hub a source systémy sdílejí záznamy synchronizací. <em>Centralized/Transaction Hub</em> — všechna transakce probíhají přes MDM hub jako System of Record.</p>
<p>MDM technologie: Informatica MDM, ERP MDG (Master Data Governance), IBM InfoSphere MDM, Reltio, Semarchy. Tyto platformy poskytují workflow pro schvalování dat, merge/survivorship logiku pro deduplikaci, data quality pravidla a datové integrace.</p>
<p>MDM governance: Data Owner (biznis zodpovídá za definici a kvalitu entity), Data Steward (operativní správa záznamu, validace, čištění), Data Custodian (IT zodpovídá za infrastrukturu a bezpečnost). Tyto role jsou formálně definovány v rámci <a href="#data-governance">Data Governance</a> frameworku.</p>`,
  },
  {
    id: 'data-governance',
    title: 'Data Governance',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['mdm', 'master-data', 'data', 'informacni-management', 'cio'],
    body: `<p><strong>Data Governance</strong> je systém rozhodovacích práv, odpovědností a procesů pro správu datových aktiv v organizaci. Data Governance zajišťuje, že data jsou dostupná, použitelná, integritní a bezpečná — a definuje, kdo může co dělat s jakými daty.</p>
<p>Klíčové komponenty Data Governance: <em>Data Strategy</em> — celková strategie pro datová aktiva. <em>Data Policies &amp; Standards</em> — pravidla pro definici, kvalitu, klasifikaci a bezpečnost dat. <em>Data Ownership</em> — přiřazení zodpovědnosti za datové domény biznis vlastníkům. <em>Data Stewardship</em> — operativní správa kvality dat. <em>Data Catalog</em> — inventář datových aktiv, metadat a datových toků (lineage). <em>Data Quality Management</em> — monitoring a zlepšování kvality dat.</p>
<p>Frameworks pro Data Governance: DAMA DMBOK (Data Management Body of Knowledge) — komplexní standard pro správu dat ve všech aspektech. DCAM (Data Management Capability Assessment Model). EDM Council CDMC (Cloud Data Management Capabilities).</p>
<p>Regulatorní driver: GDPR vyžaduje znát, kde a jak jsou zpracovávána osobní data — bez Data Governance a Data Lineage je GDPR compliance nemožná. SOX vyžaduje integritu finančních dat — Data Governance zajišťuje, že report je vysledovatelný k zdroji. NIS2 zavádí požadavky na bezpečnost datových aktiv.</p>`,
  },
  {
    id: 'tco',
    title: 'TCO — Total Cost of Ownership',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['informacni-management', 'it-portfolio', 'solow-paradox', 'erp'],
    body: `<p><strong>TCO</strong> (Total Cost of Ownership, celkové náklady vlastnictví) je finanční model pro hodnocení úplných přímých i nepřímých nákladů spojených s pořízením a provozem IT systému nebo technologie po celou dobu její životnosti. TCO překonává omezení pohledu na pouhou pořizovací cenu.</p>
<p>Komponenty TCO pro IT systém: <em>Přímé náklady</em> — hardware (pořízení, odpisy), software (licence, maintenance), implementace (konzultanti, interní pracovníci, customizace), školení, infrastruktura (DC, síť, zálohy). <em>Nepřímé náklady</em> — ztráta produktivity během implementace, interní podpora a help desk, upgrade a migrace náklady, downtime náklady, náklady na odchod (exit costs) při ukončení.</p>
<p>TCO je standardním nástrojem pro business case IT investic — umožňuje porovnání alternativ (vlastní provoz vs. cloud, build vs. buy). Gartner zavedl TCO framework pro IT v 80. letech a upozornil, že pořizovací cena typicky představuje pouze 20–30 % celkových TCO.</p>
<p>Vs. ROI (Return on Investment): TCO měří náklady, ROI měří přínosy a výnosnost. Business case IT projektu kombinuje TCO (náklady) s quantifikovanými přínosy (revenue, cost savings, risk reduction) pro výpočet NPV (Net Present Value) nebo doby návratnosti. <a href="#solow-paradox">Solow paradox</a> zpochybňuje, zda IT přínosy vůbec lze spolehlivě změřit.</p>`,
  },
  {
    id: 'solow-paradox',
    title: 'Solow paradox produktivity IT',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['informacni-management', 'tco', 'mcfarlan-grid', 'bsc'],
    body: `<p><strong>Solow paradox</strong> (paradox produktivity IT) je pozorování ekonoma Roberta Solowa z roku 1987: "Počítačový věk vidíme všude, jen ne ve statistikách produktivity." Navzdory masivním IT investicím nebylo po dlouhou dobu možné statisticky prokázat odpovídající nárůst produktivity práce.</p>
<p>Možná vysvětlení paradoxu: <em>Measurement lag</em> — přínosy IT se projeví s časovým zpožděním (restrukturalizace procesů, adopce, učení). <em>Redistribution effect</em> — IT zvyšuje produktivitu, ale jen přesunuje tržní podíly (wín firmy ztrácí konkurenti). <em>Learning curve</em> — než organizace umí IT efektivně využívat, trvá to roky. <em>Measurement problem</em> — HDP metriky nedokáží zachytit IT přínosy (zlepšení kvality, rychlosti, zákaznické zkušenosti). <em>Mismanagement</em> — špatně zaměřené IT projekty, neshoda mezi IT a byznys potřebami.</em></p>
<p>Pozdější ekonomické studie (Erik Brynjolfsson, MIT, 1990s–2000s) prokázaly, že IT investice skutečně zvyšují produktivitu — ale s podmínkou: musí být doprovázeny organizačními změnami (reengineering procesů), investicemi do lidí a správnou IT strategií. Pouhá IT investice bez změny procesů nepřináší produktivitu.</p>
<p>Implikace pro IM: IT hodnota nespočívá v technologii samotné, ale v kombinaci technologie + procesy + lidé + organizace. <a href="#strategy-map">Strategy Map</a> a <a href="#bsc">BSC</a> jsou nástroje, které tuto logiku vizualizují a sledují.</p>`,
  },
  {
    id: 'mcfarlan-grid',
    title: 'McFarlan Strategic Grid',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['informacni-management', 'it-portfolio', 'nolan-model', 'tco'],
    body: `<p><strong>McFarlan Strategic Grid</strong> (1983) je matice pro klasifikaci podnikových IS/IT do čtyř kvadrantů dle jejich strategického dopadu na podnik a závislosti podniku na nich. Pomáhá CIO a businessu prioritizovat IT portfolio a nastavit správný governance přístup.</p>
<p>Dvě dimenze: <em>Strategický dopad existujících systémů</em> (jak kriticky závisí provoz na stávajícím IT) a <em>Strategický dopad plánovaných systémů</em> (jak moc mohou nové IT projekty přispět ke strategickým cílům).</p>
<p>Čtyři kvadranty:</p>
<ul>
  <li><strong>Support</strong> (nízký/nízký) — IT nepodporuje strategii ani operativu kriticky; can outsource. Příklady: HR payroll, účetnictví.</li>
  <li><strong>Factory</strong> (vysoký/nízký) — kritické pro provoz, ale nestrategické; IT musí být spolehlivé, reliability focus. Příklady: rezervační systémy v letecké dopravě.</li>
  <li><strong>Turnaround</strong> (nízký/vysoký) — aktuálně nekritické, ale nové IT může přinést strategický průlom; innovation focus. Příklady: AI customer analytics, IoT monitoring.</li>
  <li><strong>Strategic</strong> (vysoký/vysoký) — IT je kritické pro provoz i pro strategické cíle; IT leadership top management. Příklady: online banking, e-commerce platformy.</li>
</ul>
<p>Podnik musí mít jasno, v jakém kvadrantu se nachází pro každý systém — to určuje, kolik governance pozornosti a investic je třeba věnovat. Grid se v čase mění: Factory může přejít do Strategic při digitální transformaci.</p>`,
  },
  {
    id: 'nolan-model',
    title: 'Nolan Stage Model',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['informacni-management', 'mcfarlan-grid', 'cio'],
    body: `<p><strong>Nolan Stage Model</strong> (Richard Nolan, 1974, rozšířen 1979) je model šesti stádií vývoje IT v organizaci. Model popisuje, jak organizace postupně dospívají v IT využití a governance od chaotické adopce k formálnímu řízení a strategickému partnerství.</p>
<p>Šest stádií Nolan Stage Modelu:</p>
<ol>
  <li><strong>Initiation</strong> — první počítače, nízké náklady, entuziasté, žádná koordinace</li>
  <li><strong>Contagion</strong> — rychlé rozšiřování aplikací, nadšení bez governance, rostoucí náklady</li>
  <li><strong>Control</strong> — management reaguje na chaotický růst; formální plánování, rozpočtová kontrola, centralizace</li>
  <li><strong>Integration</strong> — propojování systémů, uživatelé zapojeni do IS plánování, databázové technologie</li>
  <li><strong>Data Administration</strong> — informace jako korporátní zdroj, data management, enterprise-wide systems</li>
  <li><strong>Maturity</strong> — IT plně integrované do business strategie, IT a business management partnerství</li>
</ol>
<p>Kritika: Model je deterministický (předpokládá lineární progres), nezohledňuje organizační kontext a strategii. Novější IT waves (cloud, mobile, AI) nezapadají do původního modelu. Přesto je model cenný pro pochopení, proč organizace v různých stádiích reagují na IT odlišně — nelze přeskočit stádia bez organizačního učení.</p>`,
  },
  {
    id: 'cio',
    title: 'CIO — Chief Information Officer',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['ciso', 'informacni-management', 'it-governance', 'it-portfolio', 'mcfarlan-grid'],
    body: `<p><strong>CIO</strong> (Chief Information Officer) je vedoucí manažer odpovědný za strategii, řízení a provoz informačních systémů a IT v organizaci. Role CIO se transformovala od technického manažera k strategickému business partnerovi — CIO dnes sedí u stolu s CEO, CFO a CMO.</p>
<p>Odpovědnosti CIO: IT strategie a její sladění s podnikovou strategií (IT-Business Alignment), řízení IT portfolia a projektů, řízení IT dodavatelů a smluv, správa IT rozpočtu (CAPEX i OPEX), <a href="#it-governance">IT Governance</a> (politiky, procesy, risk management), a digitální transformace jako strategický program. CIO reportuje typicky CEO nebo CFO.</p>
<p>Typy CIO dle orientace: <em>IT-focused CIO</em> — technický expert, systémy a operace v centru pozornosti. <em>Business-focused CIO</em> — strategický partner, IT jako enabler business value. <em>Transformational CIO</em> — leader digitální transformace, inovace a nové business modely. Moderní organizace potřebuje transformational CIO.</p>
<p>Vztah CIO–<a href="#ciso">CISO</a>: Stále častěji se CISO odtrhuje od CIO a reportuje přímo CEO nebo boardu — kybernetická bezpečnost je příliš kritická na to, aby byla podřízena "provoznímu" CIO. V malých organizacích jedna osoba zastává obě role (CIO/CISO).</p>`,
  },
  {
    id: 'ciso',
    title: 'CISO — Chief Information Security Officer',
    area: 'Bezpečnost',
    subjects: ['4SA415', '4SA515'],
    related: ['cio', 'isms', 'it-governance', 'nukib', 'nis2'],
    body: `<p><strong>CISO</strong> (Chief Information Security Officer) je vedoucí manažer odpovědný za strategii, programy a provoz informační bezpečnosti v organizaci. CISO odpovídá za ochranu informačních aktiv před kybernetickými hrozbami, zajišťuje soulad s regulatorními požadavky (<a href="#nis2">NIS2</a>, <a href="#dora">DORA</a>, GDPR) a řídí bezpečnostní rizika.</p>
<p>Odpovědnosti CISO: Information Security Strategy, <a href="#isms">ISMS</a> implementace a certifikace (<a href="#iso-27001">ISO 27001</a>), řízení kybernetických rizik, incident response a <a href="#csirt">CSIRT</a> koordinace, bezpečnostní compliance, security awareness programy, vendor security management, reportování boardu/vedení.</p>
<p>Organizační zařazení CISO: CISO může reportovat CIO (tradiční model — riziko konfliktu zájmů: CIO potřebuje dodat projekty, CISO může brzdit z bezpečnostních důvodů), CEO (nezávislost od IT), nebo Legal/Compliance (důraz na regulatorní shodu). <a href="#nis2">NIS2</a> de facto vyžaduje, aby odpovědnost za bezpečnost byla na úrovni vedení organizace.</p>
<p>Certifikace relevantní pro CISO: CISM (<a href="#isaca">ISACA</a> — Certified Information Security Manager), CISSP (ISC2 — Certified Information Systems Security Professional), ISO 27001 Lead Implementer/Lead Auditor.</p>`,
  },
  {
    id: 'it-portfolio',
    title: 'IT Portfolio Management',
    area: 'Informační management',
    subjects: ['4SA415'],
    related: ['informacni-management', 'mcfarlan-grid', 'cio', 'tco', 'bsc'],
    body: `<p><strong>IT Portfolio Management</strong> je systematický přístup ke správě kolekce IT projektů, programů, systémů a investic jako portfolio aktiv — s cílem optimalizovat celkovou hodnotu, riziko a strategické sladění IT portfolia s podnikovými prioritami.</p>
<p>Tři kategorie IT portfolia: <em>Run</em> (provoz stávajících systémů — OPEX, nezbytné), <em>Grow</em> (rozvoj a zlepšování existujících systémů — CAPEX, inkrementální), <em>Transform</em> (inovativní projekty pro nové schopnosti — CAPEX, strategické). Optimální distribuce Run/Grow/Transform závisí na sektoru a strategii.</p>
<p>Portfolio rozhodování: každý systém nebo projekt je hodnocen dle přínosů (financial ROI, strategic value), nákladů (<a href="#tco">TCO</a>), rizik (technical risk, business risk) a urgence. Výsledkem je prioritizovaný portfolio plán — které projekty dostat do roadmap a které odložit nebo zrušit.</p>
<p><a href="#mcfarlan-grid">McFarlan Grid</a> je standardní nástroj pro kategorizaci IT portfolia. IT Portfolio Review je typicky čtvrtletní governance aktivita s IT Steering Committee — přezkum statusu, přehodnocení priorit, reallokace zdrojů. Bez Portfolio Managementu hrozí "projekt zoo" — desítky projektů bez strategické logiky, každý čerpá zdroje bez výsledků.</p>`,
  },
  {
    id: 'bpm',
    title: 'BPM — Business Process Management',
    area: 'Procesní řízení',
    subjects: ['4SA415', '4SA418'],
    related: ['bpmn', 'epc', 'erp', 'rpa', 'it-governance'],
    body: `<p><strong>BPM</strong> (Business Process Management) je systematický přístup k identifikaci, dokumentaci, analýze, měření, optimalizaci a automatizaci podnikových procesů. BPM kombinuje metody managementu s IT nástroji pro kontinuální zlepšování procesní výkonnosti.</p>
<p>BPM životní cyklus: <em>Identifikace</em> (které procesy existují, process landscape) → <em>Odkrytí/Discovery</em> (dokumentace aktuálního stavu — as-is) → <em>Analýza</em> (identifikace neefektivit, bottlenecků, non-value-added aktivit) → <em>Redesign/Optimalizace</em> (návrh to-be procesu) → <em>Implementace</em> (nasazení — lidé, IT, pravidla) → <em>Monitoring a řízení</em> (KPI sledování) → <em>Zpět k odkrytí</em> (kontinuální cyklus).</p>
<p>BPM nástroje: <em>Notace</em> — <a href="#bpmn">BPMN</a> (Business Process Model and Notation) pro standardizovanou vizualizaci procesů, <a href="#epc">EPC</a> (Event-driven Process Chain) pro ERP procesy. <em>BPMS (BPM Suite)</em> — platformy pro modelování, automatizaci a monitoring procesů (Bizagi, Appian, Pega, Camunda). <em>Process Mining</em> — automatické odhalování skutečného průběhu procesů z event logů (Celonis, UiPath Process Mining).</p>
<p>BPM vs. BPR: BPR (Business Process Reengineering — Hammer &amp; Champy) je radikální redesign procesů "od nuly". BPM je kontinuální, inkrementální přístup. Obě metodologie jsou stále relevantní — BPR pro transformativní změny, BPM pro kontinuální zlepšování.</p>`,
  },
  {
    id: 'bpmn',
    title: 'BPMN — Business Process Model and Notation',
    area: 'Procesní řízení',
    subjects: ['4SA415', '4SA418'],
    related: ['bpm', 'epc', 'erp'],
    body: `<p><strong>BPMN</strong> (Business Process Model and Notation) je standardizovaná grafická notace pro modelování podnikových procesů vydávaná OMG (Object Management Group). BPMN 2.0 (2011) je aktuální verze a de facto standard pro dokumentaci a analýzu procesů.</p>
<p>Základní BPMN elementy:</p>
<ul>
  <li><strong>Flow Objects</strong> — <em>Events</em> (Start/Intermediate/End — kruhy), <em>Activities</em> (Tasks, Sub-processes — zaoblené obdélníky), <em>Gateways</em> (XOR, AND, OR — kosočtverce)</li>
  <li><strong>Connecting Objects</strong> — Sequence Flow (šipky řídící tok), Message Flow (přerušovaná šipka — komunikace mezi pooly), Association (tečkovaná šipka — propojení s artefakty)</li>
  <li><strong>Swimlanes</strong> — Pool (celý proces, jedna organizace), Lane (role nebo oddělení uvnitř poolu)</li>
  <li><strong>Artefakty</strong> — Data Objects, Data Stores, Annotations</li>
</ul>
<p>BPMN umožňuje modelování na různých úrovních detailu: od <em>Descriptive</em> (přehledový diagram pro komunikaci s businessem) přes <em>Analytic</em> (pro process analýzu) až po <em>Executable BPMN</em> (strojově spustitelný proces v BPMS). Nástroje: Bizagi Modeler, Camunda Modeler, Signavio, Lucidchart, draw.io.</p>
<p>BPMN vs. <a href="#epc">EPC</a>: EPC je starší ERP-orientovaná notace (ARIS framework), používá Events a Functions střídavě. BPMN je flexibilnější, bohatší a lépe standardizovaná — pro nové projekty je BPMN preferována. Mnohé organizace migrují z EPC na BPMN.</p>`,
  },
  {
    id: 'epc',
    title: 'EPC — Event-driven Process Chain',
    area: 'Procesní řízení',
    subjects: ['4SA415', '4SA418'],
    related: ['bpmn', 'bpm', 'erp', 'sap'],
    body: `<p><strong>EPC</strong> (Event-driven Process Chain) je grafická notace pro modelování procesů vyvinutá Augustem Wilhelmem Scheером v rámci ARIS (Architecture of Integrated Information Systems) frameworku na počátku 90. let. EPC je spjata se ERP — ERP Reference Model (ERP Best Practices) je zdokumentován právě v EPC notaci.</p>
<p>Základní EPC elementy:</p>
<ul>
  <li><strong>Event (Událost)</strong> — šestiúhelník, popisuje stav systému nebo prostředí (spouštěč nebo výsledek). Procesy vždy začínají a končí událostí.</li>
  <li><strong>Function (Funkce)</strong> — zaoblený obdélník, popisuje aktivitu nebo transformaci</li>
  <li><strong>Logical connectors</strong> — AND (∧), OR (∨), XOR (⊕) pro větvení a slučování toků</li>
  <li><strong>Process Path (šipka)</strong> — řídí tok procesu</li>
  <li><strong>Organizational Unit, IT System, Information Object</strong> — přiřazeny k funkcím</li>
</ul>
<p>Klíčové pravidlo EPC: Events a Functions se musí střídat. Po Event vždy následuje Function, po Function vždy Event. Logical connectors mohou být mezi nimi. Toto pravidlo odlišuje EPC od BPMN, kde aktivita může bezprostředně navazovat na aktivitu.</p>
<p>ARIS framework (Scheer) strukturuje podnikovou architekturu do pěti pohledů: Organization View, Function View, Data View, Control View (proces = integrace ostatních pohledů), Performance View. EPC je primárně notací Control View.</p>`,
  },
  {
    id: 'erp',
    title: 'ERP systémy',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['sap', 'sap-s4hana', 'sap-activate', 'fit-gap', 'ricefw', 'bpmn', 'master-data'],
    body: `<p><strong>ERP</strong> (Enterprise Resource Planning) systémy jsou integrované podnikové informační systémy, které v jedné platformě integrují klíčové podnikové procesy: financ a controlling, nákup, výroba, prodej, HR, logistika, projektové řízení. ERP nahrazuje fragmentovaná oddělená řešení a vytváří "single source of truth".</p>
<p>Klíčové charakteristiky ERP: <em>Integrace</em> — sdílená databáze eliminuje duplikaci dat a zaručuje konzistenci. <em>Standardizace procesů</em> — ERP systémy vycházejí z best-practice procesních šablon (ERP Best Content, Oracle Business Flows). <em>Real-time data</em> — okamžité zrcadlení transakcí do finančních výkazů. <em>Modulárnost</em> — implementace po modulech (FI, CO, MM, SD, PP, HCM, PM...).</p>
<p>Přední ERP systémy: <a href="#sap">SAP</a> S/4HANA (globální enterprise standard), Oracle ERP Cloud, Microsoft Dynamics 365, Infor, Epicor. Na SME trhu: ERP Business One, Odoo, Sage. Každý ERP je přizpůsobován pomocí <a href="#fit-gap">Fit/Gap analýzy</a> — kde standardní funkce pokrývají potřeby (fit) a kde je třeba přizpůsobení (<a href="#ricefw">RICEFW</a>).</p>
<p>Rizika ERP implementace: vysoké náklady a délka projektu, organisational change management (uživatelé musí změnit procesy), data migration quality, over-customization (snižuje maintainability), Big Bang vs. phased rollout rozhodnutí. 70 % ERP projektů překračuje rozpočet nebo termíny.</p>`,
  },
  {
    id: 'sap',
    title: 'SAP',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    parentId: 'erp',
    related: ['erp', 'sap-s4hana', 'sap-activate', 'fit-gap', 'ricefw', 'epc', 'master-data'],
    body: `<p><strong>SAP</strong> (Systems, Applications and Products in Data Processing) je německá softwarová společnost (Walldorf, 1972) a světový lídr v oblasti ERP softwaru. ERP R/3 (1992) revolucionalizoval podnikové informační systémy přechodem na client-server architekturu. Dnes ERP provozují tisíce organizací po celém světě.</p>
<p>ERP modulová architektura: <em>Finance</em> — FI (Finanční účetnictví), CO (Controlling/Manažerské účetnictví). <em>Logistika</em> — MM (Materials Management, P2P proces), SD (Sales &amp; Distribution, O2C proces), PP (Production Planning), WM/EWM (Warehouse Management). <em>HR</em> — HCM/SF (SuccessFactors). <em>Cross-module</em> — PM (Plant Maintenance), PS (Project System), QM (Quality Management).</p>
<p>ERP architektura: <em>ABAP</em> (Advanced Business Application Programming) — proprietární ERP programovací jazyk pro customizace a reports. <em>Basis/BC</em> — technická vrstva ERP (správa systému, transporty, autorizace). <em>NetWeaver</em> — technologická platforma ERP. <em>HANA</em> — in-memory databázová technologie ERP.</p>
<p>ERP přechod na cloud: <a href="#sap-s4hana">moderním ERP</a> nahrazuje legacy klasickém on-premise ERP. ERP BTP (Business Technology Platform) — low-code/no-code, API, integration, analytics. ERP RISE — "ERP as a Service" přesun zákazníků do cloudu. ERP plánuje ukončení mainstream maintenance pro ECC v roce 2027.</p>`,
  },
  {
    id: 'sap-s4hana',
    title: 'moderním ERP',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    parentId: 'sap',
    related: ['sap', 'erp', 'sap-activate', 'fit-gap'],
    body: `<p><strong>moderním ERP</strong> (Simple Suite for HANA) je aktuální generace ERP ERP platformy, postavená nativně na <a href="#sap">SAP</a> HANA in-memory databáze. S/4HANA přináší zjednodušený datový model (Universal Journal místo separate FI a CO tabulek), redesignované UI (ERP Fiori — role-based, web-based, mobilní) a nové funkce využívající real-time analytiku.</p>
<p>Klíčové inovace S/4HANA oproti ECC: <em>Universal Journal (ACDOCA)</em> — finanční a controlling data v jedné tabulce, eliminuje dřívější reconciliační problémy. <em>Simplified data model</em> — redukce počtu tabulek, agregátů (BSEG nahrazen BKPF+BSEG). <em>Fiori UX</em> — moderne, responsive UI nahrazující ERPGUI. <em>Embedded Analytics</em> — CDS Views a HANA views pro real-time reporting bez separátní BW vrstvy.</p>
<p>Deployment varianty: <em>On-premise</em> (S/4HANA na vlastní infrastruktuře), <em>Cloud (Public Edition)</em> — standardizovaný SaaS, minimální customizace, quarterly releases, <em>Private Cloud</em> — vlastní instance v ERP cloudu (RISE), flexibilnější. Migrace z ECC na S/4HANA je komplexní projekt vyžadující <a href="#fit-gap">Fit/Gap analýzu</a> a <a href="#sap-activate">ERP Activate</a> metodologii.</p>
<p>Výzvy migrace na S/4HANA: custom ABAP kód musí být adaptován na nový datový model, integrace s non-ERP systémy, data migration (legacy data quality), organizační change management, vysoké náklady.</p>`,
  },
  {
    id: 'sap-activate',
    title: 'ERP Activate',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['sap', 'sap-s4hana', 'erp', 'prince2', 'pmbok', 'fit-gap'],
    body: `<p><strong>ERP Activate</strong> je implementační metodologie pro <a href="#sap">SAP</a> projekty, zejména S/4HANA. Kombinuje agilní přístupy (Scrum sprinty) s ERP Best Practices (ready-to-use procesní šablony) a ERP Cloud ALM (Application Lifecycle Management) pro projektové řízení. ERP Activate nahradila starší AERP metodologii.</p>
<p>ERP Activate fáze: <em>Discover</em> (trial/sandbox, business case) → <em>Prepare</em> (projektové plánování, fit-to-standard workshop příprava) → <em>Explore</em> (Fit-to-Standard workshops — porovnání ERP Best Practices s business požadavky, <a href="#fit-gap">Fit/Gap analýza</a>, delta requirements) → <em>Realize</em> (konfigurace, development, unit testing, integrace, data migration) → <em>Deploy</em> (UAT, cutover plánování, Go-Live) → <em>Run</em> (hypercare, stabilizace, BAU).</p>
<p>ERP Best Practices jsou předkonfigurované šablony procesů (workflow, formuláře, reporty) pro různé industrie. Fit-to-standard přístup znamená: nejprve maximálně využít ERP standard, customizovat pouze tam, kde existují skutečné business rozdíly. Snižuje TCO a upgrade komplexitu.</p>
<p>ERP Activate vs. <a href="#prince2">PRINCE2</a>/<a href="#pmbok">PMBOK</a>: ERP Activate je ERP-specifická metodologie, nikoliv universální PM framework. V praxi se používají společně — ERP Activate definuje procesní kroky implementace, PRINCE2/PMBOK definuje governance, risk management a projektové řízení kolem nich.</p>`,
  },
  {
    id: 'prince2',
    title: 'PRINCE2',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['pmbok', 'pmo', 'evm', 'sap-activate'],
    body: `<p><strong>PRINCE2</strong> (Projects IN Controlled Environments) je procesně orientovaná metodologie projektového řízení vydávaná Axelos. Původně vyvinuta britskou vládou, dnes je standardem zejména v Evropě a veřejném sektoru. PRINCE2 definuje principy, témata a procesy pro řízení projektů.</p>
<p>Sedm PRINCE2 principů: Continued Business Justification (business case musí být platný po celý projekt), Learn from Experience, Defined Roles and Responsibilities, Manage by Stages (projekt rozdělen na management stages), Manage by Exception (delegování s tolerancemi), Focus on Products (product-based planning), Tailor to Suit the Project.</p>
<p>Sedm PRINCE2 témat: Business Case, Organization (Project Board, Project Manager, Team Manager), Quality, Plans, Risk, Change, Progress. Sedm PRINCE2 procesů: Starting Up a Project, Initiating a Project, Directing a Project, Controlling a Stage, Managing Product Delivery, Managing a Stage Boundary, Closing a Project.</p>
<p>PRINCE2 vs. <a href="#pmbok">PMBOK</a>: PRINCE2 je metodologie (prescriptive — říká jak řídit projekt), PMBOK je guide/standard (descriptive — popisuje znalosti PM oboru). V praxi se kombinují — PMBOK pro komplexní znalostní základ, PRINCE2 pro konkrétní governance struktury. PRINCE2 Agile rozšiřuje metodologii o agilní přístupy.</p>`,
  },
  {
    id: 'pmbok',
    title: 'PMBOK',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['prince2', 'pmo', 'evm', 'sap-activate'],
    body: `<p><strong>PMBOK</strong> (Project Management Body of Knowledge) je standard pro projektové řízení vydávaný PMI (Project Management Institute). 7. vydání (2021) přešlo od procesně orientovaného přístupu k principiálnímu — 12 principů a 8 výkonnostních domén nahradilo 49 procesů předchozích vydání.</p>
<p>12 PMBOK principů (7. vydání): Stewardship (zodpovědné vedení), Team (kolaborace), Stakeholders (zapojení), Value (zaměření na hodnotu), Systems Thinking (systémové myšlení), Leadership, Tailoring (přizpůsobení), Quality, Complexity, Risk, Adaptability and Resiliency, Change Management.</p>
<p>8 výkonnostních domén: Stakeholders, Team, Development Approach &amp; Life Cycle, Planning, Project Work, Delivery, Measurement, Uncertainty. PMBOK 7 je agnostický vůči delivery přístupu — pokrývá prediktivní (waterfall), agilní i hybridní přístupy.</p>
<p>PMP (Project Management Professional) certifikace od PMI je jedna z nejprestižnějších PM certifikací — vyžaduje 5 let PM praxe (nebo 3 roky s VŠ), 35 hodin PM vzdělání a složení zkoušky. CAPM (Certified Associate in Project Management) je vstupní certifikace. Obě se odkazují na PMBOK znalostní standard. <a href="#evm">EVM</a> (Earned Value Management) je klíčová technika pro sledování nákladů a harmonogramu projektu.</p>`,
  },
  {
    id: 'pmo',
    title: 'PMO — Project Management Office',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['prince2', 'pmbok', 'evm', 'it-portfolio'],
    body: `<p><strong>PMO</strong> (Project Management Office) je organizační jednotka, která definuje a udržuje standardy projektového řízení v organizaci, poskytuje podporu PM manažerům a zajišťuje governance projektového portfolia. PMO funguje jako centrum kompetencí pro PM.</p>
<p>Typy PMO dle vlivu: <em>Supportive PMO</em> (nízký vliv) — poskytuje šablony, nástroje, školení na požádání. <em>Controlling PMO</em> (střední vliv) — vyžaduje compliance s PM metodologií a standardy. <em>Directive PMO</em> (vysoký vliv) — přímo řídí projekty, PM manažeři reportují PMO. V praxi se většina PMO pohybuje mezi Supportive a Controlling.</p>
<p>Funkce PMO: standardizace PM procesů a metodik (šablony, nástroje, best practices), portfolio reporting (executive dashboard, status reports), resource management (kapacitní plánování, alokace PM zdrojů), governance (project review gates, risk a issue eskalace), PM coaching a mentoring, post-project reviews a lessons learned.</p>
<p>PMO výzvy: PMO musí prokázat hodnotu jinak se stává "bureaucratic overhead". Úspěšné PMO balancuje standardizaci s flexibilitou, přidává hodnotu bez přidávání zbytečné administrativy. IT Portfolio Management a PMO jsou úzce propojeny — PMO zajišťuje governance, Portfolio Management zajišťuje strategické prioritizace.</p>`,
  },
  {
    id: 'evm',
    title: 'EVM — Earned Value Management',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['prince2', 'pmbok', 'pmo'],
    body: `<p><strong>EVM</strong> (Earned Value Management) je projektová řídící technika pro objektivní měření výkonu projektu integrací rozsahu, harmonogramu a nákladů do jednoho konzistentního systému. EVM odpovídá na klíčové PM otázky: Jsme nad nebo pod rozpočtem? Před nebo za harmonogramem? Jak bude projekt vypadat na konci?</p>
<p>Tři základní veličiny EVM:</p>
<ul>
  <li><strong>PV</strong> (Planned Value) — kolik práce mělo být hotovo ke dni měření dle plánu (kolik to stojí)?</li>
  <li><strong>EV</strong> (Earned Value) — kolik práce bylo skutečně hotovo ke dni měření (v plánovaných nákladech)?</li>
  <li><strong>AC</strong> (Actual Cost) — kolik bylo skutečně utraceno za práci provedenou ke dni měření?</li>
</ul>
<p>Klíčové EVM metriky a jejich interpretace:</p>
<ul>
  <li><strong>CV = EV − AC</strong> (Cost Variance): kladné = pod rozpočtem, záporné = nad rozpočtem</li>
  <li><strong>SV = EV − PV</strong> (Schedule Variance): kladné = napřed, záporné = za harmonogramem</li>
  <li><strong>CPI = EV/AC</strong> (Cost Performance Index): &gt;1 = efektivní, &lt;1 = neefektivní</li>
  <li><strong>SPI = EV/PV</strong> (Schedule Performance Index): &gt;1 = napřed, &lt;1 = za harmonogramem</li>
  <li><strong>EAC</strong> (Estimate at Completion): prognóza celkových nákladů projektu na základě aktuálního CPI</li>
</ul>`,
  },
  {
    id: 'rpa',
    title: 'RPA — Robotic Process Automation',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['ipa', 'bpm', 'erp', 'itsm'],
    body: `<p><strong>RPA</strong> (Robotic Process Automation) je technologie, která softwarové roboty ("boty") využívá k automatizaci repetitivních, rule-based digitálních procesů, které dříve vykonávali lidé. RPA roboti interagují s aplikacemi přes UI — stejně jako by to dělal člověk (click, type, read screen).</p>
<p>Charakteristiky RPA: <em>Non-invasivní</em> — robot pracuje přes existující UI (nemodifikuje zdrojové systémy). <em>Rule-based</em> — pracuje dle definovaných pravidel bez výjimek (bez AI). <em>Rychlé nasazení</em> — implementace týdny vs. měsíce u tradičního IT. <em>24/7 provoz</em> — robot nemá přestávky. <em>Auditní stopa</em> — každá akce robota je logována.</p>
<p>Vhodné procesy pro RPA: vysoký objem, nízká variabilita, rule-based, strukturovaný input, přístup ke stávajícím aplikacím. Příklady: zpracování faktur, účetní reconciliation, HR onboarding administrativy, report generování, data migration, email routing. Nevhodné: procesy s vysokou variabilitou, nestrukturovanými daty nebo požadující lidský úsudek.</p>
<p>Přední RPA platformy: UiPath, Automation Anywhere, Blue Prism, Microsoft Power Automate. Přechod na <a href="#ipa">IPA</a> (Intelligent Process Automation): RPA + AI (NLP pro nestrukturované dokumenty, ML pro rozhodování) umožňuje automatizovat i komplexnější, kognitivní procesy.</p>`,
  },
  {
    id: 'ipa',
    title: 'IPA — Intelligent Process Automation',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['rpa', 'bpm', 'erp'],
    body: `<p><strong>IPA</strong> (Intelligent Process Automation) je rozšíření <a href="#rpa">RPA</a> o umělou inteligenci a kognitivní technologie, které umožňují automatizovat i procesy vyžadující porozumění přirozenému jazyku, zpracování nestrukturovaných dat nebo adaptivní rozhodování.</p>
<p>IPA komponenty: <em>RPA</em> (robotická automatizace rule-based kroků), <em>AI/ML</em> (prediktivní modely, klasifikace, anomalie detekce), <em>NLP/NLU</em> (Natural Language Processing — čtení e-mailů, dokumentů, extrakce klíčových dat), <em>OCR/IDP</em> (Intelligent Document Processing — digitalizace a strukturování papírových dokumentů), <em>Process Mining</em> (automatické odkrytí procesů z eventových logů), <em>Decision Management</em> (business rules engines, ML modely pro rozhodování).</p>
<p>Příklady IPA use cases: Accounts Payable automation — IPA robot přijme invoice emailem, OCR extrahuje data, ML ověří dodavatele a 3-way match, RPA zaúčtuje v ERP. Claims Processing — NLP čte pojistné žádosti, ML klasifikuje, RPA zpracovává. Customer Service — chatbot + RPA pro automatické řešení standardních zákaznických dotazů.</p>
<p>IPA je součástí širšího tématu hyperautomation (Gartner) — systematické identifikace a automatizace co nejvíce obchodních procesů. IPA řeší "long tail" procesů, kde čistá RPA nestačí pro variabilitu vstupů.</p>`,
  },
  {
    id: 'fit-gap',
    title: 'Fit/Gap analýza',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['erp', 'sap', 'sap-activate', 'ricefw', 'bpmn'],
    body: `<p><strong>Fit/Gap analýza</strong> je strukturovaný proces při ERP implementaci, který identifikuje, kde standardní ERP funkce (Fit) pokrývají business požadavky a kde existuje mezera (Gap) vyžadující customizaci, alternativní řešení nebo přizpůsobení procesů. Je klíčovým vstupem pro projektový rozsah a odhad nákladů.</p>
<p>Fit/Gap workshop probíhá typicky tak, že konsultant (SAP/ERP expert) demonstruje standardní systémové chování (walk-through ERP Best Practices), business analytik a klíčoví uživatelé hodnotí, zda standard odpovídá jejich potřebám. Výsledky jsou klasifikovány jako: <em>Fit</em> (standard vyhovuje), <em>Configuration Fit</em> (standard po konfiguraci vyhovuje), <em>Gap</em> (standard nevyhovuje → potřeba customizace nebo process change).</p>
<p>Pro každý Gap je rozhodnutí: (1) Přizpůsobit business proces ke standardu (nejlepší pro long-term maintainability), (2) Konfigurovat systém (využít existující nastavení), (3) Vlastní vývoj nebo <a href="#ricefw">RICEFW</a> objekt (nejnákladnější, nejrizikovější). Pravidlo: "fit to standard" — přizpůsobit procesy k ERP, ne ERP k procesům. Každá customizace zvyšuje TCO a riziko při upgradu.</p>
<p>Výstupem Fit/Gap analýzy je Fit/Gap Report s Business Process Master List — inventář všech procesů, jejich Fit/Gap klasifikace a navrhovaná řešení pro Gapy. Tento dokument je základ pro project scope, estimace a design fáze.</p>`,
  },
  {
    id: 'ricefw',
    title: 'RICEFW',
    area: 'Procesní řízení',
    subjects: ['4SA516'],
    related: ['erp', 'sap', 'fit-gap', 'sap-activate'],
    body: `<p><strong>RICEFW</strong> je akronym pro pět typů customizačních objektů v ERP (zejména ERP) projektech: <strong>R</strong>eports, <strong>I</strong>nterfaces, <strong>C</strong>onversions, <strong>E</strong>nhancements, <strong>F</strong>orms, <strong>W</strong>orkflows. RICEFW seznam je výstupem <a href="#fit-gap">Fit/Gap analýzy</a> a definuje rozsah custom developmentu v projektu.</p>
<p>Popis každého typu:</p>
<ul>
  <li><strong>Reports (R)</strong> — vlastní reporty a výstupy (ABAP Reports, ERP Analytics Cloud, BEx queries)</li>
  <li><strong>Interfaces (I)</strong> — integrace se systémy třetích stran (webové služby, EDI, APIs, ALE/IDocs). Typicky největší skupina.</li>
  <li><strong>Conversions (C)</strong> — migrace historických dat (legacy data) do nového systému; LSMW, BAPI, ERP Data Services</li>
  <li><strong>Enhancements (E)</strong> — rozšíření standardní ERP funkcionality (User Exits, BAdIs, implicit/explicit enhancements)</li>
  <li><strong>Forms (F)</strong> — vlastní tiskové formuláře (SAPScript, SmartForms, Adobe Forms, BRF+)</li>
  <li><strong>Workflows (W)</strong> — automatizace schvalovacích procesů (ERP Workflow, Business Rules Framework)</li>
</ul>
<p>RICEFW počet a komplexnost jsou klíčovými ukazateli rozsahu a nákladů projektu. Pravidlo: minimalizovat RICEFW — každý custom objekt zvyšuje implementační náklady, testovací úsilí a budoucí upgrade komplexitu. Cílem Fit-to-Standard je snížit RICEFW na minimum.</p>`,
  },
]
