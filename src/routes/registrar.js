const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");


router.post('/registrar', async (req, res) =>
{

    // variables 

    const uri ="mongodb+srv://anayte:12345@monro.waqv2.mongodb.net/monro?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    const { apodo, paswd1, paswd2, saldo, tipo } = req.body;
    const usr = apodo;
    const psw = paswd1;
    const sal = saldo;
    const tip = tipo;
    const estado = 'pendiente';
    const hoy = new Date();
    const errors = [];

    try
    {
        // conectar al cliente 
        await client.connect();

        // acceder a la base
        const database = client.db('monro');
        const collection_1 = database.collection('movimiento');
        const collection_2 = database.collection('login');
        const collection_3 = database.collection('saldo');

        // Query para encontrar al usuario
        const query_1 = {
            usuario: usr,
            contra: psw,
            saldo: sal,
            tipo: tip };
    
        const query_2 = {
            para: usr,
            date: hoy,
            monto: sal,
            estado: estado
        };
            
        
        const query_3 = {
            acreditado: sal,
            usuario: usr
        };
    
        const validar_1 = await collection_1.insertOne(query_2);
        const validar_2 = await collection_2.insertOne(query_1);
        const validar_3 = await collection_3.insertOne(query_3)
    
        // imprime lo encontrado 
        if(validar_1 != null){
            console.log('creado correctamente');
            console.log(validar_1, validar_2, validar_3);
            res.redirect('/menu')
        }
        else
        {
            console.log('Error al guardar');
            res.redirect('/registrar')
        }
    }
    catch (err)
    {
        console.log('err');
        res.redirect('/menu')
    }
    finally
    {
        // cierra la coneccion 
        await client.close();
    }

});

module.exports = router;