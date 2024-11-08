import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function HomePage() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/forms')
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.error('Error fetching forms:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/forms/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setForms(forms.filter((form) => form._id !== id)); // Remove the deleted form from the list
      })
      .catch((error) => console.error('Error deleting form:', error));
  };

  return (
    <div>
      <h1>Form List</h1>
      <ul>
        {forms.map((form) => (
          <li key={form._id}>
            <Link to={`/form/${form._id}`}>{form.title}</Link> |  {/* View form */}
            <Link to={`/form/${form._id}/edit`}>Edit</Link> |  {/* Edit form */}
            <button onClick={() => handleDelete(form._id)}>Delete</button>  {/* Delete form */}
          </li>
        ))}
      </ul>
      <Link to="/form/create">
        <button>Create Form</button>
      </Link>
    </div>
  );
}

export default HomePage;
