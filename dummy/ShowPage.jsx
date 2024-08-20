// import React, { useState, useEffect } from 'react';
// import { supabase } from './supabaseClient';
// import './ShowPage.css';

// const ShowPage = () => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     // Fetch initial images from Supabase storage
//     const fetchImages = async () => {
//       const { data, error } = await supabase
//         .from('images')
//         .select('url')
//         .order('created_at', { ascending: false });

//       if (error) {
//         console.error('Error fetching images:', error);
//       } else {
//         setImages(data.map(img => img.url));
//       }
//     };

//     fetchImages();

//     // Subscribe to real-time updates using channel
//     const channel = supabase
//       .channel('public:images')
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, payload => {
//         setImages(prevImages => [payload.new.url, ...prevImages]);
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const gridImages = Array.from({ length: 200 }).map((_, index) => (
//     <div key={index} className="grid-item">
//       {index < images.length ? (
//         <img
//           src={images[index]}
//           alt={`Grid ${index}`}
//           className="uploaded-image"
//         />
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



// import React, { useState, useEffect } from 'react';
// import { supabase } from './supabaseClient';
// import './ShowPage.css';

// const ShowPage = () => {
//   const [images, setImages] = useState([]);

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
//       }
//     };

//     fetchImages();

//     // Optionally: Subscribe to real-time updates
//     const channel = supabase
//       .channel('public:images')
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, payload => {
//         setImages(prevImages => [payload.new.url, ...prevImages]);
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const gridImages = Array.from({ length: 200 }).map((_, index) => (
//     <div key={index} className="grid-item">
//       {index < images.length ? (
//         <img
//           src={images[index]}
//           alt={`Grid ${index}`}
//           className="uploaded-image"
//         />
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



// sdfgvbhnjmkmjhgfghjnhgfd





// import React, { useState, useEffect } from 'react';
// import { supabase } from './supabaseClient';
// import './ShowPage.css';

// const ShowPage = () => {
//   const [images, setImages] = useState([]);

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
//       }
//     };

//     fetchImages();

//     // Optionally: Subscribe to real-time updates
//     const channel = supabase
//       .channel('public:images')
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, payload => {
//         setImages(prevImages => [payload.new.url, ...prevImages]);
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const gridImages = Array.from({ length: 200 }).map((_, index) => (
//     <div key={index} className="grid-item">
//       {index < images.length ? (
//         <div className="image-wrapper">
//           <img
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






// import React, { useState, useEffect, useRef } from 'react';
// import { supabase } from './supabaseClient';
// import './ShowPage.css';
// import { gsap } from 'gsap';

// const ShowPage = () => {
//   const [images, setImages] = useState([]);
//   const imageRefs = useRef([]); // Array to hold references to each image

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
//       }
//     };

//     fetchImages();

//     // Optionally: Subscribe to real-time updates
//     const channel = supabase
//       .channel('public:images')
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, payload => {
//         setImages(prevImages => [payload.new.url, ...prevImages]);
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   useEffect(() => {
//     if (images.length > 0) {
//       const lastImageRef = imageRefs.current[0]; // Get the latest image reference
//       const gridItemRect = lastImageRef.getBoundingClientRect(); // Get the position of the grid item

//       // Fixed center position for a 1920x1080 page
//       const startX = 1920 / 2 - gridItemRect.width / 2;
//       const startY = 1080 / 2 - gridItemRect.height / 2;

//       // Animate the image from the center to its grid position
//       gsap.fromTo(
//         lastImageRef,
//         {
//           x: startX - gridItemRect.left, // Start X position relative to the grid item
//           y: startY - gridItemRect.top,  // Start Y position relative to the grid item
//           scale: 3,                      // Start with a large scale
//           opacity: 0,                    // Start invisible
//           zIndex: 1000,                  // Ensure it appears on top of other elements
//           position: 'fixed',             // Fix the position during the animation
//         },
//         {
//           duration: 1.5,
//           x: 0,                          // End at its original position within the grid
//           y: 0,                          // End at its original position within the grid
//           scale: 1,                      // Scale down to normal size
//           opacity: 1,                    // Fade in
//           ease: 'power2.out',
//           onComplete: () => {
//             gsap.set(lastImageRef, { zIndex: '', position: 'relative' }); // Reset zIndex and position after animation completes
//           }
//         }
//       );
//     }
//   }, [images]);

//   const gridImages = Array.from({ length: 200 }).map((_, index) => (
//     <div key={index} className="grid-item">
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







// import React, { useState, useEffect, useRef } from 'react';
// import { supabase } from './supabaseClient';
// import './ShowPage.css';
// import { gsap } from 'gsap';

// const ShowPage = () => {
//   const [images, setImages] = useState([]);
//   const imageRefs = useRef([]); // Array to hold references to each image

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
//       }
//     };

//     fetchImages();

//     // Optionally: Subscribe to real-time updates
//     const channel = supabase
//       .channel('public:images')
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, payload => {
//         setImages(prevImages => [payload.new.url, ...prevImages]);
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   useEffect(() => {
//     if (images.length > 0) {
//       const lastImageRef = imageRefs.current[0]; // Get the latest image reference
//       const gridItemRect = lastImageRef.getBoundingClientRect(); // Get the position of the grid item

//       // Fixed center position for a 1920x1080 page
//       const startX = 1920 / 2 - gridItemRect.width / 2;
//       const startY = 1080 / 2 - gridItemRect.height / 2;

//       // Animate the image from the center to its grid position
//       gsap.fromTo(
//         lastImageRef,
//         {
//           x: startX - gridItemRect.left, // Start X position relative to the grid item
//           y: startY - gridItemRect.top,  // Start Y position relative to the grid item
//           scale: 3,                      // Start with a large scale
//           opacity: 0,                    // Start invisible
//           zIndex: 1000,                  // Ensure it appears on top of other elements
//           position: 'fixed',             // Fix the position during the animation
//         },
//         {
//           duration: 6.5,                 // Increase the duration for a slower animation
//           x: 0,                          // End at its original position within the grid
//           y: 0,                          // End at its original position within the grid
//           scale: 1,                      // Scale down to normal size
//           opacity: 1,                    // Fade in
//           ease: 'linear',                // Use a linear easing for smooth animation
//           onComplete: () => {
//             gsap.set(lastImageRef, { zIndex: '', position: 'relative' }); // Reset zIndex and position after animation completes
//           }
//         }
//       );
//     }
//   }, [images]);

//   const gridImages = Array.from({ length: 200 }).map((_, index) => (
//     <div key={index} className="grid-item">
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





// import React, { useState, useEffect, useRef } from 'react';
// import { supabase } from './supabaseClient';
// import './ShowPage.css';
// import { gsap } from 'gsap';

// const ShowPage = () => {
//   const [images, setImages] = useState([]);
//   const imageRefs = useRef([]); // Array to hold references to each image

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
//       }
//     };

//     fetchImages();

//     // Optionally: Subscribe to real-time updates
//     const channel = supabase
//       .channel('public:images')
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, payload => {
//         setImages(prevImages => [payload.new.url, ...prevImages]);
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   useEffect(() => {
//     if (images.length > 0) {
//       const lastImageRef = imageRefs.current[0]; // Get the latest image reference
//       const gridItemRect = lastImageRef.getBoundingClientRect(); // Get the position of the grid item

//       // Calculate the start position (center of the viewport)
//       const startX = window.innerWidth / 2 - gridItemRect.width / 2;
//       const startY = window.innerHeight / 2 - gridItemRect.height / 2;

//       // Set initial position absolutely to avoid jumps
//       gsap.set(lastImageRef, {
//         position: 'fixed',
//         top: startY,
//         left: startX,
//         width: gridItemRect.width,
//         height: gridItemRect.height,
//         zIndex: 1000, // Ensure it appears on top of other elements
//         transformOrigin: 'center center',
//       });

//       // Animate the image from the center to its grid position
//       gsap.to(lastImageRef, {
//         duration: 2.5,                 // Slow and smooth animation
//         top: gridItemRect.top,         // Move to its original position within the grid
//         left: gridItemRect.left,       // Move to its original position within the grid
//         scale: 1,                      // Scale down to normal size
//         opacity: 1,                    // Fade in
//         ease: 'power2.out',
//         onComplete: () => {
//           // Reset position styles after animation
//           gsap.set(lastImageRef, { position: 'relative', zIndex: '', top: '', left: '', width: '', height: '' });
//         }
//       });
//     }
//   }, [images]);

//   const gridImages = Array.from({ length: 200 }).map((_, index) => (
//     <div key={index} className="grid-item">
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




