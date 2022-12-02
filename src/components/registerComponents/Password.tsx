import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage, isPasswordValid } from "../../helpers/FormHelpers";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

type FormValues = {
  password: string;
  confirmPassword: string;
};
function Password(props: any) {
  const [show, setShow] = useState(false);
  const [showIcon, setShowIcon] = useState(<VisibilityOffIcon />);
  const [show2, setShow2] = useState(false);
  const [showIcon2, setShowIcon2] = useState(<VisibilityOffIcon />);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({ mode: "onChange" });

  const onShow = () => {
    if (show) {
      document.getElementById("show-button")?.setAttribute("type", "password");
      setShowIcon(<VisibilityOffIcon />);
      setShow(!show);
    } else {
      document.getElementById("show-button")?.setAttribute("type", "text");
      setShowIcon(<VisibilityIcon />);
      setShow(!show);
    }
  };

  const onShow2 = () => {
    if (show2) {
      document.getElementById("show-button2")?.setAttribute("type", "password");
      setShowIcon2(<VisibilityOffIcon />);
      setShow2(!show2);
    } else {
      document.getElementById("show-button2")?.setAttribute("type", "text");
      setShowIcon2(<VisibilityIcon />);
      setShow2(!show2);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const isValidPassowrd = (e: any) => {
    if (!e || isPasswordValid(e)) {
      return true;
    }
    return "Password must not be less 8 characters";
  };

  const passwordMatch = (e: any) => {
    if (!e || getValues("password") === getValues("confirmPassword")) {
      return true;
    }
    return "Password Mismatch";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mt-6 mb-2 text-sm font-semibold text-gray-900 dark:text-white">Mot de passe</label>
        <div className="flex">
          <input
            {...register("password", { required: "Password is required", validate: isValidPassowrd })}
            type="password"
            id="show-button"
            className="rounded-none rounded-l-lg border-r-0 border-2 text-gray-900 block flex-1 min-w-0 w-60 text-sm border-gray-200 p-2.5  dark:bg-gray-700  focus:outline-none"
          />
          <span className="inline-flex items-center px-1 text-sm text-gray-900 bg-transparent border-2 border-l-0 border-gray-200 rounded-r-lg appearance-none w-15 border-l-none focus:outline-none" onClick={() => onShow()}>
            <div className="mr-1">{showIcon}</div>
          </span>
        </div>
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>
      <div>
        <label className="block mt-6 mb-2 text-sm font-semibold text-gray-900 dark:text-white">Confirmer mot de passe</label>
        <div className="flex">
          <input
            {...register("confirmPassword", { required: "Confirm Password is required", validate: passwordMatch })}
            type="password"
            id="show-button2"
            className="rounded-none rounded-l-lg border-r-0 border-2 text-gray-900  block flex-1 min-w-0 w-60 text-sm border-gray-200 p-2.5  focus:outline-none"
          />
          <span className="inline-flex items-center px-1 text-sm text-gray-900 bg-transparent border-2 border-l-0 border-gray-200 rounded-r-lg appearance-none w-15 border-l-none " onClick={() => onShow2()}>
            <div className="mr-1">{showIcon2}</div>
          </span>
        </div>
        {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />}
      </div>
      <div className="flex mt-6 space-x-2">
        <button type="submit" style={{ backgroundColor: "#5819F1" }} className="inline-block px-4 py-3 text-xs font-semibold leading-tight text-white transition duration-150 ease-in-out rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
          Terminer
        </button>
      </div>
    </form>
  );
}

export default Password;
