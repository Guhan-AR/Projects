const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        // useNewUrlParser:true
        // useUnifiedTopology:true //what is the purpose of these two lines
    }).then(con=>{
        console.log(`momgo db is connected to the host: ${con.connection.host}`)
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDatabase;