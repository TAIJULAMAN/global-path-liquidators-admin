import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Paymentedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  const [isChecked, setIsChecked] = useState(true);
  React.useEffect(() => {
    const getCategory = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/paymentMethods/single-payment-method/${id}`
      );
      const data = await response.json();
      if (data?.success) {
        setPaymentMethod(data.result[0]?.payment_method_name);
        setIsChecked(data.result[0]?.status === "active" ? true : false);
      }
    };
    getCategory();
    // }
  }, []);
  const handleCreateNew = () => {
    if (paymentMethod !== "") {
      const apiUrl = `https://darktechteam.com/api/paymentMethods/update-payment-method/${id}`;
      axios
        .put(apiUrl, {
          payment_method_name: paymentMethod,
          payment_method_status: isChecked ? "active" : "inactive",
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/payment`);
    }
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
    }
  };
  return (
    <div>
      <h1 className="text-3xl mb-5 uppercase font-bold text-natural-900">
        {" "}
        EDIT CATEGORY
      </h1>
      <div className="shadow-lg rounded-lg px-5 py-2 max-w-full">
        <form className="bg-white p-5 mb-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category Name
            </label>
            <Input
              placeholder="Payment Method Name"
              className="mb-4 w-full"
              value={paymentMethod}
              onChange={(e) => {
                e.preventDefault();
                setPaymentMethod(e.target.value);
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
              <label className="text-gray-700 text-sm font-boldblock">
                Status : {isChecked ? "Active" : "Inactive"}
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
              UPDATE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Paymentedit;
