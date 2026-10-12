export type LocationStatus = 'healthy' | 'attention' | 'critical'

export type SampleLocation = {
  id: string
  name: string
  area: string
  code: string
  x: number
  y: number
  status: LocationStatus
  rating: number
  reviews: number
  pending: number
  profile: 'Verified' | 'Edit pending'
  note: string
  minor?: boolean
}

export const sampleLocations: SampleLocation[] = [
  {
    id: 'powai',
    name: 'Powai',
    area: 'Hiranandani Gardens',
    code: 'LOC-014',
    x: 392,
    y: 128,
    status: 'attention',
    rating: 4.3,
    reviews: 41,
    pending: 2,
    profile: 'Verified',
    note: 'Wait-time mentions rising this month',
  },
  {
    id: 'vashi',
    name: 'Vashi',
    area: 'Sector 17',
    code: 'LOC-021',
    x: 512,
    y: 252,
    status: 'critical',
    rating: 3.9,
    reviews: 27,
    pending: 3,
    profile: 'Verified',
    note: '3 unanswered reviews · oldest 3 days',
  },
  {
    id: 'thane',
    name: 'Thane',
    area: 'Ghodbunder Road',
    code: 'LOC-009',
    x: 488,
    y: 58,
    status: 'attention',
    rating: 4.6,
    reviews: 33,
    pending: 0,
    profile: 'Edit pending',
    note: 'Google changed Saturday hours',
  },
  {
    id: 'bandra',
    name: 'Bandra West',
    area: 'Hill Road',
    code: 'LOC-002',
    x: 204,
    y: 206,
    status: 'healthy',
    rating: 4.8,
    reviews: 58,
    pending: 0,
    profile: 'Verified',
    note: '“Friendly staff” is the top theme',
  },
  {
    id: 'andheri',
    name: 'Andheri East',
    area: 'Chakala',
    code: 'LOC-005',
    x: 300,
    y: 150,
    status: 'healthy',
    rating: 4.7,
    reviews: 46,
    pending: 0,
    profile: 'Verified',
    note: 'All reviews answered',
  },
  {
    id: 'lowerparel',
    name: 'Lower Parel',
    area: 'Senapati Bapat Marg',
    code: 'LOC-007',
    x: 236,
    y: 288,
    status: 'healthy',
    rating: 4.9,
    reviews: 39,
    pending: 0,
    profile: 'Verified',
    note: 'Local post published yesterday',
  },
  {
    id: 'colaba',
    name: 'Colaba',
    area: 'Causeway',
    code: 'LOC-001',
    x: 228,
    y: 352,
    status: 'healthy',
    rating: 4.8,
    reviews: 22,
    pending: 0,
    profile: 'Verified',
    note: 'Profile complete',
    minor: true,
  },
  {
    id: 'chembur',
    name: 'Chembur',
    area: 'Diamond Garden',
    code: 'LOC-016',
    x: 400,
    y: 238,
    status: 'healthy',
    rating: 4.6,
    reviews: 30,
    pending: 0,
    profile: 'Verified',
    note: 'All reviews answered',
    minor: true,
  },
  {
    id: 'ghatkopar',
    name: 'Ghatkopar',
    area: 'LBS Marg',
    code: 'LOC-018',
    x: 424,
    y: 184,
    status: 'healthy',
    rating: 4.5,
    reviews: 25,
    pending: 1,
    profile: 'Verified',
    note: '1 reply drafted for approval',
    minor: true,
  },
  {
    id: 'malad',
    name: 'Malad',
    area: 'Link Road',
    code: 'LOC-011',
    x: 262,
    y: 84,
    status: 'healthy',
    rating: 4.7,
    reviews: 35,
    pending: 0,
    profile: 'Verified',
    note: 'Profile complete',
    minor: true,
  },
  {
    id: 'borivali',
    name: 'Borivali',
    area: 'Shimpoli',
    code: 'LOC-012',
    x: 306,
    y: 30,
    status: 'healthy',
    rating: 4.8,
    reviews: 29,
    pending: 0,
    profile: 'Verified',
    note: 'Profile complete',
    minor: true,
  },
  {
    id: 'juhu',
    name: 'Juhu',
    area: 'Gulmohar Road',
    code: 'LOC-004',
    x: 214,
    y: 142,
    status: 'healthy',
    rating: 4.9,
    reviews: 44,
    pending: 0,
    profile: 'Verified',
    note: 'Local post scheduled for Friday',
    minor: true,
  },
]

export const locationById = (id: string) => sampleLocations.find((l) => l.id === id) ?? sampleLocations[0]

export const statusMeta: Record<
  LocationStatus,
  { label: string; text: string; bg: string; border: string; dot: string; fill: string }
