import { Router } from 'express';
import {
  getReports,
  generateReport,
  getReportById,
  deleteReport
} from '../controllers/reports.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get all reports
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [MONTHLY, QUARTERLY, YEARLY, CUSTOM]
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
 *         description: List of reports
 */
router.get('/', getReports);

/**
 * @swagger
 * /api/reports/generate:
 *   post:
 *     summary: Generate a new report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 example: Monthly Recruitment Report
 *               type:
 *                 type: string
 *                 enum: [MONTHLY, QUARTERLY, YEARLY, CUSTOM]
 *                 example: MONTHLY
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-01
 *                 description: Required for CUSTOM type
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-31
 *                 description: Required for CUSTOM type
 *     responses:
 *       201:
 *         description: Report generated successfully
 */
router.post('/generate', generateReport);

/**
 * @swagger
 * /api/reports/{id}:
 *   get:
 *     summary: Get report by ID
 *     tags: [Reports]
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
 *         description: Report details
 *       404:
 *         description: Report not found
 */
router.get('/:id', getReportById);

/**
 * @swagger
 * /api/reports/{id}:
 *   delete:
 *     summary: Delete report
 *     tags: [Reports]
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
 *         description: Report deleted successfully
 */
router.delete('/:id', deleteReport);

export default router;
