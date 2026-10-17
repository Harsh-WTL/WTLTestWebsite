import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const title = 'What The Local — Marketing, built for every location'
const description =
  'Manage location presence, customer conversations, and local growth for every location from one connected workspace. Locations, Engage, and Synapse by What The Local.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.whatthelocal.com'),
  title,
  description,
  applicationName: 'What The Local',
  openGraph: {
    type: 'website',
    url: 'https://www.whatthelocal.com/',
    siteName: 'What The Local',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  icons: {
    icon: [{ url: '/WTLTestWebsite/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eff0f4' },
    { media: '(prefers-color-scheme: dark)', color: '#16171b' },
  ],
}

const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('wtl-theme');var dark=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;d.classList.toggle('dark',dark);d.setAttribute('data-theme',dark?'dark':'light');}catch(e){}})();`

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'What The Local',
  url: 'https://www.whatthelocal.com/',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
