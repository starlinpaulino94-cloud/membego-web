# membego-web

Landing + Marketplace de MembeGo (membego.com). Público, SEO, lectura del
marketplace. Consume el design system compartido **@membego/ui** (GitHub
Packages). No incluye lógica de aplicación ni `service_role`.

## Requisitos de instalación (@membego/ui está en GitHub Packages)
Necesitas un token de GitHub con `read:packages`:
```
export NODE_AUTH_TOKEN=ghp_xxx
npm install
```
(el `.npmrc` ya apunta `@membego` al registro de GitHub Packages).

## Variables de entorno
Ver `.env.example`. Solo lectura del marketplace; **nunca** service_role.

## Scripts
- `npm run dev` (puerto 3001) · `npm run build` · `npm start`
