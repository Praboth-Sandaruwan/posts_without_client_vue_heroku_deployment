const express = require('express');
const mongodb = require('mongodb');
const {ObjectId} = require('mongodb');

const router = express.Router();


//METHOD:GET
//RETURN:Array of posts
//ACCESS:Public
router.get('/', async (req,res)=>{
    try{
        const collection = req.app.locals.collection;
        const posts = await collection.find({}).toArray();
        res.status(200).send(posts);
    }catch(e){
        console.dir(e);
    }
})

//METHOD:POST
//RETURN:Result object {acknowledge,insertedId}
//ACCESS:Public
router.post('/', async (req,res) => {
    try {
        const collection = req.app.locals.collection;
        const post = {
            text:req.body.text,
            createdAt:new Date()
        }
        const result = await collection.insertOne(post);
        console.dir(result);
        if(!result.insertedId){
            res.status(404).json({...result,"message":"Content not inserted"});
        }
        res.status(201).send(result);
    }catch(e){
        console.dir(e);
    }
})

//METHOD:DELETE
//RETURN:Result object {deletedCount}
//ACCESS:Public
router.delete('/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const collection = req.app.locals.collection;
        const result = await collection.deleteOne({_id: new ObjectId(id)});
        console.dir(result);
        if(result.deletedCount == 0){
            res.status(404).json({...result,"message":"Content not found"});
        }
        res.status(204).send({});
    } catch(e){
        console.dir(e);
    }
})

module.exports = router;
