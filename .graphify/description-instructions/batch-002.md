# Node Description Batch 3 of 6

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
- "controllers_public_controller_formatfcfa_formatdate": "{ formatFCFA, formatDate }" | kind=code-symbol | source=src/controllers/public.controller.js:L2 | neighbors=[public.controller.js]
- "controllers_public_controller_getbaseurl_generateproductseo_generatecategoryseo_generatecatalogseo_generatehomeseo": "{\n  getBaseUrl,\n  generateProductSeo,\n  generateCategorySeo,\n  generateCatalogS…" | kind=code-symbol | source=src/controllers/public.controller.js:L3 | neighbors=[public.controller.js]
- "controllers_public_controller_prisma": "prisma" | kind=code-symbol | source=src/controllers/public.controller.js:L1 | neighbors=[public.controller.js]
- "controllers_public_controller_publiccontroller": "publicController" | kind=code-symbol | source=src/controllers/public.controller.js:L11 | neighbors=[public.controller.js]
- "controllers_seo_controller_escapexml": "escapeXml()" | kind=code-symbol | source=src/controllers/seo.controller.js:L9 | neighbors=[seo.controller.js]
- "controllers_seo_controller_formatdateiso": "formatDateIso()" | kind=code-symbol | source=src/controllers/seo.controller.js:L28 | neighbors=[seo.controller.js]
- "controllers_seo_controller_getbaseurl": "{ getBaseUrl }" | kind=code-symbol | source=src/controllers/seo.controller.js:L2 | neighbors=[seo.controller.js]
- "controllers_seo_controller_prisma": "prisma" | kind=code-symbol | source=src/controllers/seo.controller.js:L1 | neighbors=[seo.controller.js]
- "controllers_seo_controller_seocontroller": "seoController" | kind=code-symbol | source=src/controllers/seo.controller.js:L37 | neighbors=[seo.controller.js]
- "env_var_context7_api_key": "CONTEXT7_API_KEY" | kind=code-symbol | source=.cursor/mcp.json:L1 | neighbors=[context7]
- "hooks_graphify_post_tool_execsync": "{ execSync }" | kind=code-symbol | source=.agents/hooks/graphify-post-tool.js:L3 | neighbors=[graphify-post-tool.js]
- "hooks_graphify_pre_invocation_execsync": "{ execSync }" | kind=code-symbol | source=.agents/hooks/graphify-pre-invocation.js:L5 | neighbors=[graphify-pre-invocation.js]
- "hooks_graphify_pre_invocation_fs": "fs" | kind=code-symbol | source=.agents/hooks/graphify-pre-invocation.js:L3 | neighbors=[graphify-pre-invocation.js]
- "hooks_graphify_pre_invocation_path": "path" | kind=code-symbol | source=.agents/hooks/graphify-pre-invocation.js:L4 | neighbors=[graphify-pre-invocation.js]
- "hooks_pre_invocation": "pre-invocation.js" | kind=code-symbol | source=.agents/hooks/pre-invocation.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…]
- "hooks_pre_tool": "pre-tool.js" | kind=code-symbol | source=.agents/hooks/pre-tool.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…]
- "js_admin": "admin.js" | kind=code-symbol | source=public/js/admin.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…]
- "js_product_form": "product-form.js" | kind=code-symbol | source=public/js/product-form.js:L1 | neighbors=[813e9d0 feat: Complete GQ Store impleme…]
- "js_public_formatfcfa": "formatFCFA()" | kind=code-symbol | source=public/js/public.js:L7 | neighbors=[public.js]
- "js_public_gqcart": "GQCart" | kind=code-symbol | source=public/js/public.js:L14 | neighbors=[public.js]
- "mcp_command_npx": "npx" | kind=code-symbol | source=.cursor/mcp.json:L1 | neighbors=[context7]
- "mcp_package_upstash_context7_mcp": "@upstash/context7-mcp" | kind=code-symbol | source=.cursor/mcp.json:L1 | neighbors=[context7]
- "middlewares_upload_cloudinary_iscloudinaryconfigured": "{ cloudinary, isCloudinaryConfigured }" | kind=code-symbol | source=src/middlewares/upload.js:L4 | neighbors=[upload.js]
- "middlewares_upload_filefilter": "fileFilter()" | kind=code-symbol | source=src/middlewares/upload.js:L9 | neighbors=[upload.js]

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
