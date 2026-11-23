export type LocationStatus = 'healthy' | 'at-risk' | 'critical'

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
    id: 'loc-001',
    name: 'Downtown Branch',
    area: 'City Center',
    code: 'STORE-001',
    x: 392,
    y: 128,
    status: 'at-risk',
    rating: 4.3,
    reviews: 41,
    pending: 2,
    profile: 'Verified',
    note: 'AI Location Studio score: 78/100 — 13 fields incomplete',
  },
  {
    id: 'loc-002',
    name: 'Westside Clinic',
    area: 'Medical District',
    code: 'STORE-002',
    x: 512,
    y: 252,
    status: 'critical',
    rating: 3.9,
    reviews: 27,
    pending: 3,
    profile: 'Verified',
    note: '3 unanswered reviews · Sentiment needs attention',
  },
  {
    id: 'loc-003',
    name: 'North Mall',
    area: 'Shopping District',
    code: 'STORE-003',
    x: 488,
    y: 58,
    status: 'at-risk',
    rating: 4.6,
    reviews: 33,
    pending: 0,
    profile: 'Edit pending',
    note: 'Profile Guard: hours edit flagged for review',
  },
  {
    id: 'loc-004',
    name: 'Riverside Office',
    area: 'Riverside',
    code: 'STORE-004',
    x: 204,
    y: 206,
    status: 'healthy',
    rating: 4.8,
    reviews: 58,
    pending: 0,
    profile: 'Verified',
    note: 'Listings health: 98% · "Friendly staff" top LOVED theme',
  },
  {
    id: 'loc-005',
    name: 'Eastside Centre',
    area: 'Downtown',
    code: 'STORE-005',
    x: 300,
    y: 150,
    status: 'healthy',
    rating: 4.7,
    reviews: 46,
    pending: 0,
    profile: 'Verified',
    note: 'All reviews answered · AI Score 85/100',
  },
  {
    id: 'loc-006',
    name: 'Central Plaza',
    area: 'Uptown',
    code: 'STORE-006',
    x: 236,
    y: 288,
    status: 'healthy',
    rating: 4.9,
    reviews: 39,
    pending: 0,
    profile: 'Verified',
    note: 'Local post published yesterday · Profile complete',
  },
  {
    id: 'loc-007',
    name: 'Harbor View',
    area: 'Harbor District',
    code: 'STORE-007',
    x: 228,
    y: 352,
    status: 'healthy',
    rating: 4.8,
    reviews: 22,
    pending: 0,
    profile: 'Verified',
    note: 'Profile complete · Minor location',
    minor: true,
  },
  {
    id: 'loc-008',
    name: 'Lakeside Facility',
    area: 'Lakeside',
    code: 'STORE-008',
    x: 400,
    y: 238,
    status: 'healthy',
    rating: 4.6,
    reviews: 30,
    pending: 0,
    profile: 'Verified',
    note: 'All reviews answered · Minor location',
    minor: true,
  },
  {
    id: 'loc-009',
    name: 'Hilltop Location',
    area: 'Hilltop',
    code: 'STORE-009',
    x: 424,
    y: 184,
    status: 'healthy',
    rating: 4.5,
    reviews: 25,
    pending: 1,
    profile: 'Verified',
    note: '1 reply drafted for approval · Minor location',
    minor: true,
  },
  {
    id: 'loc-010',
    name: 'Valley Outpost',
    area: 'Valley',
    code: 'STORE-010',
    x: 262,
    y: 84,
    status: 'healthy',
    rating: 4.7,
    reviews: 35,
    pending: 0,
    profile: 'Verified',
    note: 'Profile complete · Minor location',
    minor: true,
  },
  {
    id: 'loc-011',
    name: 'Summit Site',
    area: 'Summit',
    code: 'STORE-011',
    x: 306,
    y: 30,
    status: 'healthy',
    rating: 4.8,
    reviews: 29,
    pending: 0,
    profile: 'Verified',
    note: 'Profile complete · Minor location',
    minor: true,
  },
  {
    id: 'loc-012',
    name: 'Parkside Unit',
    area: 'Parkside',
    code: 'STORE-012',
    x: 214,
    y: 142,
    status: 'healthy',
    rating: 4.9,
    reviews: 44,
    pending: 0,
    profile: 'Verified',
    note: 'Local post scheduled · Minor location',
    minor: true,
  },
]

export const locationById = (id: string) =>
  sampleLocations.find((l) => l.id === id || l.name.toLowerCase() === id.toLowerCase()) ??
  sampleLocations[0]

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
  'at-risk': {
    label: 'At risk',
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
    locationId: 'loc-001',
    source: 'AI Location Studio',
    rating: 5,
    author: 'Ahana',
    time: 'Just now',
    text: 'AI Score for Downtown Branch is 78/100. 13 fields incomplete including WhatsApp URL, Special Hours, Q&A.',
    sentiment: 'Positive',
    topic: 'AI Score',
    insight: 'AI Location Studio nightly audit flagged 13 incomplete fields at Downtown Branch — fixing these could boost local visibility.',
    action: 'Open AI Location Studio',
  },
  {
    locationId: 'loc-004',
    source: 'Profile Guard',
    rating: 5,
    author: 'Ahana',
    time: '2m ago',
    text: 'Profile Guard flagged an edit to hours at Riverside Office for review.',
    sentiment: 'Positive',
    topic: 'Profile Guard',
    insight: 'Profile Guard caught an hours change at Riverside Office and flagged it for team review.',
    action: 'Review Profile Guard log',
  },
  {
    locationId: 'loc-002',
    source: 'Reviews',
    rating: 2,
    author: 'Anil P.',
    time: '11m ago',
    text: 'Called twice to reschedule and nobody picked up. Had to come in person to change the slot.',
    sentiment: 'Negative',
    topic: 'Phone access',
    insight: 'Westside Clinic has 3 unanswered reviews. AI-assisted replies active. Sentiment needs attention.',
    action: 'Open Westside Clinic queue',
  },
]

