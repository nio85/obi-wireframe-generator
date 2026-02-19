import type { TemplateDefinition } from '@shared/types'

export const teaserImageTextTemplate: TemplateDefinition = {
  id: 'teaser-image-text',
  name: 'Teaser Immagine + Testo',
  description: 'Immagine affiancata a headline, testo e CTA',
  category: 'promo',
  icon: 'LayoutList',
  isBuiltIn: true,
  version: 1,

  configSchema: [
    {
      key: 'headline',
      type: 'text',
      label: 'Titolo',
      placeholder: 'Es. Offerta Speciale',
      required: true,
      cmsFieldName: 'headline',
    },
    {
      key: 'text',
      type: 'textarea',
      label: 'Testo',
      placeholder: 'Descrizione dell\'offerta...',
      cmsFieldName: 'text',
    },
    {
      key: 'ctaLabel',
      type: 'text',
      label: 'Testo CTA',
      defaultValue: 'Scopri',
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
      key: 'imagePosition',
      type: 'select',
      label: 'Posizione immagine',
      options: [
        { value: 'left', label: 'Sinistra' },
        { value: 'right', label: 'Destra' },
      ],
      defaultValue: 'left',
    },
    {
      key: 'showCountdown',
      type: 'toggle',
      label: 'Mostra countdown',
      defaultValue: false,
    },
    {
      key: 'countdownDate',
      type: 'datetime',
      label: 'Data countdown',
      showWhen: { field: 'showCountdown', equals: true },
      cmsFieldName: 'countdownDate',
    },
  ],

  defaultConfig: {
    headline: 'Offerta Speciale',
    text: 'Approfitta delle nostre offerte esclusive per rinnovare la tua casa.',
    ctaLabel: 'Scopri',
    ctaUrl: '',
    imagePosition: 'left',
    showCountdown: false,
    countdownDate: null,
  },

  variants: [
    {
      id: '800',
      name: 'Variante 800',
      description: 'Versione compatta (800px container)',
    },
    {
      id: '1000',
      name: 'Variante 1000',
      description: 'Versione ampia (1000px container)',
    },
  ],

  layout: {
    desktop: { minHeight: 300, columns: 2, gap: 24, padding: '24px' },
    mobile: { minHeight: 400, stackDirection: 'vertical', padding: '16px' },
  },

  cms: {
    componentId: 'obi:components/teaserImageText',
    notes:
      'Varianti 800 e 1000 corrispondono alle dimensioni container in Magnolia.',
  },
}
