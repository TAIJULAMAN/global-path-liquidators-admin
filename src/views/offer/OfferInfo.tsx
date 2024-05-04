import axios from "axios";
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
import { Button } from "@/components/ui";
import { HiOutlinePlus } from "react-icons/hi";
import Datepicker from "react-tailwindcss-datepicker";

const OfferInfo = () => {
  type Product = {
    manifest_url: string;
    total_amount: string;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allOffers, setAllOffers] = useState<Array<Product>>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState("");

  // console.log(status);

  const [page, setPage] = useState(1); // default page is 1 //
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [perPage, setPerPage] = useState(10);
  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const metaPage: any = meta?.pages;
  const totalProducts: any = meta?.totalProducts;
  const totalOrderAmount: any = meta?.totalOrderAmount;

  // console.log(meta);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tableRef = useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [refetch, setRefetch] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const navigate = useNavigate();
  const handleViewOrderDetails = (id: number) => {
    navigate(`/order-list/details/${id}`);
  };

  const [searchQuery, setSearchQuery] = useState("");
  // Filter data based on the search query
  // Filter data based on the search query
  const filteredResults = allOffers?.filter((item: any) =>
    (item?.offer_id?.toString().toLowerCase() ?? "").includes(
      searchQuery.toLowerCase()
    )
  );

  const handleStatus = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatus(e.target.value);
  };

  // console.log(status);

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
          setRefetch(true);

          // Refetch data here
          // Example: fetchData();
        })
        .catch((error) => {
          // Handle errors
          console.error("Error occurred while updating order status", error);
        });
    }
  };

  const updateStatus = async (e: any, orderID: number) => {
    const status = e.target.value;
    let result = null;

    try {
      const title = `Are you want to change status?`;
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
        location.reload();
      } else if (result && result.dismiss) {
        Swal.fire("Cancelled", "", "error");
      }
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
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
  // console.log(sevenDaysAgoDate);
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState(tday);

  // console.log(startDate, endDate);

  const handleValueChange = (newValue: any) => {
    // Assuming newValue is an object with startDate and endDate properties
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
    const getAllOffers = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/offers/getOffers?page=${page}&limit=${perPage}&order_date_from=${startDate}&order_date_to=${endDate}$order_status=${status}`
      );
      const data = await response.json();
      setMeta(data?.result);
      setAllOffers(data?.result);
      setRefetch(true);
    };
    getAllOffers();
    // }
  }, [refetch, page, perPage, startDate, endDate, status]);

  // Calculate total sum of prices
  const totalPrice = allOffers?.reduce(
    (total, item) =>
      total + (typeof item?.total_amount === "number" ? item?.total_amount : 0),
    0
  );

  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-1">
        <div className="card bg-[#039BE5] text-white flex  p-7">
          <h6 className="text-white">Total Offer</h6>
          <h3 className="ml-3  text-white font-bold">#{allOffers?.length}</h3>
        </div>
        <div className="card bg-[#304FFE] text-white flex  p-7">
          <h6 className="text-white">Total Confirmed</h6>
          <h3 className="ml-10  text-white font-bold">0</h3>
        </div>

        <div className="card bg-[#26A69A] text-white flex  p-7">
          <h6 className="text-white">Complete Offer</h6>
          <h3 className="ml-5  text-white font-bold">0</h3>
        </div>
      </div>
      <div className="text-3xl text-natural-900 font-bold my-5 uppercase">
        ALL OFFER LIST
      </div>
      <div className="justify-between grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="flex  items-center justify-center">
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
            className="select p-4 dark:bg-gray-800 border rounded-lg text-sm w-full text-black"
            onChange={handleStatus}
          >
            <option>Select Status</option>
            <option value="0">Pending</option>
            <option value="1">Confirmd</option>
            <option value="2">On the way</option>
            <option value="3">Delivered</option>
            <option value="4">Cancel</option>
            {/* {allConditions?.map((conditon: any, i) => (
              <option key={i} value={conditon?.condition_name}>
                {conditon?.condition_name}
              </option>
            ))} */}
          </select>
        </div>
        <div>
          <div className="w-full  bg-white relative border rounded-lg">
            <label className="sr-only">Search</label>

            <input
              type="text"
              name="table-with-pagination-search"
              id="table-with-pagination-search"
              className="form-input p-4 ps-11 focus:w-full placeholder:text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by offer ID"
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
                        OFFER AMOUNT
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
                        IMAGE
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        USER PHONE
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        USER NAME
                      </th>
                      {/* <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        DEAL TYPE
                      </th> */}
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        OFFER STATUS
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
                      filteredResults?.map((offer: any, id: number) => {
                        return (
                          <tr
                            key={id}
                            className="border-b-2 border-gray-300 bg-white dark:bg-gray-800"
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
                              {offer?.offer_amount}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {offer?.product_name}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              <img
                                className="ml-4 w-16 h-12 rounded"
                                src={`https://darktechteam.com/api/${offer?.product_image}`}
                                alt=""
                              />
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {offer?.phone_number}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {offer?.first_name} {offer?.last_name}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              <span className="bg-[#BBDEFB] p-2 px-3 rounded">
                                {offer?.offer_status}
                              </span>
                            </td>{" "}
                            {/* <td className="flex ml-4 text-center px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {product?.deal_type_name}
                            </td> */}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {/* <div>
                                <select
                                  className={`form-input text-white p-2 border shadow text-sm border-[#E3F2FD] mt-0 w-full ${
                                    product?.order_status === 0
                                      ? "bg-[#FFAB00]"
                                      : product?.order_status === 1
                                        ? "bg-[#689F38]"
                                        : product?.order_status === 2
                                          ? "bg-[#03A9F4]"
                                          : product?.order_status === 3
                                            ? "bg-[#6200EA]"
                                            : product?.order_status === 4
                                              ? "bg-[#DD2C00]"
                                              : ""
                                  }`}
                                  value={product?.order_status}
                                  onChange={(e: any) =>
                                    updateStatus(e, product?.order_id)
                                  }
                                >
                                  <option
                                    value="0"
                                    selected={product?.order_status === 0}
                                  >
                                    Pending
                                  </option>
                                  <option
                                    value="1"
                                    selected={product?.order_status === 1}
                                  >
                                    Confirmed
                                  </option>
                                  <option
                                    value="2"
                                    selected={product?.order_status === 2}
                                  >
                                    On the way
                                  </option>
                                  <option
                                    value="3"
                                    selected={product?.order_status === 3}
                                  >
                                    Delivered
                                  </option>
                                  <option
                                    value="4"
                                    selected={product?.order_status === 4}
                                  >
                                    Cancel
                                  </option>
                                </select>
                              </div> */}
                            </td>
                            {/* <Link to='/order-list/details/${id}` > */}
                            {/* <td className="px-2 mt-2 text-end  py-3  text-[30px] text-indigo-400">
                              <GrFormView
                                className="text-center ml-6"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (product?.order_id)
                                    handleViewOrderDetails(product?.order_id);
                                }}
                              />
                            </td> */}
                            {/* </Link> */}
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

export default OfferInfo;
