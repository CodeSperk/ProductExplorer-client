import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const {createUser, logOutUser} = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const successMessage = () => {
    Swal.fire({
      icon: "success",
      title: "Registration Success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    setError("");

    createUser(data.email, data.password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: data.name,
          photoURL: data.photo,
        });

        // to avoid auto login after registration
        logOutUser()
          .then()
          .catch((error) => console.log(error));

        // to display success message
        successMessage();
        navigate("/login");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError(
            "Already registered with this email. Try with another Email"
          );
        }
      });
  };

  return (
    <main className=" p-4 md:p-16 lg:p-24 flex min-h-[80vh] justify-center items-center">
      <div className="w-[320px] md:w-[360px]">
        <h2 className="font-bold text-center mb-8 text-[var(--clr-focussed)]">
          Please Register
        </h2>

        {/* to display error message */}
        {error && (
          <div className="w-full border border-[var(--clr-focussed)] p-4 rounded-md mb-4 text-[var(--clr-error)] flex gap-2">
            <CiWarning className="text-5xl" />
            <p>{error}</p>
          </div>
        )}

        <form
          className="px-4 md:px-6 py-8 border border-[var(--clr-light-gray)] rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 className="font-semibold">Create Account</h5>

          {/* Name Field */}
          <div className="flex flex-col my-4">
            <label htmlFor="name" className="text-sm font-semibold mb-2 text-start">
              Name
            </label>
            <input
              type="name"
              placeholder="Enter your name here"
              {...register("name", { required: true })}
              className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
            />
            {errors.name?.type === "required" && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold mb-2 text-start">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email here"
              {...register("email", { required: true })}
              className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* Photo Field */}
          <div className="flex flex-col my-4">
            <label htmlFor="photo" className="text-sm font-semibold mb-2 text-start">
              Photo
            </label>
            <input
              type="text"
              placeholder="Enter your photo url here"
              {...register("photo")}
              className="py-2 rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col mb-8">
            <label htmlFor="password" className="text-sm font-semibold mb-2 text-start">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password here"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 10,
                  pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])/,
                })}
                className="py-2 w-full rounded-md px-4 border border-[var(--clr-light-gray)] focus:border-[var(--clr-secondary)] outline-none text-sm"
              />
              <div
                className="absolute top-1/2 right-4 -translate-y-1/2 text-xl cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <IoEyeOffOutline></IoEyeOffOutline>
                ) : (
                  <IoEyeOutline></IoEyeOutline>
                )}
              </div>
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500 text-sm">
                Min Length is 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500 text-sm">
                Max Length is 10 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500 text-sm">
                At Least one Uppercase, one LowerCase, one Number & one Special
                Character is required
              </span>
            )}
          </div>

          <button className="text-center w-full bg-[var(--clr-focussed)] text-[var(--clr-white)] py-1.5 px-4 rounded-md hover:scale-95 duration-500">
            Register
          </button>
        </form>

        {/* divider */}
        <div className="flex w-full items-center gap-4 my-6">
          <div className="h-[2px] bg-[var(--bg-secondary)] flex-1"></div>
          <div className="divider text-[var(--clr-secondary)] font-medium text-sm">
            Already have an account?
          </div>
          <div className="h-[2px] bg-[var(--bg-secondary)] flex-1"></div>
        </div>

        {/*  */}
        <Link to="/login">
          <button className="text-center w-full border border-[var(--clr-light-gray)] py-2 px-4 rounded-md text-sm font-bold hover:text-[var(--clr-focussed)] hover:underline hover:scale-95 duration-300">
            Login Now
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Register;