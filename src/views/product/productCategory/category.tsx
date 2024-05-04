import { FaEdit } from "react-icons/fa";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Input } from "@/components/ui";

export type ICategory = {
  category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
  category_status: string;
  cat_id: number;
};
const Category = () => {
  const [allCategories, setAllCategories] = useState<Array<ICategory>>([]);
  const [newCategory, setNewCategory] = useState("");
  const [status, setStatus] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEditCategory = (category_id: number) => {
    navigate(`/product/category/edit/${category_id}`);
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); 
    if (!event.target.checked) {
    }
  };
  React.useEffect(() => {
    const getAllCategories = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/category/all-categories`
      );
      const data = await response.json();
      setAllCategories(data?.result);
      setRefetch(false);
    };
    getAllCategories();
  }, [refetch]);
  const handleCreateNew = async () => {
    try {
      if (newCategory !== "") {
        const category_name = newCategory;

        const response = await fetch(
          `https://darktechteam.com/api/category/create-category`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ category_name }), // convert object to JSON string
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
            title: "Category Added Successfully",
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
      title: "Do you want delete this Category?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/category/remove-category/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Category Deleted successfully");
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
      <h1 className="text-3xl mb-5 font-bold text-natural-900 uppercase">PRODUCT CATEGORY</h1>

      <div className="shadow-lg rounded-lg px-5 lg:w-ful max-w-full">
        <form className="bg-white dark:bg-gray-800 p-5">
          <div>
            <label className="block text-natural-900 text-sm font-semibold mb-2">
              Category Name
            </label>
             <Input placeholder="Category Name"
              className="w-full"  
                onChange={(e) => {
                e.preventDefault();
                setNewCategory(e.target.value);
              }} />
            <div className="my-4 flex gap-2">
              <input
                type="checkbox"
                name="enable_setup_cost"
                className="rounded-full inline-block"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="text-natural-900 text-sm font-semibold block">
                Category Status : {isChecked ? "Active" : "Inactive"}
              </label>
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
              CREATE CATEGORY
            </button>
          </div>
        </form>
      </div>

      <div className="my-5">
        <div className="w-full relative overflow-x-auto border dark:border-gray-700 rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-sm uppercase bg-[#42A5F5] text-white  dark:bg-gray-700 rounded-lg">
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
              {allCategories.length > 0 &&
                allCategories.map((category, key) => {
                  return (
                    <tr key={key} className="bg-white border-b-2 dark:border-gray-500 dark:bg-gray-800">
                      <td
                        scope="row"
                        className="px-6 text-center py-4 text-natural-900 whitespace-nowra"
                      >
                        {key + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center text-natural-900 whitespace-nowra"
                      >
                        {category?.category_name}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center text-[#004D40]"
                      >
                        {category?.category_status}
                      </td>
                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() =>
                            handleEditCategory(category?.category_id)
                          }
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(category?.category_id);
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

export default Category;
