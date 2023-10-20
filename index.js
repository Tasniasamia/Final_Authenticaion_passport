const app=require('./app');
require('dotenv').config();
require('./Config/db')
const Port=process.env.PORT || 3083;

app.listen(Port,()=>{
    console.log(`The server is http://localhost:${Port}`);
})