# PRD: OBI Homepage Wireframe Generator

## Context

I Content Manager di OBI Italia necessitano di uno strumento per visualizzare, pianificare e condividere le versioni programmate della homepage del sito obi-italia.it. Attualmente la homepage e gestita tramite Magnolia CMS (pesantemente customizzato) con 30+ template di componenti. I cambiamenti alla homepage sono frequenti e irregolari (campagne marketing, promozioni stagionali, aggiornamenti ad-hoc). Non esiste uno strumento dedicato per pre-visualizzare e confrontare le diverse versioni pianificate del layout prima di implementarle nel CMS.

L'app deve girare su PC Windows di colleghi **senza diritti di amministratore**, essere distribuita copiando una cartella su ogni PC, e sviluppata tramite vibe coding con Claude Code.

---

## 1. Vision & Obiettivi

### Vision
Uno strumento desktop portatile che replica visivamente la homepage OBI Italia, permettendo ai Content Manager di comporre, confrontare e approvare wireframe high-fidelity delle diverse versioni della homepage prima dell'implementazione nel CMS Magnolia.

### Obiettivi Primari
- **Velocizzare il planning**: ridurre il tempo di pianificazione dei cambi homepage da giorni a ore
- **Comunicazione visiva**: eliminare ambiguita nella comunicazione dei layout tra team marketing, content e sviluppo
- **Versionamento**: tracciare l'evoluzione delle homepage pianificate con confronto side-by-side
- **Autonomia**: funzionare completamente offline, senza server, senza installazione, senza admin rights

### Metriche di Successo
- Tempo medio di creazione wireframe < 15 minuti
- 100% dei cambi homepage pianificati passano attraverso lo strumento entro 3 mesi
- Riduzione del 50% dei cicli di revisione tra content e marketing

---

## 2. Target Users

| Persona | Ruolo | Bisogno Primario |
|---------|-------|------------------|
| **Content Manager** (primary) | Gestisce i contenuti nel CMS Magnolia | Comporre rapidamente il layout della homepage con i componenti disponibili |
| **Marketing Manager** (secondary) | Pianifica campagne e promozioni | Visualizzare e approvare il layout prima dell'implementazione |
| **Team Lead / Approver** | Approva i cambi alla homepage | Confrontare versioni e dare il via libera |

**Ambiente tecnico utenti**: Windows 10/11 Enterprise, NO diritti admin, browser moderno disponibile (Chrome/Edge), accesso a cartelle di rete condivise.

---

## 3. Analisi Competitiva

