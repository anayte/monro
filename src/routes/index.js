const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/index', (req, res) => {
    res.render('/index');
});

router.get('/cheque', (req, res) => {
    res.render('cheque');
});

router.get('/ingreso', (req, res) => {
    res.render('ingresar');
});

router.get('/saldo', (req, res) => {
    res.render('saldo');
});

router.get('/aprobar', (req, res) => {
    res.render('aprobar');
});

router.get('/aprobados', (req, res) => {
    res.render('aprobar');
});

router.get('/registrar', (req, res) => {
    res.render('registrar');
});

router.get('/menu', (req, res) => {
    res.render('menu');
});

router.get('/aprobador', (req, res) => {
    res.render('aprobar');
});

module.exports = router;