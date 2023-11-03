const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/iNoteBook";

const connectTOMongose = () => {
    mongoose.connect(mongoURI)
    console.log('done')
}


module.exports = connectTOMongose;