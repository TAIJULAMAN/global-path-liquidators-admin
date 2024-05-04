import { FaEdit } from "react-icons/fa";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Input } from "@/components/ui";

export type Insentive = {
  incentive_level_id: number;
  status_level: string;
  lower_limit: string;
 upper_limit: string;
 level_discount: string;
  cat_id: number;
};

const Insentivelevel = () => {
  const [allInsentivelevel, setAllinsentiveLevel] = useState<Array<Insentive>>([]);
  const [levelName, setLevelName] = useState("");
  const [lower_limits, setLowerLimit] = useState("");
  const [upperLimits, setUpperlimit] = useState("");
  const [level_discounts, setLevelDiscount] = useState("");

  const [refetch, setRefetch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEditInsentiveDay = (id: number) => {
    navigate(`/edit-all-insentive-level/${id}`);
  };


  React.useEffect(() => {
    const getAllInsentive = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/incentive-levels/get-all`
      );
      const data = await response.json();
      setAllinsentiveLevel(data?.result);
      setRefetch(false);
    };
    getAllInsentive();
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (levelName !== "") {
        const status_level = levelName;
        const lower_limit = lower_limits;
        const upper_limit = upperLimits;
        const level_discount = level_discounts;

        const response = await fetch(
          `https://darktechteam.com/api/incentive-levels/create-new`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ status_level,lower_limit,upper_limit,level_discount }), // convert object to JSON string
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log(responseData)
        const insertId = responseData.result?.insertId;
        if (insertId) {
          Swal.fire({
            icon: "success",
            title: "Insentive Level Added Successfully",
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
      title: "Do you want delete this Weekday?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/incentive-levels/delete/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Insentive Level Deleted successfully");
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
      <h1 className="text-3xl my-10 font-bold text-natural-900">
       ALL INSENTIVE LEVELS
      </h1>

      <div className=" shadow-lg rounded-lg px-0 py-0 lg:w-ful max-w-full">
        <form className="bg-white px-8 pt-2 pb-8 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Insentive Level Name
              </label>
              <Input
                placeholder="Insentive Level Name"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setLevelName(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Lower Limit
              </label>
              <Input
                placeholder="Lower Limit"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setLowerLimit(e.target.value);
                }}
              />
            </div>
       
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Insentive Upper Limit
              </label>
              <Input
                placeholder="Insentive Upper Limit"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setUpperlimit(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Level Discount
              </label>
              <Input
                placeholder="Level Discount"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setLevelDiscount(e.target.value);
                }}
              />
            </div>
       
          </div>
          <div className="flex text-center items-center justify-center my-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              CREATE INSETIVE LEVEL
            </button>
          </div>
        </form>
      </div>

      <div className="my-2">
        <div className="w-full relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#42A5F5] text-white  dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                INSENTIVE LEVEL NAME
                </th>
                <th scope="col" className="text-center px-6 py-3">
                LOWER LIMIT
                </th>
                <th scope="col" className="text-center px-6 py-3">
                UPPER LIMIT
                </th>
                <th scope="col" className="text-center px-6 py-3">
                LEVEL DISCOUNT
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allInsentivelevel?.length > 0 &&
                allInsentivelevel?.map((insentive, key) => {
                  return (
                    <tr key={key} className="bg-white border dark:bg-gray-800">
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
                        {insentive?.status_level}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        ${insentive?.lower_limit}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-[#004D40]  dark:text-white"
                      >
                         ${insentive?.upper_limit}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-[#004D40]  dark:text-white"
                      >
                         ${insentive?.level_discount}
                      </td>
                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() => handleEditInsentiveDay(insentive?.incentive_level_id)}
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(insentive?.incentive_level_id);
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

export default Insentivelevel;
