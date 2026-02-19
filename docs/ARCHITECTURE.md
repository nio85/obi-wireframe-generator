# Architecture Document: OBI Homepage Wireframe Generator

> Versione: 1.1 | Data: 2026-02-19 | Riferimento: [PRD.md](PRD.md)

---

## Indice

1. [Principi Architetturali](#1-principi-architetturali)
2. [System Overview](#2-system-overview)
3. [Process Architecture (Electron)](#3-process-architecture-electron)
4. [Directory Structure](#4-directory-structure)
5. [Layer Architecture](#5-layer-architecture)
6. [State Management](#6-state-management)
7. [Data Models](#7-data-models)
8. [Template System](#8-template-system)
9. [Drag & Drop Architecture](#9-drag--drop-architecture)
10. [Storage Layer](#10-storage-layer)
11. [IPC Communication Protocol](#11-ipc-communication-protocol)
12. [Event Bus & Plugin System](#12-event-bus--plugin-system)
13. [Export Pipeline](#13-export-pipeline)
14. [Responsive Rendering Engine](#14-responsive-rendering-engine)
15. [Undo/Redo System](#15-undoredo-system)
16. [Build & Distribution](#16-build--distribution)
17. [Performance Strategy](#17-performance-strategy)
18. [Security Model](#18-security-model)
19. [Testing Strategy](#19-testing-strategy)
20. [Future Evolution Paths](#20-future-evolution-paths)

---

## 1. Principi Architetturali

### Design Principles

| Principio | Descrizione | Impatto Pratico |
|-----------|-------------|-----------------|
| **Separation of Concerns** | Ogni layer ha una responsabilita chiara e unica | Main process = filesystem/OS, Renderer = UI, Preload = bridge |
| **Dependency Inversion** | I moduli dipendono da astrazioni, non da implementazioni concrete | `StorageService` interface, non `fs` diretto nel renderer |
| **Open/Closed** | Aperto all'estensione, chiuso alla modifica | Template Registry estensibile senza toccare il core |
| **Unidirectional Data Flow** | I dati fluiscono in una sola direzione: `shared → features → app` | Zustand stores + React rendering unidirezionale |
| **Feature Encapsulation** | Ogni feature e autocontenuta con i propri componenti, store, tipi | Nessun import ciclico tra feature diverse |
| **Offline-First** | Tutto funziona senza connessione, i dati sono locali | Filesystem-based storage, nessuna dipendenza da servizi esterni |
| **Progressive Enhancement** | MVP funzionante, poi iterare aggiungendo capability | Core stabile, feature additive |

### Future-Proofing Strategy

L'architettura e progettata per supportare queste evoluzioni senza riscritture:

```
OGGI (v1)                    DOMANI (v2+)
─────────────────────────────────────────────────
Filesystem locale      →     Cloud sync (S3/Azure)
Solo homepage          →     Multi-page (PLP, PDP)
Template hardcoded     →     Plugin marketplace
Export PNG/PDF         →     Export HTML, Figma, Magnolia XML
5-10 utenti locali     →     Team distribuiti con real-time collab
Solo OBI Italia        →     Multi-brand/multi-country
UI italiano            →     i18n multilingua
```

---

## 2. System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ELECTRON APPLICATION                      │
│                                                              │
│  ┌──────────────────┐    IPC     ┌────────────────────────┐ │
│  │   MAIN PROCESS   │◄──────────►│   RENDERER PROCESS     │ │
│  │                   │  (typed)   │                        │ │
│  │  ┌─────────────┐ │           │  ┌──────────────────┐  │ │
│  │  │ FileService  │ │           │  │   React App       │  │ │
│  │  │ WindowMgr    │ │           │  │                    │  │ │
│  │  │ MenuBuilder  │ │           │  │  ┌─────────────┐  │  │ │
│  │  │ AutoUpdater  │ │           │  │  │ UI Layer     │  │  │ │
│  │  │ DialogService│ │           │  │  ├─────────────┤  │  │ │
│  │  │ ExportService│ │           │  │  │ Feature Layer│  │  │ │
│  │  └─────────────┘ │           │  │  ├─────────────┤  │  │ │
│  │                   │           │  │  │ Store Layer  │  │  │ │
│  │       ▼           │           │  │  ├─────────────┤  │  │ │
│  │  ┌─────────────┐ │           │  │  │ Service Layer│  │  │ │
│  │  │ FILESYSTEM   │ │           │  │  └─────────────┘  │  │ │
│  │  │ (projects,   │ │           │  │                    │  │ │
│  │  │  templates,  │ │           │  └──────────────────┘  │ │
│  │  │  config)     │ │           │                        │ │
│  │  └─────────────┘ │           └────────────────────────┘ │
│  └──────────────────┘                                       │
│           ▲                                                  │
│  ┌────────┴─────────┐                                       │
│  │  PRELOAD SCRIPT   │                                       │
│  │  (contextBridge)  │                                       │
│  │  Typed API only   │                                       │
│  └──────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack (dettagliato)

| Layer | Tecnologia | Versione Target | Perche |
|-------|-----------|----------------|--------|
| **Runtime** | Electron | 39.6+ | LTS stabile, Chromium 142, Node 22 |
| **Build Tool** | electron-vite | 5.0+ | Vite 7 based, HMR veloce, config semplice per main/preload/renderer |
| **UI Framework** | React | 19.2+ | Ecosistema maturo, concurrent features, compiler |
| **Language** | TypeScript | 5.9+ | Strict mode, type safety end-to-end |
| **Styling** | Tailwind CSS | 3.4+ | Utility-first, tree-shakeable, design system coerente |
| **Component Library** | shadcn/ui | latest | Componenti accessibili, customizzabili, copy-paste |
| **Drag & Drop** | @dnd-kit/core + /sortable | 6.3+ / 10+ | Modulare, performante, accessibile, tree-shakeable |
| **State** | Zustand | 5.0+ | Leggero, middleware composable, slices pattern |
| **Icons** | Lucide React | latest | Tree-shakeable, consistente |
| **UUID** | crypto.randomUUID() | built-in | Nessuna dipendenza, nativo |
| **Date** | date-fns | 3+ | Tree-shakeable, immutable |
| **Export PNG** | html-to-image | latest | Piu leggero di html2canvas, supporta SVG |
| **Export PDF** | jsPDF | latest | Client-side, nessuna dipendenza nativa |
| **File Compression** | archiver + unzipper | latest | ZIP import/export |
| **Testing** | Vitest + React Testing Library | latest | Compatibile con Vite, veloce |
| **Packaging** | electron-builder | 26+ | Target portable per Windows |

> **Nota**: `@electron-toolkit/utils` e stato rimosso dal progetto perche incompatibile con ambienti dove `ELECTRON_RUN_AS_NODE=1` (VS Code, Claude Code). Si usano API Electron native.

---

## 3. Process Architecture (Electron)

### Multi-Process Model

```
┌─────────────────────────────────────────┐
│              MAIN PROCESS               │
│  (Node.js runtime - accesso completo)   │
│                                          │
│  Responsabilita:                         │
│  - Lifecycle dell'app (ready, quit)     │
│  - Creazione/gestione finestre          │
│  - Accesso filesystem (fs, path)        │
│  - Dialog nativi (open, save, message)  │
│  - Menu applicazione                    │
│  - Export (PDF generation)              │
│  - Auto-update (futuro)                │
│  - Lock file per progetti              │
└──────────────────┬──────────────────────┘
                    │
          contextBridge (typed)
                    │
┌──────────────────▼──────────────────────┐
│            PRELOAD SCRIPT               │
│  (Ponte sicuro main ↔ renderer)        │
│                                          │
│  Espone SOLO:                           │
│  - window.api.project.*                 │
│  - window.api.template.*               │
│  - window.api.export.*                  │
│  - window.api.dialog.*                  │
│  - window.api.app.*                     │
│                                          │
│  NON espone MAI:                        │
│  - ipcRenderer diretto                  │
│  - require()                            │
│  - process                              │
│  - fs, path, child_process              │
└──────────────────┬──────────────────────┘
                    │
┌──────────────────▼──────────────────────┐
│           RENDERER PROCESS              │
│  (Chromium sandbox - web-only)          │
│                                          │
│  Responsabilita:                         │
│  - Tutta la UI React                    │
│  - State management (Zustand)           │
│  - Drag & Drop (dnd-kit)               │
│  - Canvas rendering                     │
│  - Chiama window.api.* per I/O         │
│                                          │
│  NON puo:                               │
│  - Accedere al filesystem               │
│  - Eseguire Node.js APIs               │
│  - Accedere al main process diretto     │
└─────────────────────────────────────────┘
```

### Preload API Contract (Type-Safe)

```typescript
// src/shared/types/api.ts - Contratto condiviso tra tutti i processi

export interface ElectronAPI {
  project: {
    list: () => Promise<ProjectSummary[]>;
    load: (projectId: string) => Promise<Project>;
    save: (project: Project) => Promise<void>;
    create: (name: string, description?: string) => Promise<Project>;
    delete: (projectId: string) => Promise<void>;
    duplicate: (projectId: string, newName: string) => Promise<Project>;
    getStoragePath: () => Promise<string>;
    setStoragePath: (path: string) => Promise<void>;
  };

  version: {
    create: (projectId: string, name: string, basedOnVersionId?: string) => Promise<WireframeVersion>;
    save: (projectId: string, version: WireframeVersion) => Promise<void>;
    delete: (projectId: string, versionId: string) => Promise<void>;
    loadAssets: (projectId: string, versionId: string) => Promise<AssetMap>;
  };

  template: {
    listBuiltIn: () => Promise<TemplateDefinition[]>;
    listCustom: () => Promise<TemplateDefinition[]>;
    saveCustom: (template: TemplateDefinition) => Promise<void>;
    deleteCustom: (templateId: string) => Promise<void>;
    importTemplate: (filePath: string) => Promise<TemplateDefinition>;
    exportTemplate: (templateId: string, targetPath: string) => Promise<void>;
  };

  asset: {
    importImage: (projectId: string, versionId: string) => Promise<AssetReference>;
    getImagePath: (projectId: string, versionId: string, assetId: string) => Promise<string>;
  };

  export: {
    toPNG: (html: string, width: number, height: number) => Promise<string>; // returns file path
    toPDF: (html: string, metadata: ExportMetadata) => Promise<string>;
    toZIP: (projectId: string) => Promise<string>;
    fromZIP: (filePath: string) => Promise<Project>;
  };

  dialog: {
    showOpen: (options: OpenDialogOptions) => Promise<string[] | null>;
    showSave: (options: SaveDialogOptions) => Promise<string | null>;
    showMessage: (options: MessageDialogOptions) => Promise<number>;
  };

  app: {
    getVersion: () => Promise<string>;
    getPlatform: () => Promise<string>;
    getUsername: () => Promise<string>;
    onMenuAction: (callback: (action: string) => void) => void;
    removeMenuActionListener: () => void;
  };
}

// Reso disponibile nel renderer come window.api
declare global {
  interface Window {
    api: ElectronAPI;
  }
}
```

---

## 4. Directory Structure

```
obi-wireframe-generator/
│
├── electron.vite.config.ts          # Config electron-vite (main + preload + renderer)
├── package.json
├── tsconfig.json                    # Root TS config
├── tsconfig.node.json               # TS config per main/preload (Node.js)
├── tsconfig.web.json                # TS config per renderer (DOM)
├── tailwind.config.ts
├── postcss.config.js
│
├── resources/                       # Asset statici per il build (icona app, etc.)
│   ├── icon.ico
│   └── icon.png
│
├── src/
│   ├── main/                        # ═══ MAIN PROCESS ═══
│   │   ├── index.ts                 # Entry point: app lifecycle, window creation
│   │   ├── window.ts                # Window manager (creazione, dimensioni, posizione)
│   │   ├── menu.ts                  # Menu applicazione nativo
│   │   │
│   │   ├── ipc/                     # IPC handlers (uno per dominio)
│   │   │   ├── index.ts             # Registra tutti gli handler
│   │   │   ├── project.ipc.ts       # Handler CRUD progetti
│   │   │   ├── version.ipc.ts       # Handler versioni
│   │   │   ├── template.ipc.ts      # Handler template
│   │   │   ├── asset.ipc.ts         # Handler immagini/asset
│   │   │   ├── export.ipc.ts        # Handler export PNG/PDF/ZIP
│   │   │   └── dialog.ipc.ts        # Handler dialog nativi
│   │   │
│   │   ├── services/                # Business logic lato main
│   │   │   ├── storage.service.ts   # Astrazione filesystem (CRITICO per future-proofing)
│   │   │   ├── project.service.ts   # Operazioni su progetti
│   │   │   ├── template.service.ts  # Caricamento/salvataggio template
│   │   │   ├── export.service.ts    # Generazione PNG/PDF/ZIP
│   │   │   ├── lock.service.ts      # File locking per accesso concorrente
│   │   │   └── migration.service.ts # Migrazione dati tra versioni dell'app
│   │   │
│   │   └── utils/
│   │       ├── paths.ts             # Risoluzione path (app, progetti, config)
│   │       └── logger.ts            # Logging centralizzato
│   │
│   ├── preload/                     # ═══ PRELOAD SCRIPT ═══
│   │   ├── index.ts                 # Entry: contextBridge.exposeInMainWorld
│   │   └── api.ts                   # Implementazione typed API (wrappa ipcRenderer.invoke)
│   │
│   ├── renderer/                    # ═══ RENDERER PROCESS (React App) ═══
│   │   ├── index.html               # HTML entry
│   │   ├── main.tsx                 # React entry point
│   │   ├── App.tsx                  # Root component + routing
│   │   │
│   │   ├── assets/                  # Asset statici del renderer (CSS, immagini UI)
│   │   │   └── styles/
│   │   │       ├── globals.css      # Tailwind directives + CSS custom OBI
│   │   │       └── obi-theme.css    # Design tokens OBI (colori, font, spacing)
│   │   │
│   │   ├── components/              # ═══ SHARED UI COMPONENTS ═══
│   │   │   ├── ui/                  # shadcn/ui components (Button, Dialog, Input, etc.)
│   │   │   │   ├── button.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── scroll-area.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   └── tooltip.tsx
│   │   │   │
│   │   │   ├── layout/              # Layout shell dell'app
│   │   │   │   ├── AppShell.tsx     # Layout a 3 pannelli
│   │   │   │   ├── Toolbar.tsx      # Barra superiore
│   │   │   │   └── StatusBar.tsx    # Barra inferiore (stato, zoom, viewport)
│   │   │   │
│   │   │   └── common/              # Componenti riutilizzabili cross-feature
│   │   │       ├── ConfirmDialog.tsx
│   │   │       ├── EmptyState.tsx
│   │   │       ├── LoadingSpinner.tsx
│   │   │       └── Badge.tsx
│   │   │
│   │   ├── features/                # ═══ FEATURE MODULES ═══
│   │   │   │
│   │   │   ├── canvas/              # --- CANVAS (cuore dell'app) ---
│   │   │   │   ├── components/
│   │   │   │   │   ├── Canvas.tsx              # Container canvas con scroll
│   │   │   │   │   ├── CanvasHeader.tsx         # Header OBI fisso (decorativo)
│   │   │   │   │   ├── CanvasFooter.tsx         # Footer OBI fisso (decorativo)
│   │   │   │   │   ├── CanvasDropZone.tsx       # Content area droppable
│   │   │   │   │   ├── ComponentWrapper.tsx     # Wrapper per ogni componente (selezione, drag handle, azioni)
│   │   │   │   │   ├── ComponentPlaceholder.tsx # Placeholder durante drag
│   │   │   │   │   ├── DropIndicator.tsx        # Linea indicatore posizione drop
│   │   │   │   │   └── ZoomControls.tsx         # Controlli zoom canvas
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useCanvasDnd.ts          # Logica drag & drop del canvas
│   │   │   │   │   ├── useCanvasZoom.ts         # Gestione zoom
│   │   │   │   │   └── useCanvasKeyboard.ts     # Keyboard shortcuts nel canvas
│   │   │   │   ├── store/
│   │   │   │   │   └── canvas.store.ts          # Zustand slice: componenti, selezione, zoom
│   │   │   │   └── types/
│   │   │   │       └── canvas.types.ts
│   │   │   │
│   │   │   ├── library/             # --- LIBRERIA COMPONENTI (pannello sinistro) ---
│   │   │   │   ├── components/
│   │   │   │   │   ├── LibraryPanel.tsx         # Container pannello libreria
│   │   │   │   │   ├── LibrarySearch.tsx        # Ricerca componenti
│   │   │   │   │   ├── LibraryCategory.tsx      # Gruppo categoria (accordion)
│   │   │   │   │   ├── LibraryItem.tsx          # Singolo componente draggabile
│   │   │   │   │   └── LibraryItemPreview.tsx   # Thumbnail/preview del componente
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useLibraryDrag.ts        # Logica drag dalla libreria
│   │   │   │   └── store/
│   │   │   │       └── library.store.ts         # Zustand: filtri, search, categorie aperte
│   │   │   │
│   │   │   ├── config/              # --- PANNELLO CONFIGURAZIONE (pannello destro) ---
│   │   │   │   ├── components/
│   │   │   │   │   ├── ConfigPanel.tsx          # Container pannello config
│   │   │   │   │   ├── ConfigSection.tsx        # Sezione raggruppata (testi, layout, etc.)
│   │   │   │   │   ├── fields/                  # Campi config riutilizzabili
│   │   │   │   │   │   ├── TextField.tsx        # Input testo
│   │   │   │   │   │   ├── TextAreaField.tsx    # Textarea multi-linea
│   │   │   │   │   │   ├── SelectField.tsx      # Dropdown selezione
│   │   │   │   │   │   ├── ImageField.tsx       # Upload/placeholder immagine
│   │   │   │   │   │   ├── NumberField.tsx      # Input numerico con slider
│   │   │   │   │   │   ├── ColorField.tsx       # Color picker (futuro)
│   │   │   │   │   │   ├── DateTimeField.tsx    # Picker data/ora (countdown)
│   │   │   │   │   │   ├── ToggleField.tsx      # Boolean toggle
│   │   │   │   │   │   └── FieldRenderer.tsx    # Dynamic field renderer da schema
│   │   │   │   │   ├── CmsMapping.tsx           # Sezione mapping CMS Magnolia
│   │   │   │   │   └── ComponentActions.tsx     # Azioni: duplica, elimina, sposta
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useComponentConfig.ts
│   │   │   │   └── types/
│   │   │   │       └── config.types.ts
│   │   │   │
│   │   │   ├── templates/           # --- SISTEMA TEMPLATE ---
│   │   │   │   ├── components/
│   │   │   │   │   └── renderers/              # *** RENDERING DEI COMPONENTI OBI ***
│   │   │   │   │       ├── HeroSliderRenderer.tsx
│   │   │   │   │       ├── TeaserImageTextRenderer.tsx
│   │   │   │   │       ├── TeaserImageRenderer.tsx
│   │   │   │   │       ├── SliderMultiRenderer.tsx
│   │   │   │   │       ├── TagCloudRenderer.tsx
│   │   │   │   │       ├── GridPromoRenderer.tsx
│   │   │   │   │       ├── CategoryGridRenderer.tsx
│   │   │   │   │       ├── ServiceCardsRenderer.tsx
│   │   │   │   │       ├── EditorialCardsRenderer.tsx
│   │   │   │   │       ├── StoreFinderRenderer.tsx
│   │   │   │   │       ├── BannerCtaRenderer.tsx
│   │   │   │   │       ├── SectionDividerRenderer.tsx
│   │   │   │   │       ├── CustomTemplateRenderer.tsx  # Renderer generico per template custom
│   │   │   │   │       └── index.ts                    # Registry export
│   │   │   │   ├── definitions/                # Definizioni JSON dei template built-in
│   │   │   │   │   ├── hero-slider.template.ts
│   │   │   │   │   ├── teaser-image-text.template.ts
│   │   │   │   │   ├── ... (uno per template)
│   │   │   │   │   └── index.ts                # Registry delle definizioni
│   │   │   │   ├── registry/
│   │   │   │   │   └── template.registry.ts    # *** TEMPLATE REGISTRY (estensibile) ***
│   │   │   │   └── types/
│   │   │   │       └── template.types.ts
│   │   │   │
│   │   │   ├── template-editor/     # --- EDITOR TEMPLATE CUSTOM ---
│   │   │   │   ├── components/
│   │   │   │   │   ├── TemplateEditorDialog.tsx  # Modal editor template
│   │   │   │   │   ├── TemplateCanvas.tsx        # Canvas editing del template
│   │   │   │   │   ├── ZoneToolbox.tsx           # Toolbox zone (img, testo, CTA, etc.)
│   │   │   │   │   ├── ZoneElement.tsx           # Singola zona draggabile/ridimensionabile
│   │   │   │   │   ├── GridOverlay.tsx           # Overlay griglia di riferimento
│   │   │   │   │   └── TemplatePreview.tsx       # Preview live del template
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useTemplateEditor.ts
│   │   │   │   └── store/
│   │   │   │       └── template-editor.store.ts
│   │   │   │
│   │   │   ├── project/             # --- GESTIONE PROGETTI ---
│   │   │   │   ├── components/
│   │   │   │   │   ├── ProjectSelector.tsx      # Dropdown/dialog selezione progetto
│   │   │   │   │   ├── ProjectCreateDialog.tsx  # Dialog creazione nuovo progetto
│   │   │   │   │   ├── ProjectSettings.tsx      # Impostazioni progetto
│   │   │   │   │   └── WelcomeScreen.tsx        # Schermata iniziale (nessun progetto aperto)
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useProject.ts
│   │   │   │   └── store/
│   │   │   │       └── project.store.ts         # Zustand: progetto corrente, lista progetti
│   │   │   │
│   │   │   ├── versioning/          # --- VERSIONING & CONFRONTO ---
│   │   │   │   ├── components/
│   │   │   │   │   ├── VersionList.tsx          # Lista versioni del progetto
│   │   │   │   │   ├── VersionItem.tsx          # Riga singola versione
│   │   │   │   │   ├── VersionCreateDialog.tsx  # Dialog nuova versione
│   │   │   │   │   ├── CompareView.tsx          # Vista confronto side-by-side
│   │   │   │   │   ├── DiffHighlight.tsx        # Evidenziazione differenze
│   │   │   │   │   └── SyncScroll.tsx           # Componente scroll sincronizzato
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useVersioning.ts
│   │   │   │   │   └── useDiff.ts               # Calcolo differenze tra versioni
│   │   │   │   └── store/
│   │   │   │       └── versioning.store.ts
│   │   │   │
│   │   │   ├── workflow/            # --- WORKFLOW APPROVAZIONE ---
│   │   │   │   ├── components/
│   │   │   │   │   ├── WorkflowBadge.tsx        # Badge stato (Bozza, In Review, etc.)
│   │   │   │   │   ├── WorkflowTransition.tsx   # Dialog transizione stato
│   │   │   │   │   └── WorkflowHistory.tsx      # Storico transizioni
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useWorkflow.ts
│   │   │   │   └── store/
│   │   │   │       └── workflow.store.ts
│   │   │   │
│   │   │   ├── annotations/        # --- ANNOTAZIONI ---
│   │   │   │   ├── components/
│   │   │   │   │   ├── AnnotationPin.tsx        # Pin sul canvas
│   │   │   │   │   ├── AnnotationPanel.tsx      # Lista annotazioni
│   │   │   │   │   ├── AnnotationForm.tsx       # Form nuova annotazione
│   │   │   │   │   └── AnnotationThread.tsx     # Thread di commenti su una annotazione
│   │   │   │   └── store/
│   │   │   │       └── annotations.store.ts
│   │   │   │
│   │   │   └── export/              # --- EXPORT ---
│   │   │       ├── components/
│   │   │       │   ├── ExportDialog.tsx         # Dialog opzioni export
│   │   │       │   └── ExportProgress.tsx       # Progress bar export
│   │   │       └── hooks/
│   │   │           └── useExport.ts
│   │   │
│   │   ├── hooks/                   # ═══ SHARED HOOKS ═══
│   │   │   ├── useKeyboardShortcuts.ts
│   │   │   ├── useUndoRedo.ts
│   │   │   ├── useAutoSave.ts
│   │   │   └── useResponsivePreview.ts
│   │   │
│   │   ├── services/                # ═══ RENDERER SERVICES ═══
│   │   │   ├── api.service.ts       # Wrapper tipizzato per window.api
│   │   │   └── image.service.ts     # Gestione immagini/placeholder nel renderer
│   │   │
│   │   └── lib/                     # ═══ UTILITIES ═══
│   │       ├── utils.ts             # cn() helper, formatters, etc.
│   │       └── constants.ts         # Costanti app (breakpoints, colori, etc.)
│   │
│   └── shared/                      # ═══ CODICE CONDIVISO (main + renderer) ═══
│       ├── types/
│       │   ├── api.ts               # Contratto IPC (ElectronAPI interface)
│       │   ├── project.ts           # Project, WireframeVersion
│       │   ├── template.ts          # TemplateDefinition, ConfigField
│       │   ├── component.ts         # WireframeComponent
│       │   ├── workflow.ts          # WorkflowStatus, StatusTransition
│       │   ├── annotation.ts        # Annotation
│       │   ├── asset.ts             # AssetReference
│       │   └── index.ts             # Barrel export
│       │
│       ├── constants/
│       │   ├── ipc-channels.ts      # Nomi canali IPC (type-safe)
│       │   ├── workflow-states.ts   # Definizioni stati workflow
│       │   └── viewport.ts          # Breakpoint definitions
│       │
│       └── utils/
│           ├── id.ts                # generateId() wrapper
│           ├── date.ts              # Formatting date
│           └── validation.ts        # Schema validation helpers
│
├── tests/                           # ═══ TEST ═══
│   ├── unit/
│   │   ├── main/
│   │   ├── renderer/
│   │   └── shared/
│   ├── integration/
│   └── e2e/
│
└── dist/                            # ═══ BUILD OUTPUT ═══
    ├── main/
    ├── preload/
    └── renderer/
```

---

## 5. Layer Architecture

### Dependency Flow (Unidirectional)

```
┌─────────────────────────────────────────────────┐
│                     APP LAYER                    │
│  App.tsx, routing, layout orchestration          │
│  Importa da: features, components, hooks         │
└───────────────────────┬─────────────────────────┘
                        │ importa
┌───────────────────────▼─────────────────────────┐
│                  FEATURE LAYER                   │
│  canvas/, library/, config/, project/, etc.      │
│  Importa da: shared components, shared hooks,    │
│              shared types, services              │
│  NON importa da: altri feature modules           │
└───────────────────────┬─────────────────────────┘
                        │ importa
┌───────────────────────▼─────────────────────────┐
│                  SHARED LAYER                    │
│  components/ui, hooks/, services/, lib/          │
│  Importa da: shared/types, shared/constants      │
│  NON importa da: feature modules                 │
└───────────────────────┬─────────────────────────┘
                        │ importa
┌───────────────────────▼─────────────────────────┐
│                  TYPES LAYER                     │
│  shared/types/, shared/constants/                │
│  Nessuna dipendenza interna                      │
│  Condiviso tra main e renderer                   │
└─────────────────────────────────────────────────┘
```

**Regola critica**: Le feature NON importano mai da altre feature. La comunicazione tra feature avviene tramite Zustand stores (reactive) o event bus (imperative).

### Comunicazione Cross-Feature

```typescript
// SBAGLIATO: import diretto tra feature
import { useVersioning } from '../versioning/hooks/useVersioning'; // nel canvas

// CORRETTO: comunicazione via store condiviso
// canvas legge lo stato dal project store, versioning scrive nel project store
const currentVersion = useProjectStore(s => s.currentVersion);
```

Se due feature devono coordinarsi, le opzioni (in ordine di preferenza) sono:
1. **Store condiviso**: entrambe leggono/scrivono nello stesso Zustand store
2. **Event Bus**: una feature emette un evento, l'altra lo ascolta
3. **Lift up**: la logica condivisa si sposta nel layer shared

---

## 6. State Management

### Store Architecture (Zustand Slices)

```
┌─────────────────────────────────────────────────────┐
│                    ROOT STORE                        │
│  (composto da slices indipendenti)                  │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ ProjectSlice │  │ CanvasSlice  │  │ UISlice   │ │
│  │              │  │              │  │           │ │
│  │ currentProj  │  │ components[] │  │ viewport  │ │
│  │ versions[]   │  │ selectedId   │  │ panels    │ │
│  │ isDirty      │  │ zoom         │  │ modals    │ │
│  │ lastSaved    │  │ dragState    │  │ theme     │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │VersionSlice  │  │WorkflowSlice │  │HistorySlc │ │
│  │              │  │              │  │           │ │
│  │ currentVer   │  │ status       │  │ past[]    │ │
│  │ compareVer   │  │ transitions  │  │ future[]  │ │
│  │ isComparing  │  │ annotations  │  │ canUndo   │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
```

### Store Implementation Pattern

```typescript
// src/renderer/features/canvas/store/canvas.store.ts

import { StateCreator } from 'zustand';
import { WireframeComponent } from '@shared/types';

export interface CanvasSlice {
  // State
  components: WireframeComponent[];
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  zoom: number;
  isDragging: boolean;

  // Actions
  addComponent: (component: WireframeComponent, atIndex?: number) => void;
  removeComponent: (id: string) => void;
  moveComponent: (id: string, toIndex: number) => void;
  updateComponentConfig: (id: string, config: Partial<Record<string, unknown>>) => void;
  duplicateComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  setComponents: (components: WireframeComponent[]) => void;
}

export const createCanvasSlice: StateCreator<CanvasSlice> = (set, get) => ({
  components: [],
  selectedComponentId: null,
  hoveredComponentId: null,
  zoom: 1,
  isDragging: false,

  addComponent: (component, atIndex) =>
    set((state) => {
      const newComponents = [...state.components];
      const index = atIndex ?? newComponents.length;
      newComponents.splice(index, 0, component);
      // Ricalcola ordini
      return {
        components: newComponents.map((c, i) => ({ ...c, order: i })),
      };
    }),

  removeComponent: (id) =>
    set((state) => ({
      components: state.components
        .filter((c) => c.id !== id)
        .map((c, i) => ({ ...c, order: i })),
      selectedComponentId:
        state.selectedComponentId === id ? null : state.selectedComponentId,
    })),

  moveComponent: (id, toIndex) =>
    set((state) => {
      const components = [...state.components];
      const fromIndex = components.findIndex((c) => c.id === id);
      if (fromIndex === -1) return state;
      const [moved] = components.splice(fromIndex, 1);
      components.splice(toIndex, 0, moved);
      return {
        components: components.map((c, i) => ({ ...c, order: i })),
      };
    }),

  updateComponentConfig: (id, config) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, config: { ...c.config, ...config } } : c
      ),
    })),

  duplicateComponent: (id) => {
    const state = get();
    const source = state.components.find((c) => c.id === id);
    if (!source) return;
    const duplicate: WireframeComponent = {
      ...structuredClone(source),
      id: crypto.randomUUID(),
      order: source.order + 1,
    };
    state.addComponent(duplicate, source.order + 1);
  },

  selectComponent: (id) => set({ selectedComponentId: id }),
  setZoom: (zoom) => set({ zoom: Math.max(0.25, Math.min(2, zoom)) }),
  setComponents: (components) => set({ components }),
});
```

### Middleware Stack

```typescript
// src/renderer/store/index.ts

import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createCanvasSlice, CanvasSlice } from '../features/canvas/store/canvas.store';
import { createProjectSlice, ProjectSlice } from '../features/project/store/project.store';
import { createHistorySlice, HistorySlice } from './history.store';

// Tipo aggregato dello store
export type AppStore = CanvasSlice & ProjectSlice & HistorySlice;

export const useAppStore = create<AppStore>()(
  devtools(                          // Redux DevTools per debug
    subscribeWithSelector(           // Subscribe granulare con selectors
      immer(                         // Aggiornamenti immutabili con sintassi mutativa
        (...args) => ({
          ...createCanvasSlice(...args),
          ...createProjectSlice(...args),
          ...createHistorySlice(...args),
        })
      )
    ),
    { name: 'OBI Wireframe Store' }
  )
);

// Selectors tipizzati per performance
export const selectComponents = (s: AppStore) => s.components;
export const selectSelectedId = (s: AppStore) => s.selectedComponentId;
export const selectZoom = (s: AppStore) => s.zoom;
```

---

## 7. Data Models

### Complete Type Definitions

```typescript
// ═══════════════════════════════════════════
// src/shared/types/template.ts
// ═══════════════════════════════════════════

/** Tipo di campo configurabile in un template */
export type ConfigFieldType =
  | 'text'           // Input testo singola riga
  | 'textarea'       // Testo multi-riga
  | 'number'         // Numerico
  | 'select'         // Dropdown
  | 'toggle'         // Boolean
  | 'image'          // Upload/placeholder immagine
  | 'datetime'       // Data/ora (per countdown)
  | 'color'          // Color picker
  | 'slider'         // Range slider
  | 'group';         // Gruppo di sotto-campi (per nested config)

/** Definizione di un campo configurabile */
export interface ConfigField {
  key: string;                       // Chiave nel config object
  type: ConfigFieldType;
  label: string;                     // Label UI (italiano)
  description?: string;              // Help text
  placeholder?: string;
  required?: boolean;
  defaultValue?: unknown;

  // Validazione
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;                // Regex
  };

  // Per type: 'select'
  options?: Array<{
    value: string;
    label: string;
  }>;

  // Per type: 'group' (nested fields)
  children?: ConfigField[];

  // Per type: 'image'
  imageConstraints?: {
    aspectRatio?: string;            // es. "16:9", "1:1"
    minWidth?: number;
    minHeight?: number;
    maxFileSizeMB?: number;
  };

  // Visibilita condizionale
  showWhen?: {
    field: string;                   // Chiave di un altro campo
    equals: unknown;                 // Valore che deve avere
  };

  // Mapping CMS
  cmsFieldName?: string;             // Nome del campo corrispondente in Magnolia
}

/** Categoria di template */
export type TemplateCategory =
  | 'hero'
  | 'promo'
  | 'prodotti'
  | 'servizi'
  | 'editoriale'
  | 'navigazione'
  | 'cta'
  | 'utility'
  | 'custom';

/** Definizione completa di un template */
export interface TemplateDefinition {
  id: string;                        // Unique ID (slug o UUID)
  name: string;                      // Nome visibile (italiano)
  description?: string;              // Descrizione breve
  category: TemplateCategory;
  icon: string;                      // Nome icona Lucide
  thumbnail?: string;                // Path thumbnail preview

  // Schema configurazione
  configSchema: ConfigField[];
  defaultConfig: Record<string, unknown>;

  // Varianti
  variants?: Array<{
    id: string;
    name: string;
    description?: string;
    defaultConfig?: Record<string, unknown>;  // Override config per variante
  }>;

  // Layout interno
  layout: {
    desktop: {
      minHeight: number;             // Altezza minima in px
      maxHeight?: number;
      columns?: number;              // Numero colonne griglia interna
      gap?: number;                  // Gap tra colonne in px
      padding?: string;              // CSS padding
    };
    mobile: {
      minHeight: number;
      stackDirection?: 'vertical' | 'horizontal';
      padding?: string;
    };
  };

  // Mapping CMS Magnolia
  cms?: {
    componentId: string;             // ID componente in Magnolia
    areaName?: string;               // Area Magnolia di appartenenza
    notes?: string;                  // Note per il content manager
    documentationUrl?: string;       // Link a documentazione CMS (futuro)
  };

  // Metadata
  isBuiltIn: boolean;                // true = preinstallato, false = custom utente
  version: number;                   // Schema version per migrazioni
  createdAt?: string;
  updatedAt?: string;

  // Per template custom: definizione zone
  customZones?: TemplateZone[];      // Solo per template creati dall'utente
}

/** Zona all'interno di un template custom */
export interface TemplateZone {
  id: string;
  type: 'image' | 'text' | 'heading' | 'cta' | 'icon' | 'countdown' | 'spacer';
  label: string;

  // Posizione e dimensioni (relative alla griglia del template)
  position: {
    column: number;                  // Colonna di inizio (1-based)
    columnSpan: number;              // Quante colonne occupa
    row: number;
    rowSpan: number;
  };

  // Stile della zona
  style?: {
    alignment?: 'left' | 'center' | 'right';
    verticalAlignment?: 'top' | 'middle' | 'bottom';
    backgroundColor?: string;
    textColor?: string;
    fontSize?: 'sm' | 'md' | 'lg' | 'xl';
    fontWeight?: 'normal' | 'bold';
    padding?: string;
    borderRadius?: string;
  };
}

// ═══════════════════════════════════════════
// src/shared/types/component.ts
// ═══════════════════════════════════════════

/** Istanza di un componente nel wireframe */
export interface WireframeComponent {
  id: string;                        // UUID generato
  templateId: string;                // Riferimento alla TemplateDefinition
  variant?: string;                  // ID variante selezionata
  config: Record<string, unknown>;   // Configurazione valorizzata dall'utente
  order: number;                     // Posizione sequenziale (0-based)

  // Metadata istanza
  label?: string;                    // Label custom assegnata dall'utente
  isVisible: boolean;                // Visibilita nel wireframe (per nascondere temporaneamente)
  isLocked: boolean;                 // Bloccato (non spostabile/eliminabile)

  // Annotazioni collegate
  annotationIds: string[];
}

// ═══════════════════════════════════════════
// src/shared/types/project.ts
// ═══════════════════════════════════════════

/** Sintesi progetto (per lista progetti, senza dati pesanti) */
export interface ProjectSummary {
  id: string;
  name: string;
  description?: string;
  versionsCount: number;
  latestVersionName?: string;
  latestVersionStatus?: WorkflowStatus;
  updatedAt: string;
  createdAt: string;
}

/** Progetto completo */
export interface Project {
  id: string;
  name: string;
  description?: string;

  // Versioni (caricate on-demand, non tutte in memoria)
  versions: VersionSummary[];
  currentVersionId?: string;

  // Template custom del progetto
  customTemplates: TemplateDefinition[];

  // Settings progetto
  settings: ProjectSettings;

  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  appVersion: string;                // Versione dell'app che ha creato il progetto
  schemaVersion: number;             // Per migrazioni dati
}

export interface ProjectSettings {
  defaultViewport: 'desktop' | 'mobile';
  autoSaveInterval: number;          // Secondi, 0 = disabilitato
  storagePath?: string;              // Path custom per questo progetto
}

export interface VersionSummary {
  id: string;
  name: string;
  status: WorkflowStatus;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  componentCount: number;
}

// ═══════════════════════════════════════════
// src/shared/types/workflow.ts
// ═══════════════════════════════════════════

export type WorkflowStatus = 'draft' | 'in_review' | 'approved' | 'in_production';

export interface StatusTransition {
  id: string;
  from: WorkflowStatus;
  to: WorkflowStatus;
  note: string;                      // Nota obbligatoria
  author: string;
  timestamp: string;
}

/** Regole di transizione (state machine) */
export const WORKFLOW_TRANSITIONS: Record<WorkflowStatus, WorkflowStatus[]> = {
  draft: ['in_review'],
  in_review: ['draft', 'approved'],
  approved: ['in_review', 'in_production'],
  in_production: ['draft'],          // Permette di riportare a bozza per nuova iterazione
};

// ═══════════════════════════════════════════
// src/shared/types/annotation.ts
// ═══════════════════════════════════════════

export interface Annotation {
  id: string;
  componentId: string;               // Componente a cui e associata
  text: string;
  author: string;
  status: 'open' | 'resolved';
  position?: {                       // Posizione pin (relativa al componente)
    xPercent: number;                // 0-100
    yPercent: number;                // 0-100
  };
  replies: AnnotationReply[];
  createdAt: string;
  updatedAt: string;
}

export interface AnnotationReply {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

// ═══════════════════════════════════════════
// src/shared/types/asset.ts
// ═══════════════════════════════════════════

export interface AssetReference {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  width?: number;
  height?: number;
  sizeBytes: number;
}

export type AssetMap = Record<string, AssetReference>;

// ═══════════════════════════════════════════
// src/shared/types/wireframe-version.ts
// ═══════════════════════════════════════════

/** Versione completa di un wireframe (caricata on-demand) */
export interface WireframeVersion {
  id: string;
  projectId: string;
  name: string;
  description?: string;

  // Contenuto
  components: WireframeComponent[];

  // Workflow
  status: WorkflowStatus;
  statusHistory: StatusTransition[];

  // Annotazioni
  annotations: Annotation[];

  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  basedOnVersionId?: string;         // Da quale versione e stata duplicata
}
```

### Data Migration Strategy

```typescript
// src/main/services/migration.service.ts

/**
 * Ogni volta che cambia la struttura dati (schemaVersion),
 * aggiungiamo una funzione di migrazione.
 * Questo garantisce che progetti creati con versioni precedenti
 * dell'app continuino a funzionare.
 */
export interface Migration {
  fromVersion: number;
  toVersion: number;
  migrate: (data: unknown) => unknown;
}

export const migrations: Migration[] = [
  // Esempio: v1 → v2: aggiunta campo `isVisible` ai componenti
  {
    fromVersion: 1,
    toVersion: 2,
    migrate: (project: any) => ({
      ...project,
      schemaVersion: 2,
      versions: project.versions.map((v: any) => ({
        ...v,
        components: v.components.map((c: any) => ({
          ...c,
          isVisible: c.isVisible ?? true,
          isLocked: c.isLocked ?? false,
        })),
      })),
    }),
  },
];

export function migrateProject(project: unknown, targetVersion: number): unknown {
  let current = project as any;
  let currentVersion = current.schemaVersion ?? 1;

  while (currentVersion < targetVersion) {
    const migration = migrations.find((m) => m.fromVersion === currentVersion);
    if (!migration) throw new Error(`No migration from v${currentVersion}`);
    current = migration.migrate(current);
    currentVersion = migration.toVersion;
  }

  return current;
}
```

---

## 8. Template System

### Template Registry (estensibile)

```typescript
// src/renderer/features/templates/registry/template.registry.ts

import { TemplateDefinition } from '@shared/types';
import { ComponentType } from 'react';

/** Props ricevute da ogni renderer */
export interface TemplateRendererProps {
  component: WireframeComponent;
  template: TemplateDefinition;
  viewport: 'desktop' | 'mobile';
  isSelected: boolean;
  isPreview?: boolean;               // true quando usato come thumbnail nella libreria
}

interface RegistryEntry {
  definition: TemplateDefinition;
  renderer: ComponentType<TemplateRendererProps>;
}

class TemplateRegistry {
  private entries = new Map<string, RegistryEntry>();
  private listeners = new Set<() => void>();

  /** Registra un template con il suo renderer */
  register(definition: TemplateDefinition, renderer: ComponentType<TemplateRendererProps>): void {
    this.entries.set(definition.id, { definition, renderer });
    this.notifyListeners();
  }

  /** Rimuovi un template (solo custom) */
  unregister(templateId: string): boolean {
    const entry = this.entries.get(templateId);
    if (entry?.definition.isBuiltIn) return false; // Non rimuovere built-in
    const deleted = this.entries.delete(templateId);
    if (deleted) this.notifyListeners();
    return deleted;
  }

  /** Ottieni definizione per ID */
  getDefinition(templateId: string): TemplateDefinition | undefined {
    return this.entries.get(templateId)?.definition;
  }

  /** Ottieni renderer per ID */
  getRenderer(templateId: string): ComponentType<TemplateRendererProps> | undefined {
    return this.entries.get(templateId)?.renderer;
  }

  /** Lista tutte le definizioni, opzionalmente filtrate */
  listDefinitions(filter?: { category?: string; isBuiltIn?: boolean }): TemplateDefinition[] {
    let results = Array.from(this.entries.values()).map((e) => e.definition);
    if (filter?.category) results = results.filter((d) => d.category === filter.category);
    if (filter?.isBuiltIn !== undefined) results = results.filter((d) => d.isBuiltIn === filter.isBuiltIn);
    return results;
  }

  /** Subscribe a cambiamenti del registry (per React) */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((l) => l());
  }
}

// Singleton globale
export const templateRegistry = new TemplateRegistry();
```

### Esempio Template Built-In

```typescript
// src/renderer/features/templates/definitions/hero-slider.template.ts

import { TemplateDefinition } from '@shared/types';

export const heroSliderTemplate: TemplateDefinition = {
  id: 'hero-slider',
  name: 'Hero Slider (Stage)',
  description: 'Carousel full-width con multiple slide, CTA e autoplay',
  category: 'hero',
  icon: 'Image',
  isBuiltIn: true,
  version: 1,

  configSchema: [
    {
      key: 'slides',
      type: 'group',
      label: 'Slide',
      children: [
        { key: 'headline', type: 'text', label: 'Titolo', required: true, cmsFieldName: 'headline' },
        { key: 'subheadline', type: 'text', label: 'Sottotitolo', cmsFieldName: 'subheadline' },
        { key: 'image', type: 'image', label: 'Immagine slide', imageConstraints: { aspectRatio: '21:9' }, cmsFieldName: 'image' },
        { key: 'ctaLabel', type: 'text', label: 'Testo CTA', cmsFieldName: 'ctaLabel' },
        { key: 'ctaUrl', type: 'text', label: 'URL CTA', cmsFieldName: 'ctaUrl' },
      ],
    },
    { key: 'slideCount', type: 'number', label: 'Numero slide', defaultValue: 3, validation: { min: 1, max: 8 } },
    { key: 'autoplay', type: 'toggle', label: 'Autoplay', defaultValue: true },
    { key: 'autoplayInterval', type: 'number', label: 'Intervallo (sec)', defaultValue: 5, showWhen: { field: 'autoplay', equals: true } },
  ],

  defaultConfig: {
    slideCount: 3,
    autoplay: true,
    autoplayInterval: 5,
    slides: [
      { headline: 'Slide 1', subheadline: '', image: null, ctaLabel: 'Scopri di piu', ctaUrl: '' },
      { headline: 'Slide 2', subheadline: '', image: null, ctaLabel: 'Scopri di piu', ctaUrl: '' },
      { headline: 'Slide 3', subheadline: '', image: null, ctaLabel: 'Scopri di piu', ctaUrl: '' },
    ],
  },

  variants: [
    { id: 'standard', name: 'Standard', description: 'Hero classico con testo sovrapposto' },
    { id: 'split', name: 'Split', description: 'Immagine a destra, testo a sinistra' },
    { id: 'video', name: 'Video Background', description: 'Placeholder video di sfondo' },
  ],

  layout: {
    desktop: { minHeight: 400, maxHeight: 500 },
    mobile: { minHeight: 200, stackDirection: 'vertical' },
  },

  cms: {
    componentId: 'obi:components/stage',
    areaName: 'stage',
    notes: 'In Magnolia questo componente corrisponde allo Stage. Le slide sono configurate come sotto-nodi nella area "slides".',
  },
};
```

### Template Resolution Flow

```
User drag "Hero Slider" dalla libreria
        │
        ▼
templateRegistry.getDefinition('hero-slider')
        │
        ▼
Crea WireframeComponent con:
  - id: crypto.randomUUID()
  - templateId: 'hero-slider'
  - config: structuredClone(definition.defaultConfig)
  - order: calcolato dalla posizione drop
        │
        ▼
Canvas renderizza tramite:
  templateRegistry.getRenderer('hero-slider')
        │
        ▼
<HeroSliderRenderer component={...} template={...} viewport="desktop" />
```

---

## 9. Drag & Drop Architecture

### dnd-kit Integration

```
┌──────────────────────────────────────────────────────────┐
│  <DndContext>                                             │
│    sensors={[PointerSensor, KeyboardSensor]}             │
│    collisionDetection={closestCenter}                     │
│    onDragStart / onDragOver / onDragEnd                  │
│                                                           │
│  ┌────────────────┐     ┌──────────────────────────────┐ │
│  │ LIBRARY PANEL  │     │ CANVAS                        │ │
│  │                │     │                                │ │
│  │ <Draggable     │     │ <SortableContext               │ │
│  │   items={       │     │   items={components}           │ │
│  │   templates}   │     │   strategy={verticalList}>     │ │
│  │                │     │                                │ │
│  │  LibraryItem   │ ──► │  <SortableItem key={c.id}>    │ │
│  │  LibraryItem   │     │    <ComponentWrapper>          │ │
│  │  LibraryItem   │     │      <TemplateRenderer />      │ │
│  │                │     │    </ComponentWrapper>          │ │
│  │                │     │  </SortableItem>                │ │
│  │                │     │  ...                            │ │
│  └────────────────┘     │                                │ │
│                          │ </SortableContext>              │ │
│                          └──────────────────────────────┘ │
│                                                           │
│  <DragOverlay>                                            │
│    <ComponentPlaceholder template={activeTemplate} />    │
│  </DragOverlay>                                          │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### Drag Types

```typescript
// src/renderer/features/canvas/types/canvas.types.ts

/** Identifica la sorgente del drag */
export type DragSource =
  | { type: 'library'; templateId: string }      // Nuovo componente dalla libreria
  | { type: 'canvas'; componentId: string };     // Riordinamento nel canvas

/** Dati attaccati al drag event */
export interface DragData {
  source: DragSource;
}
```

### Drag Flow

```
1. DRAG START (dalla libreria)
   → Identifica template
   → Mostra DragOverlay con preview del componente
   → Aggiorna isDragging = true nello store

2. DRAG OVER (sopra il canvas)
   → Calcola posizione di inserimento
   → Mostra DropIndicator nella posizione corretta
   → Smooth animation degli altri componenti

3. DRAG END
   SE source = 'library':
     → Crea nuovo WireframeComponent
     → Inserisci alla posizione calcolata
     → Seleziona il nuovo componente
     → Registra nell'undo history
   SE source = 'canvas':
     → Sposta componente alla nuova posizione
     → Aggiorna ordini
     → Registra nell'undo history

4. DRAG CANCEL
   → Ripristina stato precedente
   → Nascondi DragOverlay
```

---

## 10. Storage Layer

### Astrazione Storage (future-proof)

```typescript
// src/main/services/storage.service.ts

/**
 * Interfaccia astratta per lo storage.
 * OGGI: implementata con filesystem locale.
 * DOMANI: puo essere implementata con cloud storage (S3, Azure Blob, etc.)
 *         senza toccare il resto dell'app.
 */
export interface IStorageService {
  // Projects
  listProjects(): Promise<ProjectSummary[]>;
  loadProject(projectId: string): Promise<Project>;
  saveProject(project: Project): Promise<void>;
  deleteProject(projectId: string): Promise<void>;

  // Versions
  loadVersion(projectId: string, versionId: string): Promise<WireframeVersion>;
  saveVersion(projectId: string, version: WireframeVersion): Promise<void>;
  deleteVersion(projectId: string, versionId: string): Promise<void>;

  // Assets
  saveAsset(projectId: string, versionId: string, file: Buffer, metadata: Partial<AssetReference>): Promise<AssetReference>;
  loadAsset(projectId: string, versionId: string, assetId: string): Promise<Buffer>;
  deleteAsset(projectId: string, versionId: string, assetId: string): Promise<void>;

  // Templates
  listCustomTemplates(): Promise<TemplateDefinition[]>;
  saveCustomTemplate(template: TemplateDefinition): Promise<void>;
  deleteCustomTemplate(templateId: string): Promise<void>;

  // Import/Export
  exportProjectToZip(projectId: string): Promise<Buffer>;
  importProjectFromZip(zipBuffer: Buffer): Promise<Project>;

  // Config
  getStorageBasePath(): string;
  setStorageBasePath(path: string): void;
}
```

### Filesystem Implementation

```typescript
// src/main/services/filesystem-storage.service.ts

export class FilesystemStorageService implements IStorageService {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  /**
   * Struttura su disco:
   *
   * {basePath}/
   *   config.json                    # Config app (path, preferenze)
   *   custom-templates/              # Template custom globali
   *     {templateId}.json
   *   projects/
   *     {projectId}/
   *       project.json               # Metadati progetto + lista versioni
   *       templates/                  # Template custom del progetto
   *         {templateId}.json
   *       versions/
   *         {versionId}/
   *           wireframe.json          # Componenti + config
   *           metadata.json           # Workflow, annotazioni, storico
   *           assets/
   *             {assetId}.{ext}       # Immagini caricate
   */

  private getProjectPath(projectId: string): string {
    return path.join(this.basePath, 'projects', projectId);
  }

  private getVersionPath(projectId: string, versionId: string): string {
    return path.join(this.getProjectPath(projectId), 'versions', versionId);
  }

  // ... implementazione metodi (lettura/scrittura JSON + file)
}
```

### File Locking (accesso concorrente)

```typescript
// src/main/services/lock.service.ts

/**
 * Lock basato su file per prevenire modifiche concorrenti
 * quando piu utenti accedono allo stesso progetto dalla rete.
 */
export class LockService {
  /**
   * Tenta di acquisire il lock su un progetto.
   * Crea un file .lock con username e timestamp.
   * Se il lock esiste gia, verifica se e scaduto (> 5 minuti senza heartbeat).
   */
  async acquireLock(projectPath: string, username: string): Promise<LockResult>;

  /** Rilascia il lock */
  async releaseLock(projectPath: string): Promise<void>;

  /** Aggiorna il timestamp del lock (heartbeat ogni 30 secondi) */
  async renewLock(projectPath: string): Promise<void>;

  /** Verifica chi detiene il lock */
  async checkLock(projectPath: string): Promise<LockInfo | null>;
}

interface LockInfo {
  username: string;
  acquiredAt: string;
  lastHeartbeat: string;
}

type LockResult =
  | { acquired: true }
  | { acquired: false; heldBy: LockInfo };
```

---

## 11. IPC Communication Protocol

### Channel Naming Convention

```typescript
// src/shared/constants/ipc-channels.ts

/**
 * Canali IPC tipizzati.
 * Convenzione: `{dominio}:{azione}`
 */
export const IPC_CHANNELS = {
  // Project
  PROJECT_LIST: 'project:list',
  PROJECT_LOAD: 'project:load',
  PROJECT_SAVE: 'project:save',
  PROJECT_CREATE: 'project:create',
  PROJECT_DELETE: 'project:delete',
  PROJECT_DUPLICATE: 'project:duplicate',

  // Version
  VERSION_CREATE: 'version:create',
  VERSION_SAVE: 'version:save',
  VERSION_DELETE: 'version:delete',
  VERSION_LOAD_ASSETS: 'version:load-assets',

  // Template
  TEMPLATE_LIST_BUILTIN: 'template:list-builtin',
  TEMPLATE_LIST_CUSTOM: 'template:list-custom',
  TEMPLATE_SAVE_CUSTOM: 'template:save-custom',
  TEMPLATE_DELETE_CUSTOM: 'template:delete-custom',
  TEMPLATE_IMPORT: 'template:import',
  TEMPLATE_EXPORT: 'template:export',

  // Asset
  ASSET_IMPORT_IMAGE: 'asset:import-image',
  ASSET_GET_PATH: 'asset:get-path',

  // Export
  EXPORT_PNG: 'export:png',
  EXPORT_PDF: 'export:pdf',
  EXPORT_ZIP: 'export:zip',
  IMPORT_ZIP: 'import:zip',

  // Dialog
  DIALOG_OPEN: 'dialog:open',
  DIALOG_SAVE: 'dialog:save',
  DIALOG_MESSAGE: 'dialog:message',

  // App
  APP_GET_VERSION: 'app:get-version',
  APP_GET_PLATFORM: 'app:get-platform',
  APP_GET_USERNAME: 'app:get-username',
  MENU_ACTION: 'menu:action',

  // Storage
  STORAGE_GET_PATH: 'storage:get-path',
  STORAGE_SET_PATH: 'storage:set-path',
} as const;
```

### IPC Handler Pattern

```typescript
// src/main/ipc/project.ipc.ts

import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '@shared/constants/ipc-channels';
import { IStorageService } from '../services/storage.service';

export function registerProjectHandlers(storage: IStorageService): void {

  ipcMain.handle(IPC_CHANNELS.PROJECT_LIST, async () => {
    return storage.listProjects();
  });

  ipcMain.handle(IPC_CHANNELS.PROJECT_LOAD, async (_, projectId: string) => {
    return storage.loadProject(projectId);
  });

  ipcMain.handle(IPC_CHANNELS.PROJECT_SAVE, async (_, project: Project) => {
    return storage.saveProject(project);
  });

  ipcMain.handle(IPC_CHANNELS.PROJECT_CREATE, async (_, name: string, description?: string) => {
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      versions: [],
      customTemplates: [],
      settings: { defaultViewport: 'desktop', autoSaveInterval: 30 },
      createdAt: new Date().toISOString(),
      createdBy: os.userInfo().username,
      updatedAt: new Date().toISOString(),
      appVersion: app.getVersion(),
      schemaVersion: CURRENT_SCHEMA_VERSION,
    };
    await storage.saveProject(project);
    return project;
  });

  // ... altri handler
}
```

---

## 12. Event Bus & Plugin System

### Event Bus (comunicazione cross-feature)

```typescript
// src/renderer/lib/event-bus.ts

type EventCallback<T = unknown> = (data: T) => void;

class EventBus {
  private listeners = new Map<string, Set<EventCallback>>();

  on<T>(event: string, callback: EventCallback<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback as EventCallback);

    // Return unsubscribe function
    return () => this.listeners.get(event)?.delete(callback as EventCallback);
  }

  emit<T>(event: string, data: T): void {
    this.listeners.get(event)?.forEach((cb) => cb(data));
  }

  off(event: string): void {
    this.listeners.delete(event);
  }
}

export const eventBus = new EventBus();

// Eventi tipizzati
export const EVENTS = {
  COMPONENT_ADDED: 'component:added',
  COMPONENT_REMOVED: 'component:removed',
  COMPONENT_MOVED: 'component:moved',
  COMPONENT_SELECTED: 'component:selected',
  COMPONENT_CONFIG_CHANGED: 'component:config-changed',

  VERSION_SAVED: 'version:saved',
  VERSION_STATUS_CHANGED: 'version:status-changed',

  PROJECT_LOADED: 'project:loaded',
  PROJECT_SAVED: 'project:saved',

  VIEWPORT_CHANGED: 'viewport:changed',
  EXPORT_STARTED: 'export:started',
  EXPORT_COMPLETED: 'export:completed',
} as const;
```

### Future Plugin Architecture (preparazione)

```typescript
// src/shared/types/plugin.ts (preparazione per v2+)

/**
 * Interfaccia per plugin futuri.
 * Un plugin puo:
 * - Registrare nuovi template
 * - Aggiungere campi config custom
 * - Aggiungere voci di menu
 * - Registrare export format custom
 * - Ascoltare eventi dell'app
 */
export interface PluginDefinition {
  id: string;
  name: string;
  version: string;
  description?: string;

  // Hooks del ciclo di vita
  onActivate?: (context: PluginContext) => void | Promise<void>;
  onDeactivate?: () => void | Promise<void>;
}

export interface PluginContext {
  templateRegistry: typeof templateRegistry;
  eventBus: typeof eventBus;
  storage: IStorageService;

  // API per registrare estensioni
  registerExporter: (format: string, exporter: ExporterPlugin) => void;
  registerConfigField: (type: string, renderer: ComponentType) => void;
  registerMenuItem: (menu: string, item: MenuItemDefinition) => void;
}
```

---

## 13. Export Pipeline

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│ User clicks │────►│ ExportDialog │────►│ Export Engine  │
│ "Esporta"   │     │ (format,     │     │               │
│             │     │  options)     │     │ PNG: html-to- │
│             │     │              │     │   image       │
│             │     │              │     │               │
│             │     │              │     │ PDF: jsPDF +  │
│             │     │              │     │   metadata    │
│             │     │              │     │               │
│             │     │              │     │ ZIP: archiver │
└─────────────┘     └──────────────┘     └───────┬───────┘
                                                  │
                                          ┌───────▼───────┐
                                          │ Save Dialog   │
                                          │ (main process)│
                                          │               │
                                          │ fs.writeFile  │
                                          └───────────────┘
```

### Export Strategy Pattern

```typescript
// src/main/services/export.service.ts

export interface ExportStrategy {
  format: string;
  export(data: ExportInput): Promise<Buffer>;
}

export interface ExportInput {
  html: string;                      // HTML renderizzato del canvas
  width: number;
  height: number;
  metadata: ExportMetadata;
}

export interface ExportMetadata {
  projectName: string;
  versionName: string;
  status: WorkflowStatus;
  author: string;
  date: string;
  annotations?: Annotation[];
}

// Le strategy sono registrabili → estensibile per nuovi formati (HTML, Figma, etc.)
class ExportService {
  private strategies = new Map<string, ExportStrategy>();

  registerStrategy(strategy: ExportStrategy): void {
    this.strategies.set(strategy.format, strategy);
  }

  async export(format: string, input: ExportInput): Promise<Buffer> {
    const strategy = this.strategies.get(format);
    if (!strategy) throw new Error(`Export format "${format}" not registered`);
    return strategy.export(input);
  }
}
```

---

## 14. Responsive Rendering Engine

### Viewport System

```typescript
// src/shared/constants/viewport.ts

export const VIEWPORTS = {
  desktop: {
    width: 1440,
    label: 'Desktop',
    icon: 'Monitor',
  },
  mobile: {
    width: 375,
    label: 'Mobile',
    icon: 'Smartphone',
  },
  // Futuro: tablet
  // tablet: { width: 768, label: 'Tablet', icon: 'Tablet' },
} as const;

export type ViewportKey = keyof typeof VIEWPORTS;
```

### Renderer Responsive Pattern

Ogni `TemplateRenderer` riceve la prop `viewport` e renderizza di conseguenza:

```typescript
// Pattern per ogni renderer
const HeroSliderRenderer: React.FC<TemplateRendererProps> = ({
  component, template, viewport, isSelected
}) => {
  const config = component.config;

  if (viewport === 'mobile') {
    return (
      <div className="w-full" style={{ minHeight: template.layout.mobile.minHeight }}>
        {/* Layout mobile: immagine sopra, testo sotto */}
      </div>
    );
  }

  return (
    <div className="w-full" style={{ minHeight: template.layout.desktop.minHeight }}>
      {/* Layout desktop: immagine full-width con overlay */}
    </div>
  );
};
```

---

## 15. Undo/Redo System

### Command Pattern con Zustand

```typescript
// src/renderer/store/history.store.ts

import { StateCreator } from 'zustand';
import { WireframeComponent } from '@shared/types';

interface HistoryEntry {
  components: WireframeComponent[];  // Snapshot completo
  description: string;               // "Aggiunto Hero Slider", "Spostato TeaserImageText"
  timestamp: number;
}

export interface HistorySlice {
  past: HistoryEntry[];
  future: HistoryEntry[];
  canUndo: boolean;
  canRedo: boolean;

  /** Salva lo stato corrente nella history (chiamare PRIMA di ogni modifica) */
  pushHistory: (description: string) => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
}

const MAX_HISTORY_SIZE = 50;

export const createHistorySlice: StateCreator<HistorySlice & { components: WireframeComponent[] }> = (set, get) => ({
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,

  pushHistory: (description) => {
    const { components, past } = get();
    const entry: HistoryEntry = {
      components: structuredClone(components),
      description,
      timestamp: Date.now(),
    };
    const newPast = [...past, entry].slice(-MAX_HISTORY_SIZE);
    set({ past: newPast, future: [], canUndo: true, canRedo: false });
  },

  undo: () => {
    const { past, components } = get();
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);

    set({
      past: newPast,
      future: [{ components: structuredClone(components), description: 'undo', timestamp: Date.now() }, ...get().future],
      components: structuredClone(previous.components),
      canUndo: newPast.length > 0,
      canRedo: true,
    });
  },

  redo: () => {
    const { future, components } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    set({
      past: [...get().past, { components: structuredClone(components), description: 'redo', timestamp: Date.now() }],
      future: newFuture,
      components: structuredClone(next.components),
      canUndo: true,
      canRedo: newFuture.length > 0,
    });
  },

  clearHistory: () => set({ past: [], future: [], canUndo: false, canRedo: false }),
});
```

---

## 16. Build & Distribution

### electron-vite + electron-builder Configuration

```typescript
// electron.vite.config.ts
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared'),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared'),
      },
    },
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer'),
        '@shared': resolve('src/shared'),
      },
    },
    plugins: [react()],
  },
});
```

```json
// package.json (sezione build)
{
  "build": {
    "appId": "com.obi.wireframe-generator",
    "productName": "OBI Wireframe Generator",
    "directories": {
      "output": "release"
    },
    "win": {
      "target": [
        {
          "target": "portable",
          "arch": ["x64"]
        },
        {
          "target": "dir",
          "arch": ["x64"]
        }
      ],
      "icon": "resources/icon.ico",
      "requestedExecutionLevel": "asInvoker"
    },
    "portable": {
      "artifactName": "OBI-Wireframe-Generator-${version}.exe"
    },
    "files": [
      "dist/**/*",
      "resources/**/*"
    ],
    "extraResources": [
      {
        "from": "src/renderer/features/templates/definitions",
        "to": "templates",
        "filter": ["**/*.json"]
      }
    ]
  }
}
```

### Build Scripts

```json
{
  "scripts": {
    "dev": "electron-vite dev",
    "build": "electron-vite build",
    "preview": "electron-vite preview",
    "make:portable": "electron-builder --win portable",
    "make:dir": "electron-builder --win dir",
    "postinstall": "electron-builder install-app-deps",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

---

## 17. Performance Strategy

| Tecnica | Dove | Come |
|---------|------|------|
| **Virtualizzazione lista** | Canvas con 30+ componenti | Usa `@tanstack/virtual` se il canvas supera 20 componenti |
| **React.memo** | Tutti i TemplateRenderer | Memoizza rendering, re-render solo se props cambiano |
| **Zustand selectors** | Ogni componente che legge dallo store | `useAppStore(s => s.components)` NON `useAppStore()` |
| **Lazy loading** | TemplateRenderer | `React.lazy()` per renderer di template poco usati |
| **Debounce** | ConfigPanel input fields | Debounce 300ms su campi testo per evitare re-render continui |
| **structuredClone** | Undo/Redo history | Deep clone efficiente per snapshot, nativo |
| **Image optimization** | Asset caricati | Resize a max 1920px width al caricamento |
| **CSS containment** | ComponentWrapper | `contain: layout style paint` per isolamento rendering |
| **Batch updates** | Operazioni multi-componente | `useAppStore.setState()` batch per update multipli |

---

## 18. Security Model

| Misura | Implementazione |
|--------|-----------------|
| **Context Isolation** | `contextIsolation: true` nella BrowserWindow |
| **Sandbox** | `sandbox: true` nel renderer |
| **No Node in Renderer** | `nodeIntegration: false` |
| **Typed Preload** | Solo API esplicite esposte via `contextBridge` |
| **No remote module** | `enableRemoteModule: false` |
| **CSP** | Content Security Policy che blocca eval, inline scripts |
| **Input sanitization** | Sanitize path e filename nel main process |
| **No shell.openExternal** | Non aprire URL arbitrari (non serve in questa app) |

```typescript
// src/main/index.ts - Creazione finestra sicura
const mainWindow = new BrowserWindow({
  width: 1440,
  height: 900,
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true,
    webSecurity: true,
  },
});
```

---

## 19. Testing Strategy

| Layer | Tool | Cosa Testare |
|-------|------|-------------|
| **Shared Types** | Vitest | Validation, migration, utilities |
| **Main Services** | Vitest | StorageService, ExportService, LockService (con fs mock) |
| **IPC Handlers** | Vitest | Request/response per ogni canale |
| **Zustand Stores** | Vitest + RTL | Azioni store, selectors, middleware |
| **React Components** | Vitest + RTL | Rendering, interazioni utente, accessibilita |
| **Drag & Drop** | Vitest + RTL | Drag start/over/end, riordinamento |
| **E2E** | Playwright | Flow completo: crea progetto → aggiungi componenti → salva → export |

---

## 20. Future Evolution Paths

### Percorso Evolutivo Mappato

```
v1.0 (MVP)                    Architettura Gia Pronta Per:
───────────────────────────────────────────────────────────
Solo homepage              →  IStorageService + TemplateRegistry supportano
                              qualsiasi tipo di pagina (PLP, PDP, Landing)
                              Basta aggiungere "pageType" al Project

Solo OBI Italia            →  Design tokens in obi-theme.css separati
                              Basta creare nuovi theme file per altri brand

Filesystem locale          →  IStorageService interfaccia astratta
                              CloudStorageService implementa stessa interfaccia
                              Nessun cambiamento nel renderer

Export PNG/PDF             →  ExportStrategy pattern
                              Aggiungere HtmlExportStrategy, FigmaExportStrategy
                              Registrabili nel ExportService

5-10 utenti locali         →  Event Bus + Lock Service
                              Aggiungere WebSocket layer per real-time
                              CRDT per conflict resolution

UI italiano                →  Tutti i testi UI sono stringhe in componenti
                              Estrarre in file i18n (react-i18next)
                              Aggiungere language selector

Template hardcoded         →  TemplateRegistry + PluginDefinition
                              I plugin caricano template da cartelle esterne
                              Marketplace locale o remoto

No AI                      →  Event Bus + PluginContext
                              Plugin "AI Layout Suggest" ascolta eventi
                              Chiama API Claude/OpenAI per suggerimenti
```

### Matrice di Impatto Evolutivo

| Evoluzione | File da Modificare | File da Creare | Breaking Changes |
|------------|-------------------|----------------|-----------------|
| Multi-page (PLP, PDP) | `Project` type (+pageType), `App.tsx` (routing) | Nuovi template + renderer | Nessuna |
| Multi-brand | `obi-theme.css` | Nuovi theme files, ThemeSelector component | Nessuna |
| Cloud sync | Nessuno nel renderer | `CloudStorageService`, sync logic | Nessuna (interfaccia uguale) |
| Real-time collab | Event Bus consumers | WebSocket service, CRDT layer | Nessuna |
| i18n | Tutti i componenti UI (estrarre stringhe) | File di traduzione, LanguageProvider | Refactor medio |
| Plugin system | `PluginContext` (gia preparato) | Plugin loader, plugin API | Nessuna |
| AI suggestions | Nessuno | AI service, suggestion panel | Nessuna |
| Import da Magnolia | Template definitions | Magnolia API connector, import wizard | Nessuna |

---

## Riferimenti Architetturali

- [Electron Official Docs](https://www.electronjs.org/docs/latest/)
- [electron-vite](https://electron-vite.org/)
- [electron-builder - Windows Targets](https://www.electron.build/win.html)
- [Bulletproof React - Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
- [Advanced Electron.js Architecture](https://blog.logrocket.com/advanced-electron-js-architecture/)
- [dnd-kit Documentation](https://docs.dndkit.com/)
- [Zustand Architecture Patterns at Scale](https://brainhub.eu/library/zustand-architecture-patterns-at-scale)
- [Zustand Middleware](https://beyondthecode.medium.com/zustand-middleware-the-architectural-core-of-scalable-state-management-d8d1053489ac)
- [Magnolia CMS Template Definition](https://docs.magnolia-cms.com/product-docs/6.3/developing/templating/template-definition/)
