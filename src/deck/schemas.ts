import { z } from 'zod'

/**
 * SINGLE SOURCE OF TRUTH for slide content contracts.
 *
 * React-free on purpose: both the frontend slide components AND the Cloudflare
 * Functions import this. The generator (Replicate) may only choose a slide `id`
 * and fill the matching content schema; the server validates every slide against
 * these schemas before saving, so a presentation can NEVER deviate from the bank.
 *
 * A presentation is stored purely as Deck = { slides: [{ id, content }] }. It holds
 * no markup — the live components render it, so bank edits propagate everywhere.
 */

// Curated icon vocabulary the AI may reference (mapped to lucide on the frontend).
export const ICON_NAMES = [
  'trending-up', 'shield-check', 'shield', 'sparkles', 'building', 'handshake', 'trophy',
  'map-pin', 'plane', 'ferris-wheel', 'line-chart', 'check', 'list-checks',
  'mail', 'quote', 'store', 'users', 'zap', 'bar-chart', 'target', 'rocket',
  'monitor-play', 'badge-pound', 'shopping-cart', 'chart-spline', 'layout-grid',
] as const
export const IconName = z.enum(ICON_NAMES)
export type IconName = z.infer<typeof IconName>

// ---- Per-slide content schemas -------------------------------------------

export const TitleContent = z.object({
  headline: z.string().min(1).describe('Main cover line, no trailing punctuation'),
  accent: z.string().min(1).describe('Gradient-highlighted phrase shown on its own line, e.g. a product/theme name'),
  lead: z.string().min(1).describe('One-sentence supporting subtitle'),
  footerLabel: z.string().min(1).describe('e.g. "Prepared for <Client>"'),
  year: z.string().min(1),
})

export const SectionDividerContent = z.object({
  number: z.string().min(1).describe('Two-digit section number, e.g. "01"'),
  titleLead: z.string().min(1).describe('Text before the accent word, e.g. "The"'),
  titleAccent: z.string().min(1).describe('Gradient word, e.g. "opportunity"'),
  lead: z.string().min(1),
})

export const AgendaContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  items: z.array(z.object({ title: z.string().min(1), desc: z.string().min(1) })).min(3).max(6),
})

export const StatementContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1).describe('The fixed label ABOVE both values that frames the comparison, e.g. "Time from plan to retail sales". It is not part of the contrast and does not change.'),
  oldValue: z.string().min(1).describe('Short struck-through value being replaced. MUST be a concrete value of the SAME KIND as newValue — a number, timeframe, money or count (e.g. "16 months", "£0", "6 steps"). Never an adjective, concept or opinion.'),
  newValue: z.string().min(1).describe('Short highlighted replacement value of the SAME KIND as oldValue (e.g. "2 weeks.", "£2.4M", "1 tap").'),
})

export const BulletsContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  points: z.array(z.object({
    icon: IconName.optional(),
    title: z.string().min(1),
    desc: z.string().min(1),
  })).min(2).max(6),
})

export const BigStatContent = z.object({
  eyebrow: z.string().min(1),
  value: z.string().min(1).describe('The hero figure, e.g. "77%"'),
  label: z.string().min(1).describe('What the figure means'),
  detail: z.string().min(1).describe('One-sentence explanation'),
})

export const StatGridContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  titleAccent: z.string().optional().describe('Optional gradient word within/append to the title'),
  stats: z.array(z.object({
    value: z.string().min(1),
    label: z.string().min(1),
    sub: z.string().min(1),
  })).min(2).max(4),
})

export const CTAContent = z.object({
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  accent: z.string().min(1).describe('Gradient phrase on its own line'),
  tagline: z.string().min(1),
  email: z.string().min(1),
})

// NOT part of the AI catalog. Only super admins create these by uploading an image
// to fulfil a "request custom slide". Rendered full-bleed as a static image.
export const CustomImageContent = z.object({
  imageUrl: z.string().min(1),
  caption: z.string().optional(),
  fit: z.enum(['cover', 'contain']).optional(),
})
export type CustomImageData = z.infer<typeof CustomImageContent>

export const TwoColumnContent = z.object({
  eyebrow: z.string().min(1),
  titleLead: z.string().min(1),
  titleAccent: z.string().min(1).describe('Gradient phrase within the heading'),
  titleTail: z.string().optional().describe('Text after the accent, e.g. "of the estate."'),
  paragraphs: z.array(z.string().min(1)).min(1).max(3),
  panelTitle: z.string().min(1),
  panelItems: z.array(z.string().min(1)).min(2).max(8).describe('Ticked list in the right panel'),
})

