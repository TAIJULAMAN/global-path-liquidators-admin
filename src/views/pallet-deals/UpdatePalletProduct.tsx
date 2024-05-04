import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@/components/ui/Input";
import axios from "axios";
import { Button } from "@/components/ui";

const UpdatePalletProduct = () => {
  const { id } = useParams();
  const [palletDeals, setPalletDeals] = useState([""]);
  const [isChecked, setIsChecked] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [palletPrice, setPalletPrice] = useState("");
  const [status, setStatus] = useState("");
  const [day, setDay] = useState("");
  const [product_id, setProductId] = useState("");
  const [featureDate, setFeatureDate] = useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    const getBinProduct = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/pallet-deals/single-pallet/${id}`
      );
      const data = await response.json();
      if (data?.success) {
        setPalletDeals(data?.result);
        setPalletPrice(data?.result.pallet_price);
        setIsChecked(data?.result?.product_status === "active" ? true : false);
      }
    };
    getBinProduct();
  }, [id]);

  const handleDay = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDay(e.target.value);
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Set the state to the checked value
    if (!event.target.checked) {
      //   setSetupCost(0);
    }
  };

  const handleUpdate = () => {
    if (palletPrice !== "") {
      const apiUrl = `https://darktechteam.com/api/pallet-deals/update-pallet/${id}`;
      axios
        .put(apiUrl, {
          pallet_price: palletPrice,
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/pallet-deals/products`);
    }
  };

  return (
    <div className="shadow-lg rounded-lg p-5">
      <div className="text-3xl text-natural-900 font-bold mb-5">
        Update Pallet Deals Product
      </div>
    <div className=" lg:w-full max-w-full">
    <div className=" p-3 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="text-md text-natural-900 font-semibold mb-2">
            Pallet Price
          </div>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-natural-900 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter Pallet Price"
            value={palletPrice}
            onChange={(e) => {
              e.preventDefault();
              setPalletPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="text-md text-natural-900 font-semibold mb-2">
            Manifest Status
          </div>
          <select
            className="form-input p-3 border shadow text-sm dark:border-gray-500 mt-0 w-full dark:bg-gray-800"
            onChange={handleDay}
          >
            <option value="1">Manifasted</option>
            <option value="0">Unmanifasted</option>
          </select>
        </div>
        <div className="my-4 flex gap-2">
          <input
            type="checkbox"
            name="enable_setup_cost"
            className="rounded-full inline-block"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label className="text-natural-900 text-md font-semibold block">
            Pallet Deals Status : {isChecked ? "Active" : "Inactive"}
          </label>
        </div>
      </div>
      <div className="flex my-5 text-center items-center justify-center">
         <Button
          variant="solid" 
          onClick={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          >
      UPDATE PALLET DEALS
      </Button>
      </div>
    </div>
    </div>
  );
};

export default UpdatePalletProduct;
