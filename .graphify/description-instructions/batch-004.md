# Node Description Batch 5 of 5

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

- "test_cart_test_assert": "assert" | kind=code-symbol | source=test/cart.test.js:L2 | neighbors=[cart.test.js]
- "test_cart_test_http": "http" | kind=code-symbol | source=test/cart.test.js:L3 | neighbors=[cart.test.js]
- "test_cart_test_prisma": "prisma" | kind=code-symbol | source=test/cart.test.js:L5 | neighbors=[cart.test.js]
- "test_cart_test_test_describe_before_after": "{ test, describe, before, after }" | kind=code-symbol | source=test/cart.test.js:L1 | neighbors=[cart.test.js]
- "test_public_test_app": "app" | kind=code-symbol | source=test/public.test.js:L4 | neighbors=[public.test.js]
- "test_public_test_assert": "assert" | kind=code-symbol | source=test/public.test.js:L2 | neighbors=[public.test.js]
- "test_public_test_http": "http" | kind=code-symbol | source=test/public.test.js:L3 | neighbors=[public.test.js]
- "test_public_test_prisma": "prisma" | kind=code-symbol | source=test/public.test.js:L5 | neighbors=[public.test.js]
- "test_public_test_test_describe_before_after": "{ test, describe, before, after }" | kind=code-symbol | source=test/public.test.js:L1 | neighbors=[public.test.js]
- "test_seo_test_app": "app" | kind=code-symbol | source=test/seo.test.js:L4 | neighbors=[seo.test.js]
- "test_seo_test_assert": "assert" | kind=code-symbol | source=test/seo.test.js:L2 | neighbors=[seo.test.js]
- "test_seo_test_http": "http" | kind=code-symbol | source=test/seo.test.js:L3 | neighbors=[seo.test.js]
- "test_seo_test_prisma": "prisma" | kind=code-symbol | source=test/seo.test.js:L5 | neighbors=[seo.test.js]
- "test_seo_test_test_describe_before_after": "{ test, describe, before, after }" | kind=code-symbol | source=test/seo.test.js:L1 | neighbors=[seo.test.js]
- "utils_seo_formatfcfa": "{ formatFCFA }" | kind=code-symbol | source=src/utils/seo.js:L1 | neighbors=[seo.js]
- "admin_dashboard": "dashboard.ejs" | kind=code-symbol | source=src/views/admin/dashboard.ejs:L1
- "admin_login": "login.ejs" | kind=code-symbol | source=src/views/admin/login.ejs:L1
- "brands_form": "form.ejs" | kind=code-symbol | source=src/views/admin/brands/form.ejs:L1
- "brands_index": "index.ejs" | kind=code-symbol | source=src/views/admin/brands/index.ejs:L1
- "categories_form": "form.ejs" | kind=code-symbol | source=src/views/admin/categories/form.ejs:L1
- "categories_index": "index.ejs" | kind=code-symbol | source=src/views/admin/categories/index.ejs:L1
- "js_admin": "admin.js" | kind=code-symbol | source=public/js/admin.js:L1
- "js_product_form": "product-form.js" | kind=code-symbol | source=public/js/product-form.js:L1
- "partials_admin_header": "admin-header.ejs" | kind=code-symbol | source=src/views/partials/admin-header.ejs:L1
- "partials_admin_sidebar": "admin-sidebar.ejs" | kind=code-symbol | source=src/views/partials/admin-sidebar.ejs:L1
- "partials_flash_messages": "flash-messages.ejs" | kind=code-symbol | source=src/views/partials/flash-messages.ejs:L1
- "partials_footer": "footer.ejs" | kind=code-symbol | source=src/views/partials/footer.ejs:L1
- "partials_header": "header.ejs" | kind=code-symbol | source=src/views/partials/header.ejs:L1
- "partials_public_footer": "public-footer.ejs" | kind=code-symbol | source=src/views/partials/public-footer.ejs:L1
- "partials_public_header": "public-header.ejs" | kind=code-symbol | source=src/views/partials/public-header.ejs:L1
- "products_form": "form.ejs" | kind=code-symbol | source=src/views/admin/products/form.ejs:L1
- "products_index": "index.ejs" | kind=code-symbol | source=src/views/admin/products/index.ejs:L1
- "public_404": "404.ejs" | kind=code-symbol | source=src/views/public/404.ejs:L1
- "public_500": "500.ejs" | kind=code-symbol | source=src/views/public/500.ejs:L1
- "public_cart": "cart.ejs" | kind=code-symbol | source=src/views/public/cart.ejs:L1
- "public_home": "home.ejs" | kind=code-symbol | source=src/views/public/home.ejs:L1
- "public_product": "product.ejs" | kind=code-symbol | source=src/views/public/product.ejs:L1

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/CQ-Store-/.graphify/description-instructions/batch-004.json

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
