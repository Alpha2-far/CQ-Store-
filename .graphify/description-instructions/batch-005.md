# Node Description Batch 6 of 6

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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/farelviaho/Desktop/CQ-Store-/.graphify/description-instructions/batch-005.json

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