| Tool | Pro | Contro | Rilevanza |
|------|-----|--------|-----------|
| [Figma AI Wireframe](https://www.figma.com/solutions/ai-wireframe-generator/) | Collaborazione real-time, AI generation | Richiede account cloud, non customizzabile per CMS specifico | Media |
| [Framer Wireframer](https://www.framer.com/wireframer/) | AI prompt-to-layout, responsive | Cloud-only, generico, non replicabile per template CMS | Bassa |
| [MockFlow](https://mockflow.com/) | CMS hierarchy trees, component library | Cloud-based, non personalizzabile per Magnolia | Media |
| [Miro eCommerce Template](https://miro.com/templates/ecommerce-website-wireframe/) | Template ecommerce, collaborazione | Low-fi, non specifico per CMS components | Bassa |
| [Balsamiq](https://balsamiq.com/) | Rapido, low-fi, focus su struttura | Non high-fi, non customizzabile per CMS specifico | Bassa |

**Gap di mercato**: Nessun tool esistente combina (a) componenti pre-configurati che mappano 1:1 un CMS specifico, (b) high-fidelity visiva, (c) funzionamento offline/portable, (d) versioning con workflow di approvazione. Il nostro tool colma questo gap.

---

## 4. Architettura Homepage OBI Italia (da Magnolia CMS)

### Modello di Layout
La homepage segue il pattern Magnolia: **Page > Areas > Components**.

```
+--------------------------------------------------+
|                  HEADER (fisso)                   |
|  Logo | Nav principale | Account | Carrello      |
|  Menu categorie | Barra servizi                  |
+--------------------------------------------------+
|                                                  |
|            CONTENT AREA (libera)                 |
|                                                  |
|  [ Componente 1 - es. Hero Slider ]              |
|  [ Componente 2 - es. TeaserImageText ]          |
|  [ Componente 3 - es. Grid Promo ]               |
|  [ ... N componenti in sequenza ... ]             |
|  [ Componente N - es. WhatsApp CTA ]             |
|                                                  |
+--------------------------------------------------+
|                  FOOTER (fisso)                   |
+--------------------------------------------------+
```

- **Header e Footer**: fissi, non modificabili nel wireframe (ma visualizzati)
- **Content Area**: lista sequenziale di componenti, liberamente ordinabili
- Ogni componente occupa la larghezza completa della pagina (full-width)
- Alcuni componenti contengono griglie interne (es. 3 colonne, 6 colonne)

### Componenti Identificati dal Sito (mapping iniziale)

| ID | Componente | Descrizione | Varianti |
|----|-----------|-------------|----------|
| 1 | **HeroSlider (Stage)** | Carousel full-width con N slide | 3-5 slide, autoplay, con/senza CTA |
| 2 | **TeaserImageText** | Immagine + headline + testo + CTA | Variante `800`, `1000`, con countdown |
| 3 | **TeaserImage** | Solo immagine con overlay testo | Full-width, con/senza gradient |
| 4 | **SliderMulti** | Swiper orizzontale con card | Prodotti, categorie, brand |
| 5 | **TagCloud / SmartPill** | Pills/chip cliccabili per sottocategorie | Inline, con icone |
| 6 | **GridPromo** | Griglia 2-3 colonne di banner | 2col, 3col, mixed |
| 7 | **CategoryGrid** | Griglia 6 colonne con link espandibili | Con/senza icone |
| 8 | **ServiceCards** | Card servizi affiancate (2-3) | Con icona, con immagine |
| 9 | **EditorialCards** | Card editoriali "OBI Consiglia" | 3 card con immagine + CTA |
| 10 | **StoreFinder** | Widget ricerca negozio | Compatto, esteso |
| 11 | **BannerCTA** | Banner singolo con CTA (es. WhatsApp) | Con immagine, solo testo |
| 12 | **CountdownBadge** | Badge con timer countdown | Integrato in TeaserImageText |
| 13 | **SectionDivider** | Separatore tra sezioni | Con titolo, senza titolo |
| 14+ | **Custom** | Template creati dall'utente | Definiti dall'utente via editor |

---

## 5. Requisiti Funzionali

### 5.1 Canvas Homepage (CORE)

**F1 - Visualizzazione Homepage**
- Rendering high-fidelity della homepage con header/footer fissi
- Content area scrollabile con componenti impilati verticalmente
- Due viewport: Desktop (1440px) e Mobile (375px) con toggle rapido
- Colori, font e stile coerenti con il brand OBI (arancione #FF6600, bianco, grigio scuro)

**F2 - Drag & Drop dei Componenti**
- Pannello laterale sinistro con libreria componenti (categorizzati)
- Drag & drop dei componenti dalla libreria alla content area
- Riordinamento componenti via drag & drop nella content area
- Indicatore visivo della posizione di drop durante il trascinamento
- Duplicazione rapida di un componente gia inserito
- Eliminazione componente con conferma

**F3 - Configurazione Componente**
- Click su componente per aprire pannello di configurazione (destra)
- Ogni componente ha campi configurabili specifici:
  - **Testi**: headline, sottotitolo, body text, CTA label (testi reali inseriti dall'utente)
  - **Immagini**: placeholder con dimensioni corrette, possibilita di caricare immagine reale o usare placeholder con label
  - **Varianti**: selezione della variante del componente (es. TeaserImageText 800 vs 1000)
  - **Layout interno**: numero colonne, allineamento
  - **Countdown**: data/ora per badge countdown
- Preview real-time delle modifiche nel canvas

### 5.2 Template System

**F4 - Libreria Template Pre-configurati**
- Set iniziale di 14+ template che mappano i componenti del CMS Magnolia
- Ogni template ha: nome, icona/thumbnail, schema di configurazione, rendering desktop e mobile
- I template sono organizzati in categorie: Hero, Promo, Prodotti, Servizi, Editoriale, Navigazione, CTA

**F5 - Editor Template Custom (DRAG & DROP)**
- Creare nuovi template definendo:
  - Nome e categoria del template
  - Griglia interna (numero colonne, gap, padding)
  - Zone/aree trascinabili: area immagine, area testo, area CTA/bottone, area icona, area countdown
  - Ogni zona ha proprieta configurabili (dimensioni min/max, allineamento, stile)
- Canvas dedicato per l'editing del template con griglia visibile
- Preview del template in dimensione reale
- Salvare template custom nella libreria locale
- Import/export template come file JSON per condivisione tra colleghi

**F6 - Mapping 1:1 con CMS**
- Ogni template ha un campo metadata "CMS Component ID" per tracciare la corrispondenza con Magnolia
- Note/commenti per il content manager su come configurare il componente nel CMS reale
- Etichette che indicano le corrispondenze tra campi wireframe e campi CMS

### 5.3 Versioning & Confronto

**F7 - Gestione Versioni**
- Salvare snapshot del wireframe come "versione" con:
  - Nome versione (es. "Homepage Natale 2026 v1")
  - Data di creazione
  - Autore (nome utente locale)
  - Note di versione
- Lista versioni in ordine cronologico per ogni progetto
- Duplicare una versione come punto di partenza per la successiva
- Eliminare versioni obsolete

**F8 - Confronto Side-by-Side**
- Visualizzare due versioni affiancate in split-view
- Scroll sincronizzato tra le due versioni
- Evidenziazione visiva delle differenze (componenti aggiunti/rimossi/modificati)
- Toggle per mostrare/nascondere le differenze

### 5.4 Workflow di Approvazione

**F9 - Stati del Wireframe**
- Ogni versione ha uno stato: `Bozza` > `In Review` > `Approvato` > `In Produzione`
- Transizioni di stato con data, autore e nota obbligatoria
- Badge visivo dello stato su ogni versione nella lista
- Storico transizioni visibile nel dettaglio versione

**F10 - Annotazioni**
- Aggiungere commenti/annotazioni su specifici componenti del wireframe
- Pin visivi sul canvas con numero progressivo
- Lista annotazioni nel pannello laterale con stato (aperta/risolta)
- Annotazioni salvate con nome autore e timestamp

### 5.5 Progetti & Persistenza

**F11 - Gestione Progetti**
- Creare/aprire/eliminare progetti (ogni progetto = una homepage pianificata)
- Ogni progetto contiene N versioni
- I progetti sono salvati come cartelle con file JSON sul filesystem locale
- Possibilita di salvare progetti su cartella di rete per condivisione

**F12 - Import/Export**
- Esportare wireframe come immagine PNG (full-page screenshot)
- Esportare wireframe come PDF (con metadati: nome versione, stato, data, annotazioni)
- Esportare progetto completo come archivio ZIP
- Importare progetto da archivio ZIP

### 5.6 Responsive Preview

**F13 - Preview Dual Viewport**
- Toggle tra vista Desktop (1440px) e Mobile (375px)
- Ogni componente ha un rendering specifico per mobile (stack verticale, dimensioni ridotte)
- Opzione vista affiancata Desktop + Mobile contemporanea

---

## 6. Requisiti Non-Funzionali

### 6.1 Distribuzione & Compatibilita
- **Portable**: singolo file `.exe` o cartella estraibile, nessuna installazione richiesta
- **No Admin**: nessun privilegio amministrativo richiesto per l'esecuzione
- **Offline**: funzionamento 100% offline, nessuna connessione internet necessaria
- **Storage**: dati salvati nella cartella dell'app o in `%APPDATA%` (accessibile senza admin)
- **OS**: Windows 10/11 (x64)
- **Dimensione**: < 200MB per l'eseguibile portable

### 6.2 Performance
- Avvio app: < 5 secondi
- Rendering canvas con 20+ componenti: < 1 secondo
- Drag & drop: 60fps, nessun lag percepibile
- Salvataggio: < 2 secondi per qualsiasi operazione

### 6.3 Usabilita
- Interfaccia in **italiano**
- Nessuna formazione necessaria per utenti Content Manager
- Shortcuts da tastiera per operazioni frequenti (Ctrl+S salva, Ctrl+Z undo, Ctrl+Y redo, Del elimina)
- Undo/Redo illimitato nella sessione corrente

### 6.4 Dati & Storage
- Formato dati: JSON (leggibile e versionabile)
- Immagini caricate salvate nella cartella progetto
- Nessun database richiesto (filesystem-based)
- Struttura cartella progetto:
  ```
  /projects/
    /homepage-natale-2026/
      project.json          # metadati progetto
      /versions/
        /v1/
          wireframe.json    # struttura componenti
          metadata.json     # stato, annotazioni, storico
          /assets/          # immagini caricate
        /v2/
          ...
      /templates/           # template custom del progetto
  ```

---

## 7. Architettura Tecnica

### Stack Tecnologico

| Layer | Tecnologia | Motivazione |
|-------|-----------|-------------|
| **Runtime** | Electron (portable build via electron-builder) | App desktop senza installazione, accesso filesystem |
| **Frontend** | React 18 + TypeScript | Ecosistema ricco, component-based, ottimo per drag&drop |
| **Styling** | Tailwind CSS + CSS custom per tema OBI | Rapidita di sviluppo, customizzabile |
| **Drag & Drop** | @dnd-kit/core | Libreria moderna, performante, accessibile |
| **State Management** | Zustand | Leggero, semplice, perfetto per app medium-size |
| **Canvas Rendering** | HTML/CSS nativo (non canvas 2D) | High-fi rendering, componenti interattivi |
| **Export PDF** | html2canvas + jsPDF | Export screenshot e PDF senza dipendenze native |
| **Storage** | File system locale (Node.js fs) | Nessun DB, dati portabili, condivisibili via rete |
| **Build** | electron-builder (target: portable) | Genera .exe portable senza installazione |

### Architettura Componenti App

```
+-------------------------------------------------------+
|                    ELECTRON SHELL                      |
|  +--------------------------------------------------+ |
|  |                   TOOLBAR                         | |
|  |  [Progetto v] [Versione v] [Stato: Bozza]       | |
|  |  [Desktop/Mobile] [Confronta] [Esporta] [Salva] | |
|  +--------------------------------------------------+ |
|  |          |                        |               | |
|  | LIBRERIA |      CANVAS            | CONFIG PANEL  | |
|  | COMP.    |                        |               | |
|  |          |  +------------------+  | [Nome comp]   | |
|  | [Hero]   |  |    HEADER        |  | [Variante v]  | |
|  | [Teaser] |  +------------------+  | [Headline]    | |
|  | [Slider] |  |  Componente 1    |  | [Testo]       | |
|  | [Grid]   |  |  Componente 2    |  | [Immagine]    | |
|  | [Cards]  |  |  Componente 3    |  | [Colonne]     | |
|  | [CTA]    |  |  ...             |  | [CTA label]   | |
|  | [Custom] |  |  Componente N    |  |               | |
|  |          |  +------------------+  | [Note CMS]    | |
|  | + Nuovo  |  |    FOOTER        |  |               | |
|  | Template |  +------------------+  |               | |
|  +----------+------------------------+---------------+ |
+-------------------------------------------------------+
```

---

## 8. Design System OBI (riferimento per high-fi)

Basato sulla brand guide disponibile:

| Elemento | Valore |
|----------|--------|
| **Colore primario** | #FF6600 (arancione OBI) |
| **Colore secondario** | #333333 (grigio scuro) |
| **Background** | #FFFFFF, #F5F5F5 (grigio chiaro per sezioni alternate) |
| **Font heading** | Da brand guide (o fallback: system sans-serif bold) |
| **Font body** | Da brand guide (o fallback: system sans-serif) |
| **Border radius** | 4-8px (stile moderno ma non eccessivo) |
| **Spacing** | Basato su griglia 8px |
| **Max width content** | 1440px desktop |
| **Breakpoint mobile** | 375px |

---

## 9. Fasi di Sviluppo (ottimizzato per vibe coding con Claude Code)

### Fase 1 - Foundation (MVP Core)
1. Setup progetto Electron + React + TypeScript + Tailwind
2. Layout app a 3 pannelli (libreria, canvas, config)
3. Canvas con header/footer fissi e content area scrollabile
4. 3-4 componenti base (HeroSlider, TeaserImageText, TeaserImage, GridPromo)
5. Drag & drop dalla libreria al canvas e riordinamento
6. Pannello config base per ogni componente
7. Salvataggio/caricamento progetto su filesystem (JSON)
8. Build portable .exe

### Fase 2 - Template Completi + Responsive
9. Tutti i 14+ template pre-configurati
10. Preview Mobile (375px) con rendering specifico per componente
11. Toggle Desktop/Mobile e vista affiancata
12. Duplicazione e eliminazione componenti
13. Undo/Redo

### Fase 3 - Versioning & Confronto
14. Sistema versioni (crea, duplica, elimina, rinomina)
15. Confronto side-by-side con scroll sincronizzato
16. Evidenziazione differenze tra versioni
17. Export PNG e PDF

### Fase 4 - Workflow & Annotazioni
18. Stati workflow (Bozza > In Review > Approvato > In Produzione)
19. Sistema annotazioni con pin sul canvas
20. Storico transizioni di stato

### Fase 5 - Template Editor Custom
21. Editor drag & drop per creazione template custom
22. Griglia configurabile, zone trascinabili
23. Import/export template JSON
24. Condivisione template tra utenti

### Fase 6 - Polish & Distribution
25. Shortcuts tastiera completi
26. Import/export progetto ZIP
27. Ottimizzazione performance
28. Testing su macchine target (Windows senza admin)
29. Documentazione utente integrata (help in-app)

---

## 10. Istruzioni per Agente AI (Vibe Coding con Claude Code)

### Convenzioni di Progetto
- **Lingua codice**: inglese (variabili, funzioni, commenti)
- **Lingua UI**: italiano (label, testi, messaggi)
- **File structure**: feature-based (`/src/features/canvas/`, `/src/features/library/`, `/src/features/config/`, etc.)
- **Component naming**: PascalCase, prefisso per dominio (es. `CanvasComponent`, `LibraryPanel`)
- **State**: Zustand stores separati per dominio (`useProjectStore`, `useCanvasStore`, `useVersionStore`)

### Pattern Architetturali
- Ogni componente wireframe e un **ComponentDefinition** (JSON schema) + un **ComponentRenderer** (React component)
- I template sono registrati in un **TemplateRegistry** che puo essere esteso con template custom
- Il drag & drop usa un modello **source/target** con preview durante il trascinamento
- Il filesystem e astratto dietro un **StorageService** per facilitare test e futuri cambiamenti

### Struttura Dati Core

```typescript
// Wireframe component instance
interface WireframeComponent {
  id: string;                    // UUID
  templateId: string;            // riferimento al template
  variant?: string;              // variante del template
  config: Record<string, any>;   // configurazione specifica
  order: number;                 // posizione nella content area
}

// Wireframe version
interface WireframeVersion {
  id: string;
  name: string;
  components: WireframeComponent[];
  status: 'draft' | 'in_review' | 'approved' | 'in_production';
  statusHistory: StatusTransition[];
  annotations: Annotation[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

// Project
interface Project {
  id: string;
  name: string;
  description?: string;
  versions: WireframeVersion[];
  customTemplates: TemplateDefinition[];
  createdAt: string;
  updatedAt: string;
}

// Template definition
interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  icon: string;
  cmsComponentId?: string;       // mapping Magnolia
  cmsNotes?: string;             // note per il CM
  configSchema: ConfigField[];   // campi configurabili
  defaultConfig: Record<string, any>;
  renderDesktop: string;         // React component name
  renderMobile: string;          // React component name
}
```

### Priorita di Sviluppo per AI Agent
1. **Funzionante > Perfetto**: prima un MVP che gira, poi iterare
2. **Visual first**: il canvas e la parte piu critica, deve funzionare bene subito
3. **Dati semplici**: JSON su filesystem, niente overengineering
4. **Template extensibility**: il sistema template deve essere facile da estendere
5. **Test on target**: verificare regolarmente il build portable su Windows senza admin

---

## 11. Rischi e Mitigazioni

| Rischio | Impatto | Mitigazione |
|---------|---------|-------------|
| SmartScreen blocca .exe non firmato | Alto | Istruzioni per sblocco, oppure distribuzione come cartella (non .exe singolo) |
| Performance con 30+ componenti | Medio | Virtualizzazione lista, lazy rendering componenti fuori viewport |
| Mapping template non accurato | Medio | Iterazione con Content Manager per validare ogni template |
| Dimensione Electron portable | Basso | Target < 200MB, compressione asset |
| Conflitti salvataggio su rete | Medio | Lock file per progetto aperto, warning se gia in uso |

---

## 12. Verifica e Testing

### Come testare end-to-end
1. **Build**: `npm run build` + `npm run make:portable` genera l'eseguibile
2. **Avvio**: doppio click sull'exe, verifica avvio < 5 secondi
3. **Crea progetto**: nuovo progetto "Test Homepage"
4. **Drag & drop**: trascinare HeroSlider, TeaserImageText, GridPromo nel canvas
5. **Configura**: inserire testi reali, selezionare varianti
6. **Mobile**: toggle vista mobile, verificare rendering responsivo
7. **Salva**: Ctrl+S, chiudere e riaprire, verificare persistenza
8. **Versione**: creare v2, modificare, confrontare con v1
9. **Export**: esportare PNG e PDF, verificare qualita
10. **Template custom**: creare template da editor, usarlo nel canvas
11. **Rete**: copiare progetto su cartella condivisa, aprirlo da altro PC
12. **No admin**: testare su macchina Windows senza diritti admin

---

## Fonti e Riferimenti

- [Figma AI Wireframe Generator](https://www.figma.com/solutions/ai-wireframe-generator/)
- [Framer Wireframer](https://www.framer.com/wireframer/)
- [MockFlow](https://mockflow.com/)
- [Miro eCommerce Template](https://miro.com/templates/ecommerce-website-wireframe/)
- [Balsamiq](https://balsamiq.com/)
- [Electron Builder - Portable Target](https://www.electron.build/)
- [Magnolia CMS - Template Definition](https://docs.magnolia-cms.com/product-docs/6.3/developing/templating/template-definition/)
- [Magnolia CMS - Component Definition](https://docs.magnolia-cms.com/product-docs/developing/templating/template-definition/component-definition/)
- [Magnolia CMS - Area Definition](https://docs.magnolia-cms.com/product-docs/6.3/developing/templating/template-definition/area-definition/)
