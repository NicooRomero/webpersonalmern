const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');
const { exists } = require('../models/user');

exports.signUp = async (req, res) => {

    const { email, password } = req.body

    try {
        
        let user = await User.findOne({ email });

        if(user) {
            return res.status(404).json({ message: "Usuario ya existe"})
        }

        user = new User(req.body);

        user.email = email.toLowerCase();
        user.active = true;

        if(!password) {
            res.status(404).send({ status: 400, message: "La contraseña es obligatoria." });
        } else {
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);
            res.status(202).send({ status: 200, message: "Usuario creado con éxito!" });
        }

        user.save();

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo mas tarde." });
    }
}

exports.signIn = async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).send({ message: "El usuario no existe." });
        }

        const passOk = await bcryptjs.compare(password, user.password);
        if(!passOk) {
            return res.status(400).send({ message: "Password incorrecta" });
        }

        if(!user.active) {
            return res.status(400).send({ message: "El usuario no esta activado" });
        } else {
            return res.status(200).send({ accessToken: jwt.accessToken(user), refreshToken: jwt.refreshToken(user), dataUser: user.name });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
    }
}

exports.getUsers = async (req, res) => {

    try {

        let users = await User.find();

        if(!users) {
            res.status(404).send({ message: "No se han encontrado usuarios."})
        } else {
            res.status(200).send({ users });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
    }
    
}

exports.getUsersActive = (req, res) => {
    const query = req.query;

    User.find({ active: query.active }).then(users => {
        if(!users) {
            res.status(404).send({ message: "No se han encontrado usuarios"});
        } else {
            res.status(200).send({ users });
        }
    })
    
    // try {
        
    //     let usersActive = await User.find({ active: query.active });

    //     if(!usersActive) {
    //         res.status(404).send({ message: "No se han encontrado usuarios activos." });
    //     } else {
    //         res.status(200).send({ usersActive });
    //     }

    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
    // }
}

exports.uploadAvatar = async (req, res) => {
    const params = req.params;

    try {

        let userData = await User.findById({ _id: params.id });

            if(!userData) {
                res.status(400).send({ message: 'No se ha encontrado el usuario.'});
            } else {
                let user = userData;

                if(req.files) {
                    let filePath = req.files.avatar.path;                    
                    let fileSplit = filePath.split('\\');                    
                    let fileName = fileSplit[2];                    

                    let extSplit = fileName.split('.');
                    let fileExt = extSplit[1];

                    if(fileExt !== 'png' && fileExt !== 'jpg') {
                        res.status(400).send({ message: 'Extension de imagen no válida. (Solo admite png o jpg)' });
                    } else {
                        user.avatar = fileName;
                        let userResult = await User.findByIdAndUpdate({ _id: params.id }, user );

                            if(!userResult) {
                                res.status(404).send({ message: 'Usuario no encontrado' });
                            } else {
                                res.status(200).send({ avatarName: fileName });
                            }
                    }
                }
            }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
    }    
}

exports.getAvatar = (req, res) => {
    const avatarName = req.params.avatarName;    
    const filePath = './uploads/avatar/' + avatarName;    

    fs.exists(filePath, exists => {
        if(!exists) {
            res.status(404).send({ message: 'Avatar inexistente' });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    })
}

exports.updateUser = async (req, res) => {
    const userData = req.body;
    userData.email = req.body.email.toLowerCase();
    const params = req.params;

    try {

        if(userData.password) {
            const salt = await bcryptjs.genSalt(10);
            userData.password = await bcryptjs.hash(userData.password, salt);
        }

        let userUpdate = await User.findByIdAndUpdate({ _id: params.id }, userData);

        if(!userUpdate){
            res.status(404).send({ message: "El usuario no existe."});
        } else {
            res.status(200).send({ message: "Usuario actualizado correctamente!"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
    }
}

exports.activeUser = async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    try {
        
        let userStored = await User.findByIdAndUpdate( id, { active } );

        if(!userStored) {
            res.status(404).send({ message: "El usuario no existe."});
        } else {
            if(active === true) {
                res.status(200).send({ message: "Usuario activado con éxito!"});
            } else {
                res.status(200).send({ message: "Usuario desactivado con éxito!"});
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
    }
}

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.findByIdAndRemove(id, (err, userDeleted) => {
        if(err) {
            res.status(500).send({ message: 'Error en el servidor.'})
        } else {
            if(!userDeleted) {
                res.status(404).send({ message: 'El usuario no existe.'})
            } else {
                res.status(200).send({ message: 'El usuario se ha borrado exitosamente!'})
            }
        }
    })
}

exports.signUpAdmin = async (req, res) => {

    const { name, lastname, email, role, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ message: 'Usuario ya existe'})
        }

        user = new User(req.body);

        user.active = false;

        if(!password) {
            res.status(404).send({message: "La contraseña es obligatoria."});
        } else {
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);
            res.status(202).send({message: "Usuario creado con éxito."});
        }

        user.save();
        
    } catch (error) {
        console.log(error)
        res.status(400).send('Ocurrió un error');
    }
    

    
}

exports.totalUsers = async (req, res) => {

    try {

        let total = await User.countDocuments({})

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