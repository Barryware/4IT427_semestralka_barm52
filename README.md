# Státnice — Učící aplikace

Multi-page React aplikace pro přípravu na státní zkoušky z oboru **4IM_1 (Informační management)** na **VŠE FIS**. Obsahuje učebnici, wiki, mapy konceptů, trenér ústních odpovědí, profily komisí a zdroje k jednotlivým předmětům.

Semestrální práce do předmětu **4IT427 – Vývoj webových aplikací v Reactu** (letní semestr 2026).

> Aplikace vznikla původně jako osobní prototyp pro vlastní studium ke státnicím. V rámci semestrální práce byla refaktorovaná podle požadavků kurzu: přidán **react-router-dom** pro routing, **TanStack Query** pro načítání serverových dat, **Vitest + React Testing Library** pro automatizované testy.

## ✨ Funkcionalita

- 📊 **Dashboard** s přehledem postupu a doporučenými úkoly
- 📚 **Učebnice** — strukturovaný obsah ke každému předmětu (HTML soubory v `public/content/`)
- 🎯 **Předměty** — detail jednotlivých předmětů (12 disciplín, např. IT Governance, Audit IS, Forenzní analýza)
- 📖 **Wiki** — krátká vysvětlení klíčových konceptů napříč moduly
- 🗺️ **Mapy konceptů** — vizualizace souvislostí mezi tématy
- ✏️ **Trenér ústních odpovědí** — gamifikované cvičení odpovědí na "killer otázky" komise
- 🏛️ **Komise** — historické příklady ústních zkoušek
- 📋 **Shrnutí** — modulové přehledy a klíčové take-aways
- 💡 **Tipy** — tipy ke státnicím načítané přes TanStack Query, filtrovatelné podle kategorie
- ⭐ **Progress** — sledování ovládnutí (mastery level) jednotlivých témat
- 📌 **Zdroje** — odkazy a doporučená literatura

## 🛠️ Technologie

| Technologie | Účel |
|---|---|
| **Vite** | Build tool, dev server |
| **React 19** + **TypeScript** | UI komponenty, typová bezpečnost |
| **react-router-dom** | Klientský routing (`<BrowserRouter>`, `<Routes>`, `<NavLink>`, `useNavigate`, `useParams`) |
| **TanStack Query** | Server state (cache, loading/error/success stavy, `staleTime` 5 min) |
| **Vitest** + **React Testing Library** + **jsdom** | Unit + integrační testy |
| **ESLint** + **Prettier** | Statická analýza a formátování |

## 🚀 Spuštění lokálně

Vyžaduje **Node.js ≥ 20.19** a npm.

```bash
# 1. Klonování
git clone https://github.com/Barryware/4IT427_semestralka_barm52.git
cd 4IT427_semestralka_barm52

# 2. Instalace závislostí
npm install

# 3. Dev server (http://localhost:5173)
npm run dev

# 4. Spuštění testů
npm test

# 5. Produkční build
npm run build
```

## 📂 Struktura projektu

```
public/
  exam-tips.json          # Data načítaná přes TanStack Query
  content/                # Statický HTML obsah učebnice (jeden soubor / předmět)
  favicon.svg

src/
  App.tsx                 # Routes (react-router-dom), sidebar, layout
  main.tsx                # QueryClientProvider + BrowserRouter
  app.css                 # Globální styly
  data.ts                 # NAV_SECTIONS, SUBJECTS, MODULES
  types.ts                # TypeScript typy (SectionId, Subject, AppProgress, …)
  api/
    examTips.ts           # fetchExamTips() pro načítání tipů
  components/
    ExamTipCard.tsx       # Karta tipu
    ExamTipCard.test.tsx  # Integrační test komponenty
  data/                   # Statická data (Wiki, mapy, killer questions, …)
  hooks/
    useProgress.ts        # Custom hook pro persistenci pokroku v localStorage
  pages/                  # Komponenty stránek (Dashboard, Wiki, Trener, …)
  utils/
    tipUtils.ts           # Pomocné funkce (filterTipsByCategory, listUniqueCategories)
    tipUtils.test.ts      # Unit testy pomocných funkcí
  setupTests.ts           # @testing-library/jest-dom matchers
```

## 🧪 Testy

```bash
npm test              # spustí Vitest v watch módu
npm test -- --run     # spustí jednou a skončí
```

### Unit test — `src/utils/tipUtils.test.ts`
Pokrývá pomocné funkce použité ve stránce Tipy:
- `filterTipsByCategory` — case-insensitive filtrování, prázdná kategorie vrací vše
- `listUniqueCategories` — seřazený seznam unikátních kategorií

### Integrační test — `src/components/ExamTipCard.test.tsx`
Renderuje `<ExamTipCard />` s testovacími props a ověřuje, že komponenta zobrazí název, tělo i kategorii tipu.

## 🌐 Data fetching

Stránka `src/pages/Tipy.tsx` načítá tipy přes `useQuery` z TanStack Query a filtruje je pomocí `filterTipsByCategory` a `listUniqueCategories`:

```tsx
const { data: tips, isLoading, isError, refetch } = useQuery({
  queryKey: ['exam-tips'],
  queryFn: fetchExamTips,
})

const categories = listUniqueCategories(tips ?? [])
const filtered = filterTipsByCategory(tips ?? [], activeCategory)
```

Loading / error / success stavy jsou ošetřené samostatně. `staleTime` je nastaven globálně v `main.tsx` na 5 minut.