export const ComparisonContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  variant: z.enum(['contrast', 'positive']).optional().describe('Layout tone. "contrast" (default): left column is the negative/old option (crosses, muted) vs right is the positive/new one (ticks, highlighted). "positive": BOTH columns are good — two positive groupings side by side, no winner/loser.'),
  showIcons: z.boolean().optional().describe('Whether each row shows an icon marker. Default true. Set false for a clean, icon-free list.'),
  leftTitle: z.string().min(1).describe('Left column header (the "before"/old option in contrast mode; the first positive grouping in positive mode).'),
  leftIcon: IconName.optional().describe('Icon for every row of the LEFT column (positive mode only). Defaults to a tick.'),
  leftItems: z.array(z.string().min(1)).min(2).max(6),
  rightTitle: z.string().min(1).describe('Right column header (the highlighted "after"/new option in contrast mode; the second positive grouping in positive mode).'),
  rightIcon: IconName.optional().describe('Icon for every row of the RIGHT column (positive mode only). Defaults to a tick.'),
  rightItems: z.array(z.string().min(1)).min(2).max(6),
})

// Before/After IMAGE slider: two images in one well, wiped between with a drag
// handle. Only usable when TWO genuinely comparable images exist (same subject,
// before vs after) — otherwise use "comparison".
export const BeforeAfterContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  beforeLabel: z.string().min(1).describe('Short label for the first ("before") image, e.g. "Traditional vending"'),
  afterLabel: z.string().min(1).describe('Short label for the second ("after") image revealed by the slider, e.g. "Connected Retail"'),
  beforeImage: z.string().optional().describe('First ("before") image — EXACT path from the imagery library. Omit only if you cannot source it (then the brand default shows).'),
  afterImage: z.string().optional().describe('Second ("after") image revealed by the slider — EXACT path from the imagery library. Omit only if you cannot source it.'),
})

export const ProcessContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  steps: z.array(z.object({
    icon: IconName.optional(),
    title: z.string().min(1),
    desc: z.string().min(1),
  })).min(2).max(5).describe('Auto-labelled PHASE 1, PHASE 2, ...'),
})

export const TimelineContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  milestones: z.array(z.object({
    phase: z.string().min(1).describe('e.g. "Phase 1" or "Q1"'),
    title: z.string().min(1),
    desc: z.string().min(1),
  })).min(2).max(5),
})

export const FeatureCardsContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  features: z.array(z.object({
    icon: IconName.optional(),
    title: z.string().min(1),
    desc: z.string().min(1),
  })).min(3).max(6),
})

export const ImageTextSplitContent = z.object({
  eyebrow: z.string().min(1),
  titleLead: z.string().min(1),
  titleAccent: z.string().min(1),
  body: z.string().min(1),
  pill: z.string().min(1).describe('Small pill label under the copy'),
  panelTitle: z.string().min(1),
  panelPoints: z.array(z.string().min(1)).min(2).max(6),
})

// Both photo-hero variants share ONE content shape so left/right stay structurally
// identical: eyebrow → headline → divider → optional paragraph → optional bullets.
// Only the side the photo sits on differs (left vs right component).
export const PhotoHeroContent = z.object({
  eyebrow: z.string().min(1),
  headlineLead: z.string().min(1),
  headlineAccent: z.string().min(1).describe('Gradient-highlighted final word of the headline'),
  body: z.string().optional().describe('Supporting paragraph, shown after the divider. Provide this and/or points.'),
  points: z.array(z.string().min(1)).min(2).max(5).optional().describe('Supporting bullets, after the paragraph. Provide this and/or body.'),
  lead: z.string().optional().describe('Legacy alias for body'),
  image: z.string().optional().describe('Photo URL/path; leave unset to use the brand default'),
})
export const PhotoHeroLeftContent = PhotoHeroContent
export const PhotoHeroRightContent = PhotoHeroContent

// One plotted place on the map. Prefer giving lat & lng (you know coordinates of
// well-known places); `place` is used as the label and, for UK locations, can be
// resolved from a built-in gazetteer if lat/lng are omitted.
export const MapPoint = z.object({
  lat: z.number().optional().describe('Latitude (WGS84 decimal degrees)'),
  lng: z.number().optional().describe('Longitude (WGS84 decimal degrees)'),
  place: z.string().optional().describe('Place name, e.g. "Heathrow" or "Manchester"'),
  label: z.string().optional().describe('Display label; defaults to place'),
  value: z.string().optional().describe('Metric shown in the label view, e.g. "128 deployments"'),
})

