import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ user_id, setImageBase64, imageBase64 }) => {
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Convert file to base64
        const base64String = await convertToBase64(selectedFile);
        setBase64(base64String);
    };

    // Convert file to base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!base64) {
            console.error('No file selected or conversion error');
            return;
        }
      
        try {
          const response = await axios.patch(`http://localhost:8000/api/profile/${user_id}/`, {
            image: base64,
          });
      
          console.log('File uploaded successfully', response.data);
      
          // Update the state if the image_base64 exists in the response
          if (response.data?.image_base64) {
            setImageBase64(base64)
            console.log('Successful image upload response', response.data.image_base64);
          }
        } catch (error) {
          console.error('Error uploading file', error);
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" className='btn btn-primary w-25 p-2'>Upload</button>
        </form>
    );
};

export default ImageUpload;
