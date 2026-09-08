const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

// Configuration du stockage en mémoire pour traiter l'upload vers Cloudinary ou localement
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format d’image non supporté. Utilisez JPG, PNG, WEBP ou AVIF.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limite de 10 Mo par photo
  },
  fileFilter: fileFilter
});

/**
 * Téléverse un fichier (buffer) vers Cloudinary ou le répertoire public local
 * @param {Express.Multer.File} file
 * @param {string} folder
 * @returns {Promise<{ url: string, publicId: string|null }>}
 */
async function uploadToStorage(file, folder = 'gq-store/products') {
  if (isCloudinaryConfigured()) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'image'
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            publicId: result.public_id
          });
        }
      );
      uploadStream.end(file.buffer);
    });
  } else {
    // Fallback stockage local
    const uploadsDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, file.buffer);

    return {
      url: `/uploads/${filename}`,
      publicId: null
    };
  }
}

/**
 * Supprime une photo de Cloudinary ou du stockage local
 * @param {string} url
 * @param {string|null} publicId
 */
async function deleteFromStorage(url, publicId = null) {
  try {
    if (publicId && isCloudinaryConfigured()) {
      await cloudinary.uploader.destroy(publicId);
    } else if (url && url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../../public', url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (err) {
    console.warn('Avertissement suppression image :', err.message);
  }
}

module.exports = {
  upload,
  uploadToStorage,
  deleteFromStorage
};
