import { cn } from '@/lib/utils'
import { PlaceholderImage } from './PlaceholderImage'
import type { TemplateRendererProps } from '../../types/template.types'

export function HeroSliderRenderer({
  component,
  template,
  viewport,
  isSelected,
  isPreview,
}: TemplateRendererProps) {
  const config = component.config
  const headline = (config.headline as string) || ''
  const subtext = (config.subtext as string) || ''
  const ctaLabel = (config.ctaLabel as string) || ''
  const slideCount = (config.slideCount as number) || 3
  const isSplit = component.variant === 'split'

  if (isPreview) {
    return (
      <div className="flex h-20 items-center gap-3 rounded-md border border-border bg-muted/50 p-2">
        <div className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded bg-gradient-to-t from-obi-orange/30 to-gray-200">
          <span className="text-[8px] font-bold text-white">HERO</span>
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

  if (isSplit && isDesktop) {
    return (
      <div
        className={cn(
          'relative flex w-full overflow-hidden bg-white',
          isSelected && 'ring-2 ring-blue-500 ring-offset-1'
        )}
        style={{ minHeight: minH }}
      >
        {/* Image half */}
        <div className="w-1/2">
          <PlaceholderImage width={720} height={400} className="h-full w-full" />
        </div>

        {/* Text half */}
        <div className="flex w-1/2 flex-col justify-center gap-4 bg-gray-50 p-8">
          <h2 className="text-2xl font-bold text-obi-gray-dark">{headline}</h2>
          {subtext && (
            <p className="text-sm text-gray-600">{subtext}</p>
          )}
          {ctaLabel && (
            <button className="w-fit rounded bg-obi-orange px-6 py-2.5 text-sm font-semibold text-white">
              {ctaLabel}
            </button>
          )}
        </div>

        {/* Slide dots */}
        <SlideDots count={slideCount} className="absolute bottom-4 left-1/4" />
      </div>
    )
  }

  // Default: fullWidth variant (desktop & mobile)
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
        height={isDesktop ? 400 : 250}
        className="absolute inset-0 h-full w-full"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content overlay */}
      <div
        className={cn(
          'relative flex h-full flex-col justify-end gap-3',
          isDesktop ? 'p-10' : 'p-5'
        )}
        style={{ minHeight: minH }}
      >
        <h2
          className={cn(
            'font-bold text-white',
            isDesktop ? 'text-3xl' : 'text-xl'
          )}
        >
          {headline}
        </h2>
        {subtext && (
          <p
            className={cn(
              'text-white/90',
              isDesktop ? 'text-base' : 'text-sm'
            )}
          >
            {subtext}
          </p>
        )}
        {ctaLabel && (
          <button
            className={cn(
              'w-fit rounded font-semibold text-white',
              isDesktop
                ? 'bg-obi-orange px-6 py-2.5 text-sm'
                : 'bg-obi-orange px-4 py-2 text-xs'
            )}
          >
            {ctaLabel}
          </button>
        )}

        {/* Slide dots */}
        <SlideDots count={slideCount} className="mt-2" />
      </div>
    </div>
  )
}

function SlideDots({ count, className }: { count: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-2.5 w-2.5 rounded-full',
            i === 0
              ? 'bg-obi-orange'
              : 'border border-white/70 bg-white/30'
          )}
        />
      ))}
    </div>
  )
}
