# Node Description Batch 1 of 6

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/Alpha2-far/CQ-Store-@813e9d0b05f337015eb259a6bd0f89aaae2276a0": "813e9d0 feat: Complete GQ Store implementation (Milestones 1 to 5) with Render …" | kind=Commit | source=git | neighbors=[0778fb7 Ajout du PRD GQ Store et des pr…, migration.sql, dashboard.ejs, login.ejs, claude/install-bm-skills-g64nae, main]
- "src_app": "app.js" | kind=code-symbol | source=src/app.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, f4b697f fix(prod): enable trust proxy f…, auth.js, authLocals(), error.js, errorHandler()]
- "controllers_product_controller": "product.controller.js" | kind=code-symbol | source=src/controllers/product.controller.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, { formatFCFA, formatDate }, { generateUniqueSlug }, prisma, productController]
- "controllers_public_controller": "public.controller.js" | kind=code-symbol | source=src/controllers/public.controller.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, { formatFCFA, formatDate }, {
  getBaseUrl,
  generateProductSeo,
 …, prisma, publicController]
- "config_prisma": "prisma.js" | kind=code-symbol | source=src/config/prisma.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, { PrismaClient }, auth.controller.js, brand.controller.js, category.controller.js, dashboard.controller.js]
- "middlewares_upload": "upload.js" | kind=code-symbol | source=src/middlewares/upload.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, product.controller.js, cloudinary.js, { cloudinary, isCloudinaryConfigured }, deleteFromStorage(), fileFilter()]
- "utils_seo": "seo.js" | kind=code-symbol | source=src/utils/seo.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, public.controller.js, seo.controller.js, formatters.js, formatFCFA(), cleanMetaText()]
- "routes_admin_routes": "admin.routes.js" | kind=code-symbol | source=src/routes/admin.routes.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, auth.js, requireAuth(), authRoutes, brandRoutes, categoryRoutes]
- "controllers_brand_controller": "brand.controller.js" | kind=code-symbol | source=src/controllers/brand.controller.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, brandController, { formatDate }, { generateUniqueSlug }, prisma]
- "controllers_category_controller": "category.controller.js" | kind=code-symbol | source=src/controllers/category.controller.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, categoryController, { formatDate }, { generateUniqueSlug }, prisma]
- "middlewares_auth": "auth.js" | kind=code-symbol | source=src/middlewares/auth.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, authLocals(), redirectIfAuth(), requireAuth(), admin.routes.js, auth.routes.js]
- "routes_auth_routes": "auth.routes.js" | kind=code-symbol | source=src/routes/auth.routes.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, auth.js, redirectIfAuth(), requireAuth(), authController, express]
- "routes_product_routes": "product.routes.js" | kind=code-symbol | source=src/routes/product.routes.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, auth.js, requireAuth(), upload.js, upload, express]
- "controllers_seo_controller": "seo.controller.js" | kind=code-symbol | source=src/controllers/seo.controller.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, escapeXml(), formatDateIso(), { getBaseUrl }, prisma]
- "test_public_test": "public.test.js" | kind=code-symbol | source=test/public.test.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, f4b697f fix(prod): enable trust proxy f…, prisma.js, app.js, app, assert]
- "utils_formatters": "formatters.js" | kind=code-symbol | source=src/utils/formatters.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, brand.controller.js, category.controller.js, dashboard.controller.js, product.controller.js, public.controller.js]
- "controllers_dashboard_controller": "dashboard.controller.js" | kind=code-symbol | source=src/controllers/dashboard.controller.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, dashboardController, { formatFCFA, formatDate }, prisma, formatters.js]
- "test_acceptance_test": "acceptance.test.js" | kind=code-symbol | source=test/acceptance.test.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, app.js, app, assert, http]
- "test_app_test": "app.test.js" | kind=code-symbol | source=test/app.test.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, app.js, app, assert, http]
- "test_cart_test": "cart.test.js" | kind=code-symbol | source=test/cart.test.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, app.js, app, assert, http]
- "test_seo_test": "seo.test.js" | kind=code-symbol | source=test/seo.test.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, app.js, app, assert, http]
- "20260908090027_init_milestone_1_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260908090027_init_milestone_1/migration.sql:L1 | neighbors=[Admin, Brand, Category, Product, ProductPhoto, Specification]
- "routes_brand_routes": "brand.routes.js" | kind=code-symbol | source=src/routes/brand.routes.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, auth.js, requireAuth(), brandController, express, { requireAuth }]
- "routes_category_routes": "category.routes.js" | kind=code-symbol | source=src/routes/category.routes.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, auth.js, requireAuth(), categoryController, express, { requireAuth }]
- "utils_slugify": "slugify.js" | kind=code-symbol | source=src/utils/slugify.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, brand.controller.js, category.controller.js, product.controller.js, createSlug(), generateUniqueSlug()]
- "middlewares_auth_requireauth": "requireAuth()" | kind=code-symbol | source=src/middlewares/auth.js:L4 | neighbors=[auth.js, admin.routes.js, auth.routes.js, brand.routes.js, category.routes.js, product.routes.js]
- "utils_formatters_formatdate": "formatDate()" | kind=code-symbol | source=src/utils/formatters.js:L21 | neighbors=[brand.controller.js, category.controller.js, dashboard.controller.js, product.controller.js, public.controller.js, formatters.js]
- "20260908090027_init_milestone_1_migration_product": "Product" | kind=code-symbol | source=prisma/migrations/20260908090027_init_milestone_1/migration.sql:L41 | neighbors=[migration.sql, Brand, Category, ProductPhoto, Specification]
- "branch:repo:github.com/Alpha2-far/CQ-Store-#main": "main" | kind=Branch | source=git | neighbors=[0778fb7 Ajout du PRD GQ Store et des pr…, 813e9d0 feat: Complete GQ Store impleme…, 90f7262 chore: update Graphify knowledg…, f11430a chore(render): set startCommand…, f4b697f fix(prod): enable trust proxy f…]
- "commit:repo:github.com/Alpha2-far/CQ-Store-@f4b697f9cf99b98d9a0ec35830eed286a1c1d2a7": "f4b697f fix(prod): enable trust proxy for secure cookie sessions on Render and …" | kind=Commit | source=git | neighbors=[813e9d0 feat: Complete GQ Store impleme…, main, f11430a chore(render): set startCommand…, app.js, public.test.js]
- "controllers_auth_controller": "auth.controller.js" | kind=code-symbol | source=src/controllers/auth.controller.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, prisma.js, authController, bcrypt, prisma]
- "prisma_seed": "seed.js" | kind=code-symbol | source=prisma/seed.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, bcrypt, main(), prisma, { PrismaClient }]
- "routes_public_routes": "public.routes.js" | kind=code-symbol | source=src/routes/public.routes.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, express, publicController, router, seoController]
- "utils_formatters_formatfcfa": "formatFCFA()" | kind=code-symbol | source=src/utils/formatters.js:L6 | neighbors=[dashboard.controller.js, product.controller.js, public.controller.js, formatters.js, seo.js]
- "utils_seo_cleanmetatext": "cleanMetaText()" | kind=code-symbol | source=src/utils/seo.js:L27 | neighbors=[seo.js, generateCatalogSeo(), generateCategorySeo(), generateHomeSeo(), generateProductSeo()]
- "utils_seo_resolveimageurl": "resolveImageUrl()" | kind=code-symbol | source=src/utils/seo.js:L40 | neighbors=[seo.js, generateCatalogSeo(), generateCategorySeo(), generateHomeSeo(), generateProductSeo()]
- "utils_slugify_generateuniqueslug": "generateUniqueSlug()" | kind=code-symbol | source=src/utils/slugify.js:L24 | neighbors=[brand.controller.js, category.controller.js, product.controller.js, slugify.js, createSlug()]
- "cursor_mcp_mcp_server_context7": "context7" | kind=code-symbol | source=.cursor/mcp.json:L1 | neighbors=[mcp.json, CONTEXT7_API_KEY, npx, @upstash/context7-mcp]
- "hooks_graphify_pre_invocation": "graphify-pre-invocation.js" | kind=code-symbol | source=.agents/hooks/graphify-pre-invocation.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, { execSync }, fs, path]
- "middlewares_error": "error.js" | kind=code-symbol | source=src/middlewares/error.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…, errorHandler(), notFoundHandler(), app.js]

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
