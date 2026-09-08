/**
 * Formate un nombre en montant FCFA (ex: 450 000 FCFA)
 * @param {number|null|undefined} amount
 * @returns {string}
 */
function formatFCFA(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0 FCFA';
  }
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(amount) + ' FCFA';
}

/**
 * Formate une date en format français lisible (ex: 8 sept. 2026, 10:00)
 * @param {Date|string} date
 * @returns {string}
 */
function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
}

module.exports = {
  formatFCFA,
  formatDate
};
