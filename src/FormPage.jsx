// import React, { useState, useRef } from 'react';
// import { supabase } from './supabaseClient';
// import { useNavigate } from 'react-router-dom';
// import Webcam from 'react-webcam';
// import './FormPage.css';

// const FormPage = () => {
//   const [cameraActive, setCameraActive] = useState(false);
//   const [imageURL, setImageURL] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const webcamRef = useRef(null);
//   const navigate = useNavigate();

//   const capture = React.useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       setImageURL(imageSrc);
//       setCameraActive(false);
//     }
//   }, [webcamRef]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (imageURL) {
//       setLoading(true);

//       // Convert the base64 image to Blob
//       const response = await fetch(imageURL);
//       const blob = await response.blob();

//       // Ensure the correct bucket name
//       const bucketName = 'images'; // Replace with your actual bucket name

//       // Upload the image to Supabase storage
//       const { data, error } = await supabase
//         .storage
//         .from(bucketName)
//         .upload(`public/${Date.now()}_captured_image.jpg`, blob);

//       if (error) {
//         console.error('Upload error:', error);
//         setLoading(false);
//         return;
//       }

//       if (data) {
//         // Construct the correct public URL
//         const imageUrl = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${data.path}`;
//         console.log('Public URL:', imageUrl);

//         // Insert the image URL into the 'images' table
//         const { error: insertError } = await supabase
//           .from('images')
//           .insert([{ url: imageUrl }]);

//         if (insertError) {
//           console.error('Insert error:', insertError);
//         } else {
//           setLoading(false);
//           navigate('/upload');
//           window.location.reload(); // Refresh the page
//         }
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Capture and Upload an Image</h2>
//       {cameraActive ? (
//         <div className="camera-container">
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width="100%"
//             screenshotQuality={1}
//           />
//           <button onClick={capture} className="capture-button">Capture</button>
//         </div>
//       ) : (
//         <div className="capture-button-container">
//           <button onClick={() => setCameraActive(true)} className="show-camera-button">Show Camera</button>
//         </div>
//       )}
//       {imageURL && (
//         <div className="image-preview">
//           <img src={imageURL} alt="Captured" />
//           <button onClick={() => setImageURL(null)} className="retake-button">Retake</button>
//           <button onClick={handleSubmit} className="submit-button">
//             Submit
//           </button>
//         </div>
//       )}
//       {loading && <div className="loading">Uploading...</div>}
//     </div>
//   );
// };

// export default FormPage;

import React, { useState, useRef, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./FormPage.css";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { RiCameraSwitchLine } from "react-icons/ri";
import { IoIosCamera } from "react-icons/io";
import { MdFlipCameraAndroid } from "react-icons/md";


const FormPage = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facingMode, setFacingMode] = useState("user"); // 'user' for front camera, 'environment' for rear camera
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  // Update video constraints when facingMode changes
  useEffect(() => {
    if (webcamRef.current) {
      webcamRef.current.videoConstraints = {
        facingMode: facingMode,
      };
    }
  }, [facingMode]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImageURL(imageSrc);
      setCameraActive(false);
    }
  }, [webcamRef]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (imageURL) {
      setLoading(true);

      // Convert the base64 image to Blob
      const response = await fetch(imageURL);
      const blob = await response.blob();

      // Ensure the correct bucket name
      const bucketName = "images"; // Replace with your actual bucket name

      // Upload the image to Supabase storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`public/${Date.now()}_captured_image.jpg`, blob);

      if (error) {
        console.error("Upload error:", error);
        setLoading(false);
        return;
      }

      if (data) {
        // Construct the correct public URL
        const imageUrl = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${data.path}`;
        console.log("Public URL:", imageUrl);

        // Insert the image URL into the 'images' table
        const { error: insertError } = await supabase
          .from("images")
          .insert([{ url: imageUrl }]);

        if (insertError) {
          console.error("Insert error:", insertError);
        } else {
          setLoading(false);
          navigate("/upload");
          window.location.reload(); // Refresh the page
        }
      }
    }
  };

  return (
    <div className="form-container">
      {/* <div>
        <img src="/glogo.png" width="70%" alt="" />
      </div> */}
      <div>
        {cameraActive ? (
          <div className="camera-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="60%"
              screenshotQuality={1}
              videoConstraints={{ facingMode }}
            />
            <div className="camera-controls">
              <button onClick={capture} className="capture-button">
                Capture
              </button>
              <button
                onClick={() =>
                  setFacingMode(facingMode === "user" ? "environment" : "user")
                }
                className="switch-camera-button"
              >
                {/* <AiOutlineVideoCameraAdd /> */}
             
                <MdFlipCameraAndroid color="white"/>
              </button>
            </div>
          </div>
        ) : (
          <div className="capture-button-container">
            <button
              onClick={() => setCameraActive(true)}
              className="show-camera-button"
            >
              <IoIosCamera size={25} color="white"/>
              <p style={{ padding: 0, margin: 4 }}>Show Camera</p>
            </button>
          </div>
        )}
        {imageURL && (
          <div className="image-preview">
            <img src={imageURL} alt="Captured" />
            <div>
            <button onClick={() => setImageURL(null)} className="retake-button">
              Retake
            </button>
            <button onClick={handleSubmit} className="submit-button">
              Submit
            </button>
            </div>
          </div>
        )}
        {loading && 
        
        <div className="loading">
            <div className="logoContainer">
            <img src="/loading.gif" alt="" />
            </div>
            
        </div>}
      </div>
    </div>
  );
};

export default FormPage;
