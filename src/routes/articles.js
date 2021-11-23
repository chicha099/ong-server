const { Router } = require('express');
const { Users, Transactions, Articles } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Registro de articulos
router.post('/creacion', async (req, res, next) => {

    try {
        const { title, img, description, category } = req.body;

        let articleInstance = await Articles.create({
            title: title,
            img: img,
            description: description,
            category: category,
            voteCount: 0,
        });

        res.status(200).json(articleInstance);
    }
    catch (error) {
        next(error);
    }
})

// Solicitud de articulos
router.get('/', async (req, res, next) => {

    const { category } = req.query;

    if (category) {
        if (category === "News" || category === "Projects") {
            try {
                let article = await Articles.findAll({
                    where: {
                        category: category,
                    }
                });

                return article ? res.status(200).json(article) : res.status(200).send("No se encontraron articulos para esa category");
            }
            catch (error) {
                next(error);
            }
        }
        else {
            return res.status(200).send("Ingresaste una categoria que no existe.");
        }

    }
    else {
        let allArticles = await Articles.findAll({
            attributes: ["id", "title", "img", "description", "category", "voteCount", "createdAt"],
        });

        //Promise.all(allUsers).then(resp => res.status(200).json(allArticles));
        return res.status(200).json(allArticles);
    };

})

// Modificacion de articulos
router.put('/', (req, res) => {



    //res.send("soy articles");
})

// Borrado de articulos
router.delete('/delete', async (req, res, next) => {
    try {
        const { deleteid } = req.query

        await Articles.destroy({
            where: {
                id: deleteid,
            }
        });
        return res.status(200).send("Acticulo eliminado exsitosamente")

    } catch (error) {
        next(error)
    }
});

module.exports = router;