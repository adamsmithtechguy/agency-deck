import { createContext, useContext, type ReactNode } from 'react'
import type { Brand } from './schemas'

/**
 * Per-presentation branding. Bright.Blue is always the agency co-brand (baked into
 * the slides); the CLIENT logo is dynamic and supplied by the deck. Slides read it
 * via useBrand(). With no provider (e.g. the gallery), there's simply no client
 * logo — the slide falls back to Bright.Blue alone, never a hardcoded client.
 */
const BrandContext = createContext<Brand>({})

export function BrandProvider({ value, children }: { value?: Brand; children: ReactNode }) {
  return <BrandContext.Provider value={value ?? {}}>{children}</BrandContext.Provider>
}

export function useBrand(): Brand {
  return useContext(BrandContext)
}
