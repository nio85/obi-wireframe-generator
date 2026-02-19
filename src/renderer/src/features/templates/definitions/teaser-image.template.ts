import type { TemplateDefinition } from '@shared/types'

export const teaserImageTemplate: TemplateDefinition = {
  id: 'teaser-image',
  name: 'Teaser Immagine',
  description: 'Immagine full-width con overlay testo e gradient',
  category: 'promo',
  icon: 'ImageIcon',
  isBuiltIn: true,
  version: 1,

  configSchema: [
    {
      key: 'headline',
      type: 'text',
      label: 'Titolo',
      placeholder: 'Es. Nuova Collezione Giardino',
      required: true,
      cmsFieldName: 'headline',
    },
    {
      key: 'subtext',
      type: 'text',
      label: 'Sottotitolo',
      placeholder: 'Es. Tutto per il tuo spazio verde',
      cmsFieldName: 'subtext',
    },
    {
      key: 'showGradient',
      type: 'toggle',
      label: 'Mostra gradient',
      defaultValue: true,
    },
    {
      key: 'gradientDirection',
      type: 'select',
      label: 'Direzione gradient',
      options: [
        { value: 'bottom', label: 'Dal basso' },
        { value: 'left', label: 'Da sinistra' },
        { value: 'right', label: 'Da destra' },
      ],
      defaultValue: 'bottom',
      showWhen: { field: 'showGradient', equals: true },
    },
    {
      key: 'overlayPosition',
      type: 'select',
      label: 'Posizione testo',
      options: [
        { value: 'bottom-left', label: 'Basso sinistra' },
        { value: 'bottom-center', label: 'Basso centro' },
        { value: 'center', label: 'Centro' },
      ],
      defaultValue: 'bottom-left',
    },
  ],

  defaultConfig: {
    headline: 'Nuova Collezione Giardino',
    subtext: 'Tutto per il tuo spazio verde',
    showGradient: true,
    gradientDirection: 'bottom',
    overlayPosition: 'bottom-left',
  },

  layout: {
    desktop: { minHeight: 350, maxHeight: 450 },
    mobile: { minHeight: 200, stackDirection: 'vertical' },
  },

  cms: {
    componentId: 'obi:components/teaserImage',
    notes:
      'Immagine full-width con overlay. Il gradient e configurabile in Magnolia.',
  },
}
