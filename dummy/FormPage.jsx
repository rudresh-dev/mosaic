import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      // Ensure the correct bucket name
      const bucketName = 'images'; // Replace with your actual bucket name

      // Upload the image to Supabase storage
      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .upload(`public/${Date.now()}_${image.name}`, image);

      if (error) {
        console.error('Upload error:', error);
        return;
      }

      if (data) {
        // Construct the correct public URL
        const imageUrl = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${data.path}`;

        console.log('Public URL:', imageUrl);

        // Insert the image URL into the 'images' table
        const { error: insertError } = await supabase
          .from('images')
          .insert([{ url: imageUrl }]);

        if (insertError) {
          console.error('Insert error:', insertError);
        } else {
          navigate('/upload');
        }
      }
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FormPage;
