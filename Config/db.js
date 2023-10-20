const mongoose=require('mongoose');


mongoose.connect(process.env.URL).then(()=>{
    console.log("mongoose is connected")
})
.catch((error)=>{
    console.log(error.message)
})