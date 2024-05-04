import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditSubscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  React.useEffect(() => {
    const getAllSubscriber = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/subscription/subscribers/user/${id}`
      );
      const data = await response.json();
      if (data?.success) {
        setEmail(data?.result[0]?.email);
        setStatus(data?.result[0]?.status);
      }
    };
    getAllSubscriber();
    // }
  }, []);
  const handleCreateNew = () => {
    if (email !== "") {
      const apiUrl = `https://darktechteam.com/api/subscription/subscribers/${id}`;
      axios
        .put(apiUrl, {
          email: email,
          status: status,
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/subscription-list`);
    }
  };

  const handleStatus = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <h1 className="text-3xl my-10 font-bold text-natural-900">
        {" "}
        SUBSCRIPTION EDIT
      </h1>
      <div className="shadow-lg rounded-lg px-0 py-0 lg:w-full max-w-full">
        <form className="bg-white px-8 pt-6 pb-8">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="mb-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                EMAIL
              </label>

              <Input
                placeholder="Enter Email "
                className="mb-4 w-full"
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                STATUS
              </label>
              <select
                className="select p-3 dark:bg-gray-800 border rounded-lg text-sm w-full text-black"
                onChange={handleStatus}
              >
                <option>Select Status</option>
                <option value={"subscriber"}>subscriber</option>
                <option value={"auction_subscriber"}>auction_subscriber</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center text-center items-center my-2">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              UPDATE SUBSCRIPTION
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscription;
