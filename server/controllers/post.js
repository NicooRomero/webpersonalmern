const Post = require('../models/post');

exports.getPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page,
        limit: parseInt(limit),
        sort: { date: "desc" }
    }

    try {        

        let postStored = await Post.paginate({}, options);

        if(!postStored) {
            res.status(404).send({ code: 400, message: "No se han encontrado posts."});
        } else {
            res.status(200).send({ code: 200, posts: postStored });
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde."});
    }
    
}

exports.addPost = async (req, res) => {
    const body = req.body;
    
    try {
        
        let post = await new Post(body);

        await post.save()

        if(!post) {
            res.status(400).send({ code: 400, message: "Error al crear el post."})
        } else {
            res.status(200).send({ code: 200, message: "Post creado con éxito."})
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.updatePost = async (req, res) => {
    const postData = req.body;
    const params = req.params;

    try {

        let postUpdate = await Post.findByIdAndUpdate(params.id, postData);

        if(!postUpdate) {
            res.status(400).send({ code: 400, message: "No se han econtrado posts."});
        } else {
            res.status(200).send({ code: 200, message: "El post se ah actualizado correctamente!"});
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.deletePost = async (req, res) => {
    const params = req.params;

    try {
        
        let postDelete = await Post.findByIdAndRemove(params.id);

        if(!postDelete) {
            res.status(400).send({ code: 400, message: "No se han encontrado posts."})
        } else {
            res.status(200).send({ code: 200, message: "El post se ah eliminado con éxito!" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.getPost = async (req, res) => {
    const { url } = req.params;

    try {
        
        let postStored = await Post.findOne( { url } );

        if(!postStored) {
            res.status(400).send({ code: 400, message: "No se han encontrado posts."})
        } else {
            res.status(200).send({ code: 200, post: postStored })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.totalPosts = async (req, res) => {

    try {

        let total = await Post.countDocuments({})

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