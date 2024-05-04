import axios from "axios";
import { Button, Input } from "@/components/ui";
import { GrFormView } from "react-icons/gr";
import React, { useRef, useState } from "react";
import {
  AiFillFileExcel,
  AiOutlineDelete,
  AiOutlineDownload,
} from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { HiOutlinePlus } from "react-icons/hi";
import Datepicker from "react-tailwindcss-datepicker";

const PromotionalCampaign = () => {
  type Campaigns = {
    manifest_url: string;
    total_amount: string;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allCampaigns, setAllCampaigns] = useState<Array<Campaigns>>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState("");
  const [promotionalName, setPromotionalName] = useState("");
  const [discounts, setDiscount] = useState("");
  const [startDate, setCoupoStartDate] = useState("");
  const [endDate, setCoupoEndDate] = useState("");
  const [page, setPage] = useState(1); // default page is 1 //
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [perPage, setPerPage] = useState(10);
  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const metaPage: any = meta?.pages;
  const totalProducts: any = meta?.totalProducts;
  const totalOrderAmount: any = meta?.totalOrderAmount;

  const navigate = useNavigate();
  const handleCouponEdit = (id: number) => {
    navigate(`/generate-coupon/${id}`);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tableRef = useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [refetch, setRefetch] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateCapaign = async () => {
    try {
      const promotion_name = promotionalName;
      const start_date = startDate;
      const end_date = endDate;
      const discount = discounts;

      const addData = {
        promotion_name,
        start_date,
        end_date,
        discount,
      };

      const response = await fetch(
        `https://darktechteam.com/api/promotions/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      //   console.log(responseData);

      const insertId = responseData.result?.insertId;

      if (insertId) {
        Swal.fire({
          icon: "success",
          title: "Campaign Created Successfully",
          showConfirmButton: true,
        });
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };
  const handleStatus = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatus(e.target.value);
  };
  const getToday = () => {
    const today = new Date();
    const formattedTDate = formatDate(today);
    return formattedTDate;
  };
  const getSevenDaysAgoDate = () => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    // Format the date if needed (e.g., as a string)
    const formattedDate = formatDate(sevenDaysAgo);
    return formattedDate;
  };
  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const sevenDaysAgoDate = getSevenDaysAgoDate();
  const tday = getToday();
  const [value, setValue] = useState({
    startDate: "2020-01-01",
    endDate: tday,
  });
  React.useEffect(() => {
    const getAllCoupons = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/promotions/all-promotions`
      );
      const data = await response.json();
      setMeta(data?.result);
      setAllCampaigns(data?.result);
      setRefetch(false);
    };
    getAllCoupons();
    // }
  }, [refetch]);
  const handleCouponRemove = (id: number) => {
    Swal.fire({
      title: "Do you want delete this Condition?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/coupons/remove-coupon/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Coupon Deleted successfully");
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
        PROMOTIONAL CAMPAIGN
      </h1>

      <div className="shadow-lg rounded-lg lg:w-full max-w-full">
        <form className="bg-white dark:bg-slate-800 p-5">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="mb-2 ">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Promotional Name
              </label>
              <Input
                placeholder="Enter Promotional Name"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setPromotionalName(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Enter Discount
              </label>
              <Input
                placeholder="Enter Discount"
                className="mb-4 w-full"
                type="number"
                onChange={(e) => {
                  e.preventDefault();
                  setDiscount(e.target.value);
                }}
              />
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="mb-4 ">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Start Date
              </label>

              <Input
                className="mb-4 w-full"
                type="date"
                onChange={(e) => {
                  e.preventDefault();
                  setCoupoStartDate(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                End Date
              </label>

              <Input
                className="mb-4 w-full"
                type="date"
                onChange={(e) => {
                  e.preventDefault();
                  setCoupoEndDate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-center text-center items-center my-2">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateCapaign();
              }}
            >
              CREATE CAMPAIGN
            </Button>
          </div>
        </form>
      </div>

      <div className="py-5">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div className="min-w-full overflow-x-auto">
                <table
                  ref={tableRef}
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        SL NO.
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        PROMOTION NAME
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        DISCOUNT
                      </th>

                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        START DATE
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        END DATE
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
                    {allCampaigns?.length > 0 &&
                      allCampaigns?.map((capaign: any, id: number) => {
                        return (
                          <tr
                            key={id}
                            className="border-b-2 border-gray-500 bg-white dark:bg-gray-800"
                          >
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {id + 1}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {capaign?.promotion_name}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {capaign?.discount}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {capaign?.start_date}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {capaign?.end_date}
                            </td>
                            <td className="px-6 justify-center flex py-4 text-[30px] text-indigo-400">
                              <FaEdit
                                onClick={() =>
                                  handleCouponEdit(capaign?.promotion_id)
                                }
                              />
                              <AiOutlineDelete
                                className="text-[30px] ml-8 text-red-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCouponRemove(capaign?.promotion_id);
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
                      className="text-sm text-gray-700 dark:text-gray-200"
                    >
                      Show
                    </label>
                    <select
                      id="table-pagination-limit"
                      className="mx-2 form-select text-sm text-gray-700"
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

export default PromotionalCampaign;
