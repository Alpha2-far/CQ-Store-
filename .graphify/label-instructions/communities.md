# Community Labeling

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the community listing below
and write 2-5 word plain-language names for each.

## Language

LANGUAGE: each community line ends with a `[lang=…]` marker giving the
language of its source nodes. Write that community's name in EXACTLY that
language. Do not normalize every name to one common language.

## Communities

Community 0: requireAuth(, auth.js, authLocals(, redirectIfAuth(, upload, auth.routes.js, authController, express, loginLimiter, rateLimit, { redirectIfAuth, requireAuth }, router [lang=en]
Community 1: formatDate(, formatFCFA(, generateUniqueSlug(, brand.controller.js, brandController, { formatDate }, { generateUniqueSlug }, prisma, category.controller.js, categoryController, dashboard.controller.js, dashboardController [lang=en]
Community 2: cleanMetaText(, generateCatalogSeo(, generateCategorySeo(, generateProductSeo(, resolveImageUrl(, public.controller.js, { formatFCFA, formatDate }, {
  getBaseUrl,
  generateProductSeo,
  generateCategorySeo,, prisma, publicController, seo.controller.js, escapeXml( [lang=en]
Community 3: error.js, errorHandler(, notFoundHandler(, app.js, adminRoutes, app, { authLocals }, compression, express, helmet, { notFoundHandler, errorHandler }, path [lang=en]
Community 4: prisma.js, { PrismaClient }, auth.controller.js, authController, bcrypt, prisma, acceptance.test.js, app, assert, http, { test, describe, before, after }, app.test.js [lang=en]
Community 5: cloudinary.js, isConfigured, product.controller.js, { formatFCFA, formatDate }, { generateUniqueSlug }, prisma, productController, { uploadToStorage, deleteFromStorage }, upload.js, { cloudinary, isCloudinaryConfigured }, deleteFromStorage(, fileFilter( [lang=en]
Community 6: admin.routes.js, authRoutes, brandRoutes, categoryRoutes, dashboardController, express, productRoutes, { requireAuth }, router [lang=en]
Community 7: Product, migration.sql, Admin, Brand, Category, ProductPhoto, Specification [lang=en]
Community 8: cart.test.js, app, assert, http, prisma, { test, describe, before, after } [lang=en]
Community 9: public.test.js, app, assert, http, prisma, { test, describe, before, after } [lang=en]
Community 10: seo.test.js, app, assert, http, prisma, { test, describe, before, after } [lang=en]
Community 11: seed.js, bcrypt, main(, prisma, { PrismaClient } [lang=en]
Community 12: public.routes.js, express, publicController, router, seoController [lang=en]
Community 13: public.js, formatFCFA(, GQCart [lang=en]
Community 14: claude/install-bm-skills-g64nae, 0778fb7 Ajout du PRD GQ Store et des prompts de jalons [lang=fr]
Community 15: catalog.ejs, getPageUrl( [lang=en]
Community 16: dashboard.ejs [lang=en]
Community 17: login.ejs [lang=en]
Community 18: form.ejs [lang=en]
Community 19: index.ejs [lang=en]
Community 20: form.ejs [lang=en]
Community 21: index.ejs [lang=en]
Community 22: admin.js [lang=en]
Community 23: product-form.js [lang=en]
Community 24: admin-header.ejs [lang=en]
Community 25: admin-sidebar.ejs [lang=en]
Community 26: flash-messages.ejs [lang=en]
Community 27: footer.ejs [lang=en]
Community 28: header.ejs [lang=en]
Community 29: public-footer.ejs [lang=en]
Community 30: public-header.ejs [lang=en]
Community 31: form.ejs [lang=en]
Community 32: index.ejs [lang=en]
Community 33: 404.ejs [lang=en]
Community 34: 500.ejs [lang=en]
Community 35: cart.ejs [lang=en]
Community 36: home.ejs [lang=en]
Community 37: product.ejs [lang=en]

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
