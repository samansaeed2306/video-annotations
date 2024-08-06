import express from 'express';
import { addAnnotation } from '../controllers/annotationController.js';

const router = express.Router();

router.post('/addannotations', addAnnotation);

export default router;
