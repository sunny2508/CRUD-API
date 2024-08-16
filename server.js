const express = require('express');
const mongoose = require('mongoose');

const app = express();
const {dbConnection} = require('./Database');

const {Book} = require('./Schema');
app.use(express.json());

async function getConnection()
{
    try{
        await dbConnection();
        app.listen(3000,()=>{
            console.log('Server started at port 3000');
        })
    }
    catch(error)
    {
        console.error("Failed to connect to server");
        throw error;
    }
};

//express code
//get request

app.get('/books',async (req,res)=>{
    try{
        await dbConnection();
        const Booksresult =  await Book.find();
        res.json(Booksresult); 
    }
    catch(error)
    {
        console.error("Error occured");
    }
});

//Post request
app.post('/books',async (req,res)=>{
    try{
        await dbConnection();
        const result = await Book.insertMany(req.body);
        res.status(201).json(result);
    }
    catch(error)
    {
        console.error("Error occured",error);
        throw error;
    }
});

//put request
app.put('/books/:_id',async(req,res)=>{
    try{
        await dbConnection();
        const result = await Book.findByIdAndUpdate(
      {_id:req.params._id},{$set:req.body},{new:true});
        res.json(result); 
    }
    catch(error)
    {
        console.error("Error occured");
        throw error;
    }
});

//delete request
app.delete('/books/:title',async (req,res)=>{
    try{
        await dbConnection();
        const result = await Book.deleteMany({title:req.params.title});
        res.json(result);
    }
    catch(error)
    {
        console.error('Error occured');
        throw error;
    }
});

getConnection();