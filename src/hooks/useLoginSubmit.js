import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

//internal import
import { AdminContext } from "@/context/AdminContext";
import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess, notifyWarn } from "@/utils/toast";
import { removeSetting } from "@/reduxStore/slice/settingSlice";

const useLoginSubmit = () => {
  const reduxDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({
    name,
    email,
    verifyEmail,
    password,
    // role,
    dob,
    mobile,
  }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;
    // return;

    if (location.pathname === "/login") {
      reduxDispatch(removeSetting("globalSetting"));
      AdminServices.loginAdmin({ email, password })
        .then((res) => {
          if (res.is_verified === true) {
            setLoading(false);
            notifySuccess("Login Success!");
            dispatch({ type: "USER_LOGIN", payload: res });
            // console.log(res);
            Cookies.set("adminInfo", JSON.stringify(res), {
              expires: cookieTimeOut,
              sameSite: "None",
              secure: true,
            });
            history.replace("/");
          } else {
            notifyWarn("Please Verify, Check Your Mail!");
            setLoading(false);
          }
        })
        .catch((err) => {
          // console.log(err);
          notifyError(err?.response?.data?.error || err?.message);
          // notifyError(err ? err?.response?.data?.message : err?.message);
          setLoading(false);
        });
    }

    if (location.pathname === "/signup") {
      AdminServices.registerAdmin({ name, email, password, dob, mobile })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess("Register Success!");
            notifyWarn("Check Your Mail For Verification!");
            dispatch({ type: "USER_LOGIN", payload: res });
            Cookies.set("adminInfo", JSON.stringify(res), {
              expires: cookieTimeOut,
              sameSite: "None",
              secure: true,
            });
            history.replace("/");
          }
        })
        .catch((err) => {
          // console.log("error hai", err.response.data.errors[0].msg);

          notifyError(err?.response?.data?.errors[0]?.msg || err?.message);
          // notifyError(err ? err?.response?.data?.message : err?.message);
          setLoading(false);
        });
    }

    if (location.pathname === "/forgot-password") {
      AdminServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err?.response?.data?.message || err?.message);
          // notifyError(err ? err?.response?.data?.message : err?.message);
        });
    }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
