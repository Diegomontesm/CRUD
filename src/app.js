const express = require('express');
const app=express();
const path=require('path');
const morgan=require('morgan');
const mysql =require('mysql');
const myConnection =require('express-myconnection');



//impoerting routers
const customerRoutes = require('./routes/customer'); 

//Configurar express settings
app.set('port', process.env.PORT || 3000);

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//middlewares ANTES DE LAS PETICIONES DE LOS USUARIOS
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: '127.0.0.1',
    user: 'root',
    password: 'abc1234',
    port: 3306,   
    database: 'crudnodejsmysql'
}, 'single'));

app.use(express.urlencoded({extended:false}));


//ROUTES son las peticiones
app.use('/', customerRoutes);

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), ()=> {
    console.log('Server on port 3000');
})