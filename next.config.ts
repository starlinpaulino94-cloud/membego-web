import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@membego/ui'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
  redirects: async () => {
    // Fase 0 · Corte de dominio: cuando membego.com pase a servir esta
    // landing, TODAS las rutas de flujo (QRs impresos, enlaces compartidos,
    // bookmarks) deben seguir funcionando redirigiendo a la app. Sin la env
    // NEXT_PUBLIC_APP_ORIGIN no se generan (dev de dominio único).
    const app = (process.env.NEXT_PUBLIC_APP_ORIGIN ?? '').replace(/\/+$/, '')
    const flujos = [
      '/login',
      '/acceso',
      '/recuperar',
      '/confirmar',
      '/registro/:path*',
      '/registro-empresa',
      '/onboarding',
      '/cliente/:path*',
      '/admin/:path*',
      '/superadmin/:path*',
      '/empleado/:path*',
      '/i/:path*',
      '/r/:path*',
      '/invita/:path*',
      '/invitacion/:path*',
      '/mis-membresias',
      '/membresia/:path*',
      // OJO: /plan/[id] y /promocion/[id] NO se redirigen — la landing tiene
      // su propia versión (SEO) con CTA hacia la app.
    ]
    const appRedirects = app
      ? flujos.map((source) => ({
          source,
          destination: `${app}${source.replace('/:path*', '/:path*')}`,
          permanent: false,
        }))
      : []
    return [
      ...appRedirects,
      { source: '/empresa/:slug*', destination: '/empresas/:slug*', permanent: true },
    ]
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https: blob:",
            "font-src 'self' data:",
            "connect-src 'self' https://*.supabase.co",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
          ].join('; '),
        },
      ],
    },
  ],
}

export default nextConfig
