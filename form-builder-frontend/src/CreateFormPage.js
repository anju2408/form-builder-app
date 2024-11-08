import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function CreateFormPage() {
  const [title, setTitle] = useState('');  // Form title
  const [inputs, setInputs] = useState([ { type: '', label: '', placeholder: '' } ]);  // Input fields
  const navigate = useNavigate();  // Navigate to other pages after saving

  // Handle input change for a dynamic field
  const handleInputChange = (index, event) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][event.target.name] = event.target.value;
    setInputs(updatedInputs);
  };

  // Add a new input field
  const addInputField = () => {
    setInputs([...inputs, { type: '', label: '', placeholder: '' }]);
  };

  // Remove an input field
  const removeInputField = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  // Handle form submission (save the form)
  const handleSaveForm = () => {
    const formData = {
      title,
      inputs
    };

    // POST request to save the form
    fetch('http://localhost:3001/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        // Redirect to home page (form list)
        navigate('/'); // Use navigate instead of history.push
      })
      .catch((error) => {
        console.error('Error saving the form:', error);
      });
  };

  return (
    <div>
      <h1>Create Form</h1>
      <div>
        <label>Form Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter form title"
        />
      </div>

      <h3>Inputs:</h3>
      {inputs.map((input, index) => (
        <div key={index}>
          <label>Type:</label>
          <select
            name="type"
            value={input.type}
            onChange={(e) => handleInputChange(index, e)}
          >
            <option value="">Select type</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
            <option value="password">Password</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>

          <label>Label:</label>
          <input
            type="text"
            name="label"
            value={input.label}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Enter label"
          />

          <label>Placeholder:</label>
          <input
            type="text"
            name="placeholder"
            value={input.placeholder}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Enter placeholder"
          />

          <button onClick={() => removeInputField(index)}>Remove Input</button>
        </div>
      ))}

      <button onClick={addInputField}>Add Input Field</button>
      <button onClick={handleSaveForm}>Save Form</button>
    </div>
  );
}

export default CreateFormPage;
