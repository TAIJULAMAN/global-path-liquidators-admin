import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export type ICondition = {
  condition_id: number;
  condition_name: string;
  created_at: string;
  updated_at: string;
};
const Conditions = () => {
  const [allConditions, setAllConditions] = useState<Array<ICondition>>([]);
  const [newCondition, setNewCondition] = useState("");
  const [refetch, setRefetch] = useState(false);

  const navigate = useNavigate();
  const handleEditCondition = (condition_id: number) => {
    navigate(`/product/condition/edit/${condition_id}`);
  };

  React.useEffect(() => {
    // if (refetch) {
    const getAllConditions = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/conditions/all-conditions`
      );
      const data = await response.json();
      setAllConditions(data?.result);
      setRefetch(false);
    };
    getAllConditions();
    // }
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (newCondition !== "") {
        const condition_name = newCondition;

        const response = await fetch(
          `https://darktechteam.com/api/conditions/create-condition`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ condition_name }), // convert object to JSON string
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        const insertId = responseData.result?.insertId;
        if (insertId) {
          Swal.fire({
            icon: "success",
            title: "Condition Added Successfully",
            showConfirmButton: true,
          });
        }
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const handleRemove = (id: number) => {
    Swal.fire({
      title: "Do you want delete this Condition?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/conditions/remove-condition/${id}`;
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
      <h1 className="text-3xl mb-5 font-bold text-natural-900 uppercase">
        PRODUCT CONDITION
      </h1>
      <div className="shadow-lg rounded-lg lg:w-full max-w-full">
        <form className="bg-white dark:bg-gray-800 p-5">
          <div>
            <div className="mb-4 col-span-2">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Condition Name
              </label>
               <Input placeholder="Enter Condition Name" className="w-full"    onChange={(e) => {
                  e.preventDefault();
                  setNewCondition(e.target.value);
                }} />
            </div>

            <div className="flex justify-center text-center items-center my-5">
              <Button
                variant="solid"
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateNew();
                }}
              >
                CREATE CONDITION
              </Button>
            </div>
          </div>
        </form>
      </div>

        <div className="w-full lg:w-full relative overflow-x-auto border rounded-lg dark:border-gray-500 my-5">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-sm  uppercase bg-[#42A5F5] text-white  dark:bg-gray-700">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Conditon Name
                </th>

                <th scope="col" className="px-6 text-center  py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allConditions.length > 0 &&
                allConditions.map((condition, key) => {
                  return (
                    <tr key={key} className="bg-white dark:bg-gray-800  border-b-2 dark:border-gray-500 text-natural-900">
                      <td
                        scope="row"
                        className="px-6 text-center py-4 whitespace-nowrap"
                      >
                        {key + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {condition?.condition_name}
                      </td>
                      <td className="px-6 justify-center flex py-4 text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() =>
                            handleEditCondition(condition?.condition_id)
                          }
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(condition?.condition_id);
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
  );
};

export default Conditions;
