export const VIEWPORTS = {
  desktop: {
    width: 1440,
    label: 'Desktop',
    icon: 'Monitor'
  },
  mobile: {
    width: 375,
    label: 'Mobile',
    icon: 'Smartphone'
  }
} as const

export type ViewportKey = keyof typeof VIEWPORTS
