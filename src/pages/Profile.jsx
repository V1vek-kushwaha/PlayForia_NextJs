import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

//internal import
import { AdminContext } from "@/context/AdminContext";
import PageTitle from "@/components/common/PageTitle";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import AnimatedContent from "@/components/common/AnimatedContent";
import AdminServices from "@/services/AdminServices";
import { useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState();
  const { t } = useTranslation();
  // const {
  //   state: { adminInfo },
  // } = useContext(AdminContext);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const res = await AdminServices.GetProfile();
      console.log(res);
      setUserData(res.data);
    } catch (error) {}
  };

  return (
    <>
      <PageTitle> {t("Profile")} </PageTitle>
      <AnimatedContent>
        <div className="container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
          <a
            href="/edit-profile"
            className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-3 md:px-4 lg:px-6 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-emerald-600 h-10  text-sm lg:text-base w-full sm:w-auto"
          >
            Edit Profile
          </a>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full">
            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ProfilePicture")} />
              <div className="col-span-8 sm:col-span-4">
                {userData?.profileImg ? (
                  <Avatar
                    className="align-middle"
                    src={`${userData.profileImg}`}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="border-white p-2 border rounded-full">
                    {userData.email[0].toUpperCase()}
                  </span>
                )}
              </div>
            </div> */}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ProfileName")} />
              <div className="col-span-8 sm:col-span-4">
                <h1>{userData?.name}</h1>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ProfileEmail")} />
              <div className="col-span-8 sm:col-span-4">
                <h1>{userData?.email}</h1>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Date Of Birth")} />
              <div className="col-span-8 sm:col-span-4">
                <h1>{userData?.dob}</h1>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Status")} />
              <div className="col-span-8 sm:col-span-4">
                <h1>{userData?.status}</h1>
              </div>
            </div>
          </div>
        </div>
      </AnimatedContent>
    </>
  );
};

export default Profile;