> = {
  healthy: {
    label: 'Healthy',
    text: 'text-success',
    bg: 'bg-success-subtle',
    border: 'border-success-border',
    dot: 'bg-success',
    fill: 'var(--success-solid)',
  },
  attention: {
    label: 'Needs attention',
    text: 'text-warning',
    bg: 'bg-warning-subtle',
    border: 'border-warning-border',
    dot: 'bg-warning',
    fill: 'var(--warning-solid)',
  },
  critical: {
    label: 'Critical',
    text: 'text-danger',
    bg: 'bg-danger-subtle',
    border: 'border-danger-border',
    dot: 'bg-danger',
    fill: 'var(--danger-solid)',
  },
}

export type HeroScenario = {
  locationId: string
  source: string
  rating: number
  author: string
  time: string
  text: string
  sentiment: 'Negative' | 'Positive'
  topic: string
  insight: string
  action: string
}

export const heroScenarios: HeroScenario[] = [
  {
    locationId: 'powai',
    source: 'Google review',
    rating: 2,
    author: 'Rhea S.',
    time: '2m ago',
    text: 'Waited almost 40 minutes past my appointment. Staff were kind, but nobody told us about the delay.',
    sentiment: 'Negative',
    topic: 'Wait time',
    insight: 'Wait-time mentions at Powai are rising this month while other locations stay flat.',
    action: 'Review draft reply',
  },
  {
    locationId: 'bandra',
    source: 'Google review',
    rating: 5,
    author: 'Kabir M.',
    time: '6m ago',
    text: 'In and out in twenty minutes. The front desk team were genuinely friendly and explained everything.',
    sentiment: 'Positive',
    topic: 'Staff',
    insight: '“Friendly staff” is Bandra West’s strongest theme — a good angle for this week’s local post.',
    action: 'Draft local post',
  },
  {
    locationId: 'vashi',
    source: 'Google review',
    rating: 2,
    author: 'Anil P.',
    time: '11m ago',
    text: 'Called twice to reschedule and nobody picked up. Had to come in person to change the slot.',
    sentiment: 'Negative',
    topic: 'Phone access',
    insight: 'Vashi now has 3 unanswered reviews, the oldest waiting 3 days. Replies are drafted for approval.',
    action: 'Open Vashi queue',
  },
]

export type Conversation = {
  id: string
  channel: 'Google review' | 'Instagram comment' | 'Play Store review'
  locationId: string | null
  author: string
  time: string
  rating?: number
  text: string
  sentiment: 'Negative' | 'Neutral' | 'Mixed'
  topics: string[]
  draft: string
}

export const sampleConversations: Conversation[] = [
  {
    id: 'c1',
    channel: 'Google review',
    locationId: 'powai',
    author: 'Rhea S.',
    time: '09:42',
    rating: 2,
    text: 'Waited almost 40 minutes past my appointment. Staff were kind, but nobody told us about the delay.',
    sentiment: 'Negative',
    topics: ['Wait time', 'Communication'],
    draft:
      'Hi Rhea, thank you for telling us — and we’re sorry about the wait at Powai. You should have been kept informed. We’ve shared this with the centre team, and we’d love the chance to make your next visit smoother.',
  },
  {
    id: 'c2',
    channel: 'Instagram comment',
    locationId: 'bandra',
    author: '@meera.k',
    time: '09:15',
    text: 'Do you take walk-ins on Sunday mornings at the Bandra centre?',
    sentiment: 'Neutral',
    topics: ['Hours'],
    draft:
      'Hi Meera! Bandra West is open Sunday mornings and walk-ins are welcome, though booking ahead keeps waits short. Send us a DM and we’ll help you pick a slot.',
  },
  {
    id: 'c3',
    channel: 'Play Store review',
    locationId: null,
    author: 'Dev R.',
    time: '08:51',
    rating: 4,
    text: 'Booking in the app is easy. Reminder notification arrived an hour after my slot, though.',
    sentiment: 'Mixed',
    topics: ['App', 'Reminders'],
    draft:
      'Thanks Dev — glad booking feels easy. A late reminder isn’t the experience we want, so we’ve passed this to the app team to look into.',
  },
]

export type Campaign = {
  id: string
  type: 'Performance Max' | 'Meta Lead Ads'
  locationId: string
  radiusKm: number
  status: 'Active' | 'Draft'
  pacing: number
  leads: number | null
}

export const sampleCampaigns: Campaign[] = [
  { id: 'p1', type: 'Performance Max', locationId: 'powai', radiusKm: 3, status: 'Active', pacing: 62, leads: null },
  { id: 'p2', type: 'Meta Lead Ads', locationId: 'bandra', radiusKm: 3, status: 'Active', pacing: 48, leads: 14 },
  { id: 'p3', type: 'Performance Max', locationId: 'andheri', radiusKm: 2, status: 'Active', pacing: 71, leads: null },
  { id: 'p4', type: 'Meta Lead Ads', locationId: 'vashi', radiusKm: 3, status: 'Draft', pacing: 0, leads: null },
]