export const MapContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  // Copy under the title follows the shared rhythm (title → divider → content).
  // Provide EITHER figures (stats) OR bullets — not both. Optional footnote is a
  // short highlighted closing line.
  stats: z.array(z.object({ n: z.string().min(1), l: z.string().min(1) })).min(1).max(6).optional()
    .describe('Key figures shown after the divider (n=number, l=label). Use for reach/scale numbers.'),
  bullets: z.array(z.string().min(1)).min(2).max(6).optional()
    .describe('Bullet points shown after the divider instead of figures.'),
  footnote: z.string().optional().describe('Short highlighted closing line'),
  deviceStat: z.object({ value: z.string().min(1), label: z.string().min(1) }).optional()
    .describe('Legacy headline figure; folded in as the first stat if present'),
  // Which visual element to plot — choose based on what the slide communicates:
  //  - "dots":   anonymous coverage ("all our UK locations") → a field of dots.
  //  - "pins":   a set of specific named sites highlighted on the map.
  //  - "labels": a metric per location (name + value), e.g. deployments per site.
  render: z.enum(['dots', 'pins', 'labels']).optional()
    .describe('dots=coverage field, pins=specific highlighted sites, labels=name+value per site'),
  // Map framing. "uk" is the default; use "us"/"europe"/"world" or "auto" (fit to
  // points). Pass an ARRAY to cover several areas at once, e.g. ["uk","us"] — the
  // map frames all of them and scatters dots evenly across each.
  region: z
    .union([
      z.enum(['uk', 'us', 'world', 'europe', 'auto']),
      z.array(z.enum(['uk', 'us', 'world', 'europe', 'auto'])).min(1).max(4),
    ])
    .optional()
    .describe('Single region ("uk"), several regions (["uk","us"]) to cover multiple areas, or "auto" to fit the points.'),
  // Dot count for render="dots" coverage when no explicit points are supplied.
  scatter: z.number().int().min(10).max(400).optional(),
  // Explicit places. Required for "pins"/"labels"; optional for "dots" coverage.
  points: z.array(MapPoint).max(80).optional(),
  // Overlay the client logo in the top-left of the map (co-brands the reach view,
  // e.g. "Client X, live across N sites"). Falls back to the Bright.Blue mark if
  // no client logo is set on the deck.
  showLogo: z.boolean().optional().describe('true = show the client logo in the top-left corner of the map'),
})

export const QuoteContent = z.object({
  lead: z.string().min(1).describe('Opening of the quote before the accent'),
  accent: z.string().min(1).describe('Gradient phrase inside the quote'),
  tail: z.string().optional().describe('Remainder of the quote after the accent'),
  body: z.string().min(1).describe('Supporting paragraph under the quote'),
})

export const LogoCloudContent = z.object({
  eyebrow: z.string().min(1),
  titleLead: z.string().min(1),
  titleAccent: z.string().min(1),
  subtitle: z.string().min(1),
  logos: z.array(z.string().min(1)).min(3).max(12).describe('Location / partner names shown as tiles'),
})

export const TeamContent = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  pillars: z.array(z.object({
    icon: IconName.optional(),
    title: z.string().min(1),
    points: z.array(z.string().min(1)).min(2).max(6),
  })).min(2).max(4),
})

export const PricingContent = z.object({
  eyebrow: z.string().min(1),
  titleLead: z.string().min(1),
  titleAccent: z.string().min(1),
  tiers: z.array(z.object({
    name: z.string().min(1),
    price: z.string().min(1),
    per: z.string().min(1),
    features: z.array(z.string().min(1)).min(1).max(6),
    featured: z.boolean().optional(),
  })).min(2).max(4),
})

export const ChartContent = z.object({
  eyebrow: z.string().min(1),
  titleLead: z.string().min(1),
  titleAccent: z.string().min(1),
  subtitle: z.string().min(1),
  bars: z.array(z.object({
    label: z.string().min(1),
    value: z.number().describe('Numeric magnitude used for bar height'),
    display: z.string().min(1).describe('Formatted value shown above the bar, e.g. "£672K"'),
  })).min(2).max(5),
})

export const TableContent = z.object({
  eyebrow: z.string().min(1),
  titleLead: z.string().min(1),
  titleAccent: z.string().min(1),
  columns: z.tuple([z.string().min(1), z.string().min(1), z.string().min(1)]).describe('[feature header, column A, column B]'),
  rows: z.array(z.object({
    feature: z.string().min(1),
    a: z.string().min(1),
    b: z.string().min(1),
  })).min(2).max(8),
})

// ---- Registry: id -> { schema, default, meta } ---------------------------

