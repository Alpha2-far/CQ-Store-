# Node Description Batch 2 of 5

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
Write every description in French (fr). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "utils_seo_getbaseurl": "getBaseUrl()" | kind=code-symbol | source=src/utils/seo.js:L8 | neighbors=[public.controller.js, seo.controller.js, seo.js]
- "utils_slugify_createslug": "createSlug()" | kind=code-symbol | source=src/utils/slugify.js:L8 | neighbors=[slugify.js, slugifyLib, generateUniqueSlug()]
- "20260908090027_init_milestone_1_migration_brand": "Brand" | kind=code-symbol | source=prisma/migrations/20260908090027_init_milestone_1/migration.sql:L30 | neighbors=[migration.sql, Product]
- "20260908090027_init_milestone_1_migration_category": "Category" | kind=code-symbol | source=prisma/migrations/20260908090027_init_milestone_1/migration.sql:L14 | neighbors=[migration.sql, Product]
- "20260908090027_init_milestone_1_migration_productphoto": "ProductPhoto" | kind=code-symbol | source=prisma/migrations/20260908090027_init_milestone_1/migration.sql:L64 | neighbors=[migration.sql, Product]
- "20260908090027_init_milestone_1_migration_specification": "Specification" | kind=code-symbol | source=prisma/migrations/20260908090027_init_milestone_1/migration.sql:L79 | neighbors=[migration.sql, Product]
- "config_cloudinary": "cloudinary.js" | kind=code-symbol | source=src/config/cloudinary.js:L1 | neighbors=[isConfigured, upload.js]
- "js_public": "public.js" | kind=code-symbol | source=public/js/public.js:L1 | neighbors=[formatFCFA(), GQCart]
- "middlewares_auth_authlocals": "authLocals()" | kind=code-symbol | source=src/middlewares/auth.js:L29 | neighbors=[auth.js, app.js]
- "middlewares_auth_redirectifauth": "redirectIfAuth()" | kind=code-symbol | source=src/middlewares/auth.js:L22 | neighbors=[auth.js, auth.routes.js]
- "middlewares_error_errorhandler": "errorHandler()" | kind=code-symbol | source=src/middlewares/error.js:L19 | neighbors=[error.js, app.js]
- "middlewares_error_notfoundhandler": "notFoundHandler()" | kind=code-symbol | source=src/middlewares/error.js:L1 | neighbors=[error.js, app.js]
- "middlewares_upload_deletefromstorage": "deleteFromStorage()" | kind=code-symbol | source=src/middlewares/upload.js:L75 | neighbors=[product.controller.js, upload.js]
- "middlewares_upload_upload": "upload" | kind=code-symbol | source=src/middlewares/upload.js:L18 | neighbors=[upload.js, product.routes.js]
- "middlewares_upload_uploadtostorage": "uploadToStorage()" | kind=code-symbol | source=src/middlewares/upload.js:L32 | neighbors=[product.controller.js, upload.js]
- "utils_slugify_slugifylib": "slugifyLib" | kind=code-symbol | source=src/utils/slugify.js:L1 | neighbors=[slugify.js, createSlug()]
- "20260908090027_init_milestone_1_migration_admin": "Admin" | kind=code-symbol | source=prisma/migrations/20260908090027_init_milestone_1/migration.sql:L2 | neighbors=[migration.sql]
- "branch:repo:github.com/Alpha2-far/CQ-Store-#claude/install-bm-skills-g64nae": "claude/install-bm-skills-g64nae" | kind=Branch | source=git | neighbors=[0778fb7 Ajout du PRD GQ Store et des pr…]
- "commit:repo:github.com/Alpha2-far/CQ-Store-@0778fb761c9def0291cc2ae9942bd6023418047c": "0778fb7 Ajout du PRD GQ Store et des prompts de jalons" | kind=Commit | source=git | neighbors=[claude/install-bm-skills-g64nae]
- "config_cloudinary_isconfigured": "isConfigured" | kind=code-symbol | source=src/config/cloudinary.js:L3 | neighbors=[cloudinary.js]
- "config_prisma_prismaclient": "{ PrismaClient }" | kind=code-symbol | source=src/config/prisma.js:L1 | neighbors=[prisma.js]
- "controllers_auth_controller_authcontroller": "authController" | kind=code-symbol | source=src/controllers/auth.controller.js:L4 | neighbors=[auth.controller.js]
- "controllers_auth_controller_bcrypt": "bcrypt" | kind=code-symbol | source=src/controllers/auth.controller.js:L1 | neighbors=[auth.controller.js]
- "controllers_auth_controller_prisma": "prisma" | kind=code-symbol | source=src/controllers/auth.controller.js:L2 | neighbors=[auth.controller.js]
- "controllers_brand_controller_brandcontroller": "brandController" | kind=code-symbol | source=src/controllers/brand.controller.js:L5 | neighbors=[brand.controller.js]
- "controllers_brand_controller_formatdate": "{ formatDate }" | kind=code-symbol | source=src/controllers/brand.controller.js:L3 | neighbors=[brand.controller.js]
- "controllers_brand_controller_generateuniqueslug": "{ generateUniqueSlug }" | kind=code-symbol | source=src/controllers/brand.controller.js:L2 | neighbors=[brand.controller.js]
- "controllers_brand_controller_prisma": "prisma" | kind=code-symbol | source=src/controllers/brand.controller.js:L1 | neighbors=[brand.controller.js]
- "controllers_category_controller_categorycontroller": "categoryController" | kind=code-symbol | source=src/controllers/category.controller.js:L5 | neighbors=[category.controller.js]
- "controllers_category_controller_formatdate": "{ formatDate }" | kind=code-symbol | source=src/controllers/category.controller.js:L3 | neighbors=[category.controller.js]
- "controllers_category_controller_generateuniqueslug": "{ generateUniqueSlug }" | kind=code-symbol | source=src/controllers/category.controller.js:L2 | neighbors=[category.controller.js]
- "controllers_category_controller_prisma": "prisma" | kind=code-symbol | source=src/controllers/category.controller.js:L1 | neighbors=[category.controller.js]
- "controllers_dashboard_controller_dashboardcontroller": "dashboardController" | kind=code-symbol | source=src/controllers/dashboard.controller.js:L4 | neighbors=[dashboard.controller.js]
- "controllers_dashboard_controller_formatfcfa_formatdate": "{ formatFCFA, formatDate }" | kind=code-symbol | source=src/controllers/dashboard.controller.js:L2 | neighbors=[dashboard.controller.js]
- "controllers_dashboard_controller_prisma": "prisma" | kind=code-symbol | source=src/controllers/dashboard.controller.js:L1 | neighbors=[dashboard.controller.js]
- "controllers_product_controller_formatfcfa_formatdate": "{ formatFCFA, formatDate }" | kind=code-symbol | source=src/controllers/product.controller.js:L3 | neighbors=[product.controller.js]
- "controllers_product_controller_generateuniqueslug": "{ generateUniqueSlug }" | kind=code-symbol | source=src/controllers/product.controller.js:L2 | neighbors=[product.controller.js]
- "controllers_product_controller_prisma": "prisma" | kind=code-symbol | source=src/controllers/product.controller.js:L1 | neighbors=[product.controller.js]
- "controllers_product_controller_productcontroller": "productController" | kind=code-symbol | source=src/controllers/product.controller.js:L6 | neighbors=[product.controller.js]
- "controllers_product_controller_uploadtostorage_deletefromstorage": "{ uploadToStorage, deleteFromStorage }" | kind=code-symbol | source=src/controllers/product.controller.js:L4 | neighbors=[product.controller.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/CQ-Store-/.graphify/description-instructions/batch-001.json

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
