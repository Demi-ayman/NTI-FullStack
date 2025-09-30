const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { error } = require('console');
const nodemailer = require('nodemailer');
mongoose.connect('mongodb://localhost:27017/myPortfolio').then(()=>console.log("databse connected"));
require('dotenv').config();

// user name must enter {name , email , subject , message}
const ContactSchema = new mongoose.Schema({
  name:{ type: String, required: true },
  email:{ type: String, required: true  ,match:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i},
  subject:{ type: String, required: true },
  message:{ type: String, required: true },
});
const Contact = mongoose.model('contact',ContactSchema);


// get all users that contact me
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (contacts.length > 0) {
      res.status(200).json(contacts);
    } else {
      res.status(404).json({ error: "No contacts found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get by user name
router.get('/name/:name', async (req, res) => {
  try {
    const username = req.params.name.trim();
    const users = await Contact.find({ name: new RegExp(`^${username}$`, 'i') });
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: "No contact found with this name" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get by email
router.get('/email/:email', async (req, res) => {
  try {
    const email = req.params.email.trim();
    const users = await Contact.find({ email: new RegExp(`^${email}$`, 'i') });
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: "No contact found with this email" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASS,          
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newUser = new Contact({ name, email, subject, message });
    const user = await newUser.save();

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Email sending failed', details: error.message });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(201).json(user);
      }
    }); 
  } catch (err) {
    console.error('POST /contact error:', err);
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully", deletedContact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;  