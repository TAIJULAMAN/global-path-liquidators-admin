import { FaEdit } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Input } from "@/components/ui";

type ICategory = {
  admin_id: number;
  username: string;
  created_at: string;
  updated_at: string;
  email: string;
  role_name: string;
  role_id: number;
};

const CreateAdmin = () => {
  const [allAdmin, setAlladmin] = useState<Array<ICategory>>([]);
  const [allRole, setAllrole] = useState<Array<ICategory>>([]);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userRole, setRole] = useState("");

  const [refetch, setRefetch] = useState(false);
  React.useEffect(() => {
    // if (refetch) {
    const getAllCategories = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/admins/allAdmins`
      );
      const data = await response.json();
      setAlladmin(data?.result);
      setRefetch(false);
    };
    getAllCategories();
    // }
  }, [refetch]);

  React.useEffect(() => {
    // if (refetch) {
    const getAllRole = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/admins/all-adminRoles`
      );
      const data = await response.json();
      setAllrole(data?.result);
      setRefetch(false);
    };
    getAllRole();
  }, [refetch]);


  const handleCreateNew = async () => {
    try {
      const apiUrl = `https://darktechteam.com/api/admins/create-new`;

      const requestBody = {
        username: String(userName),
        email: String(userEmail),
        password: String(userPassword),
        role_id: String(userRole),
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      const success = responseData.success;
      //   console.log(responseData);
      if (success === true) {
        Swal.fire({
          icon: "success",
          title: "Admin Added Successfully",
          showConfirmButton: true,
        });
      }
      setRefetch(true);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const handleRemove = (id: number) => {
    const apiUrl = `https://darktechteam.com/api/category/remove-category/${id}`;
    axios.delete(apiUrl).then((response) => {
      console.log("DELETE request successful");
      console.log("Response:", response.data);
    });
    setRefetch(true);
  };
  return (
    <div>
      <h2 className="text-3xl mb-5 font-bold text-natural-900 uppercase">ALL ADMIN</h2>

      <div className="lg:w-full max-w-full shadow-lg rounded-lg px-5 py-2 ">
        <form className="bg-white p-5 mb-4 dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                User Name
              </label>
              <Input placeholder="Enter User Name" className="mb-4 w-full"  onChange={(e) => {
                  e.preventDefault();
                  setUserName(e.target.value);
                }}  />

            </div>
            <div className="mb-4">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Email
              </label>
              <Input placeholder="Enter Email Address" className="mb-4 w-full"   onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative w-full mb-2 ">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Select Role
              </label>
              <select
                onChange={(e) => {
                  e.preventDefault();
                  setRole(e.target.value);
                }}
                className=" dark:bg-gray-800 appearance-none border border-gray-300 dark:border-gray-500 rounded-lg w-full py-3 px-3 text-natural-900 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>Select Role</option>
                {allRole?.map((role, i) => (
                  <option key={i} value={role?.role_id}>
                    {role?.role_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 m-1">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Password
              </label>
               <Input placeholder="Enter Password" className="mb-4 w-full"   onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} />
            </div>
          </div>

          <div className="flex text-center items-center justify-center my-5">
            <Button
             variant="solid"
             onClick={(e) => {
              e.preventDefault();
              handleCreateNew();
            }}
              >
      CREATE USER
      </Button>
          </div>
        </form>
      </div>

      <div className="my-5">
        <div className="w-full relative overflow-x-auto border rounded-lg divide-y divide-gray-300 dark:border-gray-700 dark:divide-gray-700">
          <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:border-gray-700">
            <thead className="uppercase bg-[#42A5F5] text-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Email
                </th>

                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {allAdmin.length > 0 &&
                allAdmin.map((admin, key) => {
                  return (
                    <tr key={key} className="bg-white dark:bg-gray-800">
                      <td
                        scope="row"
                        className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {key + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {admin?.username}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {admin?.email}
                      </td>
                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(admin?.admin_id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
