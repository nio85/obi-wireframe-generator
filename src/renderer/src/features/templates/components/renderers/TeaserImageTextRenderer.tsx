import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PlaceholderImage } from './PlaceholderImage'
import type { TemplateRendererProps } from '../../types/template.types'

export function TeaserImageTextRenderer({
  component,
  template,
  viewport,
  isSelected,
  isPreview,
}: TemplateRendererProps) {
  const config = component.config
  const headline = (config.headline as string) || ''
  const text = (config.text as string) || ''
  const ctaLabel = (config.ctaLabel as string) || ''
  const imagePosition = (config.imagePosition as string) || 'left'
  const showCountdown = config.showCountdown as boolean
  const countdownDate = config.countdownDate as string | null
  const isVariant800 = component.variant === '800'

  if (isPreview) {
    return (
      <div className="flex h-20 items-center gap-3 rounded-md border border-border bg-muted/50 p-2">
        <div className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded bg-gray-200">
          <div className="flex gap-0.5">
            <div className="h-8 w-6 rounded-sm bg-gray-300" />
            <div className="flex h-8 w-6 flex-col justify-center gap-0.5">
              <div className="h-1 w-full rounded bg-gray-400" />
              <div className="h-1 w-3/4 rounded bg-gray-300" />
            </div>
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

  const maxWidth = isVariant800 ? 800 : isDesktop ? 1000 : undefined

  const imageBlock = (
    <PlaceholderImage
      width={isDesktop ? (isVariant800 ? 380 : 480) : 375}
      height={isDesktop ? 300 : 200}
      className={cn(
        'flex-shrink-0',
        isDesktop ? 'w-1/2 rounded-lg' : 'h-48 w-full rounded-t-lg'
      )}
    />
  )

  const textBlock = (
    <div
      className={cn(
        'flex flex-col justify-center',
        isDesktop ? 'w-1/2 gap-4 p-6' : 'gap-3 p-4'
      )}
    >
      <h3
        className={cn(
          'font-bold text-obi-gray-dark',
          isDesktop ? 'text-xl' : 'text-lg'
        )}
      >
        {headline}
      </h3>
      {text && (
        <p className={cn('text-gray-600', isDesktop ? 'text-sm' : 'text-xs')}>
          {text}
        </p>
      )}
      {ctaLabel && (
        <button
          className={cn(
            'w-fit rounded font-semibold text-white',
            isDesktop
              ? 'bg-obi-orange px-5 py-2 text-sm'
              : 'bg-obi-orange px-4 py-1.5 text-xs'
          )}
        >
          {ctaLabel}
        </button>
      )}
      {showCountdown && (
        <div className="flex items-center gap-1.5 rounded-full bg-obi-orange/10 px-3 py-1 text-xs font-medium text-obi-orange">
          <Clock className="h-3 w-3" />
          <span>
            Countdown: {countdownDate || 'data da impostare'}
          </span>
        </div>
      )}
    </div>
  )

  if (!isDesktop) {
    return (
      <div
        className={cn(
          'w-full overflow-hidden rounded-lg bg-white shadow-sm',
          isSelected && 'ring-2 ring-blue-500 ring-offset-1'
        )}
        style={{ minHeight: minH }}
      >
        {imageBlock}
        {textBlock}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'mx-auto flex w-full items-stretch overflow-hidden rounded-lg bg-white shadow-sm',
        isSelected && 'ring-2 ring-blue-500 ring-offset-1'
      )}
      style={{ minHeight: minH, maxWidth }}
    >
      {imagePosition === 'left' ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  )
}
