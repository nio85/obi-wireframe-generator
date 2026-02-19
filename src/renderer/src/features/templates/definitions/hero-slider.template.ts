import type { TemplateDefinition } from '@shared/types'

export const heroSliderTemplate: TemplateDefinition = {
  id: 'hero-slider',
  name: 'Hero Slider (Stage)',
  description: 'Carousel full-width con slide, headline, CTA e autoplay',
  category: 'hero',
  icon: 'Image',
  isBuiltIn: true,
  version: 1,

  configSchema: [
    {
      key: 'slideCount',
      type: 'number',
      label: 'Numero slide',
      defaultValue: 3,
      validation: { min: 1, max: 8 },
    },
    {
      key: 'headline',
      type: 'text',
      label: 'Titolo slide attiva',
      placeholder: 'Es. Offerte di Primavera',
      required: true,
      cmsFieldName: 'headline',
    },
    {
      key: 'subtext',
      type: 'text',
      label: 'Sottotitolo',
      placeholder: 'Es. Scopri le nostre proposte',
      cmsFieldName: 'subheadline',
    },
    {
      key: 'ctaLabel',
      type: 'text',
      label: 'Testo CTA',
      defaultValue: 'Scopri di piu',
      cmsFieldName: 'ctaLabel',
    },
    {
      key: 'ctaUrl',
      type: 'text',
      label: 'URL CTA',
      placeholder: 'https://www.obi-italia.it/...',
      cmsFieldName: 'ctaUrl',
    },
    {
      key: 'autoplay',
      type: 'toggle',
      label: 'Autoplay',
      defaultValue: true,
    },
    {
      key: 'autoplayInterval',
      type: 'number',
      label: 'Intervallo autoplay (sec)',
      defaultValue: 5,
      validation: { min: 2, max: 15 },
      showWhen: { field: 'autoplay', equals: true },
    },
  ],

  defaultConfig: {
    slideCount: 3,
    headline: 'Offerte di Primavera',
    subtext: 'Scopri le nostre proposte per il tuo giardino',
    ctaLabel: 'Scopri di piu',
    ctaUrl: '',
    autoplay: true,
    autoplayInterval: 5,
  },

  variants: [
    {
      id: 'fullWidth',
      name: 'Full Width',
      description: 'Banner a larghezza piena con testo sovrapposto',
    },
    {
      id: 'split',
      name: 'Split',
      description: 'Immagine a sinistra, testo a destra',
    },
  ],

  layout: {
    desktop: { minHeight: 400, maxHeight: 500 },
    mobile: { minHeight: 250, stackDirection: 'vertical' },
  },

  cms: {
    componentId: 'obi:components/stage',
    areaName: 'stage',
    notes:
      'Corrisponde allo Stage in Magnolia CMS. Le slide sono sotto-nodi nell\'area "slides".',
  },
}
