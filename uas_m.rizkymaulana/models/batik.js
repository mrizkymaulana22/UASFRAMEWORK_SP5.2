const mongoose = require('mongoose');
const { Schema } = mongoose

//membuat tabel batik dengan schema
const batikSchema = new Schema({
    nama: String,
    harga: String,
    password: String
}, { timestamps: true });

//ekspor tabel batik
const Batik = mongoose.model('Batik', batikSchema)
module.exports = Batik