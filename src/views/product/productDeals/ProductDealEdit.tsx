import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const ProductDealEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealTypeName, setDealTypeName] = useState("");
  const [dealsign, setDealsign] = useState("");
  const [isChecked, setIsChecked] = useState(false);



  React.useEffect(() => {
    const getDealType = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/deal-types/dealtype/${id}`
      );
      const data = await response.json();
      if (data?.success) {
        setDealTypeName(data?.result[0]?.deal_type_name);
        setDealsign(data?.result[0]?.deal_sign);
        setIsChecked(data?.result[0]?.deal_open === 1 ? true : false);
      }
    };
    getDealType();
  }, [id]);

const handleCreateNew = () => {
  if (dealTypeName !== "") {
    const apiUrl = `https://darktechteam.com/api/deal-types/update-dealtype/${id}`;
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deal_type_name: dealTypeName,
        deal_sign: dealsign,
        deal_open: isChecked ? "1" : "0",
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("POST request successful");
      console.log("Response:", data);
      navigate(`/add-deals`);
      Swal.fire({
        icon: "success",
        title: "Deal Type Updated Successfully",
        showConfirmButton: true,
      });
   
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
      <h1 className="text-3xl my-5 font-bold text-natural-900 uppercase"> EDIT deal type </h1>
      <div className="shadow-lg rounded-lg px-5 py-2 lg:w-full max-w-full">
        <form className="bg-white px-8 pt-6 pb-8 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mb-4 col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deal Type Name
            </label>
             <Input placeholder="Enter Deal Type Name" 
             className="mb-4 w-full"   
             value={dealTypeName}
              onChange={(e) => {
                e.preventDefault();
                setDealTypeName(e.target.value);
              }} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deal Sign
            </label>
             <Input placeholder="Enter Deal Type Name" 
             value={dealsign}
             className="mb-4 w-full"    
             onChange={(e) => {
                e.preventDefault();
                setDealsign(e.target.value);
              }} />
          </div>
          </div>

          <div className="my-2 flex gap-2">
              <input
                type="checkbox"
                name="enable_setup_cost"
                className="rounded-full inline-block"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="text-gray-700 text-sm font-boldblock">
                Deal Type Status : {isChecked ? "Active" : "Inactive"}
              </label>
            </div>

          <div className="flex text-center items-center justify-center">
            <Button variant="solid" onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}>
        UPDATE DEAL TYPE
      </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDealEdit;
