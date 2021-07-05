const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu');
const auth = require('../middleware/authenticated');

router.get('/get-menu', menuController.getMenu);
router.post('/add-menu', [auth.ensureAuth], menuController.addMenu);
router.put('/update-menu/:id', [auth.ensureAuth], menuController.updateMenu);
router.put('/activate/:id', [auth.ensureAuth], menuController.activeMenu);
router.delete('/delete-menu/:id', [auth.ensureAuth], menuController.deleteMenu);
router.get('/total-menus', [auth.ensureAuth], menuController.totalMenus)

module.exports = router;