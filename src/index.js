const express = require('express');
const exhbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

//importamos la base de datos
const { database } = require('./keys');

const app = express();

//settings

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));

//configuro engine del motor de vistas
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partial'),
    //configuro el nombre de los archivos handlebars
    extname: '.hbs'
}));
//asigno las configuraciones de a vista a la nueva extension asignada
app.set('view engine', '.hbs');


//middlewares
app.use(morgan('dev'));
//-->configuracion de envio de datos en express
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./route/crud.js'));

//Public
app.use(express.static(path.join(__dirname, 'public')));


//Inicio de servidor
app.listen(app.get('port'), () => {
    console.log("Servidor en puerto: ", app.get('port'));
});