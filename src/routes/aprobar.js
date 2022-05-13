const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

router.post('/aprobar', async (req, res) =>
{
    // variables

    const errors = [];

        // acceder al servidor
        const uri ="mongodb+srv://anayte:12345@monro.waqv2.mongodb.net/monro?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        try {
            // conectar al cliente 
            await client.connect();
    
            // acceder a la base 
            const database = client.db('monro');
            const collection = database.collection('movimiento');
    
            // Query para crear nuevo twit b  
            const movimiento = await collection.find().toArray();

            // imprime lo encontrado
            if (movimiento != null) {
                
                console.log(movimiento);
                res.render('partials/aprobar', { movimiento });
                
            }
            else {
                console.log('Error al cargar');
            }
        }
        catch (err) {
            console.log('err');
            res.redirect('/menu');
        }
        finally {
            // imprime el resultado 
            //run().catch(console.dir);
            // cierra la coneccion 
            await client.close();
        }
 
    
});
    
module.exports = router;