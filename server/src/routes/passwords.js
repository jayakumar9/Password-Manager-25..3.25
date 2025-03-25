const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const passwordController = require('../controllers/passwordController');

// Get all passwords for a user
router.get('/', auth, passwordController.getAllPasswords);

// Add new password
router.post('/', auth, passwordController.createPassword);

// Update password
router.put('/:id', auth, passwordController.updatePassword);

// Delete password
router.delete('/:id', auth, passwordController.deletePassword);

// File attachment routes
router.post('/:id/attachments', auth, upload.single('file'), passwordController.addAttachment);
router.delete('/:id/attachments/:fileId', auth, passwordController.deleteAttachment);

module.exports = router; 