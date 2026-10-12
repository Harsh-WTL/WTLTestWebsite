export type DemoRequest = {
  name: string
  email: string
  company: string
  locations: string
  message: string
}

export type DemoRequestResult =
  | { status: 'sent' }
  | { status: 'not-configured' }
  | { status: 'error'; message: string }

/**
 * Integration point: set NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT to a URL that accepts a JSON POST
 * (CRM form, booking service, or your own route handler). Until then, nothing is sent and the
 * UI says so instead of showing a false confirmation.
 */
const DEMO_REQUEST_ENDPOINT = process.env.NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT

export async function submitDemoRequest(payload: DemoRequest): Promise<DemoRequestResult> {
  if (!DEMO_REQUEST_ENDPOINT) return { status: 'not-configured' }
  try {
    const res = await fetch(DEMO_REQUEST_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) return { status: 'error', message: `The request could not be submitted (HTTP ${res.status}).` }
    return { status: 'sent' }
  } catch {
    return { status: 'error', message: 'The request could not be submitted. Check your connection and try again.' }
  }
}
