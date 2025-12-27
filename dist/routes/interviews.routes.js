"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interviews_controller_1 = require("../controllers/interviews.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
/**
 * @swagger
 * /api/interviews:
 *   get:
 *     summary: Get all interviews
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: candidateId
 *         schema:
 *           type: string
 *       - in: query
 *         name: jobId
 *         schema:
 *           type: string
 *       - in: query
 *         name: interviewerId
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [SCHEDULED, COMPLETED, CANCELLED, RESCHEDULED]
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
 *         description: List of interviews
 */
router.get('/', interviews_controller_1.getInterviews);
/**
 * @swagger
 * /api/interviews/upcoming:
 *   get:
 *     summary: Get upcoming interviews
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of upcoming interviews
 */
router.get('/upcoming', interviews_controller_1.getUpcomingInterviews);
/**
 * @swagger
 * /api/interviews:
 *   post:
 *     summary: Schedule an interview
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - candidateId
 *               - interviewerId
 *               - date
 *               - time
 *               - duration
 *               - type
 *               - location
 *             properties:
 *               candidateId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               jobId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               interviewerId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               time:
 *                 type: string
 *                 example: 10:00
 *               duration:
 *                 type: integer
 *                 minimum: 15
 *                 example: 60
 *               type:
 *                 type: string
 *                 enum: [VIDEO_CALL, IN_PERSON, PHONE]
 *                 example: VIDEO_CALL
 *               location:
 *                 type: string
 *                 example: Zoom Meeting Room
 *     responses:
 *       201:
 *         description: Interview scheduled successfully
 */
router.post('/', interviews_controller_1.createInterview);
/**
 * @swagger
 * /api/interviews/{id}:
 *   get:
 *     summary: Get interview by ID
 *     tags: [Interviews]
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
 *         description: Interview details
 *       404:
 *         description: Interview not found
 */
router.get('/:id', interviews_controller_1.getInterviewById);
/**
 * @swagger
 * /api/interviews/{id}:
 *   put:
 *     summary: Update interview
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Interview'
 *     responses:
 *       200:
 *         description: Interview updated successfully
 */
router.put('/:id', interviews_controller_1.updateInterview);
/**
 * @swagger
 * /api/interviews/{id}:
 *   delete:
 *     summary: Cancel interview
 *     tags: [Interviews]
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
 *         description: Interview cancelled successfully
 */
router.delete('/:id', interviews_controller_1.deleteInterview);
exports.default = router;
//# sourceMappingURL=interviews.routes.js.map