import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";

// Yup validation schema for sign-up
const signUpSchema = Yup.object({
  name: Yup.string()
    .min(1, "Full name is required")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function SignUpPage() {
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if the form is submitted
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(signUpSchema) }); // Using Yup resolver for form validation

  const onSubmit = async (data) => {
    if (!data) {
      console.log("No data");
      return;
    }
    console.log(data);

    // Set form submission state to true
    setIsSubmitted(true);

    try {
      // Send data to the backend to register the user
      const response = await axios.post(
        "https://movie-explorer-backend-hubs.onrender.com/api/users",
        data
      );

      console.log(response.data);

      if (response.status === 201) {
        // HTTP status code for successful creation
        alert("Registration successful! Please log in.");
        reset(); // Reset the form after successful submission
        setIsSubmitted(false); // Reset the success state

        // Optionally, you can navigate to the login page
        // navigate("/login");
      }
    } catch (error) {
      console.error(
        "Sign-up failed:",
        error.response?.data?.message || error.message
      );
      alert("Sign-up failed. Please try again.");
      setIsSubmitted(false); // Reset the success state if an error occurs
    }

    // Reset the form after a few seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div
      className="container flex flex-col justify-center items-center h-screen"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="signupContainer flex flex-col gap-8 p-4">
        <h2 className="text-4xl font-mono mb-4">Sign Up Form</h2>
        <form className="w-80 font-mono" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name Field */}
          <label
            htmlFor="name"
            className="input mb-3 input-bordered flex items-center gap-2 text-base"
          >
            <input
              type="text"
              className="w-full py-2 px-3"
              id="name"
              name="name"
              placeholder="Full Name"
              autoComplete="name"
              {...register("name")}
            />
          </label>
          {errors.name && (
            <p className="text-red-500 text-xs mb-3">{errors.name.message}</p>
          )}

          {/* Email Field */}
          <label
            htmlFor="email"
            className="input mb-3 input-bordered flex items-center gap-2 text-base"
          >
            <input
              type="email"
              className="w-full py-2 px-3"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-xs mb-3">{errors.email.message}</p>
          )}

          {/* Password Field */}
          <label
            htmlFor="password"
            className="input mb-3 input-bordered flex items-center gap-2 text-base"
          >
            <input
              type="password"
              className="w-full py-2 px-3"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              {...register("password")}
            />
          </label>
          {errors.password && (
            <p className="text-red-500 text-xs mb-3">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password Field */}
          <label
            htmlFor="confirmPassword"
            className="input mb-3 input-bordered flex items-center gap-2 text-base"
          >
            <input
              type="password"
              className="w-full py-2 px-3"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
          </label>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mb-3">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Sign Up Button */}
          <button className="btn btn-primary w-full py-2 text-base mt-4">
            Sign Up
          </button>

          {/* Green Tick Icon */}
          {isSubmitted && (
            <span
              className="ml-3 text-green-500 text-xl"
              aria-label="success"
              role="img"
            >
              ✔️
            </span>
          )}
        </form>

        <p className="font-mono text-center">
          Already have an account?{" "}
          <Link to="/login">
            <button className="btn btn-secondary px-12 mt-4">Log In</button>
          </Link>
        </p>

        <Link to="/">
          <button className="btn font-mono btn-outline btn-info w-full py-2 mt-6">
            Return to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
