export interface TFQuestion {
  q: string
  answer: boolean
  note: string
}

export interface BossQuestion {
  okruh: number
  title: string
  q: string
  modelAnswer: string
}

export interface KomiseQuestion {
  prof: 'smutny' | 'sedlacek' | 'sigmund'
  q: string
  modelAnswer: string
}

export interface OralQuestion {
  q: string
  modelAnswer: string
}

export const TF_BANK: TFQuestion[] = [
  {
    q: 'COBIT 2019 definuje celkem 40 governance a management objectives (5 EDM + 35 v APO/BAI/DSS/MEA).',
    answer: true,
    note: 'COBIT 5 měl 37 procesů; COBIT 2019 restrukturoval na 40 objectives.',
  },
  {
    q: 'ISO/IEC 27001 certifikace je v EU povinná pro všechny organizace zpracovávající osobní data.',
    answer: false,
    note: 'Certifikace je dobrovolná; GDPR nevyžaduje konkrétně ISO 27001.',
  },
  {
    q: 'GDPR ukládá povinnost ohlásit bezpečnostní incident dozorovému úřadu do 72 hodin od jeho zjištění.',
    answer: true,
    note: 'Čl. 33 GDPR — pokud je pravděpodobné riziko pro práva a svobody fyzických osob.',
  },
  {
    q: 'V COBIT 2019 je doménový model EDM (Evaluate, Direct, Monitor) součástí management domény.',
    answer: false,
    note: 'EDM je governance doménou, nikoli management doménou; APO/BAI/DSS/MEA jsou management.',
  },
  {
    q: 'Penetrační test se vždy provádí bez vědomí správce testovaného systému (blind test).',
    answer: false,
    note: 'Existují white-box, grey-box i black-box testy; majority jsou autorizované a správce je informován.',
  },
  {
    q: 'Zero Trust bezpečnostní model předpokládá, že každý uživatel uvnitř perimetru je implicitně důvěryhodný.',
    answer: false,
    note: 'Zero Trust: „Never trust, always verify" — důvěra se neuděluje na základě lokace.',
  },
  {
    q: 'Write blocker zabraňuje zápisu na zajišťované médium a je standardním nástrojem digitální forenziky.',
    answer: true,
    note: 'Zachovává integritu důkazu; bez write blockeru by hrozilo neúmyslné přepsání dat.',
  },
  {
    q: 'CVSS (Common Vulnerability Scoring System) hodnotí zranitelnosti na škále 0–100.',
    answer: false,
    note: 'CVSS skóre je v rozsahu 0.0–10.0.',
  },
  {
    q: 'ITIL 4 Service Value System obsahuje celkem 34 management practices.',
    answer: true,
    note: '14 General management + 17 Service management + 3 Technical management practices.',
  },
  {
    q: 'Chain of custody (řetězec úschovy) dokumentuje pohyb digitálního důkazu od zajištění po soudní projednání.',
    answer: true,
    note: 'Přerušení chain of custody může způsobit nepřijatelnost důkazu u soudu.',
  },
  {
    q: 'TCO (Total Cost of Ownership) zahrnuje pouze pořizovací náklady IT systému.',
    answer: false,
    note: 'TCO zahrnuje pořizovací, provozní, servisní, školicí i náklady na konec životnosti.',
  },
  {
    q: 'V předmětu 4IT418 je Řízení podnikové informatiky zaměřené jen na operativní správu serverů a aplikací.',
    answer: false,
    note: '4IT418 řeší strategickou, taktickou i operativní úroveň: IT strategie, CIO, služby, procesy, zdroje, sourcing, compliance, bezpečnost i kontinuitu.',
  },
  {
    q: 'SLA definuje parametry služby mezi poskytovatelem a odběratelem; OLA je interní dohoda mezi IT týmy a UC je podkladová smlouva s dodavatelem.',
    answer: true,
    note: 'SLA stojí navenek, OLA dovnitř IT, UC vůči externímu dodavateli; všechny musí držet konzistentní závazky služby.',
  },
  {
    q: 'NPV je sazba, při které je čistá současná hodnota projektu rovna nule.',
    answer: false,
    note: 'To je IRR. NPV je součet diskontovaných cash flow; NPV > 0 znamená tvorbu hodnoty.',
  },
  {
    q: 'RTO říká, za jak dlouho musí být služba obnovena; RPO říká, kolik dat si organizace může dovolit ztratit.',
    answer: true,
    note: 'RTO = čas obnovy, RPO = bod obnovy/datová ztráta; obojí vychází z BIA a ovlivňuje cenu řešení.',
  },
  {
    q: 'ISO/IEC 20000 je certifikovatelná norma pro řízení IT služeb, zatímco ITIL je framework best practices.',
    answer: true,
    note: 'ISO 20000 říká požadavky na SMS; ITIL pomáhá prakticky řídit služby a procesy.',
  },
  {
    q: 'DAMA DMBOK (2. vydání) definuje 11 oblastí správy dat (Data Management Knowledge Areas).',
    answer: true,
    note: 'Včetně Data Governance, Data Architecture, Data Quality, Master Data Management aj.',
  },
  {
    q: 'ISO 31000 poskytuje rámec pro řízení jakýchkoli typů organizačních rizik, nejen IT rizik.',
    answer: true,
    note: 'ISO 31000 je obecný standard řízení rizik; ISO 27005 jej aplikuje na informační bezpečnost.',
  },
  {
    q: 'Steganografie skrývá existenci zprávy, zatímco šifrování skrývá obsah zprávy.',
    answer: true,
    note: 'Steganografie = skryje zprávu do nosného média (obrázek, zvuk); šifrování ji učiní nečitelnou.',
  },
  {
    q: 'V ISO 27001 jsou všechny kontroly z Annex A povinné a musí být implementovány bez výjimky.',
    answer: false,
    note: 'Statement of Applicability (SoA) definuje, které kontroly platí; vyloučení musí být zdůvodněno.',
  },
  {
    q: 'GDPR se vztahuje pouze na organizace se sídlem v Evropské unii.',
    answer: false,
    note: 'Extrateritoriální dosah: vztahuje se na jakoukoliv org. zpracovávající data subjektů z EU.',
  },
  {
    q: 'Viable System Model (VSM) Stafforda Beera modeluje životaschopnou organizaci pomocí 5 systémů.',
    answer: true,
    note: 'Systémy 1–5: Operations, Coordination, Intelligence/Audit, Policy, Identity.',
  },
  {
    q: 'COBIT 2019 APO12 je management objective dedikovaný řízení rizik.',
    answer: true,
    note: 'APO12 Managed Risk — identifikace, analýza, odezva a monitoring IT rizik.',
  },
  {
    q: 'Three Lines of Defense (Model tří linií) zahrnuje interní audit jako třetí linii.',
    answer: true,
    note: '1. linie: Management vlastnictví rizik; 2. linie: Risk/Compliance funkce; 3. linie: Interní audit.',
  },
  {
    q: 'SIEM systém primárně slouží k blokování síťového provozu v reálném čase.',
    answer: false,
    note: 'SIEM (Security Information and Event Management) sbírá, koreluje a alertuje; blokování je úloha firewallů/IPS.',
  },
  {
    q: 'Zákon č. 181/2014 Sb. o kybernetické bezpečnosti vymezuje kritickou informační infrastrukturu (KII) a významné informační systémy (VIS).',
    answer: true,
    note: 'ZKB a jeho prováděcí vyhlášky (317/2014 a 82/2018 Sb.) upřesňují povinnosti.',
  },
  {
    q: 'Bow-tie analýza zobrazuje příčiny rizikové události (vlevo) a důsledky (vpravo) současně v jednom diagramu.',
    answer: true,
    note: 'Bow-tie kombinuje fault tree (příčiny) a event tree (důsledky) pro přehled kontrol.',
  },
  {
    q: 'V ERP projektech je cutover plán dokument popisující kroky přechodu z legacy systému na nový ERP v definovaném okně.',
    answer: true,
    note: 'Cutover okno je typicky víkend nebo noční okno, kdy jsou obě systémy paralelně aktivní.',
  },
  {
    q: 'ISO 27001:2022 přidala oproti verzi 2013 nové kontrolní oblasti jako Threat Intelligence a Cloud Security Services.',
    answer: true,
    note: 'ISO 27001:2022 Annex A přepracoval strukturu na 4 témata a přidal 11 nových kontrol.',
  },
  {
    q: 'V systémovém myšlení je zpětnovazební smyčka vždy negativní (stabilizační, balancing).',
    answer: false,
    note: 'Existují i pozitivní (reinforcing/amplifying) smyčky, které zesilují odchylku — např. exponenciální růst.',
  },
  {
    q: 'RASCI matice definuje role: Responsible, Accountable, Supportive, Consulted, Informed.',
    answer: true,
    note: 'Varianta klasické RACI; Supportive = podpora bez primární zodpovědnosti.',
  },
  {
    q: 'V COBIT 2019 mají capability/maturity úrovně rozsah 0–5, kde 0 = neúplný proces.',
    answer: true,
    note: 'Navazuje na ISO/IEC 33000 PAM (Process Assessment Model); 5 = optimalizující.',
  },
  {
    q: 'Metasploit Framework je proprietární komerční nástroj pro penetrační testování.',
    answer: false,
    note: 'Metasploit má open-source komponentu (Metasploit Framework); komerční verze je Metasploit Pro.',
  },
  {
    q: 'NIS2 direktiva (2022/2555) rozšiřuje působnost NIS1 na 18 odvětvových kategorií.',
    answer: true,
    note: 'NIS2 přidává nová odvětví (odpadní vody, kosmický průmysl, ICT služby) a zpřísňuje sankce.',
  },
  {
    q: 'Forenzní obraz disku (forensic image) je identická bitová kopie originálu, ověřená hashem.',
    answer: true,
    note: 'Standardní nástroje (dd, FTK Imager) generují MD5/SHA-256 hash pro ověření integrity.',
  },
  {
    q: 'ITIL 4 Service Value Chain je tvořena 6 aktivitami: Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support.',
    answer: true,
    note: 'Aktivity jsou propojeny a lze je kombinovat do různých hodnotových proudů (value streams).',
  },
  {
    q: 'Nekonformita zjištěná při ISO 27001 certifikačním auditu vždy vede k zamítnutí certifikátu.',
    answer: false,
    note: 'Minor nonconformity vyžaduje nápravné opatření do dalšího auditu; major nonconformity certifikát blokuje.',
  },
  {
    q: 'SOAR (Security Orchestration, Automation and Response) umožňuje automatizovat opakující se bezpečnostní playboky.',
    answer: true,
    note: 'SOAR zkracuje MTTR (Mean Time To Respond) automatizací triáže a odpovědi na incidenty.',
  },
  {
    q: 'Princip separace povinností (Segregation of Duties) zajišťuje, že žádná jedna osoba nemůže zahájit i autorizovat transakci.',
    answer: true,
    note: 'Klíčová kontrola v auditu a finančních systémech; implementována v ERP systémech přes autorizační matice.',
  },
  {
    q: 'GDPR definuje DPO (Data Protection Officer) jako roli, která je povinná pro všechny právnické osoby bez výjimky.',
    answer: false,
    note: 'DPO je povinný jen u orgánů veřejné moci, nebo u org. provádějících rozsáhlé systematické sledování nebo zpracování zvláštních kategorií dat.',
  },

  // ─── IT Governance (4SA310) ───────────────────────────────────
  {
    q: 'ISO/IEC 38500 definuje 6 principů správy IT: Odpovědnost, Strategie, Akvizice, Výkonnost, Shoda a Lidský faktor.',
    answer: true,
    note: 'ISO/IEC 38500 je mezinárodní norma pro Corporate Governance of IT — 6 principů tvoří základ EGIT.',
  },
  {
    q: 'COBIT 2019 pracuje s celkem 11 Design Factors (DF), které slouží k přizpůsobení governance systému konkrétní organizaci.',
    answer: true,
    note: 'DF1–DF11 zahrnují Enterprise Strategy, Risk Profile, Sourcing Model, IT Role aj.',
  },
  {
    q: 'COBIT a ITIL vydává stejná organizace — ISACA.',
    answer: false,
    note: 'COBIT vydává ISACA; ITIL vydává Axelos (UK) / PeopleCert.',
  },
  {
    q: 'Balanced Scorecard (BSC) má 4 perspektivy: Finanční, Zákaznická, Interní procesy a Učení & růst.',
    answer: true,
    note: 'BSC Kaplan & Norton propojuje tyto 4 perspektivy kauzálními vztahy (strategy map).',
  },
  {
    q: 'Val IT je framework komplementární ke COBIT určený pro řízení hodnoty IT investic a rozhodování o IT portfoliu.',
    answer: true,
    note: 'Val IT vydala ISACA; klíčový výstup je Business Case jako nástroj hodnocení IT investice.',
  },
  {
    q: 'EGIT (Enterprise Governance of IT) je synonymem pro operativní IT management.',
    answer: false,
    note: 'EGIT = governance (board level), IT management = operativní řízení (CIO level). Rozdíl jako u COBIT EDM vs. PBRM.',
  },
  {
    q: 'V COBIT 2019 přibyl oproti COBIT 5 nový governance/management objective APO14 Managed Data.',
    answer: true,
    note: 'COBIT 5 → 37 procesů, COBIT 2019 → 40 objectives. Nové: APO14, MEA04, BAI11.',
  },
  {
    q: 'COBIT 2019 Focus Area "Cybersecurity" mění pořadí a prioritu governance objectives dle kontextu organizace.',
    answer: true,
    note: 'Focus Areas poskytují předkonfigurované sady objectives pro specifický kontext (kybernetika, cloud, SME…).',
  },

  // ─── Bezpečnost IS (4SA313) ───────────────────────────────────
  {
    q: 'Asymetrická kryptografie používá stejný klíč pro šifrování i dešifrování.',
    answer: false,
    note: 'Asymetrická kryptografie = pár veřejný/soukromý klíč. Stejný klíč → symetrická kryptografie (AES, 3DES).',
  },
  {
    q: 'RSA je příkladem asymetrického kryptografického algoritmu.',
    answer: true,
    note: 'RSA (Rivest–Shamir–Adleman) je nejrozšířenější asymetrický algoritmus; bezpečnost stojí na složitosti faktorizace.',
  },
  {
    q: 'DDoS útok primárně narušuje Confidentiality (důvěrnost) z triády CIA.',
    answer: false,
    note: 'DDoS narušuje Availability (dostupnost). Confidentiality = úniky dat, Integrity = neoprávněná modifikace.',
  },
  {
    q: 'PKI (Public Key Infrastructure) je systém pro správu a distribuci asymetrických klíčů a certifikátů.',
    answer: true,
    note: 'PKI zahrnuje CA (Certification Authority), CRL (Certificate Revocation List) a OCSP protokol.',
  },
  {
    q: 'SQL injection je útok cílený na databázovou vrstvu aplikace prostřednictvím nezabezpečeného vstupu.',
    answer: true,
    note: 'Obrana: parametrizované dotazy (prepared statements). SQL injection je #1 v OWASP Top 10 dlouhodobě.',
  },
  {
    q: 'OWASP Top 10 je autoritativní seznam 10 nejkritičtějších bezpečnostních rizik webových aplikací.',
    answer: true,
    note: 'OWASP (Open Web Application Security Project) aktualizuje Top 10 každé 3–4 roky.',
  },
  {
    q: 'Phishing je primárně technický exploit na softwarovou zranitelnost.',
    answer: false,
    note: 'Phishing je technika sociálního inženýrství — cílí na lidský faktor, nikoli na technickou zranitelnost.',
  },
  {
    q: 'Zero-day zranitelnost je taková, pro níž ještě neexistuje oprava od výrobce softwaru.',
    answer: true,
    note: '"Zero days" = výrobce má nula dní na vydání opravy; pro útočníky jsou zero-days nejcennějším nástrojem.',
  },

  // ─── Informační management (4SA415) ───────────────────────────
  {
    q: 'KPI (Key Performance Indicator) měří výkonnost procesu; KGI (Key Goal Indicator) měří dosažení výsledku (cíle).',
    answer: true,
    note: 'KPI je průběhový (ex-ante), KGI je výsledkový (ex-post). Obojí nutné — samo KPI neřekne, zda jsme dosáhli cíle.',
  },
  {
    q: 'DIKW model propojuje Data → Informace → Znalosti → Moudrost v hierarchické závislosti.',
    answer: true,
    note: 'Data = fakta bez kontextu; Informace = data v kontextu; Znalosti = porozumění; Moudrost = aplikace znalostí.',
  },
  {
    q: 'CIO (Chief Information Officer) odpovídá primárně za provoz serverovny a síťové infrastruktury.',
    answer: false,
    note: 'CIO odpovídá za IT strategii, alignment s businessem a hodnotu IT. Infrastruktura je zodpovědnost IT manažera/CTO.',
  },
  {
    q: 'Master Data Management (MDM) zajišťuje, aby klíčová podniková data (zákazník, produkt) byla konzistentní napříč systémy.',
    answer: true,
    note: 'MDM řeší problém duplicitních a nekonzistentních master dat v prostředí více IS/ERP/CRM systémů.',
  },
  {
    q: 'EIS (Executive Information System) je primárně určen pro pracovníky na provozní úrovni organizace.',
    answer: false,
    note: 'EIS = pro top management, strategická úroveň (OLAP, trendy). Provozní úroveň = TPS (Transaction Processing System).',
  },
  {
    q: 'OLA (Operational Level Agreement) je vnitřní dohoda v rámci IT oddělení, která podpírá plnění SLA.',
    answer: true,
    note: 'SLA = mezi IT a zákazníkem; OLA = interní dohoda jak IT splní SLA; UC = smlouva s externím dodavatelem.',
  },
  {
    q: 'Paradox produktivity IT (Solow) byl poprvé pozorován v 90. letech 20. stol.',
    answer: false,
    note: 'Solow formuloval paradox v roce 1987; odrážel pokles produktivity v 60.–80. letech navzdory IT investicím.',
  },
  {
    q: 'Balanced Scorecard propojuje perspektivy kauzálními vztahy ve strategy map — zlepšení Learning & Growth vede přes interní procesy k finančním výsledkům.',
    answer: true,
    note: 'Strategy map je klíčový nástroj BSC — vizualizuje kauzální řetězec mezi perspektivami.',
  },

  // ─── Organizace a informace (4SA418) ───────────────────────────
  {
    q: 'TOGAF (The Open Group Architecture Framework) je standard pro enterprise architekturu.',
    answer: true,
    note: 'TOGAF definuje ADM (Architecture Development Method) — cyklický proces pro návrh a řízení EA.',
  },
  {
    q: 'V systémovém myšlení je emergence vlastnost, kdy celek vykazuje vlastnosti, které nelze odvodit z vlastností jeho částí.',
    answer: true,
    note: 'Emergence je klíčový pojem systems thinking — např. vědomí z neuronů, tržní ceny z transakcí.',
  },
  {
    q: 'Kybernetika je věda o řízení a komunikaci v živých organizmech i strojích (Norbert Wiener, 1948).',
    answer: true,
    note: 'Kybernetes (řec.) = kormidelník; kybernetika propojuje biologii, strojírenství a informatiku přes feedback loops.',
  },
  {
    q: 'EPC (Event-driven Process Chain) notace je preferovaný standard pro procesní modelování v ERP R/3 a SolMan.',
    answer: true,
    note: 'EPC pochází z ARIS (IDS Scheer); ERP ji používá pro dokumentaci referenčních modelů v SolMan.',
  },
  {
    q: 'Formální informační systém nemůže existovat bez počítačového hardwaru a softwaru.',
    answer: false,
    note: 'Formální IS = má definovanou strukturu a pravidla; může existovat v papírové podobě (kartotéka je formální IS).',
  },
  {
    q: 'GDPR čl. 22 zakazuje rozhodnutí s právním účinkem basovaná výhradně na automatizovaném zpracování, bez jakékoli výjimky.',
    answer: false,
    note: 'Výjimky existují: souhlas subjektu, nezbytnost pro smlouvu, nebo výslovné povolení právem EU/členského státu.',
  },
  {
    q: 'Cloud computing modely zahrnují IaaS, PaaS a SaaS jako základní delivery modely dle NIST.',
    answer: true,
    note: 'NIST SP 800-145 definuje 3 service models a 4 deployment models (public, private, hybrid, community).',
  },
  {
    q: 'Service-Oriented Architecture (SOA) je architekturní přístup, kde aplikace sdílí funkcionalitu přes standardizovaná rozhraní (services).',
    answer: true,
    note: 'SOA předchůdce microservices; základní principy: loose coupling, interoperability, reusability.',
  },

  // ─── Teorie systémů + etika (4SA420) ──────────────────────────
  {
    q: 'Utilitarismus je etická teorie, která hodnotí správnost jednání podle důsledků pro maximální blaho maxima lidí.',
    answer: true,
    note: 'Utilitarismus (Bentham, Mill) = konsekvencionalistická etika. Hlavní kritika: může obětovat jednotlivce pro kolektiv.',
  },
  {
    q: 'Deontologická etika (Kant) hodnotí správnost jednání primárně podle jeho výsledků a důsledků.',
    answer: false,
    note: 'Deontologie = povinnosti a pravidla jsou správné samy o sobě; důsledky nehrají roli (Kategorický imperativ).',
  },
  {
    q: 'Etika ctnosti (virtue ethics) se zaměřuje na charakter jedince a kultivaci ctností, nikoli na pravidla nebo výsledky.',
    answer: true,
    note: 'Aristoteles; v IT kontextu: jaký IT profesionál bych měl být? Ctnosti: integrita, odpovědnost, empatie.',
  },
  {
    q: '"Tragedy of the commons" popisuje, jak racionální jednotlivci přetíží sdílený zdroj, dokud ho nezničí.',
    answer: true,
    note: 'Garrett Hardin (1968); v IT kontextu: sdílená síťová infrastruktura, commons jako Wikipedia nebo open-source.',
  },
  {
    q: 'VSM (Viable System Model) Stafforda Beera modeluje organizaci prostřednictvím 5 systémů (S1–S5).',
    answer: true,
    note: 'S1=Operations, S2=Coordination, S3=Management, S3*=Audit, S4=Intelligence, S5=Policy.',
  },
  {
    q: 'Wicked problem má jednoznačnou definici a testovatelné řešení, jen je obtížně implementovatelné.',
    answer: false,
    note: 'Wicked problem (Rittel & Webber): nejednoznačná definice, neexistuje "správné" řešení, každý pokus mění problém.',
  },
  {
    q: 'Open systems theory považuje organizaci za systém interagující s prostředím přes vstupy, výstupy a zpětnou vazbu.',
    answer: true,
    note: 'Katz & Kahn (1966); open system vs. closed system — organizace musí reagovat na prostředí, aby přežila.',
  },

  // ─── Sociální informatika (4SA440) ────────────────────────────
  {
    q: 'SCOT (Social Construction of Technology) tvrdí, že design a adopce technologií je výsledkem vyjednávání relevantních sociálních skupin.',
    answer: true,
    note: 'Bijker & Pinch (1984); technologie neuspěje automaticky tou nejlepší cestou — záleží na sociálním konsenzu.',
  },
  {
    q: 'Technický determinismus předpokládá, že technologie autonomně a předvídatelně formuje organizaci bez ohledu na lidské záměry.',
    answer: true,
    note: 'Technický determinismus byl rozšířený pohled tayloristického managementu; sociotechnický přístup ho koriguje.',
  },
  {
    q: 'Tavistock Institute výzkumem v britském uhelném průmyslu prokázal, že optimální výsledky přinese optimalizace technického systému bez ohledu na sociální faktor.',
    answer: false,
    note: 'Tavistock (Eric Trist) naopak prokázal, že mechanizace bez sociotechnické integrace vedla k nízké produktivitě a konfliktům.',
  },
  {
    q: 'UTAUT model zahrnuje 4 prediktory záměru používat technologii: očekávaná výkonnost, úsilí, sociální vliv a usnadňující podmínky.',
    answer: true,
    note: 'Venkatesh et al. (2003); UTAUT je dominantní model v IS výzkumu adopce technologií.',
  },
  {
    q: 'Generace Z je první generací, která vyrůstala výhradně s digitálními technologiemi od narození (digital natives).',
    answer: true,
    note: 'Nar. 1995–2009; Generace X byly "digital immigrants", Mileniálové (Y) jsou na hranici — Generace Z je první čistí digital natives.',
  },
  {
    q: 'CSR (Corporate Social Responsibility) v IT zahrnuje i tzv. "Zelené IT" — ekologické dopady výroby, provozu a likvidace HW.',
    answer: true,
    note: 'IT průmysl je významný spotřebitel energie; Zelené IT zahrnuje přímé (e-waste) i nepřímé (optimalizace logistiky) dopady.',
  },
  {
    q: 'DESI (Digital Economy and Society Index) je index používaný OSN pro hodnocení e-governmentu.',
    answer: false,
    note: 'DESI = Evropská komise; e-Government Development Index (EGDI) = OSN (UN).',
  },
  {
    q: 'Digitální propast (digital divide) má tři dimenze: přístupová, dovednostní a motivační.',
    answer: true,
    note: 'Van Dijk model: 1) fyzický přístup k zařízení, 2) digitální gramotnost, 3) motivace a ochota technologii využívat.',
  },

  // ─── Audit IS (4SA513) ────────────────────────────────────────
  {
    q: 'CISA (Certified Information Systems Auditor) je certifikace vydávaná organizací ISACA.',
    answer: true,
    note: 'ISACA vydává CISA, CISM, CRISC a CGEIT. CISA je nejstarší a nejrozšířenější IS auditorská certifikace.',
  },
  {
    q: 'Forenzní audit je metodologicky totožný s compliance auditem; liší se jen v objektu.',
    answer: false,
    note: 'Forenzní audit má specifické metody (chain of custody, evidence preservation) pro potřeby soudního řízení.',
  },
  {
    q: 'Risk Control Matrix (RACM) propojuje identifikovaná rizika, kontrolní objekty, testovací postupy a výsledky v auditu.',
    answer: true,
    note: 'RACM je hlavní pracovní dokument risk-based auditu; propojuje business rizika s konkrétními kontrolami.',
  },
  {
    q: 'Záporný výrok auditora (adverse opinion) znamená, že organizace nesplňuje kritéria auditu v materiálních aspektech.',
    answer: true,
    note: 'Záporný výrok = důkazy jednoznačně nepotvrzují shodu. Nejsilnější negativní výrok; odlišný od zřeknutí se výroku.',
  },
  {
    q: 'Substantivní audit se zaměřuje na testování transakcí a sald, nikoli na testování kontrol.',
    answer: true,
    note: 'Substantivní = testujeme přímo transakce; control-based = testujeme spolehlivost kontrol, pak redukujeme rozsah substantivního testování.',
  },
  {
    q: 'Zákon č. 320/2001 Sb. o finanční kontrole ukládá povinnost zřídit útvar interního auditu u správců státního rozpočtu.',
    answer: true,
    note: 'Zákon vyžaduje interní audit u orgánů veřejné správy hospodařících s veřejnými prostředky.',
  },
  {
    q: 'ITAF (IT Assurance Framework) od ISACA je nadřazený rámec, který zastřešuje ISACA standardy pro audit a ujištění IS.',
    answer: true,
    note: 'ITAF rozděluje standardy na celopodnikové, IT governance, procesy auditu a řízení IT auditu.',
  },

  // ─── ISMS (4SA515) ────────────────────────────────────────────
  {
    q: 'ISO/IEC 27001:2022 obsahuje v Annex A celkem 93 kontrol organizovaných do 4 tematických oblastí.',
    answer: true,
    note: '4 témata: Organizational (37), People (8), Physical (14), Technological (34) = 93 kontrol. Oproti 114 v 2013.',
  },
  {
    q: 'Statement of Applicability (SoA) musí obsahovat zdůvodnění pro každou VYLOUČENOU kontrolu z Annex A.',
    answer: true,
    note: 'Zahrnuté kontroly = aplikovatelné; vyloučené = musí být zdůvodněny. Auditora SoA zajímá jako klíčový dokument.',
  },
  {
    q: 'RPO (Recovery Point Objective) definuje maximální přijatelnou dobu výpadku systému.',
    answer: false,
    note: 'RPO = max. přijatelná ztráta dat (jak staré zálohy stačí). RTO (Recovery Time Objective) = max. doba výpadku.',
  },
  {
    q: 'BCP (Business Continuity Plan) a DRP (Disaster Recovery Plan) jsou totožné dokumenty.',
    answer: false,
    note: 'BCP = kontinuita celého businessu (people, processes, facilities). DRP = technická obnova IT systémů po havárii. DRP je podmnožina BCP.',
  },
  {
    q: 'ISO/IEC 27005 poskytuje návod pro řízení rizik informační bezpečnosti v kontextu ISO 27001.',
    answer: true,
    note: 'ISO 27005 aplikuje obecný rámec ISO 31000 na specifika informační bezpečnosti.',
  },
  {
    q: 'ISMS certifikace dle ISO 27001 je vždy povinná pro organizace zpracovávající osobní data v EU.',
    answer: false,
    note: 'Certifikace je dobrovolná; GDPR ji nevyžaduje. Certifikaci mohou vyžadovat zákazníci nebo smluvní požadavky.',
  },
  {
    q: 'Threat intelligence umožňuje organizaci proaktivně sdílet a využívat znalosti o aktuálních hrozbách a taktikách útočníků.',
    answer: true,
    note: 'STIX/TAXII jsou standardy pro sdílení threat intelligence. ISO 27001:2022 přidal Threat Intelligence jako novou kontrolu.',
  },
  {
    q: 'CSIRT (Computer Security Incident Response Team) odpovídá za strategické plánování bezpečnosti v organizaci.',
    answer: false,
    note: 'CSIRT = operativní tým pro řešení incidentů. Strategická bezpečnost = CISO. CSIRT může být interní nebo národní (NÚKIB).',
  },

  // ─── Project Governance + ERP (4SA516) ────────────────────────
  {
    q: 'PMBOK (Project Management Body of Knowledge) je vydáván organizací PMI (Project Management Institute).',
    answer: true,
    note: 'PMBOK 7th edition (2021) přešel na principy místo procesů; PMI vydává i PMP certifikaci.',
  },
  {
    q: 'ERP Activate metodologie je primárně určena pro moderním ERP Cloud implementace a staví na principu Fit-to-Standard.',
    answer: true,
    note: 'Fit-to-Standard = organizace přizpůsobuje procesy ERP best practice, nikoli ERP systém firemním procesům.',
  },
  {
    q: 'Steering Committee v IT projektu odpovídá za každodenní operativní řízení projektu.',
    answer: false,
    note: 'Steering Committee = strategická/taktická úroveň (schvalování, eskalace). Denní řízení = Projektový manažer.',
  },
  {
    q: 'BPMN Gateway typu AND (Parallel) způsobí, že všechny odchozí tokeny se vykonají paralelně.',
    answer: true,
    note: 'AND-split = všechny větve paralelně; XOR-split = právě jedna větev; OR-split = jedna nebo více větví.',
  },
  {
    q: 'V metodologii PRINCE2 je Project Board zodpovědný za každodenní projektové řízení.',
    answer: false,
    note: 'Project Board = executive oversight (sponzor, senior supplier, senior user). PM = denní řízení.',
  },
  {
    q: 'TCO (Total Cost of Ownership) zahrnuje celý životní cyklus IT systému včetně nákladů na jeho konec životnosti.',
    answer: true,
    note: 'TCO = pořizovací + provozní + rozvojové + likvidační náklady. Pořizovací cena je typicky jen 20–30 % TCO.',
  },
  {
    q: 'ERP systémy jsou navrženy primárně pro jeden funkční modul (např. jen účetnictví), nikoli pro integraci napříč firmou.',
    answer: false,
    note: 'ERP (Enterprise Resource Planning) integruje procesy napříč celou organizací — finance, logistika, HR, výroba.',
  },

  // ─── Digitální forenzní analýza (4SA540) ──────────────────────
  {
    q: 'Při zajišťování digitálních důkazů mají volatilní data (RAM) vyšší prioritu než nevolatilní (disky).',
    answer: true,
    note: 'Pořadí volatility (RFC 3227): RAM → cache → swap → disk → zálohy. RAM se ztratí vypnutím.',
  },
  {
    q: 'Hash funkce MD5 je v současnosti doporučena pro ověření integrity forenzních obrazů.',
    answer: false,
    note: 'MD5 je kryptograficky prolomena (kolize). Pro forenzní práci se doporučuje SHA-256 nebo SHA-3.',
  },
  {
    q: 'FTK Imager je nástroj pro vytváření bitových kopií digitálních médií bez modifikace zdrojového média.',
    answer: true,
    note: 'FTK Imager (AccessData) vytváří E01/DD image; vždy přes write blocker; generuje hash pro verifikaci integrity.',
  },
  {
    q: 'UEFI rootkit může přežít přeinstalaci operačního systému, protože se ukrývá ve firmware základní desky.',
    answer: true,
    note: 'UEFI malware (např. LoJax, MosaicRegressor) přežívá reinstalaci OS i výměnu disku; vyžaduje flash firmware.',
  },
  {
    q: 'Metadata souboru (datum vytvoření, modifikace, přístupu) jsou právně nefalzifikovatelným důkazem.',
    answer: false,
    note: 'Metadata lze snadno modifikovat nástroji nebo změnou systémového času; jako důkaz mají pouze podpůrnou hodnotu.',
  },
  {
    q: 'RFC 3227 "Guidelines for Evidence Collection and Archiving" definuje pořadí volatility a zásady sběru digitálních důkazů.',
    answer: true,
    note: 'RFC 3227 je základní referenční dokument pro forenzní sběr dat; definuje order of volatility.',
  },
  {
    q: 'Steganografie skrývá samotnou existenci tajné zprávy, na rozdíl od šifrování, které skrývá obsah zprávy.',
    answer: true,
    note: 'Steganografie = schovaná zpráva v nosném médiu (obrázek, audio) — zpráva není viditelná. Šifrování = obsah je nečitelný, ale existence šifrované zprávy je viditelná.',
  },

  // ─── Řízení rizik (4SA551) ────────────────────────────────────
  {
    q: 'Rizikový apetit (risk appetite) vyjadřuje celkovou míru rizika, kterou je organizace ochotna akceptovat při dosahování svých cílů.',
    answer: true,
    note: 'Risk appetite ≠ risk tolerance (operativní hranice). Apetit schvaluje board; tolerance nastavuje management.',
  },
  {
    q: 'Bow-tie analýza rizika kombinuje fault tree (příčiny) na levé straně s event tree (důsledky) na pravé straně.',
    answer: true,
    note: 'Bow-tie vizualizuje hrozby, preventivní kontroly, rizikovou událost a zmírňující kontroly v jednom diagramu.',
  },
  {
    q: 'Kvantitativní metody hodnocení rizik (Monte Carlo, ALE) vždy poskytují přesnější výsledky než kvalitativní.',
    answer: false,
    note: 'Kvantitativní vyžadují spolehlivá historická data; v IS/IT jsou tato data často nedostupná. Kvalitativní je pak přesnější než špatně podložená kvantifikace.',
  },
  {
    q: 'COSO ERM (2017) framework pro enterprise risk management definuje 5 komponent a 20 principů.',
    answer: true,
    note: 'COSO ERM 2017: Governance & Culture, Strategy & Objective-Setting, Performance, Review & Revision, Information & Reporting.',
  },
  {
    q: 'Reziduální riziko je riziko zbývající po aplikaci všech plánovaných kontrol a protiopatření.',
    answer: true,
    note: 'Inherentní riziko → po kontrolách → reziduální riziko. Cílem je dostat reziduální riziko pod risk appetite.',
  },
  {
    q: 'Monte Carlo simulace je deterministická metoda, která vždy produkuje stejný výsledek pro stejné vstupy.',
    answer: false,
    note: 'Monte Carlo je pravděpodobnostní (stochastická) simulace — generuje distribuci výsledků náhodným vzorkováním z rozdělení vstupních proměnných.',
  },
  {
    q: 'ISO 31000:2018 je universálně aplikovatelný rámec pro řízení rizik; není limitován na IT ani bezpečnostní rizika.',
    answer: true,
    note: 'ISO 31000 = obecný risk management. ISO 27005 jej aplikuje na informační bezpečnost; ISO 31010 na techniky hodnocení rizik.',
  },
]

