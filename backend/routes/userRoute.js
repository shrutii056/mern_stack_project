const express= require("express");
const mongoose = require("mongoose");
const User = require('../models/userModel');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

// Incorrect
User.findById({ id: '66531f2159bf96fbf916eebd' });

// Correct
User.findById('66531f2159bf96fbf916eebd');

// Or if you need to convert a string to an ObjectId
User.findById(new ObjectId('66531f2159bf96fbf916eebd'));
//create
router.post("/",async (req,res)=>{
    const { name , email , age } = req.body;
    
   try {
    const userAdded = await User.create({
        name: name,
        email: email,
        age: age,
    });
    res.status(201).json(userAdded);
   } catch (error) {
    console.log("error",error.message);
    res.status(400).json({error: error.message}) 
   }
});
router.get("/", async (req,res)=> {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
       } catch (error) {
        console.log( error);
        res.send(500).json({error: error.message})
       }
});

//get single user
router.get("/:id", async (req,res)=> {
    const id = req.params;
    try {
        const singleUser = await User.findById({id});
        if(singleUser){
        res.status(200).json(singleUser);}
        else{
            res.status(404).json({ error: "User not found" });
        }
       } catch (error) {
        console.log("error",error.message);
        res.status(500).json({error: error.message});
       }
});

//delete
router.delete("/:id", async (req,res)=> {
    const {id} = req.params;
    try {
        const singleUser = await User.findByIdAndDelete({_id: id});
        res.status(200).json(singleUser);
       } catch (error) {
        console.log("error",error.message);
        res.status(500).json({error: error.message});
       }
});

//patch
router.patch("/:id", async (req,res)=> {
    const {id} = req.params;
    const{name,email,age}=req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        
        res.status(200).json(updateUser);
        
            res.status(404).json({ error: "User not found" });
        }
        catch (error) {
        console.log("error",error.message);
        res.status(500).json({error: error.message});
       }
});

module.exports = router;