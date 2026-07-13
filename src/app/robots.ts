import type { MetadataRoute } from 'next'
import { landingUrl } from '@/lib/site'

/**
 * Robots de la LANDING de MembeGo (membego-web): todo su contenido es público
 * e indexable (marketing + marketplace). Los paneles privados y las rutas de
 * aplicación (/login, /admin, /cliente…) viven en el app (membego-app), que
 * expone su propio robots con Disallow. Enlaza el sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const base = landingUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
