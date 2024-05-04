import axios from "axios";
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Swal from "sweetalert2";
import Textarea from "@/views/ui-components/forms/Input/Textarea";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { ICategory } from "../product/productCategory/category";
import { ICondition } from "../product/condition/Conditions";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";

export interface IProduct {
  product_id?: number;
  product_name?: string;
  category_id?: number;
  category_name?: string;
  condition_id?: number;
  condition_name?: string;
  store_id?: number;
  store_name: string;
  manifest_status?: string;
  manifest_url?: string | null;
  price?: number;
  status?: string;
  allow_offers?: number;
  offer_def?: string | number;
  product_status: "active" | "inactive";
  product_image: string | null;
  created_at?: string;
  updated_at?: string;
}
const CreateAuctionproduct = () => {
  const [allProducts, setAllProducts] = useState<Array<IProduct>>([]);
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [conditionId, setConditionId] = useState(0);
  const [dealName, setSelectedDealName] = useState("auction_store");
  const [flatRate, setFlatrate] = useState("");
  const [binStatus, setBinstatus] = useState("");
  const [binDay, setBinday] = useState("");
  const [binfeature_date, setFeatureDate] = useState("");
  const [palletPrice, setPalletePrice] = useState("");
  const [palletInformation, setPalletInformation] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  const navigate = useNavigate();
  const [truckloadPrice, setTruckloadPrice] = useState("");
  const [truckloadInformation, setTruckloadInformation] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [auctionDescription, setAuctionDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentBid, setCurrentBid] = useState("");
  const [bidIncremental, setBidIncremental] = useState("");


  const [store_id, setStoreId] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState(0);
  const [allowOffers, setAllowOffers] = useState(0);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [excellFile, setExcellFile] = useState<File | null>(null);
  const [refetch, setRefetch] = useState(false);
  React.useEffect(() => {
    const getAllProducts = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/products/all-products`
      );
      const data = await response.json();
      setAllProducts(data?.result);
      setRefetch(false);
    };
    getAllProducts();
  }, [refetch]);
  const handleUploadExcellFile = async () => {
    try {
      const formData = new FormData();
      if (excellFile) {
        formData.append("excelsheet", excellFile);
      }

      const response = await axios.post(
        `https://darktechteam.com/api/products/upload-excelsheet`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("check", response);
      // const data = await response;
      console.log(response.data.result);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };


  const handleCreateNew = async () => {
    try {
      const formData = new FormData();
      formData.append("product_name", String(productName));
      formData.append("category_id", String(categoryId));
      formData.append("condition_id", String(conditionId));
      formData.append("store_id", store_id);
      formData.append("manifest_status", productType);
      formData.append("price", String(price));
      formData.append("weekday", String(binDay));
      formData.append("feature_date", String(binfeature_date));
      formData.append("allow_offers", String(allowOffers));
      formData.append("flat_rate", String(flatRate));
      formData.append("productType", String(dealName));
      formData.append("bin_status", String(binStatus));
      formData.append("truckload_price", String(truckloadPrice));
      formData.append("truckload_information", String(truckloadInformation));

      formData.append("Title", String(productTitle));
      formData.append("Description", String(auctionDescription));
      formData.append("Starting_Price", String(startPrice));
      formData.append("Current_Bid", String(currentBid));
      formData.append("Start_Time", String(startTime));
      formData.append("End_Time", String(endTime));
      formData.append("Bid_Increment", String(bidIncremental));

      formData.append(
        "pallet_information",
        String(palletInformation ? palletInformation : "")
      );
      formData.append("pallet_price", String(palletPrice ? palletPrice : ""));
      formData.append(
        "product_count",
        String(totalProducts ? totalProducts : "")
      );

      if (productImage) {
        formData.append("product_image", productImage);
      }
      const response = await fetch(
        `https://darktechteam.com/api/products/upload-joined-product`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      // console.log(responseData);
      // console.log("check", responseData.result);
      // console.log(responseData.result?.insertId);
      if (responseData.success === true) {
        Swal.fire({
          icon: "success",
          // toast: true,
          title: "Auction Product Added Successfully",
          // position: "top-end",
          showConfirmButton: true,
          // timer: 3000,
          // timerProgressBar: true,
        });
        navigate(`/auction-page`);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };
  const [allCategories, setAllCategories] = useState<Array<ICategory>>([]);
  const activeCategories = allCategories.filter(
    (item) => item.category_status === "active"
  );
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
  }, []);
  const [allConditions, setAllConditions] = useState<Array<ICondition>>([]);
  React.useEffect(() => {
    const getAllConditions = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/conditions/all-conditions`
      );
      const data = await response.json();
      setAllConditions(data?.result);
      setRefetch(false);
    };
    getAllConditions();
  }, []);
  const [allStore, setAllStore] = useState([]);
  React.useEffect(() => {
    const getAllStore = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/store/all-stores`
      );
      const data = await response.json();
      setAllStore(data?.result);
      setRefetch(false);
    };
    getAllStore();
  }, []);
  const handleSelectDeal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDealName(String(e?.target?.value));
  };
  const handleCategoryId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(e?.target?.value));
  };
  const handleConditionId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConditionId(Number(e?.target?.value));
  };
  const handleProductType = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProductType(e.target.value);
  };
  const handleStatus = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBinstatus(e.target.value);
  };
  const handleDay = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBinday(e.target.value);
  };
  const handleStoreId = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStoreId(e.target.value);
  };

  return (
    <div className="py-3 px-5">
      <div>
        <div className="text-3xl text-natural-900 font-bold mb-5 uppercase">
          ADD NEW AUCTION PRODUCT
        </div>

        <form className="border rounded-lg p-5 dark:border-gray-500">
          <div className="text-lg text-natural-900 font-semibold mb-2">
            General Info
          </div>{" "}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <div className="text-md text-natural-900 font-semibold mb-2">
                Product Name
              </div>
              <Input
                placeholder="Enter Product Name"
                onChange={(e) => {
                  e.preventDefault();
                  setProductName(e.target.value);
                }}
              />
            </div>

            <div>
              <div className="text-md text-natural-900 font-semibold mb-2">
                Category
              </div>
              <select
                className="form-input p-3 border rounded-lg dark:border-gray-500 dark:bg-gray-800 text-sm w-full"
                onChange={handleCategoryId}
              >
                <option value="">Select Category</option>
                {activeCategories?.map((category: ICategory, i) => (
                  <option key={i} value={category?.category_id}>
                    {category?.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-md text-natural-900 font-semibold mb-2">
                Select Store Name
              </div>
              <select
                className="form-input p-3 border rounded-lg dark:border-gray-500 dark:bg-gray-800 text-sm w-full"
                onChange={handleStoreId}
              >
                <option value="">Select Store</option>

                {allStore?.map((store: any, i) => (
                  <option key={i} value={store?.store_id}>
                    {store?.store_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-md text-natural-900 font-semibold mb-2">
                Product Condition
              </div>
              <select
                className="form-input p-3 border rounded-lg dark:border-gray-500 dark:bg-gray-800 text-sm w-full"
                onChange={handleConditionId}
              >
                <option value="">Select Condition</option>

                {allConditions?.map((condition: ICondition, i) => (
                  <option key={i} value={condition?.condition_id}>
                    {condition?.condition_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-md text-natural-900 font-semibold mb-2">
                Product Type
              </div>
              <select
                className="form-input p-3 border rounded-lg dark:border-gray-500 dark:bg-gray-800 text-sm w-full"
                onChange={handleProductType}
              >
                <option value="">Select Product Type</option>

                <option value="1">Manifasted</option>
                <option value="0">Unmanifasted</option>
              </select>
            </div>
            <div>
              <div className="text-md text-natural-900 font-semibold mb-2">
                Enter Product Price
              </div>
              <Input
                placeholder="Enter Product Price"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setPrice(Number(e.target.value));
                }}
              />
            </div>

            <div className="">
              <div className="text-md text-natural-900 font-semibold mb-2">
                Product Image
              </div>
              <input
                type="file"
                className="w-full py-2 px-4 border rounded-lg dark:border-gray-500 dark:bg-gary-800 flex-1 focus:outline-none"
                // onBlur={props.handleBlur}
                placeholder="Enter Product image"
                // value={props.values.name}
                name="image"
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.files) setProductImage(e.target?.files[0]);
                }}
              />
            </div>
            <div>
              <div className="text-md text-natural-900 font-semibold mb-2">
                Enter Offer
              </div>
              <Input
                placeholder="Enter Offer"
                onChange={(e) => {
                  e.preventDefault();
                  setAllowOffers(Number(e.target.value));
                }}
              />
            </div>
          </div>
        </form>

        {/* Auction form */}
        {dealName === "auction_store" && (
          <div className="mt-4">
            <form className="border rounded-lg dark:border-gray-500 dark:bg-gray-800 p-5">
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Product Title
                  </div>
                  <Input
                    placeholder="Product Title"
                    onChange={(e) => {
                      e.preventDefault();
                      setProductTitle(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Start Price
                  </div>
                  <Input
                    placeholder="Start Price"
                    type="number"
                    onChange={(e) => {
                      e.preventDefault();
                      setStartPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Start Time
                  </div>
                  <Input
                    placeholder="Start Time"
                    type="date"
                    onChange={(e) => {
                      e.preventDefault();
                      setStartTime(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    End Time
                  </div>
                  <Input
                    placeholder="Start Price"
                    type="date"
                    onChange={(e) => {
                      e.preventDefault();
                      setEndTime(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Current Bid
                  </div>
                  <Input
                    placeholder="Type Current Bid"
                    type="number"
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentBid(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Bid Incremental
                  </div>
                  <Input
                    placeholder="Type Bid Incremental"
                    type="number"
                    onChange={(e) => {
                      e.preventDefault();
                      setBidIncremental(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2 text-md text-natural-900 font-semibold mb-2">
                  Auction Description
                </div>
                <div>
                  <SunEditor
                    height="200"
                    setContents={auctionDescription}
                    onChange={(content) => setAuctionDescription(content)}
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

              <div className="flex mt-4 text-center items-center justify-center">
                <Button
                  variant="solid"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCreateNew();
                  }}
                >
                  CREATE PRODUCT
                </Button>
              </div>
            </form>
          </div>
        )}
        {/*truckload form */}
      </div>
    </div>
  );
};

export default CreateAuctionproduct;
