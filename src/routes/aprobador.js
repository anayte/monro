const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

router.post('/aprobador', async (req, res) =>
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
    
            // Query para crear nuevo twit
            const query1 = { estado: "pendiente" };
            const quiery2s = { $set: { estado: "aceptado" } };


            const actualizacion = collection.updateMany(query1, quiery2s);

            if(actualizacion!=null){

                const movimiento = await collection.find().toArray();

                // imprime lo encontrado
                if (movimiento != null) {
                    
                    console.log(movimiento);
                    res.render('partials/aprobar', { movimiento });
                    
                }
                else {
                    console.log('Error al cargar');
                }

            }else {
                console.log("Error en liberar");
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