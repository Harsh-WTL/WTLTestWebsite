import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Figtree, Geist_Mono } from 'next/font/google'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-figtree',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
})

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

const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('wtl-theme');var dark=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;d.classList.toggle('dark',dark);}catch(e){}})();`

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
    <html lang="en" suppressHydrationWarning className={`${figtree.variable} ${geistMono.variable}`}>
      <head>
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
