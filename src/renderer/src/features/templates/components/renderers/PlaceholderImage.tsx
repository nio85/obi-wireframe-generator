import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlaceholderImageProps {
  width?: number
  height?: number
  label?: string
  className?: string
}

export function PlaceholderImage({ width, height, label, className }: PlaceholderImageProps) {
  const sizeLabel = width && height ? `${width} x ${height}` : label ?? 'Immagine'

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-1 bg-gray-100 text-gray-400',
        className
      )}
    >
      <ImageIcon className="h-6 w-6" />
      <span className="text-[10px] font-medium">{sizeLabel}</span>
    </div>
  )
}
