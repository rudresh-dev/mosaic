
// import React, { useState, useEffect, useRef } from 'react';
// import { supabase } from './supabaseClient';
// import './ShowPage.css';
// import { gsap } from 'gsap';

// const ShowPage = () => {
//   const [images, setImages] = useState([]);
//   const imageRefs = useRef([]); // Array to hold references to each image
//   const [hasImage, setHasImage] = useState(Array(200).fill(false)); // Initialize with false for all grid items

//   useEffect(() => {
//     // Fetch images from Supabase
//     const fetchImages = async () => {
//       const { data, error } = await supabase
//         .from('images')
//         .select('url')
//         .order('created_at', { ascending: false });

//       if (error) {
//         console.error('Error fetching images:', error);
//       } else {
//         setImages(data.map(img => img.url));
//         const updatedHasImage = Array(200).fill(false);
//         data.forEach((_, index) => updatedHasImage[index] = true);
//         setHasImage(updatedHasImage);
//       }
//     };

//     fetchImages();

//     // Optionally: Subscribe to real-time updates
//     const channel = supabase
//       .channel('public:images')
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, payload => {
//         setImages(prevImages => [payload.new.url, ...prevImages]);
//         setHasImage(prevHasImage => {
//           const newHasImage = [...prevHasImage];
//           newHasImage[0] = true; // Assume new images go to the start
//           return newHasImage;
//         });
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   useEffect(() => {
//     if (images.length > 0) {
//       const lastImageRef = imageRefs.current[0]; // Get the latest image reference

//       // Calculate grid item position
//       const gridItem = document.querySelector('.grid-item');
//       const gridItemRect = gridItem.getBoundingClientRect(); // Get the position of the grid item
//       const viewportWidth = window.innerWidth;
//       const viewportHeight = window.innerHeight;

//       // Set initial position and size
//       gsap.set(lastImageRef, {
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         xPercent: -50,
//         yPercent: -50,
//         width: viewportWidth, // Full screen width
//         height: viewportHeight, // Full screen height
//         scale: 1, // Initial scale to fit the screen
//         opacity: 1, // Start visible for the animation
//         zIndex: 1000, // Ensure it appears on top of other elements
//         transformOrigin: 'center center',
//       });

//       // Animate the image from the center of the screen to its grid position
//       gsap.to(lastImageRef, {
//         duration: 2.5, // Slow and smooth animation
//         width: gridItemRect.width, // Scale down to the size of the grid item
//         height: gridItemRect.height, // Scale down to the size of the grid item
//         top: gridItemRect.top + window.scrollY, // Move to its original position within the grid
//         left: gridItemRect.left + window.scrollX, // Move to its original position within the grid
//         scaleX: 1, // Ensure no distortion in width
//         scaleY: 1, // Ensure no distortion in height
//         ease: 'linear', // Ensure a linear transition
//         onComplete: () => {
//           // Reset position styles after animation
//           gsap.set(lastImageRef, {
//             position: 'relative',
//             zIndex: '',
//             top: '',
//             left: '',
//             width: '',
//             height: '',
//             transform: '',
//           });
//         },
//       });
//     }
//   }, [images]);

//   const gridImages = Array.from({ length: 200 }).map((_, index) => (
//     <div
//       key={index}
//       className={`grid-item ${hasImage[index] ? 'has-image' : ''}`}
//     >
//       {index < images.length ? (
//         <div className="image-wrapper">
//           <img
//             ref={(el) => (imageRefs.current[index] = el)}
//             src={images[index]}
//             alt={`Grid ${index}`}
//             className="uploaded-image"
//           />
//           <div
//             className="overlay-image"
//             style={{
//               backgroundPosition: `-${(index % 20) * 96}px -${Math.floor(index / 20) * 96}px`,
//             }}
//           ></div>
//         </div>
//       ) : (
//         <div className="background-image"></div>
//       )}
//     </div>
//   ));

//   return (
//     <div className="grid-container">
//       {gridImages}
//     </div>
//   );
// };

// export default ShowPage;



import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import './ShowPage.css';
import { gsap } from 'gsap';

const ShowPage = () => {
  const [images, setImages] = useState([]);
  const imageRefs = useRef([]); // Array to hold references to each image
  const [hasImage, setHasImage] = useState(Array(200).fill(false)); // Initialize with false for all grid items\
  
  useEffect(() => {
    // Fetch images from Supabase
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('images')
        .select('url')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching images:', error);
      } else {
        setImages(data.map(img => img.url));
        const updatedHasImage = Array(200).fill(false);
        data.forEach((_, index) => updatedHasImage[index] = true);
        setHasImage(updatedHasImage);
      }
    };

    fetchImages();

    // Optionally: Subscribe to real-time updates
    const channel = supabase
      .channel('public:images')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, payload => {
        setImages(prevImages => [payload.new.url, ...prevImages]);
        setHasImage(prevHasImage => {
          const newHasImage = [...prevHasImage];
          newHasImage[0] = true; // Assume new images go to the start
          return newHasImage;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const lastImageRef = imageRefs.current[0]; // Get the latest image reference

      // Calculate grid item position
      const gridItem = document.querySelector('.grid-item');
      const gridItemRect = gridItem.getBoundingClientRect(); // Get the position of the grid item
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Set initial position and size
      gsap.set(lastImageRef, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: viewportWidth, // Full screen width
        height: viewportHeight, // Full screen height
        scale: 1, // Initial scale to fit the screen
        opacity: 1, // Start visible for the animation
        zIndex: 1000, // Ensure it appears on top of other elements
        transformOrigin: 'center center',
      });
      // Create a timeline
      const tl = gsap.timeline();
      // Step 1: Stay in the center for 2 seconds
      tl.to(lastImageRef, {
        duration:2 , // Stay in center for 2 seconds
        ease: 'none', // No easing, stay still
      });
      // Step 2: Move to its grid position with linear animation
      tl.to(lastImageRef, {
        duration: 2.5, // Duration of the move to grid position
        width: gridItemRect.width, // Scale down to the size of the grid item
        height: gridItemRect.height, // Scale down to the size of the grid item
        top: gridItemRect.top + window.scrollY, // Move to its original position within the grid
        left: gridItemRect.left + window.scrollX, // Move to its original position within the grid
        scaleX: 1, // Ensure no distortion in width
        scaleY: 1, // Ensure no distortion in height
        ease: 'linear', // Linear transition
        onComplete: () => {
          // Reset position styles after animation
          gsap.set(lastImageRef, {
            position: 'relative',
            zIndex: '',
            top: '',
            left: '',
            width: '',
            height: '',
            transform: '',
          });
        },
      });
    }
  }, [images]);

  const gridImages = Array.from({ length: 200 }).map((_, index) => (
    <div
      key={index}
      className={`grid-item ${hasImage[index] ? 'has-image' : ''}`}
    >
      {index < images.length ? (
        <div className="image-wrapper">
          <img
            ref={(el) => (imageRefs.current[index] = el)}
            src={images[index]}
            alt={`Grid ${index}`}
            className="uploaded-image"
          />
          <div
            className="overlay-image"
            style={{
              backgroundPosition: `-${(index % 20) * 96}px -${Math.floor(index / 20) * 96}px`,
            }}
          ></div>
        </div>
      ) : (
        <div className="background-image"></div>
      )}
    </div>
  ));
  return (
    <div className="grid-container">
      {gridImages}
    </div>
  );
};

export default ShowPage;
