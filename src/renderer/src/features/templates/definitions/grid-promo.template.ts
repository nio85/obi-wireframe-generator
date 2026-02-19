import type { TemplateDefinition } from '@shared/types'

export const gridPromoTemplate: TemplateDefinition = {
  id: 'grid-promo',
  name: 'Griglia Promo',
  description: 'Griglia di card promozionali con immagine, titolo e sottotitolo',
  category: 'promo',
  icon: 'LayoutGrid',
  isBuiltIn: true,
  version: 1,

  configSchema: [
    {
      key: 'columns',
      type: 'select',
      label: 'Colonne',
      options: [
        { value: '2', label: '2 colonne' },
        { value: '3', label: '3 colonne' },
      ],
      defaultValue: '3',
    },
    {
      key: 'itemCount',
      type: 'number',
      label: 'Numero card',
      defaultValue: 3,
      validation: { min: 2, max: 6 },
    },
    {
      key: 'title1',
      type: 'text',
      label: 'Titolo card 1',
      defaultValue: 'Offerta 1',
    },
    {
      key: 'subtitle1',
      type: 'text',
      label: 'Sottotitolo card 1',
      defaultValue: 'Scopri le nostre proposte',
    },
    {
      key: 'title2',
      type: 'text',
      label: 'Titolo card 2',
      defaultValue: 'Offerta 2',
    },
    {
      key: 'subtitle2',
      type: 'text',
      label: 'Sottotitolo card 2',
      defaultValue: 'Risparmia sul fai da te',
    },
    {
      key: 'title3',
      type: 'text',
      label: 'Titolo card 3',
      defaultValue: 'Offerta 3',
    },
    {
      key: 'subtitle3',
      type: 'text',
      label: 'Sottotitolo card 3',
      defaultValue: 'Tutto per la casa',
    },
    {
      key: 'title4',
      type: 'text',
      label: 'Titolo card 4',
      defaultValue: 'Offerta 4',
      showWhen: { field: 'itemCount', equals: 4 },
    },
    {
      key: 'subtitle4',
      type: 'text',
      label: 'Sottotitolo card 4',
      defaultValue: 'Idee per il giardino',
      showWhen: { field: 'itemCount', equals: 4 },
    },
  ],

  defaultConfig: {
    columns: '3',
    itemCount: 3,
    title1: 'Offerta Giardino',
    subtitle1: 'Scopri le nostre proposte',
    title2: 'Fai Da Te',
    subtitle2: 'Risparmia sul fai da te',
    title3: 'Arredo Casa',
    subtitle3: 'Tutto per la casa',
    title4: 'Idee Giardino',
    subtitle4: 'Idee per il giardino',
  },

  variants: [
    {
      id: '2col',
      name: '2 Colonne',
      description: 'Card disposte su 2 colonne',
      defaultConfig: { columns: '2' },
    },
    {
      id: '3col',
      name: '3 Colonne',
      description: 'Card disposte su 3 colonne',
      defaultConfig: { columns: '3' },
    },
  ],

  layout: {
    desktop: { minHeight: 350, columns: 3, gap: 16, padding: '24px' },
    mobile: { minHeight: 500, stackDirection: 'vertical', padding: '16px' },
  },

  cms: {
    componentId: 'obi:components/gridPromo',
    notes:
      'Griglia promozionale. Le card sono sotto-nodi in Magnolia. Varianti 2col e 3col.',
  },
}
