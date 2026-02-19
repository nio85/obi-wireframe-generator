import { cn } from '@/lib/utils'
import { PlaceholderImage } from './PlaceholderImage'
import type { TemplateRendererProps } from '../../types/template.types'

export function GridPromoRenderer({
  component,
  template,
  viewport,
  isSelected,
  isPreview,
}: TemplateRendererProps) {
  const config = component.config
  const columns = parseInt((config.columns as string) || '3', 10)
  const itemCount = Math.min((config.itemCount as number) || 3, 6)

  if (isPreview) {
    return (
      <div className="flex h-20 items-center gap-3 rounded-md border border-border bg-muted/50 p-2">
        <div className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded bg-gray-200 p-1">
          <div className="grid grid-cols-3 gap-0.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-4 w-4 rounded-sm bg-gray-300" />
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-foreground">{template.name}</p>
          <p className="truncate text-xs text-muted-foreground">{template.description}</p>
        </div>
      </div>
    )
  }

  const isDesktop = viewport === 'desktop'
  const minH = isDesktop
    ? template.layout.desktop.minHeight
    : template.layout.mobile.minHeight
  const gap = template.layout.desktop.gap ?? 16
  const padding = isDesktop
    ? template.layout.desktop.padding
    : template.layout.mobile.padding

  // Build card data from flat config keys
  const cards: Array<{ title: string; subtitle: string }> = []
  for (let i = 1; i <= itemCount; i++) {
    cards.push({
      title: (config[`title${i}`] as string) || `Card ${i}`,
      subtitle: (config[`subtitle${i}`] as string) || '',
    })
  }

  const gridCols = isDesktop ? columns : 1
  const paddingNum = parseInt(String(padding) || '24', 10)
  const cardImageWidth = isDesktop
    ? Math.round((1440 - paddingNum * 2 - gap * (gridCols - 1)) / gridCols)
    : 375 - paddingNum * 2

  return (
    <div
      className={cn(
        'w-full',
        isSelected && 'ring-2 ring-blue-500 ring-offset-1'
      )}
      style={{ minHeight: minH, padding }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gap,
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
          >
            <PlaceholderImage
              width={cardImageWidth}
              height={isDesktop ? 180 : 160}
              className={cn(
                'w-full',
                isDesktop ? 'h-[180px]' : 'h-[160px]'
              )}
            />
            <div className="p-4">
              <h4 className="text-sm font-bold text-obi-gray-dark">
                {card.title}
              </h4>
              {card.subtitle && (
                <p className="mt-1 text-xs text-gray-500">{card.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
