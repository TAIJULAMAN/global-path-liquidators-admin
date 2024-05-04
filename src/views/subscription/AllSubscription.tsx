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
import { AnyModels } from "miragejs/-types";

const AllSubscription = () => {
  type Product = {
    manifest_url: string;
    total_amount: string;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allSubscriber, setAllSubscriber] = useState<Array<Product>>([]);
  console.log(allSubscriber);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState("");
  const [deal, setDeal] = useState("");

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
  const handleSubscriptionEdit = (id: number) => {
    navigate(`/edit-subscription/${id}`);
  };

  const formatAsMMDDYYYYy = (dateString: string | number | Date) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [searchQuery, setSearchQuery] = useState("");
  // Filter data based on the search query
  // Filter data based on the search query
  const filteredResults = allSubscriber?.filter((item: any) =>
    (item?.subscriber_id?.toString().toLowerCase() ?? "").includes(
      searchQuery.toLowerCase()
    )
  );

  const handleStatus = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatus(e.target.value);
  };
  const handleDeal = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDeal(e.target.value);
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
    const getAllSubscriber = async () => {
      const url = `https://darktechteam.com/api/subscription/subscribers?page=${page}&limit=${perPage}&order_date_from=${startDate}&order_date_to=${endDate}&order_status=${status}${deal ? `&deal_type_id=${deal}` : ""}`;
      const response = await fetch(url);
      const data = await response.json();
      setMeta(data?.result);
      setAllSubscriber(data?.result);
      setRefetch(true);
    };
    getAllSubscriber();
    // }
  }, [refetch, page, perPage, startDate, endDate, status, deal]);

  // Calculate total sum of prices
  const totalPrice = allSubscriber?.reduce(
    (total, item) =>
      total + (typeof item?.total_amount === "number" ? item?.total_amount : 0),
    0
  );

  const handleRemove = (email: AnyModels) => {
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
          const apiUrl = `https://darktechteam.com/api/subscription/subscribers/${email}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Condition Deleted successfully");
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
      <div className=" grid grid-cols-1 md:grid-cols-5 gap-1">
        <div className="card bg-[#039BE5] text-white flex  p-7">
          <h6 className="text-white">Total Subscriber</h6>
          <h3 className="ml-3  text-white font-bold">
            #{allSubscriber?.length}
          </h3>
        </div>
        <div className="card bg-[#304FFE] text-white flex  p-7">
          <h6 className="text-white">Total Order</h6>
          <h3 className="ml-10  text-white font-bold">{totalProducts}</h3>
        </div>

        <div className="card bg-[#26A69A] text-white flex  p-7">
          <h6 className="text-white">Complete Order</h6>
          <h3 className="ml-5  text-white font-bold">0</h3>
        </div>

        <div className="card bg-[#9575CD] text-white flex  p-7">
          <h6 className="text-white">Processing</h6>
          <h3 className="ml-7  text-white font-bold">0</h3>
        </div>
        <div className="card bg-[#00BCD4] text-white flex  p-7">
          <h6 className="text-white">Deliverd</h6>
          <h3 className="ml-7  text-white font-bold">0</h3>
        </div>
      </div>
      <div className="text-3xl text-natural-900 font-bold my-5 uppercase">
        ALL SUSCRIBER LIST
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
            <option value={0}>Pending</option>
            <option value={1}>Confirmd</option>
            <option value={2}>On the way</option>
            <option value={3}>Delivered</option>
            <option value={4}>Cancel</option>
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
              placeholder="Search by Subscription ID"
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
                        SUBSCRIBER ID
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        EMAIL
                      </th>
                      <th
                        scope="col"
                        className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      >
                        USER ID
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
                        DATE
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
                      filteredResults?.map((subscribe: any, id: number) => {
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
                              {subscribe?.subscriber_id}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {subscribe?.email}
                            </td>{" "}
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {subscribe?.user_id}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {subscribe?.status}
                            </td>
                            <td
                              scope="row"
                              className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                            >
                              {formatAsMMDDYYYYy(subscribe?.created_at)}
                            </td>
                            <td className="border-gray-300 border-b-2 px-6 justify-center flex py-4 text-[30px] text-indigo-400">
                              <FaEdit
                                onClick={() =>
                                  handleSubscriptionEdit(subscribe?.user_id)
                                }
                              />
                              <AiOutlineDelete
                                className="text-[30px] ml-8 text-red-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemove(subscribe?.email);
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

export default AllSubscription;
