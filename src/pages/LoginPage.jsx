import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios"; // You'll need axios or fetch for making requests

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    console.log(data.email, data.password);
    reset();

    try {
      // Send login data to the backend
      const response = await axios.post(
        `https://movie-explorer-backend-hubs.onrender.com/api/users/login`,
        data
      );
      const { token, user } = response.data;

      // Save token
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);

      if (response.status === 200) {
        // Navigate to the dashboard upon successful login
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center h-screen p-4">
      <div className="loginContainer flex flex-col gap-8 w-full max-w-sm mx-auto">
        <h2 className="text-4xl font-mono text-center mb-5">Login Form</h2>
        <form className="w-full font-mono" onSubmit={handleSubmit(onSubmit)}>
          <label className="input mb-4 input-bordered flex items-center gap-2 text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow py-2 px-3"
              placeholder="Email"
              {...register("email")}
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mb-3 mt-1">
              {errors.email.message}
            </p>
          )}

          <label className="input input-bordered mt-4 flex items-center gap-2 text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow py-2 px-3"
              placeholder="Password"
              {...register("password")}
            />
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <button className="btn btn-secondary mt-6 w-full py-2 text-base">
            Log In
          </button>
        </form>
        <p className="font-mono text-center">
          Haven&apos;t signed up yet?{" "}
          <Link to="/signup">
            <button className="btn btn-primary ml-2 px-12 py-2">
              Click here
            </button>
          </Link>
        </p>
        <Link to="/">
          <button className="btn font-mono btn-outline btn-info w-full py-2 mt-4">
            Return to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
