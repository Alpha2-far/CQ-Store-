# Community Labeling

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the community listing below
and write 2-5 word plain-language names for each.

## Language

LANGUAGE: each community line ends with a `[lang=…]` marker giving the
language of its source nodes. Write that community's name in EXACTLY that
language. Do not normalize every name to one common language.

## Communities

Community 0: dashboard.ejs, login.ejs, claude/install-bm-skills-g64nae, form.ejs, index.ejs, 0778fb7 Ajout du PRD GQ Store et des prompts de jalons, 813e9d0 feat: Complete GQ Store implementation (Milestones 1, graphify-post-tool.js, { execSync }, pre-invocation.js, pre-tool.js, admin.js [lang=fr]
Community 1: requireAuth(, auth.js, authLocals(, redirectIfAuth(, upload, auth.routes.js, authController, express, loginLimiter, rateLimit, { redirectIfAuth, requireAuth }, router [lang=en]
Community 2: formatDate(, formatFCFA(, cleanMetaText(, generateCategorySeo(, generateProductSeo(, resolveImageUrl(, dashboard.controller.js, dashboardController, { formatFCFA, formatDate }, prisma, public.controller.js, {
  getBaseUrl,
  generateProductSeo,
  generateCategorySeo, [lang=en]
Community 3: error.js, errorHandler(, notFoundHandler(, app.js, adminRoutes, app, { authLocals }, compression, express, helmet, { notFoundHandler, errorHandler }, path [lang=en]
Community 4: prisma.js, { PrismaClient }, auth.controller.js, authController, bcrypt, prisma, seo.controller.js, escapeXml(, formatDateIso(, { getBaseUrl }, seoController, acceptance.test.js [lang=en]
Community 5: cloudinary.js, isConfigured, product.controller.js, { formatFCFA, formatDate }, { generateUniqueSlug }, prisma, productController, { uploadToStorage, deleteFromStorage }, upload.js, { cloudinary, isCloudinaryConfigured }, deleteFromStorage(, fileFilter( [lang=en]
Community 6: generateUniqueSlug(, brand.controller.js, brandController, { formatDate }, { generateUniqueSlug }, prisma, category.controller.js, categoryController, slugify.js, createSlug(, slugifyLib [lang=en]
Community 7: main, 90f7262 chore: update Graphify knowledge graph, f11430a chore(render): set startCommand to npm start directl, f4b697f fix(prod): enable trust proxy for secure cookie sess, public.test.js, app, assert, http, prisma, { test, describe, before, after } [lang=en]
Community 8: admin.routes.js, authRoutes, brandRoutes, categoryRoutes, dashboardController, express, productRoutes, { requireAuth }, router [lang=en]
Community 9: Product, migration.sql, Admin, Brand, Category, ProductPhoto, Specification [lang=en]
Community 10: app.test.js, app, assert, http, prisma, { test, describe, before, after } [lang=en]
Community 11: cart.test.js, app, assert, http, prisma, { test, describe, before, after } [lang=en]
Community 12: seo.test.js, app, assert, http, prisma, { test, describe, before, after } [lang=en]
Community 13: context7, mcp.json, CONTEXT7_API_KEY, npx, @upstash/context7-mcp [lang=en]
Community 14: seed.js, bcrypt, main(, prisma, { PrismaClient } [lang=en]
Community 15: public.routes.js, express, publicController, router, seoController [lang=en]
Community 16: graphify-pre-invocation.js, { execSync }, fs, path [lang=en]

## Instructions

Write a single JSON object mapping each community id (as a string) to its
2-5 word name to: /Users/farelviaho/Desktop/CQ-Store-/.graphify/label-instructions/communities.json

Example:
```json
{
  "0": "Authentication Flow",
  "1": "Authentication Flow",
  "2": "Authentication Flow"
}
```

Then re-run `graphify update` (or `graphify label`) to ingest the names.
