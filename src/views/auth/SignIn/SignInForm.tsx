// import type { CommonProps } from "@/@types/common";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { setuserInfo, signInSuccess, useAppDispatch } from "@/store";
import Swal from "sweetalert2";

// interface SignInFormProps extends CommonProps {
//   disableSubmit?: boolean;
//   forgotPasswordUrl?: string;
//   signUpUrl?: string;
// }

const SignInForm = () => {
  // const {
  //   disableSubmit = false,
  //   forgotPasswordUrl = "/forgot-password",
  //   signUpUrl = "/sign-up",
  // } = props;

  // const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [emailUserName, setEmailUserName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userpError, setPError] = useState("");
  const [useruError, setUError] = useState("");
  const [upassword, setPassword] = useState("");
  const [error, setError] = useState(false);
  //   console.log(status);
  const dispatch = useAppDispatch();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setSpinner(true);
    // const username = userName
    // const email = uemail
    if (emailUserName != null) {
      setUError("");
    }
    if (upassword != null) {
      setPError("");
    }

    const password = upassword;

    const addItem: { email?: string; password: string; username?: string } = {
      password,
    };
    if (emailUserName.includes("@")) {
      addItem.email = emailUserName;
    } else {
      addItem.username = emailUserName;
    }

    // console.log(addItem);

    const url = "https://darktechteam.com/api/admins/signin";
    fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      },
      body: JSON.stringify(addItem),
    })
      .then((Response) => Response.json())
      .then((data) => {
        const userNotfound = data?.success;

        const adminId = data?.result.admin.admin_id;
        localStorage.setItem("adminId", adminId);
        // console.log(adminId);
        if (userNotfound === false) {
          // alert('vai tumer username password vhul dico,thik koro')
          setError(true);
        } else {
          Swal.fire({
            icon: "success",
            // toast: true,
            title: "Login Successfully",
            // position: "top-end",
            showConfirmButton: true,
            // timer: 3000,
            // timerProgressBar: true,
          });
          // setStatus(data?.message)

          dispatch(signInSuccess(data.result.accessToken));
          dispatch(setuserInfo(data?.result?.admin));
        }
        setSpinner(false);
      })

      .catch((error) => {
        console.log(error);
        // Swal.fire({
        //     icon: 'error',
        //     // toast: true,
        //     title: `${error.message}`,
        //     // position: "top-end",
        //     showConfirmButton: true,
        //     // timer: 3000,
        //     // timerProgressBar: true,
        // })
      });
  };

  //   const { signIn } = useAuth();

  // create button with loading spinner
  let createContent;
  if (spinner) {
    createContent = (
      <div className="flex items-center">
        <span className="animate-spin inline-block w-4 h-4 mr-2 border-[2px] border-current border-t-transparent text-gray-700 rounded-full"></span>
        <span> Logging...</span>
      </div>
    );
  } else createContent = <span>LOG IN</span>;

  return (
    <div className=" lg:w-full max-w-full lg:px-0">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        {error === true && (
          <label className="block text-red-400 text-sm font-bold mb-2">
            Invalid Username or Password! Failed to login
          </label>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            User name or Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter here ..."
            onChange={(e) => {
              e.preventDefault();
              setEmailUserName(e.target.value);
            }}
          />
          <label className="block text-red-400 text-sm  mb-2">
            {useruError}
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          />
          <label className="block text-red-400 text-sm  mb-2">
            {userpError}
          </label>
        </div>

        <div
          className="w-full bg-blue-500 hover:bg-blue-700 rounded flex items-center justify-center"
          onClick={(e) => {
            if (emailUserName === "") {
              setUError("Please enter your userName");
            }
            if (upassword === "") {
              setPError("Please enter your password");
            } else {
              handleLogin(e);
            }
          }}
        >
          <button
            className="mr-4 text-white py-2 px-4 focus:outline-none focus:shadow-outline"
            type="button"
          >
            {createContent}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
