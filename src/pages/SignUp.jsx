import React from "react";
import { Link } from "react-router-dom";
import { Input, Label, Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

// Internal import
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SelectRole from "@/components/form/selectOption/SelectRole";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import ImageLight from "@/assets/img/signup.jpg";
import ImageDark from "@/assets/img/signup-modified.jpg";

const SignUp = () => {
  const { t } = useTranslation();
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();
  const validatePassword = (value) => {
    if (value.length <= 6) {
      return "Password must be greater than 6 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    return true;
  };

  return (
    <div className="flex items-center min-h-screen p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col md:flex-row">
          <div className="h-48 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex flex-col p-4 sm:p-6 md:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-xl font-semibold text-gray-700 dark:text-gray-200 sm:text-2xl">
                {t("CreateAccount")}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <LabelArea label="Name" />
                <InputArea
                  required={true}
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder=""
                />
                <Error errorName={errors.name} />

                <LabelArea label="Email" />
                <InputArea
                  required={true}
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder=""
                />
                <Error errorName={errors.email} />
                <LabelArea label="mobile no." />
                <InputArea
                  required={true}
                  register={register}
                  label="mobile"
                  name="mobile"
                  type="text"
                  placeholder="1234567890"
                  maxLength="10"
                  minLength="10"
                />
                <Error errorName={errors.mobile} />

                <LabelArea label="Dob" />
                <InputArea
                  required={true}
                  register={register}
                  label="Dob"
                  name="dob"
                  type="date"
                />
                <Error errorName={errors.dob} />

                <LabelArea label="Password" />
                <InputArea
                  required={true}
                  register={register}
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder=""
                />
                <Error errorName={errors.password} />

                <Label className="mt-4 sm:mt-6" check>
                  <Input type="checkbox" required />
                  <span className="ml-2 text-sm sm:text-base">
                    {t("Iagree")}{" "}
                    <span className="underline">{t("privacyPolicy")}</span>
                  </span>
                </Label>

                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-4 h-10 sm:h-12 w-full bg-blue-700 hover:bg-blue-400"
                  to="/dashboard"
                  block
                >
                  {t("CreateAccountTitle")}
                </Button>
              </form>

              <hr className="my-4" />
              <p className="mt-4 text-sm sm:text-base">
                <Link
                  className="font-medium text-blue-600 dark:text-blue-600 hover:underline"
                  to="/login"
                >
                  {t("AlreadyAccount")}
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
