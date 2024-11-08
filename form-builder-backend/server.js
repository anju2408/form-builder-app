const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Form Schema
const formSchema = new mongoose.Schema({
  title: String,
  inputs: [{ type: String, label: String, placeholder: String }],
});

const Form = mongoose.model('Form', formSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/form-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Form
app.post('/api/forms', async (req, res) => {
  const form = new Form(req.body);
  await form.save();
  res.json(form);
});

// Get All Forms
app.get('/api/forms', async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

// Get a Form by ID
app.get('/api/forms/:id', async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
});

// Update Form
app.put('/api/forms/:id', async (req, res) => {
  const form = await Form.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(form);
});

// Delete Form
app.delete('/api/forms/:id', async (req, res) => {
  await Form.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
