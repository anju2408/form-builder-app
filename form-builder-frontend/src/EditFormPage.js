import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

function EditFormPage() {
  const [form, setForm] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get form ID from URL

  useEffect(() => {
    // Fetch form data by ID
    fetch(`http://localhost:3001/api/forms/${id}`)
      .then((response) => response.json())
      .then((data) => setForm(data))
      .catch((error) => console.error('Error fetching form:', error));
  }, [id]);

  const handleInputChange = (index, event) => {
    const updatedForm = { ...form };
    updatedForm.inputs[index][event.target.name] = event.target.value;
    setForm(updatedForm);
  };

  const handleSave = () => {
    fetch(`http://localhost:3001/api/forms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then(() => {
        navigate(`/form/${id}`); // Redirect to the form detail page after saving
      })
      .catch((error) => console.error('Error updating form:', error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/api/forms/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/'); // Redirect to the home page after deleting
      })
      .catch((error) => console.error('Error deleting form:', error));
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Form</h1>
      <div>
        <label>Form Title:</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter form title"
        />
      </div>

      <h3>Inputs:</h3>
      {form.inputs.map((input, index) => (
        <div key={index}>
          <label>Type:</label>
          <select
            name="type"
            value={input.type}
            onChange={(e) => handleInputChange(index, e)}
          >
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
        </div>
      ))}

      <button onClick={handleSave}>Save Changes</button>
      <button onClick={handleDelete}>Delete Form</button>
    </div>
  );
}

export default EditFormPage;
