# Node Description Batch 5 of 6

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

- "routes_category_routes_categorycontroller": "categoryController" | kind=code-symbol | source=src/routes/category.routes.js:L3 | neighbors=[category.routes.js]
- "routes_category_routes_express": "express" | kind=code-symbol | source=src/routes/category.routes.js:L1 | neighbors=[category.routes.js]
- "routes_category_routes_requireauth": "{ requireAuth }" | kind=code-symbol | source=src/routes/category.routes.js:L4 | neighbors=[category.routes.js]
- "routes_category_routes_router": "router" | kind=code-symbol | source=src/routes/category.routes.js:L2 | neighbors=[category.routes.js]
- "routes_product_routes_express": "express" | kind=code-symbol | source=src/routes/product.routes.js:L1 | neighbors=[product.routes.js]
- "routes_product_routes_productcontroller": "productController" | kind=code-symbol | source=src/routes/product.routes.js:L3 | neighbors=[product.routes.js]
- "routes_product_routes_requireauth": "{ requireAuth }" | kind=code-symbol | source=src/routes/product.routes.js:L4 | neighbors=[product.routes.js]
- "routes_product_routes_router": "router" | kind=code-symbol | source=src/routes/product.routes.js:L2 | neighbors=[product.routes.js]
- "routes_product_routes_upload": "{ upload }" | kind=code-symbol | source=src/routes/product.routes.js:L5 | neighbors=[product.routes.js]
- "routes_public_routes_express": "express" | kind=code-symbol | source=src/routes/public.routes.js:L1 | neighbors=[public.routes.js]
- "routes_public_routes_publiccontroller": "publicController" | kind=code-symbol | source=src/routes/public.routes.js:L3 | neighbors=[public.routes.js]
- "routes_public_routes_router": "router" | kind=code-symbol | source=src/routes/public.routes.js:L2 | neighbors=[public.routes.js]
- "routes_public_routes_seocontroller": "seoController" | kind=code-symbol | source=src/routes/public.routes.js:L4 | neighbors=[public.routes.js]
- "src_app_adminroutes": "adminRoutes" | kind=code-symbol | source=src/app.js:L11 | neighbors=[app.js]
- "src_app_app": "app" | kind=code-symbol | source=src/app.js:L14 | neighbors=[app.js]
- "src_app_authlocals": "{ authLocals }" | kind=code-symbol | source=src/app.js:L10 | neighbors=[app.js]
- "src_app_compression": "compression" | kind=code-symbol | source=src/app.js:L7 | neighbors=[app.js]
- "src_app_express": "express" | kind=code-symbol | source=src/app.js:L1 | neighbors=[app.js]
- "src_app_helmet": "helmet" | kind=code-symbol | source=src/app.js:L6 | neighbors=[app.js]
- "src_app_notfoundhandler_errorhandler": "{ notFoundHandler, errorHandler }" | kind=code-symbol | source=src/app.js:L12 | neighbors=[app.js]
- "src_app_path": "path" | kind=code-symbol | source=src/app.js:L2 | neighbors=[app.js]
- "src_app_pgsession": "pgSession" | kind=code-symbol | source=src/app.js:L4 | neighbors=[app.js]
- "src_app_pool": "{ Pool }" | kind=code-symbol | source=src/app.js:L5 | neighbors=[app.js]
- "src_app_publicroutes": "publicRoutes" | kind=code-symbol | source=src/app.js:L97 | neighbors=[app.js]
- "src_app_session": "session" | kind=code-symbol | source=src/app.js:L3 | neighbors=[app.js]
- "src_app_sessionconfig": "sessionConfig" | kind=code-symbol | source=src/app.js:L58 | neighbors=[app.js]
- "src_server_app": "app" | kind=code-symbol | source=src/server.js:L1 | neighbors=[server.js]
- "src_server_server": "server" | kind=code-symbol | source=src/server.js:L6 | neighbors=[server.js]
- "test_acceptance_test_app": "app" | kind=code-symbol | source=test/acceptance.test.js:L4 | neighbors=[acceptance.test.js]
- "test_acceptance_test_assert": "assert" | kind=code-symbol | source=test/acceptance.test.js:L2 | neighbors=[acceptance.test.js]
- "test_acceptance_test_http": "http" | kind=code-symbol | source=test/acceptance.test.js:L3 | neighbors=[acceptance.test.js]
- "test_acceptance_test_prisma": "prisma" | kind=code-symbol | source=test/acceptance.test.js:L5 | neighbors=[acceptance.test.js]
- "test_acceptance_test_test_describe_before_after": "{ test, describe, before, after }" | kind=code-symbol | source=test/acceptance.test.js:L1 | neighbors=[acceptance.test.js]
- "test_app_test_app": "app" | kind=code-symbol | source=test/app.test.js:L4 | neighbors=[app.test.js]
- "test_app_test_assert": "assert" | kind=code-symbol | source=test/app.test.js:L2 | neighbors=[app.test.js]
- "test_app_test_http": "http" | kind=code-symbol | source=test/app.test.js:L3 | neighbors=[app.test.js]
- "test_app_test_prisma": "prisma" | kind=code-symbol | source=test/app.test.js:L5 | neighbors=[app.test.js]
- "test_app_test_test_describe_before_after": "{ test, describe, before, after }" | kind=code-symbol | source=test/app.test.js:L1 | neighbors=[app.test.js]
- "test_cart_test_app": "app" | kind=code-symbol | source=test/cart.test.js:L4 | neighbors=[cart.test.js]
- "test_cart_test_assert": "assert" | kind=code-symbol | source=test/cart.test.js:L2 | neighbors=[cart.test.js]

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
