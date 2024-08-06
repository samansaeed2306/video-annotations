import express from 'express';
import * as controller from '../controllers/annotationController.js';

const router = express.Router();

router.post('/addannotations', controller.addAnnotation);
router.put('/updateannotation/:id', controller.updateAnnotation);

export default router;
