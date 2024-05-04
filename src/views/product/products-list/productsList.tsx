import axios from "axios";
import React, { useRef, useState } from "react";
import {
  AiFillFileExcel,
  AiOutlineDelete,
  AiOutlineDownload,
} from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "@/components/ui";
import { HiOutlinePlus } from "react-icons/hi";
import ExcelPopup from "./ExcelPopUp";
import { ICondition } from "../condition/Conditions";
import { ICategory } from "../manifestlist/Manifest";

const productsList = () => {
  type Product = {
    manifest_url: string;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allProducts, setAllProducts] = useState<Array<Product>>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const [page, setPage] = useState(1); // default page is 1 //
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [perPage, setPerPage] = useState(10);
  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const metaPage: any = meta?.page;
  const [categoryId, setCategoryId] = useState("");
  const [conditionId, setConditionId] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tableRef = useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [refetch, setRefetch] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    // if (refetch) {
    const getAllProducts = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/products/all-products?${categoryId ? `category_id=${categoryId}` : ""}${conditionId ? `&condition_id=${conditionId}` : ""}&page=${page}&limit=${perPage}`
      );
      const data = await response.json();
      setMeta(data?.meta);
      setAllProducts(data?.result);
      setRefetch(false);
    };
    getAllProducts();
    // }
  }, [refetch, page, categoryId, conditionId, perPage]);
  const [searchQuery, setSearchQuery] = useState("");
  // Filter data based on the search query
  const filteredResults = allProducts?.filter((item: any) =>
    item?.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (id: number) => {
    Swal.fire({
      title: "Do you want delete the product?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/products/remove-product/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Product Deleted successfully");
          });
          setRefetch(true);
        } else if (result.dismiss) {
          Swal.fire("Cancelled", "", "error");
        }
      }
    });
  };
  const navigate = useNavigate();
  const handleEditCategory = (id: number) => {
    navigate(`/product/edit/${id}`);
  };

  // ! Category Section
  const [allCategories, setAllCategories] = useState<Array<ICategory>>([]);

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

  const handleDownloadCsv = async (manifest_url: string) => {
    const url = `https://darktechteam.com/api/${manifest_url}`;
    window.open(url, "_blank");
  };

  const handleCategoryId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(String(e?.target?.value));
  };
  const handleConditionId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConditionId(String(e?.target?.value));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
          <div>
            <Link to="/create-product">
              <Button
                className=""
                variant="twoTone"
                icon={<HiOutlinePlus />}
              >
                <span>
                  <span>CREATE A NEW PRODUCT</span>
                </span>
              </Button>
            </Link>
          </div>
          <div>
            <ExcelPopup />
          </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 mb-5">
          <div>
            <select
              className="select p-4 dark:bg-gray-800 border dark:border-gray-500 text-natural-900 rounded-lg text-md w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
          <div>
            <select
              className="select p-4 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-md text-natural-900 w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
           <div className="relative max-w-xs rounded">
              <label htmlFor="table-with-pagination-search" className="sr-only">
                Search
              </label>

              <input
                type="text"
                name="table-with-pagination-search"
                id="table-with-pagination-search"
                className="form-input p-4 ps-11 w-full focus:w-full text-md border rounded-lg dark:bg-gray-800 dark:border-gray-500 focus:border-indigo-600 focus:ring-indigo-600"
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

      <div className="text-3xl text-natural-900 font-bold my-5 uppercase">
        ALL PRODUCTS
      </div>
      <div className="py-5">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y  divide-gray-700 dark:border-gray-700 dark:divide-gray-700">
              <div className="min-w-full overflow-x-auto">
                <table
                  ref={tableRef}
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-sm   uppercase"
                      >
                        SL NO.
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        PRODUCT IMAGE
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        PRODUCT NAME
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        PRODUCT CATEGORY
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        PRODUCT CONDITION
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        PRICE
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        SOURCE STORE
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        MANIFEST STATUS
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        PRODUCT STATUS
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults?.length > 0 &&
                      filteredResults?.map((product: any, id: number) => {
                        return (
                          <tr key={id} className="border-b-2 border-gray-700 bg-white dark:bg-gray-800 text-natural-900">
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm"
                            >
                              {id + 1}
                            </td>
                            <td className=" px-2 justify-center  py-4 whitespace-nowrap text-sm">
                              <img
                                className="ml-4 w-16 h-12 rounded"
                                src={`https://darktechteam.com/api/${product?.product_image}`}
                                alt=""
                              />
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm"
                            >
                              {product?.product_name}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm"
                            >
                              {product?.category_name}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm"
                            >
                              {product?.condition_name}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm"
                            >
                              {product?.price}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm"
                            >
                              {product?.store_name}
                            </td>{" "}
                            <td className="flex ml-4 text-center px-2 py-4 whitespace-nowrap text-sm">
                              {product?.manifest_status != "1"
                                ? "Unmanifested"
                                : "Manifested"}
                              {product?.manifest_url && (
                                <>
                                  <span className="ml-4">
                                    <AiOutlineDownload
                                      className="mt-0 text-end text-[30px] text-indigo-400"
                                      onClick={() =>
                                        handleDownloadCsv(product?.manifest_url)
                                      }
                                    />
                                  </span>
                                </>
                              )}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm"
                            >
                              {product?.product_status}
                            </td>
                            <td className="px-2 mt-2 text-end flex py-3  text-[30px] text-indigo-400">
                              <FaEdit
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (product?.product_id)
                                    handleEditCategory(product?.product_id);
                                }}
                              />

                              <AiOutlineDelete
                                className="mt-0 text-[30px] ml-6 text-red-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (product?.product_id)
                                    handleRemove(product?.product_id);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
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
                      className="text-sm text-natural-900"
                    >
                      Show
                    </label>
                    <select
                      id="table-pagination-limit"
                      className="mx-2 form-select text-sm text-natural-900"
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

export default productsList;