export type Conversation = {
  id: string
  channel: 'Google review' | 'Instagram comment' | 'Facebook Messenger' | 'Email' | 'Play Store review' | 'App Store review' | 'Ad comment'
  locationId: string | null
  author: string
  time: string
  rating?: number
  text: string
  sentiment: 'Negative' | 'Neutral' | 'Mixed' | 'Positive'
  topics: string[]
  draft: string
  sentimentTheme?: 'LOVED' | 'ASKED ABOUT' | 'NEEDS WORK'
}

export const sampleConversations: Conversation[] = [
  {
    id: 'c1',
    channel: 'Google review',
    locationId: 'loc-002',
    author: 'Anil P.',
    time: '09:42',
    rating: 2,
    text: 'Called twice to reschedule and nobody picked up. Had to come in person to change the slot.',
    sentiment: 'Negative',
    topics: ['Phone access', 'Appointment'],
    draft:
      'Hi Anil, sorry about the phone wait — that\'s not the experience we want. We\'ve shared this with the Westside Clinic team and they\'ll call you back within the hour to reschedule.',
    sentimentTheme: 'NEEDS WORK',
  },
  {
    id: 'c2',
    channel: 'Instagram comment',
    locationId: 'loc-004',
    author: '@meera.k',
    time: '09:15',
    text: 'Do you take walk-ins on Sunday mornings at the Riverside Office?',
    sentiment: 'Neutral',
    topics: ['Hours', 'Walk-ins'],
    draft:
      'Hi Meera! Riverside Office is open Sunday mornings and walk-ins are welcome, though booking ahead keeps waits short. Send us a DM and we\'ll help you pick a slot.',
    sentimentTheme: 'ASKED ABOUT',
  },
  {
    id: 'c3',
    channel: 'Facebook Messenger',
    locationId: 'loc-001',
    author: 'Rhea S.',
    time: '08:51',
    text: 'Waited almost 40 minutes past my appointment. Staff were kind, but nobody told us about the delay.',
    sentiment: 'Mixed',
    topics: ['Wait time', 'Communication'],
    draft:
      'Hi Rhea, thank you for telling us — and we\'re sorry about the wait at Downtown Branch. You should have been kept informed. We\'ve shared this with the centre team, and we\'d love the chance to make your next visit smoother.',
    sentimentTheme: 'NEEDS WORK',
  },
  {
    id: 'c4',
    channel: 'Email',
    locationId: 'loc-005',
    author: 'Kabir M.',
    time: '08:30',
    rating: 5,
    text: 'In and out in twenty minutes. The front desk team were genuinely friendly and explained everything.',
    sentiment: 'Positive',
    topics: ['Staff', 'Speed'],
    draft:
      'Thank you Kabir! We\'re thrilled the Eastside Centre team made your visit smooth. We\'ll pass along the kind words about the front desk.',
    sentimentTheme: 'LOVED',
  },
  {
    id: 'c5',
    channel: 'Play Store review',
    locationId: null,
    author: 'Dev R.',
    time: '08:10',
    rating: 4,
    text: 'Booking in the app is easy. Reminder notification arrived an hour after my slot, though.',
    sentiment: 'Mixed',
    topics: ['App', 'Reminders'],
    draft:
      'Thanks Dev — glad booking feels easy. A late reminder isn\'t the experience we want, so we\'ve passed this to the app team to look into.',
    sentimentTheme: 'ASKED ABOUT',
  },
  {
    id: 'c6',
    channel: 'App Store review',
    locationId: null,
    author: 'Priya K.',
    time: '07:55',
    rating: 5,
    text: 'Love the new microsite feature — found my local branch hours instantly without calling.',
    sentiment: 'Positive',
    topics: ['Microsite', 'Hours'],
    draft:
      'Thanks Priya! The microsite is built straight from your GBP data so it\'s always in sync. Glad it saved you a call.',
    sentimentTheme: 'LOVED',
  },
  {
    id: 'c7',
    channel: 'Ad comment',
    locationId: 'loc-006',
    author: 'Arjun S.',
    time: '07:40',
    text: 'Saw your ad for Central Plaza — is the 3km radius accurate for catchment?',
    sentiment: 'Neutral',
    topics: ['Ads', 'Radius targeting'],
    draft:
      'Hi Arjun! Yes, Synapse Ads targets a 3km radius around Central Plaza. Leads route to the nearest branch automatically. Happy to share the catchment map.',
    sentimentTheme: 'ASKED ABOUT',
  },
]

export type Campaign = {
  id: string
  type: 'Synapse Ads (Google Ads)' | 'Synapse Ads (Meta Lead Ads)' | 'AI Creative Studio' | 'SPARK'
  locationId: string
  radiusKm: number
  status: 'Active' | 'Draft'
  pacing: number
  leads: number | null
}

export const sampleCampaigns: Campaign[] = [
  { id: 'p1', type: 'Synapse Ads (Google Ads)', locationId: 'loc-001', radiusKm: 3, status: 'Active', pacing: 62, leads: null },
  { id: 'p2', type: 'Synapse Ads (Meta Lead Ads)', locationId: 'loc-004', radiusKm: 3, status: 'Active', pacing: 48, leads: 14 },
  { id: 'p3', type: 'AI Creative Studio', locationId: 'loc-005', radiusKm: 2, status: 'Active', pacing: 71, leads: null },
  { id: 'p4', type: 'SPARK', locationId: 'loc-002', radiusKm: 3, status: 'Draft', pacing: 0, leads: null },
]