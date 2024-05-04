import React, { ChangeEvent, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillFileExcel, AiOutlineDownload } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import store from "../../store";
import { ICategory } from "../product/storelist/StoreList";
import { ICondition } from "../product/condition/Conditions";
import { Button } from "@/components/ui";
import { HiOutlinePlus } from "react-icons/hi";

const AllCasestore = () => {
  const [page, setPage] = useState(1); // default page is 1 //
  const [perPage, setPerPage] = useState(10);
  const tableRef = useRef(null);
  type Case = {
    case_id: number;
    manifest_status: string;
    condition_name: string;
    store_name: string;
    product_count: string;
    pallet_price: string;
    product_status: string;
    bin_id: number;
    product_name: string;
    created_at: string;
    updated_at: string;
    feature_date: string;
    weekday: string;
    case_low_price: string;
    case_high_price: string;
    category_status: string;
    product_image: string;
    category_name: string;
    metaPage: string;
    manifest_url: string;
  };
  const { auth } = store.getState();
  const userInfo = auth.session.userInfo;
  const formatAsMMDDYYYYy = (dateString: string | number | Date) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(dateObj.getDate()).padStart(2, "0"); // Add leading zero if needed
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const [allcaseProducts, setCaseProducts] = useState<Array<Case>>([]);
  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const metaPage: any = meta?.page;
  const [categoryId, setCategoryId] = useState("");
  const [conditionName, setConditonName] = useState("");

  // console.log(categoryId, conditionName);

  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  // const handleCreatePage = () => {
  //   navigate("/pallet-deals/upload-new-products");
  // };
  React.useEffect(() => {
    const getAllCase = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/cases/get-case-products?${categoryId ? `category_id=${categoryId}` : ""}${conditionName ? `&condition_id=${conditionName}` : ""}&page=${page}&limit=${perPage}`
      );
      const data = await response.json();
      setMeta(data?.meta);
      setCaseProducts(data?.result);
      setRefetch(false);
    };
    getAllCase();
  }, [refetch, page, perPage, categoryId, conditionName]);
  const [searchQuery, setSearchQuery] = useState("");
//   Filter data based on the search query
  const filteredResults = allcaseProducts?.filter((item: any) =>
    item?.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (id:any) => {
    Swal.fire({
      title: "Do you want to delete this Product?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `https://darktechteam.com/api/cases/remove-case-product/${id}`;
  
        fetch(apiUrl, {
          method: "DELETE",
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log("DELETE request successful");
          return response.json();
        })
        .then((data) => {
            Swal.fire({
                icon: "success",
                // toast: true,
                title: "Product deleted Successfully",
                // position: "top-end",
                showConfirmButton: true,
                // timer: 3000,
                // timerProgressBar: true,
              });
          setRefetch(true);
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
      } else if (result.dismiss) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };
  

  const handleEditPallet = (id: number) => {
    navigate(`/case-store-edit/${id}`);
  };

  const handleDownloadCsv = async (manifest_url: string) => {
    const url = `https://darktechteam.com/api/${manifest_url}`;
    window.open(url, "_blank");
  };
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
  const handleConditionId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConditonName(String(e?.target?.value));
  };
  const handleCategoryId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(String(e?.target?.value));
  };
  const [file, setFile] = React.useState<File | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="my-5">
        <Link to="/create-case-store">
          <Button
            className="mr-2 mb-5"
            variant="twoTone"
            icon={<HiOutlinePlus />}
          >
            <span>
              <span>CREATE CASE STORE PRODUCT</span>
            </span>
          </Button>
        </Link>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-full">
          <div className="relative border rounded-lg">
            <label className="sr-only">Search</label>

            <input
              type="text"
              name="table-with-pagination-search"
              id="table-with-pagination-search"
              className="form-input p-4 ps-11 focus:w-full  placeholder:text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name"
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full">
          <select
            className="select p-4 dark:bg-gray-800 border rounded-lg text-sm w-full text-black"
            onChange={handleCategoryId}
          >
            <option>Select Product Category</option>
            <option value="">All Category</option>
            {allCategories?.map((category: any, i) => (
              <option key={i} value={category?.category_id}>
                {category?.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <select
            className="select p-4 dark:bg-gray-800 border rounded-lg text-sm w-full text-black"
            onChange={handleConditionId}
          >
            <option>Select Condition Name</option>
            <option value="">All Condition</option>
            {allConditions?.map((conditon: any, i) => (
              <option key={i} value={conditon?.condition_id}>
                {conditon?.condition_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* headline */}
      <div className="text-2xl text-natural-900 font-bold my-2">
        ALL CASE STORE PRODUCTS
      </div>
      <div className="py-0">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div className="min-w-full overflow-hidden">
                <table
                  ref={tableRef}
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs font-medium  uppercase"
                      >
                        SL NO
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-3 text-center text-xs font-medium text-white uppercase"
                      >
                        IMAGE
                      </th>

                      <th
                        scope="col"
                        className="px-1 font-bold py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        PRODUCT NAME
                      </th>
                      <th
                        scope="col"
                        className="px-1 font-bold py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        CONDITION NAME
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-3 font-bold text-left text-xs font-medium text-white uppercase"
                      >
                        CATEGORY NAME
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-3 font-bold text-left text-xs font-medium text-white uppercase"
                      >
                        STORE NAME
                      </th>
                      <th
                        scope="col"
                        className="px-1 font-bold py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        CREATED DATE
                      </th>
                      <th
                        scope="col"
                        className="px-1 font-bold py-3 text-left text-xs font-medium text-white uppercase"
                      >
                       HIGH PRICE
                      </th>
                      <th
                        scope="col"
                        className="px-1 font-bold py-3 text-left text-xs font-medium text-white uppercase"
                      >
                      LOW PRICE
                      </th>
                      <th
                        scope="col"
                        className="px-1 font-bold py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        MANIFEST STATUS
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        STATUS
                      </th>

                      <th
                        scope="col"
                        className="px-2 font-bold py-3  text-xs font-medium text-white uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredResults?.length > 0 ? (
                      (filteredResults || [])?.map(
                        (CaseData, index: number) => {
                          return (
                            <tr key={index}>
                              <td className=" px-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {index + 1}
                              </td>
                              <td className=" px-2 justify-center  py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                <img
                                  className="ml-4 w-16 h-12 rounded"
                                  src={`https://darktechteam.com/api/${CaseData?.product_image}`}
                                  alt=""
                                />
                              </td>
                              <td className=" px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {CaseData?.product_name}
                              </td>
                              <td className=" px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {CaseData?.condition_name}
                              </td>
                              <td className="text-start px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {CaseData?.category_name}
                              </td>
                              <td className="text-start px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {CaseData?.store_name}
                              </td>
                              <td className=" px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {formatAsMMDDYYYYy(CaseData?.created_at)}
                              </td>
                              <td className="text-center px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                ${CaseData?.case_high_price}
                              </td>
                              <td className="text-center px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                ${CaseData?.case_low_price}
                              </td>
                              <td className="flex px-2 ml-4 text-center px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {CaseData?.manifest_status != "1"
                                  ? "Unmanifested"
                                  : "Manifested"}
                                {CaseData?.manifest_url && (
                                  <>
                                    <span className="ml-4">
                                      <AiOutlineDownload
                                        className="mt-0 text-end text-[30px] text-indigo-400"
                                        onClick={() =>
                                          handleDownloadCsv(
                                            CaseData?.manifest_url
                                          )
                                        }
                                      />
                                    </span>
                                  </>
                                )}
                              </td>

                              <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {CaseData?.product_status}
                              </td>

                              <td className="px-2 mt-2 text-end flex py-3  text-[30px] text-indigo-400">
                                <FaEdit
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleEditPallet(CaseData?.case_id);
                                  }}
                                />

                                <AiOutlineDelete
                                  className="mt-0 text-[30px] ml-4 text-red-400"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRemove(CaseData?.case_id);
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <td>
                        <span className="w-full flex justify-center items-center p-5">
                          No data found
                        </span>
                      </td>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="py-1 px-4 flex justify-between">
                {/* limit dropdown */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <label
                      htmlFor="table-pagination-limit"
                      className="text-sm text-gray-700 dark:text-gray-200"
                    >
                      Show
                    </label>
                    <select
                      id="table-pagination-limit"
                      className="mx-2 form-select text-sm text-gray-700 dark:text-gray-200"
                      value={perPage}
                      onChange={(e) => setPerPage(parseInt(e.target.value))}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="250">250</option>
                      <option value="500">500</option>
                    </select>
                    <label
                      htmlFor="table-pagination-limit"
                      className="text-sm text-gray-700 dark:text-gray-200"
                    >
                      Entries
                    </label>
                  </div>
                </div>
                {/* Pagination */}
                <nav className="flex items-center justify-end space-x-2">
                  <button
                    className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
                    disabled={metaPage === 1}
                    onClick={(e) => setPage(page - 1)}
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                  {metaPage}
                  <button
                    className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
                    onClick={() => setPage(page + 1)}
                  >
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCasestore;
