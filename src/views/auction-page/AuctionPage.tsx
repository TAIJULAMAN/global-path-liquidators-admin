import React, { useRef, ChangeEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@/components/ui";
import { HiOutlinePlus } from "react-icons/hi";
import { ICondition } from "../product/condition/Conditions";
import { ICategory } from "../Payment/Payment";

const AuctionPage = () => {
  const [page, setPage] = useState(1); // default page is 1 //
  const [perPage, setPerPage] = useState(10);

  const [categoryId, setCategoryId] = useState("");
  const [conditionName, setConditonName] = useState("");

  // console.log(categoryId, conditionName);

  const tableRef = useRef(null);

  type Auctionstore = {
    Auction_id: number;
    product_name: string;
    created_at: string;
    updated_at: string;
    Starting_Price: string;
    condition_name: string;
    Description: string;
    Status: string;
    product_image: string;
    category_name: string;
    Title: string;
    Current_Bid: string;
    metaPage: number;
    Start_Time: string;
    End_Time: string;
    category_status: string;
  };
  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const metaPage: any = meta?.page;

  const formatAsMMDDYYYYy = (dateString: string | number | Date) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(dateObj.getDate()).padStart(2, "0"); // Add leading zero if needed
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const [auctionStore, setAuction] = useState<Array<Auctionstore>>([]);
  const [refetch, setRefetch] = useState(false);
  const [visibility, setVisibility] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const handleCreatePage = () => {
    navigate("/auction-product-create");
  };

  React.useEffect(() => {
    // if (refetch) {
    const getAllAuctionStore = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/auctions/getAllAuctionProductss?${categoryId ? `category_id=${categoryId}` : ""}${conditionName ? `&condition_id=${conditionName}` : ""}&page=${page}&limit=${perPage}`
      );
      const data = await response.json();
      setAuction(data?.result);
      setMeta(data?.meta);
      setRefetch(false);
    };
    getAllAuctionStore();
  }, [refetch, categoryId, conditionName, page, perPage]);

  const handleRemove = (id: number) => {
    Swal.fire({
      title: "Do you want delete the product?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/auctions/remove-auction/${id}`;
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

  const handleEditAuction = (id: number) => {
    navigate(`/auction/product-edit/${id}`);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Set the state to the checked value
    if (!event.target.checked) {
      //   setSetupCost(0);
    }
  };

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

  const [searchQuery, setSearchQuery] = useState("");
  // Filter data based on the search query
  const filteredResults = auctionStore?.filter((item: any) =>
    item?.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-hidden">
      <div>
        <Link to="/auction-product-create">
          <Button
            className="mr-2 mb-5"
            variant="twoTone"
            icon={<HiOutlinePlus />}
          >
            <span>
              <span>CREATE AUCTION PRODUCT</span>
            </span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
          <div className="relative">
            <label className="sr-only">Search</label>
            <input
              type="text"
              name="table-with-pagination-search"
              id="table-with-pagination-search"
              className="p-4 ps-11 w-full focus:w-full border dark:border-gray-500 bg-white dark:bg-gray-800 rounded-lg  placeholder:text-natural-900"
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
        <div className="">
          <select
            className="select p-4 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full text-natural-900"
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
        <div className="">
          <select
            className="select p-4 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full text-natural-900"
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

        <div className="item-center justify-start flex gap-2 mt-5">
          <input
            type="checkbox"
            name="enable_setup_cost"
            className="rounded-full inline-block"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label className="text-natural-900 text-md font-bold block">
            Auction Product Status : {isChecked ? "Active" : "Inactive"}
          </label>
        </div>

      <div className="text-3xl text-natural-900 font-bold my-5 uppercase">
        ALL AUCTION PRODUCTS
      </div>
      <div className="py-5">
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
                        className="px-2  text-white py-3 text-center text-xs font-medium  uppercase"
                      >
                        SL NO
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-xs font-medium text-white uppercase"
                      >
                        IMAGE
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        TITLE
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        DESCRIPTION
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        CATEGORY NAME
                      </th>
                      <th
                        scope="col"
                        className="px-2  py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        CONDITION
                      </th>
                      <th
                        scope="col"
                        className="px-2  py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        CURRENT BID
                      </th>
                      <th
                        scope="col"
                        className="px-2  py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        STARTING PRICE
                      </th>
                      <th
                        scope="col"
                        className="px-2  py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        START TIME
                      </th>
                      <th
                        scope="col"
                        className="px-2  py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        END TIME
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        STATUS
                      </th>

                      <th
                        scope="col"
                        className="px-2 py-3  text-xs font-medium text-white uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredResults?.length > 0 ? (
                      (filteredResults || [])?.map((auction, index: number) => {
                        return (
                          <tr key={index}>
                            <td className=" px-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {index + 1}
                            </td>
                            <td className=" px-2 justify-center  py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              <img
                                className="ml-4 w-16 h-12 rounded"
                                src={`https://darktechteam.com/api/${auction?.product_image}`}
                                alt=""
                              />
                            </td>
                            <td className=" px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {auction?.Title}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {auction?.Description}
                            </td>
                            <td className="text-center px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {auction?.category_name}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {auction?.condition_name}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {auction?.Current_Bid}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {auction?.Starting_Price}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {auction?.Start_Time}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {auction?.End_Time}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {auction?.Status}
                            </td>

                            <td className="px-2 mt-2 text-end flex py-3  text-[30px] text-indigo-400">
                              <FaEdit
                                onClick={() =>
                                  handleEditAuction(auction?.Auction_id)
                                }
                              />
                              <AiOutlineDelete
                                className="mt-0 text-[30px] ml-6 text-red-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemove(auction?.Auction_id);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })
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

export default AuctionPage;
