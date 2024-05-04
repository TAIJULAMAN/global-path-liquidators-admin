import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "@/components/ui/Input";
import axios from "axios";
import { Button } from "@/components/ui";
import { HiOutlinePlus } from "react-icons/hi";

const UpdateBinStoreProduct = () => {
  const { id } = useParams();
  const [binStore, setBinstore] = useState([""]);
  const [isChecked, setIsChecked] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [flatRate, setFlatrate] = useState("");
  const [status, setStatus] = useState("");
  const [day, setDay] = useState("");
  const [product_id, setProductId] = useState("");
  const [featureDate, setFeatureDate] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const getBinProduct = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/bin-store/single-item/${id}`
      );
      const data = await response.json();
      console.log(data);
      if (data?.success) {
        setBinstore(data?.result[0]);
        setFlatrate(data?.result[0]?.flat_rate);
        setDay(data?.result[0]?.weekday);
        setFeatureDate(data?.result[0]?.feature_date);
        setIsChecked(data?.result[0]?.bin_status === "Active" ? true : false);
      }
    };
    getBinProduct();
  }, []);

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
    if (flatRate !== "") {
      const apiUrl = `https://darktechteam.com/api/bin-store/update-item/${id}`;
      axios
        .put(apiUrl, {
          flat_rate: flatRate,
          weekday: day,
          feature_date: featureDate,
          bin_status: isChecked ? "Active" : "Inactive",
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/bin-store/products`);
    }
  };

  return (
    <div>
      <div className="text-3xl text-natural-900 font-bold mb-5 uppercase">
        Update Bin Store Product
      </div>
      <div className="shadow-lg rounded-lg px-5 py-2 lg:w-full max-w-full">
        <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
              Flat Rate
            </div>

            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter Flat Rate"
              value={flatRate}
              onChange={(e) => {
                e.preventDefault();
                setFlatrate(e.target.value);
              }}
            />
          </div>

          <div>
            <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
              Day
            </div>
            <select
              className="form-input p-3 border shadow text-sm border-[#E3F2FD] mt-0 w-full"
              onChange={handleDay}
            >
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
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
            <label className="text-gray-700 text-sm font-boldblock">
              Bin Store Status : {isChecked ? "Active" : "Inactive"}
            </label>
          </div>
          <div>
            <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
              Feature Date
            </div>
            <Input
              type="date"
              placeholder="Feature Date"
              onChange={(e) => {
                e.preventDefault();
                setFeatureDate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex my-5 mt-1 text-center items-center justify-center">
          <Button
            variant="solid"
            className="my-5"
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            UPDATE BIN STORE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBinStoreProduct;
