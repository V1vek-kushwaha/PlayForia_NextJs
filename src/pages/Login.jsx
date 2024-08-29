import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

// Internal import
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import ImageLight from "@/assets/img/loader.jpeg";
import ImageDark from "@/assets/img/loader-dark.jpeg";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import CMButton from "@/components/form/button/CMButton";

const Login = () => {
  const { t } = useTranslation();
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();

  return (
    <div className="flex items-center min-h-screen p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
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
                {t("Login")}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <LabelArea label="Email" />
                <InputArea
                  required={true}
                  register={register}

                  defaultValue=""

                  // defaultValue="admin@gmail.com"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder=""
                />
                <Error errorName={errors.email} />

                <div className="mt-4 sm:mt-6"></div>
                <LabelArea label="Password" />
                <InputArea
                  required={true}
                  register={register}

                  defaultValue=""

                  // defaultValue="12345678"

                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder=""
                />
                <Error errorName={errors.password} />

                {loading ? (
                  <CMButton
                    disabled={loading}
                    type="submit"
                    className={`bg-blue-600 rounded-md mt-4 h-10 sm:h-12 w-full hover:bg-blue-400`}
                    to="/dashboard"
                  />
                ) : (
                  <Button
                    disabled={loading}
                    type="submit"
                    className="rounded-md mt-4 h-10 sm:h-12 w-full bg-blue-700 hover:bg-blue-400"
                    to="/dashboard"
                  >
                    {t("LoginTitle")}
                  </Button>
                )}
                <hr className="my-10" />
              </form>

              <p className="mt-4 text-sm sm:text-base">
                <Link
                  className="font-medium text-blue-400 dark:text-blue-400 hover:underline"
                  to="/forgot-password"
                >
                  {t("ForgotPassword")}
                </Link>
              </p>
              <p className="mt-1 text-sm sm:text-base">
                <Link
                  className="font-medium text-blue-400 dark:text-blue-400 hover:underline"
                  to="/signup"
                >
                  {t("CreateAccountTitle")}
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
