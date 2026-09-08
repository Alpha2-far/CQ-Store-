# Node Description Batch 1 of 5

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

- "src_app": "app.js" | kind=code-symbol | source=src/app.js:L1 | neighbors=[auth.js, authLocals(), error.js, errorHandler(), notFoundHandler(), adminRoutes]
- "controllers_product_controller": "product.controller.js" | kind=code-symbol | source=src/controllers/product.controller.js:L1 | neighbors=[prisma.js, { formatFCFA, formatDate }, { generateUniqueSlug }, prisma, productController, { uploadToStorage, deleteFromStorage }]
- "controllers_public_controller": "public.controller.js" | kind=code-symbol | source=src/controllers/public.controller.js:L1 | neighbors=[prisma.js, { formatFCFA, formatDate }, {
  getBaseUrl,
  generateProductSeo,
 …, prisma, publicController, formatters.js]
- "config_prisma": "prisma.js" | kind=code-symbol | source=src/config/prisma.js:L1 | neighbors=[{ PrismaClient }, auth.controller.js, brand.controller.js, category.controller.js, dashboard.controller.js, product.controller.js]
- "middlewares_upload": "upload.js" | kind=code-symbol | source=src/middlewares/upload.js:L1 | neighbors=[product.controller.js, cloudinary.js, { cloudinary, isCloudinaryConfigured }, deleteFromStorage(), fileFilter(), fs]
- "utils_seo": "seo.js" | kind=code-symbol | source=src/utils/seo.js:L1 | neighbors=[public.controller.js, seo.controller.js, formatters.js, formatFCFA(), cleanMetaText(), { formatFCFA }]
- "routes_admin_routes": "admin.routes.js" | kind=code-symbol | source=src/routes/admin.routes.js:L1 | neighbors=[auth.js, requireAuth(), authRoutes, brandRoutes, categoryRoutes, dashboardController]
- "controllers_brand_controller": "brand.controller.js" | kind=code-symbol | source=src/controllers/brand.controller.js:L1 | neighbors=[prisma.js, brandController, { formatDate }, { generateUniqueSlug }, prisma, formatters.js]
- "controllers_category_controller": "category.controller.js" | kind=code-symbol | source=src/controllers/category.controller.js:L1 | neighbors=[prisma.js, categoryController, { formatDate }, { generateUniqueSlug }, prisma, formatters.js]
- "middlewares_auth": "auth.js" | kind=code-symbol | source=src/middlewares/auth.js:L1 | neighbors=[authLocals(), redirectIfAuth(), requireAuth(), admin.routes.js, auth.routes.js, brand.routes.js]
- "routes_auth_routes": "auth.routes.js" | kind=code-symbol | source=src/routes/auth.routes.js:L1 | neighbors=[auth.js, redirectIfAuth(), requireAuth(), authController, express, loginLimiter]
- "routes_product_routes": "product.routes.js" | kind=code-symbol | source=src/routes/product.routes.js:L1 | neighbors=[auth.js, requireAuth(), upload.js, upload, express, productController]
- "controllers_seo_controller": "seo.controller.js" | kind=code-symbol | source=src/controllers/seo.controller.js:L1 | neighbors=[prisma.js, escapeXml(), formatDateIso(), { getBaseUrl }, prisma, seoController]
- "utils_formatters": "formatters.js" | kind=code-symbol | source=src/utils/formatters.js:L1 | neighbors=[brand.controller.js, category.controller.js, dashboard.controller.js, product.controller.js, public.controller.js, formatDate()]
- "controllers_dashboard_controller": "dashboard.controller.js" | kind=code-symbol | source=src/controllers/dashboard.controller.js:L1 | neighbors=[prisma.js, dashboardController, { formatFCFA, formatDate }, prisma, formatters.js, formatDate()]
- "test_acceptance_test": "acceptance.test.js" | kind=code-symbol | source=test/acceptance.test.js:L1 | neighbors=[prisma.js, app.js, app, assert, http, prisma]
- "test_app_test": "app.test.js" | kind=code-symbol | source=test/app.test.js:L1 | neighbors=[prisma.js, app.js, app, assert, http, prisma]
- "test_cart_test": "cart.test.js" | kind=code-symbol | source=test/cart.test.js:L1 | neighbors=[prisma.js, app.js, app, assert, http, prisma]
- "test_public_test": "public.test.js" | kind=code-symbol | source=test/public.test.js:L1 | neighbors=[prisma.js, app.js, app, assert, http, prisma]
- "test_seo_test": "seo.test.js" | kind=code-symbol | source=test/seo.test.js:L1 | neighbors=[prisma.js, app.js, app, assert, http, prisma]
- "20260908090027_init_milestone_1_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260908090027_init_milestone_1/migration.sql:L1 | neighbors=[Admin, Brand, Category, Product, ProductPhoto, Specification]
- "middlewares_auth_requireauth": "requireAuth()" | kind=code-symbol | source=src/middlewares/auth.js:L4 | neighbors=[auth.js, admin.routes.js, auth.routes.js, brand.routes.js, category.routes.js, product.routes.js]
- "routes_brand_routes": "brand.routes.js" | kind=code-symbol | source=src/routes/brand.routes.js:L1 | neighbors=[auth.js, requireAuth(), brandController, express, { requireAuth }, router]
- "routes_category_routes": "category.routes.js" | kind=code-symbol | source=src/routes/category.routes.js:L1 | neighbors=[auth.js, requireAuth(), categoryController, express, { requireAuth }, router]
- "utils_formatters_formatdate": "formatDate()" | kind=code-symbol | source=src/utils/formatters.js:L21 | neighbors=[brand.controller.js, category.controller.js, dashboard.controller.js, product.controller.js, public.controller.js, formatters.js]
- "utils_slugify": "slugify.js" | kind=code-symbol | source=src/utils/slugify.js:L1 | neighbors=[brand.controller.js, category.controller.js, product.controller.js, createSlug(), generateUniqueSlug(), slugifyLib]
- "20260908090027_init_milestone_1_migration_product": "Product" | kind=code-symbol | source=prisma/migrations/20260908090027_init_milestone_1/migration.sql:L41 | neighbors=[migration.sql, Brand, Category, ProductPhoto, Specification]
- "utils_formatters_formatfcfa": "formatFCFA()" | kind=code-symbol | source=src/utils/formatters.js:L6 | neighbors=[dashboard.controller.js, product.controller.js, public.controller.js, formatters.js, seo.js]
- "utils_seo_cleanmetatext": "cleanMetaText()" | kind=code-symbol | source=src/utils/seo.js:L27 | neighbors=[seo.js, generateCatalogSeo(), generateCategorySeo(), generateHomeSeo(), generateProductSeo()]
- "utils_seo_resolveimageurl": "resolveImageUrl()" | kind=code-symbol | source=src/utils/seo.js:L40 | neighbors=[seo.js, generateCatalogSeo(), generateCategorySeo(), generateHomeSeo(), generateProductSeo()]
- "utils_slugify_generateuniqueslug": "generateUniqueSlug()" | kind=code-symbol | source=src/utils/slugify.js:L24 | neighbors=[brand.controller.js, category.controller.js, product.controller.js, slugify.js, createSlug()]
- "controllers_auth_controller": "auth.controller.js" | kind=code-symbol | source=src/controllers/auth.controller.js:L1 | neighbors=[prisma.js, authController, bcrypt, prisma]
- "prisma_seed": "seed.js" | kind=code-symbol | source=prisma/seed.js:L1 | neighbors=[bcrypt, main(), prisma, { PrismaClient }]
- "routes_public_routes": "public.routes.js" | kind=code-symbol | source=src/routes/public.routes.js:L1 | neighbors=[express, publicController, router, seoController]
- "utils_seo_generatecatalogseo": "generateCatalogSeo()" | kind=code-symbol | source=src/utils/seo.js:L239 | neighbors=[public.controller.js, seo.js, cleanMetaText(), resolveImageUrl()]
- "utils_seo_generatecategoryseo": "generateCategorySeo()" | kind=code-symbol | source=src/utils/seo.js:L179 | neighbors=[public.controller.js, seo.js, cleanMetaText(), resolveImageUrl()]
- "utils_seo_generatehomeseo": "generateHomeSeo()" | kind=code-symbol | source=src/utils/seo.js:L290 | neighbors=[public.controller.js, seo.js, cleanMetaText(), resolveImageUrl()]
- "utils_seo_generateproductseo": "generateProductSeo()" | kind=code-symbol | source=src/utils/seo.js:L55 | neighbors=[public.controller.js, seo.js, cleanMetaText(), resolveImageUrl()]
- "middlewares_error": "error.js" | kind=code-symbol | source=src/middlewares/error.js:L1 | neighbors=[errorHandler(), notFoundHandler(), app.js]
- "src_server": "server.js" | kind=code-symbol | source=src/server.js:L1 | neighbors=[app.js, app, server]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/CQ-Store-/.graphify/description-instructions/batch-000.json

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
