const express=require('express');
const app=express();
const cors=require('cors');
const useRouter = require('./route/user.route');
var session = require('express-session');
var passport=require('passport');
const path = require('path');
var MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config()
require('./Config/passport')
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
var store = new MongoDBStore(
    {
      uri:process.env.URL,
      collection: "Session"
    })
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store:store
//   cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session())
app.use('/user',useRouter)
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, './Views/index.html'));

   })
app.use((req,res,next)=>{
    res.status(404).send({message:"404 not found"})
})
app.use((err,req,res,next)=>{
    res.status(500).send({message:"Server error , something is broken"})
})
module.exports=app