const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/codeWithCoffee", {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true
}).then(()=>{
    console.log(`Connection successful`);
}).catch((e)=>{
    console.log(`No Connection`);
})

