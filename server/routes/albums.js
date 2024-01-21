const router = require("express").Router()
const album = require('../models/album')


router.post('/save' , async (req, res) => {
     
    const newAlbum = album({
       name : req.body.name ,
       imageURL : req.body.imageURL ,
      
          }) 
     try {
        const saveAlbum = await newAlbum?.save();
        return res?.status(201).send({ success : true , album : saveAlbum });
     } catch (error) {
        return res.status(501).send({success : false , message : error});
     }
     
});

router.get('/getone/:id' , async (req , res) => {
    const filter = { _id : req.params.id } ;
    
    const data = await album.findOne(filter);
    if( data ) {
        return res.status(200).send({success : true , album : data});
    }
    else {
       return res.status(501).send({success : false , message : "data not found"});
    }
    
});

router.get('/getAll' , async (req , res) => {

    const data = await album.find({});
     if( data ) {
        return res.status(200).send({success : true , album : data});
     }
     else {
        return res.status(501).send({success : false , message : "data not found" , error}); 
     }
 }) 


 router.put('/update/:id', async (req, res) => {
   const albumId = req.params.id;
   const updatedData = req.body; // Assuming the updated data is sent in the request body

   try {
       const updatedalbum = await album.findByIdAndUpdate(albumId, updatedData, { new: true });
       
       if (updatedalbum) {
           return res.status(200).send({ success: true, album: updatedalbum, message: "album updated successfully" });
       } else {
           return res.status(404).send({ success: false, message: "album not found" });
       }
   } catch (error) {
       return res.status(500).send({ success: false, message: "Internal server error", error });
   }
});

router.delete('/delete/:id', async (req, res) => {
 
   const albumtId = req.params.id;

   try {
       const deletedalbumt = await album.deleteOne({ _id: albumtId });
       if (deletedalbumt.deletedCount > 0) {
           return res.status(200).send({ success: true, message: "albumt deleted successfully" });
       } else {
           return res.status(404).send({ success: false, message: "albumt not found" });
       }
   } catch (error) {
       return res.status(500).send({ success: false, message: "Internal server error", error });
   }
});

module.exports = router