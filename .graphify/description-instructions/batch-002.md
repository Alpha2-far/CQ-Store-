# Node Description Batch 3 of 5

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "controllers_public_controller_formatfcfa_formatdate": "{ formatFCFA, formatDate }" | kind=code-symbol | source=src/controllers/public.controller.js:L2 | neighbors=[public.controller.js]
- "controllers_public_controller_getbaseurl_generateproductseo_generatecategoryseo_generatecatalogseo_generatehomeseo": "{\n  getBaseUrl,\n  generateProductSeo,\n  generateCategorySeo,\n  generateCatalogS…" | kind=code-symbol | source=src/controllers/public.controller.js:L3 | neighbors=[public.controller.js]
- "controllers_public_controller_prisma": "prisma" | kind=code-symbol | source=src/controllers/public.controller.js:L1 | neighbors=[public.controller.js]
- "controllers_public_controller_publiccontroller": "publicController" | kind=code-symbol | source=src/controllers/public.controller.js:L11 | neighbors=[public.controller.js]
- "controllers_seo_controller_escapexml": "escapeXml()" | kind=code-symbol | source=src/controllers/seo.controller.js:L9 | neighbors=[seo.controller.js]
- "controllers_seo_controller_formatdateiso": "formatDateIso()" | kind=code-symbol | source=src/controllers/seo.controller.js:L28 | neighbors=[seo.controller.js]
- "controllers_seo_controller_getbaseurl": "{ getBaseUrl }" | kind=code-symbol | source=src/controllers/seo.controller.js:L2 | neighbors=[seo.controller.js]
- "controllers_seo_controller_prisma": "prisma" | kind=code-symbol | source=src/controllers/seo.controller.js:L1 | neighbors=[seo.controller.js]
- "controllers_seo_controller_seocontroller": "seoController" | kind=code-symbol | source=src/controllers/seo.controller.js:L37 | neighbors=[seo.controller.js]
- "js_public_formatfcfa": "formatFCFA()" | kind=code-symbol | source=public/js/public.js:L7 | neighbors=[public.js]
- "js_public_gqcart": "GQCart" | kind=code-symbol | source=public/js/public.js:L14 | neighbors=[public.js]
- "middlewares_upload_cloudinary_iscloudinaryconfigured": "{ cloudinary, isCloudinaryConfigured }" | kind=code-symbol | source=src/middlewares/upload.js:L4 | neighbors=[upload.js]
- "middlewares_upload_filefilter": "fileFilter()" | kind=code-symbol | source=src/middlewares/upload.js:L9 | neighbors=[upload.js]
- "middlewares_upload_fs": "fs" | kind=code-symbol | source=src/middlewares/upload.js:L3 | neighbors=[upload.js]
- "middlewares_upload_multer": "multer" | kind=code-symbol | source=src/middlewares/upload.js:L1 | neighbors=[upload.js]
- "middlewares_upload_path": "path" | kind=code-symbol | source=src/middlewares/upload.js:L2 | neighbors=[upload.js]
- "middlewares_upload_storage": "storage" | kind=code-symbol | source=src/middlewares/upload.js:L7 | neighbors=[upload.js]
- "prisma_seed_bcrypt": "bcrypt" | kind=code-symbol | source=prisma/seed.js:L2 | neighbors=[seed.js]
- "prisma_seed_main": "main()" | kind=code-symbol | source=prisma/seed.js:L7 | neighbors=[seed.js]
- "prisma_seed_prisma": "prisma" | kind=code-symbol | source=prisma/seed.js:L5 | neighbors=[seed.js]
- "prisma_seed_prismaclient": "{ PrismaClient }" | kind=code-symbol | source=prisma/seed.js:L1 | neighbors=[seed.js]
- "public_catalog": "catalog.ejs" | kind=code-symbol | source=src/views/public/catalog.ejs:L1 | neighbors=[getPageUrl()]
- "public_catalog_getpageurl": "getPageUrl()" | kind=code-symbol | source=src/views/public/catalog.ejs:L313 | neighbors=[catalog.ejs]
- "routes_admin_routes_authroutes": "authRoutes" | kind=code-symbol | source=src/routes/admin.routes.js:L6 | neighbors=[admin.routes.js]
- "routes_admin_routes_brandroutes": "brandRoutes" | kind=code-symbol | source=src/routes/admin.routes.js:L9 | neighbors=[admin.routes.js]
- "routes_admin_routes_categoryroutes": "categoryRoutes" | kind=code-symbol | source=src/routes/admin.routes.js:L8 | neighbors=[admin.routes.js]
- "routes_admin_routes_dashboardcontroller": "dashboardController" | kind=code-symbol | source=src/routes/admin.routes.js:L3 | neighbors=[admin.routes.js]
- "routes_admin_routes_express": "express" | kind=code-symbol | source=src/routes/admin.routes.js:L1 | neighbors=[admin.routes.js]
- "routes_admin_routes_productroutes": "productRoutes" | kind=code-symbol | source=src/routes/admin.routes.js:L7 | neighbors=[admin.routes.js]
- "routes_admin_routes_requireauth": "{ requireAuth }" | kind=code-symbol | source=src/routes/admin.routes.js:L4 | neighbors=[admin.routes.js]
- "routes_admin_routes_router": "router" | kind=code-symbol | source=src/routes/admin.routes.js:L2 | neighbors=[admin.routes.js]
- "routes_auth_routes_authcontroller": "authController" | kind=code-symbol | source=src/routes/auth.routes.js:L4 | neighbors=[auth.routes.js]
- "routes_auth_routes_express": "express" | kind=code-symbol | source=src/routes/auth.routes.js:L1 | neighbors=[auth.routes.js]
- "routes_auth_routes_loginlimiter": "loginLimiter" | kind=code-symbol | source=src/routes/auth.routes.js:L8 | neighbors=[auth.routes.js]
- "routes_auth_routes_ratelimit": "rateLimit" | kind=code-symbol | source=src/routes/auth.routes.js:L3 | neighbors=[auth.routes.js]
- "routes_auth_routes_redirectifauth_requireauth": "{ redirectIfAuth, requireAuth }" | kind=code-symbol | source=src/routes/auth.routes.js:L5 | neighbors=[auth.routes.js]
- "routes_auth_routes_router": "router" | kind=code-symbol | source=src/routes/auth.routes.js:L2 | neighbors=[auth.routes.js]
- "routes_brand_routes_brandcontroller": "brandController" | kind=code-symbol | source=src/routes/brand.routes.js:L3 | neighbors=[brand.routes.js]
- "routes_brand_routes_express": "express" | kind=code-symbol | source=src/routes/brand.routes.js:L1 | neighbors=[brand.routes.js]
- "routes_brand_routes_requireauth": "{ requireAuth }" | kind=code-symbol | source=src/routes/brand.routes.js:L4 | neighbors=[brand.routes.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/CQ-Store-/.graphify/description-instructions/batch-002.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
