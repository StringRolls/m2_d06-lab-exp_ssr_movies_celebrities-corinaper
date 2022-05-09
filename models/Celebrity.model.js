const { Schema, model } = require("mongoose");

//  Add your code here
const celebSchema = new Schema(
    {
        name: {type:String},
        occupation: {type: String},
        catchPhrase: {type: String, required: [true, "Catchphrase is required."]}
    }
);

module.exports = model("Celebrity", celebSchema);