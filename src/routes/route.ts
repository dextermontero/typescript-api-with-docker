import express from 'express';
import controller from '../controllers/indexController';

const router = express.Router();

router.get('/', controller.getAllData);
router.get('/view/:id', controller.getId);
router.post('/create', controller.createData);
router.put('/update/:id', controller.updateData);
router.get('/delete/:id', controller.deleteDataById);

export = router;