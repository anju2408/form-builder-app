import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CreateFormPage from './CreateFormPage';
import EditFormPage from './EditFormPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form/create" element={<CreateFormPage />} />
          <Route path="/form/:id/edit" element={<EditFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
