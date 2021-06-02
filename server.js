const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const requireAuth = require('./middleware/auth');
const path = require('path');

const app = express();

//connect database
connectDB();

//prevents cors errors and protecting API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// middleware
app.use(express.static('public'));
//parses incoming requests and it returns an Object.
app.use(express.json());
app.use(cookieParser());
//important get encoded data in the url(post request) and passes an object that we can use
app.use(express.urlencoded({extended: true}));

// view engine
app.set('view engine', 'ejs');


//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/posts'));
app.use('/api/report', require('./routes/report'));
app.use('/api/stripe', require('./routes/payment'));


//serve static assets in productions
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));