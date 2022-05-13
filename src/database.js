
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://anayte:12345@monro.waqv2.mongodb.net/Monro?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(db => console.log(' DB is connected'))
.catch( err => console.error(err)); 
