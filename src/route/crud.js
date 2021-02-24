const express = require('express');
const router = express.Router();

const pool = require('../db');

router.get('/add', async (req, res) =>{
    //le envio los datos a la vista por medio de una consulta SQL
    const articulo = await pool.query('SELECT * FROM articulos');
    //envio los datos de la constante a la vista (puedo enviar varias, separando por comas)
    res.render('partial/index', { articulo });
});

router.post('/addarticulo', async (req, res) =>{
    //console.log(req.body);
    //usando el destructuring llamamos a los 'names' de los inputs del body
    const { nombre, img, descripcion } = req.body;
    const newArticulo = {
        nombre,
        img,
        descripcion
    };
    console.log(newArticulo);

    //guaradamos los datos en la BD
    await pool.query('INSERT INTO articulos set ?', [newArticulo]);
    res.redirect('/add');
});

router.get('/delete/:id', async (req, res) =>{
    const { id } = req.params; 
    await pool.query('DELETE FROM articulos WHERE id = ?', [id]);
    res.redirect('/add');
});

router.get('/editar/:id', async (req, res) =>{
    const { id } = req.params; 
    //envio los datos mediante una consulta query asignada a una constante
    const articulos = await pool.query('SELECT * FROM articulos WHERE id = ?', [id]);
    //le envio a la vista el articulo obtenido
    res.render('partial/edit', {articulo: articulos[0]});
});

router.post('/editar/:id', async (req, res) =>{
    //console.log(req.body);
    //usando el destructuring llamamos a los 'names' de los inputs del body
    const { nombre, img, descripcion } = req.body;
    const { id } = req.params; 
    const newArticulo = {
        nombre,
        img,
        descripcion
    };
    console.log(newArticulo);

    //guaradamos los datos en la BD
    await pool.query('UPDATE articulos set ? WHERE id =?', [newArticulo, id]);
    res.redirect('/add');
});


module.exports = router;