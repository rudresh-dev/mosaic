import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowPage from './ShowPage';
import FormPage from './FormPage';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (image) => {
    setUploadedImage(image);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowPage />} />
        <Route path="/form" element={<FormPage onImageUpload={handleImageUpload} />} />
      </Routes>
    </Router>
  );
}

export default App;
