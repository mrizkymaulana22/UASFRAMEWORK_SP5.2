const express = require('express')
const batikRouter = require('./router/batik')
const app = express()
const port = 3000

//Aktifkan tambahan setting default untuk req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Membuat koneksi ke database menggunakan mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/uas_mrizkymaulana');

//Tambahkan pesan jika koneksi ke database berhasil
const db = mongoose.connection
db.on('error', function () {
    console.log('Koneksi Gagal')
})
db.once('open', function () {
    console.log('Koneksi Berhasil')
})

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));


const requestTime = function (request, respon, next) {
    date = new Date(); //pesan yang ingin ditampilkan
    console.log(date);
    next();
};

app.use(requestTime); //nama properti middleware bebas
app.set('view engine', 'ejs')//baru
// app.get("/", function (request, respon){
//     const tanggal = "Selamat Belajar Express Js </br>" +
//     "<p><small>Requested at: " + date + "</small>"; //properti pesan dari middleware yang akan ditampilkan
//     respon.send(tanggal);
// });


app.use(batikRouter)

app.listen(port, () => {
    console.log(`Server baik-baik saja`)
})


//Routing halaman utama
// app.get('/', function(request,respon){
//     respon.send('Hallo! Nama Saya Rizky')
// })

// membuat URL/about
app.get("/", function (request, respon) {
    const jualan = {
        Id: 001,
        Nama: "Batik by Rizky Batik",
    };
    respon.render('pages/index', { jualan: jualan })
});
app.get("/about", function (request, respon) {
    respon.render('pages/about')
});
app.use('/asset', express.static('public'))

// // method post untuk create atau mengirimkan ke server untuk disimpan di database
// app.post('/', function(request,respon){
//     respon.send('post!! Tambahkan Mahasiswi Semester 5')
// })

