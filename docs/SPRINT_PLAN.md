# Sprint Plan: OBI Homepage Wireframe Generator

> Versione: 1.3 | Data: 2026-02-19 | Ultimo aggiornamento: Sprint 1.1 completato
> Riferimenti: [PRD.md](PRD.md) | [ARCHITECTURE.md](ARCHITECTURE.md)

---

## Indice

1. [Metodologia & Convenzioni](#1-metodologia--convenzioni)
2. [Roadmap Visiva](#2-roadmap-visiva)
3. [Fase 0 - Scaffolding & Infrastruttura](#3-fase-0---scaffolding--infrastruttura)
4. [Fase 1 - Canvas & Componenti Base (MVP Core)](#4-fase-1---canvas--componenti-base-mvp-core)
5. [Fase 2 - Template Completi & Responsive](#5-fase-2---template-completi--responsive)
6. [Fase 3 - Versioning & Confronto](#6-fase-3---versioning--confronto)
7. [Fase 4 - Workflow & Annotazioni](#7-fase-4---workflow--annotazioni)
8. [Fase 5 - Template Editor Custom](#8-fase-5---template-editor-custom)
9. [Fase 6 - Polish & Distribution](#9-fase-6---polish--distribution)
10. [Quality Gates & Milestones](#10-quality-gates--milestones)
11. [Gestione Rischi per Fase](#11-gestione-rischi-per-fase)
12. [Istruzioni per Agente AI](#12-istruzioni-per-agente-ai)

---

## 1. Metodologia & Convenzioni

### Struttura Sprint

Ogni sprint e progettato per essere **eseguibile in modo autonomo da un agente AI** (Claude Code) con interventi minimi dell'utente. La struttura di ogni sprint segue questo schema:

| Campo | Descrizione |
|-------|-------------|
| **Goal** | Obiettivo chiaro e verificabile dello sprint |
| **Input** | Cosa deve esistere PRIMA di iniziare lo sprint |
| **Tasks** | Lista ordinata di task atomici |
| **File Coinvolti** | File da creare/modificare (da ARCHITECTURE.md) |
| **Acceptance Criteria** | Criteri binari (pass/fail) per considerare lo sprint completato |
| **Verification** | Comandi e azioni per verificare il completamento |
| **Output** | Cosa esiste DOPO il completamento dello sprint |
| **Dipendenze** | Sprint che devono essere completati prima |

### Convenzioni di Naming

- **Fase**: macro-blocco funzionale (es. Fase 1 - MVP Core)
- **Sprint**: unita di lavoro atomica dentro una fase (es. Sprint 1.3)
- **Task**: singola azione dentro uno sprint (es. T1.3.2)

### Regole per l'Agente AI

1. **Un sprint alla volta**: completare e verificare uno sprint prima di passare al successivo
2. **Test prima di procedere**: ogni sprint include verification steps obbligatori
3. **Commit atomici**: un commit per task completato, message descrittivo
4. **No gold plating**: implementare SOLO quello che e nello sprint, niente di piu
5. **Segnalare blocchi**: se un task non e completabile, fermarsi e segnalare

---

## 2. Roadmap Visiva

```
FASE 0          FASE 1              FASE 2              FASE 3
Scaffolding     MVP Core            Templates+Resp.     Versioning
[S0.1][S0.2]    [S1.1][S1.2][S1.3]  [S2.1][S2.2][S2.3]  [S3.1][S3.2]
                [S1.4][S1.5]
     │               │                    │                   │
     ▼               ▼                    ▼                   ▼
   ┌───┐          ┌─────┐            ┌─────────┐        ┌──────────┐
   │ M0│          │ M1  │            │   M2    │        │    M3    │
   │   │          │ MVP │            │ Feature │        │ Version  │
   │   │          │Ready│            │Complete │        │  Ready   │
   └───┘          └─────┘            └─────────┘        └──────────┘

FASE 4              FASE 5              FASE 6
Workflow            Template Editor     Polish
[S4.1][S4.2]        [S5.1][S5.2]        [S6.1][S6.2][S6.3]
     │                   │                    │
     ▼                   ▼                    ▼
┌──────────┐       ┌──────────┐         ┌──────────┐
│    M4    │       │    M5    │         │  M6 🚀   │
│ Workflow │       │ Custom   │         │PRODUCTION│
│  Ready   │       │Templates │         │ RELEASE  │
└──────────┘       └──────────┘         └──────────┘
```

### Legenda Milestone

| Milestone | Descrizione | Rilascio |
|-----------|-------------|----------|
| **M0** | Infrastruttura pronta, app si avvia | Interno (solo dev) |
| **M1** | MVP funzionante: drag&drop, salva/carica, 4 template | Alpha interna (1-2 tester) |
| **M2** | Tutti i template, responsive, undo/redo | Beta interna (3-5 tester) |
| **M3** | Versioning, confronto, export | Beta estesa (tutti i CM) |
| **M4** | Workflow approvazione, annotazioni | Release Candidate |
| **M5** | Editor template custom | Feature Complete |
| **M6** | Polish, performance, distribuzione | Production Release 1.0 |

---

## 3. Fase 0 - Scaffolding & Infrastruttura

> **Obiettivo**: Creare la struttura del progetto, configurare toolchain, avere un'app Electron vuota che si avvia.

---

### Sprint 0.1 - Project Bootstrap ✅ COMPLETATO (2026-02-19)

**Goal**: Progetto inizializzato con electron-vite, React, TypeScript, Tailwind, tutte le dipendenze installate, app si avvia con finestra vuota.

**Input**: Directory vuota `homepage_wireframe_generator/`

**Tasks**:

| ID | Task | Dettaglio | Stato |
|----|------|-----------|-------|
| T0.1.1 | Init progetto electron-vite | `npm create @quick-start/electron@latest` con template React+TS | ✅ |
| T0.1.2 | Configurare Tailwind CSS | Installare e configurare tailwind, postcss, globals.css | ✅ |
| T0.1.3 | Installare dipendenze core | `zustand`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/modifiers`, `lucide-react`, `date-fns`, `class-variance-authority`, `clsx`, `tailwind-merge` | ✅ |
| T0.1.4 | Configurare path alias | `@/` → `src/renderer/src/`, `@shared/` → `src/shared/` in `electron.vite.config.ts` e `tsconfig.*.json` | ✅ |
| T0.1.5 | Creare struttura cartelle | Tutte le cartelle vuote come da ARCHITECTURE.md sezione 4 | ✅ |
| T0.1.6 | Configurare ESLint + Prettier | Config base per TypeScript + React (da scaffold electron-vite) | ✅ |
| T0.1.7 | Verificare avvio | `npm run dev` → finestra Electron con placeholder OBI | ✅ |

**File creati**:
```
electron.vite.config.ts          # Config con path alias @/ e @shared/
tailwind.config.ts               # Tema OBI (colori, font, spacing, z-index)
postcss.config.js                # PostCSS + Tailwind + Autoprefixer
tsconfig.json / tsconfig.node.json / tsconfig.web.json
src/main/index.ts                # BrowserWindow 1440x900, security settings
src/preload/index.ts             # contextBridge con electronAPI
src/renderer/index.html          # Lang IT, CSP configurata
src/renderer/src/main.tsx        # Entry React
src/renderer/src/App.tsx         # Placeholder OBI branded
src/renderer/src/assets/globals.css  # Tailwind directives + CSS custom
src/shared/types/index.ts        # Tipi condivisi (Project, WireframeComponent, etc.)
src/renderer/src/lib/utils.ts    # Utility cn() per classi Tailwind
```

**Acceptance Criteria**:
- [x] `npm run dev` avvia l'app senza errori
- [x] Finestra Electron visibile con contenuto React
- [x] Tailwind CSS funzionante (classe utility applicata visivamente)
- [x] Path alias `@/` e `@shared/` risolvono correttamente
- [x] TypeScript in strict mode senza errori `npm run typecheck`
- [x] Struttura cartelle conforme a ARCHITECTURE.md

**Verification**:
```bash
npm run dev          # ✅ App si avvia (richiede unset ELECTRON_RUN_AS_NODE)
npm run typecheck    # ✅ Nessun errore TS
npm run build        # ✅ Build senza errori (main 1.30KB, renderer 555KB + 12KB CSS)
```

**Output**: Progetto funzionante, app si avvia con finestra placeholder OBI.

**Note tecniche**:
- Rimosso `@electron-toolkit/utils` perche accede a `electron.app.isPackaged` al caricamento del modulo, causando crash con `ELECTRON_RUN_AS_NODE=1`. Sostituito con API Electron native.
- `ELECTRON_RUN_AS_NODE=1` e impostato dall'ambiente VS Code/Claude Code. Gli script npm includono `unset ELECTRON_RUN_AS_NODE` prima di `electron-vite`.
- Stack effettivo: Electron 39.6.1, electron-vite 5.0.0, React 19.2.1, TypeScript 5.9.3, Tailwind 3.4.19, Vite 7.2.6.

---

### Sprint 0.2 - Shared Types, IPC Skeleton, Security ✅ COMPLETATO (2026-02-19)

**Goal**: Tipi condivisi definiti, preload script sicuro configurato, IPC skeleton pronto, design tokens OBI.

**Input**: Sprint 0.1 completato

> **Note dalla code review Sprint 0.1**: i seguenti fix dalla review sono gia stati applicati o sono integrati nelle task sottostanti:
> - ~~C1/C2~~ Preload riscritto senza `@electron-toolkit/preload` (applicato)
> - ~~C3~~ URL validation in `shell.openExternal` (applicato)
> - ~~H1~~ electron-builder.yml exclusion path aggiornato (applicato)
> - ~~H2/L4~~ `globals.css` spostato in `assets/styles/` (applicato)
>
> Fix rimanenti dalla review da integrare in questo sprint:
> - **H3**: Aggiungere `<meta name="viewport">` in `index.html` per responsive preview
> - **H4**: Spostare dipendenze renderer-only (`lucide-react`, `clsx`, ecc.) in `devDependencies` per coerenza con `react`
> - **H5**: Aggiungere `renderDesktop`/`renderMobile` in `TemplateDefinition` (ARCHITECTURE.md sez. 7)
> - **H6**: Creare `src/renderer/src/assets/styles/obi-theme.css` separato dai token in globals.css
> - **H7**: Creare `src/shared/utils/` con file placeholder
> - **M1**: Rimuovere tipo di ritorno esplicito `React.JSX.Element` in `App.tsx`
> - **M2**: Verificare CSP `connect-src` per HMR in dev
> - **M3**: Rinominare `postcss.config.js` → `postcss.config.mjs` per evitare warning ESM
> - **M4**: Spostare `VIEWPORT_WIDTHS` da `shared/types/` a `shared/constants/`
> - **M5**: Rimuovere font-family duplicata in `globals.css` (gia in Tailwind config)
> - **M8**: Aggiungere `.gitattributes` con `* text=auto eol=lf`
> - **M9**: Aggiungere `icon` esplicito in `electron-builder.yml`

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T0.2.1 | Creare tutti i tipi shared | `src/shared/types/*.ts`: Project, WireframeComponent, TemplateDefinition (con renderDesktop/renderMobile), WorkflowStatus, Annotation, Asset, ElectronAPI (da ARCHITECTURE.md sez. 7). **Fix H5** incluso. |
| T0.2.2 | Creare costanti shared | `src/shared/constants/ipc-channels.ts`, `workflow-states.ts`, `viewport.ts`. Spostare `VIEWPORT_WIDTHS` da types a constants (**fix M4**). |
| T0.2.3 | Creare utility shared | `src/shared/utils/id.ts`, `date.ts`, `validation.ts` (**fix H7**) |
| T0.2.4 | Configurare preload sicuro | ~~`src/preload/index.ts` con `contextBridge.exposeInMainWorld`, context isolation~~ GIA FATTO in code review Sprint 0.1 — verificare e integrare con IPC handlers |
| T0.2.5 | Creare IPC skeleton nel main | `src/main/ipc/index.ts` che registra handler vuoti per tutti i canali |
| T0.2.6 | ~~Configurare BrowserWindow sicura~~ | ~~GIA FATTO in Sprint 0.1~~ — aggiungere `<meta name="viewport">` in index.html (**fix H3**), verificare CSP (**fix M2**) |
| T0.2.7 | Creare tema OBI CSS | `src/renderer/src/assets/styles/obi-theme.css` separato (**fix H6**), rimuovere font-family duplicata da globals.css (**fix M5**) |
| T0.2.8 | Installare e configurare shadcn/ui | Init shadcn/ui, aggiungere componenti base: Button, Dialog, Input, Label, ScrollArea, Select, Separator, Tabs, Tooltip |
| T0.2.9 | Fix infrastruttura residui | Rinominare `postcss.config.js` → `.mjs` (**fix M3**), spostare deps in devDependencies (**fix H4**), fix `App.tsx` return type (**fix M1**), aggiungere `.gitattributes` (**fix M8**), icon esplicita in electron-builder (**fix M9**) |

**File da creare**:
```
src/shared/types/api.ts
src/shared/types/project.ts
src/shared/types/template.ts
src/shared/types/component.ts
src/shared/types/workflow.ts
src/shared/types/annotation.ts
src/shared/types/asset.ts
src/shared/types/index.ts
src/shared/constants/ipc-channels.ts
src/shared/constants/workflow-states.ts
src/shared/constants/viewport.ts
src/shared/utils/id.ts
src/shared/utils/date.ts
src/shared/utils/validation.ts
src/preload/index.ts (modifica)
src/preload/api.ts
src/main/index.ts (modifica - security config)
src/main/ipc/index.ts
src/renderer/assets/styles/obi-theme.css
src/renderer/lib/utils.ts (cn() helper)
src/renderer/components/ui/*.tsx (shadcn)
```

**Acceptance Criteria**:
- [x] Tutti i tipi in `shared/types/` compilano senza errori
- [x] `window.api` e accessibile nel renderer con typing corretto
- [x] IPC canali definiti e handler registrati (anche se vuoti)
- [x] `contextIsolation: true` verificato
- [x] Tema OBI: colori `#FF6600`, `#333333`, `#F5F5F5` disponibili come CSS custom properties
- [x] Componenti shadcn/ui renderizzano correttamente con tema OBI

**Verification**:
```bash
npm run typecheck    # ✅ Nessun errore TS
npm run build        # ✅ main 3.61KB, preload 4.87KB, renderer 555KB + 29KB CSS
```

**Output**: Foundation completa. Tipi, IPC, security, tema pronti.

**Note tecniche**:
- shadcn/ui CLI non risolve alias `@` con electron-vite: componenti creati manualmente
- Tutte le deps spostate in `devDependencies` (Vite bundla il renderer, electron-builder non ne ha bisogno)
- `postcss.config.js` rinominato in `.mjs` per compatibilita ESM
- Tutti i fix review H3-H7, M1-M5, M8-M9 risolti in questo sprint

---

## 4. Fase 1 - Canvas & Componenti Base (MVP Core)

> **Obiettivo**: App con layout a 3 pannelli, drag & drop funzionante, 4 template base, salvataggio su filesystem. Questa e la fase piu critica: se il canvas funziona bene, tutto il resto e incrementale.

---

### Sprint 1.1 - Layout App Shell ✅ COMPLETATO (2026-02-19)

**Goal**: Layout a 3 pannelli (libreria, canvas, config) con toolbar, ridimensionabile, responsive.

**Input**: Sprint 0.2 completato

**Tasks**:

| ID | Task | Dettaglio | Stato |
|----|------|-----------|-------|
| T1.1.1 | Creare AppShell | Layout flex con 3 colonne: libreria (240px fisso), canvas (flex-1), config (320px fisso) | ✅ |
| T1.1.2 | Creare Toolbar | Barra superiore con: nome progetto, selettore versione (placeholder), toggle viewport, pulsanti azioni | ✅ |
| T1.1.3 | Creare StatusBar | Barra inferiore con: stato salvataggio, zoom level, viewport corrente | ✅ |
| T1.1.4 | Pannello Libreria (vuoto) | Sidebar sinistra con header "Componenti", search input, area scrollabile per future categorie | ✅ |
| T1.1.5 | Canvas (vuoto) | Area centrale scrollabile con sfondo grigio chiaro, contenitore centrato (max-width 1440px) | ✅ |
| T1.1.6 | Config Panel (vuoto) | Sidebar destra con header "Configurazione", messaggio "Seleziona un componente" | ✅ |
| T1.1.7 | Pannelli collassabili | Icone per collassare/espandere libreria e config panel | ✅ |
| T1.1.8 | Creare UI store | `src/renderer/store/ui.store.ts`: viewport, panel visibility, zoom | ✅ |

**File creati**:
```
src/renderer/src/App.tsx (modifica - ora importa AppShell)
src/renderer/src/components/layout/AppShell.tsx
src/renderer/src/components/layout/Toolbar.tsx
src/renderer/src/components/layout/StatusBar.tsx
src/renderer/src/features/library/components/LibraryPanel.tsx
src/renderer/src/features/canvas/components/Canvas.tsx
src/renderer/src/features/config/components/ConfigPanel.tsx
src/renderer/src/store/ui.store.ts
```

**Acceptance Criteria**:
- [x] Layout a 3 pannelli visibile, proporzionato, senza overflow
- [x] Toolbar con elementi placeholder visibili
- [x] Libreria e Config Panel collassabili con animazione (transition-[width] 200ms)
- [x] Canvas occupa tutto lo spazio disponibile, scrollabile verticalmente
- [x] StatusBar visibile in basso con informazioni base
- [x] Resize finestra: layout si adatta fluidamente
- [x] Look&feel coerente con tema OBI (arancione, grigio, bianco)

**Verification**:
```bash
npm run typecheck    # ✅ Nessun errore TS
npm run build        # ✅ main 3.68KB, preload 5.09KB, renderer 837KB + 32KB CSS
```

**Output**: Shell dell'app visivamente completa.

**Note tecniche**:
- Canvas include header/footer decorativi OBI con link di navigazione placeholder
- Zoom applicato tramite CSS transform scale() con transformOrigin top center
- lucide-react aggiunge ~280KB al bundle (tree-shaking in produzione ridurra)
- Pannelli collassabili con `transition-[width]` e `overflow-hidden` per animazione fluida

---

### Sprint 1.2 - Template Registry & Primi 4 Renderer

**Goal**: Template Registry funzionante con 4 template built-in registrati e renderizzabili nel canvas.

**Input**: Sprint 1.1 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T1.2.1 | Implementare TemplateRegistry | Classe singleton con `register`, `getDefinition`, `getRenderer`, `listDefinitions`, `subscribe` (da ARCHITECTURE.md sez. 8) |
| T1.2.2 | Definizione HeroSlider | `hero-slider.template.ts` con configSchema completo (slides, autoplay, CTA) |
| T1.2.3 | Renderer HeroSlider | `HeroSliderRenderer.tsx` - desktop: banner full-width con slide indicators; mobile: versione compatta |
| T1.2.4 | Definizione TeaserImageText | `teaser-image-text.template.ts` con varianti 800/1000, countdown |
| T1.2.5 | Renderer TeaserImageText | `TeaserImageTextRenderer.tsx` - immagine + testo + CTA, variante con countdown badge |
| T1.2.6 | Definizione TeaserImage | `teaser-image.template.ts` con overlay testo |
| T1.2.7 | Renderer TeaserImage | `TeaserImageRenderer.tsx` - immagine full-width con overlay gradient + testo |
| T1.2.8 | Definizione GridPromo | `grid-promo.template.ts` con varianti 2col/3col |
| T1.2.9 | Renderer GridPromo | `GridPromoRenderer.tsx` - griglia di card promo con immagine + testo |
| T1.2.10 | Registrazione template | `index.ts` che registra tutti i template nel registry all'avvio |
| T1.2.11 | Hook useTemplateRegistry | React hook che espone il registry e re-renderizza al cambio |

**File da creare**:
```
src/renderer/features/templates/registry/template.registry.ts
src/renderer/features/templates/definitions/hero-slider.template.ts
src/renderer/features/templates/definitions/teaser-image-text.template.ts
src/renderer/features/templates/definitions/teaser-image.template.ts
src/renderer/features/templates/definitions/grid-promo.template.ts
src/renderer/features/templates/definitions/index.ts
src/renderer/features/templates/components/renderers/HeroSliderRenderer.tsx
src/renderer/features/templates/components/renderers/TeaserImageTextRenderer.tsx
src/renderer/features/templates/components/renderers/TeaserImageRenderer.tsx
src/renderer/features/templates/components/renderers/GridPromoRenderer.tsx
src/renderer/features/templates/components/renderers/index.ts
src/renderer/features/templates/types/template.types.ts
```

**Acceptance Criteria**:
- [ ] TemplateRegistry: `register()`, `getDefinition()`, `getRenderer()` funzionano
- [ ] 4 template definiti con configSchema, defaultConfig, layout, cms metadata
- [ ] 4 renderer mostrano un componente visivamente riconoscibile (high-fi OBI style)
- [ ] Ogni renderer accetta prop `viewport` e renderizza diversamente per desktop/mobile
- [ ] Ogni renderer accetta prop `isSelected` e mostra bordo di selezione
- [ ] I renderer usano i design tokens OBI (colori, font, border-radius)

**Verification**:
```
Renderizzare manualmente i 4 renderer nel canvas con dati di test.
Verificare visivamente che assomiglino ai corrispondenti blocchi su obi-italia.it
```

**Output**: 4 componenti OBI renderizzabili, registry funzionante.

---

### Sprint 1.3 - Drag & Drop (Libreria → Canvas)

**Goal**: Drag & drop funzionante: trascinare componenti dalla libreria al canvas, riordinare nel canvas.

**Input**: Sprint 1.2 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T1.3.1 | Creare Canvas store | `canvas.store.ts` con: components[], selectedComponentId, addComponent, removeComponent, moveComponent, selectComponent (da ARCHITECTURE.md sez. 6) |
| T1.3.2 | Popolare LibraryPanel | Mostrare i 4 template dal registry, raggruppati per categoria, con icona e nome |
| T1.3.3 | LibraryItem draggabile | Ogni item nella libreria e draggabile con `useDraggable` di dnd-kit |
| T1.3.4 | Configurare DndContext | Wrappare AppShell in DndContext con PointerSensor e KeyboardSensor |
| T1.3.5 | CanvasDropZone | Content area come SortableContext con `verticalListSortingStrategy` |
| T1.3.6 | ComponentWrapper | Wrapper per ogni componente nel canvas: drag handle, bordo selezione, hover state |
| T1.3.7 | DragOverlay | Preview del componente durante il drag (versione ridotta/placeholder) |
| T1.3.8 | DropIndicator | Linea orizzontale blu che indica dove il componente verra inserito |
| T1.3.9 | onDragEnd handler | Logica per: (a) da libreria → crea nuovo componente; (b) nel canvas → riordina |
| T1.3.10 | Header/Footer OBI | Componenti statici decorativi per header e footer nel canvas |

**File da creare**:
```
src/renderer/features/canvas/store/canvas.store.ts
src/renderer/features/canvas/hooks/useCanvasDnd.ts
src/renderer/features/canvas/components/CanvasDropZone.tsx
src/renderer/features/canvas/components/ComponentWrapper.tsx
src/renderer/features/canvas/components/ComponentPlaceholder.tsx
src/renderer/features/canvas/components/DropIndicator.tsx
src/renderer/features/canvas/components/CanvasHeader.tsx
src/renderer/features/canvas/components/CanvasFooter.tsx
src/renderer/features/canvas/types/canvas.types.ts
src/renderer/features/library/components/LibrarySearch.tsx
src/renderer/features/library/components/LibraryCategory.tsx
src/renderer/features/library/components/LibraryItem.tsx
src/renderer/features/library/hooks/useLibraryDrag.ts
src/renderer/features/canvas/components/Canvas.tsx (modifica)
src/renderer/features/library/components/LibraryPanel.tsx (modifica)
src/renderer/App.tsx (modifica - aggiungere DndContext)
```

**Acceptance Criteria**:
- [ ] Drag da libreria al canvas: nuovo componente appare nella posizione corretta
- [ ] Drag nel canvas: componenti si riordinano con animazione smooth
- [ ] DragOverlay visibile durante il drag con preview del componente
- [ ] DropIndicator mostra chiaramente la posizione di inserimento
- [ ] Click su componente nel canvas → diventa selezionato (bordo evidenziato)
- [ ] Header e Footer OBI visibili sopra e sotto la content area
- [ ] Libreria mostra i 4 template con icona, nome, categoria

**Verification**:
```
1. Trascinare HeroSlider dalla libreria al canvas → appare
2. Trascinare TeaserImageText sotto HeroSlider → appare sotto
3. Trascinare HeroSlider sotto TeaserImageText → si riordina
4. Cliccare su un componente → bordo di selezione
5. Ripetere 3+ volte per verificare stabilita
```

**Output**: Canvas interattivo con drag & drop funzionante.

---

### Sprint 1.4 - Config Panel & Editing Componenti

**Goal**: Pannello configurazione dinamico: click su un componente → mostra i suoi campi configurabili → modifica in tempo reale.

**Input**: Sprint 1.3 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T1.4.1 | FieldRenderer dinamico | Componente che riceve un `ConfigField` e renderizza il campo corretto (text, textarea, select, number, toggle, image, datetime) |
| T1.4.2 | TextField | Input testo con label, placeholder, validazione |
| T1.4.3 | TextAreaField | Textarea multi-riga |
| T1.4.4 | SelectField | Dropdown con opzioni dal configSchema |
| T1.4.5 | NumberField | Input numerico con min/max opzionale |
| T1.4.6 | ToggleField | Switch boolean |
| T1.4.7 | ImageField | Placeholder immagine con label, dimensioni, click per "caricare" (per ora solo placeholder) |
| T1.4.8 | DateTimeField | Picker data/ora per countdown |
| T1.4.9 | ConfigPanel dinamico | Legge il template del componente selezionato, renderizza i campi con FieldRenderer |
| T1.4.10 | Binding bidirezionale | Modifica un campo → aggiorna `component.config` nello store → canvas si aggiorna |
| T1.4.11 | Sezione CMS Mapping | Mostra `cmsComponentId` e `cmsNotes` del template |
| T1.4.12 | Azioni componente | Pulsanti: Duplica, Elimina (con conferma), Sposta su/giu |
| T1.4.13 | Visibilita condizionale | Campi con `showWhen` appaiono/scompaiono in base al valore di un altro campo |
| T1.4.14 | Selezione variante | Se il template ha varianti, mostrare dropdown per selezionarle |

**File da creare**:
```
src/renderer/features/config/components/fields/FieldRenderer.tsx
src/renderer/features/config/components/fields/TextField.tsx
src/renderer/features/config/components/fields/TextAreaField.tsx
src/renderer/features/config/components/fields/SelectField.tsx
src/renderer/features/config/components/fields/NumberField.tsx
src/renderer/features/config/components/fields/ToggleField.tsx
src/renderer/features/config/components/fields/ImageField.tsx
src/renderer/features/config/components/fields/DateTimeField.tsx
src/renderer/features/config/components/ConfigSection.tsx
src/renderer/features/config/components/CmsMapping.tsx
src/renderer/features/config/components/ComponentActions.tsx
src/renderer/features/config/hooks/useComponentConfig.ts
src/renderer/features/config/types/config.types.ts
src/renderer/features/config/components/ConfigPanel.tsx (modifica)
src/renderer/components/common/ConfirmDialog.tsx
```

**Acceptance Criteria**:
- [ ] Selezionare un componente → ConfigPanel mostra i suoi campi
- [ ] Modificare un campo testo → il canvas si aggiorna in tempo reale
- [ ] Selezionare una variante → il componente cambia aspetto
- [ ] Campo con `showWhen` → appare/scompare correttamente
- [ ] Duplica → nuovo componente identico appare sotto l'originale
- [ ] Elimina → dialog conferma → componente rimosso
- [ ] Sposta su/giu → componente si riposiziona
- [ ] Sezione CMS visibile con ID componente e note per Magnolia
- [ ] Nessun componente selezionato → messaggio "Seleziona un componente"

**Verification**:
```
1. Aggiungere HeroSlider, cliccare, modificare headline → testo cambia nel canvas
2. Attivare/disattivare autoplay → campo intervallo appare/scompare
3. Selezionare variante "Split" → layout cambia
4. Duplicare componente → copia appare sotto
5. Eliminare componente → dialog, conferma, scompare
```

**Output**: Editing completo dei componenti via pannello config.

---

### Sprint 1.5 - Storage & Persistenza (Salva/Carica)

**Goal**: Salvare e caricare progetti su filesystem, creazione/apertura progetti, auto-save.

**Input**: Sprint 1.4 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T1.5.1 | FilesystemStorageService | Implementazione completa di `IStorageService` con lettura/scrittura JSON su filesystem (da ARCHITECTURE.md sez. 10) |
| T1.5.2 | Path resolution | `src/main/utils/paths.ts`: risolvere basePath (`%APPDATA%/obi-wireframe` o `./data` relativo all'exe) |
| T1.5.3 | IPC handlers progetto | Implementare handler per: `project:list`, `project:load`, `project:save`, `project:create`, `project:delete` |
| T1.5.4 | IPC handlers versione | Implementare handler per: `version:create`, `version:save`, `version:delete` |
| T1.5.5 | Preload API | Implementare i metodi `window.api.project.*` e `window.api.version.*` nel preload |
| T1.5.6 | Project store | `project.store.ts`: currentProject, isDirty, lastSaved, lista progetti |
| T1.5.7 | WelcomeScreen | Schermata iniziale con lista progetti e pulsante "Nuovo Progetto" |
| T1.5.8 | ProjectCreateDialog | Dialog per creare un nuovo progetto (nome, descrizione) |
| T1.5.9 | ProjectSelector | Dropdown nella toolbar per cambiare progetto |
| T1.5.10 | Salvataggio manuale | Ctrl+S salva il progetto corrente su disco |
| T1.5.11 | Auto-save | Salvataggio automatico ogni 30 secondi se ci sono modifiche |
| T1.5.12 | Indicatore stato | StatusBar mostra "Salvato" / "Modifiche non salvate" / "Salvataggio..." |
| T1.5.13 | Caricamento all'avvio | Se un progetto era aperto, riaprirlo all'avvio dell'app |
| T1.5.14 | Migration service | `migration.service.ts` base con supporto schemaVersion |

**File da creare**:
```
src/main/services/storage.service.ts (interfaccia)
src/main/services/filesystem-storage.service.ts
src/main/services/migration.service.ts
src/main/utils/paths.ts
src/main/ipc/project.ipc.ts
src/main/ipc/version.ipc.ts
src/main/ipc/index.ts (modifica)
src/preload/api.ts (modifica)
src/renderer/features/project/store/project.store.ts
src/renderer/features/project/components/WelcomeScreen.tsx
src/renderer/features/project/components/ProjectCreateDialog.tsx
src/renderer/features/project/components/ProjectSelector.tsx
src/renderer/features/project/hooks/useProject.ts
src/renderer/hooks/useAutoSave.ts
src/renderer/hooks/useKeyboardShortcuts.ts (base - Ctrl+S)
src/renderer/services/api.service.ts
src/renderer/App.tsx (modifica)
src/renderer/components/layout/StatusBar.tsx (modifica)
src/renderer/components/layout/Toolbar.tsx (modifica)
```

**Acceptance Criteria**:
- [ ] Avvio app → WelcomeScreen con lista progetti (vuota la prima volta)
- [ ] Crea progetto "Test" → si apre il canvas vuoto
- [ ] Aggiungi componenti, configura → Ctrl+S → file salvato su disco
- [ ] Chiudi e riapri app → progetto ricaricato con tutti i componenti
- [ ] Auto-save: modificare un componente, aspettare 30s → "Salvato" nella StatusBar
- [ ] File su disco: `%APPDATA%/obi-wireframe/projects/{id}/project.json` leggibile
- [ ] Creazione secondo progetto → appare nella lista, switch funziona

**Verification**:
```bash
# Dopo aver creato un progetto e aggiunto componenti:
# 1. Ctrl+S
# 2. Verificare che i file esistano su disco
# 3. Chiudere l'app
# 4. Riaprire → stesso stato
# 5. Verificare JSON leggibile e struttura corretta
```

**Output**: App persistente. Dati sopravvivono al riavvio.

---

### ✅ QUALITY GATE - Milestone M1: MVP Ready

**Criteri per procedere alla Fase 2**:
- [ ] App si avvia in < 5 secondi
- [ ] 4 template funzionanti con rendering high-fi
- [ ] Drag & drop fluido (no lag, no glitch)
- [ ] Config panel edita tutti i campi correttamente
- [ ] Salvataggio/caricamento affidabile
- [ ] Auto-save funzionante
- [ ] Nessun crash in 30 minuti di uso continuativo
- [ ] **Build portable**: `npm run make:portable` → .exe funziona senza installazione

**Test Build Portable**:
```bash
npm run build && npm run make:portable
# Copiare l'exe su un altro PC (o altra cartella)
# Eseguire → deve funzionare identicamente
```

---

## 5. Fase 2 - Template Completi & Responsive

> **Obiettivo**: Tutti i 14+ template, preview mobile, undo/redo.

---

### Sprint 2.1 - Template Completi (5-14)

**Goal**: Implementare i restanti 10 template built-in.

**Input**: Milestone M1 superata

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T2.1.1 | SliderMulti | Definizione + Renderer: swiper orizzontale con card prodotti/categorie |
| T2.1.2 | TagCloud/SmartPill | Definizione + Renderer: pills cliccabili per sottocategorie |
| T2.1.3 | CategoryGrid | Definizione + Renderer: griglia 6 colonne con link espandibili |
| T2.1.4 | ServiceCards | Definizione + Renderer: 2-3 card servizi affiancate |
| T2.1.5 | EditorialCards | Definizione + Renderer: 3 card editoriali "OBI Consiglia" |
| T2.1.6 | StoreFinder | Definizione + Renderer: widget ricerca negozio |
| T2.1.7 | BannerCTA | Definizione + Renderer: banner singolo con CTA (es. WhatsApp) |
| T2.1.8 | CountdownBadge | Badge con timer countdown (integrabile in TeaserImageText) |
| T2.1.9 | SectionDivider | Definizione + Renderer: separatore con/senza titolo |
| T2.1.10 | Aggiornare LibraryPanel | Aggiungere tutte le categorie, thumbnails per ogni template |

**File da creare** (per ogni template: 1 definition + 1 renderer):
```
src/renderer/features/templates/definitions/slider-multi.template.ts
src/renderer/features/templates/definitions/tag-cloud.template.ts
src/renderer/features/templates/definitions/category-grid.template.ts
src/renderer/features/templates/definitions/service-cards.template.ts
src/renderer/features/templates/definitions/editorial-cards.template.ts
src/renderer/features/templates/definitions/store-finder.template.ts
src/renderer/features/templates/definitions/banner-cta.template.ts
src/renderer/features/templates/definitions/countdown-badge.template.ts
src/renderer/features/templates/definitions/section-divider.template.ts
src/renderer/features/templates/components/renderers/SliderMultiRenderer.tsx
src/renderer/features/templates/components/renderers/TagCloudRenderer.tsx
src/renderer/features/templates/components/renderers/CategoryGridRenderer.tsx
src/renderer/features/templates/components/renderers/ServiceCardsRenderer.tsx
src/renderer/features/templates/components/renderers/EditorialCardsRenderer.tsx
src/renderer/features/templates/components/renderers/StoreFinderRenderer.tsx
src/renderer/features/templates/components/renderers/BannerCtaRenderer.tsx
src/renderer/features/templates/components/renderers/SectionDividerRenderer.tsx
(CountdownBadge integrato in TeaserImageTextRenderer)
```

**Acceptance Criteria**:
- [ ] 13+ template totali nella libreria (4 precedenti + 9 nuovi)
- [ ] Ogni template renderizza in stile OBI high-fi
- [ ] Ogni template ha configSchema completo con tutti i campi editabili
- [ ] Ogni template ha CMS mapping metadata
- [ ] Libreria organizzata per categorie con tutti i template visibili

**Verification**:
```
Creare un wireframe che replica la homepage attuale di obi-italia.it
con tutti i componenti nella sequenza corretta.
Confronto visivo con il sito reale.
```

---

### Sprint 2.2 - Responsive Preview (Desktop + Mobile)

**Goal**: Toggle tra vista desktop (1440px) e mobile (375px), con rendering specifico per ogni viewport.

**Input**: Sprint 2.1 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T2.2.1 | Viewport store | Aggiungere `currentViewport` allo UI store |
| T2.2.2 | Toggle nella Toolbar | Pulsanti Desktop/Mobile con icona, stato attivo evidenziato |
| T2.2.3 | Canvas viewport scaling | Canvas ridimensiona il contenuto in base al viewport selezionato |
| T2.2.4 | Tutti i renderer: mobile | Verificare e completare il rendering mobile per ogni TemplateRenderer |
| T2.2.5 | Vista affiancata | Opzione per mostrare Desktop e Mobile contemporaneamente (split view) |
| T2.2.6 | StatusBar viewport | Mostrare viewport corrente e larghezza nella StatusBar |

**File da modificare**:
```
src/renderer/store/ui.store.ts (modifica)
src/renderer/components/layout/Toolbar.tsx (modifica)
src/renderer/features/canvas/components/Canvas.tsx (modifica)
src/renderer/hooks/useResponsivePreview.ts
Tutti i renderer in src/renderer/features/templates/components/renderers/
```

**Acceptance Criteria**:
- [ ] Click "Mobile" → canvas si restringe a 375px centrato, componenti renderizzano in versione mobile
- [ ] Click "Desktop" → torna a 1440px
- [ ] Vista affiancata → desktop a sinistra, mobile a destra, scroll sincronizzato
- [ ] Ogni renderer ha layout diverso per mobile (stack, dimensioni ridotte)
- [ ] StatusBar mostra "Desktop 1440px" o "Mobile 375px"

---

### Sprint 2.3 - Undo/Redo & Azioni Rapide

**Goal**: Undo/Redo funzionante, keyboard shortcuts, duplica/elimina migliorati.

**Input**: Sprint 2.2 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T2.3.1 | History store | `history.store.ts` con past[], future[], pushHistory, undo, redo (da ARCHITECTURE.md sez. 15) |
| T2.3.2 | Integrare history | Ogni azione che modifica components[] chiama `pushHistory()` prima della modifica |
| T2.3.3 | Keyboard shortcuts | Ctrl+Z = undo, Ctrl+Y = redo, Del = elimina componente selezionato, Ctrl+D = duplica |
| T2.3.4 | Toolbar undo/redo | Pulsanti undo/redo nella toolbar con stato disabled quando non disponibile |
| T2.3.5 | Feedback visivo | Toast notification per azioni (es. "Componente duplicato", "Azione annullata") |
| T2.3.6 | Toast system | Implementare sistema toast notifications con shadcn/ui Toaster |

**File da creare/modificare**:
```
src/renderer/store/history.store.ts
src/renderer/store/index.ts (integrazione slices)
src/renderer/hooks/useKeyboardShortcuts.ts (modifica - aggiungere shortcuts)
src/renderer/hooks/useUndoRedo.ts
src/renderer/components/layout/Toolbar.tsx (modifica)
src/renderer/components/ui/toast.tsx (shadcn Toaster)
```

**Acceptance Criteria**:
- [ ] Ctrl+Z annulla l'ultima azione (aggiunta, rimozione, spostamento, modifica config)
- [ ] Ctrl+Y ripristina l'azione annullata
- [ ] Undo/redo funziona per almeno 50 operazioni consecutive
- [ ] Del elimina il componente selezionato (con conferma)
- [ ] Ctrl+D duplica il componente selezionato
- [ ] Toast notifications visibili per 3 secondi
- [ ] Pulsanti undo/redo nella toolbar disabilitati correttamente

---

### ✅ QUALITY GATE - Milestone M2: Feature Complete (Template)

**Criteri**:
- [ ] 13+ template tutti funzionanti con high-fi rendering
- [ ] Preview Desktop e Mobile corretta
- [ ] Undo/Redo stabile
- [ ] Keyboard shortcuts funzionanti
- [ ] Wireframe che replica la homepage OBI attuale e visivamente confrontabile

---

## 6. Fase 3 - Versioning & Confronto

> **Obiettivo**: Gestione versioni multiple, confronto side-by-side, export PNG/PDF.

---

### Sprint 3.1 - Gestione Versioni

**Goal**: Creare, duplicare, eliminare, rinominare versioni di un wireframe dentro un progetto.

**Input**: Milestone M2 superata

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T3.1.1 | Versioning store | `versioning.store.ts`: currentVersionId, compareVersionId, versioni |
| T3.1.2 | VersionList | Pannello/dialog con lista versioni del progetto, ordinamento cronologico |
| T3.1.3 | VersionItem | Riga singola: nome, stato badge, data, autore, azioni (duplica, rinomina, elimina) |
| T3.1.4 | VersionCreateDialog | Dialog: nome, descrizione, opzione "duplica da versione esistente" |
| T3.1.5 | Switch versione | Selezionare una versione dalla lista → il canvas carica i suoi componenti |
| T3.1.6 | Versione nella Toolbar | Dropdown selettore versione attiva nella toolbar |
| T3.1.7 | IPC versione completi | Completare handlers per caricamento/salvataggio on-demand delle versioni |
| T3.1.8 | Prima versione automatica | Alla creazione di un progetto, creare automaticamente "Versione 1 - Bozza" |

**File da creare**:
```
src/renderer/features/versioning/store/versioning.store.ts
src/renderer/features/versioning/components/VersionList.tsx
src/renderer/features/versioning/components/VersionItem.tsx
src/renderer/features/versioning/components/VersionCreateDialog.tsx
src/renderer/features/versioning/hooks/useVersioning.ts
```

**Acceptance Criteria**:
- [ ] Creare versione "v2" duplicando da "v1" → v2 ha gli stessi componenti
- [ ] Modificare v2 → v1 rimane invariata
- [ ] Switch tra v1 e v2 → canvas cambia istantaneamente
- [ ] Rinominare una versione → nome aggiornato ovunque
- [ ] Eliminare una versione → conferma → rimossa (se non e l'unica)
- [ ] Dropdown nella toolbar mostra tutte le versioni

---

### Sprint 3.2 - Confronto Side-by-Side & Export

**Goal**: Visualizzare due versioni affiancate con diff, esportare in PNG e PDF.

**Input**: Sprint 3.1 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T3.2.1 | CompareView | Layout split-view con due canvas affiancati |
| T3.2.2 | Scroll sincronizzato | Scroll di un canvas → l'altro scrolla alla stessa posizione |
| T3.2.3 | Diff algoritmo | Confronto componenti per templateId + order: evidenziare aggiunti (verde), rimossi (rosso), modificati (giallo) |
| T3.2.4 | DiffHighlight | Overlay visivo sui componenti con differenze |
| T3.2.5 | Toggle diff | Pulsante per attivare/disattivare evidenziazione differenze |
| T3.2.6 | Export PNG | Usare `html-to-image` per catturare il canvas come PNG. IPC: renderer genera l'immagine, main la salva su disco via dialog |
| T3.2.7 | Export PDF | Usare `jsPDF` + `html-to-image`: generare PDF con header (nome progetto, versione, stato, data) + screenshot canvas + lista annotazioni |
| T3.2.8 | ExportDialog | Dialog con opzioni: formato (PNG/PDF), viewport (desktop/mobile/entrambi), includi annotazioni |
| T3.2.9 | IPC export | Handler nel main per salvataggio file con dialog nativo |
| T3.2.10 | Menu nativo export | Voce "File > Esporta" nel menu Electron |

**File da creare**:
```
src/renderer/features/versioning/components/CompareView.tsx
src/renderer/features/versioning/components/DiffHighlight.tsx
src/renderer/features/versioning/components/SyncScroll.tsx
src/renderer/features/versioning/hooks/useDiff.ts
src/renderer/features/export/components/ExportDialog.tsx
src/renderer/features/export/components/ExportProgress.tsx
src/renderer/features/export/hooks/useExport.ts
src/main/ipc/export.ipc.ts
src/main/ipc/dialog.ipc.ts
src/main/services/export.service.ts
src/main/menu.ts
```

**Acceptance Criteria**:
- [ ] "Confronta" → seleziona 2 versioni → split-view con scroll sincronizzato
- [ ] Componenti aggiunti in v2 evidenziati in verde, rimossi in rosso, modificati in giallo
- [ ] Toggle diff on/off funzionante
- [ ] Export PNG → dialog salva file → immagine leggibile della homepage wireframe
- [ ] Export PDF → file PDF con header metadati + immagine wireframe
- [ ] Export funziona sia in vista desktop che mobile

---

### ✅ QUALITY GATE - Milestone M3: Versioning Ready

**Criteri**:
- [ ] Versioning affidabile: creare, duplicare, switch, eliminare senza perdita dati
- [ ] Confronto side-by-side visivamente chiaro
- [ ] Export PNG e PDF di qualita professionale
- [ ] **Beta test**: dare l'app a 3-5 Content Manager per feedback

---

## 7. Fase 4 - Workflow & Annotazioni

> **Obiettivo**: Workflow di approvazione, annotazioni sui componenti.

---

### Sprint 4.1 - Workflow di Approvazione

**Goal**: Implementare la state machine Bozza → In Review → Approvato → In Produzione con transizioni tracciate.

**Input**: Milestone M3 superata

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T4.1.1 | Workflow store | `workflow.store.ts` con stato corrente, transizioni, validazione regole |
| T4.1.2 | WorkflowBadge | Badge colorato per ogni stato (grigio=bozza, blu=review, verde=approvato, arancione=produzione) |
| T4.1.3 | WorkflowTransition | Dialog per cambiare stato: dropdown stato target (solo stati permessi), nota obbligatoria, autore |
| T4.1.4 | WorkflowHistory | Timeline delle transizioni con data, autore, da→a, nota |
| T4.1.5 | Regole transizione | Implementare `WORKFLOW_TRANSITIONS` da ARCHITECTURE.md: validare che la transizione sia permessa |
| T4.1.6 | Badge in VersionList | Ogni versione nella lista mostra il suo stato corrente come badge |
| T4.1.7 | Badge nella Toolbar | Stato corrente visibile nella toolbar accanto al nome versione |
| T4.1.8 | Protezione versioni approvate | Versioni "approvate" o "in produzione": mostrare warning prima di modificare |

**File da creare**:
```
src/renderer/features/workflow/store/workflow.store.ts
src/renderer/features/workflow/components/WorkflowBadge.tsx
src/renderer/features/workflow/components/WorkflowTransition.tsx
src/renderer/features/workflow/components/WorkflowHistory.tsx
src/renderer/features/workflow/hooks/useWorkflow.ts
```

**Acceptance Criteria**:
- [ ] Nuova versione → stato "Bozza"
- [ ] Bozza → "In Review" con nota → transizione salvata con autore e timestamp
- [ ] "In Review" → solo "Bozza" o "Approvato" come opzioni
- [ ] Tentativo di transizione non valida → bloccato
- [ ] WorkflowHistory mostra timeline completa
- [ ] Badge colorati corretti in lista versioni e toolbar
- [ ] Modifica versione approvata → warning "Questa versione e gia approvata"

---

### Sprint 4.2 - Annotazioni

**Goal**: Aggiungere commenti/annotazioni su specifici componenti, con pin visivi e lista laterale.

**Input**: Sprint 4.1 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T4.2.1 | Annotations store | `annotations.store.ts`: annotazioni per componente, CRUD, cambio stato |
| T4.2.2 | AnnotationPin | Pin numerato cliccabile posizionato sul componente nel canvas |
| T4.2.3 | AnnotationForm | Form: testo commento, autore (pre-compilato da OS username) |
| T4.2.4 | AnnotationPanel | Pannello laterale (tab nella ConfigPanel) con lista annotazioni |
| T4.2.5 | AnnotationThread | Thread di risposte sotto un'annotazione |
| T4.2.6 | Stato annotazione | Toggle "Aperta" / "Risolta" |
| T4.2.7 | Contatore annotazioni | Badge con numero annotazioni aperte sul ComponentWrapper |
| T4.2.8 | Annotazioni nel PDF | Includere lista annotazioni nell'export PDF |
| T4.2.9 | Toggle visibilita pin | Pulsante per mostrare/nascondere tutti i pin nel canvas |

**File da creare**:
```
src/renderer/features/annotations/store/annotations.store.ts
src/renderer/features/annotations/components/AnnotationPin.tsx
src/renderer/features/annotations/components/AnnotationForm.tsx
src/renderer/features/annotations/components/AnnotationPanel.tsx
src/renderer/features/annotations/components/AnnotationThread.tsx
```

**Acceptance Criteria**:
- [ ] Click destro (o pulsante) su componente → "Aggiungi annotazione"
- [ ] Pin numerato appare sul componente nel canvas
- [ ] Click sul pin → apre il thread dell'annotazione
- [ ] Rispondere a un'annotazione → reply visibile nel thread
- [ ] Marcare come "Risolta" → pin cambia stile (grigio/barrato)
- [ ] Annotazioni incluse nell'export PDF
- [ ] Toggle visibilita pin funzionante

---

### ✅ QUALITY GATE - Milestone M4: Workflow Ready

**Criteri**:
- [ ] Workflow completo e testato
- [ ] Annotazioni funzionanti con thread
- [ ] Export PDF include annotazioni
- [ ] **Release Candidate**: dare l'app a tutti i Content Manager per test esteso

---

## 8. Fase 5 - Template Editor Custom

> **Obiettivo**: Editor drag & drop per creare template custom che mappano 1:1 i componenti CMS.

---

### Sprint 5.1 - Template Editor Base

**Goal**: Dialog editor per creare un template custom definendo griglia, zone, e proprietà.

**Input**: Milestone M4 superata

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T5.1.1 | Template editor store | `template-editor.store.ts`: zones[], gridConfig, metadata, CRUD azioni |
| T5.1.2 | TemplateEditorDialog | Dialog fullscreen con: form metadata (nome, categoria, CMS ID) + canvas editing + preview |
| T5.1.3 | Grid configurabile | Slider per colonne (1-12), gap, padding. Overlay griglia visuale |
| T5.1.4 | ZoneToolbox | Barra con zone trascinabili: Immagine, Testo, Heading, CTA, Icona, Countdown, Spacer |
| T5.1.5 | ZoneElement | Elemento zona nel canvas: trascinabile, ridimensionabile (drag corners), configurabile |
| T5.1.6 | Zone properties | Click su zona → pannello proprieta: label, alignment, stile, dimensioni |
| T5.1.7 | Preview live | Preview real-time del template con dati placeholder |
| T5.1.8 | Salvataggio template | Salvare come TemplateDefinition con `customZones`, registrare nel registry |

**File da creare**:
```
src/renderer/features/template-editor/store/template-editor.store.ts
src/renderer/features/template-editor/components/TemplateEditorDialog.tsx
src/renderer/features/template-editor/components/TemplateCanvas.tsx
src/renderer/features/template-editor/components/ZoneToolbox.tsx
src/renderer/features/template-editor/components/ZoneElement.tsx
src/renderer/features/template-editor/components/GridOverlay.tsx
src/renderer/features/template-editor/components/TemplatePreview.tsx
src/renderer/features/template-editor/hooks/useTemplateEditor.ts
src/renderer/features/templates/components/renderers/CustomTemplateRenderer.tsx
```

**Acceptance Criteria**:
- [ ] Aprire editor → canvas vuoto con griglia configurabile
- [ ] Trascinare una zona "Immagine" → appare sulla griglia
- [ ] Ridimensionare zona → si espande/contrae sulle colonne
- [ ] Configurare zona → cambiare label, alignment, stile
- [ ] Preview mostra il template renderizzato con dati placeholder
- [ ] Salvare → template appare nella libreria sotto "Custom"
- [ ] Usare template custom nel canvas → renderizza correttamente
- [ ] Template custom editabile (riaprire editor → modificare → salvare)

---

### Sprint 5.2 - Import/Export Template & Condivisione

**Goal**: Importare/esportare template come file JSON, condividere tra colleghi.

**Input**: Sprint 5.1 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T5.2.1 | Export template JSON | Selezionare template custom → "Esporta" → dialog salva file .json |
| T5.2.2 | Import template JSON | Pulsante "Importa Template" → dialog apri file → validazione → registrazione |
| T5.2.3 | IPC template | Handler nel main per import/export template via filesystem |
| T5.2.4 | Validazione import | Verificare che il JSON sia un TemplateDefinition valido, gestire errori |
| T5.2.5 | Gestione duplicati | Se un template importato ha lo stesso ID di uno esistente, chiedere: sovrascrivere o duplicare |
| T5.2.6 | Template nel progetto | Template custom salvati sia globalmente che a livello progetto |
| T5.2.7 | Pulsante nella libreria | "+ Nuovo Template" nella libreria apre l'editor |
| T5.2.8 | Context menu template | Click destro su template custom → Modifica, Duplica, Esporta, Elimina |

**File da creare/modificare**:
```
src/main/ipc/template.ipc.ts
src/main/services/template.service.ts
src/renderer/features/library/components/LibraryPanel.tsx (modifica)
```

**Acceptance Criteria**:
- [ ] Esportare template → file `.json` leggibile e portabile
- [ ] Importare template da file → appare nella libreria
- [ ] Importare template con ID duplicato → dialog scelta (sovrascrivere/duplicare)
- [ ] Template condiviso: esportare da un PC, importare su un altro → funziona identicamente
- [ ] "+ Nuovo Template" nella libreria → apre editor

---

### ✅ QUALITY GATE - Milestone M5: Custom Templates

**Criteri**:
- [ ] Editor template custom funzionante
- [ ] Import/export template tra PC diversi
- [ ] Template custom usabili nel canvas al pari dei built-in
- [ ] **Feature Complete**: tutte le feature del PRD implementate

---

## 9. Fase 6 - Polish & Distribution

> **Obiettivo**: Ottimizzazione, testing, packaging, documentazione. Preparazione per rilascio production.

---

### Sprint 6.1 - Performance & Stabilita

**Goal**: Ottimizzare performance, fixare bug, gestione errori robusta.

**Input**: Milestone M5 superata

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T6.1.1 | Profiling | Identificare bottleneck: rendering con 30+ componenti, drag lag, memory leak |
| T6.1.2 | React.memo | Applicare memoizzazione a tutti i TemplateRenderer e ComponentWrapper |
| T6.1.3 | Zustand selectors | Verificare che ogni componente usi selectors granulari, non lo store intero |
| T6.1.4 | Debounce config | Debounce 300ms sugli input del ConfigPanel |
| T6.1.5 | CSS containment | Aggiungere `contain: layout style paint` ai ComponentWrapper |
| T6.1.6 | Error boundaries | React ErrorBoundary attorno a ogni renderer e sezione dell'app |
| T6.1.7 | Gestione errori IPC | Try/catch su tutti gli IPC handler, messaggi errore user-friendly |
| T6.1.8 | Gestione crash | Salvataggio di emergenza prima di crash (window `beforeunload`) |
| T6.1.9 | Fix bug accumulati | Risolvere tutti i bug segnalati durante le fasi precedenti |

**Acceptance Criteria**:
- [ ] Canvas con 30 componenti: rendering < 1s, drag fluido
- [ ] Nessun memory leak dopo 1 ora di uso
- [ ] Crash di un renderer → error boundary mostra messaggio, non crasha l'app
- [ ] Errore salvataggio → toast con messaggio chiaro
- [ ] App stabile per uso continuativo di 2+ ore

---

### Sprint 6.2 - Import/Export Progetto & Lock File

**Goal**: Import/export progetto completo come ZIP, lock file per accesso concorrente.

**Input**: Sprint 6.1 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T6.2.1 | Export ZIP | Archiviare intero progetto (JSON + asset) come file .zip |
| T6.2.2 | Import ZIP | Aprire file .zip → estrarre → registrare progetto |
| T6.2.3 | Lock Service | File `.lock` nella cartella progetto con username + timestamp |
| T6.2.4 | Lock heartbeat | Aggiornamento automatico del lock ogni 30 secondi |
| T6.2.5 | Lock check | All'apertura progetto: verificare se e lockato da un altro utente |
| T6.2.6 | Lock UI | Warning "Progetto in uso da [utente]" con opzione "Apri in sola lettura" |
| T6.2.7 | Rilascio lock | Rilasciare lock alla chiusura del progetto/app |

**File da creare**:
```
src/main/services/lock.service.ts
src/main/ipc/export.ipc.ts (modifica - ZIP)
```

**Acceptance Criteria**:
- [ ] Export ZIP → file scaricabile con tutti i dati del progetto
- [ ] Import ZIP → progetto appare nella lista
- [ ] Aprire progetto su PC1 → file .lock creato
- [ ] Tentare apertura su PC2 → warning con nome utente
- [ ] Chiudere su PC1 → lock rimosso → PC2 puo aprire
- [ ] Lock scaduto (> 5 minuti senza heartbeat) → liberato automaticamente

---

### Sprint 6.3 - Packaging, Testing Finale & Help In-App

**Goal**: Build production, test su macchine target, documentazione in-app.

**Input**: Sprint 6.2 completato

**Tasks**:

| ID | Task | Dettaglio |
|----|------|-----------|
| T6.3.1 | Build portable ottimizzato | Configurare electron-builder per output minimo, compressione |
| T6.3.2 | Build dir (alternativa) | Generare anche versione cartella (non .exe) per evitare SmartScreen |
| T6.3.3 | Test su macchina senza admin | Copiare su PC target senza diritti admin, verificare avvio e funzionamento |
| T6.3.4 | Test su cartella di rete | Salvare progetti su cartella condivisa, aprire da altro PC |
| T6.3.5 | Help in-app | Dialog "Guida Rapida" con spiegazione delle funzionalita principali |
| T6.3.6 | Keyboard shortcuts reference | Dialog con lista tutti gli shortcuts (Ctrl+S, Ctrl+Z, etc.) |
| T6.3.7 | About dialog | Versione app, crediti |
| T6.3.8 | Menu nativo completo | File (Nuovo, Apri, Salva, Esporta), Modifica (Undo, Redo), Visualizza (Desktop, Mobile, Confronta), Aiuto |
| T6.3.9 | Icona app | Icona personalizzata per l'eseguibile (stile OBI) |
| T6.3.10 | Titolo finestra dinamico | "OBI Wireframe - [Nome Progetto] - [Nome Versione]" |
| T6.3.11 | Checklist pre-rilascio | Passare tutti i test di verifica end-to-end (da PRD.md sez. 12) |

**File da creare/modificare**:
```
src/main/menu.ts (modifica - menu completo)
src/main/window.ts (modifica - titolo dinamico)
src/renderer/components/common/HelpDialog.tsx
src/renderer/components/common/ShortcutsDialog.tsx
src/renderer/components/common/AboutDialog.tsx
resources/icon.ico
resources/icon.png
package.json (modifica - build config finale)
```

**Acceptance Criteria**:
- [ ] `npm run make:portable` → .exe < 200MB
- [ ] .exe si avvia su Windows 10/11 senza admin in < 5 secondi
- [ ] Alternativa dir: cartella estraibile funzionante
- [ ] Progetti su cartella di rete: salvare e aprire da PC diversi
- [ ] Menu nativo completo con tutte le voci
- [ ] Help dialog spiega il funzionamento base
- [ ] Shortcuts dialog mostra tutti i keybinding
- [ ] Icona app visibile nel taskbar e nel file explorer
- [ ] Titolo finestra si aggiorna con progetto e versione correnti

---

### ✅ QUALITY GATE - Milestone M6: Production Release 🚀

**Checklist Rilascio Finale**:

| # | Check | Metodo |
|---|-------|--------|
| 1 | App si avvia in < 5 secondi | Cronometrare |
| 2 | Nessun errore in console | DevTools > Console |
| 3 | Crea progetto e aggiunge 15+ componenti | Manuale |
| 4 | Configura ogni componente con testi reali | Manuale |
| 5 | Preview mobile corretta | Manuale - confronto visivo |
| 6 | Salva, chiudi, riapri → stato preservato | Manuale |
| 7 | Crea v2, modifica, confronta con v1 | Manuale |
| 8 | Workflow: Bozza → Review → Approvato | Manuale |
| 9 | Annotazione con thread e risoluzione | Manuale |
| 10 | Export PNG leggibile | Aprire il file |
| 11 | Export PDF con metadati e annotazioni | Aprire il file |
| 12 | Template custom: crea, usa, esporta, importa | Manuale |
| 13 | Undo/Redo 10 operazioni consecutive | Manuale |
| 14 | 2 ore uso continuativo senza crash | Sessione di test |
| 15 | Funziona su PC senza admin | Test su macchina target |
| 16 | Progetto su rete condivisa funzionante | Test su 2 PC |
| 17 | Lock file previene modifiche concorrenti | Test con 2 utenti |
| 18 | Dimensione .exe < 200MB | Verificare su disco |

---

## 10. Quality Gates & Milestones

### Sommario Milestone

| Milestone | Dopo Sprint | Feature Chiave | Rilascio |
|-----------|-------------|---------------|----------|
| **M0** | S0.2 | Infrastruttura, tipi, security | Dev only |
| **M1** | S1.5 | MVP: drag&drop, 4 template, salva/carica | Alpha (1-2 tester) |
| **M2** | S2.3 | 13+ template, responsive, undo/redo | Beta (3-5 tester) |
| **M3** | S3.2 | Versioning, confronto, export PNG/PDF | Beta estesa |
| **M4** | S4.2 | Workflow, annotazioni | Release Candidate |
| **M5** | S5.2 | Template editor custom | Feature Complete |
| **M6** | S6.3 | Polish, performance, packaging | **Production 1.0** |

### Regole Quality Gate

1. **Tutti gli Acceptance Criteria dello sprint devono essere soddisfatti** prima di procedere
2. **Build portable deve funzionare** ad ogni milestone (M1+)
3. **Nessun crash bloccante** nelle ultime 2 ore di test
4. **Dati persistenti**: salva → chiudi → riapri senza perdita dati

---

## 11. Gestione Rischi per Fase

| Fase | Rischio Principale | Probabilita | Piano B |
|------|-------------------|-------------|---------|
| **F0** | electron-vite incompatibilita | Bassa | Fallback a Webpack + electron-builder |
| **F1** | dnd-kit performance con molti componenti | Media | Virtualizzazione con @tanstack/virtual |
| **F1** | Canvas rendering lento in high-fi | Media | Ridurre dettaglio, lazy render fuori viewport |
| **F1** | Build portable non funziona senza admin | Alta | Usare target `dir` (cartella) invece di `.exe` |
| **F2** | Template OBI non accurati | Media | Iterazione con Content Manager per ogni template |
| **F3** | Confronto side-by-side memory-intensive | Bassa | Caricare una versione alla volta, non entrambe in memoria |
| **F4** | Conflitti workflow con piu utenti | Media | Lock file + warning, non editing concorrente |
| **F5** | Editor template troppo complesso | Media | Semplificare: solo grid-based, no free-form |
| **F6** | SmartScreen blocca .exe | Alta | Distribuire come cartella, istruzioni sblocco |

---

## 12. Istruzioni per Agente AI

### Come Usare Questo Documento

Questo documento e progettato per essere seguito **sprint per sprint** da un agente AI (Claude Code). Per ogni sprint:

1. **Leggi il Goal** — capisci cosa deve essere ottenuto
2. **Verifica l'Input** — assicurati che lo sprint precedente sia completato
3. **Esegui i Task** — in ordine, uno alla volta
4. **Controlla i File** — crea/modifica solo i file elencati
5. **Verifica gli Acceptance Criteria** — ogni punto deve essere soddisfatto
6. **Esegui Verification** — comandi e azioni di verifica
7. **Commit** — un commit descrittivo per lo sprint completato

### Template Commit Message

```
feat(sprint-X.Y): [breve descrizione]

Sprint X.Y completato:
- [task 1]
- [task 2]
- [task N]

Acceptance Criteria: tutti soddisfatti
```

### Regole Non Negoziabili

1. **Mai saltare uno sprint**: seguire l'ordine esatto
2. **Mai implementare feature non nello sprint corrente**: no gold plating
3. **Sempre verificare prima di procedere**: gli AC sono obbligatori
4. **Build portable ad ogni milestone**: se non builda, non procedere
5. **Segnalare blocchi**: se qualcosa non funziona, fermarsi e chiedere

### Prompt di Avvio per Ogni Sprint

Quando si inizia un nuovo sprint, usare questo prompt:

```
Inizia Sprint [X.Y] - [Nome Sprint]
Riferimenti: SPRINT_PLAN.md, PRD.md, ARCHITECTURE.md

Goal: [copiare il goal dallo sprint]

Esegui tutti i task elencati in ordine.
Verifica tutti gli Acceptance Criteria al termine.
Fai un commit al completamento.
```
