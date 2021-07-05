const Menu = require('../models/menu');

exports.getMenu = (req, res) => {
    Menu.find()
        .sort({ order: 'asc' })
        .exec((error, menuStored) => {
            if(error) {
                res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde."});
            } else {
                if(!menuStored) {
                    res.status(404).send({ message: "Error al obtener los menú."});
                } else {
                    res.status(200).send({ menu: menuStored });
                }
            }
        })
}

exports.addMenu = async (req, res) => {
    const { title, url, order, active } = req.body;

    try {
        const menu = await new Menu(req.body);

        await menu.save((err, createdMenu) => {
            if(err) {
                res.status(500).send({ message: "Error en el servidor."});
            } else {
                if(!createdMenu) {
                    res.status(404).send({ message: "Error al crear el menú"});
                } else {
                    res.status(200).send({ message: "Menú creado correctamente!"});
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.updateMenu = async (req, res) => {
    let menuData = req.body;
    const params = req.params;

    try {
        let updateMenu = await Menu.findByIdAndUpdate(params.id, menuData);

        if (!updateMenu) {
            res.status(404).send({ message: "No se ha encontrado ningun menú."})
        } else {
            res.status(200).send({ message: "Menú se ha actualizado correctamente!"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.activeMenu = async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    try {
        let menuActive = await Menu.findByIdAndUpdate(id, { active });

        let state = await Menu.findById(id);
        // console.log(state)
        // console.log(state.active)

        if(!menuActive) {
            res.status(404).send({ message: "No se ha encontrado ningún menú."});
        } else {
            if( state.active === true ) {
                res.status(200).send({ message: "Menú activado correctamente!"});
            } else {
                res.status(200).send({ message: "Menú desactivado correctamente!"});
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.deleteMenu = async (req, res) => {
    const { id } = req.params;

    try {
        
        let menuDeleted = await Menu.findByIdAndDelete(id);

        if(!menuDeleted) {
            res.status(404).send({ message: "Menú no encontrado."});
        } else {
            res.status(200).send({ message: "Menu eliminado con éxito!"});
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.totalMenus = async (req, res) => {

    try {

        let total = await Menu.countDocuments({})

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