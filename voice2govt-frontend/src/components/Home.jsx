// // import React, { useState, useEffect } from 'react';
// // import pic1 from '../assets/1.jpg';
// // import pic2 from '../assets/2.jpg';
// // import pic3 from '../assets/3.jpg';
// // import pic4 from '../assets/4.jpg';
// // import pic5 from '../assets/5.jpg';

// // const images = [pic1, pic2, pic3, pic4, pic5];

// // export default function AdminHome() {
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const [showWelcomePopup, setShowWelcomePopup] = useState(false); // State for welcome popup

// //   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
// //   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

// //   useEffect(() => {
// //     const interval = setInterval(nextSlide, 3000); // Auto slide every 3 seconds
// //     return () => clearInterval(interval); // Clear interval on component unmount
// //   }, []);

// //   useEffect(() => {
// //     // Check if the welcome popup has been shown before
// //     const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
// //     if (!hasSeenWelcome) {
// //       setShowWelcomePopup(true);
// //       localStorage.setItem('hasSeenWelcome', 'true'); // Set flag to indicate popup was shown
// //     }
// //   }, []);

// //   const handleClosePopup = () => {
// //     setShowWelcomePopup(false); // Close the welcome popup
// //   };

// //   return (
// //     <div className="relative w-full h-screen">
// //       {/* Welcome Popup */}
// //       {showWelcomePopup && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
// //             <h2 className="text-2xl font-semibold mb-3">Welcome, Admin!</h2>
// //             <p className="text-gray-700 mb-4">John Doe</p> {/* Replace with dynamic first and last name */}
// //             <button
// //               onClick={handleClosePopup}
// //               className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Image Carousel */}
// //       <div className="relative w-full h-full overflow-hidden rounded-lg">
// //         {images.map((image, index) => (
// //           <div
// //             key={index}
// //             className={`absolute transition-opacity duration-700 ease-in-out w-full h-full ${
// //               index === currentSlide ? 'opacity-100' : 'opacity-0'
// //             }`}
// //           >
// //             <img src={image} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
// //           </div>
// //         ))}
// //       </div>

// //       {/* Carousel Controls (Dots) */}
// //       <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
// //         {images.map((_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => setCurrentSlide(index)}
// //             className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
// //             aria-label={`Slide ${index + 1}`}
// //           ></button>
// //         ))}
// //       </div>

// //       {/* Carousel Navigation Buttons (Prev and Next) */}
// //       <button
// //         onClick={prevSlide}
// //         className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-700"
// //         aria-label="Previous slide"
// //       >
// //         Prev
// //       </button>
// //       <button
// //         onClick={nextSlide}
// //         className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-700"
// //         aria-label="Next slide"
// //       >
// //         Next
// //       </button>
// //     </div>
// //   );
// // }

import React, { useState } from "react";
import "./home.css";

const AdminHome = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="content">
          <h1>Voice2Govt: Your Voice, Our Responsibility</h1>
          <p>
            Transforming citizen concerns into actionable change. Bridge the gap
            with Voice2Govt.
          </p>
          <button className="cta-button" onClick={togglePopup}>
            Share Your Voice
          </button>
        </div>
      </section>

      {/* Popup for User Input */}
      {showPopup && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Submit Your Concern</h2>
            <p>Your input helps build better governance!</p>
            <textarea
              className="popup-input"
              placeholder="Type your concern here..."
            ></textarea>
            <button className="popup-submit" onClick={togglePopup}>
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Initiatives Section */}
      <section className="featured">
        <h2>Key Government Initiatives</h2>
        <div className="grid">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
              alt="Education"
            />
            <h3>Education For All</h3>
            <p>Improving education access and quality nationwide.</p>
          </div>
          <div className="card">
            <img
              src="https://ehealth.eletsonline.com/wp-content/uploads/2018/06/Cover-story-1.jpg"
              alt="Healthcare"
            />
            <h3>Modern Healthcare</h3>
            <p>Advancing healthcare facilities and accessibility.</p>
          </div>
          <div className="card">
            <img
              src="https://swarajya.gumlet.io/swarajya/2023-05/a4ee062c-61a9-4d77-a279-f47a4a234870/Spillway_Polavaram_Head_Works.jpg?w=610&q=50&compress=true&format=auto"
              alt="Infrastructure"
            />
            <h3>Smart Infrastructure</h3>
            <p>Building sustainable and smart cities.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Citizens Are Saying</h2>
        <div className="carousel">
          <div className="testimonial">
            <p>
              "Voice2Govt made it so easy to share my concerns directly with my
              local representative. Real change starts here!"
            </p>
            <h4>– Sarah Johnson</h4>
          </div>
          <div className="testimonial">
            <p>
              "I appreciate the transparency and how quickly my feedback was
              addressed. Thank you for this platform!"
            </p>
            <h4>– Ravi Kumar</h4>
          </div>
        </div>
      </section>

      {/* Trending Issues */}
      <section className="trending">
        <h2>Trending Citizen Concerns</h2>
        <div className="scrollable">
          <div className="item">
            <img
              src="https://th-i.thgim.com/public/todays-paper/ilix8i/article68007704.ece/alternates/LANDSCAPE_1200/Half-of-urban-lGTCCJR3V1.3.jpg.jpg"
              alt="Water Supply"
            />
            <p>Clean Water Initiatives</p>
          </div>
          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1508780709619-79562169bc64"
              alt="Road Repair"
            />
            <p>Road Safety and Repair</p>
          </div>
          <div className="item">
            <img
              src="https://www.i3verticals.com/wp-content/uploads/2023/08/iStock-1201876922-1024x683.jpeg"
              alt="Public Safety"
            />
            <p>Community Policing</p>
          </div>
        </div>
      </section>

      {/* News and Updates */}
      <section className="news">
        <h2>Latest News & Updates</h2>
        <div className="news-grid">
          <div className="news-item">
            <img
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713"
              alt="News 1"
            />
            <h4>Government Launches New Education Policy</h4>
            <p>
              A comprehensive strategy to improve education standards nationwide.
            </p>
          </div>
          <div className="news-item">
            <img
              src="https://images.unsplash.com/photo-1497493292307-31c376b6e479"
              alt="News 2"
            />
            <h4>Smart City Development</h4>
            <p>
              Updates on the latest infrastructure projects in metro areas.
            </p>
          </div>
        </div>
      </section>

     
    </div>
    </>
  );
};

export default AdminHome;
