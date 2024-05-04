import { FaEdit } from "react-icons/fa";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Input } from "@/components/ui";

export type Weeks = {
  weekday_id: number;
  weekday_name: string;
  created_at: string;
  updated_at: string;
  bin_status: string;
  cat_id: number;
};

const WeekDays = () => {
  const [allWeekDays, setAllweeksday] = useState<Array<Weeks>>([]);
  const [weekName, setWeekName] = useState("");
  const [status, setStatus] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEditWeekday = (id: number) => {
    navigate(`/edit-weekday/${id}`);
  };
  const handleSatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(String(e?.target?.value));
  };

  React.useEffect(() => {
    const getAllWeeksdays = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/weekdays/all-weekdays`
      );
      const data = await response.json();
      setAllweeksday(data?.result);
      setRefetch(false);
    };
    getAllWeeksdays();
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (weekName !== "") {
        const weekday_name = weekName;

        const response = await fetch(
          `https://darktechteam.com/api/weekdays/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ weekday_name }), // convert object to JSON string
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        const insertId = responseData.data?.insertId;
        if (insertId) {
          Swal.fire({
            icon: "success",
            title: "WeekDay Added Successfully",
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
          const apiUrl = `https://darktechteam.com/api/weekdays/remove-weekday/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Week Day Deleted successfully");
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
        ALL WEEKS DAYS
      </h1>

      <div className=" shadow-lg rounded-lg px-0 py-0 lg:w-ful max-w-full">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Week Name
              </label>
              <Input
                placeholder="Week Name"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setWeekName(e.target.value);
                }}
              />
            </div>
            <div className="mt-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Bin Status
              </label>
              <select
                className="select p-3 dark:bg-gray-800 border rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleSatus}
              >
                <option>Select Bin Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
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
              CREATE WEEKDAY
            </button>
          </div>
        </form>
      </div>

      <div className="my-5">
        <div className="w-full relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#42A5F5] text-white  dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Status
                </th>

                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allWeekDays?.length > 0 &&
                allWeekDays?.map((weeks, key) => {
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
                        {weeks?.weekday_name}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-[#004D40]  dark:text-white"
                      >
                        {weeks?.bin_status != "1" ? "inactive" : "Active"}
                      </td>
                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() => handleEditWeekday(weeks?.weekday_id)}
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(weeks?.weekday_id);
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

export default WeekDays;
