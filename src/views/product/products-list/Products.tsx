import axios from "axios";
import React, { useState, ChangeEvent, DragEvent, useEffect } from "react";
import Input from "@/components/ui/Input";
import { ICategory } from "../productCategory/category";
import { ICondition } from "../condition/Conditions";
import Swal from "sweetalert2";
import Textarea from "@/views/ui-components/forms/Input/Textarea";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
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
  deal_type_name: string;
}
const Products = () => {
  const [allProducts, setAllProducts] = useState<Array<IProduct>>([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [conditionId, setConditionId] = useState(0);
  const [dealName, setSelectedDealName] = useState("bin_store");
  // bin store all states
  const [flatRate, setFlatrate] = useState("");
  const [binStatus, setBinstatus] = useState("active");
  const [binDay, setBinday] = useState("");
  const [binfeature_date, setFeatureDate] = useState("");
  // bin store all states
  const [spinner, setSpinner] = useState(false);
  const [certs, setCerts] = useState<File[]>([]);
  // bin store all states
  const [palletPrice, setPalletePrice] = useState("");
  const [palletInformation, setPalletInformation] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  // truckload all states
  const [truckloadPrice, setTruckloadPrice] = useState("");
  const [truckloadInformation, setTruckloadInformation] = useState("");
  // bin store all states
  const [productTitle, setProductTitle] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [auctionDescription, setAuctionDescription] = useState("");
  const [store_id, setStoreId] = useState("");
  // const [manifestStatus, setManifestStatus] = useState('')
  const [productType, setProductType] = useState("0");
  const [price, setPrice] = useState(0);
  const [allowOffers, setAllowOffers] = useState(0);


  //small case

  const [caseHighprice, setHighPrice] = useState("");
  const [caseLowPrice, setLowPrice] = useState("");
  const [casedescription, setCaseDescription] = useState("");
  const [status, setStatus] = useState("");
  const handleSatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(String(e?.target?.value));
  };




  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentBid, setCurrentBid] = useState("");
  const [bidIncremental, setBidIncremental] = useState("");

  const [excelFile, setExcel] = useState<File | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [excellFile, setExcellFile] = useState<File | null>(null);
  const navigate = useNavigate();
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
    // }
  }, [refetch]);

  // multiple images upload
  const handleCreateUploadImages = async (product_id: number) => {
    try {
      const formData = new FormData();
      formData.append("product_id", String(product_id));
      certs.forEach((file, index) => {
        formData.append("images", file);
      });
      const response = await axios.post(
        `https://darktechteam.com/api/images/create-new-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.result);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  // create-product-excel file upload
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
      formData.append("truckload_price", String(truckloadPrice));
      formData.append("truckload_information", String(truckloadInformation));

      formData.append("Description", String(auctionDescription));
      formData.append("Starting_Price", String(startPrice));
      formData.append("Current_Bid", String(currentBid));
      formData.append("Start_Time", String(startTime));
      formData.append("End_Time", String(endTime));
      formData.append("Bid_Increment", String(bidIncremental));



      formData.append("case_high_price", String(caseHighprice));
      formData.append("case_low_price", String(caseLowPrice));
      formData.append("case_desc", String(casedescription));
      formData.append("case_status", String(status));



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
      // console.log(responseData.result?.insertId);
      const product_id = responseData.result?.product_id;
      // console.log(product_id);
      if (productType === "1") {
        handleCreateUploadExcel(product_id);
      }
      handleCreateUploadImages(product_id);
      if (responseData.success === true) {
        Swal.fire({
          icon: "success",
          // toast: true,
          title: "Product Added Successfully",
          // position: "top-end",
          showConfirmButton: true,
          // timer: 3000,
          // timerProgressBar: true,
        });
        navigate(`/product/all-products`);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  // ! Category Section
  const [allCategories, setAllCategories] = useState<Array<ICategory>>([]);

  const activeCategories = allCategories.filter(
    (item) => item.category_status === "active"
  );

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

  const [alldealType, setAllDealTupe] = useState([]);
  React.useEffect(() => {
    // if (refetch) {
    const getDealType = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/deal-types/all-dealtypes`
      );
      const data = await response.json();
      setAllDealTupe(data?.result);
      setRefetch(false);
    };
    getDealType();
    // }
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

  const handleCertsDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const dropCertsFiles = Array.from(e.dataTransfer.files) as File[];
    setCerts(dropCertsFiles);
  };

  const handleCertsInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files as FileList);
    setCerts(selectedFiles);
  };

  return (
      <div>
        <div className="text-3xl text-natural-900 font-bold mb-5 uppercase">
          ADD NEW PRODUCTS
        </div>
        <div className="border rounded-lg dark:border-gray-500 mb-5 shadow-lg p-5 bg-white dark:bg-gray-800">
          <div className="overflow-hidden">
            <label className="text-md font-semibold text-natural-900 mb-2">Select Excel File</label>
            <input
              type="file"
              className="mb-5 mt-2 w-full focus:w-full py-2 px-3 border rounded-lg dark:border-gray-500 shadow-lg focus:outline-none"
              placeholder="Select Excel File"
              name="excelsheet"
              onChange={(e) => {
                e.preventDefault();
                if (e.target.files) setExcellFile(e.target?.files[0]);
              }}
            />
          </div>
          <div>
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleUploadExcellFile();
              }}
            >
              UPLOAD PRODUCTS
            </Button>
          </div>
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
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleCategoryId}
              >
                <option>Select Product Category</option>
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
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
            <div>
              <div className="text-md text-natural-900 font-semibold my-2">
                Product Image
              </div>
              <input
                type="file"
                className="p-2 border dark:border-gray-500 rounded-lg text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
            <div className="text-md text-natural-900 font-semibold mb-2">
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
          <div>
            <h2 className="text-center text-natural-900 my-2 font-semibold">
              Your Images
            </h2>
            <div
              className="border-dashed border-2 border-gray-500 p-5 text-center "
              onDrop={handleCertsDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <p className="mb-4">
                Drag and drop files here or click to select files.
              </p>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleCertsInputChange}
                id="certFileInput"
              />
              <label
                htmlFor="certFileInput"
                className="text-primary hover:bg-blue-700  font-bold py-2 px-4 rounded cursor-pointer"
              >
                Select Files
              </label>
            </div>
          </div>
          <div className="mt-4">
            {certs.length > 0 && (
              <div>
                <h2 className="text-xl font-medium mb-2">Selected Files:</h2>
                <ul>
                  {certs.map((cert, index) => (
                    <li key={index}>{cert.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>

        {productType === "1" && (
          <div>
            <div className="mt-2 border p-5 mb-2 grid grid-cols-1 md:grid-cols-1 gap-2">
              <div>
                <div className="border dark:border-gray-500 rounded-lg overflow-hidden p-3 bg-white dark:bg-gray-800">
                  <label className="ml-3">
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

        {/* select any Deal  */}
        <div>
          <div className="mt-2 mb-2 grid grid-cols-1 md:grid-cols-1 gap-2">
            <div>
              <div className="text-md text-natural-900 font-semibold mb-2">
                Select Deal
              </div>

              <select
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleSelectDeal}
              >
                <option>Select Deal</option>
                {alldealType?.map((deal: IProduct, i) => (
                  <option key={i} value={deal?.deal_type_name}>
                    {deal?.deal_type_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* select any Deal */}

        {/* bin store form */}
        {dealName === "bin_store" && (
          <div className="mt-2">
            <form className="border rounded-lg p-5 dark:border-gray-500">
              <div className="text-lg text-natural-900 font-semibold my-3">
                Bin Store Product
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Flat Rate
                  </div>
                  <Input
                    placeholder="Product Price"
                    onChange={(e) => {
                      e.preventDefault();
                      setFlatrate(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Bin Status
                  </div>
                  <select
                    className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                    onChange={handleStatus}
                  >
                    <option>Select Bin Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Day
                  </div>
                  <select
                    className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
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
              <div className="flex mt-4 text-center items-center justify-center">
                <Button variant="solid" onClick={handleCreateNew}>
                  CREATE PRODUCT
                </Button>
              </div>
            </form>
          </div>
        )}
        {/* bin store form */}

        {/* pallet deals form */}
        {dealName === "pallet_store" && (
          <div>
            <div className="text-xl text-natural-900 font-bold mb-3">
              ADD PALLET DEALS
            </div>

            <form className="border dark:border-gray-500 rounded p-5 dark:bg-gray-800">
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
              <div>
                <div className="text-md text-natural-900 font-semibold my-2">
                  Pallet Information
                </div>
                <div>
                  <SunEditor
                    height="200"
                    setContents={palletInformation}
                    onChange={(content) => setPalletInformation(content)}
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

        {/* truckload form */}
        {dealName === "truckload_store" && (
          <div>
            <div className="my-5 text-lg text-natural-900 font-semibold">
              Add TruckLoad
            </div>

            <form className="border dark:border-gray-500 rounded-lg p-5">
              <div className=" grid grid-cols-1 md:grid-cols-1 gap-2">
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Truckload Price
                  </div>
                  <Input
                    placeholder="Trackload Price"
                    onChange={(e) => {
                      e.preventDefault();
                      setTruckloadPrice(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2">
                    Truckload Information
                  </div>
                  <div>
                    <SunEditor
                      height="200"
                      setContents={truckloadInformation}
                      onChange={(content) => setTruckloadInformation(content)}
                      setOptions={{
                        buttonList: [
                          ["undo", "redo"],
                          ["bold", "underline", "italic", "strike"],
                          ["font", "fontSize", "formatBlock"],
                          ["paragraphStyle", "blockquote"],
                          ["fontColor", "hiliteColor"],
                          ["removeFormat"],
                          "/", 
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
        {/*truckload form */}

        {/* truckload form */}
        {dealName === "auction_store" && (
          <div className="mt-4">
            <form className="border rounded p-5 dark:border-gray-600">
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
                  <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
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
                  <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
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
                  <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
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
                  <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
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
                <div className="mt-2 text-md text-natural-900 font-semibold mb-2 dark:text-white">
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
       {dealName === "case_store" && (
        
          <div className="mt-4">
              <div className="text-xl text-natural-900 font-bold mb-3">
              SMALL CASE
            </div>
            <form className="border rounded p-5 dark:border-gray-600">
              <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                <div>
                  <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                    Case High Price
                  </div>
                  <Input
                    placeholder="Case High Price"
                    type="number"
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
                    onChange={(e) => {
                      e.preventDefault();
                      setLowPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Status
              </label>
              <select
                className="select p-3 dark:bg-gray-800 border rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleSatus}
              >
                <option>Select Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
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

export default Products;