export const BOSS_BANK: BossQuestion[] = [
  {
    okruh: 1,
    title: 'IT Governance: COBIT vs. ITIL',
    q: 'Vysvětlete, jak COBIT 2019 a ITIL 4 vzájemně doplňují v organizaci — co pokrývá každý rámec a kde se překrývají. Jak byste je integrovali v rámci celkového IT governance modelu?',
    modelAnswer: 'COBIT 2019 a ITIL 4 jsou komplementární frameworky — COBIT pokrývá celé IT governance a management spectrum prostřednictvím 40 objectives v doménách EDM (governance) a APO/BAI/DSS/MEA (management), přičemž definuje, CO musí IT dosáhnout a jak výsledky měřit. ITIL 4 se specializuje na service management a poskytuje konkrétní implementační praxis: 34 practices sdružených do Service Value System s Service Value Chain jako operačním jádrem. Překryv je nejvýraznější v COBIT doménách DSS (Deliver, Service and Support) a BAI (Build, Acquire and Implement), kde ITIL practices nabízejí detailní postup pro to, co COBIT definuje na úrovni outcomes. V praxi se COBIT nasazuje jako strategická střecha — governance model schválený boardem, s KGI/KPI pro objectives — a ITIL jako implementační metodika pro service management procesy pod ním. Integrace v governance modelu tedy vypadá takto: COBIT stanoví cíle (např. DSS02: Managed Service Requests and Incidents) a ITIL Incident Management practice definuje, jak konkrétně tento cíl naplnit.',
  },
  {
    okruh: 2,
    title: 'IT Management: Procesní zralost',
    q: 'Organizace chce zlepšit řízení IT služeb. Jak byste provedli assessment zralosti procesů dle COBIT 2019 a nastavili priority pro zlepšení? Jaká jsou praktická úskalí implementace?',
    modelAnswer: 'Assessment procesní zralosti dle COBIT 2019 začíná výběrem scopu pomocí Design Factors — organizace identifikuje svou strategii, rizikový profil a relevantní Focus Area (např. Cybersecurity nebo Cloud), z níž odvodí prioritní objectives k měření. Samotný assessment pracuje s capability scale 0–5 dle ISO/IEC 33000: pro každé vybrané objective se sbírají důkazy — procesní dokumentace, záznamy z provozu, výsledky strukturovaných interview s process owners a evidence o dosahování outcomes. Výsledkem je profil zralosti (heatmapa objectives vs. úroveň), který se porovnává s cílovou úrovní odvozenou z business a IT strategie. Priority zlepšení se nastavují kombinací tří kritérií: gap mezi aktuální a cílovou úrovní, business dopad daného objective a dostupné zdroje. Praktická úskalí jsou: absence sponzora z top managementu (assessment bez buy-inu je jen akademické cvičení), přílišný scope (doporučuji 10–15 objectives, ne všech 40), a tendence nadhodnocovat vlastní zralost při self-assessmentu — proto je vhodné kombinovat interní hodnocení s externím validačním auditem.',
  },
  {
    okruh: 3,
    title: 'ISMS: Cesta k ISO 27001',
    q: 'Organizace se rozhodla implementovat ISMS a získat ISO 27001 certifikaci. Popište kroky PDCA cyklu, strukturu Statement of Applicability a co auditora nejvíce zajímá při Stage 2 auditu.',
    modelAnswer: 'Implementace ISMS dle ISO/IEC 27001 probíhá v PDCA cyklu: ve fázi Plan se definuje rozsah ISMS, provede se risk assessment dle ISO 27005 (identifikace aktiv, hrozeb, zranitelností, výpočet rizika) a zpracuje Statement of Applicability — dokument, který pro každou z 93 kontrol Annex A uvádí, zda je aplikovatelná, a pokud ne, zdůvodnění vyloučení. Ve fázi Do se implementují vybrané kontroly, školí zaměstnanci a zavedou provozní procedury. Check zahrnuje interní audit ISMS a management review. Act zpracovává nápravná opatření k nalezené nekonformitě. Při Stage 2 certifikačním auditu auditora nejvíce zajímá: reálné fungování kontrol (nejen dokumentace, ale záznamy o jejich provádění), aktuální rizikový registr s odezvami na rizika, záznamy z interních auditů a management review, a důkazy o fungování nápravných opatření. Klíčová chyba organizací je, že mají krásnou dokumentaci, ale kontroly reálně nefungují nebo nejsou zaznamenávány.',
  },
  {
    okruh: 4,
    title: 'Legislativa: Únik dat',
    q: 'Organizace zpracovávající osobní data utrpí útok a dojde k úniku dat 50 000 zákazníků. Popište všechny zákonné povinnosti — kdo musí být informován, do kdy a co hrozí za nesplnění.',
    modelAnswer: 'Při úniku osobních dat 50 000 zákazníků nastávají souběžné povinnosti ze dvou předpisů. Dle GDPR čl. 33 musí správce osobních dat ohlásit incident dozorovému úřadu — v ČR Úřadu pro ochranu osobních údajů (ÚOOU) — do 72 hodin od zjištění, pokud existuje pravděpodobné riziko pro práva a svobody fyzických osob. Dle čl. 34 musí správce bez zbytečného odkladu informovat i samotné dotčené subjekty údajů, pokud je riziko vysoké (tzn. může způsobit fyzickou, materiální nebo nemateriální újmu). Hlášení musí obsahovat: popis incidentu, kategorie a přibližný počet dotčených osob, kontakty na DPO, pravděpodobné důsledky a přijatá opatření. Pokud je organizace provozovatelem KII nebo VIS dle zákona č. 181/2014 Sb. (ZKB), nastává souběžně i povinnost hlásit kybernetický bezpečnostní incident NÚKIB ve lhůtách stanovených vyhláškou (typicky do 24 hodin pro detekci, do 72 hodin pro podrobné hlášení). Sankce za porušení GDPR jsou až 4 % celkového ročního obratu nebo 20 milionů EUR, zákon ZKB umožňuje uložit správní pokutu až do výše 100 000 Kč v přestupkovém řízení.',
  },
  {
    okruh: 7,
    title: 'Rizika: Ransomware Bow-Tie',
    q: 'Proveďte bow-tie analýzu pro riziko ransomwarového útoku na organizaci: identifikujte min. 3 příčiny (threat sources), preventivní kontroly, rizikovou událost, zmírňující kontroly a min. 3 důsledky.',
    modelAnswer: 'Bow-tie analýza ransomwarového rizika strukturuje pohled na hrozbu od příčin přes událost k důsledkům. Na levé straně (příčiny/threat sources) identifikujeme: 1) phishingový e-mail s maliciózní přílohou, 2) zneužití zranitelného VPN nebo RDP s výchozím heslem, 3) kompromitovaný dodavatel s přístupem do sítě (supply chain). Preventivní kontroly bránící vzniku události: patch management a vulnerability scanning, vícefaktorová autentizace (MFA), segmentace sítě, uživatelské povědomí (security awareness training) a EDR na koncových stanicích. Riziková událost uprostřed: šifrování dat ransomwarem a zobrazení výzvy k výkupnému. Zmírňující kontroly na pravé straně (po události): offline a offsite zálohy otestované obnovením, incident response plán s předem definovanými playbooky, cyber pojištění a izolace zasažených systémů. Důsledky: 1) výpadek provozu (přímé finanční ztráty z downtime), 2) ztráta nebo únik dat (GDPR/ZKB povinnosti), 3) reputační škoda a ztráta důvěry zákazníků. Bow-tie vizualizuje, že efektivní obrana kombinuje controls na obou stranách — prevenci nelze oddělit od resilience.',
  },
  {
    okruh: 8,
    title: 'SOC: Lifecycle incidentu',
    q: 'Popište kompletní lifecycle bezpečnostního incidentu v prostředí SOC — od detekce alertu v SIEM přes triáž, SOAR automatizaci, eskalaci až po post-incident review a threat intel feedback.',
    modelAnswer: 'Lifecycle bezpečnostního incidentu v SOC začíná generováním alertu v SIEM systému — SIEM koreluje logy z různých zdrojů (firewall, EDR, proxy, AD) a při splnění korelačního pravidla vytvoří alert. L1 analytik provede triáž: určí, zda jde o false positive nebo skutečný incident, a klasifikuje závažnost. Pokud je incident opakovaný nebo dobře definovaný, SOAR automatizuje prvotní response kroky podle playbooku (izolace koncového bodu, blokování IP, sběr forenzních artefaktů). Komplexnější incidenty eskaluje L2 analytik, který provádí hloubkovou analýzu příčiny (root cause analysis), navrhuje containment a eradication kroky. Recovery zahrnuje obnovu systémů do known-good stavu a ověření, že hrozba je eliminována. Po uzavření incidentu probíhá Post-Incident Review (PIR): co bylo detekováno, jak rychle (MTTD — Mean Time to Detect), jak rychle bylo odezváno (MTTR — Mean Time to Respond), co zlepšit v playboocích. Threat intelligence feedback uzavírá smyčku: IoC extrahované z incidentu (hashe malwaru, C2 domény, IP) se integrují do SIEM korelačních pravidel a sdílejí přes STIX/TAXII do threat intelligence platformy.',
  },
  {
    okruh: 9,
    title: 'Forensics: Post-Ransomware Investigation',
    q: 'Vaše organizace zjistila ransomwarový útok. Popište forenzní postup: zajištění důkazů, analýzu útočného vektoru, rekonstrukci supertimeline a obsah výstupní forenzní zprávy.',
    modelAnswer: 'Po zjištění ransomwarového útoku je prvním krokem zajištění důkazů před jakoukoliv sanací — vytvoření bit-by-bit forensic image zasažených disků nástrojem FTK Imager nebo dd, vždy přes write blocker, s výpočtem MD5/SHA-256 hashe pro ověření integrity kopie. Paralelně je nutné zachytit volatilní data: RAM dump ze zasažených systémů (obsahuje dešifrovací klíče, síťová spojení, procesy) a exportovat Windows Event Logy a síťové flow data ze SIEM. Analýza útočného vektoru se zaměřuje na: Windows Event Log (Event ID 4624 = logon, 4698 = scheduled task creation, 7045 = service installation), registry hives (HKCU\Software\Microsoft\Windows\CurrentVersion\Run pro persistence), MFT (Master File Table) pro timeline změn souborů a Prefetch soubory pro spuštěné procesy. Supertimeline se rekonstruuje nástrojem log2timeline/plaso — agreguje eventy ze všech zdrojů do chronologického pohledu a pomáhá identifikovat: kdy útočník vstoupil, jak se laterálně pohyboval, kdy spustil ransomware. Výstupní forenzní zpráva obsahuje: executive summary pro management (popis útoku, dopad, doporučení), technickou část (timeline útoku, IoC, forensic methodology), a přílohy (hashes, kopie log excerptů, screenshot evidence).',
  },
  {
    okruh: 12,
    title: 'ERP: ERP Implementace',
    q: 'Organizace zahajuje implementaci moderním ERP. Identifikujte 5 klíčových projektových rizik a navrhněte, jak je adresovat v rámci projektového řízení a change management plánu.',
    modelAnswer: '5 klíčových rizik moderním ERP implementace a jejich ošetření: 1) Scope creep — riziko postupného rozšiřování požadavků nad rámec projektu; ošetření: striktní change request proces, frozen scope po fázi Explore v ERP Activate metodologii, steering committee schvalující každou změnu. 2) Kvalita datové migrace — nekvalitní master data (materiálový číselník, zákaznická databáze) vedou k chybám po go-live; ošetření: data cleansing projekt paralelně s implementací, test migrace v sandbox systému, akceptační kritéria pro datovou kvalitu před cutover. 3) User adoption — odpor zaměstnanců ke změně pracovních procesů; ošetření: ADKAR change management model, identifikace superuserů v každé businessové jednotce, training program zahájený 6 týdnů před go-live. 4) Integrace se stávajícími systémy — rozhraní se systémy třetích stran (WMS, CRM, BI) jsou časově náročná a náchylná k chybám; ošetření: early interface design workshop, Integration Factory s reusable interface templates. 5) IT kapacita — projektový tým je přetížen souběžnou provozní odpovědností; ošetření: dedikovaný projektový tým (min. 50 % FTE), temporary backfill na provozní pozice. Change management plán musí pokrývat komunikaci (proč S/4HANA, co se změní), training (role-based, ne generický) a post-go-live support (hypercare period 4–8 týdnů).',
  },
  {
    okruh: 21,
    title: 'Systémové myšlení: Zdravotnická organizace',
    q: 'Aplikujte systémové myšlení na analýzu nemocnice jako komplexního systému: identifikujte klíčové zpětnovazební smyčky, emergentní vlastnosti a ukažte, jak by VSM mohl pomoci při diagnostice organizačních dysfunkcí.',
    modelAnswer: 'Nemocnice je paradigmatický příklad komplexního adaptivního systému — vzájemně závislé subsystémy (ambulance, lůžková oddělení, diagnostika, management) vytvářejí chování, které nelze předvídat z analýzy jednotlivých částí. Klíčové zpětnovazební smyčky: pozitivní (reinforcing) smyčka — zvýšená kapacita → kratší čekací doby → vyšší poptávka pacientů → přetížení → delší čekací doby (R1 smyčka growth/collapse); negativní (balancing) smyčka — zvýšení počtu lékařů → kratší čekací doby → rovnováha poptávky a kapacity (B1). Emergentní vlastnosti — kvalita péče a reputation nemocnice — vznikají jako systémové vlastnosti interakcí stovek procesů; nelze je řídit přímou intervencí, pouze nastavením podmínek. Viable System Model (VSM) Stafforda Beera aplikovaný na nemocnici: S1 = klinická oddělení (operations, přímá péče), S2 = koordinace mezi odděleními (sdílení zdrojů, plánování oper. sálů), S3 = management nemocnice (SLA metriky, kapacitní řízení), S4 = strategická intelligence (demografické trendy, technologický vývoj, regulace), S5 = etika a identita (hodnoty organizace, vztah ke zřizovateli). Diagnostika VSM odhalí typické dysfunkce: chybějící S2 (oddělení nekomunikují a duplikují zdroje), přetížené S3 (management řeší operativní problémy místo strategických) nebo hluchý S4 (absence strategického plánování).',
  },
  {
    okruh: 24,
    title: 'Sociální informatika: AI v e-governmentu',
    q: 'Jaké etické, bezpečnostní a sociální výzvy přináší nasazení AI v e-governmentu (automatizovaná rozhodnutí, prediktivní policing, sociální scoring)? Navrhněte principy zodpovědného AI governance frameworku.',
    modelAnswer: 'Nasazení AI v e-governmentu přináší tři kategorie výzev. Etické: algoritmická diskriminace — model trénovaný na historických datech reprodukuje systémové předsudky (např. při přidělování sociálních dávek nebo posuzování recidivy); accountability gap — kdo odpovídá za chybné automatizované rozhodnutí státu? Bezpečnostní: adversarial attacks na klasifikační modely, otrávení trénovacích dat, single point of failure při centralizaci. Sociální: digital divide — část populace nemá přístup ani kompetence, aby se s digitálním státem dorozuměla; chilling effect — pocit sledování mění chování občanů. Principy zodpovědného AI governance frameworku pro e-government: 1) Transparentnost a vysvětlitelnost — každé automatizované rozhodnutí musí být vysvětleno srozumitelným jazykem (požadavek GDPR čl. 22, EU AI Act); 2) Human-in-the-loop — pro rozhodnutí s vysokým dopadem na jednotlivce povinný human review; 3) Fairness testing — pravidelný audit na diskriminaci v chráněných charakteristikách před nasazením i v provozu; 4) Proporcionální klasifikace rizik — AI Act definuje nepřijatelné (sociální scoring), high-risk (justice, employment) a low-risk systémy s odpovídajícími požadavky; 5) Participativní governance — zapojení dotčených komunit do návrhu systémů. V ČR rámec doplňuje zákon č. 300/2008 Sb. o el. úkonech a povinnosti GDPR pro automatizované zpracování.',
  },
  {
    okruh: 5,
    title: 'ISMS: Risk Assessment v praxi',
    q: 'Proveďte risk assessment dle ISO 27005 pro scénář: firma provozuje on-premise ERP s citlivými finančními daty. Jak identifikujete aktiva, hrozby a zranitelnosti a jak vypočítáte riziko?',
    modelAnswer: 'Risk assessment dle ISO 27005 probíhá v krocích: 1) Identifikace aktiv — ERP server (HW), ERP aplikace a licence (SW), databáze finančních dat (informační aktivum), klíčoví ERP administrátoři (personální aktivum). Každé aktivum dostane hodnotu (Low/Medium/High/Critical) dle dopadu na CIA. 2) Identifikace hrozeb — pro ERP: ransomware (hrozba dostupnosti a integrity), insider threat (privilegovaný přístup), SQL injection přes webové rozhraní, fyzická krádež serveru. 3) Identifikace zranitelností — zastaralé ERP patche, sdílené administrátorské účty, absence MFA pro vzdálený přístup, nešifrovaná záloha. 4) Výpočet rizika: Risk = Pravděpodobnost × Dopad. Pravděpodobnost = kombinace hrozby a zranitelnosti (jak snadno může hrozba využít zranitelnost); Dopad = hodnota aktiva × závažnost dopadu na CIA. V praxi se používá matice 3×3 nebo 5×5 (Low/Medium/High × Low/Medium/High = rizikové skóre). 5) Evaluace rizika — porovnání s risk appetite; rizika nad threshold vyžadují ošetření (accept, avoid, transfer, mitigate). Klíčový výstup: risk registr s prioritizovanými riziky a navrhovanými opatřeními, schválený managementem.',
  },
  {
    okruh: 6,
    title: 'IT Audit: Risk-based přístup',
    q: 'Vysvětlete, jak se konstruuje Risk Control Matrix (RACM) v IT auditu. Jak se liší risk-based audit od compliance auditu a kdy použít který přístup?',
    modelAnswer: 'Risk Control Matrix (RACM) je ústřední pracovní dokument risk-based IT auditu. Sloupce matice: Business Process (auditovaná oblast), Riziko (co hrozí při selhání), Kontrolní cíl (co má kontrola zajistit), Kontrola (konkrétní mechanismus — politika, procedura nebo technická kontrola), Test (jak auditor ověří existenci a efektivnost kontroly), Reference (COBIT/COSO/ISO pro benchmarking), Výsledek testu, Nález. Stavba RACM začíná risk assessment — auditor provede interview s process owners, prostuduje dokumentaci, identifikuje klíčová rizika pro danou oblast a seřadí je dle materiality. Teprve pak pro každé materiální riziko definuje kontrolu a test. Risk-based audit vs. compliance audit: compliance audit ověřuje shodu s konkrétní normou/zákonem — výsledkem je binární verdikt shoda/neshoda s citovaným požadavkem; vhodný při regulatorní povinnosti (GDPR, ZKB, SOX). Risk-based audit alokuje auditní zdroje úměrně riziku — oblasti s nižším rizikem dostávají menší rozsah testování; vhodný pro interní audit jako efektivnější využití omezených zdrojů. V praxi kombinujeme oba: compliance audit pokryje regulatorní povinnosti, risk-based přístup určí priority.',
  },
  {
    okruh: 10,
    title: 'Digitální forensika: Analýza kompromitovaného systému',
    q: 'Administrátor zjistil neobvyklé síťové spojení z interního serveru na neznámou IP adresu. Popište forenzní postup od první reakce po sestavení timeline útoku.',
    modelAnswer: 'Forenzní postup začíná izolací bez vypnutí — server izolujeme od sítě (odpojení kabelu nebo firewall blokace), ale nevypínáme, abychom zachovali volatilní data. Prvním krokem je sběr volatilních dat: RAM dump nástrojem WinPmem nebo DumpIt (obsahuje running procesy, síťová spojení, dešifrovací klíče v paměti), export netstat (aktuální spojení), seznam procesů (tasklist), registry (startup keys). Teprve poté vytvoříme bitový forensic image disků přes write blocker (FTK Imager), výpočet SHA-256 hashe pro chain of custody. Analýza síťového spojení: Sysmon logy (Event ID 3 = NetworkConnect), DNS logy (lookup na neznámou doménu), proxy logy (HTTP/S komunikace). Prozkoumáme indikátory kompromice (IoC): neznámé procesy v autorunu (HKCU/HKLM Run), nové scheduled tasky (Event ID 4698), neočekávané service instalace (Event ID 7045), VT lookup hashů podezřelých souborů. Supertimeline rekonstruujeme nástrojem plaso/log2timeline — agreguje MFT změny, event logy, prefetch, registry hives do chronologického pohledu. V timeline hledáme: initial access (kdy a jak útočník vstoupil), persistence mechanismus, lateral movement, data staging a exfiltraci. Výstupní zpráva: executive summary s časem útoku, vektorem kompromice a doporučenými opatřeními.',
  },
  {
    okruh: 11,
    title: 'Řízení rizik: ERM program',
    q: 'Organizace chce zavést Enterprise Risk Management (ERM) program. Jak byste postupovali dle COSO ERM 2017? Jaké jsou typické překážky při implementaci a jak je překonat?',
    modelAnswer: 'Implementace ERM programu dle COSO ERM 2017 probíhá ve 4 fázích. 1) Governance a kultura: získání buy-inu boardu a CEO, jmenování Chief Risk Officer (CRO) nebo přiřazení risk funkce CFO/CIO, definice risk appetite statementu (schvaluje board), komunikace risk kultury — "rizika nejsou tabu, jsou součástí rozhodování". 2) Nastavení strategie a cílů: propojení ERM s business strategií — pro každý strategický cíl identifikujeme klíčová rizika, která by mohla zabránit jeho dosažení; definice risk tolerance na úrovni business unit. 3) Výkon: centrální risk registr přístupný managementu, pravidelné risk workshops s business owners (bottom-up identifikace), kombinace kvantitativních metod (pro měřitelná rizika) a kvalitativních (heat map pro strategická rizika), integrace s business procesem — risk assessment jako součást project gates a investičních rozhodnutí. 4) Review a reporting: čtvrtletní reporting boardu, key risk indicators (KRI) v management dashboardu, eskalační procedury pro nová materiální rizika. Typické překážky: silový odpor middle managementu (risk reporting = blame game) — řešení: kultura without-blame reporting; přílišná byrokratizace (risk registr jako Excel soubor, který nikdo nečte) — řešení: light-weight GRC nástroj integrovaný do běžného managementu; absence CRO kapacity — řešení: risk champions v business jednotkách.',
  },
  {
    okruh: 13,
    title: 'ERP: Integrace a architektura',
    q: 'Organizace integruje moderním ERP s CRM systémem třetí strany a WMS. Jaké integrační přístupy existují, jaká jsou rizika a co je ERP Integration Suite?',
    modelAnswer: 'Integrační přístupy: 1) Point-to-point (P2P) — přímé rozhraní mezi dvěma systémy; jednoduché pro 2–3 systémy, ale s růstem počtu integrací exponenciálně narůstá komplexita (n×(n-1)/2 spojení pro n systémů) — "spaghetti integrace". 2) Hub-and-spoke (middleware, ESB) — centrální integrační platforma zprostředkovává komunikaci; jednodušší správa, single point of failure. 3) Event-driven architecture (EDA) — systémy komunikují přes události (events/messages) asynchronně; odolnější, škálovatelné. ERP Integration Suite (dříve ERP Cloud Platform Integration / HCI) je iPaaS platforma od ERP pro hybridní integrace: obsahuje předpřipravené integrační balíčky (Integration Content) pro standardní ERP-to-ERP i ERP-to-third-party scénáře, B2B integraci (EDI), API management a event brokerování. Rizika ERP integrace: datová nekonzistence (různé reprezentace zákaznického ID v ERP a CRM), duplicitní master data (zákazník existuje v obou systémech jinak), latence (real-time vs. batch synchronizace), error handling (co se stane, když integrační platforma spadne), testování (end-to-end integrační testy jsou komplexní). Doporučení: definovat single system of record pro každý datový objekt (kdo vlastní zákaznická data?), verzovat integrační rozhraní, implementovat monitoring integrací s alertingem na chyby.',
  },
  {
    okruh: 14,
    title: 'Enterprise architektura a TOGAF',
    q: 'Co je TOGAF ADM a jaké jsou jeho fáze? Jak EA pomáhá při transformaci IT infrastruktury a jaká je role Enterprise Architekta?',
    modelAnswer: 'TOGAF (The Open Group Architecture Framework) ADM (Architecture Development Method) je cyklický proces pro vývoj a správu enterprise architektury. Fáze: Preliminary (příprava organizace, definice principů), A: Architecture Vision (scope, stakeholders, vision), B: Business Architecture (procesy, organizace, business capabilities), C: Information Systems Architecture (data a aplikace), D: Technology Architecture (infrastruktura, HW/SW), E: Opportunities & Solutions (roadmap, iniciativy), F: Migration Planning (detailní plán migrace), G: Implementation Governance (dohled nad realizací), H: Architecture Change Management (správa změn architektury). Výstupem ADM je Architecture Repository — dokumentace architekturních rozhodnutí, principů, standardů a roadmapy. Enterprise Architekt je most mezi businessem a IT: překládá business strategii do technologické roadmapy, identifikuje redundance a nekonzistence v IT krajině, definuje standardy (technology stack, integration patterns), hodnotí investiční záměry z architekturního hlediska a zajišťuje, aby nové systémy byly kompatibilní s cílovou architekturou. EA pomáhá při transformaci tím, že: mapuje as-is architektu, definuje to-be cílový stav, identifikuje gap a navrhuje transformační kroky. Bez EA vzniká "accidental architecture" — technologie nakoupené bez koordinace vedou k neintegrovaným silos.',
  },
  {
    okruh: 15,
    title: 'Bezpečnost sítí: Zero Trust architektura',
    q: 'Co je Zero Trust Security Model? Jak se liší od perimeter-based bezpečnosti a jaké jsou praktické kroky jeho implementace v enterprise prostředí?',
    modelAnswer: 'Zero Trust je bezpečnostní paradigma postavené na principu "Never trust, always verify" — žádný uživatel, zařízení ani síťový segment není implicitně důvěryhodný, a to ani uvnitř podnikové sítě. Kontrast s perimeter-based bezpečností (castle-and-moat): tradiční model předpokládá, že "inside = trusted, outside = untrusted". Jakmile útočník pronikne skrze perimetr (firewall, VPN), má volný pohyb po interní síti (lateral movement) — přesně tak fungovaly útoky jako SolarWinds nebo Colonial Pipeline. Zero Trust přístupy: 1) Identity-centric — každý přístup vyžaduje silnou autentizaci (MFA), autorizaci dle principu least privilege a kontinuální ověřování (ne jen při přihlášení). 2) Mikrosegmentace — síť rozdělena na malé segmenty s explicitní politikou; kompromitace jednoho segmentu neohrozí ostatní. 3) Device trust — přístup povolen jen z důvěryhodných, spravovaných zařízení (MDM, endpoint compliance check). 4) Continuous monitoring — každá transakce, přihlášení a datový přístup jsou logovány a analyzovány (SIEM/UEBA). Praktické implementační kroky: 1) Inventarizace aktiv a identit; 2) Nasazení MFA pro všechny přístupy; 3) Implementace Identity & Access Management (IAM) s role-based access; 4) Mikrosegmentace crítickcých segmentů; 5) Nasazení CASB pro cloud; 6) Continuous monitoring. Klíčová výzva: Zero Trust je journey, ne produkt — změna kultury a procesů je náročnější než technická implementace.',
  },
  {
    okruh: 16,
    title: 'Kryptografie: Hybridní šifrování a PKI',
    q: 'Vysvětlete, proč se v praxi používá hybridní šifrování místo čistě asymetrického. Jak funguje TLS handshake? Jaká jsou rizika pro PKI infrastrukturu?',
    modelAnswer: 'Asymetrická kryptografie (RSA, ECC) je výpočetně ~1000× pomalejší než symetrická (AES). Čistě asymetrické šifrování velkého objemu dat je prakticky nepoužitelné. Hybridní šifrování kombinuje výhody obou: asymetrickým klíčem (příjemcův veřejný klíč) se zašifruje pouze dočasný symetrický klíč (session key), samotná data se šifrují symetrickým algoritmem (AES-256-GCM). TLS handshake (TLS 1.3 zjednodušeně): 1) Client Hello — klient pošle podporované cipher suites a náhodné číslo; 2) Server Hello + Certificate — server pošle certifikát (obsahuje veřejný klíč podepsaný CA) a zvolí cipher suite; 3) Key Exchange — ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) pro výměnu klíčového materiálu bez přenosu samotného klíče; 4) Session keys — obě strany nezávisle odvodí totožné session keys pro symetrické šifrování; 5) Finished — vzájemné ověření MAC; data pak tečou symetricky šifrovaná. Rizika PKI: 1) Kompromitace Root CA — pokud útočník získá soukromý klíč root CA, může podepsat libovolný certifikát (DigiNotar 2011 — CA kompromitována, umožnila MITM na Google); 2) Certificate mispísání — CA vydá certifikát pro doménu neoprávněné osobě; 3) Platnost CRL — zrušení certifikátů přes CRL/OCSP musí být aktuální (Certificate Transparency Logs jako monitoring); 4) Slabé klíče — zastaralé RSA-1024 nebo SHA-1 podpisy.',
  },
  {
    okruh: 17,
    title: 'Regulace: NIS2 implementace v organizaci',
    q: 'Organizace zjistila, že spadá pod NIS2 jako "důležitý subjekt". Co to pro ni konkrétně znamená — jaké povinnosti, lhůty pro hlášení incidentů a sankce hrozí?',
    modelAnswer: 'NIS2 (Směrnice EU 2022/2555, transponována v ČR novelou ZKB) rozlišuje "základní subjekty" (essential entities) a "důležité subjekty" (important entities). Jako důležitý subjekt má organizace tyto povinnosti: 1) Implementace bezpečnostních opatření — minimální sada technických a organizačních opatření v oblastech: řízení rizik, incident response, business continuity, supply chain security, šifrování, IAM. 2) Hlášení incidentů: do 24 hodin od detekce "significant incident" — early warning NÚKIB; do 72 hodin — incident notification (faktické informace); do 1 měsíce — final report s příčinami, dopadem a přijatými opatřeními. 3) Registrace u NÚKIB — organizace se musí zaregistrovat; NÚKIB vede registr. 4) Dodavatelský řetězec — organizace musí hodnotit bezpečnostní rizika klíčových dodavatelů. 5) Odpovědnost managementu — management osobně odpovídá za implementaci; může být zbaven odpovědnosti za řízení organizace při hrubém porušení. Sankce pro důležité subjekty: správní pokuty až do výše 7 milionů EUR nebo 1,4 % celkového ročního obratu (pro základní subjekty: 10M EUR nebo 2 %). V ČR výkon dohledu a sankce: NÚKIB. Klíčový rozdíl od NIS1: výrazně rozšířen rozsah subjektů (z přibližně 150 na tisíce), přísnější sankce, osobní odpovědnost managementu.',
  },
  {
    okruh: 18,
    title: 'Malware: Analýza a reverse engineering',
    q: 'Bezpečnostní analytik obdržel podezřelý spustitelný soubor. Popište postup analýzy malwaru — statická vs. dynamická analýza, použité nástroje a jak identifikovat C2 komunikaci.',
    modelAnswer: 'Analýza malwaru probíhá ve dvou komplementárních fázích. Statická analýza zkoumá soubor bez jeho spuštění: 1) File identification — hash (SHA-256), VirusTotal lookup, file type (PE32, ELF); 2) Strings extraction — nástroj strings nebo FLOSS extrahuje čitelné řetězce: URL, IP adresy, registry klíče, chybové zprávy (clues o funkcionalitě); 3) PE header analýza (PEStudio, DIE) — import tabulka (volané Windows API funkce jako CreateRemoteThread, WriteProcessMemory = injekce kódu), sekce (neobvyklé sekce nebo vysoká entropie = packed/encrypted); 4) Yara rules — matching known malware patterns. Dynamická analýza spouští malware v izolovaném sandboxu (Cuckoo, ANY.RUN, Joe Sandbox): 1) Sledování API volání — process creation, file system změny, registry modifications; 2) Síťové chování — DNS dotazy, HTTP/S requesty, raw TCP spojení (Wireshark); 3) Persistence mechanismy — Run klíče, scheduled tasks, services. C2 (Command and Control) komunikace se identifikuje: DNS dotazy na DGA domény (algoritmicky generované domény s náhodně vypadajícími jmény), HTTP POST requesty na neobvyklé URL s Base64 encoded payload, DNS tunneling (neobvykle velké TXT záznamy), komunikace přes legitimní platformy (Slack, GitHub, Pastebin — LOLBins). Pokročilé techniky: reverse engineering v Ghidra nebo IDA Pro pro deobfuskaci kódu, decompilace C# / .NET malware dnSpy.',
  },
  {
    okruh: 19,
    title: 'Sociální informatika: Organizační kultura a ICT',
    q: 'Jak organizační kultura ovlivňuje adopci nových ICT systémů? Popište SCOT a sociotechnický přístup jako analytické rámce. Jak by měl manažer tyto znalosti využít při ERP implementaci?',
    modelAnswer: 'Organizační kultura — sdílené hodnoty, normy a přesvědčení — je klíčovým determinantem toho, zda ICT adopce uspěje nebo selže. SCOT (Social Construction of Technology, Bijker & Pinch) říká: technologie nevítězí automaticky díky technické nadřazenosti, ale díky vyjednávání mezi relevantními sociálními skupinami. V ERP kontextu: manažeři (chtějí reporting a kontrolu), účetní (bojí se ztráty moci nad procesy), IT oddělení (chtějí technologicky čistou implementaci), skladníci (chtějí jednoduché rozhraní). Každá skupina přisuzuje ERP jiné "problémy" a "řešení" — design ERP musí projít stabilizací přes interpretativní flexibilitu: buď rétorické uzavření (všichni se dohodnou, že nový systém je OK) nebo předefinování problému (vedení přerámuje "ztrátu kontroly" na "transparentnost dat"). Sociotechnický přístup (Tavistock Institute, Eric Trist) říká: technická a sociální optimalizace musí probíhat souběžně. ERP implementace, která optimalizuje pouze techniku (rychlost, integraci), ale ignoruje sociální systém (role, motivace, skupinové normy), selže nebo přinese suboptimální výsledky. Manažerské aplikace: 1) Provést sociotechnickou analýzu před implementací — kdo jsou stakeholdeři, jaké mají zájmy, kde jsou potenciální konflikty; 2) Zapojit klíčové skupiny do Fit-to-Standard workshopů (SCOT: relevantní sociální skupiny jako spoluhráči, ne pasivní příjemci); 3) Neignorovat neformální struktury — opinion leaders a informal networks jsou důležitější než formální hierarchie pro šíření adopce.',
  },
  {
    okruh: 20,
    title: 'Informační společnost: eGovernment a digitální transformace státu',
    q: 'Popište stav digitalizace veřejné správy v ČR — klíčové zákony, registry, datové schránky a kde ČR zaostává podle DESI indexu.',
    modelAnswer: 'Digitalizace veřejné správy v ČR stojí na legislativním základě: Zákon č. 365/2000 Sb. o ISVS (informační systémy veřejné správy) — standardy a atestace; Zákon č. 300/2008 Sb. — datové schránky (ISDS), od 2022 povinné pro všechny datové schránky fyzických osob i OSVČ; Zákon č. 111/2009 Sb. — 4 základní registry (ROB, ROS, RUIAN, RPP) propojené přes ISZR; Zákon č. 250/2017 Sb. — elektronická identifikace (NIA, BankID). Klíčové výsledky: Portál občana (mojeID, BankID přihlášení), Czech POINT jako asistenční místo, datové schránky jako náhrada papírové komunikace. DESI (Digital Economy and Society Index) EC hodnotí 5 dimenzí: konektivita, lidský kapitál, využití internetu, integrace digitálních technologií, digitální veřejné služby. ČR se v DESI 2023 umístila v průměru EU, ale zaostává v: digitálních dovednostech obyvatelstva (lidský kapitál — pod průměrem), e-health (elektronická zdravotní dokumentace zaostává za Estonskem, Dánskem) a integraci digitálních technologií v MSP. Silné stránky ČR: datové schránky mají vysokou penetraci, základní registry jsou funkční, konektivita infrastruktura je dobrá. Srovnání: Estonsko je benchmark (X-Road systém propojuje všechny státní registry, 99 % služeb online), ČR teprve dohání. Klíčovou výzvou je digitální propast u seniorů a nízká motivace k využívání e-governmentu.',
  },
  {
    okruh: 22,
    title: 'Etika v IT: GDPR a morální odpovědnost',
    q: 'Organizace sbírá behaviorální data uživatelů webu pro personalizaci reklamy. Z jaké perspektivy etických teorií je tato praxe problematická? Jak GDPR řeší napětí mezi obchodními zájmy a ochranou soukromí?',
    modelAnswer: 'Sběr behaviorálních dat pro reklamní personalizaci je problematický z více etických perspektiv. Z deontologické perspektivy (Kant, Kategorický imperativ): jednání je etické pouze pokud může být universalizováno — kdyby každá organizace sledovala a profilovala všechny uživatele bez jejich vědomí, narušilo by to důvěru jako podmínku sociálního fungování. Subjekt se stává prostředkem (cílem reklamy), nikoli cílem sám o sobě. Z perspektivy soukromí jako práva: informační sebeurčení (Westin) říká, že každý má právo kontrolovat informace o sobě. Profilování bez vědomí subjektu toto právo porušuje. Z utilitaristické perspektivy: lze argumentovat, že relevantní reklama je přínosná pro uživatele (nevidí irelevantní sdělení) — ale tato kalkulace ignoruje rizika úniku dat, diskriminace, manipulace a long-term chilling effect na svobodu projevu. GDPR řeší toto napětí: 1) Právní základ — zpracování musí mít legitimní základ (souhlas, oprávněný zájem, smlouva); behaviorální reklama typicky vyžaduje explicitní souhlas (cookie consent bannery); 2) Profilování dle čl. 22 — automatizované rozhodování s právním účinkem vyžaduje explicitní souhlas nebo jiný zákonný základ; 3) Privacy by design (čl. 25) — ochrana soukromí musí být zabudována do systému od návrhu; 4) Data minimization — sbírat jen data nutná pro deklarovaný účel. Napětí zůstává: "oprávněný zájem" je legislativně neurčitý a mnohé organizace ho zneužívají jako alternativu k souhlasu.',
  },
  {
    okruh: 23,
    title: 'Paradox produktivity: IT investice a organizační změna',
    q: 'Organizace investovala 50M Kč do nového ERP systému, ale po 2 letech nevykázala žádné měřitelné zlepšení produktivity. Jak tento fenomén vysvětlíte pomocí paradoxu produktivity a co manažer měl udělat jinak?',
    modelAnswer: 'Případ ilustruje klasický paradox produktivity IT (Solow 1987): přes masivní investici do ICT nedošlo ke zvýšení produktivity. Explanace z výzkumu: 1) Implementation lag — přínosy ICT se projevují s časovým zpožděním 3–7 let, protože organizace musí nejprve přestavět procesy, role a kompetence; 2) Technology without organizational change — ERP sám o sobě nepřináší produktivitu; nastane jen tehdy, když je kombinován s redesignem procesů, změnou role zaměstnanců a novými KPI; 3) Misallocation — možná byla část implementace neoptimální (přílišné customizace, chybná konfigurace best practices). Sociotechnický přístup (Tavistock) říká: organizace optimalizovala technický subsystém (implementovala ERP), ale ignorovala sociální subsystém (jak lidé pracují, jaké mají role, jak jsou motivováni). Manažer měl: 1) Provést Before-baseline měření KPI před implementací — bez baseline nelze měřit zlepšení; 2) Souběžně realizovat process redesign — Fit-to-Standard přístup, eliminace waste v Lean smyslu; 3) Investovat do change management — ADKAR program, superuseři, role-based training; 4) Nastavit realistický ROI horizon — první rok negativní (implementační náklady + ramp-up), breakthrough produktivity = rok 2–4; 5) Měřit tangible přínosy (cycle time, chybovost faktur, warehouse accuracy) i intangible (rychlost reportingu, rozhodovací kvalita).',
  },
  {
    okruh: 25,
    title: 'Ochrana osobních dat: GDPR deep-dive',
    q: 'Jako DPO musíte provést DPIA (Data Protection Impact Assessment) pro nový HR systém s biometrickým docházkáním. Jaký je postup DPIA a kdy je povinná? Co jsou zvláštní kategorie osobních dat?',
    modelAnswer: 'DPIA (Data Protection Impact Assessment) dle GDPR čl. 35 je povinná, když zpracování "pravděpodobně přinese vysoké riziko pro práva a svobody fyzických osob". Konkrétní triggery: zpracování zvláštních kategorií dat (biometrika ano!), systematické sledování veřejně přístupných míst, rozsáhlé profilování. Biometrické docházkání oba první triggery splňuje → DPIA je povinná. Postup DPIA: 1) Popis zpracování — jaká data (biometrické otisky, časy příchodů/odchodů), účel (docházkání), správce, zpracovatelé, přeshraniční přenosy; 2) Posouzení nezbytnosti a proporcionality — je biometrika nutná? Nepostačuje RFID karta? Biometrika je invazivní metoda; 3) Hodnocení rizik — pro jaká práva subjektů? Identifikujeme rizika: leaking biometrických dat (nevratné = nelze jako heslo "resetovat"), function creep (data se začnou používat k jiným účelům), diskriminace; 4) Opatření pro zvládnutí rizik — šifrování biometrik, separate storage od docházkového záznamu, retention policy, omezení přístupu; 5) Konzultace s ÚOOU pokud zbývající riziko zůstává vysoké. Zvláštní kategorie osobních dat dle čl. 9: rasový/etnický původ, politické názory, náboženství, odborová příslušnost, zdravotní data, sexuální orientace — a biometrické údaje za účelem jednoznačné identifikace fyzické osoby. Zpracování těchto dat je ve výchozím stavu zakázáno; výjimka: explicitní souhlas nebo zákonný důvod (zaměstnanost). Poučení: DPIA odhaluje, zda privacy-respecting alternativa (čip karta) nesplní účel s nižším rizikem.',
  },
  {
    okruh: 26,
    title: 'Informační management: IT strategie a business alignment',
    q: 'CIO nové organizace zjistil, že IT strategie neexistuje a IT projekty nejsou propojené s business strategií. Jak by měl IT strategii vytvořit a jak zajistit business-IT alignment?',
    modelAnswer: 'Tvorba IT strategie začíná pochopením business kontextu — CIO musí nejprve přečíst business strategii a porozumět: jaké jsou 3–5 klíčových strategických priorit firmy, jaké jsou KPI businessu a jak IT k nim přispívá nebo ne, a jaké jsou "pain points" klíčových business stakeholderů. Krok 1: IT audit (as-is) — inventura aktuálního IT portfolia (systémy, projekty, kapacity, náklady), assessment maturity IT procesů (COBIT), gap analýza vůči best practices. Krok 2: Definice IT vize a principů — vize musí vycházet z business strategie a být srozumitelná non-IT manažerům; principy jsou vodítka pro rozhodování (např. "Cloud-first pro nové systémy", "Data jako strategické aktivum"). Krok 3: IT portfolio a roadmapa — priority IT projektů odvozené z business priorit, rozdělení do krátkodobého (0–12 měsíců: quick wins), střednědobého (1–3 roky: transformace), dlouhodobého (3–5 let: inovace); každý projekt musí mít business case s prokázanou vazbou na business cíl. Krok 4: Governance model pro alignment — IT Steering Committee se zástupci businessu, pravidelné portfolio review, business owners pro klíčové systémy. Business-IT alignment měříme: % IT projektů napojených na strategické business objective, spokojenost business stakeholderů s IT (NPS/survey), IT náklady jako % revenue (benchmark dle odvětví). Klíčové napětí v praxi: business chce rychlost a inovace, IT chce stabilitu a bezpečnost. IT strategie musí toto napětí explicitně adresovat a nabídnout balanci.',
  },
  {
    okruh: 3,
    title: 'GDPR: Datový únik a regulatorní reakce',
    q: 'Vaše firma zjistila, že útočník měl 3 měsíce přístup k databázi zákazníků. Data nebyla šifrována. Popište vaše povinnosti jako správce dle GDPR a ZKB, kdo co musí dostat a do kdy.',
    modelAnswer: 'Tříměsíční kompromice nešifrované databáze zákazníků je "personal data breach" dle GDPR a pravděpodobně i "kybernetický bezpečnostní incident" dle ZKB. Souběžné povinnosti: Dle GDPR čl. 33: do 72 hodin od zjištění ohlásit dozorový úřad (ÚOOU v ČR). Hlášení obsahuje: povahu porušení, kategorie a přibližný počet dotčených osob a záznamů, kontaktní údaje DPO, pravděpodobné důsledky a přijatá nebo navrhovaná opatření. Pokud 72hodinová lhůta nebyla splněna, musí hlášení obsahovat zdůvodnění zpoždění. Dle GDPR čl. 34: bez zbytečného odkladu informovat dotčené subjekty údajů, pokud je pravděpodobné, že dojde k "vysokému riziku" pro jejich práva. Nešifrovaná data = útočník může zneužít; toto kritérium je splněno. Výjimky z notifikace: data byla šifrována (zde ne), opatření eliminovala riziko (těžko argumentovat), nebo kontaktování by vyžadovalo nepřiměřené úsilí (pak veřejné oznámení). Dle ZKB: pokud firma je KII nebo VIS provozovatel → hlásit NÚKIB: 24h od detekce early warning, 72h incident report. Interní kroky souběžně: forenzní zajištění (ne smazat logy!), izolace kompromitovaného systému, aktivace incident response plánu, právní posouzení (advokát, pojišťovna). Nesplnění GDPR povinností: pokuta až 10M EUR nebo 2 % obratu (neohlášení breache) nebo 20M EUR nebo 4 % (závažnější porušení). Poučení: absence šifrování je aggravating factor, který zvyšuje pravděpodobnost pokuty.',
  },
  {
    okruh: 7,
    title: 'Řízení rizik: Krizové řízení a BCM',
    q: 'Jak se liší Business Continuity Management (BCM) od Disaster Recovery? Proveďte Business Impact Analysis (BIA) pro e-commerce firmu a navrhněte RTO/RPO pro klíčové systémy.',
    modelAnswer: 'BCM (Business Continuity Management) je zastřešující disciplína zajišťující schopnost organizace pokračovat v klíčových business operacích při narušení — zahrnuje lidi, procesy, technologie a komunikaci. DRP (Disaster Recovery Plan) je technická podmnožina BCM fokusovaná na obnovu IT systémů po výpadku. BCM říká "jak zachovat chod firmy"; DRP říká "jak restartovat IT". BIA (Business Impact Analysis) pro e-commerce firmu: 1) Identifikace kritických business procesů: zpracování objednávek, platební gateway, skladový systém (WMS), zákaznická podpora, marketing systémy. 2) Pro každý proces: analýza dopadu výpadku v čase (1h, 4h, 24h, 72h) na tržby, reputaci, regulatorní shodu. Příklad: platební gateway out = 0 Kč příjmů/minutu → Critical. 3) Derivace RTO/RPO: Platební gateway: RTO 15 min, RPO 0 min (žádná ztráta transakcí — real-time replikace); E-shop frontend: RTO 30 min, RPO 5 min; WMS: RTO 4h, RPO 1h; Zákaznická podpora CRM: RTO 8h, RPO 4h; Analytické nástroje: RTO 48h, RPO 24h. Strategie obnovy dle RTO/RPO: pro kritické systémy = hot standby (active-active nebo active-passive cluster); pro důležité = warm standby (spouští se v hodinách); pro ostatní = cold standby (obnova ze zálohy v hodinách až dnech). BCP musí být testován — minimálně ročně tabletop exercise, každé 2 roky full simulation test.',
  },
  {
    okruh: 8,
    title: 'Bezpečnostní monitoring: Threat Hunting',
    q: 'Co je proaktivní threat hunting a jak se liší od reaktivní detekce přes SIEM alerty? Popište metodiku a jaké artefakty hunter hledá při podezření na APT (Advanced Persistent Threat).',
    modelAnswer: 'Reaktivní SIEM detekce čeká, až malware nebo útočník splní podmínky korelačního pravidla a vygeneruje alert. Problém: sofistikovaní útočníci (APT) záměrně se vyhýbají triggering pravidlům — operují "under the radar". Proaktivní threat hunting vychází z hypotézy o tom, kde by útočník mohl být, a aktivně hledá indikátory bez čekání na alert. Metodika: 1) Hypothesis Generation — vychází z threat intelligence (které skupiny útočí na náš sektor, jaké TTP používají — MITRE ATT&CK framework). Příklad hypotéza: "APT28 skupiny používají PowerShell pro lateral movement; hledám neobvyklé PowerShell execution v doménové síti." 2) Tool-Assisted Investigation — pivotujeme přes data: Windows Event Logy (PowerShell ScriptBlock logging, Event ID 4104), Sysmon (process creation, network connections), EDR telemetrie. 3) Pattern Discovery — hledáme anomálie: spawning cmd.exe z Office aplikace (obvyklý initial access), LOLBAS (Living Off the Land Binaries — certutil, mshta, wscript pro download/exec), neobvyklé base64 commandy v příkazové řádce. 4) Inform and Improve — nové IoC (indikátory kompromice) a TTP se zanesou do SIEM jako nová pravidla. APT artefakty: Persistence (RunKey, Scheduled Task, COM hijacking), Credential access (lsass dumps — Mimikatz, DCSync), Lateral movement (Pass-the-Hash, WMI, PsExec, SMB lateral movement), Command & Control (DNS beaconing, HTTPS komunikace na neobvyklých portech, domain fronting). MITRE ATT&CK poskytuje strukturovanou mapu TTP pro 14 taktik útoku — základ pro systematický threat hunting program.',
  },
]

