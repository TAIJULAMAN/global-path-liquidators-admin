import { FaEdit } from "react-icons/fa";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Button, Input } from "@/components/ui";

export type ICategory = {
  store_id: number;
  store_name: string;
  created_at: string;
  updated_at: string;
  category_status: string;
  cat_id: number;
};

const StoreList = () => {
  const [allStore, setAllStore] = useState<Array<ICategory>>([]);
  const [storeName, setNewStore] = useState("");
  const [status, setStatus] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEditCategory = (id: number) => {
    navigate(`/Store-edit/${id}`);
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); 
    if (!event.target.checked) {
    }
  };

  React.useEffect(() => {
    // if (refetch) {
    const getAllStore = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/store/all-stores`
      );
      const data = await response.json();
      setAllStore(data?.result);
      setRefetch(false);
    };
    getAllStore();
    // }
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (storeName !== "") {
        const store_name = storeName;

        const response = await fetch(
          `https://darktechteam.com/api/store/create-store`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify({ store_name }), 
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
            title: "Store Added Successfully",
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
      title: "Do you want delete this Store?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/store/remove-store/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Store Deleted successfully");
          });
          setRefetch(true);
        } else if (result.dismiss) {
          Swal.fire("Cancelled", "", "error");
        }
      }
    });
  };

  return (
    <div className="">
      <h2 className="text-3xl mb-5 font-bold text-natural-900 uppercase">PRODUCT STORE LIST</h2>

      <div className="shadow-lg rounded-lg lg:w-full max-w-full">
        <form className="bg-white dark:bg-gray-800 rounded-lg p-5 mb-4">
          <div>
            <label className="block text-natural-900 font-semibold mb-2">
              Store Name
            </label>
           
             <Input placeholder="Store Name" className="w-full"    onChange={(e) => {
                e.preventDefault();
                setNewStore(e.target.value);
              }} />
          </div>

          <div className="flex text-center items-center justify-center my-5">
           
            <Button variant="solid"  onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}>
            CREATE STORE
      </Button>
          </div>
        </form>
      </div>

      <div className="my-5">
        <div className="w-full relative overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-[#42A5F5] text-white dark:bg-gray-700">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Store Name
                </th>

                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allStore.length > 0 &&
                allStore.map((store, key) => {
                  return (
                    <tr key={key} className="text-natural-900 bg-white border-b-2 dark:border-gray-700 dark:bg-gray-800">
                      <td
                        scope="row"
                        className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {key + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center whitespace-nowrap"
                      >
                        {store?.store_name}
                      </td>

                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() => handleEditCategory(store?.store_id)}
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(store?.store_id);
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

export default StoreList;
