const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { error } = require('console');
const { type } = require('os');
mongoose.connect('mongodb://localhost:27017/myPortfolio').then(()=>console.log("databse connected"));

const skillSchema = new mongoose.Schema({ 
 name:{ type: String , required:true , unique:true },
 level:{type:String ,  required:true}
});

const Skill = mongoose.model('skills', skillSchema);

router.get('/' , async(req , res) => 
{
  try{
    const skill = await Skill.find();
    res.status(200).json(skill);
  }catch(e)
  {
    res.status(500).json({error:e.message});
  }
}) 

// add new skill or skills
router.post('/' , async(req,res)=>{
  try{
    const skill= await Skill.insertMany(req.body);
    res.status(201).json(skill);
   }
   catch(err){
    res.status(500).json({error: `err: ${err.message}`})
   }
})

// update skill by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete skill by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
