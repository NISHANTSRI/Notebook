const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const {body, validationResult} = require('express-validator');
//get all the notes

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
    }

})

// add a new note using post
router.post('/addnotes', fetchuser,[
    body('title','enter a valid title').isLength({min:3}),
    body('description','atleat there there should be 5 digits in the description').isLength({min:5}),
], async (req,res)=>{
    const {title,description,tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Notes({
            title,description,tag,user : req.user.id,
        })
    
        const savedNote = await note.save();
    
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
    }

    
})

// updating an existing notes. Login is required in this case

router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
 const {title, description, tag} = req.body;
 try {
     //creating a new note named as newnode and filing it using the json that has been entered
 const newnote = {};
 if(title){
     newnote.title = title
 };
 if(description){
     newnote.description = description
 };
 if(tag){
     newnote.tag = tag
 };

 //checking whelther that the user using the notes actually belongs to that user
 var note = await Notes.findById(req.params.id);
 if(!note){
     return res.status(404).send('note does not exist');
 }
 if(note.user.toString() !== req.user.id){
     return res.status(401).send('you are not allowed to access others notes')
 }

 // if above cases does not fall then the user is verified
 // now we can update the notes

 note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
 res.json({note})
 } catch (error) {
     console.error(error.message);
     res.status(500).send('internal server error');
 }
 
})

// deleting a note by the user

router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{

    try {
        //checking whelther that the user using the notes actually belongs to that user
    // found the note or not
    var note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send('note does not exist');
    }
    // does the note belongs to the current user
    if(note.user.toString() !== req.user.id){
        return res.status(401).send('you are not allowed to access others notes')
    }
   
    // if above cases does not fall then the user is verified
    // now we can delete the notes
   
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"the note has been successfully deleted"})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error')
    }
   })

   


module.exports = router;