const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");


router.post('/cheque', async (req, res) =>
{

    // variables 
    const { para, de, monto, fecha } = req.body;
    const acreditarse = para;
    const debitarse = de;
    const saldo = monto;
    const hoy = new Date();
    const pendiente = 'pendiente';
    const errors = [];

    const uri ="mongodb+srv://anayte:12345@monro.waqv2.mongodb.net/monro?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
        try
        {
            // conectar al cliente 
            await client.connect();

            // acceder a la base
            const database = client.db('monro');
            const collection_1 = database.collection('movimiento');
            const collection_2 = database.collection('saldo');

            // Query para encontrar al usuario
            const query_1 = {
                usuario: acreditarse,
                date: hoy,
                acreditado: saldo };
        
            const query_2 = {
                usuario: debitarse,
                date: hoy,
                debitado: saldo };
            
            const query_3 = {
                para: acreditarse,
                de: debitarse,
                date: hoy,
                estado: pendiente,
                monto: saldo };
        
            const validar_1 = await collection_2.insertOne(query_2);
            const validar_2 = await collection_2.insertOne(query_1);
            const validar_3 = await collection_1.insertOne(query_3)
        
            // imprime lo encontrado 
            if(validar_1 != null){
                console.log('creado correctamente');
                console.log(validar_1, validar_2, validar_3);
                res.redirect('/saldo')
            }
            else
            {
                console.log('Error al guardar');
                res.redirect('/menu')
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