export const SLIDE_SCHEMAS = {
  'title': TitleContent,
  'section-divider': SectionDividerContent,
  'agenda': AgendaContent,
  'statement': StatementContent,
  'bullets': BulletsContent,
  'two-column': TwoColumnContent,
  'big-stat': BigStatContent,
  'stat-grid': StatGridContent,
  'comparison': ComparisonContent,
  'before-after': BeforeAfterContent,
  'process': ProcessContent,
  'timeline': TimelineContent,
  'feature-cards': FeatureCardsContent,
  'image-text-split': ImageTextSplitContent,
  'photo-hero-left': PhotoHeroLeftContent,
  'photo-hero-right': PhotoHeroRightContent,
  'map': MapContent,
  'quote': QuoteContent,
  'logo-cloud': LogoCloudContent,
  'team': TeamContent,
  'pricing': PricingContent,
  'chart': ChartContent,
  'table': TableContent,
  'cta': CTAContent,
} as const

export type SchemaSlideId = keyof typeof SLIDE_SCHEMAS
export type SlideContent<K extends SchemaSlideId> = z.infer<(typeof SLIDE_SCHEMAS)[K]>

export const SLIDE_META: Record<SchemaSlideId, { name: string; description: string; whenToUse: string }> = {
  'title': { name: 'Title', description: 'Cover / opener with headline and presenter meta.', whenToUse: 'Always the first slide of a deck.' },
  'section-divider': { name: 'Section Divider', description: 'Big numbered break between sections.', whenToUse: 'To separate major parts of a longer deck.' },
  'agenda': { name: 'Agenda', description: 'Numbered agenda / table of contents.', whenToUse: 'Early, to set expectations for what will be covered.' },
  'statement': { name: 'Statement (before → after)', description: 'A strike REVEAL of two short VALUES of the same kind: an old value struck through, replaced by a highlighted new value, under a fixed framing title.', whenToUse: 'ONLY for a genuine quantitative/factual before→after where one value literally replaces another of the SAME KIND — time ("16 months" → "2 weeks"), money ("£0" → "£2.4M"), count ("6 steps" → "1 tap"). Do NOT use it for a rhetorical, conceptual or opinion contrast (e.g. "Disconnected" → "Broken"), a problem statement, or two unrelated words. For a bold problem/thesis line use "section-divider" or "quote"; for one hero number use "big-stat".' },
  'bullets': { name: 'Bullets', description: '2-6 points, each with an icon, bold title and a short supporting line.', whenToUse: 'For a clean list of 2-6 supporting points. Keep each desc short.' },
  'two-column': { name: 'Two Column', description: 'Copy on the left, a ticked list panel on the right.', whenToUse: 'To pair a narrative with a supporting checklist.' },
  'big-stat': { name: 'Big Stat', description: 'A single hero metric, centre stage.', whenToUse: 'To dramatise one headline number.' },
  'stat-grid': { name: 'Stat Grid', description: '2-4 key metrics in a row.', whenToUse: 'To show several related figures together.' },
  'comparison': { name: 'Comparison', description: 'Two columns side by side. variant="contrast" (default) sets old vs new (crosses vs ticks); variant="positive" shows TWO positive groupings, both good. Icons optional (showIcons).', whenToUse: 'variant="contrast" to weigh an old approach against a new one across several points. variant="positive" for two good things side by side (e.g. two revenue streams, two audiences) where neither is the loser.' },
  'before-after': { name: 'Before / After (image slider)', description: 'Two images in one well with a drag-to-wipe handle: a "before" image revealing an "after" image, each with a short corner label.', whenToUse: 'ONLY for a genuine visual before→after where TWO comparable images (same subject/scene, or old vs new look) can BOTH be sourced from the imagery library — e.g. a traditional vending machine vs a connected retail unit. If you cannot source both images, use "comparison" (text columns) instead. Not for text-only contrasts.' },
  'process': { name: 'Process', description: 'Numbered phase steps along a connecting line.', whenToUse: 'To show a sequential rollout or method in 2-5 steps.' },
  'timeline': { name: 'Timeline', description: 'Roadmap / milestones across a horizontal line.', whenToUse: 'To lay out phased milestones over time.' },
  'feature-cards': { name: 'Feature Cards', description: 'A 3-6 card grid of features/benefits with icons.', whenToUse: 'To present several capabilities or revenue streams as cards.' },
  'image-text-split': { name: 'Image + Text Split', description: 'Copy on the left, a highlighted list panel on the right.', whenToUse: 'For a focused topic with a small supporting checklist.' },
  'photo-hero-left': { name: 'Photo Hero (Left)', description: 'Full-bleed photo on the left, copy panel on the right: eyebrow, headline, divider, then a paragraph and/or bullets.', whenToUse: 'A cinematic statement slide. Provide body (paragraph) and/or points (bullets) after the headline.' },
  'photo-hero-right': { name: 'Photo Hero (Right)', description: 'Full-bleed photo on the right, copy panel on the left: eyebrow, headline, divider, then a paragraph and/or bullets. Same structure as Photo Hero (Left).', whenToUse: 'A cinematic slide, mirrored. Provide body (paragraph) and/or points (bullets) after the headline.' },
  'map': { name: 'Map', description: 'Real dark-themed map (Leaflet) beside reach copy (eyebrow, title, divider, then figures or bullets). Three render styles: dots (coverage field), pins (specific highlighted sites), labels (name + value per site). Frames to a region (uk/us/europe/world) or auto-fits to the points.', whenToUse: 'To show geographic footprint/reach. render=dots for "all our locations" coverage — set region to the area(s) the story is about: a single region (e.g. region="us"), or an ARRAY to cover several at once (e.g. region=["uk","us"] for "clubs across the UK and US"), plus scatter. render=pins to highlight specific named sites (give points with lat/lng); render=labels to show a metric per site (points with place + value). For a single other country, give 15-30 representative city points with lat/lng, region="auto", and scatter set to the dot count. Copy: provide stats (figures) OR bullets.' },
  'quote': { name: 'Quote', description: 'Large pull-quote with a supporting paragraph.', whenToUse: 'For a memorable framing statement or testimonial.' },
  'logo-cloud': { name: 'Logo Cloud', description: 'A grid of location / partner name tiles.', whenToUse: 'To show a footprint of venues or partners.' },
  'team': { name: 'Benefit Pillars', description: 'High-impact gradient pillar cards, each with an icon, title and bullet list.', whenToUse: 'For a punchy, high-impact summary of 2-4 grouped benefits or workstreams.' },
  'pricing': { name: 'Pricing / Commercials', description: '2-4 commercial tiers, one optionally highlighted.', whenToUse: 'To present commercial terms or pricing options.' },
  'chart': { name: 'Bar Chart', description: 'Animated 2-5 bar comparison chart.', whenToUse: 'To visualise a small numeric comparison (e.g. current vs proposed).' },
  'table': { name: 'Comparison Table', description: 'A 3-column feature matrix (feature + two options).', whenToUse: 'To compare two options across many attributes.' },
  'cta': { name: 'Call to Action', description: 'Closing / thank-you with next steps and contact.', whenToUse: 'Always the final slide of a deck.' },
}

