const watchServices = require("../services/watchService");
const watchService = new watchServices();

async function getWatchs(req, res) {
    try {
        console.log("pagina: ", req.query.page);
        watchService.get(
            parseInt(req.query.page),
            (validar, docs, pags) => {
                if (validar) {
                    var respuesta = {
                        docs: docs,
                        paginas: parseInt(pags)
                    };
                    res.status(200).json(respuesta);
                } else {
                    res.status(400).json({ docs: {}, paginas: 0 });
                }
            }, parseInt(req.query.orden)
        );
    } catch (error) {
        res.status(500).json({ docs: {}, paginas: 0 });
    }
}

module.exports.getWatchs = getWatchs;

async function getwatch(req, res) {
    try {
        console.log(req.params.id)
        if(req.params.id){
            watchService.getwatch( req.params.id, (validar, watchos) => {
                if (validar) {
                    res.status(200).json(watchos);
                } else {
                    res.status(400).json({});
                }
            });
        }else{
            res.status(500).json({});
        }
        
    } catch (error) {
        console.log("Error: ");
        console.log(error);
        res.status(500).json({});
    }
}

module.exports.getwatch = getwatch;

async function createWatchs(req, res) {
    try {
        console.log("Req.body: ");
        console.log(req.body);
        var watchs = {
            Banda: req.body.Banda,
            Genero: req.body.Genero,
            Vocalista: req.body.Vocalista,
            NumAlbunes: req.body.NumAlbunes,
            Precio: parseFloat(req.body.Precio),
        };
        watchService.create(watchs, validar => {
            if (validar) {
                res.status(201).json({ result: "success", msg: "watch creado" });
            } else {
                res.status(400).json({ result: "error", msg: "No se pudo crear" });
            }
        });
    } catch (error) {
        console.log("Error: ");
        console.log(error);
        res.status(500).json({ result: "error", msg: "No se pudo crear" });
    }
}

module.exports.createwatch = createWatchs;

async function updatewatchoratorio(req, res) {
    try {
        console.log("Req.body: ");
        console.log(req.body);
        var watchs = {
           
            Banda: req.body.Banda,
            Genero: req.body.Genero,
            Vocalista: req.body.Vocalista,
            NumAlbunes: req.body.NumAlbunes,
            precio: parseFloat(req.body.precio),

        };

        watchService.update(req.body.id,watchs, validar => {
            if (validar) {
                res.status(201).json({ result: "success", msg: "watchs update" });
            } else {
                res.status(400).json({ result: "error", msg: "No se pudo crear" });
            }
        });
    } catch (error) {
        console.log("Error: ");
        console.log(error);
        res.status(500).json({ result: "error", msg: "No se pudo crear" });
    }
}

module.exports.updatewatch = updatewatchoratorio;

async function deletewatchoratorio(req, res) {
    try {
        watchService.delete(req.body._id, validar => {
            if (validar) {
                res.status(201).json({ result: "success", msg: "watchoratorio eliminado" });
            } else {
                res.status(400).json({ result: "error", msg: "No se pudo eliminar" });
            }
        });
    } catch (error) {
        console.log("Error: ");
        console.log(error);
        res.status(500).json({ result: "error", msg: "No se pudo eliminar" });
    }
}

module.exports.deletewatch = deletewatchoratorio;
