import { FaEdit } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Input } from "@/components/ui";

export type IAdminRoles = {
  role_id: number;
  role_name: string;
};

const createRole = () => {
  const [allAdminRoles, setAllAdminRoles] = useState<Array<IAdminRoles>>([]);
  const [roleName, setRoleName] = useState("");
  const [refetch, setRefetch] = useState(false);

  const navigate = useNavigate();
  const handleEditCategory = (role_id: number) => {
    navigate(`/adminrole/edit/${role_id}`);
  };

  React.useEffect(() => {
    // if (refetch) {
    const getAllAdminRoles = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/admins/all-adminRoles`
      );
      const data = await response.json();
      setAllAdminRoles(data?.result);
      setRefetch(false);
    };
    getAllAdminRoles();
    // }
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (roleName !== "") {
        const role_name = roleName;

        const response = await fetch(
          `https://darktechteam.com/api/admins/create-adminRole`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ role_name }), // convert object to JSON string
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log(responseData);
        const insertId = responseData.result?.insertId;
        if (insertId) {
          Swal.fire({
            icon: "success",
            title: "Role Added Successfully",
            showConfirmButton: true,
          });
        }
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const handleRemove = (role_id: number) => {
    Swal.fire({
      title: "Do you want delete this Role?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/admins/remove-adminRole/${role_id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Condition Deleted successfully");
          });
          setRefetch(true);
        } else if (result.dismiss) {
          Swal.fire("Cancelled", "", "error");
        }
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl mb-5 text-natural-900 font-bold">ADMIN ROLE</h1>

      <div className=" lg:w-full max-w-full shadow-lg rounded-lg px-5 py-2 ">
        <form className="bg-white p-5 mb-4 dark:bg-gray-800">
          <div>
            <label className="block text-natural-900 text-md font-semibold mb-2">
              Role Name
            </label>
            <Input placeholder="Enter role name" className="mb-4 w-full" />
          </div>
          <div className="flex justify-center text-center items-center my-5">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              CREATE ADMIN ROLE
            </Button>
          </div>
        </form>
      </div>

      <div className="my-5">
        <div className="w-full relative overflow-x-auto border border-gray-300">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="uppercase bg-[#42A5F5] dark:bg-gray-700">
              <tr className="text-white">
                <th scope="col" className="text-center px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Role Name
                </th>

                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allAdminRoles?.length > 0 &&
                allAdminRoles?.map((aRole, key) => {
                  return (
                    <tr key={key} className="bg-white border-b-2 border-gray-200 text-gray-900">
                      <td
                        scope="row"
                        className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                      >
                        {key + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-black"
                      >
                        {aRole?.role_name}
                      </td>

                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                        //   onClick={() => handleEditCategory(aRole?.role_id)}
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(aRole?.role_id);
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

export default createRole;
