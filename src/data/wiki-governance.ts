import type { WikiEntry } from './wiki'

export const WIKI_GOVERNANCE: WikiEntry[] = [
  {
    id: 'it-governance',
    title: 'IT Governance',
    area: 'Governance',
    subjects: ['4SA310', '4SA415'],
    related: ['cobit', 'iso-38500', 'egit', 'itil', 'bsc', 'coso'],
    body: `<p><strong>IT Governance</strong> (řízení IT) je soubor procesů, struktur, mechanismů a vztahů, pomocí nichž organizace řídí a kontroluje svůj IT aparát tak, aby IT podporovalo podnikové cíle, vytvářelo hodnotu a řídilo rizika. IT Governance není totéž co IT management — zatímco management řeší každodenní provoz, governance nastavuje směr, priority a odpovědnosti na úrovni vedení organizace.</p>
<p>Klíčové otázky IT Governance jsou: <em>Jakou hodnotu IT přináší?</em>, <em>Jaká jsou IT rizika a jak jsou řízena?</em>, <em>Jsou IT zdroje optimálně využity?</em> Odpovídá na ně rada ředitelů (board) a vrcholový management prostřednictvím politik, schvalovacích procesů a reportingových mechanismů.</p>
<p>Hlavní referenční rámce pro IT Governance zahrnují <a href="#cobit">COBIT</a> od <a href="#isaca">ISACA</a>, <a href="#iso-38500">ISO/IEC 38500</a>, <a href="#itil">ITIL</a> pro správu IT služeb a <a href="#coso">COSO</a> pro interní kontrolu. Tyto rámce se vzájemně doplňují a nejsou v přímém konkurenčním vztahu.</p>
<p>Výsledky dobré IT Governance se měří pomocí <a href="#kpi">KPI</a> a <a href="#kgi">KGI</a>, přičemž propojení IT cílů s podnikovými cíli je vizualizováno prostřednictvím <a href="#bsc">Balanced Scorecard</a> a <a href="#strategy-map">Strategy Map</a>. Governance Structure definuje výbory (IT Steering Committee, Risk Committee), role (CIO, CISO, IA) a odpovědnosti zachycené v <a href="#raci">RACI maticích</a>.</p>`,
  },
  {
    id: 'egit',
    title: 'EGIT — Enterprise Governance of IT',
    area: 'Governance',
    subjects: ['4SA310'],
    related: ['it-governance', 'cobit', 'iso-38500', 'isaca'],
    body: `<p><strong>EGIT</strong> (Enterprise Governance of IT) je pojem prosazovaný <a href="#isaca">ISACA</a> a Van Grembergenem, který rozšiřuje <a href="#it-governance">IT Governance</a> o celou šíři podnikové perspektivy. EGIT zdůrazňuje, že IT není izolovaná doména technologií, ale integrální součást podnikového řízení.</p>
<p>EGIT se skládá ze dvou vzájemně propojených dimenzí: <em>Corporate Governance of IT</em> (zajišťuje soulad IT s podnikovou strategií a legislativou — odpovědnost boardu) a <em>IT Management</em> (plánování, organizace, realizace a monitoring IT — odpovědnost CxO).</p>
<p>Koncept EGIT pracuje s pěti základními oblastmi: strategické sladění (alignment), tvorba hodnoty (value delivery), řízení rizik (risk management), řízení zdrojů (resource management) a měření výkonu (performance measurement). Tyto oblasti jsou přímo zahrnuty do struktury <a href="#cobit">COBIT</a> jako governance cíle.</p>
<p>Praktické nástroje EGIT zahrnují <a href="#bsc">BSC</a> pro měření výkonu, <a href="#raci">RACI matice</a> pro vymezení odpovědností a <a href="#cobit-2019">COBIT 2019</a> jako operativní rámec pro implementaci. Výzkum Van Grembegena ukázal, že bez formální EGIT struktury dochází k tzv. IT-Business misalignment — IT projekty selhávají nebo přinášejí nízkou hodnotu.</p>`,
  },
  {
    id: 'cobit',
    title: 'COBIT',
    area: 'Governance',
    subjects: ['4SA310', '4SA513'],
    related: ['it-governance', 'isaca', 'cobit-5', 'cobit-2019', 'itil', 'iso-38500'],
    body: `<p><strong>COBIT</strong> (Control Objectives for Information and Related Technologies) je komplexní rámec pro <a href="#it-governance">IT Governance</a> a management vydávaný <a href="#isaca">ISACA</a>. Od svého vzniku v roce 1996 jako auditní standard prošel čtyřmi hlavními verzemi — COBIT 4.1 zavedl kontrolní cíle a RACI, <a href="#cobit-5">COBIT 5</a> přinesl procesní model s 37 procesy a princip 5 principů, a <a href="#cobit-2019">COBIT 2019</a> přinesl flexibilní design systému řízení.</p>
<p>Základní myšlenkou COBIT je propojení podnikových cílů s IT cíli pomocí <a href="#kaskadovani-cilu">kaskádování cílů</a>. COBIT definuje pro každý proces kontrolní cíle, měřítka výkonu a výsledků, typické vstupy/výstupy a odpovědnosti pomocí <a href="#raci">RACI matic</a>.</p>
<p>COBIT se typicky používá ve spojení s dalšími rámci: <a href="#itil">ITIL</a> pro správu IT služeb, <a href="#iso-27001">ISO 27001</a> pro bezpečnost informací a <a href="#coso">COSO</a> pro interní kontrolu. COBIT je také podkladem pro certifikaci <a href="#cisa">CISA</a> a <a href="#itaf">ITAF</a> metodiku IT auditu.</p>
<p>Praktická implementace COBIT vychází z hodnocení zralosti procesů pomocí <a href="#process-capability">Process Capability Modelu</a> a <a href="#pam-audit">Process Assessment Modelu (PAM)</a>, přičemž organizace obvykle cílí na úroveň 2 (managed process) nebo 3 (established process).</p>`,
  },
  {
    id: 'cobit-5',
    title: 'COBIT 5',
    area: 'Governance',
    subjects: ['4SA310'],
    parentId: 'cobit',
    related: ['cobit', 'cobit-2019', 'enablery-cobit5', 'edm-domena', 'raci'],
    body: `<p><strong>COBIT 5</strong> (2012) je verze rámce <a href="#cobit">COBIT</a>, která poprvé přinesla ucelený pohled na IT Governance a management jako kontinuum od strategie k operativě. COBIT 5 je postaven na <em>pěti principech</em>: (1) Plnit potřeby stakeholderů, (2) Pokrýt celou organizaci end-to-end, (3) Aplikovat jediný integrovaný rámec, (4) Umožnit holistický přístup, (5) Oddělovat Governance od Managementu.</p>
<p>COBIT 5 obsahuje 37 procesů rozdělených do dvou domén: Governance (EDM doména — 5 procesů) a Management (APO, BAI, DSS, MEA — celkem 32 procesů). Každý proces je popsán účelem, IT a podnikovými cíli, praktikami, vstupy/výstupy, metrikami a <a href="#raci">RACI maticí</a>.</p>
<p>Klíčovým nástrojem COBIT 5 jsou <a href="#enablery-cobit5">Enablery</a> — sedm kategorií faktorů, které ovlivňují, zda governance a management IT fungují: Principy, politiky a rámce; Procesy; Organizační struktury; Kultura, etika a chování; Informace; Služby, infrastruktura a aplikace; Lidé, dovednosti a kompetence.</p>
<p>COBIT 5 byl v roce 2018 nahrazen <a href="#cobit-2019">COBIT 2019</a>, který přinesl flexibilnější design přes <a href="#design-factors">Design Factors</a> a <a href="#focus-areas">Focus Areas</a>. Certifikace COBIT 5 Foundation a COBIT 5 Assessor/Implementer jsou stále platné.</p>`,
  },
  {
    id: 'cobit-2019',
    title: 'COBIT 2019',
    area: 'Governance',
    subjects: ['4SA310', '4SA513'],
    parentId: 'cobit',
    related: ['cobit', 'cobit-5', 'design-factors', 'focus-areas', 'kaskadovani-cilu', 'edm-domena'],
    body: `<p><strong>COBIT 2019</strong> je aktuální verze rámce <a href="#cobit">COBIT</a> vydaná <a href="#isaca">ISACA</a> v roce 2018. Oproti předchůdci <a href="#cobit-5">COBIT 5</a> přináší dvě zásadní inovace: systém <a href="#design-factors">Design Factors</a> pro přizpůsobení rámce konkrétní organizaci a přeorganizování procesního modelu na 40 governance a management cílů (governance objectives).</p>
<p>COBIT 2019 definuje <em>systém řízení IT</em> jako kombinaci šesti součástí (components of a governance system): Processes, Organizational structures, Principles/policies/frameworks, Information, Culture/ethics/behavior, People/skills/competencies, Services/infrastructure/applications. Každá součást může být evaluována a vylepšena.</p>
<p>Klíčový je mechanismus <a href="#kaskadovani-cilu">kaskádování cílů</a>: Enterprise Goals → Alignment Goals → Governance and Management Objectives. COBIT 2019 nabízí standardní sadu 13 Enterprise Goals, 13 Alignment Goals a 40 Governance/Management Objectives.</p>
<p><a href="#edm-domena">EDM doména</a> zůstává governance doménou (Evaluate, Direct, Monitor) s 6 procesy. Management domény jsou APO (Align, Plan, Organize — 14 procesů), BAI (Build, Acquire, Implement — 11), DSS (Deliver, Service, Support — 6), MEA (Monitor, Evaluate, Assess — 4).</p>
<p><a href="#focus-areas">Focus Areas</a> (Cybersecurity, DevOps, Cloud Computing, Privacy, AI…) jsou tematické rozšíření základního rámce pro specifické technologické nebo regulatorní oblasti.</p>`,
  },
  {
    id: 'edm-domena',
    title: 'EDM doména',
    area: 'Governance',
    subjects: ['4SA310'],
    parentId: 'cobit-2019',
    related: ['cobit', 'cobit-2019', 'cobit-5', 'it-governance'],
    body: `<p><strong>EDM doména</strong> (Evaluate, Direct, Monitor) je governance doménou v rámci <a href="#cobit">COBIT</a>. Zatímco management domény (APO, BAI, DSS, MEA) řeší operativní řízení IT, EDM doména odpovídá potřebám boardu a vrcholového managementu — nastavuje směr, hodnotí alternativy a monitoruje výsledky.</p>
<p>V <a href="#cobit-2019">COBIT 2019</a> zahrnuje EDM doménu 6 procesů:</p>
<ul>
  <li><strong>EDM01</strong> — Ensured Governance Framework Setting and Maintenance (nastavení systému řízení)</li>
  <li><strong>EDM02</strong> — Ensured Benefits Delivery (realizace přínosů)</li>
  <li><strong>EDM03</strong> — Ensured Risk Optimisation (optimalizace rizik)</li>
  <li><strong>EDM04</strong> — Ensured Resource Optimisation (optimalizace zdrojů)</li>
  <li><strong>EDM05</strong> — Ensured Stakeholder Engagement (zapojení stakeholderů)</li>
  <li><strong>EDM06</strong> — Ensured Innovation (řízení inovací) — nový v COBIT 2019</li>
</ul>
<p>Klíčové aktivity EDM domény zahrnují schvalování IT strategie a portfolia, nastavení rizikového apetitu, alokaci klíčových IT zdrojů a reporting boardu. Tyto aktivity jsou přímou odpovědností vedení organizace, nikoliv IT oddělení.</p>`,
  },
  {
    id: 'isaca',
    title: 'ISACA',
    area: 'Governance',
    subjects: ['4SA310', '4SA513'],
    related: ['cobit', 'cisa', 'itaf', 'it-governance'],
    body: `<p><strong>ISACA</strong> (Information Systems Audit and Control Association) je mezinárodní odborná asociace zaměřená na IT Governance, audit, bezpečnost a řízení rizik informačních systémů. Byla founded v roce 1969 a dnes sdružuje přes 165 000 členů ve více než 180 zemích.</p>
<p>ISACA vydává a spravuje klíčové rámce a standardy pro obor: <a href="#cobit">COBIT</a> pro IT Governance, <a href="#itaf">ITAF</a> pro IT audit, VALIT pro management hodnoty IT a RISKIT pro řízení rizik IT. Tyto rámce jsou uznávány jako průmyslové standardy a jsou základem pro audity, certifikace a regulatorní shodu.</p>
<p>ISACA administruje prestižní certifikace:</p>
<ul>
  <li><a href="#cisa">CISA</a> — Certified Information Systems Auditor</li>
  <li>CISM — Certified Information Security Manager</li>
  <li>CRISC — Certified in Risk and Information Systems Control</li>
  <li>CGEIT — Certified in the Governance of Enterprise IT</li>
  <li>CDPSE — Certified Data Privacy Solutions Engineer</li>
</ul>
<p>V České republice působí ISACA Czech Republic Chapter, která organizuje lokální vzdělávací akce, setkání profesionálů a přípravu na certifikační zkoušky.</p>`,
  },
  {
    id: 'iso-38500',
    title: 'ISO/IEC 38500',
    area: 'Governance',
    subjects: ['4SA310'],
    related: ['it-governance', 'cobit', 'egit'],
    body: `<p><strong>ISO/IEC 38500</strong> je mezinárodní standard pro Corporate Governance of Information Technology (od roku 2015 přejmenován na IT Governance of Organizations). Standard vydaný v roce 2008 (revize 2015) definuje principy pro zodpovědné a efektivní řízení IT na úrovni vedení organizace.</p>
<p>Standard je postaven na <em>šesti principech dobré IT governance</em>:</p>
<ul>
  <li><strong>Responsibility</strong> — přidělení a přijetí odpovědnosti za IT</li>
  <li><strong>Strategy</strong> — strategická sladění IT s podnikovou strategií</li>
  <li><strong>Acquisition</strong> — transparentní pořizování IT na základě odůvodnění</li>
  <li><strong>Performance</strong> — IT musí odpovídat potřebám organizace</li>
  <li><strong>Conformance</strong> — soulad IT s legislativou a interními politikami</li>
  <li><strong>Human Behaviour</strong> — respektování lidského chování v IT politikách</li>
</ul>
<p>ISO/IEC 38500 definuje tři hlavní governance aktivity: Evaluate (hodnocení alternativních strategií a plánů), Direct (vydávání směrnic a přidělování odpovědností) a Monitor (sledování výkonu IT). Tento model EDM je přímo inspirací pro <a href="#cobit">COBIT</a> <a href="#edm-domena">EDM doménu</a>.</p>
<p>Na rozdíl od <a href="#cobit">COBIT</a> neposkytuje ISO/IEC 38500 detailní implementační návod — je to principiální standard vhodný jako výchozí bod pro governance framework a pro komunikaci s boardem.</p>`,
  },
  {
    id: 'bsc',
    title: 'Balanced Scorecard',
    area: 'Governance',
    subjects: ['4SA310', '4SA415'],
    related: ['strategy-map', 'kpi', 'kgi', 'kaskadovani-cilu', 'it-governance'],
    body: `<p><strong>Balanced Scorecard (BSC)</strong> je strategický management a měřicí framework navržený Robertem Kaplanem a Davidem Nortonem v roce 1992. BSC rozšiřuje tradiční finanční měření o tři další perspektivy, čímž poskytuje vyvážený (balanced) pohled na výkonnost organizace.</p>
<p>Čtyři perspektivy BSC:</p>
<ul>
  <li><strong>Finanční perspektiva</strong> — návratnost investic, zisk, cash flow, growth revenue</li>
  <li><strong>Zákaznická perspektiva</strong> — spokojenost zákazníků, podíl na trhu, loajalita</li>
  <li><strong>Perspektiva interních procesů</strong> — efektivita klíčových procesů, inovace, čas cyklu</li>
  <li><strong>Perspektiva učení a růstu</strong> — kompetence zaměstnanců, kultura, IS/IT kapacity</li>
</ul>
<p>Pro IT oblast je zvláště důležitá perspektiva učení a růstu, kde IT infrastruktura a IS kompetence figurují jako klíčové enablery. <a href="#cobit">COBIT</a> přebral BSC logiku a definuje IT BSC (ITBSC) se čtyřmi IT specifickými perspektivami: Business Contribution, User Orientation, Operational Excellence, Future Orientation.</p>
<p>BSC je doplněn <a href="#strategy-map">Strategy Map</a>, která vizualizuje příčinné vztahy mezi cíli ve všech čtyřech perspektivách. Měřítka jsou reprezentována prostřednictvím <a href="#kpi">KPI</a> a <a href="#kgi">KGI</a>.</p>`,
  },
  {
    id: 'strategy-map',
    title: 'Strategy Map',
    area: 'Governance',
    subjects: ['4SA310'],
    parentId: 'bsc',
    related: ['bsc', 'kpi', 'kgi', 'kaskadovani-cilu'],
    body: `<p><strong>Strategy Map</strong> je vizuální nástroj vyvinutý Kaplanem a Nortonem jako rozšíření <a href="#bsc">Balanced Scorecard</a>. Mapa strategie zobrazuje, jak organizace vytváří hodnotu prostřednictvím příčinných vztahů (cause-and-effect linkages) mezi strategickými cíli ve všech čtyřech BSC perspektivách.</p>
<p>Klíčový princip Strategy Map: cíle v perspektivě učení a růstu (IT kompetence, kultura, systémy) umožňují dosahování cílů v perspektivě interních procesů, které pak vedou k zákaznickým výsledkům, a ty se nakonec promítají do finančních výsledků. Tato logika "if… then…" je explicitně zobrazena šipkami na mapě.</p>
<p>V kontextu IT governance se Strategy Map používá pro demonstraci, jak investice do IT (infrastruktura, lidé, systémy) přispívají k podnikovým výsledkům. To je klíčový nástroj pro obhájení IT rozpočtu a pro komunikaci IT hodnoty boardu — odpovídá na otázku Solow paradoxu produktivity IT.</p>
<p>Strategy Map propojuje s <a href="#kaskadovani-cilu">kaskádováním cílů</a> v <a href="#cobit">COBIT</a> — COBIT 2019 používá podobnou logiku kaskády od Enterprise Goals přes Alignment Goals k Governance/Management Objectives.</p>`,
  },
  {
    id: 'kaskadovani-cilu',
    title: 'Kaskádování cílů',
    area: 'Governance',
    subjects: ['4SA310'],
    related: ['cobit', 'cobit-2019', 'bsc', 'strategy-map', 'kpi', 'kgi'],
    body: `<p><strong>Kaskádování cílů</strong> (Goals Cascade) je mechanismus v <a href="#cobit">COBIT</a>, který překládá potřeby stakeholderů a podnikové cíle do konkrétních IT cílů a nakonec do cílů enablerů (procesů, lidí, technologií). Jde o klíčový nástroj pro dosažení IT-business alignment.</p>
<p>V <a href="#cobit-2019">COBIT 2019</a> funguje kaskáda na třech úrovních:</p>
<ol>
  <li><strong>Enterprise Goals</strong> — 13 standardních podnikových cílů (Financial, Customer, Internal, Learning perspektivy dle BSC)</li>
  <li><strong>Alignment Goals</strong> — 13 IT alignment cílů, které mapují, jak IT přispívá k plnění Enterprise Goals</li>
  <li><strong>Governance and Management Objectives</strong> — 40 procesních cílů COBIT, mapovaných na Alignment Goals</li>
</ol>
<p>COBIT 2019 poskytuje standardní mapping tabulky, které ukazují, které Alignment Goals jsou primárně nebo sekundárně podporovány každým procesem. Organizace může na základě svých prioritních Enterprise Goals identifikovat, které IT procesy jsou pro ni kriticky důležité.</p>
<p>Kaskádování cílů je vstupem pro design systému řízení IT prostřednictvím <a href="#design-factors">Design Factors</a> — umožňuje prioritizovat, které procesy je třeba implementovat na jaké úrovni zralosti.</p>`,
  },
  {
    id: 'kpi',
    title: 'KPI — Key Performance Indicator',
    area: 'Governance',
    subjects: ['4SA310', '4SA415'],
    related: ['kgi', 'bsc', 'kaskadovani-cilu', 'kri'],
    body: `<p><strong>KPI</strong> (Key Performance Indicator) jsou měřítka, která sledují výkonnost procesů a aktivit vedoucích k dosažení cíle. Na rozdíl od <a href="#kgi">KGI</a> (Key Goal Indicator), které měří dosažení výsledku, KPI měří průběh a efektivitu procesů — jsou tedy leading indicators (prediktivní).</p>
<p>V kontextu IT a <a href="#cobit">COBIT</a> jsou KPI definovány pro každý IT proces a měří, jak dobře daný proces funguje. Příklady IT KPI: průměrná doba vyřešení incidentu (MTTR), počet neautorizovaných změn, pokrytí zálohovacích testů, % SLA splnění, počet výjimek v přístupových právech.</p>
<p>Pro kvalitní KPI platí SMART kritéria: Specific (konkrétní), Measurable (měřitelné), Achievable (dosažitelné), Relevant (relevantní), Time-bound (časově ohraničené). V COBIT 2019 jsou KPI součástí každého governance a management objective jako metriky výkonu (performance metrics).</p>
<p>Ve vztahu k bezpečnosti informací se používají specifické bezpečnostní KPI viz <a href="#kri">KRI (Key Risk Indicators)</a>, které varují před nárůstem rizika — například počet neúspěšných přihlášení, počet detekovaných malware incidentů apod.</p>`,
  },
  {
    id: 'kgi',
    title: 'KGI — Key Goal Indicator',
    area: 'Governance',
    subjects: ['4SA310'],
    related: ['kpi', 'bsc', 'kaskadovani-cilu'],
    body: `<p><strong>KGI</strong> (Key Goal Indicator) jsou měřítka, která potvrzují, zda bylo dosaženo stanoveného cíle. Zatímco <a href="#kpi">KPI</a> jsou průběžné (leading) ukazatele výkonu procesů, KGI jsou výsledkové (lagging) ukazatele dosažení cíle — odpovídají na otázku "Bylo cíle dosaženo?".</p>
<p>V kontextu <a href="#cobit">COBIT</a> jsou KGI definovány na dvou úrovních: <em>IT Balanced Scorecard Goals</em> (celopodnikové IT cíle jako "IT přispívá ke zvyšování tržní hodnoty") a <em>Procesní cíle</em> (výsledky konkrétního procesu, např. "Všechny incidenty jsou vyřešeny v souladu s SLA"). KGI pro IT cíle jsou vstupy pro BSC perspektivy.</p>
<p>Příklady KGI v IT: % IT projektů dodaných v čase a rozpočtu, % systémů s aktuální bezpečnostní dokumentací, stupeň spokojenosti uživatelů s IT službami (CSI skóre), % splnění SLA pro kritické systémy.</p>
<p>Vztah KPI–KGI: KPI měří průběh aktivit, které vedou k výsledku zachycenému KGI. Pokud KGI není splněno, procházíme zpět přes KPI, abychom identifikovali, kde v procesu nastala odchylka.</p>`,
  },
  {
    id: 'raci',
    title: 'RACI matice',
    area: 'Governance',
    subjects: ['4SA310', '4SA513'],
    related: ['it-governance', 'cobit', 'sod'],
    body: `<p><strong>RACI matice</strong> je nástroj pro mapování odpovědností v procesech a projektech. Zkratka RACI znamená: <strong>R</strong> — Responsible (kdo vykonává aktivitu), <strong>A</strong> — Accountable (kdo nese zodpovědnost za výsledek, jen jedna osoba), <strong>C</strong> — Consulted (kdo musí být dotázán před rozhodnutím), <strong>I</strong> — Informed (kdo musí být informován o výsledku).</p>
<p>RACI se používá pro eliminaci nejasností v odpovědnostech: každá aktivita nebo rozhodnutí v matici má přiřazeny role. <a href="#cobit">COBIT</a> definuje RACI matice pro každý ze 40 governance a management procesů a zahrnuje role jako Board, CEO, CFO, CIO, CISO, CRO, CAE, Head of IT Operations, Business Process Owner apod.</p>
<p>Správně nastavená RACI matice pomáhá identifikovat mezery (nikdo není Responsible), duplikace (více osob je Accountable) nebo přetížení (jedna osoba je R nebo C u příliš mnoha aktivit). Je také nástrojem pro prosazení principu <a href="#sod">Segregation of Duties</a> — inkompatibilní kombinace R/A rolí jsou explicitně odděleny.</p>
<p>Varianty RACI: RASCI (S = Support), RACIO (O = Omitted/Out of loop), CAIRO (C a A na prvním místě). V praxi je nejčastěji používána standardní RACI nebo RASCI.</p>`,
  },
  {
    id: 'design-factors',
    title: 'Design Factors',
    area: 'Governance',
    subjects: ['4SA310'],
    parentId: 'cobit-2019',
    related: ['cobit-2019', 'focus-areas', 'kaskadovani-cilu'],
    body: `<p><strong>Design Factors</strong> jsou v <a href="#cobit-2019">COBIT 2019</a> sada kontextových faktorů, které ovlivňují design systému IT governance konkrétní organizace. Jde o inovaci oproti <a href="#cobit-5">COBIT 5</a>, která umožňuje tailoring — přizpůsobení rámce specifickým potřebám místo univerzálního přístupu.</p>
<p>COBIT 2019 definuje 11 Design Factors ve třech skupinách:</p>
<ul>
  <li><strong>Enterprise context</strong> — typ organizace (velikost, sektor, regulace), globální rozsah, strategie růstu, informační architektura, IT přístup (centralizovaný/decentralizovaný)</li>
  <li><strong>Risk profile</strong> — relativní důležitost rizikových témat (cybersecurity, regulatorní shoda, continuity, přijímání technologií…)</li>
  <li><strong>IT issues</strong> — aktuální problémy a bolestivá místa IT v organizaci</li>
</ul>
<p>Pro každou kombinaci Design Factors poskytuje COBIT 2019 guidance, které governance a management objectives by měly mít jakou úroveň priority (high/medium/low) a jaký capability level by měly dosahovat. Výsledkem je tzv. <em>Target Profile</em> — přizpůsobený governance design pro konkrétní organizaci.</p>
<p>Design Factors doplňují <a href="#focus-areas">Focus Areas</a>, které rozšiřují rámec o specifické technologické nebo regulatorní domény.</p>`,
  },
  {
    id: 'focus-areas',
    title: 'Focus Areas',
    area: 'Governance',
    subjects: ['4SA310'],
    parentId: 'cobit-2019',
    related: ['cobit-2019', 'design-factors', 'isms', 'it-governance'],
    body: `<p><strong>Focus Areas</strong> jsou v <a href="#cobit-2019">COBIT 2019</a> tematická rozšíření základního rámce pro specifické technologické nebo regulatorní domény. Každý Focus Area doplňuje standardní governance a management objectives COBIT o guidance specifické pro danou oblast.</p>
<p>Dostupné COBIT 2019 Focus Areas zahrnují:</p>
<ul>
  <li><strong>Information Security</strong> — propojení s <a href="#iso-27001">ISO 27001</a> a řízení bezpečnostních rizik</li>
  <strong>DevOps</strong> — integrace governance do agilních a DevOps způsobů práce</li>
  <li><strong>Cloud Computing</strong> — governance cloudových služeb, TPRM</li>
  <li><strong>Privacy</strong> — soulad s GDPR a ochrana osobních údajů</li>
  <li><strong>Small and Medium Enterprises</strong> — zjednodušený governance framework pro SME</li>
  <li><strong>Cybersecurity</strong> — rozšíření o kybernetickou bezpečnostní governance</li>
</ul>
<p>Focus Areas nenahrazují základní COBIT 2019 — jsou vrstvou navrch, která přidává specifické praktiky, metriky a guidance. Organizace si vybere relevantní Focus Areas na základě svého profilu určeného <a href="#design-factors">Design Factors</a>.</p>`,
  },
  {
    id: 'enablery-cobit5',
    title: 'Enablery COBIT 5',
    area: 'Governance',
    subjects: ['4SA310'],
    parentId: 'cobit-5',
    related: ['cobit-5', 'cobit-2019', 'it-governance'],
    body: `<p><strong>Enablery COBIT 5</strong> jsou sedm kategorií faktorů, které buď podporují, nebo brání dosažení cílů IT governance a managementu. Jsou nahrazeny pojmem "components of a governance system" v <a href="#cobit-2019">COBIT 2019</a>, ale základní logika zůstala zachována.</p>
<p>Sedm enablerů <a href="#cobit-5">COBIT 5</a>:</p>
<ol>
  <li><strong>Principy, politiky a rámce</strong> — formální dokumenty řídící chování organizace</li>
  <li><strong>Procesy</strong> — organizované aktivity a praktiky pro dosažení cílů</li>
  <li><strong>Organizační struktury</strong> — klíčová rozhodovací tělesa (výbory, role)</li>
  <li><strong>Kultura, etika a chování</strong> — hodnotový systém a postoje k IT a bezpečnosti</li>
  <li><strong>Informace</strong> — produkce, zpracování a komunikace informací</li>
  <li><strong>Služby, infrastruktura a aplikace</strong> — technologické enablery</li>
  <li><strong>Lidé, dovednosti a kompetence</strong> — lidský kapitál</li>
</ol>
<p>Každý enabler může být hodnocen prostřednictvím čtyř dimenzí: Stakeholders, Goals, Life cycle, Good practices. Governance systém funguje efektivně pouze tehdy, jsou-li všechny enablery v souladu — slabý enabler (např. nízká kultura bezpečnosti) může podkopat efektivitu sebelepšího procesu.</p>`,
  },
  {
    id: 'itsm',
    title: 'ITSM — IT Service Management',
    area: 'ITSM',
    subjects: ['4SA310', '4SA415'],
    related: ['itil', 'sla', 'ola', 'incident-management', 'problem-management', 'change-management', 'cmdb'],
    body: `<p><strong>ITSM</strong> (IT Service Management) je soubor procesů, metod a nástrojů pro plánování, dodávku, podporu a zlepšování IT služeb zákazníkům (interním i externím). Klíčovým principem ITSM je orientace na zákazníka a hodnotu — IT přestává být poskytovatelem technologií a stává se poskytovatelem služeb.</p>
<p>Jádrem ITSM je katalog IT služeb, <a href="#sla">SLA</a> (Service Level Agreement) definující úrovně kvality, a životní cyklus každé služby od strategie přes design, přechod a provoz až po kontinuální zlepšování. Hlavním referenčním rámcem ITSM je <a href="#itil">ITIL</a>.</p>
<p>Klíčové procesy ITSM zahrnují: <a href="#incident-management">Incident Management</a> (obnova service ASAP), <a href="#problem-management">Problem Management</a> (eliminace kořenových příčin), <a href="#change-management">Change Management</a> (řízené zavádění změn), Service Level Management (sledování SLA), Configuration Management (správa <a href="#cmdb">CMDB</a>) a Capacity/Availability Management.</p>
<p>Moderní ITSM platformy (ServiceNow, Jira Service Management, Freshservice) integrují všechny procesy do jednoho nástroje a umožňují automatizaci pomocí <a href="#rpa">RPA</a>. ITSM se v <a href="#itil-v4">ITIL 4</a> rozšiřuje o integraci s agile, DevOps a Lean přístupy.</p>`,
  },
  {
    id: 'itil',
    title: 'ITIL',
    area: 'ITSM',
    subjects: ['4SA310', '4SA415'],
    related: ['itsm', 'itil-v3', 'itil-v4', 'sla', 'cobit', 'incident-management'],
    body: `<p><strong>ITIL</strong> (Information Technology Infrastructure Library) je nejrozšířenější framework pro <a href="#itsm">IT Service Management</a>. Vznikl v 80. letech ve Velké Británii pro vládní IT služby a od té doby se stal de facto globálním standardem. Spravuje ho Axelos (nyní PeopleCert).</p>
<p>ITIL není normativní standard (jako ISO 27001) — jde o soubor best practices, doporučení a procesních popisů, které organizace implementují dle svých potřeb. ITIL je rozdělen do verzí: <a href="#itil-v3">ITIL v3</a> (2007/2011) postavený na životním cyklu služby a <a href="#itil-v4">ITIL 4</a> (2019) postavený na Service Value System.</p>
<p>Certifikační schéma ITIL zahrnuje: ITIL 4 Foundation (základní přehled), ITIL 4 Managing Professional (provoz a správa), ITIL 4 Strategic Leader (governance a strategie) a ITIL 4 Master (komplexní zvládnutí). Certifikace Foundation je jednou z nejrozšířenějších IT certifikací na světě.</p>
<p>Propojení s <a href="#cobit">COBIT</a>: COBIT je governance framework (co a proč), ITIL je management framework (jak). Organizace typicky používají COBIT pro governance a ITIL pro operativní ITSM procesy. <a href="#isaca">ISACA</a> a Axelos vydaly mapping dokumentaci.</p>`,
  },
  {
    id: 'itil-v3',
    title: 'ITIL v3',
    area: 'ITSM',
    subjects: ['4SA310'],
    parentId: 'itil',
    related: ['itil', 'itil-v4', 'itsm', 'sla', 'incident-management', 'problem-management', 'change-management'],
    body: `<p><strong>ITIL v3</strong> (vydaný 2007, aktualizován 2011) strukturuje ITSM kolem <em>životního cyklu IT služby</em> ve pěti fázích, z nichž každá je popsána v samostatné publikaci:</p>
<ol>
  <li><strong>Service Strategy</strong> — definice hodnoty, tržní prostor, portfolio služeb, finanční management IT</li>
  <li><strong>Service Design</strong> — design nových i změněných služeb, katalog, SLA, kapacita, dostupnost, kontinuita, bezpečnost</li>
  <li><strong>Service Transition</strong> — <a href="#change-management">Change Management</a>, Release Management, <a href="#cmdb">Configuration Management</a>, Knowledge Management</li>
  <li><strong>Service Operation</strong> — <a href="#incident-management">Incident Management</a>, <a href="#problem-management">Problem Management</a>, Event Management, Request Fulfilment, Access Management</li>
  <li><strong>Continual Service Improvement</strong> — PDCA cyklus pro zlepšování IT služeb, CSI registr</li>
</ol>
<p>ITIL v3 definoval 26 procesů a 4 funkce (Service Desk, Technical Management, Application Management, IT Operations Management). Procesní přístup ITIL v3 byl kritizován jako příliš rigidní pro agilní prostředí, což vedlo k redesignu v <a href="#itil-v4">ITIL 4</a>.</p>`,
  },
  {
    id: 'itil-v4',
    title: 'ITIL 4',
    area: 'ITSM',
    subjects: ['4SA310'],
    parentId: 'itil',
    related: ['itil', 'itil-v3', 'itsm', 'sla'],
    body: `<p><strong>ITIL 4</strong> (vydaný 2019) je aktuální verze ITIL, která reaguje na digitální transformaci, agilní způsoby práce a DevOps. Místo životního cyklu služby zavádí <em>Service Value System (SVS)</em> jako komplexní model tvorby hodnoty.</p>
<p>SVS obsahuje pět součástí: Guiding Principles (7 principů jako Focus on value, Think and work holistically, Keep it simple and practical), Governance (řízení IT), Service Value Chain (6 aktivit: Plan, Improve, Engage, Design &amp; Transition, Obtain/Build, Deliver &amp; Support), Practices (34 management practices nahrazující procesy) a Continual Improvement.</p>
<p>34 ITIL 4 Practices jsou rozděleny do tří skupin: General management practices (Continual Improvement, Risk Management, Supplier Management…), Service management practices (Incident Management, Problem Management, Change Enablement, Service Desk…), Technical management practices (Infrastructure &amp; Platform Management, Software Development &amp; Management…).</p>
<p>ITIL 4 klade důraz na 4 dimenze: Organizations &amp; People, Information &amp; Technology, Partners &amp; Suppliers, Value Streams &amp; Processes — každá služba musí být designována s ohledem na všechny čtyři dimenze. Integrace s Agile/DevOps/Lean je klíčovým tématem.</p>`,
  },
  {
    id: 'sla',
    title: 'SLA — Service Level Agreement',
    area: 'ITSM',
    subjects: ['4SA310', '4SA415'],
    related: ['ola', 'itsm', 'itil', 'kpi', 'incident-management'],
    body: `<p><strong>SLA</strong> (Service Level Agreement) je formální smlouva nebo dohoda mezi poskytovatelem IT služby a zákazníkem (interním business unit nebo externím zákazníkem), která definuje dohodnuté úrovně kvality služby a způsob jejich měření.</p>
<p>Typické komponenty SLA zahrnují: rozsah a popis služby, dostupnost (např. 99,9% uptime = max. 8,7h výpadku/rok), dobu odezvy (response time) a dobu vyřešení (resolution time) pro jednotlivé priority incidentů, procedury eskalace, reportingové požadavky, výjimky a vyloučení, a důsledky porušení (Service Credits).</p>
<p>ITIL rozlišuje tři typy SLA: <em>Service-based SLA</em> (jedno SLA pro všechny zákazníky dané služby), <em>Customer-based SLA</em> (individuální SLA pro konkrétního zákazníka) a <em>Multi-level SLA</em> (hierarchická struktura: Corporate SLA → Customer SLA → Service SLA).</p>
<p>SLA je závislé na <a href="#ola">OLA</a> (Operational Level Agreement) — interních dohodách mezi IT týmy, které SLA podporují. Porušení OLA interně pravděpodobně povede k porušení SLA. Plnění SLA se sleduje pomocí <a href="#kpi">KPI</a> a reportuje se zákazníkovi v pravidelných Service Review meetings.</p>`,
  },
  {
    id: 'ola',
    title: 'OLA — Operational Level Agreement',
    area: 'ITSM',
    subjects: ['4SA310'],
    related: ['sla', 'itsm', 'itil'],
    body: `<p><strong>OLA</strong> (Operational Level Agreement) je interní dohoda mezi skupinami nebo týmy uvnitř IT organizace, která podporuje plnění <a href="#sla">SLA</a> se zákazníkem. Zatímco SLA je závazek IT vůči zákazníkovi, OLA definuje, co musí interní IT týmy navzájem zajistit, aby bylo SLA splnitelné.</p>
<p>Příklad: SLA garantuje zákazníkovi vyřešení P1 incidentu do 4 hodin. OLA mezi Service Deskem a Network Operations Center pak stanoví, že síťové incidenty musí NOC potvrdit a zahájit řešení do 30 minut od přijetí tiketu od Service Desku. Bez tohoto OLA nemá Service Desk garanci, že SLA udrží.</p>
<p>OLA definuje: rozsah podpory (co tým poskytuje), SLA vstupy a výstupy (jaké SLA tým podporuje), doby odezvy a řešení pro jednotlivé priority, eskalační postupy, reportingové mechanismy a podmínky revize. OLA jsou méně formální než SLA — jde o interní dokumenty.</p>
<p>Hierarchie: SLA ↔ zákazník/IT; OLA ↔ IT tým/IT tým; Underpinning Contract (UC) ↔ IT/externí dodavatel. Všechny tři musí být v souladu pro garantování kvality služby end-to-end.</p>`,
  },
  {
    id: 'incident-management',
    title: 'Incident Management',
    area: 'ITSM',
    subjects: ['4SA310'],
    related: ['problem-management', 'change-management', 'sla', 'itsm', 'itil'],
    body: `<p><strong>Incident Management</strong> je ITSM proces zaměřený na co nejrychlejší obnovení normální funkce IT služby po výpadku nebo narušení, s minimálním dopadem na byznys. Definice incidentu: <em>neplánované přerušení nebo snížení kvality IT služby</em>.</p>
<p>Životní cyklus incidentu: Identifikace → Logování → Kategorizace → Prioritizace (dle dopadu a urgence) → Initial Diagnosis → Eskalace (funkcionální nebo hierarchická) → Vyšetřování a diagnostika → Řešení a recovery → Uzavření → Review (pro major incidents).</p>
<p>Prioritizace incidentů kombinuje <em>dopad</em> (Impact — kolik uživatelů/procesů je zasaženo) a <em>urgenci</em> (Urgency — jak rychle musí být vyřešen). Výsledná matice definuje priority P1–P4 (nebo Critical/High/Medium/Low) s příslušnými SLA cílovými dobami.</p>
<p>Incident Management se liší od <a href="#problem-management">Problem Management</a> — Incident Management hledá workaround a obnovuje službu, Problem Management hledá a eliminuje kořenovou příčinu (root cause). Major Incident (P1) by měl spustit post-incident review (PIR) / Post Mortem pro identifikaci ponaučení.</p>`,
  },
  {
    id: 'problem-management',
    title: 'Problem Management',
    area: 'ITSM',
    subjects: ['4SA310'],
    related: ['incident-management', 'change-management', 'cmdb', 'itsm', 'itil'],
    body: `<p><strong>Problem Management</strong> je ITSM proces zaměřený na identifikaci a eliminaci kořenových příčin opakujících se incidentů a na prevenci budoucích incidentů a problémů. Problem = neznámá kořenová příčina jednoho nebo více incidentů.</p>
<p>Problem Management pracuje ve dvou módech: <em>Reaktivní</em> (analýza incidentů, které již nastaly — hledání kořenové příčiny) a <em>Proaktivní</em> (identifikace potenciálních problémů dříve, než způsobí incidenty — trend analýza, infrastructure health monitoring).</p>
<p>Klíčové techniky analýzy kořenových příčin: Ishikawa (rybí kost), 5× Proč (5 Whys), Pareto analýza (80/20 — které příčiny způsobují 80 % incidentů), Timeline analýza, kepner-Tregoe analýza problémů.</p>
<p>Výstupy Problem Management: Known Error (dokončená diagnóza, workaround k dispozici), Known Error Database (KEDB), RFC (Request for Change) pokud je nutná změna pro trvalé vyřešení. Lifecycle problému: Identifikace → Logování → Kategorizace → Prioritizace → Vyšetřování → Known Error záhlaví → Řešení → Uzavření.</p>`,
  },
  {
    id: 'change-management',
    title: 'Change Management (ITSM)',
    area: 'ITSM',
    subjects: ['4SA310'],
    related: ['incident-management', 'problem-management', 'cmdb', 'itsm', 'itil'],
    body: `<p><strong>Change Management</strong> v kontextu ITSM je proces pro kontrolované provádění změn v IT infrastruktuře, aplikacích a procesech s cílem minimalizovat riziko narušení IT služeb. Definice změny: přidání, modifikace nebo odebrání čehokoli, co by mohlo ovlivnit IT služby.</p>
<p>Typy změn v <a href="#itil-v3">ITIL v3</a>: <em>Standard Change</em> (předem schválená, nízké riziko, opakující se, dle checklistu), <em>Normal Change</em> (vyžaduje RFC, risk assessment, CAB schválení), <em>Emergency Change</em> (urgentní, zkrácené schválení přes ECAB). V <a href="#itil-v4">ITIL 4</a> se používá termín Change Enablement.</p>
<p>Klíčové aktivity Change Management: registrace RFC (Request for Change), impact a risk assessment, schválení CAB (Change Advisory Board), scheduling v Change Calendar, implementace a post-implementation review. CAB je poradní výbor složený ze zástupců IT i businessu, který hodnotí Normal Changes.</p>
<p>Change Management úzce spolupracuje s <a href="#cmdb">CMDB</a> — každá změna CI (Configuration Item) musí být zaznamenána. Statistika "70 % IT výpadků je způsobeno změnami" je argumentem pro důsledný Change Management proces.</p>`,
  },
  {
    id: 'cmdb',
    title: 'CMDB — Configuration Management Database',
    area: 'ITSM',
    subjects: ['4SA310'],
    related: ['change-management', 'incident-management', 'problem-management', 'itsm', 'itil'],
    body: `<p><strong>CMDB</strong> (Configuration Management Database) je centrální úložiště pro informace o všech Configuration Items (CI) v IT infrastruktuře a jejich vzájemných vztazích. CI mohou být hardware (servery, sítě, terminály), software (aplikace, licence, OS), dokumentace, IT služby nebo lidé a organizace.</p>
<p>CMDB je srdcem Configuration Management procesu (ITIL: Service Asset and Configuration Management). Každý CI v CMDB má: unikátní identifikátor, typ, vlastníka, aktuální stav (ve vývoji, v provozu, v opravě, vyřazeno), vztahy s jinými CI (hosting, závisí na, propojeno s), a historii změn.</p>
<p>Hodnota CMDB spočívá v možnosti <em>impact analysis</em>: když nastane incident nebo je plánována změna, CMDB umožňuje rychle identifikovat, jaké CI a služby jsou zasaženy. Bez CMDB IT tým "nevidí" závislosti a dopad.</p>
<p>Realita CMDB: udržení CMDB aktuální je notoricky obtížné — CI se mění rychleji, než jsou aktualizovány záznamy. Automatická discovery nástroje (ServiceNow Discovery, SCCM, Lansweeper) pomáhají, ale vyžadují integraci s change procesem. Neaktuální CMDB je horší než žádná CMDB — dává falešnou jistotu.</p>`,
  },
  {
    id: 'it-audit',
    title: 'IT Audit',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['cisa', 'itaf', 'iia-standardy', 'gitc', 'aplikacni-kontroly', 'sod', 'cobit', 'assurance'],
    body: `<p><strong>IT Audit</strong> (audit informačních systémů) je systematický, nezávislý a dokumentovaný proces získávání důkazů a jejich objektivního hodnocení za účelem zjištění, zda jsou IT systémy, procesy a kontroly spolehlivé, bezpečné a v souladu s předpisy. IT audit je podmnožinou interního nebo externího auditu.</p>
<p>Cíle IT auditu: hodnocení <a href="#gitc">GITC</a> (General IT Controls), hodnocení <a href="#aplikacni-kontroly">aplikačních kontrol</a>, posouzení souladu s legislativou (<a href="#sox">SOX</a>, GDPR, <a href="#zkb">ZKB</a>), posouzení bezpečnosti IS, hodnocení provozních IT procesů, podpora finančního auditu (audit trail, přístupová práva).</p>
<p>Proces IT auditu: Plánování (risk assessment, scope, zdroje) → Předauditní příprava (sběr podkladů, porozumění prostředí) → Testování (kontrolní testy, substantivní testy) → Reporting (nálezy, doporučení, management response) → Follow-up (ověření nápravy).</p>
<p>Rámce a standardy: <a href="#isaca">ISACA</a> <a href="#itaf">ITAF</a> (IT Audit Framework), <a href="#iia-standardy">IIA Standards</a> (International Standards for the Professional Practice of Internal Auditing), <a href="#cobit">COBIT</a> pro kontrolní cíle. IT auditoři s <a href="#cisa">CISA</a> certifikací jsou uznáváni jako odborníci v oboru.</p>`,
  },
  {
    id: 'cisa',
    title: 'CISA — Certified Information Systems Auditor',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['isaca', 'itaf', 'it-audit', 'cobit'],
    body: `<p><strong>CISA</strong> (Certified Information Systems Auditor) je prestižní profesní certifikace vydávaná <a href="#isaca">ISACA</a> pro odborníky v oblasti IT auditu, kontroly a bezpečnosti informačních systémů. Je považována za zlatý standard v oblasti IS auditu a je uznávána globálně.</p>
<p>CISA certifikační zkouška pokrývá pět domén:</p>
<ol>
  <li><strong>Information Systems Auditing Process</strong> — metodologie auditu, plánování, reporting, follow-up</li>
  <li><strong>Governance and Management of IT</strong> — IT Governance frameworky, strategie, politiky</li>
  <li><strong>Information Systems Acquisition, Development and Implementation</strong> — SDLC, project management, change control</li>
  <li><strong>Information Systems Operations and Business Resilience</strong> — ITSM, provoz, BCM/DRP</li>
  <li><strong>Protection of Information Assets</strong> — bezpečnostní kontroly, kryptografie, přístupy</li>
</ol>
<p>Požadavky: složení zkoušky (150 otázek, 4 hodiny, min. 450 ze 800 bodů), 5 let praxe v IS auditu (lze zkrátit o vzdělání), kontinuální vzdělávání (CPE hodiny), dodržování ISACA Code of Ethics.</p>`,
  },
  {
    id: 'itaf',
    title: 'ITAF — IT Assurance Framework',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['isaca', 'cisa', 'it-audit', 'iia-standardy', 'cobit', 'assurance'],
    body: `<p><strong>ITAF</strong> (IT Assurance Framework) je rámec vydávaný <a href="#isaca">ISACA</a> jako komplexní průvodce pro IT audit a assurance. ITAF poskytuje standardy, pokyny a nástroje pro profesionály v oblasti IT auditu — je to "how-to" manual doplňující normativní standardy IIA.</p>
<p>ITAF je strukturován do tří úrovní:</p>
<ul>
  <li><strong>ISACA IS Standards</strong> — obecné (General Standards: independence, professional competence, due professional care), výkonnostní (Performance Standards: planning, supervision, scoping) a reportingové (Reporting Standards: findings, conclusions, recommendations)</li>
  <li><strong>ISACA IS Guidelines</strong> — detailní pojetí aplikace standardů v praxi pro konkrétní oblasti (cloud audit, cybersecurity, data analytics)</li>
  <li><strong>ISACA IS Audit/Assurance Programs</strong> — ready-to-use audit programy pro konkrétní domény</li>
</ul>
<p>ITAF se odlišuje od <a href="#iia-standardy">IIA Standards</a> svým specifickým zaměřením na IT — IIA standardy jsou obecné pro všechny druhy interního auditu, zatímco ITAF detailně pokrývá IT specifika. Organizace s IT audit funkcí typicky používají oba rámce komplementárně.</p>`,
  },
  {
    id: 'iia-standardy',
    title: 'IIA standardy interního auditu',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['itaf', 'it-audit', 'assurance', 'ujistovaci-angazma'],
    body: `<p><strong>IIA standardy</strong> (International Standards for the Professional Practice of Internal Auditing) vydávané <a href="https://www.theiia.org" target="_blank">IIA (The Institute of Internal Auditors)</a> jsou globálně uznávané standardy pro výkon interního auditu. V roce 2024 proběhla zásadní revize — nové IPPF (International Professional Practices Framework) změnilo strukturu standardů.</p>
<p>Standardy IIA jsou rozděleny do dvou kategorií: <em>Mandatory Guidance</em> (Core Principles, Definition of Internal Auditing, Code of Ethics, Standards) a <em>Recommended Guidance</em> (Implementation Guidance, Supplemental Guidance).</p>
<p>Klíčové principy: Nezávislost a objektivita interního auditora (Independence and Objectivity), rizikově orientovaný přístup k plánování (Risk-based Audit Plan), přidávání hodnoty organizaci (Value-added), komunikace a reporting, program řízení kvality (QAIP). CAE (Chief Audit Executive) odpovídá za efektivní funkci interního auditu.</p>
<p>IIA standardy se aplikují na všechny typy angažmá: <a href="#assurance">Assurance</a> engagements (IT audit, compliance review, SOX testování) a Consulting engagements (poradenství bez vydávání nezávislého stanoviska). Pro IT audit je standardy doplňuje <a href="#itaf">ITAF</a>.</p>`,
  },
  {
    id: 'assurance',
    title: 'Assurance angažmá',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['iia-standardy', 'itaf', 'it-audit', 'ujistovaci-angazma'],
    body: `<p><strong>Assurance angažmá</strong> (Assurance Engagement) je typ interního nebo externího auditu, při němž auditor objektivně hodnotí důkazy za účelem poskytnutí nezávislého stanoviska (opinion) o subjektu auditu. Výsledkem je zvýšení důvěry zainteresovaných stran v přiměřenost a efektivitu systémů a procesů.</p>
<p>Přímé assurance angažmá: auditor sám hodnotí procesy nebo kontroly vůči stanoveným kritériím. Toto je typické pro IT audit — hodnocení přístupových kontrol, zálohovacích procesů, kryptografie, BCM plánů apod.</p>
<p>Atestační assurance angažmá: auditor hodnotí tvrzení (assertion) jiné strany — např. management prohlásí, že kontroly SOX jsou efektivní a auditor toto tvrzení ověří. Příkladem je ISAE 3402 / SOC 2 report, kde poskytovatel IT služeb předkládá management assertion a auditor vydává zprávu o efektivitě kontrol pro uživatelské organizace.</p>
<p>Consulting engagements (poradenství) se od assurance liší tím, že auditor nemusí být nezávislý a nevydává formální opinion — pouze přidává hodnotu radou nebo doporučením. Hranice assurance/consulting musí být jasně definována před zahájením angažmá.</p>`,
  },
  {
    id: 'ujistovaci-angazma',
    title: 'Ujišťovací angažmá',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['assurance', 'it-audit', 'iia-standardy'],
    body: `<p><strong>Ujišťovací angažmá</strong> je český ekvivalent termínu <a href="#assurance">Assurance Engagement</a> — typ auditorského angažmá, při němž auditor poskytuje nezávislé ujištění (assurance) stakeholderům o stavu hodnoceného předmětu.</p>
<p>Tři strany ujišťovacího angažmá: <em>Odpovědná strana</em> (auditovaný subjekt — management, IT oddělení), <em>Zainteresovaná strana</em> (uživatel stanoviska — board, regulátor, zákazník), <em>Auditor</em> (provádí hodnocení a vydává stanovisko).</p>
<p>Typy ujišťovacích stanovisek v IT auditu: <em>Přiměřené ujištění</em> (reasonable assurance) — "systém kontrol funguje efektivně, s výjimkou…", <em>Omezené ujištění</em> (limited assurance) — "nic jsme nenalezli, co by naznačovalo, že kontroly nefungují".</p>
<p>V kontextu IT auditu jsou typická ujišťovací angažmá: audit GITC (General IT Controls), audit přístupových práv, SOX IT audit, ISAE 3402 / SOC 2 audit, audit informační bezpečnosti dle ISO 27001, compliance audit dle ZKB. Výstupem je auditní zpráva s nálezy, závěry a doporučeními.</p>`,
  },
  {
    id: 'gitc',
    title: 'GITC — General IT Controls',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['it-audit', 'aplikacni-kontroly', 'sod', 'sox', 'cobit', 'coso'],
    body: `<p><strong>GITC</strong> (General IT Controls, Obecné IT kontroly) jsou základní IT kontroly, které ovlivňují spolehlivost všech IT systémů a dat v organizaci. Jsou předmětem testování v rámci IT auditu, zejména v kontextu <a href="#sox">SOX</a> compliance a finančního auditu.</p>
<p>GITC se obvykle dělí do pěti oblastí:</p>
<ol>
  <li><strong>Řízení přístupu</strong> — user provisioning/deprovisioning, přístupová práva, privilegovaný přístup, <a href="#sod">SOD</a>, autentizace</li>
  <li><strong>Change Management</strong> — řízení změn v programech a systémech (SDLC kontroly, schvalování, testování, deployment)</li>
  <li><strong>Provoz IT</strong> — zálohy a obnova, monitoring, job scheduling, patch management</li>
  <li><strong>Fyzická a logická bezpečnost</strong> — přístup do datového centra, ochrana síťového perimetru</li>
  <li><strong>Business Continuity</strong> — disaster recovery testy, BCM plány</li>
</ol>
<p>Pro SOX audit platí logika: pokud GITC jsou spolehlivé → <a href="#aplikacni-kontroly">aplikační kontroly</a> jsou spolehlivé → automatizované kontroly v ERP mohou být důvěryhodné → finanční výkazy jsou přesné. Selhání GITC vyžaduje rozsáhlejší substantivní testování finančního auditora.</p>`,
  },
  {
    id: 'aplikacni-kontroly',
    title: 'Aplikační kontroly',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['gitc', 'it-audit', 'sox', 'sod'],
    body: `<p><strong>Aplikační kontroly</strong> jsou specifické kontroly zabudované přímo do aplikačního softwaru (ERP, CRM, bankovní systémy), které zajišťují úplnost, přesnost, platnost a autorizaci transakcí a dat zpracovávaných systémem. Jsou protějškem <a href="#gitc">GITC</a> (General IT Controls).</p>
<p>Typy aplikačních kontrol:</p>
<ul>
  <li><strong>Input controls</strong> — validace vstupních dat (formát, rozsah, povinná pole, duplicity), edit checks</li>
  <li><strong>Processing controls</strong> — kontroly výpočtů, batch balancing, referenční integrity, arithmetické kontroly</li>
  <li><strong>Output controls</strong> — kontroly výstupů (report balancing, data mining pro anomálie)</li>
  <li><strong>Master data controls</strong> — řízení přístupu k číselníkům, workflow schvalování master dat</li>
  <li><strong>Interface controls</strong> — kontroly při přenosu dat mezi systémy (reconciliation, error handling)</li>
</ul>
<p>Automatizované vs. manuální aplikační kontroly: automatizované (zabudované v systému) jsou spolehlivější pokud jsou správně nakonfigurovány, ale vyžadují pravidelné testování konfigurace. Manuální jsou závislé na lidském faktoru a jsou předmětem komplexnějšího testování auditorem.</p>
<p>V ERP kontextu jsou příklady aplikačních kontrol: three-way matching v MM, release strategy pro objednávky, segregace pokladní funkce a účetnictví přes autorizační objekty.</p>`,
  },
  {
    id: 'sod',
    title: 'SOD — Segregation of Duties',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['gitc', 'aplikacni-kontroly', 'it-audit', 'raci', 'sox', 'fraud-triangle', 'rbac'],
    body: `<p><strong>SOD</strong> (Segregation of Duties, Segregace povinností) je základní kontrolní princip, podle nějž žádná jednotlivá osoba nemá mít přístup ke všem fázím kritické transakce nebo procesu. Cílem je prevence podvodu a chyby — pro vznik škody je nutná kolize dvou nebo více osob (collusion).</p>
<p>Inkompatibilní kombinace rolí (SOD konflikt): <em>autorizace + realizace</em> (schvalovatel objednávky nesmí být i příjemce zboží), <em>realizace + custody</em> (účetní nesmí mít fyzický přístup k aktivům), <em>custody + record-keeping</em> (pokladní nesmí vést účetnictví). Tyto kombinace jsou přímou pozvánkou k podvodu.</p>
<p>V ERP systémech (SAP, Oracle) je SOD realizováno prostřednictvím autorizačních objektů — každé kritické funkci přísluší kombinace autorizačních objektů a uživatel nesmí mít přiřazeny inkompatibilní kombinace. SOD analýza nástroji (ERP GRC, Saviynt, SailPoint) identifikuje konflikty v přístupových právech.</p>
<p>SOD je klíčová pro <a href="#sox">SOX</a> compliance a GITC — auditor testuje, zda neexistují aktivní SOD konflikty a zda existují kompenzační kontroly (supervisor review) tam, kde konflikt nelze technicky eliminovat. Trojúhelník podvodu (<a href="#fraud-triangle">Fraud Triangle</a>) ukazuje, proč je SOD kritická.</p>`,
  },
  {
    id: 'fraud-triangle',
    title: 'Fraud Triangle — trojúhelník podvodu',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['sod', 'it-audit', 'gitc', 'sox'],
    body: `<p><strong>Fraud Triangle</strong> (trojúhelník podvodu) je kriminologický model Donalda Cresesyho (1953) popisující tři faktory, které musí být přítomny zároveň, aby k podvodu došlo: <em>Příležitost (Opportunity)</em>, <em>Tlak/Motivace (Pressure/Incentive)</em> a <em>Racionalizace (Rationalization)</em>.</p>
<p><strong>Příležitost</strong> (Opportunity) je jediný faktor, který může organizace přímo ovlivnit prostřednictvím interních kontrol. <a href="#sod">SOD</a>, <a href="#gitc">GITC</a> a přístupová práva snižují příležitost pro podvod. Bez příležitosti k podvodu se ani motivovaný a racionalizující jedinec nepodvoduje.</p>
<p><strong>Tlak/Motivace</strong> může být finanční (dluhy, závislosti), pracovní (tlak na výsledky, výhrůžky propuštění) nebo osobní. Organizace může snižovat tlak spravedlivým odměňováním a zdravou kulturou, ale nemůže ho eliminovat. <strong>Racionalizace</strong> je psychologický mechanismus, kdy pachatel ospravedlní podvod sám sobě ("zasloužím si to", "je to jen půjčka").</p>
<p>Rozšíření: Fraud Diamond přidává čtvrtý faktor Capability (schopnost provést podvod), Fraud Pentagon přidává Arrogance. V IT auditu se Fraud Triangle používá jako rámec pro risk assessment — identifikaci procesů s vysokým inherentním rizikem podvodu.</p>`,
  },
  {
    id: 'sox',
    title: 'SOX — Sarbanes-Oxley Act',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['gitc', 'aplikacni-kontroly', 'sod', 'it-audit', 'coso'],
    body: `<p><strong>SOX</strong> (Sarbanes-Oxley Act, 2002) je americký zákon o finanční odpovědnosti korporací, přijatý jako reakce na účetní skandály Enron, WorldCom a Tyco. SOX se vztahuje na všechny společnosti kotované na amerických burzách a má zásadní dopad na IT governance a IT audit.</p>
<p>Klíčové sekce SOX pro IT: <strong>Sekce 302</strong> — CEO a CFO musí osobně certifikovat přesnost finančních výkazů a efektivitu ICFR (Internal Control over Financial Reporting). <strong>Sekce 404</strong> — Management musí vyhodnotit a reportovat efektivitu ICFR; nezávislý auditor toto hodnocení musí potvrdit nebo vyvrátit.</p>
<p>IT relevance SOX: finanční systémy (ERP, GL, reporting) jsou základem finančních výkazů. Pro jejich spolehlivost musí být spolehlivé <a href="#gitc">GITC</a> (přístupová práva, change management, zálohy, provoz). Selhání GITC = zvýšené riziko materiální chyby ve výkazech → material weakness nebo significant deficiency.</p>
<p>Rámec pro hodnocení ICFR je <a href="#coso">COSO</a> Internal Control Framework (2013 aktualizace). IT část hodnocení provádí IT auditor — testování GITC, <a href="#aplikacni-kontroly">aplikačních kontrol</a> a <a href="#sod">SOD</a> konfliktů. Velká 4 auditorská firma pak vydává opinion na ICFR jako celek.</p>`,
  },
  {
    id: 'process-capability',
    title: 'Process Capability Model',
    area: 'Audit',
    subjects: ['4SA310', '4SA513'],
    related: ['cobit', 'pam-audit', 'it-audit', 'cobit-2019'],
    body: `<p><strong>Process Capability Model</strong> v kontextu <a href="#cobit">COBIT</a> vychází z normy ISO/IEC 15504 (SPICE) a definuje šest úrovní způsobilosti pro každý IT proces od 0 (Incomplete) do 5 (Optimizing). Hodnocení způsobilosti je klíčovým výstupem IT auditu nebo process assessment.</p>
<p>Šest úrovní procesní způsobilosti:</p>
<ul>
  <li><strong>0 — Incomplete</strong>: Proces není prováděn nebo nedosahuje svého účelu</li>
  <li><strong>1 — Performed</strong>: Proces dosahuje účelu, ale není plánován ani řízen</li>
  <li><strong>2 — Managed</strong>: Proces je plánován, monitorován, řízen a produkty odpovídají požadavkům</li>
  <li><strong>3 — Established</strong>: Proces je definován, standardizován a zdokumentován napříč organizací</li>
  <li><strong>4 — Predictable</strong>: Proces je měřen a výkonnost je statisticky předvídatelná</li>
  <li><strong>5 — Optimizing</strong>: Proces je kontinuálně zlepšován na základě dat a inovací</li>
</ul>
<p>Pro dosažení vyšší úrovně musí organizace splnit všechny atributy nižší úrovně. Cílová úroveň závisí na strategickém významu procesu — kritické procesy cílí na L3–L4, méně kritické na L2. <a href="#pam-audit">PAM (Process Assessment Model)</a> definuje, jak hodnocení provádět.</p>`,
  },
  {
    id: 'pam-audit',
    title: 'PAM — Process Assessment Model',
    area: 'Audit',
    subjects: ['4SA313', '4SA513'],
    related: ['process-capability', 'cobit', 'cobit-2019', 'it-audit'],
    body: `<p><strong>PAM</strong> (Process Assessment Model) je v kontextu <a href="#cobit">COBIT</a> model definující, jak provádět hodnocení způsobilosti IT procesů dle <a href="#process-capability">Process Capability Modelu</a>. PAM definuje indikátory výkonu a způsobilosti, pomocí nichž assessor hodnotí každý COBIT proces.</p>
<p>PAM pro COBIT 2019 (vydán jako samostatný dokument) obsahuje pro každý governance a management objective: Base Practices (základní praktiky — co musí proces dělat pro dosažení L1), Work Products (vstupy a výstupy jako důkazy existence procesu), a Generic Practices/Resources (pro dosažení vyšších capability úrovní L2–L5).</p>
<p>Hodnocení PAM probíhá formou strukturovaných rozhovorů, přezkumu dokumentace a technických testů. Výsledkem je Capability Profile — přehled dosažené úrovně pro každý hodnocený proces. Assessment mohou provádět interní hodnotitelé (self-assessment) nebo nezávislí assessoři (independent assessment).</p>
<p>COBIT 2019 posunul PAM od detailního hodnocení 37 procesů k flexibilnějšímu přístupu, kde se hodnotí ty procesy (governance objectives), které jsou relevantní pro danou organizaci dle jejího Target Profile definovaného přes <a href="#design-factors">Design Factors</a>.</p>`,
  },
  {
    id: 'coso',
    title: 'COSO',
    area: 'Audit',
    subjects: ['4SA513'],
    related: ['it-audit', 'gitc', 'sox', 'erm', 'it-governance'],
    body: `<p><strong>COSO</strong> (Committee of Sponsoring Organizations of the Treadway Commission) je americká soukromá organizace vydávající rámce pro interní kontrolu a enterprise risk management. Její rámce jsou základem pro implementaci <a href="#sox">SOX</a> a obecně pro interní kontrolní systémy.</p>
<p><strong>COSO Internal Control Framework</strong> (1992, aktualizován 2013) definuje interní kontrolu jako proces prováděný boardem, managementem a zaměstnanci, zajišťující přiměřenou jistotu o dosažení cílů ve třech kategoriích: Operations (efektivita a efektivnost), Reporting (spolehlivost) a Compliance (soulad s předpisy). Rámec má 5 komponentů (Control Environment, Risk Assessment, Control Activities, Information &amp; Communication, Monitoring) a 17 principů.</p>
<p><strong>COSO ERM Framework</strong> (2004, aktualizován 2017 jako "Enterprise Risk Management — Integrating with Strategy and Performance") rozšiřuje interní kontrolu o strategické řízení rizik. Je základem pro <a href="#erm">ERM</a> implementace. Pracuje s konceptem Risk Appetite a Risk Tolerance.</p>
<p>IT implikace COSO: <a href="#gitc">GITC</a> jsou klíčovou součástí Control Activities komponenty. Control Environment odráží IT governance kulturu a struktury (<a href="#it-governance">IT Governance</a>). Risk Assessment zahrnuje IT rizika.</p>`,
  },
]
