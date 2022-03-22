const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/MyUser").then(()=>{

    console.log("db connected")
}).catch((e)=>{

console.log("error in connecting to db",e)
})