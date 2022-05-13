const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash  = require('connect-flash');
const passport = require ('passport');

// Initializations
const app = express();
const bodyParser = require('body-parser');

// Settings
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs",
    exphbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get('views'),'layouts'),
        partialsDir: path.join(app.get('views'),'partials'),
        extname: ".hbs" 
    })
);
app.set("view engine", ".hbs");

// Middleware
app.use(express.urlencoded( {extended : false} ));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp', 
    resave: 'true', 
    saveUninitialized: true,
    useUnifiedTopology: true
}));

//Globals 
/*app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.user  = req.user;
    res.locals.varsession = req.session.Usuario;
    next(); 
 });*/

// routes
app.use(require('./routes/cheque'));
app.use(require('./routes/ingresar'));
app.use(require('./routes/registrar'));
app.use(require('./routes/aprobar'));
app.use(require('./routes/index'));
app.use(require('./routes/saldo'));
app.use(require('./routes/users')); 
app.use(require('./routes/aprobador')); 

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Servidor 
app.listen('8989', function() {
  console.log('Server is running on http://localhost:8989');
}); 