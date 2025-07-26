const express = require('express');
const faqController = require('../controllers/faq');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /faqs:
 *   get:
 *     summary: Get all FAQs
 */
router.get('/', faqController.list.bind(faqController));

/**
 * @swagger
 * /faqs/:id:
 *   get:
 *     summary: Get FAQ by ID
 */
router.get('/:id', faqController.get.bind(faqController));

/**
 * @swagger
 * /faqs:
 *   post:
 *     summary: Create a FAQ
 */
router.post('/', authenticateJWT, faqController.create.bind(faqController));

/**
 * @swagger
 * /faqs/:id:
 *   put:
 *     summary: Update FAQ
 */
router.put('/:id', authenticateJWT, faqController.update.bind(faqController));

/**
 * @swagger
 * /faqs/:id:
 *   delete:
 *     summary: Delete FAQ
 */
router.delete('/:id', authenticateJWT, faqController.remove.bind(faqController));

module.exports = router;
