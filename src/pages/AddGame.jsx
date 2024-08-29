import React, { useState } from "react";
import axios from "axios";
import PageTitle from "@/components/Typography/PageTitle";
import { notifyError, notifySuccess } from "@/utils/toast";
import AdminServices from "@/services/AdminServices";
import AnimatedContent from "@/components/common/AnimatedContent";

// import backgroundImage from '../assets/img/backgroundimage.jpg';

function AddGame() {
  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    description: "",
    file: null,
    image: null,
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

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
        profileimage: file,
      });
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setUploadStatus("Please select a ZIP file.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("");

    const data = new FormData();
    data.append("gameName", formData.name);
    data.append("gameImage", formData.profileimage);
    data.append("description", formData.description);
    data.append("zipFile", formData.file);
    data.append("active", true);

    try {
      const res = await AdminServices.addGames(data);
      if (res) {
        notifySuccess("Game Added Successfully !");
        // Clear formData after successful request
        setFormData({
          name: "",
          profileimage: "",
          description: "",
          file: null,
          image: null,
        });
        setSelectedFileName("");
        setSelectedImage("");
      } else {
        notifyError(" Failed !");
      }
      // setUploadStatus("File uploaded successfully!");
    } catch (error) {
      console.log("inerror", error);
      notifyError("Error uploading file.!");
      setUploadStatus("Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatedContent>
      <PageTitle> {"Add Games"} </PageTitle>

      <div className="min-w-0 p-4  bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <form
          className="max-w-full sm:max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block dark:text-white text-gray-700 text-sm font-medium mb-2"
              htmlFor="name"
            >
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
            <label
              className="block dark:text-white text-gray-700 text-sm font-medium mb-2"
              htmlFor="description"
            >
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
            <label
              className="block dark:text-white text-gray-700 text-sm font-medium mb-1"
              htmlFor="file"
            >
              Upload Game File
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
              value={selectedFileName || "No file selected"}
              readOnly
              className="mt-2 w-full sm:w-52 p-2 border rounded-lg bg-gray-100 text-gray-700"
            />
            <button
              type="button"
              className="mt-2 w-full sm:w-auto bg-[#10b981] hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => document.getElementById("file").click()}
            >
              Upload Game File
            </button>
          </div>

          <div className="relative mb-4">
            <label
              className="block dark:text-white text-gray-700 text-sm font-medium mb-1"
              htmlFor="image"
            >
              Upload Game Image
            </label>
            <input
              type="file"
              id="image"
              name="profileimage"
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageChange}
              accept="image/*"
            />
            <input
              type="text"
              value={selectedImage ? "Image selected" : "No image selected"}
              readOnly
              className="mt-2 w-full sm:w-52 p-2 border rounded-lg bg-gray-100 text-gray-700"
            />
            {selectedImage && (
              <div className="mt-2">
                <img
                  src={selectedImage}
                  alt="Profile Preview"
                  className="w-full h-24 object-cover rounded-lg"
                />
              </div>
            )}
            <button
              type="button"
              className="mt-2 w-full sm:w-auto bg-[#10b981] hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => document.getElementById("image").click()}
            >
              Upload Game Image
            </button>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Submit"}
            </button>
          </div>

          {uploadStatus && (
            <div
              className={`text-center font-semibold ${
                uploadStatus.includes("success")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {uploadStatus}
            </div>
          )}
        </form>
      </div>
    </AnimatedContent>
  );
}

export default AddGame;
