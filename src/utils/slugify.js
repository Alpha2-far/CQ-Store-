const slugifyLib = require('slugify');

/**
 * Nettoie une chaîne pour en faire un slug URL lisible et valide
 * @param {string} text
 * @returns {string}
 */
function createSlug(text) {
  if (!text) return '';
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true
  });
}

/**
 * Assure qu'un slug est unique pour un modèle Prisma donné
 * @param {object} model - Délégué Prisma (ex: prisma.product ou prisma.category)
 * @param {string} baseSlug - Le slug de base
 * @param {string|null} currentId - L'ID courant pour ignorer l'enregistrement en cas d'édition
 * @returns {Promise<string>}
 */
async function generateUniqueSlug(model, baseSlug, currentId = null) {
  let slug = createSlug(baseSlug);
  let counter = 1;
  let candidate = slug;

  while (true) {
    const existing = await model.findUnique({
      where: { slug: candidate }
    });

    if (!existing || (currentId && existing.id === currentId)) {
      return candidate;
    }

    counter++;
    candidate = `${slug}-${counter}`;
  }
}

module.exports = {
  createSlug,
  generateUniqueSlug
};
