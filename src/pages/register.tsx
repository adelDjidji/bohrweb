import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
};
function register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ mode: "onChange" });
  
  
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex font-sans sm:static">
        <form className="flex-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap m-7">
            <img src="./bohr.png" width="101px" height="43px"></img>
          </div>
          <br />
          <br />
          <div className="container grid justify-center align-middle">
            <div className="text-3xl font-semibold text-gray-900 mt-30">Créez votre compte</div>
            <div>
              <label className="block mt-6 mb-2 text-sm font-semibold text-gray-900 dark:text-white">Nom</label>
              <input
                {...register("firstName", { required: "First Name is required" })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
               {errors.firstName && <ErrorMessage message={errors.firstName.message} />}
            </div>
            <div>
              <label className="block mt-6 mb-2 text-sm font-semibold text-gray-900 dark:text-white">Prénom</label>
              <input
                {...register("lastName", { required: "Last Name is required" })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
            </div>
            <div>
              <label className="block mt-6 mb-2 text-sm font-semibold text-gray-900 dark:text-white">Téléphone</label>
              <div className="flex">
                <select className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-gray-300 border-r-none rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">@</select>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone Number is required" })}
                  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-60 text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.phone && <ErrorMessage message={errors.phone.message} />}
            </div>
            <div className="flex mt-6 space-x-2">
              <button
                type="submit"
                className="inline-block px-4 py-3 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              >
                Suivant
              </button>
            </div>
          </div>
        </form>
        <div className="relative flex-none hidden h-screen sm:flex" style={{ width: "61%" }}>
          <img src="./images/windFarm_banner.jpg" alt="" className="absolute inset-0 object-cover w-full h-full" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default register;
