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
  const [truckloadPrice, setTruckloadPrice] = useState("");
  const [status, setStatus] = useState("");
  const [day, setDay] = useState("");
  const [product_id, setProductId] = useState("");
  const [featureDate, setFeatureDate] = useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    const getBinProduct = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/truckloads/getSingleTruckloadProduct/${id}`
      );
      const data = await response.json();
      if (data?.success) {
        setPalletDeals(data?.result);
        setTruckloadPrice(data?.result.truckload_price);
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
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
    }
  };

  const handleUpdate = () => {
    if (truckloadPrice !== "") {
      const apiUrl = `https://darktechteam.com/api/truckloads/update-truckload/${id}`;
      axios
        .put(apiUrl, {
          truckload_price: truckloadPrice,
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/truckload-deals/products`);
    }
  };

  return (
    <div>
      <div className="text-3xl text-natural-900 font-bold mb-5 uppercase">
        Update Truckload Product
      </div>
      <div className="shadow-lg rounded-lg p-5 lg:w-full max-w-full">
        <div className=" p-3 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="text-md text-natural-900 font-semibold mb-2">
              Truckload Price
            </div>

            <Input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-natural-900 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter Pallet Price"
              value={truckloadPrice}
              onChange={(e) => {
                e.preventDefault();
                setTruckloadPrice(e.target.value);
              }}
            />
          </div>

          <div>
            <div className="text-md text-natural-900 font-semibold mb-2">
              Manifest Status
            </div>
            <select
              className="form-input p-3 border rounded-lg dark:border-gray-500 shadow text-sm dark:bg-gray-800 w-full"
              onChange={handleDay}
            >
              <option value="1">Manifasted</option>
              <option value="0">Unmanifasted</option>
            </select>
          </div>
        </div>
        <div className="my-5 text-center items-center justify-center">
          <Button
            variant="solid"
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            UPDATE PRODUCT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePalletProduct;
