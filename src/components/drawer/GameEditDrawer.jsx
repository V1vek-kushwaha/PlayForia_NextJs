import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import

import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import InputArea from "@/components/form/input/InputArea";
import useStaffSubmit from "@/hooks/useStaffSubmit";
import SelectRole from "@/components/form/selectOption/SelectRole";
import DrawerButton from "@/components/form/button/DrawerButton";
import LabelArea from "@/components/form/selectOption/LabelArea";
import Uploader from "@/components/image-uploader/Uploader";
import PermanentBan from "../form/selectOption/PermanentBan";
import { notifyError, notifySuccess } from "@/utils/toast";
import AdminServices from "@/services/AdminServices";

const GameEditDrawer = ({ id }) => {
  const { register, handleSelectLanguage } = useStaffSubmit(id);
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
  const [isActive, setIsActive] = useState(true); // State for Yes/No button

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
  const handleToggle = (value) => {
    setIsActive(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const trimmedGameName = id.trimStart();

    setIsUploading(true);
    // setUploadStatus("");

    const data = new FormData();
    data.append("gameName", formData.name);
    data.append("gameImage", formData.profileimage);
    data.append("description", formData.description);
    data.append("zipFile", formData.file);
    data.append("active", isActive);

    try {
      const res = await AdminServices.EditGames(id, data);
      if (res) {
        notifySuccess("Game Edit Successfully !");
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
      // notifyError(error.error);
      notifyError(error ? error?.response?.data?.error : err?.message);

      // setUploadStatus("Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t(`Edit Game ${id}`)}
            description={t("UpdateGamedescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddStaffTitle")}
            description={t("AddStaffdescription")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form className=" max-w-xl" onSubmit={handleSubmit}>
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
              <div className="mb-2">
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
                />
              </div>

              <div className="mb-2">
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
                ></textarea>
              </div>

              <div className="relative mb-2">
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

              <div className="relative mb-2">
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
                <span className="block dark:text-white text-gray-700 text-sm font-medium mb-2">
                  Active?
                </span>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-lg ${
                    isActive === true
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } mr-2`}
                  onClick={() => handleToggle(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-lg ${
                    isActive === false
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleToggle(false)}
                >
                  No
                </button>
              </div>

              {/* <div className=" mb-2">
                <button
                  type="submit"
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Submit"}
                </button>
              </div> */}

              <DrawerButton id={id} title="User" isSubmitting={isUploading} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default GameEditDrawer;
