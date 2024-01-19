const router = require("express").Router()


const songs = require('../models/song')


 
router.post('/save' , async (req, res) => {
     
    const newSong = songs({
       name : req.body.name ,
       imageURL : req.body.imageURL ,
       songUrl : req.body.songUrl ,
       song : req.body.song ,
       artist : req.body.artist , 
       language : req.body.language  , 
       category : req.body.category,
          }) 
     try {
        const saveSong = await newSong.save();
        return res.status(201).send({ success : true , songs : saveSong });
     } catch (error) {
        return res.status(501).send({success : false , message : error});
     }
     
});


router.get('/getone/:id' , async (req , res) => {
    const filter = { _id : req.params.id } ;
    
    const data = await songs.findOne(filter);
    if( data ) {
        return res.status(200).send({success : true , song : data});
    }
    else {
       return res.status(501).send({success : false , message : "data not found"});
    }
    
});


router.get('/getAll' , async (req , res) => {

    const data = await songs.find({});
     if( data ) {
        return res.status(200).send({success : true , songs: data});
     }
     else {
        return res.status(501).send({success : false , message : "data not found" , error}); 
     }
 }) 

 router.put('/update/:id', async (req, res) => {
    const songId = req.params.id;
    const updatedData = req.body; // Assuming the updated data is sent in the request body
 
    try {
        const updatedsong = await songs.findByIdAndUpdate(songId, updatedData, { new: true });
        
        if (updatedsong) {
            return res.status(200).send({ success: true, song: updatedsong, message: "song updated successfully" });
        } else {
            return res.status(404).send({ success: false, message: "song not found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error", error });
    }
 });
 

 router.delete('/delete/:id', async (req, res) => {
 
    const songId = req.params.id;
 
    try {
        const deletedsong = await songs.deleteOne({ _id: songId });
        if (deletedsong.deletedCount > 0) {
            return res.status(200).send({ success: true, message: "song deleted successfully" });
        } else {
            return res.status(404).send({ success: false, message: "song not found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error", error });
    }
 });

module.exports = router

