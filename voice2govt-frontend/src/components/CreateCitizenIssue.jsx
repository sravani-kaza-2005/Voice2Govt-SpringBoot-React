// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreateCitizenIssue.css'; // Optional: Add CSS for styling

// const CreateCitizenIssue = () => {
//   const [citizenUsername, setCitizenUsername] = useState('');
//   const [issueDescription, setIssueDescription] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const issueData = {
//         citizenUsername,
//         issueDescription,
//       };

//       // Send POST request to the backend
//       const response = await axios.post('http://localhost:9728/api/citizenissues/create', issueData);
//       setMessage('Issue created successfully!'); // Success message
//       setCitizenUsername(''); // Clear the form fields
//       setIssueDescription('');
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || 'Failed to create issue. Please try again.'
//       );
//     }
//   };

//   return (
//     <div className="create-issue-container">
//       <h2>Create an Issue</h2>
//       {message && <p className="message">{message}</p>}
//       <form onSubmit={handleSubmit} className="create-issue-form">
//         <div className="form-group">
//           <label htmlFor="citizenUsername">Citizen Username:</label>
//           <input
//             type="text"
//             id="citizenUsername"
//             value={citizenUsername}
//             onChange={(e) => setCitizenUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="issueDescription">Issue Description:</label>
//           <textarea
//             id="issueDescription"
//             value={issueDescription}
//             onChange={(e) => setIssueDescription(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-button">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateCitizenIssue;


import React, { useState } from 'react';
import axios from 'axios';
import './CreateCitizenIssue.css'; // Optional: Add CSS for styling

const CreateCitizenIssue = () => {
  const [citizenUsername, setCitizenUsername] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // State for the file upload
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('citizenUsername', citizenUsername);
      formData.append('issueDescription', issueDescription);
      if (selectedFile) {
        formData.append('file', selectedFile); // Append the file to FormData
      }

      // Send POST request to the backend with FormData
      const response = await axios.post('http://localhost:9728/api/citizenissues/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file upload
        },
      });
      setMessage('Issue created successfully!'); // Success message
      setCitizenUsername(''); // Clear form fields
      setIssueDescription('');
      setSelectedFile(null);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to create issue. Please try again.'
      );
    }
  };

  return (
    <div className="create-issue-container">
      <h2>Create an Issue</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="create-issue-form">
        <div className="form-group">
          <label htmlFor="citizenUsername">Citizen Username:</label>
          <input
            type="text"
            id="citizenUsername"
            value={citizenUsername}
            onChange={(e) => setCitizenUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="issueDescription">Issue Description:</label>
          <textarea
            id="issueDescription"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fileUpload">Upload File (optional):</label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            accept=".png,.jpg,.jpeg,.pdf,.docx" // Restrict file types
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCitizenIssue;2