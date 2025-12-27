import { Router } from 'express';
import {
  getCVs,
  uploadCV,
  getCVById,
  analyzeCV,
  deleteCV,
  downloadCV
} from '../controllers/cvs.controller';
import { authenticate } from '../middleware/auth.middleware';
import { uploadCV as uploadMiddleware } from '../middleware/upload.middleware';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/cvs:
 *   get:
 *     summary: Get all CVs
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: jobId
 *         schema:
 *           type: string
 *         description: Filter by job ID
 *       - in: query
 *         name: candidateId
 *         schema:
 *           type: string
 *         description: Filter by candidate ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [UPLOADED, ANALYZING, ANALYZED, FAILED]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of CVs
 */
router.get('/', getCVs);

/**
 * @swagger
 * /api/cvs/upload:
 *   post:
 *     summary: Upload CV file
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - cv
 *               - candidateId
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: CV file (PDF or DOCX)
 *               candidateId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               jobId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: CV uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/CV'
 */
router.post('/upload', uploadMiddleware.single('cv'), uploadCV);

/**
 * @swagger
 * /api/cvs/{id}:
 *   get:
 *     summary: Get CV by ID
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CV details
 *       404:
 *         description: CV not found
 */
router.get('/:id', getCVById);

/**
 * @swagger
 * /api/cvs/{id}/analyze:
 *   post:
 *     summary: Analyze CV
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CV analyzed successfully
 *       404:
 *         description: CV not found
 */
router.post('/:id/analyze', analyzeCV);

/**
 * @swagger
 * /api/cvs/{id}:
 *   delete:
 *     summary: Delete CV
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CV deleted successfully
 *       404:
 *         description: CV not found
 */
router.delete('/:id', deleteCV);

/**
 * @swagger
 * /api/cvs/{id}/download:
 *   get:
 *     summary: Download CV file
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CV file download
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           application/msword:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: CV not found
 */
router.get('/:id/download', downloadCV);

export default router;
