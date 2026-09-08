# Graph Report - .  (2026-09-08)

## Corpus Check
- 69 files · ~58,869 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 197 nodes · 225 edges · 15 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 141 · imports_from: 39 · imports: 30 · calls: 10 · references: 4 · ON_BRANCH: 1


## Input Scope
- Requested: all
- Resolved: all (source: cli)
- Included files: 69 · Candidates: recursive
- Excluded: 0 untracked · 0 ignored · 0 sensitive · 0 missing committed

## Graph Freshness
- Built from Git commit: `0778fb7`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `requireAuth()` - 6 edges
2. `formatDate()` - 6 edges
3. `Product` - 5 edges
4. `formatFCFA()` - 5 edges
5. `cleanMetaText()` - 5 edges
6. `resolveImageUrl()` - 5 edges
7. `generateUniqueSlug()` - 5 edges
8. `generateProductSeo()` - 4 edges
9. `generateCategorySeo()` - 4 edges
10. `generateCatalogSeo()` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (23): authLocals(), redirectIfAuth(), requireAuth(), upload, authController, express, loginLimiter, rateLimit (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (16): brandController, { formatDate }, { generateUniqueSlug }, prisma, categoryController, { formatDate }, { generateUniqueSlug }, prisma (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (15): { formatFCFA, formatDate }, {
  getBaseUrl,
  generateProductSeo,
  generateCategorySeo,
  generateCatalogSeo,
  generateHomeSeo
}, prisma, publicController, { getBaseUrl }, prisma, seoController, cleanMetaText() (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (17): errorHandler(), notFoundHandler(), adminRoutes, app, { authLocals }, compression, express, helmet (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (14): { PrismaClient }, authController, bcrypt, prisma, app, assert, http, prisma (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (13): isConfigured, { formatFCFA, formatDate }, { generateUniqueSlug }, prisma, productController, { uploadToStorage, deleteFromStorage }, { cloudinary, isCloudinaryConfigured }, deleteFromStorage() (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.22
Nodes (8): authRoutes, brandRoutes, categoryRoutes, dashboardController, express, productRoutes, { requireAuth }, router

### Community 7 - "Community 7"
Cohesion: 0.48
Nodes (6): Admin, Brand, Category, Product, ProductPhoto, Specification

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (5): app, assert, http, prisma, { test, describe, before, after }

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (5): app, assert, http, prisma, { test, describe, before, after }

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (5): app, assert, http, prisma, { test, describe, before, after }

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (3): bcrypt, prisma, { PrismaClient }

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (4): express, publicController, router, seoController

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (1): GQCart

### Community 14 - "Community 14"
Cohesion: 1.00
Nodes (2): claude/install-bm-skills-g64nae, 0778fb7 Ajout du PRD GQ Store et des prompts de jalons

## Knowledge Gaps
- **110 isolated node(s):** `Admin`, `{ PrismaClient }`, `bcrypt`, `prisma`, `GQCart` (+105 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 13`** (1 nodes): `GQCart`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `claude/install-bm-skills-g64nae`, `0778fb7 Ajout du PRD GQ Store et des prompts de jalons`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireAuth()` connect `Community 0` to `Community 6`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `formatDate()` connect `Community 1` to `Community 5`, `Community 2`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `formatFCFA()` connect `Community 1` to `Community 5`, `Community 2`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `Admin`, `{ PrismaClient }`, `bcrypt` to the rest of the system?**
  _110 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08465608465608465 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1380952380952381 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11052631578947368 - nodes in this community are weakly interconnected._