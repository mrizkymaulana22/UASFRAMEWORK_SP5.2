const { response } = require("express")
const { render } = require("express/lib/response")
const res = require("express/lib/response")

//import modul Batik dari file batik.js dimodels
//import tabel Batik
const Batik = require("../models/batik")

module.exports = {
    index: function (req, res) {
        Batik.find(function (error, batik) {
            if (error) console.log(error)
            console.log(batik)
            res.render('pages/batik/index', { batik })
        })
    },

    //mencarii
    // index: function (req, res) {
    //     Batik.findOne({ harga: '20000'}, function (error, batik) {
    //         if (error) console.log(error)
    //         console.log(batik)
    //         res.render('pages/batik/index',{batik})
    //     })
    // },

    show: function (req, res) {
        const id = req.params.id

        Batik.findById(id, function (error, data) {
            if (error) console.log(error)
            console.log(data)
            res.render('pages/batik/show', { batik: data })


            // const data = batik.filter(batik =>{
            //     return batik.id == id
            // })

        })
    },

    create: function (req, res) {
        res.render('pages/batik/create')
    },

    tambah: function (req, res) {
        const batik = new Batik({
            nama: req.body.nama,
            harga: req.body.harga,
            password: req.body.password
        })
        batik.save(function (error) {
            if (error) return handleError(error);
            res.redirect('/batik')
        })
    },

    // tambah: function (req, res) {
    //     batik.push({
    //         id: req.body.id,
    //         nama: req.body.nama,
    //         harga: req.body.harga
    //     })
    //     res.redirect('/batik')
    // },

    update: function (req, res) { //Memperbaharui data
        const id = req.params.idbatik;
        let isFound = false
        console.log(id)
        Batik.filter(proj => { //Filter adalah metode update dari javascript (agar data katalog di filter satu/satu)
            if (proj.idbatik == id) { //Untuk pengecekan kondisi
                proj.nama = req.body.nama
                proj.harga = req.body.harga
                proj.password = req.body.password

                res.send({
                    status: true,
                    data: batik,
                    message: "Project berhasil diperbaharui",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
                return proj //return data katalog yang baru
            }
        })
        if (isFound == false) {
            res.send({
                status: false,
                message: "batik tidak ditemukan"
            })
        }
        res.json(batik) //tampilkan data katalog yang baru
    },
    baharui: function (req, res) {
        const _id = req.body._id
        const id = req.body.id
        const nama = req.body.nama
        const harga = req.body.harga
        const password = req.body.password
        const filter = { _id: _id };
        const update = {
            id: id,
            nama: nama,
            harga: harga,
            password: password
        };
        Batik.updateOne(filter, update, function (err) {
            console.log(nama, harga, password)
            res.redirect('/batik')
        });


    },
    renderUpdate: function (req, res) {
        const id = req.params._id
        Batik.findById(id, function (error, data) {
            if (error) console.log(error)
            console.log(data)
            res.render('pages/batik/update', { batik: data })
        })
    },

    hapus: function (req, res) {
        const id = req.params.id
        Batik.deleteOne({ _id: id }, function (err) {
            if (err) return console.log(err);
            res.redirect('/batik')
        });
    },
    delete: function (req, res) { //Menghapus data
        const id = req.params.idbatik;
        let isFound = false
        batik.filter(proj => {
            if (proj.idbatik == id) {
                const index = batik.indexOf(pro)
                batik.splice(index, 1)
                res.send({
                    status: true,
                    data: batik,
                    message: "Project berhasil dihapus",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
            }
        })
        if (isFound == false) {
            res.json({
                status: false,
                message: "Project tidak ditemukan"
            })
        }
        res.json(batik)
    }
}