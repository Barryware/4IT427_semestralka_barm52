import type { WikiEntry } from './wiki'

export const WIKI_RISK_FORENSICS: WikiEntry[] = [
  {
    id: 'erm',
    title: 'ERM — Enterprise Risk Management',
    area: 'Řízení rizik',
    subjects: ['4SA551'],
    related: ['iso-31000', 'risk-appetite', 'ale', 'fair-model', 'coso', 'kri', 'tprm'],
    body: `<p><strong>ERM</strong> (Enterprise Risk Management, Podnikové řízení rizik) je systematický přístup k identifikaci, hodnocení, ošetření a monitorování rizik na úrovni celé organizace. ERM překonává dřívější "silo" přístup k rizikům (každé oddělení řídí svá rizika izolovaně) a nahrazuje ho integrovaným pohledem na portfolio rizik.</p>
<p>ERM rámce: <a href="#coso">COSO ERM Framework</a> (2017: "Integrating with Strategy and Performance") a <a href="#iso-31000">ISO 31000</a>. COSO ERM zdůrazňuje propojení risk managementu se strategickým plánováním — rizika nejsou jen hrozbami, ale i příležitostmi. Definuje pět komponent: Governance &amp; Culture, Strategy &amp; Objective-Setting, Performance, Review &amp; Revision, Information &amp; Communication.</p>
<p>ERM proces: Identifikace rizik (risk register, brainstorming, interviews, scenario analysis) → Hodnocení rizik (inherentní riziko: pravděpodobnost × dopad) → Rizikové odpovědi (Avoid, Accept, Mitigate/Reduce, Transfer, Share) → Monitoring (KRI, risk reporting) → Přezkum.</p>
<p>ERM vs. IT Risk Management: ERM je podnikový rámec; IT rizika jsou podmnožinou. CRO (Chief Risk Officer) odpovídá za ERM, CISO odpovídá za IT/cyber rizika. V praxi je nutná integrace: IT rizika (výpadek systémů, kybernetický útok) mají přímý dopad na podnikové cíle a musí být reportována v ERM kontextu.</p>`,
  },
  {
    id: 'iso-31000',
    title: 'ISO 31000',
    area: 'Řízení rizik',
    subjects: ['4SA551'],
    related: ['erm', 'risk-appetite', 'ale', 'fair-model', 'kri'],
    body: `<p><strong>ISO 31000:2018</strong> (Risk Management — Guidelines) je mezinárodní standard pro řízení rizik. Na rozdíl od ISO/IEC 27001 nebo SOX není ISO 31000 certifikovatelný — je to "guidance document" poskytující principy, rámec a procesy pro řízení rizik v jakémkoli kontextu a organizaci.</p>
<p>ISO 31000 definuje risk management jako <em>koordinované aktivity pro řízení a kontrolu organizace s ohledem na rizika</em>. Riziko je definováno jako <em>efekt nejistoty na cíle</em> — může být pozitivní (příležitost) i negativní (hrozba).</p>
<p>Tři součásti ISO 31000 rámce:</p>
<ul>
  <li><strong>Principy</strong> (8 principů): Integrated, Structured and comprehensive, Customized, Inclusive, Dynamic, Best available information, Human and cultural factors, Continual improvement</li>
  <li><strong>Rámec</strong>: Leadership and commitment → Integration → Design → Implementation → Evaluation → Improvement (PDCA logika)</li>
  <li><strong>Proces</strong>: Communication and consultation → Scope/context/criteria → Risk assessment (Identification → Analysis → Evaluation) → Risk treatment → Monitoring and review → Recording and reporting</li>
</ul>
<p>ISO 31000 je úmyslně generický — pro specifické domény existují specializované standardy: IEC 31010 (Risk Assessment Techniques — katalog 31+ metod jako Bow-tie, FMEA, FTA, HAZOP, Monte Carlo), ISO/IEC 27005 (risk management pro informační bezpečnost), ISO 22301 (business continuity).</p>`,
  },
  {
    id: 'risk-appetite',
    title: 'Risk appetite / Risk tolerance',
    area: 'Řízení rizik',
    subjects: ['4SA551'],
    related: ['erm', 'iso-31000', 'ale', 'kri'],
    body: `<p><strong>Risk appetite</strong> (chuť k riziku) je míra rizika, kterou je organizace ochotna přijmout při sledování svých cílů. Risk appetite je strategickým rozhodnutím boardu a vrcholového vedení — definuje obecnou orientaci organizace vůči riziku (konzervativní, umírněná, agresivní).</p>
<p><strong>Risk tolerance</strong> (tolerance rizika) je operativní upřesnění risk appetite — konkrétní, měřitelné limity přijatelných odchylek v konkrétní oblasti. Zatímco risk appetite je obecný ("přijímáme umírněné finanční riziko"), risk tolerance je specifický ("maximální ztráta z jednoho IT výpadku nesmí překročit 500 tis. Kč").</p>
<p>Risk appetite statement je formální dokument schvalovaný boardem, který definuje pro každou kategorii rizik (strategická, operační, finanční, compliance, reputační) hranice akceptovatelnosti. Bez explicitního risk appetite statement vzniká implicitní risk appetite — vedoucí pracovníci dělají rozhodnutí bez konzistentního rámce.</p>
<p>Vztah k <a href="#kri">KRI</a>: KRI jsou měřítka, která signalizují přibližování k risk tolerance limitům. Překročení KRI thresholdu spouští eskalaci a akci. Vztah k <a href="#erm">ERM</a>: risk appetite je input do ERM procesu — určuje, která rizika jsou "acceptable" (pod tolerance) a která vyžadují treatment.</p>`,
  },
  {
    id: 'ale',
    title: 'ALE — Annualized Loss Expectancy',
    area: 'Řízení rizik',
    subjects: ['4SA551', '4SA313'],
    related: ['erm', 'iso-31000', 'fair-model', 'risk-appetite'],
    body: `<p><strong>ALE</strong> (Annualized Loss Expectancy) je kvantitativní metrika pro hodnocení IT/bezpečnostních rizik, vyjadřující očekávanou roční ztrátu z konkrétní hrozby. ALE = ARO × SLE, kde ARO (Annualized Rate of Occurrence) je pravděpodobnost výskytu hrozby za rok a SLE (Single Loss Expectancy) je hodnota ztráty při jednom výskytu.</p>
<p>Komponenty ALE: <em>Asset Value (AV)</em> — hodnota ohroženého aktiva (data, systémy, reputace). <em>Exposure Factor (EF)</em> — procento aktiva, které bude zasaženo (0–100 %). <em>SLE = AV × EF</em> — ztráta při jednom incidentu. <em>ARO</em> — jak často hrozba statisticky nastane za rok (0,01 = jednou za 100 let; 1 = jednou ročně; 10 = 10× ročně). <em>ALE = SLE × ARO</em>.</p>
<p>Příklad: Webový server (AV = 2 000 000 Kč), ransomware útok (EF = 50 % — polovina dat zasažena), ARO = 0,2 (jednou za 5 let). SLE = 2 000 000 × 0,5 = 1 000 000 Kč. ALE = 1 000 000 × 0,2 = 200 000 Kč/rok. Pokud bezpečnostní opatření stojí méně než ALE, je jeho implementace ekonomicky odůvodněná.</p>
<p>Kritika ALE: předpoklad nezávislosti incidentů, obtížné přesné určení ARO pro vzácné hrozby, ignoruje korelace (jeden útok zasáhne více aktiv). <a href="#fair-model">FAIR model</a> přináší sofistikovanější kvantitativní přístup k hodnocení rizik pomocí distribucí pravděpodobnosti.</p>`,
  },
  {
    id: 'fair-model',
    title: 'FAIR model',
    area: 'Řízení rizik',
    subjects: ['4SA551'],
    related: ['erm', 'ale', 'iso-31000', 'risk-appetite'],
    body: `<p><strong>FAIR</strong> (Factor Analysis of Information Risk) je kvantitativní framework pro analýzu a měření IT/cyber rizik vyvinutý Jackem Jonasem. FAIR je alternativou k tradičním semi-kvantitativním metodám (high/medium/low matice) a poskytuje statisticky fundovaný přístup k vyjádření rizika v peněžních hodnotách.</p>
<p>FAIR taxonomie rizika: Riziko = Pravděpodobnost ztráty × Velikost ztráty. Dále rozkládá: <em>Threat Event Frequency (TEF)</em> — jak často hrozba nastane, <em>Vulnerability</em> — pravděpodobnost že hrozba způsobí ztrátu (TEF × Vulnerability = Loss Event Frequency — LEF), <em>Primary Loss Magnitude</em> — přímé náklady incidentu (data recovery, downtime, response), <em>Secondary Loss Magnitude</em> — nepřímé náklady (reputace, regulatory fines, ztráta zákazníků).</p>
<p>FAIR přístup: místo odhadu "pravděpodobnost útoku je střední" FAIR přistupuje pravděpodobnostně — expert odhaduje rozsahy (min/max/most likely) pro každou komponentu, Monte Carlo simulace generuje distribuci rizikových výsledků v Kč. Výsledkem je statement jako: "90% pravděpodobnost, že roční ztráta z ransomware bude pod 3 mil. Kč, s mediánem 800 tis. Kč".</p>
<p>FAIR je základem Open FAIR standard (Open Group) a doplňuje <a href="#iso-31000">ISO 31000</a> kvantitativní metodologií. Je stále více požadován v regulated industries (finanční sektor, pojišťovnictví) pro ekonomické odůvodnění bezpečnostních investic.</p>`,
  },
  {
    id: 'stride',
    title: 'STRIDE — threat modeling',
    area: 'Řízení rizik',
    subjects: ['4SA551', '4SA313'],
    related: ['erm', 'iso-31000', 'penetracni-testovani', 'owasp-top10', 'mitre-attck'],
    body: `<p><strong>STRIDE</strong> je threat modeling metodika vyvinutá Microsoftem (Loren Kohnfelder &amp; Praerit Garg, 1999) pro systematickou identifikaci bezpečnostních hrozeb v softwarových systémech. STRIDE je akronymem pro šest kategorií hrozeb.</p>
<p>Šest kategorií hrozeb STRIDE:</p>
<ul>
  <li><strong>S — Spoofing</strong>: Vydávání se za jiného uživatele nebo systém (narušení autentičnosti). Mitigace: silná autentizace, <a href="#mfa">MFA</a>, certifikáty.</li>
  <li><strong>T — Tampering</strong>: Neoprávněná modifikace dat (narušení integrity). Mitigace: digitální podpisy, integrity checks, ACL.</li>
  <li><strong>R — Repudiation</strong>: Popření provedení akce (narušení nepopiratelnosti). Mitigace: auditní logy, digitální podpisy, non-repudiation mechanismy.</li>
  <li><strong>I — Information Disclosure</strong>: Neoprávněné zveřejnění informací (narušení důvěrnosti). Mitigace: šifrování, přístupová práva, DLP.</li>
  <li><strong>D — Denial of Service</strong>: Narušení dostupnosti. Mitigace: rate limiting, DDoS protection, redundance, BCP.</li>
  <li><strong>E — Elevation of Privilege</strong>: Získání vyšších oprávnění než jsou udělena. Mitigace: least privilege, PAM, patch management.</li>
</ul>
<p>STRIDE se typicky aplikuje na DFD (Data Flow Diagram) systému — pro každý prvek (procesy, datová úložiště, toky, entity) se systematicky prochází všechny STRIDE kategorie a identifikují se potenciální hrozby. Výstupem je seznam hrozeb s hodnocením rizika a navrhovanými mitigacemi.</p>`,
  },
  {
    id: 'nist-rmf',
    title: 'NIST RMF',
    area: 'Řízení rizik',
    subjects: ['4SA551'],
    related: ['erm', 'iso-31000', 'isms', 'iso-27001', 'stride'],
    body: `<p><strong>NIST RMF</strong> (NIST Risk Management Framework, SP 800-37) je rámec pro správu bezpečnostních a privátních rizik informačních systémů publikovaný NIST (National Institute of Standards and Technology). Původně vyvinut pro federální agentury USA, dnes globálně uznávaný v komerčním sektoru. Aktuální verze Rev. 2 (2018) klade důraz na privacy a supply chain risks.</p>
<p>NIST RMF definuje šest kroků:</p>
<ol>
  <li><strong>Prepare</strong> — příprava organizace na RMF (risk management roles, organizační risk tolerance)</li>
  <li><strong>Categorize</strong> — kategorizace IS dle dopadu na CIA (využívá NIST SP 800-60 a FIPS 199)</li>
  <li><strong>Select</strong> — výběr bezpečnostních kontrol (NIST SP 800-53 katalog kontrol — 20 rodin)</li>
  <li><strong>Implement</strong> — implementace kontrol a dokumentace</li>
  <li><strong>Assess</strong> — hodnocení efektivnosti kontrol (NIST SP 800-53A)</li>
  <li><strong>Authorize</strong> — rozhodnutí authorizing official o přijatelnosti rizik (ATO — Authority to Operate)</li>
  <li><strong>Monitor</strong> — kontinuální monitoring kontrol a incidentů</li>
</ol>
<p>NIST SP 800-53 katalog obsahuje 20 rodin kontrol (Access Control, Audit and Accountability, Configuration Management, Incident Response, Supply Chain Risk Management…). Je detailnějším a rozsáhlejším katalogem než <a href="#iso-27002">ISO 27002</a> — vzájemný mapping je dostupný.</p>`,
  },
  {
    id: 'kri',
    title: 'KRI — Key Risk Indicator',
    area: 'Řízení rizik',
    subjects: ['4SA551'],
    related: ['erm', 'iso-31000', 'risk-appetite', 'kpi', 'siem'],
    body: `<p><strong>KRI</strong> (Key Risk Indicator) jsou kvantitativní metriky, které slouží jako early warning systém — signalizují narůstající riziko nebo přibližování se k risk tolerance limitům dříve, než dojde k incidentu. KRI jsou "leading indicators" rizika, na rozdíl od KPI, které měří výkon (lagging).</p>
<p>Vlastnosti dobrého KRI: předpovídají riziko (leading, ne lagging), jsou měřitelné a objektivní, korelují se skutečnými ztrátami (validované historickými daty), jsou actionable (překročení KRI spouští konkrétní akci), jsou ekonomicky únosné na sběr. Špatné KRI: příliš obecné ("počet bezpečnostních incidentů" — lagging), nepropojené s konkrétním rizikem, příliš citlivé (mnoho false positives).</p>
<p>Příklady IT/cyber KRI: % systémů bez aktuálních patchů (>15 % = amber threshold), počet privilegovaných účtů bez MFA, průměrná doba detekce incidentu (MTTD), počet otevřených kritických/high vulnerabilities >30 dní, % zálohovacích testů, které selhaly, počet SOD konfliktů v ERP bez kompenzační kontroly.</p>
<p>KRI monitoring: KRI se reportují ve Risk Dashboard — obvykle ve třech zónách (Green = v normě, Amber = varování, Red = limit překročen). Risk Committee nebo board přezkoumává KRI měsíčně/čtvrtletně. Překročení Red threshold spouští eskalaci na příslušného risk ownera a vyžaduje remediation plán.</p>`,
  },
  {
    id: 'tprm',
    title: 'TPRM — Third-Party Risk Management',
    area: 'Řízení rizik',
    subjects: ['4SA551', '4SA515'],
    related: ['erm', 'iso-31000', 'nis2', 'dora', 'iso-27001'],
    body: `<p><strong>TPRM</strong> (Third-Party Risk Management, Řízení rizik třetích stran) je systematický přístup k identifikaci, hodnocení a monitorování rizik spojených s dodavateli, poskytovateli IT/cloud služeb, outsourcing partnery a dalšími třetími stranami, jimž organizace svěřuje přístup k datům nebo kritickým procesům.</p>
<p>Proč TPRM: mnoho kybernetických incidentů pochází přes dodavatelský řetězec (supply chain attacks — SolarWinds, MOVEit). Regulátoři (<a href="#nis2">NIS2</a>, <a href="#dora">DORA</a>, GDPR) explicitně vyžadují governance pro třetí strany. Průměrná organizace má stovky třetích stran s přístupem k citlivým datům.</p>
<p>TPRM proces: <em>Inventory</em> — identifikace a kategorizace třetích stran dle kritičnosti (tier 1 = kritické, tier 2 = important, tier 3 = low risk). <em>Due Diligence</em> — hodnocení bezpečnostní posture třetí strany (dotazníky, certifikáty — ISO 27001, SOC 2, penetrační testy, on-site audity). <em>Smluvní požadavky</em> — SLA, DPA (GDPR), bezpečnostní požadavky v kontraktu, právo na audit. <em>Ongoing monitoring</em> — průběžné sledování (continuous monitoring platformy — SecurityScorecard, BitSight, UpGuard).</p>
<p>DORA zavádí register ICT TPSP (Third-Party Service Providers) s povinným reportingem kritických dodavatelů regulátorovi. NIS2 vyžaduje hodnocení bezpečnosti celého dodavatelského řetězce jako součást povinných bezpečnostních opatření.</p>`,
  },
  {
    id: 'dfa',
    title: 'DFA — Digitální forenzní analýza',
    area: 'Forenzní analýza',
    subjects: ['4SA540'],
    related: ['chain-of-custody', 'write-blocker', 'forenzni-kopie', 'file-carving', 'ntfs-forenzni', 'volatility', 'anti-forensics'],
    body: `<p><strong>DFA</strong> (Digitální forenzní analýza) je aplikace vědeckých metod pro identifikaci, sběr, uchování, analýzu a prezentaci digitálních důkazů z digitálních zařízení a médií způsobem, který je přípustný v právním řízení. DFA je průsečíkem informatiky, kriminalistiky a práva.</p>
<p>Principy DFA: <em>Autenticita</em> — důkaz pochází z identifikovaného zdroje. <em>Integrita</em> — důkaz nebyl po zajištění modifikován. <em>Opakovatelnost</em> — analýza může být reprodukována nezávislým forenzním analytikem se stejnými výsledky. <em>Přijatelnost</em> — evidence splňuje právní standardy. Tyto principy zajišťuje <a href="#chain-of-custody">Chain of Custody</a>.</p>
<p>DFA fáze: <em>Identifikace</em> (identifikace zdrojů dat a relevantních zařízení), <em>Preservation</em> (zajištění, izolace, vytvoření <a href="#forenzni-kopie">forenzní kopie</a> pomocí <a href="#write-blocker">write blockeru</a>), <em>Analýza</em> (zkoumání dat — timeline, <a href="#file-carving">file carving</a>, log analýza, keyword search), <em>Dokumentace</em> (vše je zaznamenáno pro reprodukovatelnost), <em>Prezentace</em> (srozumitelná zpráva pro právníky, soud, management).</p>
<p>Oblasti DFA: <a href="#ntfs-forenzni">Disk forensics</a> (pevné disky, SSD, USB), Memory forensics (<a href="#volatility">Volatility</a>), <a href="#ioc">Network forensics</a> (logy, PCAP), Mobile forensics (telefony, cloud zálohy), Cloud forensics, Email forensics. Každá oblast vyžaduje specifické nástroje a metody.</p>`,
  },
  {
    id: 'chain-of-custody',
    title: 'Chain of Custody',
    area: 'Forenzní analýza',
    subjects: ['4SA540'],
    related: ['dfa', 'write-blocker', 'forenzni-kopie'],
    body: `<p><strong>Chain of Custody</strong> (CoC, řetěz opatrování nebo uchovávání) je dokumentovaný záznam historie fyzického nebo digitálního důkazu od okamžiku jeho zajištění až po jeho použití v soudním řízení. CoC prokazuje, že důkaz nebyl kontaminován, modifikován nebo nahrazen.</p>
<p>CoC zahrnuje: datum a čas zajištění důkazu, jméno osoby, která důkaz zajistila, popis a identifikaci důkazu (sériové číslo zařízení, hash hodnota digitálního souboru), umístění a podmínky uložení, každý přenos důkazu mezi osobami (kdo, komu, kdy, proč), každý přístup k důkazu (kdo, kdy, za jakým účelem).</p>
<p>V digitální forenzní analýze je klíčovým prvkem CoC <em>kryptografický hash</em> (MD5, SHA-256) <a href="#forenzni-kopie">forenzní kopie</a> — vypočítaný ihned po zajištění a dokumentovaný. Jakákoli budoucí změna kopie by hash změnila a porušila integritu CoC. Hash reference obrazu původního média slouží jako "digitální otisk prstu".</p>
<p>Přerušení CoC (break in chain of custody) může způsobit nepřijatelnost důkazu soudem — obhajoba zpochybní, zda důkaz nebyl manipulován. Proto jsou forenzní protokoly a procesní disciplína kritické. Forenzní analyik musí být připraven svědčit o dodržení CoC postupů.</p>`,
  },
  {
    id: 'write-blocker',
    title: 'Write blocker',
    area: 'Forenzní analýza',
    subjects: ['4SA540'],
    related: ['dfa', 'chain-of-custody', 'forenzni-kopie'],
    body: `<p><strong>Write blocker</strong> (blokátor zápisu) je hardware nebo software nástroj, který umožňuje čtení dat z digitálního média (pevný disk, SSD, USB flash disk, SD karta) bez možnosti zápisu nebo modifikace dat na médiu. Write blocker je klíčový nástroj pro zachování integrity důkazů v digitální forenzní analýze.</p>
<p>Hardware write blocker: fyzické zařízení umístěné mezi vyšetřovaným médiem a forenzní pracovní stanicí. Zachycuje všechny write příkazy a blokuje je na hardwarové úrovni. Je považován za spolehlivější než softwarový write blocker. Příklady: Tableau Forensic Bridges (TD3, TACC1), WiebeTech Forensic UltraDock, CRU-DataPort.</p>
<p>Softwarový write blocker: operační systém je nakonfigurován tak, aby blokoval zápis na určené médium (registry úpravy ve Windows, mount options v Linuxu). Méně spolehlivý — OS může přesto zapsat metadata (timestamps). Použitelný pouze pro méně citlivé situace nebo interní investigace.</p>
<p>Postup při forenzním zajišťování: (1) Fyzicky zapojit write blocker. (2) Připojit podezřelé médium přes write blocker. (3) Vytvořit <a href="#forenzni-kopie">bitovou kopii</a> (forensic image). (4) Vypočítat a zdokumentovat hash kopie i originálu. (5) Archivovat originál — všechna další analýza probíhá na kopii. Write blocker zajišťuje, že originální médium zůstane nedotčeno pro případné další nezávislé přezkoumání.</p>`,
  },
  {
    id: 'forenzni-kopie',
    title: 'Forenzní kopie',
    area: 'Forenzní analýza',
    subjects: ['4SA540'],
    related: ['dfa', 'write-blocker', 'chain-of-custody', 'hash-funkce', 'ntfs-forenzni'],
    body: `<p><strong>Forenzní kopie</strong> (forensic image, bit-for-bit copy) je bit-přesná, exaktní replika celého paměťového média včetně všech sektorů — alokovaného i nealokovaného prostoru, smazaných souborů, file slack, partition slack a nepoužívaných oblastí. Na rozdíl od standardní kopie souborů zachycuje i data, která nejsou viditelná v souborovém systému.</p>
<p>Proč bit-for-bit kopie: smazané soubory nejsou skutečně odstraněny — pouze je označen jejich prostor jako volný. Metadata (timestamps, MFT záznamy v NTFS) jsou zachována. Fragmenty dat (file slack, unallocated clusters) mohou obsahovat stopy aktivity. Standard kopie by tato data ztratila.</p>
<p>Formáty forenzních kopií: <em>RAW/DD</em> — prostý bitový obraz (dd příkaz v Linuxu), velký, bez komprese, bez metadat o zajišťování. <em>E01 (EnCase Evidence File)</em> — komprimovaný, obsahuje metadata o zajišťování, integrated hash check, segment support — nejrozšířenější forenzní formát. <em>AFF (Advanced Forensics Format)</em> — open source alternativa. <em>VMDK/VHD</em> — virtualizační formáty pro mount a analýzu.</p>
<p>Verifikace integrity: bezprostředně po pořízení se vypočítá <a href="#hash-funkce">MD5 nebo SHA-256 hash</a> celého obrazu. Hash se dokumentuje v CoC záznamu. Při každém použití obrazu se hash přepočítá a porovná — shoda = nedotčená integrita. Nástroje: FTK Imager, dd, Guymager, Paladin, dc3dd.</p>`,
  },
  {
    id: 'file-carving',
    title: 'File carving',
    area: 'Forenzní analýza',
    subjects: ['4SA540'],
    related: ['dfa', 'forenzni-kopie', 'ntfs-forenzni'],
    body: `<p><strong>File carving</strong> je technika digitální forenzní analýzy pro rekonstrukci souborů z nealokovaného prostoru disku (unallocated clusters) nebo z oblasti, kde souborový systém není funkční nebo byl záměrně odstraněn. Carving vyhledává soubory na základě jejich binárních vzorů (file headers a footers) bez závislosti na souborovém systému.</p>
<p>Princip file carvingu: každý soubor začíná charakteristickými bajty (magic bytes nebo file signature — file header) a typicky končí charakteristickými bajty (file footer). Například: JPEG soubor začíná FF D8 FF a končí FF D9. Carving nástroj skenuje binární proud surových dat a hledá tyto vzory bez ohledu na FAT/NTFS záznamy.</p>
<p>Kdy je carving nutný: smazané soubory (MFT záznamy smazány, ale data na disku stále existují), formatovaný disk (souborový systém smazán, data zůstávají), poškozený souborový systém, anti-forensics (záměrné mazání MFT). Carving je "záchrana dat" když souborový systém není k dispozici.</p>
<p>Omezení carvingu: fragmentovaný soubor (soubor rozprostřen po disku v nesousledných clusterech) bude rekonstruován neúplně nebo chybně — carving předpokládá sousledná data. Overwrite nebo secure wipe znemožní carving. Nástroje: Scalpel (open source), PhotoRec (specializace na fotografie), Foremost, FTK Imager, Autopsy (integrated carving).</p>`,
  },
  {
    id: 'kill-chain',
    title: 'Cyber Kill Chain',
    area: 'Forenzní analýza',
    subjects: ['4SA540', '4SA313'],
    related: ['mitre-attck', 'ioc', 'penetracni-testovani', 'dfa'],
    body: `<p><strong>Cyber Kill Chain</strong> je model útoků vyvinutý Lockheed Martin (2011) popisující sedm fází cíleného kybernetického útoku od průzkumu po dosažení cíle. Model je analogií vojenského kill chain konceptu — pokud útok zastavíme v jakékoli fázi, celý útok je zmařen.</p>
<p>Sedm fází Cyber Kill Chain:</p>
<ol>
  <li><strong>Reconnaissance</strong>: Průzkum — OSINT, skenování, identifikace cílů, zaměstnanců, technologií</li>
  <li><strong>Weaponization</strong>: Příprava útočného nástroje — malware, exploit, phishing e-mail s payload</li>
  <li><strong>Delivery</strong>: Doručení payloadu — email (phishing), USB, kompromitovaná webová stránka (watering hole)</li>
  <li><strong>Exploitation</strong>: Zneužití zranitelnosti — spuštění payloadu, exploit CVE, social engineering</li>
  <li><strong>Installation</strong>: Instalace backdooru nebo persistenčního mechanismu pro trvalý přístup</li>
  <li><strong>C2 (Command &amp; Control)</strong>: Navázání komunikace s C2 serverem útočníka pro přijímání příkazů</li>
  <li><strong>Actions on Objectives</strong>: Realizace cíle — exfiltrace dat, ransomware, sabotáž, espionage</li>
</ol>
<p>Kill Chain vs. <a href="#mitre-attck">MITRE ATT&amp;CK</a>: Kill Chain je jednoduchý lineární model vhodný pro awareness a high-level detekci; ATT&amp;CK je detailní taktický katalog s subvariamy každé taktiky — vhodný pro SOC detekci a threat hunting. Kill Chain pomáhá identifikovat, KDE v průběhu útoku máme detekční a preventivní kontroly.</p>`,
  },
  {
    id: 'mitre-attck',
    title: 'MITRE ATT&CK',
    area: 'Forenzní analýza',
    subjects: ['4SA540', '4SA313'],
    related: ['kill-chain', 'ioc', 'siem', 'soc', 'penetracni-testovani'],
    body: `<p><strong>MITRE ATT&amp;CK</strong> (Adversarial Tactics, Techniques and Common Knowledge) je veřejně dostupná databáze a rámec popisující taktiky, techniky a procedury (TTP) reálných útočníků (threat actors) a APT skupin. Je udržován neziskovou organizací MITRE Corporation a je de facto standardem pro threat intelligence a SOC operations.</p>
<p>Struktura MITRE ATT&amp;CK: <em>Matrix</em> organizuje TTP do 14 taktik (sloupce), každá taktika obsahuje techniky a sub-techniky (buňky). Příklady taktik: Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, C2, Exfiltration, Impact.</p>
<p>Každá technika má: popis, příklady reálných využití (threat actor groups), detekční doporučení (jak ji detekovat v SIEM/EDR), mitigační opatření. Příklad: T1566 (Phishing) má sub-techniky T1566.001 (Spearphishing Attachment), T1566.002 (Spearphishing Link), T1566.003 (Spearphishing via Service).</p>
<p>Použití ATT&amp;CK: <a href="#soc">SOC</a> a <a href="#siem">SIEM</a> pravidla mapována na ATT&amp;CK techniky (coverage analysis — které techniky umíme detekovat?), Threat Hunting (aktivní vyhledávání konkrétních TTP), Red Team planning, Purple Team exercises, CTI (Cyber Threat Intelligence) sdílení a klasifikace incidentů. MITRE ATT&amp;CK Navigator je nástroj pro vizualizaci pokrytí detekce.</p>`,
  },
  {
    id: 'ioc',
    title: 'IoC — Indicators of Compromise',
    area: 'Forenzní analýza',
    subjects: ['4SA540', '4SA313'],
    related: ['mitre-attck', 'kill-chain', 'siem', 'soc', 'dfa'],
    body: `<p><strong>IoC</strong> (Indicators of Compromise, Indikátory kompromitace) jsou artefakty pozorované v síti nebo na systémech, které s vysokou pravděpodobností signalizují průnik útočníka nebo malwarovou infekci. IoC jsou stopy zanechané útočníky — lze je použít pro detekci, response a sdílení threat intelligence.</p>
<p>Typy IoC: <em>Atomické IoC</em> — hash hodnoty (MD5, SHA-256) škodlivých souborů, IP adresy C2 serverů, doménová jména (C2, phishing), e-mailové adresy odesílatelů. <em>Computed IoC</em> — výsledky analýzy (YARA rules — vzory v binárních souborech, síťové signatury — Snort/Suricata rules). <em>Behavioral IoC</em> — registry klíče, mutexes, procesy, typy síťové komunikace charakteristické pro konkrétní malware nebo TTP.</p>
<p>IoC vs. TTP (Tactics, Techniques, Procedures): IoC jsou snadno nahraditelné útočníkem (nová IP adresa, nový hash souboru). TTP (<a href="#mitre-attck">MITRE ATT&amp;CK</a>) jsou stabilnější — útočník musí změnit celý způsob útoku, je to nákladné. Pyramida bolesti (Pyramid of Pain — Bianco) ukazuje, čím "výše" v pyramidě je IoC, tím nákladnější je pro útočníka ho změnit: Hash → IP → Domain → Network artifacts → Host artifacts → TTP.</p>
<p>Sdílení IoC: STIX/TAXII (Structured Threat Information eXpression / Trusted Automated eXchange of Intelligence Information) jsou standardy pro strukturované sdílení CTI (Cyber Threat Intelligence). Platformy: MISP, OpenCTI, ThreatConnect.</p>`,
  },
  {
    id: 'volatility',
    title: 'Volatility',
    area: 'Forenzní analýza',
    subjects: ['4SA540'],
    related: ['dfa', 'forenzni-kopie', 'ioc', 'chain-of-custody'],
    body: `<p><strong>Volatility</strong> je open-source framework pro analýzu volatilní paměti (RAM) — jeden z nejrozšířenějších nástrojů digitální forenzní analýzy a incident response. Umožňuje extrakci artefaktů z memory dumps Windows, Linux a macOS systémů.</p>
<p>Co lze z RAM analýzy získat: spuštěné procesy (včetně skrytých nebo smazaných — process injection, DKOM rootkity), síťová připojení (aktuální i historická — otevřené porty, vzdálené adresy), načtené DLL knihovny, šifrovací klíče (BitLocker, TrueCrypt klíče v paměti), plaintext hesla (LSASS process), clipboard obsah, shellkódy, injected code v legitimních procesech, evidence anti-forensics technik.</p>
<p>Volatility 3 (aktuální verze) architektura: pluginy poskytují specifické analýzy. Klíčové Windows pluginy: <em>pslist/pstree</em> (seznam procesů), <em>cmdline</em> (příkazové řádky procesů), <em>netscan</em> (síťová připojení), <em>filescan</em> (soubory v paměti), <em>dlllist</em> (DLL knihovny), <em>malfind</em> (detekce injected kódu), <em>hashdump</em> (password hashes z SAM), <em>mftparser</em> (MFT záznamy v paměti).</p>
<p>RAM acquisition: paměť je volatilní — musí být zajištěna co nejdříve po incidentu (Live Response). Nástroje pro sběr: DumpIt, WinPmem, F-Response. Order of Volatility (RFC 3227): RAM → Registry/cache → Running processes → Disk → Remote logging → Physical media — sbíráme v pořadí od nejvolatilnějšího.</p>`,
  },
  {
    id: 'ntfs-forenzni',
    title: 'NTFS forenzní analýza',
    area: 'Forenzní analýza',
    subjects: ['4SA540'],
    related: ['dfa', 'forenzni-kopie', 'file-carving', 'anti-forensics'],
    body: `<p><strong>NTFS forenzní analýza</strong> zahrnuje zkoumání NTFS (New Technology File System) metadata pro rekonstrukci aktivity na Windows systémech. NTFS bohatě zaznamenává aktivitu a metadata — pro forenzního analytika je NTFS "zlatý důl" informací.</p>
<p>Klíčové NTFS forenzní artefakty:</p>
<ul>
  <li><strong>MFT ($MFT)</strong> — Master File Table: záznam každého souboru a adresáře. Obsahuje timestampy (Created, Modified, Accessed, MFT Entry Modified — $STANDARD_INFORMATION), velikost, atributy, data runs (kde je soubor fyzicky uložen). I po smazání souboru zůstává MFT záznam ("tombstone") dokud není přepsán.</li>
  <li><strong>MACB timestamps</strong> — Modified, Accessed, Changed ($MFT), Born ($STANDARD_INFORMATION). Útočníci je mohou timestomping technikou modifikovat — ale $FILENAME atribut timestamps jsou obtížnější falzifikovat.</li>
  <li><strong>$LogFile a $UsnJrnl ($J)</strong> — transakční loging: záznamy o změnách souborů. USN Journal (Update Sequence Number Journal) uchovává historii NTFS operací — vytvoření, smazání, přejmenování souborů — i po smazání souboru.</li>
  <li><strong>Alternate Data Streams (ADS)</strong> — skryté datové proudy připojené k souborům. Malware je využívá pro ukrytí dat nebo spustitelných souborů.</li>
  <li><strong>$Recycle.Bin</strong> — záznamy o smazaných souborech: původní cesta, čas smazání.</li>
</ul>
<p>Nástroje: Autopsy (GUI), Plaso/log2timeline (timeline analysis), FTK, MFTECmd (Eric Zimmerman tools).</p>`,
  },
  {
    id: 'anti-forensics',
    title: 'Anti-forensics techniky',
    area: 'Forenzní analýza',
    subjects: ['4SA540'],
    related: ['dfa', 'forenzni-kopie', 'ntfs-forenzni', 'volatility', 'file-carving'],
    body: `<p><strong>Anti-forensics</strong> jsou techniky používané útočníky nebo insidery pro zmarnění, zpomalení nebo znehodnocení forenzní analýzy. Cílem je zničit nebo skrýt digitální stopy, aby bylo obtížnější nebo nemožné prokázat kompromitaci nebo aktivitu.</p>
<p>Hlavní kategorie anti-forensics technik:</p>
<ul>
  <li><strong>Data destruction</strong>: Secure wipe (přepsání dat náhodnými daty — dd, sdelete, DBAN), Disk encryption před destruction, Destroy device (fyzické zničení HDD), File shredding tools</li>
  <li><strong>Log manipulation</strong>: Mazání Windows Event Logs (wevtutil cl), modifikace syslog, disabling audit logging, logon/logoff log gaps</li>
  <li><strong>Timestomping</strong>: Modifikace MACB timestamps souborů pro zmást timeline analýzu (MetaSploit timestomp, TouchFile). Detekce: nesoulad $STANDARD_INFORMATION vs $FILENAME timestamps</li>
  <li><strong>Obfuscation and hiding</strong>: Alternate Data Streams (ADS), steganografie (ukrytí dat v obrázcích), šifrování (TrueCrypt, VeraCrypt plausible deniability), malware pod legitimními process names</li>
  <li><strong>Memory anti-forensics</strong>: Rootkits pro skrytí procesů (DKOM — Direct Kernel Object Manipulation), process hollowing</li>
  <li><strong>Fileless malware</strong>: Malware existující pouze v paměti bez souborů na disku — obchází file-based detekci a forenzní analýzu</li>
</ul>
<p>Detekce anti-forensics: porovnání $STANDARD_INFORMATION a $FILENAME timestamps, kontrola integrity Event Logů, memory forensics pro odhalení rootkitů, entropy analýza (šifrovaná/komprimovaná data mají vysokou entropii), analýza volného místa (<a href="#file-carving">carving</a>).</p>`,
  },
]
