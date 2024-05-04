import { Button, Input } from "@/components/ui";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createCustomer = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, setRefetch] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [firstName, setFirstname] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [lastName, setLastname] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userEmail, setEmail] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mobile, setMobile] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");

  //function for create customer
  const handleCreateCustomer = () => {
    if (firstName !== "") {
      const apiUrl = `https://darktechteam.com/api/users/register`;
      axios
        .post(apiUrl, {
          first_name: firstName,
          last_name: lastName,
          email: userEmail,
          phone_number: mobile,
          password: password,
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response);
          navigate("/profiles/all/customers");
        });
    }
    setRefetch(true);
  };
  //function for create customer

  return (
    <div>
      <div className="text-3xl text-natural-900 font-bold mb-5 uppercase">
        CREATE A NEW CUSTOMER
      </div>
      <div className="lg:w-full max-w-full shadow-lg rounded-lg px-5 py-2">
        <form className="bg-white p-5 mb-4 dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                First Name
              </label>
              <Input
                placeholder="Enter First Name"
                required={true}
                onChange={(e) => {
                  e.preventDefault();
                  setFirstname(e.target.value);
                }}
                className="mb-4 w-full"
              />
            </div>
            <div className="mb-4 m-1">
              <label className="block text-natural-900 text-sm font-bold mb-2">
                Last Name
              </label>
              <Input
                placeholder="Enter Last Name"
                required={true}
                onChange={(e) => {
                  e.preventDefault();
                  setLastname(e.target.value);
                }}
                className="mb-4 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4 m-1">
              <label className="block text-natural-900 text-sm font-bold mb-2">
                Email
              </label>
              <Input
                placeholder="Enter Email Address"
                required={true}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                className="mb-4 w-full"
              />
            </div>
            <div className="mb-4 m-1">
              <label className="block text-natural-900 text-sm font-bold mb-2">
                Mobile
              </label>
              <Input
                placeholder="Enter Email Address"
                required={true}
                onChange={(e) => {
                  e.preventDefault();
                  setMobile(e.target.value);
                }}
                className="mb-4 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mb-4 m-1">
              <label className="block text-natural-900 text-sm font-bold mb-2">
                Password
              </label>
              <Input
                placeholder="Enter Password"
                required={true}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                className="mb-4 w-full"
              />
            </div>
          </div>

          <div className="mt-4 flex text-center items-center justify-center">
           
            <Button variant="solid" onClick={handleCreateCustomer}>
              CREATE CUSTOMER
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default createCustomer;
