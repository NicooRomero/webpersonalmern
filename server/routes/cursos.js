const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursos');
const auth = require('../middleware/authenticated');

router.post('/add-curso', [auth.ensureAuth], cursosController.addCurso);
router.get("/get-cursos", cursosController.getCursos);
router.put("/update-curso/:id", [auth.ensureAuth], cursosController.updateCurso);
router.delete("/delete-curso/:id", [auth.ensureAuth], cursosController.deleteCurso);
router.get("/total-cursos", [auth.ensureAuth], cursosController.totalCursos);


module.exports = router;