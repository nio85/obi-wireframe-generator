import { templateRegistry } from '../registry/template.registry'

import { heroSliderTemplate } from './hero-slider.template'
import { teaserImageTextTemplate } from './teaser-image-text.template'
import { teaserImageTemplate } from './teaser-image.template'
import { gridPromoTemplate } from './grid-promo.template'

import { HeroSliderRenderer } from '../components/renderers/HeroSliderRenderer'
import { TeaserImageTextRenderer } from '../components/renderers/TeaserImageTextRenderer'
import { TeaserImageRenderer } from '../components/renderers/TeaserImageRenderer'
import { GridPromoRenderer } from '../components/renderers/GridPromoRenderer'

export {
  heroSliderTemplate,
  teaserImageTextTemplate,
  teaserImageTemplate,
  gridPromoTemplate,
}

/** Register all built-in templates. Call once at app startup. */
export function registerBuiltInTemplates(): void {
  templateRegistry.register(heroSliderTemplate, HeroSliderRenderer)
  templateRegistry.register(teaserImageTextTemplate, TeaserImageTextRenderer)
  templateRegistry.register(teaserImageTemplate, TeaserImageRenderer)
  templateRegistry.register(gridPromoTemplate, GridPromoRenderer)
}
