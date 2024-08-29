import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    profile: '',
    description: '',
    file: null,
    image: null,
  });
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        file: file,
      });
      setSelectedFileName(file.name);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setUploadStatus('Please select a ZIP file.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('profile', formData.profile);
    data.append('description', formData.description);
    data.append('file', formData.file);
    data.append('image', formData.image);

    try {
      const response = await axios.post("{{LOCAL}}/games/uploadgames", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('File uploaded successfully!');
    } catch (error) {
      setUploadStatus('Error uploading file.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white
     dark:bg-gray-800 flex justify-center items-center px-4 sm:px-6 lg:px-8" >
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload Game</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
            Game Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter game name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="relative mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="file">
            Upload Game ZIP File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleFileChange}
            accept=".zip"
            required
          />
          <input
            type="text"
            value={selectedFileName || 'No file selected'}
            readOnly
            className="mt-2 w-52 p-2 border rounded-lg bg-gray-100 text-gray-700"
          />
          <button
            type="button"
            className="absolute top-1/2 right-4 m-4 transform -translate-y-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => document.getElementById('file').click()}
          >
            Upload Zip
          </button>
        </div>

        <div className="relative mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="image">
            Upload Image Profile
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleImageChange}
            accept="image/*"
          />
          <input
            type="text"
            value={selectedImage ? 'Image selected' : 'No image selected'}
            readOnly
            className="mt-2 w-52 p-2 border rounded-lg bg-gray-100 text-gray-700"
          />
          {selectedImage && (
            <div className="mt-2">
              <img src={selectedImage} alt="Profile Preview" className="w-40 h-10 rounded-lg" />
            </div>
          )}
          <button
            type="button"
            className="absolute top-1/2 right-4 m-4 transform -translate-y-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => document.getElementById('image').click()}
          >
            Upload Image
          </button>
        </div>

        <div className="flex items-center justify-center mb-4">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>

        {uploadStatus && (
          <div className={`text-center font-semibold ${uploadStatus.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
            {uploadStatus}
          </div>
        )}
      </form>
    </div>
  );
}

export default Form;