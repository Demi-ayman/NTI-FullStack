const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { error } = require('console');
mongoose.connect('mongodb://localhost:27017/myPortfolio').then(()=>console.log("databse connected"));
const projectSchema = new mongoose.Schema({ 
  category:{ type: String, required: true },
  projectName: { type: String, required: true,unique:true },
  desc: { type: String, required: true },
  github: { type: String, required: true }
});
const Projects = mongoose.model('projects',projectSchema);

// get project by id
router.get('/:id',async(req,res)=>{ 
  try{
    const id =req.params.id;
    const project = await Projects.findById(id);
    if(project)
    {
      res.status(200).json(project);
    }
    else{
      res.status(404).json({error:"Project not found"})
    }
  }
  catch(e)
  {
    res.status(500).json({error: e.message});
  }
})

// get project by projectName
router.get('/name/:projectName',async(req,res)=>{ 
  try{
    const projectName = req.params.projectName.trim();
    const project = await Projects.find({ projectName: new RegExp(`^${projectName}$`, 'i') });
    if(project)
    {
      res.status(200).json(project);
    }
    else{
      res.status(404).json({error:"Project not found"})
    }
  }
  catch(e)
  {
    res.status(500).json({error: e.message});
  }
})

// get project by category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category.trim();
    const project = await Projects.find({ category: new RegExp(`^${category}$`, 'i') });

    if (project.length > 0) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// get all projects
router.get('/' ,async(req,res)=>{
  try{
    const projects = await Projects.find();
    if(projects)
    {
      res.status(200).json(projects);
    }
    else{
      res.json({error: "There is no projects"});
    }
  }
  catch(e)
  {
    res.status(500).json({error: e.message});
  }
})

// add projects
router.post('/' , async(req,res)=>{
  try{
    const myPrjects= await Projects.insertMany(req.body);
    res.status(201).json(myPrjects);
   }
   catch(err){
    res.status(500).json({error: `err: ${err.message}`})
   }
})

router.put('/name/:projectName', async (req, res) => {
  try {
    const name = req.params.projectName.trim();
    const updateData = req.body;
    const project = await Projects.findOne({ projectName: new RegExp(`^${name}$`, 'i') });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const updated = await Projects.findOneAndUpdate(
      { projectName: new RegExp(`^${name}$`, 'i') },
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({ updated });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// update project by id
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const project = await Projects.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const updated = await Projects.findOneAndUpdate(
      { _id:id },
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({ updated });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// delete project by projectName
router.delete('/name/:projectName',async(req,res)=>
{
  try{
    const name = req.params.projectName.trim();
    const project = await Projects.findOne({ projectName: new RegExp(`^${name}$`, 'i') });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const deletedProject = await Projects.findOneAndDelete({projectName:name});
    res.status(200).json(deletedProject);
  }catch(e)
  {
    res.status(500).json({ error: e.message });
  }
})

// delete project by id
router.delete('/:id',async(req,res)=>
{
  try{
    const id = req.params.id;
    const project = await Projects.findOne({ _id: id });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const deletedProject = await Projects.findByIdAndDelete(id);
    res.status(200).json(deletedProject);
  }catch(e)
  {
    res.status(500).json({ error: e.message });
  }
})
module.exports = router;