# Graph Report - .  (2026-09-08)

## Corpus Check
- 85 files · ~70,836 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 214 nodes · 302 edges · 17 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 146 · MODIFIES: 61 · imports_from: 39 · imports: 30 · calls: 10 · ON_BRANCH: 6 · references: 6 · PARENT_OF: 3 · requires_env: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 85 · Candidates: 107
- Excluded: 0 untracked · 3123 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `f11430a`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `requireAuth()` - 6 edges
2. `formatDate()` - 6 edges
3. `Product` - 5 edges
4. `formatFCFA()` - 5 edges
5. `cleanMetaText()` - 5 edges
6. `resolveImageUrl()` - 5 edges
7. `generateUniqueSlug()` - 5 edges
8. `context7` - 4 edges
9. `generateProductSeo()` - 4 edges
10. `generateCategorySeo()` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (8): claude/install-bm-skills-g64nae, main, 0778fb7 Ajout du PRD GQ Store et des prompts de jalons, 813e9d0 feat: Complete GQ Store implementation (Milestones 1 to 5) with Render deployment blueprint and 100% test coverage, f11430a chore(render): set startCommand to npm start directly, f4b697f fix(prod): enable trust proxy for secure cookie sessions on Render and update test assertion, { execSync }, GQCart

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (23): authLocals(), redirectIfAuth(), requireAuth(), upload, authController, express, loginLimiter, rateLimit (+15 more)

### Community 2 - "Community 2"
Cohesion: 0.19
Nodes (17): dashboardController, { formatFCFA, formatDate }, prisma, { formatFCFA, formatDate }, {
  getBaseUrl,
  generateProductSeo,
  generateCategorySeo,
  generateCatalogSeo,
  generateHomeSeo
}, prisma, publicController, formatDate() (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (17): errorHandler(), notFoundHandler(), adminRoutes, app, { authLocals }, compression, express, helmet (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (12): { PrismaClient }, authController, bcrypt, prisma, { getBaseUrl }, prisma, seoController, app (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (13): isConfigured, { formatFCFA, formatDate }, { generateUniqueSlug }, prisma, productController, { uploadToStorage, deleteFromStorage }, { cloudinary, isCloudinaryConfigured }, deleteFromStorage() (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.19
Nodes (11): brandController, { formatDate }, { generateUniqueSlug }, prisma, categoryController, { formatDate }, { generateUniqueSlug }, prisma (+3 more)

### Community 7 - "Community 7"
Cohesion: 0.22
Nodes (8): authRoutes, brandRoutes, categoryRoutes, dashboardController, express, productRoutes, { requireAuth }, router

### Community 8 - "Community 8"
Cohesion: 0.48
Nodes (6): Admin, Brand, Category, Product, ProductPhoto, Specification

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (5): app, assert, http, prisma, { test, describe, before, after }

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (5): app, assert, http, prisma, { test, describe, before, after }

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (5): app, assert, http, prisma, { test, describe, before, after }

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (5): app, assert, http, prisma, { test, describe, before, after }

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (4): context7, CONTEXT7_API_KEY, npx, @upstash/context7-mcp

### Community 14 - "Community 14"
Cohesion: 0.40
Nodes (3): bcrypt, prisma, { PrismaClient }

### Community 15 - "Community 15"
Cohesion: 0.40
Nodes (4): express, publicController, router, seoController

### Community 16 - "Community 16"
Cohesion: 0.50
Nodes (3): { execSync }, fs, path

## Knowledge Gaps
- **117 isolated node(s):** `{ execSync }`, `fs`, `path`, `{ execSync }`, `npx` (+112 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireAuth()` connect `Community 1` to `Community 7`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `formatDate()` connect `Community 2` to `Community 6`, `Community 5`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `{ execSync }`, `fs`, `path` to the rest of the system?**
  _117 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06006006006006006 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08465608465608465 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11052631578947368 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._