// Defaults double as the gallery content AND as worked examples for the AI.
export const SLIDE_DEFAULTS: { [K in SchemaSlideId]: SlideContent<K> } = {
  'title': {
    headline: 'Transforming vending into',
    accent: 'Connected Retail',
    lead: "A multi-revenue model for Decorum's highest-performing locations across Heathrow, Gatwick, Luton and Merlin Estate.",
    footerLabel: 'Prepared for Decorum',
    year: '2026',
  },
  'section-divider': {
    number: '01',
    titleLead: 'The',
    titleAccent: 'opportunity',
    lead: "Convert Decorum's top locations into multi-revenue Connected Retail assets — without reducing existing product sales income.",
  },
  'agenda': {
    eyebrow: 'Agenda',
    title: "What we'll cover today",
    items: [
      { title: 'Executive summary', desc: "Commercialising Decorum's top locations with Connected Retail." },
      { title: 'Traditional vs Connected', desc: 'Why multi-revenue unlocks more value per location.' },
      { title: 'Revenue streams & impact', desc: 'Listing fees, retail media, data, and the 77% uplift.' },
      { title: 'Opportunity & commercials', desc: '112-asset rollout, revenue share, and Decorum income.' },
      { title: 'Deployment & next steps', desc: 'Phased rollout, category management, and partnership benefits.' },
    ],
  },
  'statement': {
    eyebrow: 'Retail media',
    title: 'Time from plan to retail sales',
    oldValue: '16 months',
    newValue: '2 weeks.',
  },
  'bullets': {
    eyebrow: 'Why Decorum wins',
    title: 'Connected Retail amplifies what you do well',
    points: [
      { icon: 'trending-up', title: 'More revenue', desc: '77% uplift per location via Connected Retail economics.' },
      { icon: 'shield-check', title: 'Protected existing income', desc: 'Current physical product sales fully supported — no cannibalisation.' },
      { icon: 'sparkles', title: 'Better customer experience', desc: 'Modern digital retail interactions, offers, and ongoing engagement.' },
      { icon: 'building', title: 'Stronger venue proposition', desc: 'More value for airports and Merlin attractions.' },
      { icon: 'handshake', title: 'New brand partnerships', desc: 'Richer activation platform for brands beyond the shelf.' },
      { icon: 'trophy', title: 'Competitive advantage', desc: 'Differentiates Decorum from traditional vending operators.' },
    ],
  },
  'big-stat': {
    eyebrow: 'Financial impact',
    value: '77%',
    label: 'more revenue per location',
    detail: 'Each Connected Retail location generates 77.4% more revenue than current traditional vending income — with no reduction in existing physical product sales.',
  },
  'stat-grid': {
    eyebrow: 'By the numbers',
    title: 'Financial impact at a',
    titleAccent: 'glance',
    stats: [
      { value: '77.4%', label: 'Revenue uplift', sub: 'per machine vs traditional' },
      { value: '£43.3K', label: 'Incremental income', sub: 'per month across rollout' },
      { value: '£520K', label: 'Annual uplift', sub: 'across the 112-machine estate' },
      { value: '£280K', label: 'Decorum CAPEX', sub: 'investment required' },
    ],
  },
  'two-column': {
    eyebrow: 'The estate',
    titleLead: 'Convert the top',
    titleAccent: '20%',
    titleTail: 'of the estate.',
    paragraphs: [
      'Decorum currently has 560 machines across airports and Merlin Estate. We propose converting the highest-performing locations into 112 Connected Retail assets, replacing traditional machines with Bright Blue technology.',
      'Active monetisation across every stream — plus identification of exclusive storefront opportunities.',
    ],
    panelTitle: 'Monetisation streams',
    panelItems: ['Listing sales', 'Retail media & DOOH', 'Online product sales', 'Data & analytics', 'Local services', 'Exclusive storefronts'],
  },
  'comparison': {
    eyebrow: 'Before & after',
    title: 'Two models. One clear winner.',
    leftTitle: 'Traditional vending',
    leftItems: [
      'Product sales as the only income line',
      'No brand listing or media revenue',
      'No customer data or insights',
      'One-off transaction, then relationship ends',
    ],
    rightTitle: 'Connected Retail',
    rightItems: [
      'Multiple revenue streams per location',
      'Recurring listing fees and digital ads',
      'Actionable data and sponsorship activations',
      'Ongoing digital engagement after purchase',
    ],
  },
  'before-after': {
    eyebrow: 'Before & after',
    title: 'Two models. One clear winner.',
    beforeLabel: 'Traditional vending',
    afterLabel: 'Connected Retail',
    beforeImage: '/brand/photo-hero-left.jpg',
    afterImage: '/brand/photo-hero-right.jpg',
  },
  'process': {
    eyebrow: 'Deployment',
    title: 'Four-phase rollout',
    steps: [
      { icon: 'map-pin', title: 'Confirm locations', desc: 'Agree sites and category plan for the top 20%.' },
      { icon: 'plane', title: 'Airport deployment', desc: 'Roll out at Heathrow, Gatwick, and Luton.' },
      { icon: 'ferris-wheel', title: 'Merlin deployment', desc: 'Deploy across Merlin Entertainment venues.' },
      { icon: 'line-chart', title: 'Review & scale', desc: 'Commercial review, then expand across the wider estate.' },
    ],
  },
  'timeline': {
    eyebrow: 'Roadmap',
    title: 'Deployment timeline',
    milestones: [
      { phase: 'Phase 1', title: 'Locations & category plan', desc: 'Confirm sites and agree venue-specific assortments.' },
      { phase: 'Phase 2', title: 'Airport rollout', desc: 'Deploy Connected Retail at Heathrow, Gatwick, Luton.' },
      { phase: 'Phase 3', title: 'Merlin Entertainment', desc: 'Extend the model across Merlin Estate attractions.' },
      { phase: 'Phase 4', title: 'Scale the estate', desc: 'Commercial review and expansion to wider Decorum sites.' },
    ],
  },
  'feature-cards': {
    eyebrow: 'Monetisation',
    title: 'Unlock new revenue streams',
    features: [
      { icon: 'monitor-play', title: 'Retail media & DOOH', desc: 'Digital advertising on Connected Retail assets, reaching high-value audiences.' },
      { icon: 'badge-pound', title: 'Brand listing fees', desc: 'Recurring income as brands pay to list products on the platform.' },
      { icon: 'shopping-cart', title: 'Digital sales & e-commerce', desc: 'Online product sales that extend beyond the physical machine.' },
      { icon: 'chart-spline', title: 'Data insights', desc: 'Actionable customer data sold or used for commercial optimisation.' },
      { icon: 'handshake', title: 'Sponsorship activations', desc: 'Integrated brand activations woven into the retail experience.' },
      { icon: 'store', title: 'Enhanced physical sales', desc: 'Maintain and grow existing product revenue with no cannibalisation.' },
    ],
  },
  'image-text-split': {
    eyebrow: 'Next steps',
    titleLead: 'Category',
    titleAccent: 'management',
    body: 'Bespoke planograms for every venue — Heathrow terminals to Merlin attractions — so every placement is intentional, data-driven, and commercially optimised.',
    pill: 'Aligned with LOI planogram approach',
    panelTitle: 'Operating focus',
    panelPoints: [
      'Venue-specific planograms by footfall and demographics',
      'Optimise category mix for sales density and margin',
      'Introduce premium and challenger brands',
      'Guest SKUs and seasonal campaigns by venue calendar',
    ],
  },
  'photo-hero-left': {
    eyebrow: 'In market',
    headlineLead: 'Connected Retail,',
    headlineAccent: 'live',
    body: 'Premium hardware. Retail media. Instant engagement — in the environments Decorum already operates.',
  },
  'photo-hero-right': {
    eyebrow: 'Customer experience',
    headlineLead: 'Beyond the',
    headlineAccent: 'transaction',
    body: "Digital engagement, personalised offers and brand storytelling — a premium retail experience aligned with Decorum's estate.",
    points: [
      'High-impact retail media on every unit',
      'Interactive brand activations',
      'Ongoing digital relationship after purchase',
      'Modern experience for airports and attractions',
    ],
  },
  'map': {
    eyebrow: 'Our scale',
    title: 'Incremental reach your grocery plan never touches.',
    stats: [
      { n: '800+', l: 'connected devices' },
      { n: '6.5M+', l: 'gym visits monthly' },
      { n: '5.5M+', l: 'air & rail passengers monthly' },
      { n: '160k+', l: 'students on campus' },
    ],
    footnote: "It adds budget. It doesn't cannibalise the plan.",
    render: 'dots',
    region: 'uk',
    scatter: 240,
  },
  'quote': {
    lead: "The Connected Retail model doesn't replace what Decorum does well —",
    accent: 'it amplifies it',
    tail: '.',
    body: "Combining Decorum's operational excellence with Bright Blue's monetisation platform turns every location into a multi-revenue destination — stronger financials, happier venue partners, and a future-proof retail proposition.",
  },
  'logo-cloud': {
    eyebrow: 'Deployment footprint',
    titleLead: 'Premium locations across',
    titleAccent: "Decorum's estate",
    subtitle: 'Connected Retail deployed where footfall and brand value are highest.',
    logos: ['Heathrow', 'Gatwick', 'Luton', 'Merlin Estate', 'Airside retail', 'Landside retail', 'Attractions', 'Premium venues'],
  },
  'team': {
    eyebrow: 'Partnership',
    title: 'Partnership benefits summary',
    pillars: [
      { icon: 'trending-up', title: 'Revenue uplift & new income', points: ['77% uplift vs traditional vending', 'Listings, media, sponsorship, data', 'No cannibalisation of physical sales', 'Predictable recurring brand revenue'] },
      { icon: 'sparkles', title: 'Superior customer experience', points: ['Premium retail aligned to Decorum', 'Personalised offers and rewards', 'Relationship beyond the purchase', 'Positions Decorum as an innovator'] },
      { icon: 'shield', title: 'Scalable, low-risk model', points: ['End-to-end Bright Blue operation', 'Investment structure per LOI terms', 'Phased pilot-to-estate expansion', 'Foundation for long-term growth'] },
    ],
  },
  'pricing': {
    eyebrow: 'Commercials',
    titleLead: 'Partnership',
    titleAccent: 'economics',
    tiers: [
      { name: 'Activation fee', price: '£2,500', per: 'partner rate (was £5,500)', features: ['Reduced fee for partnership model', 'Aligned to LOI investment structure', 'Supports phased estate rollout'], featured: false },
      { name: 'Physical sales', price: '92.5–97.5%', per: 'to Decorum + Venue', features: ['Gross revenue minus taxes', 'Bright Blue: 2.5–7.5%', 'Existing income protected'], featured: true },
      { name: 'New streams', price: '30–40%', per: 'to Decorum + Venue', features: ['Listings, media, online, local ads', '60/40 when Decorum leads the sale', 'Data & studio typically 30%'], featured: false },
    ],
  },
  'chart': {
    eyebrow: 'Annual income',
    titleLead: '112-machine rollout —',
    titleAccent: 'estate comparison',
    subtitle: 'Top 20% of the 560-machine estate. Current traditional income vs Connected Retail with Bright Blue.',
    bars: [
      { label: 'Current', value: 672, display: '£672K' },
      { label: 'With Bright Blue', value: 1192, display: '£1.19M' },
    ],
  },
  'table': {
    eyebrow: 'Comparison',
    titleLead: 'Traditional Vending vs',
    titleAccent: 'Connected Retail',
    columns: ['Feature', 'Traditional Vending', 'Connected Retail'],
    rows: [
      { feature: 'Revenue source', a: 'Product sales only', b: 'Multiple revenue streams' },
      { feature: 'Brand listing fees', a: 'None', b: 'Recurring income' },
      { feature: 'Retail media / advertising', a: 'None', b: 'Digital ad revenue' },
      { feature: 'Customer data insights', a: 'None', b: 'Actionable' },
      { feature: 'Sponsorship activations', a: 'None', b: 'Integrated activations' },
      { feature: 'Customer relationship', a: 'Single transaction', b: 'Ongoing digital engagement' },
      { feature: 'Revenue uplift potential', a: 'Baseline', b: '+55% per location' },
    ],
  },
  'cta': {
    eyebrow: 'Thank you',
    headline: 'The future of retail is',
    accent: 'Connected Retail',
    tagline: 'Higher revenues. Richer experiences. Stronger venue partnerships.',
    email: 'info@bright.blue',
  },
}

