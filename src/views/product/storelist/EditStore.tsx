import { Button, Input } from "@/components/ui";
import Identification from "@/views/account/KycForm/components/Identification";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  React.useEffect(() => {
    // if (refetch) {
    const getStore = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/store/single-store/${id}`
      );
      const data = await response.json();
      console.log(data);
      if (data?.success) {
        setStoreName(data?.result?.store_name);
   
      }
    };
    getStore();
    // }
  }, [id]);
  const handleCreateNew = () => {
    if (storeName !== "") {
      const apiUrl = `https://darktechteam.com/api/store/update-store/${id}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          store_name: storeName
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
          title: "Store Name  Updated Successfully",
          showConfirmButton: true,
        });
        
        navigate(`/Store`);
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle error if necessary
      });
    }
  };
  

  return (
    <div>
      <h2 className="text-3xl mb-5 font-bold text-natural-900 uppercase"> STORE EDIT</h2>
      <div className="shadow-lg rounded-lg max-w-full">
        <form className="bg-white p-5 dark:bg-gray-800">
          <div>
            <label className="block text-natural-900 text-sm font-semibold mb-2">
              Store Name
            </label>
             <Input placeholder="Store Name" className="mb-4 w-full"
                value={storeName} 
                onChange={(e) => {
                e.preventDefault();
                setStoreName(e.target.value);
              }}/>
          </div>

          <div className="flex text-center items-center justify-center my-5">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              UPDATE STORE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStore;
