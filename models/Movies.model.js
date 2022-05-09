const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

//  Add your code here
const movieSchema = new Schema(
    {
        title: {type:String},
        genre: {type: String},
        plot: {type: String},
        cast:[{type: Schema.Types.ObjectId,
            ref: 'Celebrity'}]
    }
);

module.exports = model("Movies", movieSchema);