import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export type ICondition = {
  deal_type_id: number;
  deal_type_name: string;
  created_at: string;
  updated_at: string;
  deal_sign: string;
  deal_open:number;
};
const ProductDeals = () => {
  const [allDealType, setAllDealType] = useState<Array<ICondition>>([]);
  const [dealType, setDealtype] = useState("");
  const [dealsign, setDealsign] = useState("");
  const [refetch, setRefetch] = useState(false);

  console.log(dealsign)

  const navigate = useNavigate();
  const handleEditDealtype = (id: number) => {
    navigate(`/deal-type/edit/${id}`);
  };

  React.useEffect(() => {
    const getAllConditions = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/deal-types/all-dealtypes`
      );
      const data = await response.json();
      setAllDealType(data?.result);
      setRefetch(false);
    };
    getAllConditions();
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (dealType !== "") {
        const deal_type_name = dealType;
        const deal_sign = dealsign;
        

        const response = await fetch(
          `https://darktechteam.com/api/deal-types/create-dealtype`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ deal_type_name,deal_sign }), // convert object to JSON string
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
            title: "Deal Added Successfully",
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
      title: "Do you want delete this Deal Type?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/deal-types/remove-dealtype/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Deal Type Deleted successfully");
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
      <h2 className="text-3xl my-5 font-bold text-natural-900">
        ADD PRODUCT DEAL TYPE
      </h2>

      <div className="shadow-xl rounded-lg px-5 py-2 lg:w-full max-w-full">
        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">,
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mb-4 col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deal Type Name
            </label>
             <Input placeholder="Enter Deal Type Name" className="mb-4 w-full"   
              onChange={(e) => {
                e.preventDefault();
                setDealtype(e.target.value);
              }} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deal Sign
            </label>
             <Input placeholder="Enter Deal Type Name" className="mb-4 w-full"    
             onChange={(e) => {
                e.preventDefault();
                setDealsign(e.target.value);
              }} />
          </div>
          </div>
          <div className="flex text-center items-center justify-center my-4">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              CREATE DEAL TYPE
            </Button>
          </div>
        </form>
      </div>

      <div className="my-5">
        <div className="w-full lg:w-full relative overflow-x-auto border dark:border-gray-700 rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="bg-[#42A5F5] text-white uppercase dark:bg-gray-700">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Deal Type Name
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Deal Sign
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Deal Status
                </th>

                <th scope="col" className="px-6 text-center  py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allDealType.length > 0 &&
                allDealType.map((dealType, key) => {
                  return (
                    <tr key={key} className="bg-white dark:bg-gray-800 border-b-2 border-gray-700">
                      <td
                        scope="row"
                        className="px-6 text-center py-4font-medium whitespace-nowrap"
                      >
                        {key + 1}
                      </td>
                      <td
                        scope="row"
                        className="text-center px-6 py-4 whitespace-nowrap"
                      >
                        {dealType?.deal_type_name}
                      </td>
                      <td
                        scope="row"
                        className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {dealType?.deal_sign}
                      </td>
                      <td
                        scope="row"
                        className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                      
                      <span className={`bg-[#BBDEFB] p-2 px-3 rounded ${dealType?.deal_open === 1 ? 'text-green-600' : 'text-red-600'}`}>
                      {dealType?.deal_open === 1 ? 'Open' : 'Closed'}
                    </span>

                      </td>
                      <td className="px-6 justify-center flex py-4 text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() =>
                            handleEditDealtype(dealType?.deal_type_id)
                          }
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(dealType?.deal_type_id);
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

export default ProductDeals;