// ---- Deck schema + validation --------------------------------------------

// Generation schema: exactly the slides the AI may produce (no custom-image).
export const GeneratedDeckSlideSchema = z.discriminatedUnion('id', [
  z.object({ id: z.literal('title'), content: TitleContent }),
  z.object({ id: z.literal('section-divider'), content: SectionDividerContent }),
  z.object({ id: z.literal('agenda'), content: AgendaContent }),
  z.object({ id: z.literal('statement'), content: StatementContent }),
  z.object({ id: z.literal('bullets'), content: BulletsContent }),
  z.object({ id: z.literal('two-column'), content: TwoColumnContent }),
  z.object({ id: z.literal('big-stat'), content: BigStatContent }),
  z.object({ id: z.literal('stat-grid'), content: StatGridContent }),
  z.object({ id: z.literal('comparison'), content: ComparisonContent }),
  z.object({ id: z.literal('before-after'), content: BeforeAfterContent }),
  z.object({ id: z.literal('process'), content: ProcessContent }),
  z.object({ id: z.literal('timeline'), content: TimelineContent }),
  z.object({ id: z.literal('feature-cards'), content: FeatureCardsContent }),
  z.object({ id: z.literal('image-text-split'), content: ImageTextSplitContent }),
  z.object({ id: z.literal('photo-hero-left'), content: PhotoHeroLeftContent }),
  z.object({ id: z.literal('photo-hero-right'), content: PhotoHeroRightContent }),
  z.object({ id: z.literal('map'), content: MapContent }),
  z.object({ id: z.literal('quote'), content: QuoteContent }),
  z.object({ id: z.literal('logo-cloud'), content: LogoCloudContent }),
  z.object({ id: z.literal('team'), content: TeamContent }),
  z.object({ id: z.literal('pricing'), content: PricingContent }),
  z.object({ id: z.literal('chart'), content: ChartContent }),
  z.object({ id: z.literal('table'), content: TableContent }),
  z.object({ id: z.literal('cta'), content: CTAContent }),
])
export type GeneratedDeckSlide = z.infer<typeof GeneratedDeckSlideSchema>

