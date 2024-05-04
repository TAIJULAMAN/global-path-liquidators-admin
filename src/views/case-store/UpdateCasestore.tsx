import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "@/components/ui/Input";
import axios from "axios";
import { Button } from "@/components/ui";
import { HiOutlinePlus } from "react-icons/hi";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Swal from "sweetalert2";
const UpdateCasestore = () => {
  const { id } = useParams();
  const [binStore, setBinstore] = useState([""]);
  const [isChecked, setIsChecked] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [flatRate, setFlatrate] = useState("");
  const [status, setStatus] = useState("1");
  const [day, setDay] = useState("");
  const [product_id, setProductId] = useState("");
  const [featureDate, setFeatureDate] = useState("");
  const navigate = useNavigate();

  const [caseHighprice, setHighPrice] = useState("");
  const [caseLowPrice, setLowPrice] = useState("");
  const [casedescription, setCaseDescription] = useState("");

  const handleSatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(String(e?.target?.value));
  };

  React.useEffect(() => {
    const getBinProduct = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/cases/get-single-case-product/${id}`
      );
      const data = await response.json();
      if (data?.success) {
        setHighPrice(data?.result?.case_high_price);
        setLowPrice(data?.result?.case_low_price);
        setCaseDescription(data?.result?.case_desc);
        setIsChecked(data?.result?.case_status === 1 ? true : false);
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
    if (caseHighprice !== "") {
      const apiUrl = `https://darktechteam.com/api/cases/update-case-product/${id}`;
  
      fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          case_high_price: caseHighprice,
          case_low_price: caseLowPrice,
          case_desc: casedescription,
          case_status: isChecked ? 1 : 0,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
            icon: "success",
            // toast: true,
            title: "Updated Added Successfully",
            // position: "top-end",
            showConfirmButton: true,
            // timer: 3000,
            // timerProgressBar: true,
          });
        navigate(`/case-store`);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
    }
  };
  

  return (
    <div>
      <div className="text-3xl text-natural-900 font-bold my-5">
        Update Case Store Product
      </div>
      <div className="shadow-lg rounded-lg px-5 py-2 lg:w-full max-w-full">
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                    Case High Price
                  </div>
                  <Input
                    placeholder="Case High Price"
                    type="number"
                    value={caseHighprice}
                    onChange={(e) => {
                      e.preventDefault();
                      setHighPrice(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Case Low Price
                  </div>
                  <Input
                    placeholder="Case High Price"
                    type="number"
                    value={caseLowPrice}
                    onChange={(e) => {
                      e.preventDefault();
                      setLowPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="my-8 shadow p-3 flex gap-2">
                <input
                type="checkbox"
                name="enable_setup_cost"
                className="rounded-full inline-block"
                checked={isChecked}
                onChange={handleCheckboxChange}
                />
                <label className="text-gray-700 text-sm font-boldblock">
                Case Store Status : {isChecked ? "Active" : "Inactive"}
                </label>
              </div>
              </div>
            
          
              <div>
                <div className="mt-2 text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Case Description
                </div>
                <div>
                  <SunEditor
                    height="200"
                    setContents={casedescription}
                    onChange={(content) => setCaseDescription(content)}
                    setOptions={{
                      buttonList: [
                        ["undo", "redo"],
                        ["bold", "underline", "italic", "strike"],
                        ["font", "fontSize", "formatBlock"],
                        ["paragraphStyle", "blockquote"],
                        ["fontColor", "hiliteColor"],
                        ["removeFormat"],
                        "/", // Line break
                        ["outdent", "indent"],
                        ["align", "horizontalRule", "list", "lineHeight"],
                        ["table", "link", "image", "video", "audio"],
                        ["fullScreen", "showBlocks", "codeView"],
                        ["preview", "print"],
                      ],
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
            UPDATE CASE STORE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCasestore;
