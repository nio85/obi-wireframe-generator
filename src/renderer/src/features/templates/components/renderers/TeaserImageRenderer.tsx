import { cn } from '@/lib/utils'
import { PlaceholderImage } from './PlaceholderImage'
import type { TemplateRendererProps } from '../../types/template.types'

const GRADIENT_CLASSES: Record<string, string> = {
  bottom: 'bg-gradient-to-t from-black/60 via-black/20 to-transparent',
  left: 'bg-gradient-to-r from-black/60 via-black/20 to-transparent',
  right: 'bg-gradient-to-l from-black/60 via-black/20 to-transparent',
}

const POSITION_CLASSES: Record<string, string> = {
  'bottom-left': 'items-end justify-start text-left',
  'bottom-center': 'items-end justify-center text-center',
  center: 'items-center justify-center text-center',
}

export function TeaserImageRenderer({
  component,
  template,
  viewport,
  isSelected,
  isPreview,
}: TemplateRendererProps) {
  const config = component.config
  const headline = (config.headline as string) || ''
  const subtext = (config.subtext as string) || ''
  const showGradient = config.showGradient !== false
  const gradientDirection = (config.gradientDirection as string) || 'bottom'
  const overlayPosition = (config.overlayPosition as string) || 'bottom-left'

  if (isPreview) {
    return (
      <div className="flex h-20 items-center gap-3 rounded-md border border-border bg-muted/50 p-2">
        <div className="relative flex h-12 w-16 flex-shrink-0 items-end overflow-hidden rounded bg-gray-200 p-1">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="relative h-1 w-8 rounded bg-white/80" />
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

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        isSelected && 'ring-2 ring-blue-500 ring-offset-1'
      )}
      style={{ minHeight: minH }}
    >
      {/* Background placeholder */}
      <PlaceholderImage
        width={isDesktop ? 1440 : 375}
        height={isDesktop ? 350 : 200}
        className="absolute inset-0 h-full w-full"
      />

      {/* Gradient overlay */}
      {showGradient && (
        <div
          className={cn(
            'absolute inset-0',
            GRADIENT_CLASSES[gradientDirection] || GRADIENT_CLASSES.bottom
          )}
        />
      )}

      {/* Text overlay */}
      <div
        className={cn(
          'relative flex h-full flex-col',
          isDesktop ? 'p-10' : 'p-5',
          POSITION_CLASSES[overlayPosition] || POSITION_CLASSES['bottom-left']
        )}
        style={{ minHeight: minH }}
      >
        <div className={cn(overlayPosition === 'center' ? 'text-center' : '')}>
          <h2
            className={cn(
              'font-bold text-white',
              isDesktop ? 'text-2xl' : 'text-lg'
            )}
          >
            {headline}
          </h2>
          {subtext && (
            <p
              className={cn(
                'mt-2 text-white/90',
                isDesktop ? 'text-base' : 'text-sm'
              )}
            >
              {subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
