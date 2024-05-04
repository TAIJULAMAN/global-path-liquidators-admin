import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CategoryEdit = () => {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  React.useEffect(() => {
    const getCategory = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/category/single-category/${category_id}`
      );
      const data = await response.json();
      if (data?.success) {
        setCategoryName(data?.result?.category_name);
        setIsChecked(data?.result?.category_status === "active" ? true : false);
      }
    };
    getCategory();
    // }
  }, [category_id]);
  const handleCreateNew = () => {
    if (categoryName !== "") {
      const apiUrl = `https://darktechteam.com/api/category/update-category/${category_id}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category_name: categoryName,
          category_status: isChecked ? "active" : "inactive"
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        Swal.fire({
          icon: "success",
          title: "Category Updated Successfully",
          showConfirmButton: true,
        });
        navigate(`/product/category`);
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle error if necessary
      });
    }
  };
  
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
    }
  };
  return (
    <div>
      <h1 className="text-3xl mb-5 font-bold text-natural-900 uppercase">
        {" "}
        EDIT CATEGORY
      </h1>
      <div className="shadow-lg rounded-lg max-w-full">
        <form className="bg-white p-5 my-4 dark:bg-gray-800">
          <div>
            <label className="block text-natural-900 text-sm font-semibold mb-2">
              Category Name
            </label>
            <Input
              placeholder="Category Name"
              className="w-full text-natural-900"
              value={categoryName}
              onChange={(e) => {
                e.preventDefault();
                setCategoryName(e.target.value);
              }}
            />
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

          <div className="flex text-center items-center justify-center">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              UPDATE CATEGORY
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryEdit;
