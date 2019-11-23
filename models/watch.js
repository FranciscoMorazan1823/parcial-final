var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var watch = new Schema(
    {
        Banda: {type: String, unique: true},
        Genero: { type: String, required: true },
        Vocalista: { type: String, required: true },
        NumAlbunes: { type: String, default: "other" },
        Precio: { type: Number, required: true  },
    }
);
module.exports = mongoose.model("watchs", watch);