export const KOMISE_BANK: KomiseQuestion[] = [
  {
    prof: 'smutny',
    q: 'Jak byste navrhli governance strukturu IT v organizaci se 500 zaměstnanci? Jaké výbory a mechanismy byste zavedl?',
    modelAnswer: 'Pro organizaci s 500 zaměstnanci bych navrhl tříúrovňovou governance strukturu. Na úrovni boardu by fungoval IT Steering Committee (ISC) složený z CEO, CFO, CIO a zástupců klíčových business jednotek — schvaluje IT strategii, velké investice a sleduje KGI. Na úrovni managementu bych zřídil Security Committee (CISO + IT manageři + legal) pro bezpečnostní politiky a posouzení rizik, a Architecture Review Board pro technologická rozhodnutí. Na operativní úrovni probíhají Change Advisory Board pro schvalování změn a Service Review Meetings pro SLA reporting. Governance mechanismy zahrnují: proces schvalování IT investic (business case + IT alignment check), portfolio management pro projekty, metriky reporting do boardu a eskalační procedury. Celý model je zarovnán s COBIT 2019 doménou EDM — board evaluuje, diriguje a monitoruje, zatímco CIO a IT management zajišťují plánování a realizaci.',
  },
  {
    prof: 'smutny',
    q: 'Vysvětlete praktický rozdíl mezi IT Governance a IT Management. Proč toto rozlišení záleží pro board organizace?',
    modelAnswer: 'IT Governance je odpovědnost boardu a top managementu — zahrnuje evaluaci IT strategy a portfolia, určování směru IT (budgetové priority, risk appetite) a monitoring výsledků. Je to odpověď na otázky: "Investujeme do správných věcí? Dostáváme hodnotu za peníze? Řídíme IT rizika přiměřeně?" IT Management je odpovědností CIO a IT managementu — plánování, budování, provoz a optimalizace IT služeb a infrastruktury. Odpovídá na otázky: "Jak postavit systém? Jak provozovat helpdesk? Jak realizovat projekt?" V COBIT 2019 je rozdíl explicitní: governance domain EDM (Evaluate, Direct, Monitor) patří boardu, management domains APO/BAI/DSS/MEA patří IT managementu. Pro board toto rozlišení záleží proto, že bez jasné separace zodpovědností board buď mikromanaguje technické detaily (plýtvání kapacity), nebo naopak abdikuje odpovědnost za IT rizika a investice — obojí vede k dysfunkční governance.',
  },
  {
    prof: 'smutny',
    q: 'Jak CISO komunikuje s boardem o stavu kybernetické bezpečnosti? Co by měl dashboard pro board obsahovat?',
    modelAnswer: 'CISO musí komunikovat s boardem jazykem businessu, ne technickým jazykem. Board nerozumí pojmům jako CVE, CVSS nebo patch Tuesday — ale rozumí finančnímu riziku, regulatorní odpovědnosti a reputačním hrozbám. Dashboard pro board by měl obsahovat: 1) Risk posture — aktuální cyber risk skóre v kontextu risk appetite, trend za poslední kvartál; 2) Regulatorní shoda — status plnění ZKB, GDPR, NIS2 (zelená/žlutá/červená); 3) Incident summary — počet bezpečnostních incidentů, MTTR, business dopad; 4) Coverage — % kritických systémů pokrytých bezpečnostními kontrolami; 5) Top 3 rizika s business impaktem a navrhovanou investicí na jejich snížení. Každá metrika musí být doplněna kontextem: co je benchmark, proč je číslo dobré nebo špatné a co to znamená pro organizaci. CISO by měl připravit i "so what" — co board musí rozhodnout nebo schválit.',
  },
  {
    prof: 'smutny',
    q: 'Popište, jak COBIT 2019 pracuje s konceptem Focus Areas a jaké jsou příklady relevantní pro českou organizaci.',
    modelAnswer: 'COBIT 2019 zavedl koncept Focus Areas jako odpověď na potřebu kontextualizace frameworku — organizace si vybírá relevantní Focus Area (specifickou governance výzvu) a COBIT poskytuje upravenou sadu objectives, metrik a guidance specifických pro tuto oblast. Dostupné Focus Areas zahrnují: Cybersecurity, Digital Transformation, Cloud Computing, DevOps, Privacy a Small & Medium Enterprise. Pro českou organizaci jsou nejvíce relevantní: Cybersecurity Focus Area (kvůli povinnostem dle ZKB a NIS2 implementace) — mění váhy a priority objectives zejména v doménách DSS a APO; Privacy Focus Area (GDPR compliance) — zdůrazňuje APO13 a DSS06 objectives; a pro větší organizace Digital Transformation Focus Area, která pomáhá řídit governance přechodu na digitální business modely. Praktická hodnota Focus Areas spočívá v tom, že organizace nemusí implementovat všech 40 objectives stejnou vahou — Focus Area definuje, které jsou kritické v daném kontextu.',
  },
  {
    prof: 'smutny',
    q: 'Jak se měří efektivita IT governance pomocí KGI a KPI v COBIT 2019? Uveďte konkrétní příklady pro EDM03.',
    modelAnswer: 'COBIT 2019 rozlišuje dvě úrovně metrik: KGI (Key Goal Indicator) měří, zda bylo dosaženo výsledku — cíle objective; KPI (Key Performance Indicator) měří výkonnost procesu vedoucí k výsledku. Pro EDM03 Managed Risk: KGI mohou být "% IT rizik pokrytých adekvátní odezvou" (target: >95 %), "počet materiálních bezpečnostních incidentů za rok" nebo "% rizik v rámci schváleného risk appetite". KPI pro EDM03 jsou "počet provedených risk assessmentů za rok" (ukazuje aktivitu procesu), "% implementovaných nápravných opatření v dohodnutém termínu" nebo "čas od identifikace rizika po schválení odezvou". Systém metrik funguje jako kaskáda: board sleduje KGI (dosahujeme cílů?), IT management sleduje KPI (fungují procesy?). Klíčová chyba bývá zaměnit KPI za KGI — např. "počet auditů" je KPI, ne KGI; KGI by byl "% procesů odpovídajících auditním požadavkům".',
  },
  {
    prof: 'sedlacek',
    q: 'Jaké jsou typické fáze implementace ERP systému a ve kterých fázích projekty nejčastěji selhávají?',
    modelAnswer: 'Typické fáze implementace ERP vycházejí z metodologie ERP Activate: Discover (business case, scope), Prepare (projektový setup, systémová příprava), Explore (Fit-to-Standard workshopy — mapování procesů na ERP best practice), Realize (konfigurace, customizace, vývoj rozhraní, unit testy), Deploy (UAT, školení, datová migrace, cutover), Run (hypercare, stabilizace, go-live support). Projekty nejčastěji selhávají v těchto fázích: 1) Explore/Blueprint — nedostatečná analýza procesů "as-is" vede k chybným konfigurační rozhodnutím, která se opravují draze v pozdějších fázích; 2) Datová migrace — podceněná komplexnost čištění a transformace dat způsobuje zpoždění a chyby po go-live; 3) UAT — business uživatelé nemají kapacitu na testování, problémy se odkryjí až na produkci; 4) Cutover/Go-live — nedostatečně otestovaný cutover plán způsobuje prodloužení odstávky a panikový rollback. Klíčový faktor selhání napříč fázemi: absence nebo pasivní role business sponzora.',
  },
  {
    prof: 'sedlacek',
    q: 'Jak byste řídili change management při přechodu na nový ERP? Kdo jsou klíčoví stakeholdeři a jak je zapojíte?',
    modelAnswer: 'Change management ERP projektu bych postavil na modelu ADKAR (Awareness, Desire, Knowledge, Ability, Reinforcement). Awareness — komunikace proč organizace přechází na nový ERP, co se změní a co zůstane; probíhá od kickoffu projektu, vedena executive sponzorem. Desire — vytvoření ochoty ke změně; klíčoví uživatelé (superuseři) z každé business jednotky se zapojují do Explore workshopů jako spolutvůrci řešení, ne jako pasivní příjemci. Knowledge — role-based training zaměřený na konkrétní pracovní scénáře (ne generické "ERP školení"). Ability — procvičení v sandbox systému před go-live. Reinforcement — hypercare podpora, superusers jako first-line podpora kolegů. Klíčoví stakeholdeři: executive sponsor (legitimizuje změnu), business owners (odpovídají za procesní rozhodnutí), superuseři (multiplikátoři změny v terénu), IT tým (technická realizace), HR (training koordinace), komunikační manažer (komunikační plán). Největší chybou je zahájit change management "dva týdny před go-live" — musí začít od dne zahájení projektu.',
  },
  {
    prof: 'sedlacek',
    q: 'Vysvětlete pojmy TCO a ROI v kontextu ERP investice. Co vše musí TCO zahrnovat?',
    modelAnswer: 'TCO (Total Cost of Ownership) je celkový náklad na vlastnictví ERP systému za celý životní cyklus — typicky 5–10 let. Zahrnuje: pořizovací náklady (licence nebo SaaS subscription, hardware, implementační služby), provozní náklady (podpora a maintenance 15–22 % roční licence, hosting nebo cloud, interní IT kapacita), rozvojové náklady (upgrade, customizace, rozhraní, školení nových zaměstnanců) a skryté náklady (ztráta produktivity v přechodovém období, datová migrace, change management). Typicky je pořizovací cena jen 20–30 % TCO — většina nákladů je v provozu a rozvoji. ROI (Return on Investment) ERP je poměr přínosů k nákladům za definované období. Přínosy zahrnují: úspory manuální práce (automatizace procesů), zrychlení procesů (kratší order-to-cash cycle), zlepšení reportingu (real-time data místo Excelu), snížení zásob (lepší plánování v MM/PP) a snížení chybovosti. ROI ERP projektů se typicky pohybuje 3–5 let, přičemž první rok bývá záporný (ramp-up period). Bez explicitního měření přínosů se ROI nedokáže prokázat — doporučuji baseline mětit před projektem.',
  },
  {
    prof: 'sedlacek',
    q: 'Co je cutover plán a jak se liší Big Bang od fázového (phased) rollout přístupu? Kdy použít jaký?',
    modelAnswer: 'Cutover plán je detailní operativní dokument popisující každý krok přechodu z legacy systému na nový ERP v definovaném časovém okně (typicky víkend nebo noční okno). Obsahuje: sekvenci kroků s odpovědnostmi a časovými odhady, go/no-go kritéria pro spuštění, fallback/rollback scénář při neúspěchu a komunikační plán pro stakeholdery. Big Bang rollout znamená spuštění všech modulů a lokalit najednou — výhody: kratší celková délka projektu, nižší náklady na paralelní provoz, rychlejší ROI; nevýhody: vysoké riziko (jeden bod selhání pro celou organizaci), intenzivní požadavky na školení a hypercare. Phased rollout postupuje po modulech nebo lokacích — výhody: nižší riziko, možnost učit se z první vlny, menší šok pro organizaci; nevýhody: delší projekt, vyšší náklady (paralelní systémy, složitější integrace, dvojí master data). Doporučení: Big Bang pro menší organizace s jednoduchými procesy nebo čistý greenfield; Phased pro velké, geograficky distribuované organizace nebo při migraci z mnoha legacy systémů.',
  },
  {
    prof: 'sedlacek',
    q: 'Jak funguje metodologie ERP Activate a čím se liší od starší AERP metodologie?',
    modelAnswer: 'ERP Activate je implementační metodologie vyvinutá ERP pro S/4HANA a cloud produkty, postavená na třech pilířích: ERP Best Practices (preconfigured business content jako výchozí bod), Guided Configuration (ERP Cloud ALM nebo Solution Manager pro řízení projektu) a Agile delivery (sprinty v fázi Realize). Šest fází: Discover (business case, scope), Prepare (projektový setup, aktivace Best Practice baseline), Explore (Fit-to-Standard workshopy — každý proces se porovnává s ERP best practice a rozhoduje se: přijmout standard, konfigurovat, nebo customizovat), Realize (iterativní realizace v sprintech, integrace, testy), Deploy (UAT, školení, data migration, cutover), Run (hypercare, kontinuální zlepšování). Oproti AERP (Accelerated ERP) je Activate zásadně jiný v přístupu: AERP byl waterfall s detailní BP fází a custom-first přístupem — organizace popsala své procesy a ERP se přizpůsobil. Activate je fit-to-standard — ERP best practice je výchozí bod a organizace upravuje procesy, ne systém. Activate lépe podporuje cloud nasazení a zkracuje délku implementace díky preconfigured baseline.',
  },
  {
    prof: 'sigmund',
    q: 'Co je to wicked problem a jak se liší od tame problem? Uveďte příklad z oblasti IS/IT.',
    modelAnswer: 'Koncept wicked problems zavedli Rittel a Webber v roce 1973 pro problémy sociálního plánování, kde tradiční analytické přístupy selhávají. Wicked problem má charakteristiky: neexistuje jednoznačná definice problému (závisí na perspektivě stakeholderů), každý pokus o řešení mění samotný problém, není možné testovat řešení bez trvalých důsledků, každé řešení je unique (nelze kopírovat), a neexistuje "správná" odpověď — jen lepší nebo horší. Tame problem (disciplinovaný) je naopak jasně definovatelný, má ověřitelné řešení a může být algoritmizován. V IS/IT kontextu: tame problem je implementace konkrétního softwarového modulu (jasný scope, testovatelné výsledky, opakovatelný postup). Wicked problem je digitální transformace organizace — každá organizace je unikátní, transformace mění organizaci v průběhu procesu, stakeholdeři mají konfliktní vize "co to znamená být digitální" a neexistuje moment, kdy je transformace "hotová". Wicked problems vyžadují iterativní, participativní přístup, ne lineární project management.',
  },
  {
    prof: 'sigmund',
    q: 'Popište Beerův Viable System Model a jeho 5 systémů. Jak ho aplikovat na diagnostiku IT oddělení?',
    modelAnswer: 'Viable System Model (VSM) Stafforda Beera modeluje minimální podmínky pro životaschopnost (viability) jakéhokoliv systému — organizace, oddělení nebo ekosystému. Pět systémů: S1 = Operations — subsystémy zajišťující primární operace (v IT: jednotlivé týmy jako service desk, infrastruktura, vývoj); S2 = Coordination — mechanismy koordinace mezi S1 subsystémy, prevence oscilací (ITSM procesy, kapacitní plánování); S3 = Management/Control — řízení operativního výkonu, alokace zdrojů, SLA monitoring, interní audit (S3*); S4 = Intelligence — sledování vnějšího prostředí a budoucnosti (technologický scouting, byznys strategie, inovace); S5 = Policy/Identity — definice identity, hodnot a politiky celého systému (IT governance, vztah IT k businessu). Aplikace na diagnostiku IT oddělení: identifikujeme, kde systém selhává. Typické dysfunkce: chybějící S2 (týmy nekomunikují, duplikují práci), přetížené S3 (IT management hasí provozní problémy místo řízení), hluchý S4 (IT nesleduje technologické trendy, vždy reaguje se zpožděním) nebo chybějící S5 (IT nemá governance model, každý rozhoduje sám). VSM diagnóza začíná mapováním struktury a toků informací.',
  },
  {
    prof: 'sigmund',
    q: 'Jak se projevuje digitální propast v kontextu ČR a co mohou stát i organizace dělat pro její překonávání?',
    modelAnswer: 'Digitální propast má tři dimenze dle Van Dijkova modelu: přístupová (fyzická dostupnost zařízení a internetu), dovednostní (digitální gramotnost — operační, informační, komunikační, strategické dovednosti) a motivační (ochota a důvod používat digitální technologie). V kontextu ČR jsou nejvíce ohroženi: senioři nad 65 let (nízká digitální gramotnost, fyzická bariéra ovládání), obyvatelé sociálně vyloučených lokalit (kombinace přístupové a motivační propasti), a osoby s nízkým vzděláním. Projevy v praxi: problém s využíváním e-governmentových služeb (datové schránky, portál Moje daně), digitální bankovnictví, telehealth. Co může stát udělat: digitální asistovaná místa (Czech POINT, přepážky se vzdělaným personálem), bezplatné kurzy digitální gramotnosti (Digitální ČR program), e-government UX zaměřený na srozumitelnost pro seniory. Co mohou organizace udělat: omnichannel přístup (nemigrovat zákazníky do digitálu násilně), accessibility standardy WCAG 2.1 pro aplikace, interní digital literacy programy pro zaměstnance. Propast není jen technologický problém — je sociální, vzdělávací a politický.',
  },
  {
    prof: 'sigmund',
    q: 'Vysvětlete pojem platformová ekonomika. Jaké jsou dopady platforem na tradiční business modely a regulaci?',
    modelAnswer: 'Platformová ekonomika je model, kde technologická platforma zprostředkovává interakce mezi dvěma nebo více skupinami uživatelů (producenti/poskytovatele a konzumenti/zákazníci) a vytváří hodnotu prostřednictvím síťových efektů — čím více uživatelů, tím hodnotnější platforma pro každého (Airbnb, Uber, Amazon Marketplace, App Store). Platformy jsou charakterizovány asymetrickým cenověním (jedna strana může být subsidizována), vícestrannými síťovými efekty a tendencí k winner-takes-all dynamice. Dopady na tradiční business modely: disintermediace (platformy eliminují tradiční zprostředkovatele — cestovní kanceláře, taxislužby), gig economy (platformy vytvářejí flexibilní pracovní trhy bez tradičních zaměstnaneckých vztahů), a tlak na snížení marginální nákladů (softwarové platformy mají blízko nulové náklady na přidání dalšího uživatele). Regulatorní výzvy: daňové úniky (lokální výběr bez daňové rezidencie), pracovněprávní status gig workerů (zaměstnanec nebo OSVČ?), a tržní dominance (EU reaguje Digital Markets Act — DMA, který platí od 2023 pro "gatekeepery"). V ČR platformová ekonomika zasahuje do legislativy krátkodobých pronájmů (Airbnb) a dopravy (Bolt vs. taxi regulace).',
  },
  {
    prof: 'sigmund',
    q: 'Co je systémová dynamika? Uveďte příklad pozitivní a negativní zpětnovazební smyčky v IT organizaci.',
    modelAnswer: 'Systémová dynamika (Jay Forrester, MIT) je metodologie pro modelování a simulaci komplexních systémů v čase. Pracuje s koncepty zásobníků (stocks — akumulované stavy, jako počet zaměstnanců nebo výše technického dluhu), toků (flows — míra změny zásobníku) a zpětnovazebních smyček. Negativní (balancing) smyčka udržuje systém v rovnováze, odolává odchylkám: v IT organizaci — zvýšení počtu incidentů → zvýšení kapacity helpdesku → pokles incidentů → snížení potřeby helpdesku (B1). Systém se vrací do rovnováhy. Pozitivní (reinforcing) smyčka zesiluje odchylku v jednom směru: technický dluh → zpomalení vývoje → tlak na zkratky (quick fixes) → nárůst technického dluhu → další zpomalení (R1 — "death spiral"). Stejná smyčka v opačném směru: investice do refactoringu → rychlejší vývoj → více dodané hodnoty → více investic do kvality (R2 — virtuous cycle). Klíčová aplikace systémové dynamiky v IT managementu: intervence na jednom místě systému mají nečekané důsledky jinde; optimalizace lokální části systému může zhoršit výkon celku. Simulační modely (System Dynamics software jako Vensim) umožňují testovat politiky před jejich implementací.',
  },
]

