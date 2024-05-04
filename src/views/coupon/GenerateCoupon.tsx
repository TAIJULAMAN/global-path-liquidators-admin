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
const GenerateCoupon = () => {
  type Coupons = {
    manifest_url: string;
    total_amount: string;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allCoupons, setAllCoupons] = useState<Array<Coupons>>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponValuePerchantage, setCouponvaluePerchantage] = useState("");
  const [couponValueFlat, setCouponvalueFlat] = useState("");
  const [usesLimit, setUsesLimit] = useState("");
  const [couponStart, setCoupoStartDate] = useState("");
  const [couponEnd, setCoupoEndDate] = useState("");
  const [couponType, setCoupontype] = useState("flat_amount");
  const [campaing, setCampaigns] = useState("");

  type Campaigns = {
    manifest_url: string;
    total_amount: string;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allCampaigns, setAllCampaigns] = useState<Array<Campaigns>>([]);
  React.useEffect(() => {
    const getAllCampaign = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/promotions/all-promotions`
      );
      const data = await response.json();
      setMeta(data?.result);
      setAllCampaigns(data?.result);
      setRefetch(false);
    };
    getAllCampaign();
    // }
  }, []);

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

  const handleCreateCoupon = async () => {
    try {
      const code = couponCode;
      const flat_amount = couponValueFlat;
      const percentage_amount = couponValuePerchantage;
      const usage_limit = usesLimit;
      const valid_from = couponStart;
      const valid_to = couponEnd;
      const coupon_type = couponType;
      const promotion_id = campaing;
      const addData = {
        code,
        flat_amount,
        usage_limit,
        valid_from,
        valid_to,
        coupon_type,
        percentage_amount,
        promotion_id,
      };

      const response = await fetch(
        `https://darktechteam.com/api/coupons/create`,
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
          title: "Coupon Created Successfully",
          showConfirmButton: true,
        });
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleStatus = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatus(e.target.value);
  };
  const updateOrderStatus = (orderID: number, status: string) => {
    if (status !== "") {
      const apiUrl = `https://darktechteam.com/api/orders/update-order/${orderID}`;
      axios
        .put(apiUrl, {
          order_status: status,
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
          setRefetch(false);
        });
      // navigate(`/product/category`);
    }
  };
  const updateStatus = async (e: any, orderID: number) => {
    const status = e.target.value;
    let result = null;
    try {
      const title = `Are you want to change status? 
      `;
      result = await Swal.fire({
        title: title,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "red",
        confirmButtonColor: "#0096FF",
        confirmButtonText: "YES, CHANGE STATUS!",
        cancelButtonText: "NO, CANCEL",
      });

      if (result && result.isConfirmed) {
        updateOrderStatus(orderID, status);
        Swal.fire({
          title: "Status updated successfully",
          icon: "success",
        });
      } else if (result && result.dismiss) {
        Swal.fire("Cancelled", "", "error");
      }
    } catch (error) {
      Swal.fire("Error occurred while changing status", "", "error");
    }
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
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState(tday);
  const handleValueChange = (newValue: any) => {
    if (newValue.startDate !== undefined) {
      setStartDate(newValue.startDate ? newValue.startDate : "2020-01-01");
    }
    if (newValue.endDate !== undefined) {
      setEndDate(newValue.endDate ? newValue.endDate : tday);
    }

    // If you also want to update the combined 'value' state:
    setValue({
      startDate:
        newValue.startDate !== undefined ? newValue.startDate : value.startDate,
      endDate:
        newValue.endDate !== undefined ? newValue.endDate : value.endDate,
    });
  };
  React.useEffect(() => {
    const getAllCoupons = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/coupons/all-coupons`
      );
      const data = await response.json();
      setMeta(data?.result);
      setAllCoupons(data?.result);
      setRefetch(false);
    };
    getAllCoupons();
    // }
  }, [refetch]);
  const handleCouponType = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCoupontype(e.target.value);
  };
  const handleCouponRemove = (id: number) => {
    Swal.fire({
      title: "Do you want delete this Coupon?",
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
  const handleCampaigns = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCampaigns(String(e?.target?.value));
  };

  return (
    <div>
      <h1 className="text-3xl mb-5 font-bold text-natural-900 uppercase">
        GENERATE COUPON
      </h1>
      <div className="shadow-lg rounded-lg lg:w-full max-w-full">
        <form className="bg-white dark:bg-gray-800 p-5">
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="">
              <div className=" text-md text-natural-900 font-semibold mb-2">
                Select Coupon Type
              </div>
              <select
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-md w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleCouponType}
              >
                <option value={"flat_amount"}>Flat Amount</option>
                <option value={"percentage_amount"}>Percentage Amount</option>
              </select>
            </div>
            <div className="w-full">
              <div className=" text-md text-natural-900 font-semibold mb-2">
                Select Campaign
              </div>
              <select
                className="select p-3 dark:bg-gray-800 border dark:border-gray-500 rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleCampaigns}
              >
                {allCampaigns?.map((camp: any, i) => (
                  <option key={i} value={camp?.promotion_id}>
                    {camp?.promotion_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Coupon Code
              </label>
              <Input
                placeholder="Enter Coupon Code"
                className="w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setCouponCode(e.target.value);
                }}
              />
            </div>
            {couponType === "percentage_amount" && (
              <div className="">
                <label className="block text-natural-900 text-md font-semibold mb-2">
                  Coupon Value
                </label>

                <Input
                  placeholder="Enter Percentage Coupon Value"
                  className="w-full"
                  type="number"
                  onChange={(e) => {
                    e.preventDefault();
                    setCouponvaluePerchantage(e.target.value);
                  }}
                />
              </div>
            )}

            {couponType === "flat_amount" && (
              <div className="">
                <label className="block text-natural-700 text-md font-semibold mb-2">
                  Coupon Value
                </label>
                <Input
                  placeholder="Enter Flat Coupon Value"
                  className="w-full"
                  onChange={(e) => {
                    e.preventDefault();
                    setCouponvalueFlat(e.target.value);
                  }}
                />
              </div>
            )}
            <div className="mb-2">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Enter Usage limit
              </label>

              <Input
                placeholder="Enter Usage limit"
                className="w-full"
                type="number"
                onChange={(e) => {
                  e.preventDefault();
                  setUsesLimit(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-1">
            <div>
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Coupon Start
              </label>

              <Input
                className="w-full"
                type="date"
                onChange={(e) => {
                  e.preventDefault();
                  setCoupoStartDate(e.target.value);
                }}
              />
            </div>
            <div className="">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Coupon End
              </label>

              <Input
                className="w-full"
                type="date"
                onChange={(e) => {
                  e.preventDefault();
                  setCoupoEndDate(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex justify-center text-center items-center my-4">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateCoupon();
              }}
            >
              CREATE COUPON
            </Button>
          </div>
        </form>
      </div>

      <div className="shadow-lg p-5 my-5 grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="flex items-center justify-center border rounded-lg dark:border-gray-500 ">
          <Datepicker
            value={value}
            onChange={handleValueChange}
            showShortcuts={true}
            configs={{
              shortcuts: {
                today: "Today",
                yesterday: "Yesterday",
                past: (period) => `Last ${period} days`,
                currentMonth: `This month`,
                pastMonth: `Last month`,
                last90Days: {
                  text: "Last 90 days",
                  period: {
                    start: new Date(
                      new Date().setDate(new Date().getDate() - 90)
                    ),
                    end: tday.toString(),
                  },
                },
                last180Days: {
                  text: "Last 180 days",
                  period: {
                    start: new Date(
                      new Date().setDate(new Date().getDate() - 180)
                    ),
                    end: tday.toString(),
                  },
                },
                allTimes: {
                  text: "All Times",
                  period: {
                    start: "2020-01-01",
                    end: tday.toString(),
                  },
                },
              },
            }}
          />
        </div>
        <div>
          <select
            className="p-4 select dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-md w-full text-natural-900"
            onChange={handleStatus}
          >
            <option>Select Status</option>
            <option value="0">Pending</option>
            <option value="1">Confirmd</option>
            <option value="2">On the way</option>
            <option value="3">Delivered</option>
            <option value="4">Cancel</option>
          </select>
        </div>
          <div className="relative w-full rounded-lg">
            <label className="sr-only">Search</label>
            <input
              type="text"
              name="table-with-pagination-search"
              id="table-with-pagination-search"
              className="form-input p-4 ps-11 w-full focus:w-full placeholder:text-natural-900 bg-white dark:bg-gray-800 border dark:border-gray-500 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID"
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

      <div className="my-5">
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
                        COUPON CODE
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        COUPON VALUE
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        STATUS
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
                        VALID FROM
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        VALID TO
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        USED BY
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
                    {allCoupons?.length > 0 &&
                      allCoupons?.map((coupons: any, id: number) => {
                        return (
                          <tr
                            key={id}
                            className="border-b-2 border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800"
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
                              {coupons?.code}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              $
                              {coupons?.flat_amount
                                ? coupons?.flat_amount
                                : coupons?.percentage_amount}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {coupons?.coupon_closed == "0"
                                ? "unused"
                                : "used"}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {coupons?.promotion_name}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {coupons?.valid_from}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {coupons?.valid_to}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              MAYIN
                            </td>
                            <td className="px-6 justify-center flex py-4 text-[30px] text-indigo-400">
                              <FaEdit
                                onClick={() =>
                                  handleCouponEdit(coupons?.coupon_code_id)
                                }
                              />
                              <AiOutlineDelete
                                className="text-[30px] ml-8 text-red-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCouponRemove(coupons?.coupon_code_id);
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

export default GenerateCoupon;
