const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { error } = require('console');
mongoose.connect('mongodb://localhost:27017/myPortfolio').then(()=>console.log("databse connected"));

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true }, 
  degree: { type: String, required: true }, 
  field: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number }, 
  grade: { type: String } 
});

const Education = mongoose.model('education', educationSchema);

router.get('/' , async(req , res) => 
{
  try{
    const education = await Education.find();
    res.status(200).json(education);
  }catch(e)
  {
    res.status(500).json({error:e.message});
  }
})


// add new education or educations
router.post('/' , async(req,res)=>{
  try{
    const education= await Education.insertMany(req.body);
    res.status(201).json(education);
   }
   catch(err){
    res.status(500).json({error: `err: ${err.message}`})
   }
})

// update education by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete education by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;