import type { WikiEntry } from './wiki'

export const WIKI_RPI: WikiEntry[] = [
  {
    id: 'rpi-4it418',
    title: 'Řízení podnikové informatiky',
    area: 'Governance',
    subjects: ['4IT418'],
    related: ['it-strategie-cio', 'itil', 'cobit', 'iso20000-itsm', 'bcm-drp'],
    body: `<p><strong>Řízení podnikové informatiky</strong> řeší strategické, taktické i operativní řízení informatiky, informatických služeb, procesů a zdrojů. V předmětu 4IT418 se propojuje IT strategie, role CIO, sourcing, ITSM, SLA, COBIT/ITIL, enterprise architektura, legislativa, bezpečnost, ochrana dat, náklady a kontinuita služeb.</p>
<p>Jádro odpovědi u zkoušky: podniková informatika není jen provoz technologií. Je to řízení hodnoty, rizik, služeb, zdrojů, odpovědností a souladu IT s cíli organizace.</p>`,
  },
  {
    id: 'it-strategie-cio',
    title: 'IT strategie a CIO',
    area: 'Informační management',
    subjects: ['4IT418', '4SA415'],
    related: ['rpi-4it418', 'it-balanced-scorecard', 'cobit'],
    body: `<p><strong>IT strategie</strong> je dlouhodobý plán rozvoje IT. Určuje směr, priority, investice, architekturu, governance, lidi, procesy, data a technologie. Vychází z globální, obchodní, finanční, HR a dalších dílčích strategií organizace.</p>
<p><strong>CIO</strong> není správce serverovny. Je strategický partner byznysu, který propojuje IT s obchodní strategií, formuluje digitální vizi, hlídá hodnotu IT investic, řídí portfolio, rizika, sourcing a komunikaci s vedením.</p>
<p>Typická past: když IT strategie chybí, vzniká nesoulad IT a byznysu, duplicity systémů, chaos v prioritách projektů a slabá governance.</p>`,
  },
  {
    id: 'it-balanced-scorecard',
    title: 'Náklady a přínosy IS',
    area: 'Governance',
    subjects: ['4IT418', '4SA415'],
    related: ['it-strategie-cio', 'bsc', 'rpi-4it418'],
    body: `<p>Hodnocení IS/IT investic propojuje náklady, přínosy, riziko a strategický soulad. <strong>CAPEX</strong> jsou kapitálové výdaje, například vlastní servery a licence. <strong>OPEX</strong> jsou provozní výdaje, například SaaS předplatné a cloudová kapacita.</p>
<p><strong>TCO</strong> zahrnuje pořizovací, provozní, servisní, školicí, migrační i skryté náklady po celý životní cyklus. <strong>CBA</strong> porovnává náklady a přínosy včetně nehmotných efektů. <strong>NPV</strong> diskontuje budoucí cash flow; NPV &gt; 0 podporuje realizaci. <strong>IRR</strong> je sazba, při které je NPV nulové.</p>
<p><strong>IT Balanced Scorecard</strong> překládá BSC do světa IT: měří hodnotu IT pro business, uživatele, interní procesy a schopnost inovace.</p>`,
  },
  {
    id: 'iso20000-itsm',
    title: 'ISO 20000 a ITSM',
    area: 'ITSM',
    subjects: ['4IT418', '4SA310'],
    related: ['itil', 'incident-problem-change', 'rpi-4it418'],
    body: `<p><strong>ISO/IEC 20000</strong> je mezinárodní norma pro systém řízení IT služeb (SMS). Vychází z principů ITIL a je certifikovatelná na úrovni organizace. ITIL je framework best practices; ISO 20000 stanovuje požadavky.</p>
<p><strong>ITSM</strong> je soubor organizačních schopností pro poskytování hodnoty zákazníkům ve formě IT služeb. Klíčové jsou SLA, katalog služeb, service desk, incident/problem/change/release management, konfigurace, metriky a neustálé zlepšování.</p>
<p>Typická odpověď: ITIL říká, jak řídit služby podle best practices; ISO 20000 říká, co musí být splněno, aby šel systém řízení služeb auditovat a certifikovat.</p>`,
  },
  {
    id: 'incident-problem-change',
    title: 'Incident, problem, change, release',
    area: 'ITSM',
    subjects: ['4IT418', '4SA310'],
    related: ['iso20000-itsm', 'itil', 'bcm-drp'],
    body: `<p><strong>Incident</strong> je neplánované přerušení nebo degradace služby; cílem je rychlá obnova. <strong>Problem</strong> je kořenová příčina jednoho nebo více incidentů; cílem je trvalé odstranění příčiny a prevence opakování.</p>
<p><strong>Change enablement</strong> řídí změny podle rizika. Standard change je nízkoriziková a předem schválená; normal change se posuzuje; emergency change řeší urgentní stav. <strong>CAB</strong> nemá brzdit každou změnu, ale posuzovat vyšší rizika.</p>
<p><strong>Release management</strong> plánuje balík změn k vydání, zatímco <strong>deployment management</strong> řeší technické nasazení do prostředí.</p>`,
  },
  {
    id: 'ea-cloud-rpi',
    title: 'Enterprise architektura a cloud',
    area: 'Organizace',
    subjects: ['4IT418', '4SA418'],
    related: ['rpi-4it418', 'cloud-shared-responsibility', 'it-strategie-cio'],
    body: `<p><strong>Enterprise architektura</strong> je systémový přístup k návrhu a řízení podnikové informatiky. Popisuje procesy, aplikace, data a technologie tak, aby IT podporovalo strategii organizace. Pomáhá standardizovat, odstranit duplicity, řídit roadmapy a usnadnit digitální transformaci.</p>
<p>Frameworky: <strong>Zachman</strong> je klasifikační matice pohledů; <strong>TOGAF</strong> je procesní metodika s ADM. Cloudové modely: public, private, hybrid; služby: IaaS, PaaS, SaaS. Výhody cloudu jsou flexibilita, škálování a rychlost; rizika jsou vendor lock-in, bezpečnost, skryté náklady a omezená kontrola.</p>`,
  },
  {
    id: 'rpi-compliance',
    title: 'GDPR, NIS2 a ZoKB v RPI',
    area: 'Bezpečnost',
    subjects: ['4IT418', '4SA515', '4SA313'],
    related: ['gdpr', 'iso27001', 'rpi-4it418'],
    body: `<p>Řízení podnikové informatiky musí pracovat s právními a bezpečnostními požadavky. <strong>GDPR</strong> chrání osobní údaje, definuje správce, zpracovatele, subjekt údajů, DPO, DPIA, ROPA, DSAR a hlášení porušení zabezpečení osobních údajů typicky do 72 hodin.</p>
<p><strong>ISO 27000 family</strong> řeší ISMS a princip CIA: důvěrnost, integrita, dostupnost. <strong>NIS2</strong> rozšiřuje regulované sektory a zpřísňuje požadavky. Český <strong>ZoKB</strong> a prováděcí vyhlášky konkretizují role, řízení rizik, hlášení incidentů, kontinuitu a audit.</p>`,
  },
  {
    id: 'bcm-drp',
    title: 'BCM, BIA, RTO/RPO a DRP',
    area: 'Řízení rizik',
    subjects: ['4IT418', '4SA515', '4SA551'],
    related: ['rpi-4it418', 'iso27001', 'incident-problem-change'],
    body: `<p><strong>BCM</strong> je holistický manažerský proces pro zajištění pokračování klíčových činností organizace při narušení. Není to jen IT. Zahrnuje business continuity, crisis communication, crisis management a disaster recovery.</p>
<p><strong>BIA</strong> určuje kritické procesy a dopady přerušení. <strong>RTO</strong> říká, za jak dlouho musí být služba obnovena. <strong>RPO</strong> říká, kolik dat lze maximálně ztratit. <strong>MTPD</strong> je maximální tolerovatelná doba narušení. <strong>DRP</strong> je technický plán obnovy IT systémů a infrastruktury.</p>`,
  },
]
