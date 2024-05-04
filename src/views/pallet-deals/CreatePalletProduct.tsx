import Input from "@/components/ui/Input";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
  excelFile: string | null;
  created_at?: string;
  updated_at?: string;
}

const CreatePalletProduct = () => {
  const [refetch, setRefetch] = useState(false);

  const [status, setStatus] = useState("");
  const [day, setDay] = useState("");
  const [product_id, setProductId] = useState("");
  // console.log(product_id, categoryId, flatRate, status, day, featureDate)

  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [conditionId, setConditionId] = useState(0);
  const [dealName, setSelectedDealName] = useState("pallet_store");
  // bin store all states
  const [flatRate, setFlatrate] = useState("");
  const [binStatus, setBinstatus] = useState("");
  const [binDay, setBinday] = useState("");
  const [binfeature_date, setFeatureDate] = useState("");
  const [store_id, setStoreId] = useState("");

  const [palletPrice, setPalletePrice] = useState("");
  const [palletInformation, setPalletInformation] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  // const [manifestStatus, setManifestStatus] = useState('')
  const [productType, setProductType] = useState("0");
  const [price, setPrice] = useState(0);
  const [allowOffers, setAllowOffers] = useState(0);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productDescription, setProductDescription] = useState("");
  const [excelFile, setExcel] = useState<File | null>(null);

  const [allCategories, setAllCategories] = useState<Array<ICategory>>([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    // if (refetch) {
    const getAllCategories = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/category/all-categories`
      );
      const data = await response.json();
      setAllCategories(data?.result);
      setRefetch(false);
    };
    getAllCategories();
    // }
  }, []);

  const [allConditions, setAllConditions] = useState<Array<ICondition>>([]);

  React.useEffect(() => {
    // if (refetch) {
    const getAllConditions = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/conditions/all-conditions`
      );
      const data = await response.json();
      setAllConditions(data?.result);
      setRefetch(false);
    };
    getAllConditions();
    // }
  }, []);
  const [allStore, setAllStore] = useState([]);
  React.useEffect(() => {
    // if (refetch) {
    const getAllStore = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/store/all-stores`
      );
      const data = await response.json();
      setAllStore(data?.result);
      setRefetch(false);
    };
    getAllStore();
    // }
  }, []);

  const handleCreateUploadExcel = async (product_id: number) => {
    try {
      const formData = new FormData();
      if (excelFile) {
        formData.append("excelsheet", excelFile);
      }
      const response = await axios.put(
        `https://darktechteam.com/api/products/upload-excel-manifest/${product_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
      formData.append("product_desc", String(productDescription));
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
      // console.log("check", responseData.result);
      // console.log(responseData.result?.product_id);
      const product_id = responseData.result?.product_id;
      handleCreateUploadExcel(product_id);
      if (responseData.result?.product_id) {
        Swal.fire({
          icon: "success",
          // toast: true,
          title: "Pallet Product Added Successfully",
          // position: "top-end",
          showConfirmButton: true,
          // timer: 3000,
          // timerProgressBar: true,
        });
        navigate(`/pallet-deals/products`);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

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
    <div>
      <div className="mb-5 text-3xl text-natural-900 font-bold uppercase">
        Add New Product In Pallet Deals
      </div>
      <div>
        <form className="border rounded-lg p-5 dark:border-gray-500">
          <div className="text-lg text-natural-900 font-semibold mb-4">
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
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleCategoryId}
              >
                <option>Select Product Category</option>
                {allCategories?.map((category: ICategory, i) => (
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
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleStoreId}
              >
                <option>Select Store Name</option>
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
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleConditionId}
              >
                <option>Select Condition</option>
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
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleProductType}
              >
                <option>Select Product Type</option>
                <option value="0">Unmanifasted</option>
                <option value="1">Manifasted</option>
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
            <div className="">
              <div className="text-md text-natural-900 font-semibold mb-2">
                Product Image
              </div>
              <input
                type="file"
                className="p-2 border dark:border-gray-500 rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
          </div>
          <div>
            <div className="mt-2 text-md text-natural-900 font-semibold mb-2">
              Short Description
            </div>
            <Input
              textArea
              placeholder="Enter Short Description"
              onChange={(e) => {
                e.preventDefault();
                setProductDescription(e.target.value);
              }}
            />
          </div>
        </form>

        {productType === "1" && (
          <div>
            <div className="mt-2 border p-5 mb-2 grid grid-cols-1 md:grid-cols-1 gap-2">
              <div>
                <div className="border rounded-md overflow-hidden p-3 bg-white">
                  <label className="ml-3" htmlFor="">
                    Select Manifest Excel File
                  </label>
                  <input
                    type="file"
                    accept="csv,xls,xlsx"
                    className="w-full mt-0 py-2 px-3 border-0 border-b-2  focus:outline-none"
                    placeholder="Select Excel File"
                    name="image"
                    onChange={(e) => {
                      e.preventDefault();
                      if (e.target.files) setExcel(e.target?.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* pallet deals form */}
        {dealName === "pallet_store" && (
          <div className="mt-2">
            <form className="border rounded p-5 dark:border-gray-600">
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Pallet Price
                  </div>
                  <Input
                    placeholder="Pallet Price"
                    onChange={(e) => {
                      e.preventDefault();
                      setPalletePrice(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Pallet Information
                  </div>
                  <Input
                    placeholder="Pallet Information"
                    onChange={(e) => {
                      e.preventDefault();
                      setPalletInformation(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Total Products
                  </div>
                  <Input
                    placeholder="Total Products"
                    onChange={(e) => {
                      e.preventDefault();
                      setTotalProducts(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex mt-4 text-center items-center justify-center">
                <Button
                  variant="solid"
                  type="submit"
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
        {/* pallet deals form */}
      </div>
    </div>
  );
};

export default CreatePalletProduct;
