const router = require("express").Router()

const artist = require('../models/artist')


 
router.post('/save' , async (req, res) => {
     
    const newArtist = artist({
       name : req.body.name ,
       imageURL : req.body.imageURL ,
       twitter : req.body.twitter ,
       instagram : req.body.instagram 
          }) 
     try {
        const saveArtist = await newArtist.save();
        return res.status(201).send({ success : true , artist : saveArtist });
     } catch (error) {
        return res.status(501).send({success : false , message : error});
     }
     
});

router.get('/getone/:id' , async (req , res) => {
     const filter = { _id : req.params.id } ;
     
     const data = await artist.findOne(filter);
     if( data ) {
         return res.status(200).send({success : true , artist : data});
     }
     else {
        return res.status(501).send({success : false , message : "data not found"});
     }
     
})

 router.get('/getAll' , async (req , res) => {

    const data = await artist.find({});
     if( data ) {
        return res.status(200).send({success : true , artist : data});
     }
     else {
        return res.status(501).send({success : false , message : "data not found" , error}); 
     }
 }) 

 router.put('/update/:id', async (req, res) => {
    const artistId = req.params.id;
    const updatedData = req.body; // Assuming the updated data is sent in the request body

    try {
        const updatedArtist = await artist.findByIdAndUpdate(artistId, updatedData, { new: true });
        
        if (updatedArtist) {
            return res.status(200).send({ success: true, artist: updatedArtist, message: "Artist updated successfully" });
        } else {
            return res.status(404).send({ success: false, message: "Artist not found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error", error });
    }
});

 router.delete('/delete/:id', async (req, res) => {
 
    const artistId = req.params.id;

    try {
        const deletedArtist = await artist.deleteOne({ _id: artistId });
        if (deletedArtist.deletedCount > 0) {
            return res.status(200).send({ success: true, message: "Artist deleted successfully" });
        } else {
            return res.status(404).send({ success: false, message: "Artist not found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error", error });
    }
});


module.exports = router