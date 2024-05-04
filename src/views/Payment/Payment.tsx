import { FaEdit } from "react-icons/fa";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Button, Input } from "@/components/ui";

export type ICategory = {
  category_id: string | number | readonly string[] | undefined;
  payment_method_id: number;
  payment_method_name: string;
  created_at: string;
  category_name: string;
  updated_at: string;
  payment_method_status: string;
  cat_id: number;
};

const Payment = () => {
  const [allPaymenthod, setAllPaymentMethod] = useState<Array<ICategory>>([]);
  const [methodName, setMethodName] = useState("");
  const [status, setStatus] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEditCategory = (payment_method_id: number) => {
    navigate(`/payment/${payment_method_id}`);
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
    }
  };

  React.useEffect(() => {
    const getAllPaymentMethod = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/paymentMethods/all-payment-methods`
      );
      const data = await response.json();
      setAllPaymentMethod(data?.result);
      setRefetch(false);
    };
    getAllPaymentMethod();
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (methodName !== "") {
        const payment_method_name = methodName;

        const response = await fetch(
          `https://darktechteam.com/api/paymentMethods/create-payment-method`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ payment_method_name }), // convert object to JSON string
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
            title: "Payment Method Added Successfully",
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
      title: "Do you want delete this Payment Method?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/paymentMethods/delete-payment-method/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Method Deleted successfully");
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
      <h1 className="text-3xl mb-5 font-bold text-natural-900 uppercase">
        PAYMENT METHOD
      </h1>

      <div className="shadow-lg rounded-lg dark:rounded-lg lg:w-ful max-w-full">
        <form className="bg-white dark:bg-gray-800 p-5">
          <div>
            <label className="text-md text-natural-900 font-semibold mb-2 ">
              Payment Method Name
            </label>
            <Input
              placeholder="Enter Payment Method Name"
              className="w-full"
              onChange={(e) => {
                e.preventDefault();
                setMethodName(e.target.value);
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
              <label className="text-natural-900 text-sm font-boldblock">
                Status : {isChecked ? "Active" : "Inactive"}
              </label>
            </div>
          </div>

          <div className="flex text-center items-center justify-center my-5">
           
            <Button
            variant="solid"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleCreateNew();
            }}
          >
              CREATE PAYMENT METHOD
          </Button>
          </div>
        </form>
      </div>

      <div className="my-5">
        <div className="w-full relative overflow-x-auto">
          <table className="border rounded-lg w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#42A5F5] text-white  dark:bg-gray-700">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Method Name
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
              {allPaymenthod?.length > 0 &&
                allPaymenthod?.map((method, key) => {
                  return (
                    <tr key={key} className="bg-white border-b-2 border-gray-300">
                      <td
                        scope="row"
                        className="px-6 text-center py-4 text-black whitespace-nowrap"
                      >
                        {key + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center whitespace-nowrap text-black"
                      >
                        {method?.payment_method_name}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center text-[#004D40]"
                      >
                        {method?.payment_method_status}
                      </td>
                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() =>
                            handleEditCategory(method?.payment_method_id)
                          }
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(method?.payment_method_id);
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

export default Payment;