export const DeckSchema = z.object({
  title: z.string().min(1),
  slides: z.array(GeneratedDeckSlideSchema).min(1).max(40),
})

// Per-presentation branding. Bright.Blue is always the agency co-brand; the CLIENT
// logo is dynamic — inferred/fetched on generation and overridable in review. Not
// part of the AI generation schema (set server-side / by the user), stored on the deck.
export const BrandSchema = z.object({
  clientName: z.string().optional().describe('The company this deck is prepared for'),
  clientLogoUrl: z.string().optional().describe('URL/path to the client logo (R2 or remote)'),
})
export type Brand = z.infer<typeof BrandSchema>

// Deep Research provenance: the wiki notes that grounded this deck. Populated
// server-side only when the user enables the toggle; absent otherwise. Not part
// of the AI generation schema.
export const WikiNoteSchema = z.object({
  path: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
})
export type WikiNote = z.infer<typeof WikiNoteSchema>
export const ResearchSchema = z.object({
  repo: z.string().optional().describe('owner/repo the notes came from'),
  branch: z.string().optional(),
  notes: z.array(WikiNoteSchema),
})
export type Research = z.infer<typeof ResearchSchema>

// Storage/render schema: everything above PLUS super-admin custom-image slides.
export const CustomImageSlideSchema = z.object({ id: z.literal('custom-image'), content: CustomImageContent })
export const DeckSlideSchema = z.union([GeneratedDeckSlideSchema, CustomImageSlideSchema])
export type DeckSlide = z.infer<typeof DeckSlideSchema>

export const StoredDeckSchema = z.object({
  title: z.string().min(1),
  brand: BrandSchema.optional(),
  research: ResearchSchema.optional(),
  slides: z.array(DeckSlideSchema).min(1).max(60),
})
export type Deck = z.infer<typeof StoredDeckSchema>

export const SCHEMA_SLIDE_IDS = Object.keys(SLIDE_SCHEMAS) as SchemaSlideId[]

export function isSchemaSlideId(id: string): id is SchemaSlideId {
  return id in SLIDE_SCHEMAS
}
