const express = require('express')
const router = express.Router()
const batikControllers = require('../controllers/batik')

router.route('/batik')
    .get(batikControllers.index)
    .post(batikControllers.tambah)

router.get('/batik/create', batikControllers.create)
router.get('/batik/:id', batikControllers.show)

router.put('/batik/:id', batikControllers.update)
router.delete('/batik/:id', batikControllers.delete)
router.route('/batik/update').post(batikControllers.baharui)
router.get('/batik/hapus/:id', batikControllers.hapus)
router.route('/batik/update/:_id/:id/:nama/:harga/:password').get(batikControllers.renderUpdate)

//UPDATE DATA
router.put('/batik/:idbatik', batikControllers.update)
//HAPUS DATA
router.delete('/batik/:idbatik', batikControllers.delete)
module.exports = router