const express = require('express');

const PositionCtrl = require('../controllers/position-ctrl');

const router = express.Router();

router.post('/position', PositionCtrl.createPosition);
router.put('/position/:id', PositionCtrl.updatePosition);
router.delete('/position/:id', PositionCtrl.deletePositionById);
router.get('/positions', PositionCtrl.getAllPositions);

module.exports = router;
