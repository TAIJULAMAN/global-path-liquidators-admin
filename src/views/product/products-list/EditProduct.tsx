import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@/components/ui/Input";
import axios from "axios";
import { ICategory } from "../productCategory/category";
import { ICondition } from "../condition/Conditions";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState([""]);
  const [isChecked, setIsChecked] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [flatRate, setFlatrate] = useState("");
  const [status, setStatus] = useState("");
  const [day, setDay] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [store_id, setStoreId] = useState("");
  const [conditionId, setConditionId] = useState("");
  const [productType, setProductType] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);

  const [singleMenifest, setSingleMenifest] = useState("");
  const [singleCategory, setSingleCategory] = useState("");
  const [singleCondition, setSingleCondition] = useState("");
  const [singleStore, setSingleStore] = useState("");
  //   console.log(singleProduct);
  const navigate = useNavigate();

  React.useEffect(() => {
    // if (refetch) {
    const getProduct = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/products/single-product/${id}`
      );
      const data = await response.json();
      if (data?.success) {
        setSingleProduct(data?.result);
        setProductName(data?.result?.product_name);
        setProductPrice(data?.result?.price);
        setSingleMenifest(data?.result?.manifest_status);
        setSingleCategory(data?.result?.category_id);
        setSingleCondition(data?.result?.condition_id);
        setSingleStore(data?.result?.store_id);

        setIsChecked(data?.result?.product_status === "active" ? true : false);
      }
    };
    getProduct();
    // }
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

  const handleUpdate = () => {
    if (productName !== "") {
      const apiUrl = `https://darktechteam.com/api/products/update-product/${id}`;
      axios
        .put(apiUrl, {
          product_name: productName,
          price: productPrice,
          category_id: categoryId ? categoryId : singleCategory,
          condition_id: conditionId ? conditionId : singleCondition,
          store_id: store_id ? store_id : singleStore,
          manifest_status: productType ? productType : singleMenifest,
          product_status: isChecked ? "active" : "inactive",
          //   product_image: productImage,
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/product/all-products`);
    }
    setRefetch(true);
  };

  const handleCategoryId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };
  const handleStoreId = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStoreId(e.target.value);
  };
  const handleConditionId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConditionId(e.target.value);
  };
  const handleProductType = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProductType(e.target.value);
  };

  return (
    <div>
      <div className="mb-5 text-3xl text-natural-900 font-semibold uppercase">
        Update Product
      </div>
      <div>
        <div className=" p-3 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="text-md text-natural-900 font-semibold mb-2">
              Product Name
            </div>

            <Input
              className="appearance-none border dark:border-gray-500 rounded-lg w-full py-2 px-3 text-natural-900 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => {
                e.preventDefault();
                setProductName(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="text-md text-natural-900 font-semibold mb-2">
              Product Price
            </div>
            <Input
              className="appearance-none border rounded-lg dark:border-gray-500 w-full py-2 px-3 text-natural-900 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter Product Price"
              value={productPrice}
              onChange={(e) => {
                e.preventDefault();
                setProductPrice(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="text-md text-natural-900 font-semibold mb-2">
              Select Product Category
            </div>
            <select
              className="form-input p-3 border rounded-lg dark:border-gray-500 dark:bg-gray-800 text-sm w-full"
              onChange={handleCategoryId}
            >
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
              className="form-input p-3 border dark:border-gray-500 rounded-lg dark:bg-gray-800 text-sm w-full"
              onChange={handleStoreId}
            >
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
              className="form-input p-3 border dark:border-gray-500 rounded-lg dark:bg-gray-800 text-sm w-full"
              onChange={handleConditionId}
            >
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
              className="form-input p-3 border dark:border-gray-500 rounded-lg dark:bg-gray-800 text-sm w-full"
              onChange={handleProductType}
            >
              <option value="1">Manifasted</option>
              <option value="0">Unmanifasted</option>
            </select>
          </div>
          <div>
            <div className="text-md text-natural-900 font-semibold mb-2">
              Product Image
            </div>
            <input
              type="file"
              className="w-full py-2 px-3 border rounded-lg dark:border-gray-500 focus:outline-none"
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
      </div>
      <div className="my-5 flex gap-2">
            <input
              type="checkbox"
              name="enable_setup_cost"
              className="rounded-full inline-block"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="text-natural-900 text-md font-semibold block">
              Product Status : {isChecked ? "Active" : "Inactive"}
            </label>
          </div>
      <div className="flex mb-5 text-center items-center justify-center">
          <button
            className="bg-blue-500 mb-5 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            UPDATE PRODUCT
          </button>
        </div>
    </div>
  );
};

export default EditProduct;
