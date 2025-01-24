const express = require("express")
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const {body, validationResult} = require("express-validator")

// Route 1: Get All The Notes Of A User Using localhost:5000/notes/fetchnotes (POST) (Login Required)
router.post("/fetchnotes",fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user})
      return res.json({notes})
    }
    catch (error) {
        console.error(error.message)
      return res.status(500).json({error:"Internal Server Error Occurred!"});
    }
});

// Route 2: Add a new Note to A User Using localhost:5000/notes/addnote (POST) (Login Required)
router.post("/addnote",fetchuser,[
    body("title", "Please Enter A Valid Title!").isLength({min: 3}),
    body("description", "Description Must Be Atleast 5 Characters!").isLength({min: 5}),
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const note = new Notes({
            user: req.user,
            title:  req.body.title,
            description: req.body.description,
            tag: req.body.tag ? req.body.tag : "General"

        })
        await note.save()
      return res.json(note)
    }
    catch (error) {
        console.error(error.message)
      return res.status(500).json({error:"Internal Server Error Occured!"})
    }
})

// Route 3: Update An Exisitng Note Of A User Using localhost:5000/notes/updatenote (PUT) (Login Required)
router.put("/updatenote/:id",fetchuser, async (req, res)=>{
    try {
        const newNote = {}
        if(req.body.title){newNote.title = req.body.title};
        if(req.body.description){newNote.description = req.body.description};
        if(req.body.tag){newNote.tag = req.body.tag}else{newNote.tag = "General"};

        const note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send({error: "Note Not Found!"})
        }
        if(note.user.toString() !== req.user){
            return res.status(401).send({error: "Access Denied!"})
        }
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},{new: true});
      return res.json({updatedNote});
    }
    catch (error) {
        console.error(error.message)
      return res.status(500).json({error:"Internal Server Error Occured!"})
    }
})

// Route 4: Delete An Exisitng Note Of A User Using localhost:5000/notes/deletenote (PUT) (Login Required)
router.put("/deletenote/:id",fetchuser, async (req, res)=>{
    try {
        const note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send({error: "Note Not Found!"});
        }
        if(note.user.toString() !== req.user){
            return res.status(401).send({error: "Access Denied!"});
        }
        await Notes.findByIdAndRemove(req.params.id);
      return res.send({"Success":"Note Successfully Deleted"});
    }
    catch (error) {
        console.error(error.message)
      return res.status(500).json({error:"Internal Server Error Occured!"})
    }
})


module.exports = router;