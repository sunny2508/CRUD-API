const mongoose = require('mongoose');
const dbname = 'MyDatabse';
const url = `mongodb://127.0.0.1:27017/${dbname}`;

let db;
const dbConnection = async ()=>{
    
    if(!db)
    {
        try{
            db = await mongoose.connect(url);
            console.log("Connected to mongodb successfully");
        }
        catch(error)
        {
            console.error("Error occured");
        }
        return db;
    }
};

module.exports = {dbConnection}