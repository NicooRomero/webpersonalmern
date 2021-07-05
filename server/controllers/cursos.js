const Curso = require('../models/cursos');

exports.addCurso = async (req, res) => {
    const body = req.body;

    try {
        const curso = await new Curso(body);

        curso.save((error, cursoStored) => {
            if(error) {
                res.status(400).send({ message: "El curso ya existe." });
            } else {
                if(!cursoStored) {
                    res.status(400).send({ message: "Error al crear el curso." });
                } else {
                    res.status(200).send({ message: "Curso creado correctamente." });
                }
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
    }
}

exports.getCursos = (req, res) => {
    Curso.find()
        .exec((error, cursosStored) => {
            if(error) {
                res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
            } else {
                if(!cursosStored) {
                    res.status(404).send({ message: "No se han encontrado cursos." });
                } else {
                    res.status(200).send({ cursos: cursosStored });
                }
            }
        })
}

exports.deleteCurso = (req, res) => {
    const { id } = req.params;

    Curso.findByIdAndDelete(id, (err, cursoDeleted) => {
        if(err) {
            res.status(500).send({ code: 500, message: "Error en el servidor." })
        } else {
            if(!cursoDeleted) {
                res.status(404).send({ code: 404, message: "No se han econtrado cursos." })
            } else {
                res.status(200).send({ code: 200, message: "El curso se a eliminado correctamente!" })
            }
        }
    })
}

exports.updateCurso = (req, res) => {
    const cursoData = req.body;
    const id = req.params.id;

    Curso.findByIdAndUpdate(id, cursoData, (err, cursoUpdate) => {
        if(err) {
            res.status(500).send({ code: 500, message: "Error en el servidor." })
        } else {
            if(!cursoUpdate) {
                res.status(404).send({ code: 404, message: "No se han econtrado cursos." })
            } else {
                res.status(200).send({ code: 200, message: "El curso se a editado correctamente!" })
            }
        }
    })
}

exports.totalCursos = async (req, res) => {

    try {

        let total = await Curso.countDocuments({})

        if(!total) {
            res.status(400).send({ message: "No hay usuarios registrados."})
        } else {
            res.status(200).send({ count: total })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
    }
    
}