export const ORAL_BANK: OralQuestion[] = [
  {
    q: 'Popište Service Value System (SVS) v ITIL 4. Jakou roli hrají guiding principles a jak se SVS liší od ITIL v3 service lifecycle?',
    modelAnswer: 'Service Value System (SVS) v ITIL 4 popisuje, jak všechny komponenty organizace spolupracují na vytváření hodnoty prostřednictvím IT služeb. SVS tvoří 5 složek: Guiding Principles (7 principů jako "Focus on value", "Progress iteratively with feedback" nebo "Keep it simple" — jsou to doporučení platná vždy a za všech okolností), Governance (dohled a řízení dle COBIT/ISO/IEC 38500), Service Value Chain (6 aktivit: Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support), 34 Practices (nahradily procesní model v3) a Continual Improvement. Klíčový rozdíl oproti ITIL v3: v3 měl rigidní 5-fázový service lifecycle (Strategy → Design → Transition → Operation → CSI), kde byly procesy pevně zařazeny do jedné fáze. ITIL 4 je flexibilnější — value streams (hodnotové proudy) kombinují aktivity SVC dle kontextu; practices (jako Incident Management nebo Change Enablement) nejsou vázány na lifecycle fázi. ITIL 4 lépe reaguje na Agile/DevOps prostředí, kde rychlé iterace narušují lineární lifecycle model.',
  },
  {
    q: 'Jak probíhá interní audit IS/IT? Jaký je rozdíl mezi compliance auditem a operational auditem?',
    modelAnswer: 'Interní audit IS/IT prochází standardním postupem bez ohledu na typ: 1) Plánování — definice scopu a cílů auditu, risk assessment pro výběr priorit, příprava audit programu; 2) Fieldwork — sběr důkazů prostřednictvím testů (testování vzorků transakcí, kontrolní testy), interview s process owners, dokumentová analýza a technická kontrola (CAAT); 3) Findings — analýza shromážděných důkazů, klasifikace nálezů dle závažnosti (critical, major, minor); 4) Audit zpráva — executive summary, detailní findings s doporučeními; 5) Follow-up — sledování implementace nápravných opatření. Compliance audit ověřuje, zda organizace dodržuje konkrétní normy, zákony nebo interní politiky (např. GDPR, ZKB, ISO 27001, SOX) — výsledkem je verdikt shoda/neshoda s konkrétními požadavky. Operational audit hodnotí efektivitu, hospodárnost a účelnost IT procesů — nezjišťuje jen "zda pravidla existují", ale "zda procesy fungují optimálně a přinášejí hodnotu". Typicky kombinujeme oba přístupy: compliance audit zajistí regulatorní shodu, operational audit odhalí neefektivity.',
  },
  {
    q: 'Vysvětlete princip "security by design" a jak ho aplikovat v životním cyklu vývoje softwaru (SDLC).',
    modelAnswer: 'Security by design znamená, že bezpečnost je integrální součástí každé fáze vývoje softwaru — nikoli vrstva přidaná na konci před nasazením. Aplikace v SDLC: Requirements — definice bezpečnostních požadavků (autentizace, autorizace, šifrování dat v klidu a přenosu) paralelně s funkčními požadavky, analýza regulatorních požadavků (GDPR, PCI DSS). Design — threat modeling metodou STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege), návrh security architecture. Implementation — secure coding guidelines (OWASP Top 10 mitigace: SQL injection prevence parametrizovanými dotazy, XSS prevence output encoding), code review zaměřené na bezpečnost. Testing — SAST (Static Application Security Testing) automaticky v CI/CD pipeline, DAST (Dynamic testing) proti běžící aplikaci, penetrační test před release. Deployment — hardening konfigurace, principle of least privilege pro service accounts. Operations — security monitoring, patch management. Klíčový princip: "shift left" — čím dřívěji je zranitelnost nalezena, tím levnější je oprava. Zranitelnost nalezená v requirements stojí x; nalezená v produkci stojí 100x.',
  },
  {
    q: 'Co je SIEM systém, jaká data sbírá a jaké jsou typické use-cases v bezpečnostním monitoringu?',
    modelAnswer: 'SIEM (Security Information and Event Management) je platforma, která centralizuje, normalizuje a koreluje bezpečnostní data z celé IT infrastruktury za účelem detekce hrozeb, incidentu a podpory compliance reportingu. Data sbíraná SIEM: logy ze systémů (Windows Event Log, Syslog z Linuxu), síťová data (firewall logy, IDS/IPS alerty, NetFlow), endpointová data (EDR alerty, antivir), cloudová data (AWS CloudTrail, Azure Activity Log), aplikační logy (web servery, databáze, ERP) a identity data (AD autentizační logy). Normalizace převádí různé log formáty do jednotného schématu (CEF nebo vlastní); korelační pravidla identifikují podezřelé vzory přes více zdrojů. Typické use-cases: detekce brute-force útoku (mnoho neúspěšných loginů → alert), lateral movement (přihlášení z jednoho systému na druhý v krátké době), data exfiltrace (neobvyklý objem odchozích dat), privilege escalation (přidání uživatele do admin skupiny mimo change okno), malware communication (komunikace s known-bad IP adresou), a compliance reporting (automatické generování důkazů pro ISO 27001 nebo NIS2 audit). SIEM je analytický nástroj — detekuje a alertuje, ale neblokuje; blokování zajišťují NGFW nebo EDR.',
  },
  {
    q: 'Popište Porterův hodnotový řetězec a vysvětlete, jak IT přidává hodnotu v každém článku — jak primárním, tak podpůrném.',
    modelAnswer: 'Porterův hodnotový řetězec (1985) modeluje organizaci jako soustavu aktivit, které transformují vstupy na výstupy s přidanou hodnotou. Primární aktivity: 1) Vstupní logistika — IT přidává hodnotu ERP systémem (ERP MM) pro řízení skladu, VMI (vendor managed inventory), EDI pro automatizovanou komunikaci s dodavateli; 2) Výroba/Operace — MES (Manufacturing Execution System), SCADA, procesní automatizace, IoT pro monitoring; 3) Výstupní logistika — WMS (Warehouse Management), TMS (Transportation Management System), track & trace; 4) Marketing a prodej — CRM, e-commerce, analytics, personalizace; 5) Servis — helpdesk systémy, field service management, zákaznický portál. Podpůrné aktivity: Infrastruktura organizace — BI a reporting pro management, governance systémy; HR management — HRIS, e-learning platformy; Technologický rozvoj — R&D systémy, PLM (Product Lifecycle Management); Nákup — e-procurement, SRM (Supplier Relationship Management). IT jako "cross-cutting concern" propojuje všechny články — ERP jako páteřní integrace, a digitalizace každého primárního článku zvyšuje efektivitu celého value chain. Marže organizace roste, pokud IT snižuje náklady nebo zvyšuje diferenciaci ve více článcích řetězce.',
  },
  {
    q: 'Co je procesní přístup k řízení organizace? Jak se liší od funkčního přístupu a jaké jsou výhody pro IT management?',
    modelAnswer: 'Procesní přístup (Business Process Management) vnímá organizaci jako soustavu vzájemně provázaných procesů orientovaných na zákazníka — každý proces transformuje vstupy na výstupy s měřitelnou hodnotou, prochází napříč funkčními útvary (cross-functional). Funkční (hierarchický) přístup organizuje práci do specializovaných útvarů (oddělení nákupu, výroby, prodeje) — každý útvar optimalizuje svou část, ale celkový výkon trpí silovými bariérami, předáváním odpovědnosti a zdlouhavou eskalací. Klíčové rozdíly: funkční = optimalizace lokální části; procesní = optimalizace end-to-end toku hodnoty; funkční = nejasná odpovědnost za výsledek zákazníkovi; procesní = process owner odpovídá za celý výsledek. Výhody procesního přístupu pro IT management: viditelnost end-to-end toku IT služby (od požadavku zákazníka po dodání), základ pro ITSM (ITIL/COBIT popisují IT prostřednictvím procesů), základ pro ERP implementaci (ERP je procesně orientovaný systém — R2C, P2P, H2R), měřitelnost výkonu přes procesní KPI (cycle time, defect rate, first-call resolution), redukce silosů mezi IT týmy.',
  },
  {
    q: 'Vysvětlete rozdíl mezi kvantitativní a kvalitativní analýzou rizik. Kdy je vhodné použít jakou metodu?',
    modelAnswer: 'Kvalitativní analýza rizik pracuje s ordinálními škálami — pravděpodobnost a dopad se hodnotí jako Nízká/Střední/Vysoká (nebo 1–5) a riziko se zobrazuje v matici. Je rychlá, nevyžaduje historická data a snadno srozumitelná pro management. Nevýhody: subjektivita hodnocení, nemožnost přímého porovnání různých typů rizik a žádná finanční kvantifikace. Kvantitativní analýza přiřazuje rizikovým událostem pravděpodobnosti a finanční dopady. Základní vzorec: ALE (Annual Loss Expectancy) = ARO (Annual Rate of Occurrence) × SLE (Single Loss Expectancy). Pokročilejší metody: Monte Carlo simulace (generuje tisíce scénářů pro distribuci výsledků), Value at Risk. Je přesnější a srovnatelná s jinými investičními rozhodnutími, ale vyžaduje spolehlivá historická data (která v IS bezpečnosti typicky chybí) a je náročnější na čas a expertízu. Doporučení pro praxi: kombinovaný přístup — kvalitativní analýza pro rychlý screening celého rizikového portfolia (kde jsou velká rizika?), kvantitativní analýza pro top-10 rizik s nejvyšším business impaktem kde rozhodnutí o investici do mitigace vyžaduje finanční zdůvodnění.',
  },
  {
    q: 'Co je IoC (Indicator of Compromise) a jak se IoC používají v bezpečnostní analýze a sdílení hrozeb?',
    modelAnswer: 'IoC (Indicator of Compromise) jsou observovatelné artefakty nebo evidence indikující, že k systémové kompromitaci pravděpodobně došlo nebo probíhá. Typy IoC: souborové (MD5/SHA-256 hashe malwaru, názvy souborů, cesty), síťové (IP adresy C2 serverů, domény, URL, SSL certifikát hashe), hostitelské (registry klíče pro persistence jako HKCU\Run, mutex jména, process names), emailové (odesílatelé phishingových kampaní, předměty, přílohy). IoC mají různou persistenci dle Pyramid of Pain (David Bianco): hashe jsou nejsnáze obměnitelné útočníkem (trivial), IP adresy snadné, domény obtížnější, síťové artefakty těžší a TTPs (Tactics, Techniques, Procedures dle MITRE ATT&CK frameworku) nejtěžší — změna TTP vyžaduje útočníka přetrénovat. Sdílení IoC probíhá prostřednictvím strukturovaných formátů: STIX 2.x (Structured Threat Intelligence eXpression) pro popis hrozeb, TAXII 2.x (Trusted Automated eXchange of Intelligence Information) pro přenos. Platformy: MISP (open-source), OpenCTI, komerční TIP. V SOC prostředí jsou IoC integrovány do SIEM korelačních pravidel — příchozí spojení na known-bad IP → alert.',
  },
  {
    q: 'Popište RASCI matici a ukažte, jak se používá v IT projektech nebo ITSM procesech.',
    modelAnswer: 'RASCI matice je nástroj pro clarifikaci rolí a odpovědností v procesu nebo projektu — rozšíření klasické RACI o roli Supportive. R (Responsible) — ten, kdo práci fyzicky vykoná; A (Accountable) — ten, kdo nese konečnou odpovědnost za výsledek (pouze jeden na každý úkol); S (Supportive) — poskytuje zdroje nebo pomoc bez primární odpovědnosti; C (Consulted) — je dotázán, poskytuje vstup (dvoucestná komunikace); I (Informed) — je informován o výsledku (jednosměrná komunikace). Pravidla použití: každý řádek (úkol) musí mít přesně jednu roli A; role R může být více; role A a R mohou být u stejné osoby pro operativní úkoly. Příklad pro ITSM Change Management: Schválení RFC (Request for Change) — CAB Chair = A, Change Manager = R, Business Owner = C, IT Manager = I, Security Team = C. Příklad pro IT projekt — Akceptace deliverable zákazníkem: Project Manager = A, Business Analyst = R, Delivery Team = S, Legal = C, Steering Committee = I. RASCI se vytváří jako tabulka: řádky = aktivity nebo deliverables, sloupce = role nebo osoby. Nejčastější chyba: příliš mnoho A na jednu aktivitu (tím nikdo není accountable).',
  },
  {
    q: 'Vysvětlete rozdíl mezi symetrickým a asymetrickým šifrováním. Uveďte příklady algoritmů a použití v praxi.',
    modelAnswer: 'Symetrické šifrování používá jeden klíč pro šifrování i dešifrování — odesilatel a příjemce musí sdílet stejný tajný klíč. Výhody: rychlost (AES-256 je hardwarově akcelerováno, šifruje GB/s), nízká výpočetní náročnost. Nevýhoda: problém distribuce klíče — jak bezpečně doručit klíč příjemci? Algoritmy: AES (Advanced Encryption Standard) ve variantách 128/192/256 bit, ChaCha20. Použití: šifrování dat v klidu (full-disk encryption, šifrování databáze), bulk šifrování datových přenosů po ustavení session. Asymetrické šifrování (public-key cryptography) používá pár klíčů: veřejný klíč (public key) pro šifrování — lze sdílet volně; soukromý klíč (private key) pro dešifrování — musí zůstat tajný. Řeší problém distribuce klíče: veřejný klíč pošlu komukoliv, ale dešifrovat dokáže jen vlastník soukromého klíče. Nevýhoda: 100–1000× pomalejší než symetrické. Algoritmy: RSA (2048/4096 bit), ECC (Elliptic Curve Cryptography — stejná bezpečnost při kratších klíčích), Diffie-Hellman pro key exchange. V praxi se oba přístupy kombinují v hybridním schématu: TLS (HTTPS) používá asymetrické pro autentizaci serveru a výměnu symetrického session klíče, poté symetrické (AES-256-GCM) pro samotný přenos dat — rychlost symetrického s bezpečnostní výhodou asymetrického.',
  },
  {
    q: 'Co je cloud computing? Popište modely SaaS, PaaS, IaaS a jejich bezpečnostní implikace ve sdíleném modelu odpovědnosti.',
    modelAnswer: 'Cloud computing (NIST definice) je model umožňující sdílený, konfigurovaný přístup k síťovým výpočetním zdrojům (sítě, servery, úložiště, aplikace, služby), které lze rychle poskytovat a uvolňovat s minimálním úsilím nebo interakcí poskytovatele. Tři servisní modely: IaaS (Infrastructure as a Service) — virtuální infrastruktura na vyžádání (AWS EC2, Azure VM); zákazník spravuje OS, middleware a aplikaci; PaaS (Platform as a Service) — spravovaná platforma pro vývoj a deployment (Azure App Service, Google App Engine); zákazník spravuje aplikaci a data; SaaS (Software as a Service) — hotová aplikace jako služba (Microsoft 365, Salesforce, moderním ERP Cloud); zákazník spravuje pouze data a konfiguraci. Shared Responsibility Model definuje bezpečnostní odpovědnosti: poskytovatel vždy odpovídá za fyzickou bezpečnost datacentra, hypervisor a síťovou infrastrukturu. Zákazník vždy odpovídá za Identity and Access Management (IAM), klasifikaci a šifrování dat a konfiguraci bezpečnosti. Střední vrstva (OS, middleware, síťová konfigurace) se dělí dle modelu: v IaaS zákazník, v PaaS sdílená, v SaaS poskytovatel. Nejčastější cloudové incidenty: misconfigured S3 bucket (veřejně přístupné citlivé soubory), slabý IAM (žádné MFA, přehnané přístupy), a neporozumění shared responsibility (zákazník předpokládá, že cloud je "automaticky bezpečný").',
  },
  {
    q: 'Vysvětlete Business Continuity Management (BCM/BCP) a jak se liší od Disaster Recovery Planu (DRP).',
    modelAnswer: 'Business Continuity Management (BCM) je holistický management framework zajišťující, že organizace může pokračovat v kritických business procesech při narušení způsobeném jakoukoli příčinou — výpadek IT, přírodní katastrofa, pandemie, kybernetický útok. BCM zahrnuje: Business Impact Analysis (BIA) — identifikace kritických procesů a jejich závislostí, stanovení RTO (Recovery Time Objective — jak dlouho si organizace může dovolit výpadek procesu) a RPO (Recovery Point Objective — jaká ztráta dat je přijatelná); identifikace alternativních způsobů výkonu procesů (manuální fallback, alternativní lokace); Business Continuity Plan (BCP) — soubor plánů pro konkrétní scénáře; testování a udržování plánů. Disaster Recovery Plan (DRP) je technický podset BCM zaměřený výhradně na obnovu IT systémů a infrastruktury po technologické havárii. DRP definuje: pořadí obnovy systémů, zálohovací strategie (3-2-1 pravidlo: 3 kopie, 2 různá media, 1 offsite), postupy failover na záložní systémy, testování obnovy. Vztah: BCP je nadřazené — řeší kontinuitu business bez ohledu na technologii. DRP je součástí BCP pro IT-závislé procesy. Klíčový rozdíl v praxi: BCP řeší "Jak přijímáme objednávky, když padne ERP?" (manuálně, papírem, telefonem). DRP řeší "Jak obnovit ERP systém do 4 hodin?"',
  },
  {
    q: 'Popište typický Incident Response plán. Jaké jsou fáze dle NIST SP 800-61 a co je součástí každé fáze?',
    modelAnswer: 'NIST SP 800-61 Computer Security Incident Handling Guide definuje 4 fáze Incident Response: 1) Preparation — vytvoření a trénink IR týmu, definice rolí a odpovědností, pořízení nástrojů (forensic toolkit, SIEM, komunikační kanály), vytvoření playbooks pro typické scénáře (phishing, ransomware, data breach), a udržování aktuálního inventáře aktiv. 2) Detection & Analysis — monitorování alertů ze SIEM/EDR, triáž (je to skutečný incident nebo false positive?), klasifikace závažnosti (P1–P4), sběr počátečních důkazů, notifikace stakeholderů dle escalation matrix. 3) Containment, Eradication & Recovery — krátkodobý containment (izolace zasažených systémů od sítě), sběr forenzních důkazů, identifikace root cause, eradication (odstranění malwaru, revokace kompromitovaných credentials, patch zranitelnosti), obnova systémů z verified clean backup a ověření integrity. 4) Post-Incident Activity — Post-Incident Review (PIR): timeline incidentu, co fungovalo a co ne, metriky (MTTD, MTTR), aktualizace playbooks a detekčních pravidel, a pokud je to veřejně prospěšné sdílení IoC s komunitou (MISP). Klíčový princip: dokumentovat vše v reálném čase — záznamy jsou nejen pro PIR, ale i pro forenzní vyšetřování a regulatorní povinnosti.',
  },
  {
    q: 'Co je enterprise architektura? Porovnejte přístupy TOGAF a Zachmanův framework — čím se liší, co mají společného?',
    modelAnswer: 'Enterprise Architecture (EA) je disciplína, která vytváří holistický pohled na organizaci z pohledu business, informací, aplikací a technologie — poskytuje "architectural blueprint" pro strategická rozhodnutí o IS/IT. EA propojuje business strategii s IT implementací. TOGAF (The Open Group Architecture Framework, verze 10) je procesní framework: jeho jádrem je ADM (Architecture Development Method) — cyklický 9-fázový process od Preliminary přes Architecture Vision, Business/Information/Application/Technology Architecture, Opportunities & Solutions, Migration Planning, Implementation Governance až po Architecture Change Management. TOGAF poskytuje také Architecture Repository a Architecture Content Framework. Zachmanův framework je klasifikační schema (ne metodologie) — tabulka 6 × 6: 6 perspektiv (Scope/Contextual, Business/Conceptual, System/Logical, Technology/Physical, Detailed/Intrinsic, Functioning Enterprise) × 6 "interrogatives" (What/Data, How/Function, Where/Network, Who/People, When/Time, Why/Motivation). Zachman nepředepisuje postup, pouze klasifikuje architektonické artefakty. Co mají společného: oba pokrývají business i IT vrstvu, oba jsou vendor-neutrální, oba slouží jako komunikační nástroj. Jak jsou komplementární: TOGAF říká HOW (jak EA vytvořit), Zachman říká WHAT (co architektura popisuje). V praxi se Zachman používá pro katalogizaci artefaktů, TOGAF pro procesní governance EA programu.',
  },
  {
    q: 'Co jsou klíčové principy NIS2 direktiv a jak se odráží v novele ZKB v ČR? Koho se nová regulace týká?',
    modelAnswer: 'Direktiva NIS2 (EU 2022/2555) nahrazuje NIS1 z roku 2016 a výrazně zpřísňuje a rozšiřuje povinnosti kybernetické bezpečnosti v EU. Klíčové principy: rozšíření působnosti na 18 odvětvových kategorií (přibyly: odpadní vody, kosmický průmysl, veřejná správa, ICT service management, potravinářství, výzkum); zavedení dvoustupňové klasifikace subjektů (Essential Entities — přísnější režim vs. Important Entities — lehčí); povinné minimální bezpečnostní opatření (risk management, incident handling, supply chain security, šifrování, MFA, patch management); přísnější hlášení incidentů (24h early warning, 72h detailed notification, 1 month final report); a osobní odpovědnost top managementu (management body musí schválit kybernetická opatření a může být osobně sankcionován). Implementace v ČR probíhá zákonem o kybernetické bezpečnosti (novela ZKB č. 181/2014 Sb.): NÚKIB vydává prováděcí vyhlášky specifikující technická a organizační opatření; nová kategorizace subjektů (Vyšší a Nižší regulovaný subjekt); rozšiřuje okruh povinných subjektů. Koho se týká: v ČR cca 6 000+ subjektů (oproti cca 350 dříve) — střední a velké podniky v kritických odvětvích, poskytovatele ICT služeb a platformy nad definovanou velikostí. Sankce: Essential Entities až 10 mil EUR nebo 2 % globálního obratu.',
  },
]
