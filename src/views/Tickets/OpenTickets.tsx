import React, { useRef, ChangeEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { GrFormView } from "react-icons/gr";

const OpenTickets = () => {
  const [page, setPage] = useState(1); // default page is 1 //
  const [perPage, setPerPage] = useState(10);
  const tableRef = useRef(null);

  type Tickets = {
    id: number;
    ticket_subject: string;
    phone_number: string;
    ticket_priority: string;
    bid_id: string;
    ticket_document: string;
    business_name: string;
    Description: string;
    bidStatus: string;
    product_image: string;
    category_name: string;
    ticket_id: number;
    manifest_status: string;
    created_at: string;
    metaPage: number;
    first_name: string;
    last_name: string;
    updated_at: string;
    ticket_status: string;
    totalbidPrice: string;
  };
  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const metaPage: any = meta?.page;

  const navigate = useNavigate();
  const handleViewBidDetails = (id: number) => {
    navigate(`/tickets-open/details/${id}`);
  };

  const formatAsMMDDYYYYy = (dateString: string | number | Date) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(dateObj.getDate()).padStart(2, "0"); // Add leading zero if needed
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const [allTickets, setTickets] = useState<Array<Tickets>>([]);

  // console.log(allTickets);

  // Calculate total sum of prices
  // const totalPrice = allTickets?.reduce(
  //   (total, item) =>
  //     total + (typeof item?.amount === "number" ? item?.amount : 0),
  //   0
  // );

  // console.log("Total Price:", totalPrice);

  const [refetch, setRefetch] = useState(false);
  const [visibility, setVisibility] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCreatePage = () => {
    navigate("/auction-product-create");
  };

  React.useEffect(() => {
    // if (refetch) {
    const getAllAuctionStore = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/tickets/all-tickets?page=${page}&limit=${perPage}`
      );
      const data = await response.json();
      // console.log(data);
      setTickets(data?.result);
      setMeta(data?.meta);
      setRefetch(false);
    };
    getAllAuctionStore();
  }, [refetch, page, perPage]);

  const closedTkt = allTickets?.reduce((acc, ticket) => {
    if (ticket?.ticket_status != "1") {
      return acc + 1;
    }
    return acc;
  }, 0);

  const handleRemove = (id: number) => {
    Swal.fire({
      title: "Do you want delete the ticket?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/tickets/remove-ticket/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Ticket Deleted successfully");
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

  const [searchQuery, setSearchQuery] = useState("");
  // Filter data based on the search query
  const filteredResults = allTickets?.filter((item: any) =>
    (item?.ticket_id?.toString().toLowerCase() ?? "").includes(
      searchQuery.toLowerCase()
    )
  );

  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="card bg-[#006064] text-white p-7 dark:bg-[#006064]">
          <h6 className="text-white">Answered Tickets</h6>
          <h2 className="mt-2 text-white font-bold">#{allTickets?.length}</h2>
        </div>
        <div className="card bg-[#26A69A] text-white  p-7 dark:bg-[#26A69A]">
          <h6 className="text-white">Open Tickets</h6>
          <h2 className="mt-2 text-white font-bold">#{allTickets?.length}</h2>
        </div>
        <div className="card bg-[#C62828] text-white p-7 dark:bg-[#C62828]">
          <h6 className="text-white">Closed Tickets</h6>
          <h2 className="mt-2  text-white font-bold">{closedTkt}</h2>
        </div>

        <div className="card bg-[#2979FF] text-white p-7 dark:bg-[#2979FF]">
          <h6 className="text-white">Total Tickets</h6>
          <h2 className="mt-2 text-white font-bold"> #{allTickets?.length}</h2>
        </div>
      </div>

      <div className="text-3xl text-natural-900 font-bold my-5 uppercase">
        TICKET & SUPPORTS
      </div>
      <div>
        <div className="relative rounded-lg">
          <label className="sr-only">Search</label>

          <input
            type="text"
            name="table-with-pagination-search"
            id="table-with-pagination-search"
            className="form-input p-4 ps-11 bg-white dark:bg-gray-800 border dark:border-gray-500 rounded-lg w-full focus:w-ful"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Ticket No."
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
      <div className="py-5">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-300 dark:border-gray-700 dark:divide-gray-700">
              <div className="min-w-full overflow-hidden">
                <table
                  ref={tableRef}
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-4  text-white py-3 text-center text-xs font-medium  uppercase"
                      >
                        SL NO
                      </th>
                      <th
                        scope="col"
                        className="px-4  text-white py-3 text-center text-xs font-medium  uppercase"
                      >
                        TICKET ID
                      </th>
                      <th
                        scope="col"
                        className="px-4  text-white py-3 text-center text-xs font-medium  uppercase"
                      >
                        ISSUE IMAGE
                      </th>
                      <th
                        scope="col"
                        className="px-4  text-white py-3 text-center text-xs font-medium  uppercase"
                      >
                        SUBJECT
                      </th>
                      <th
                        scope="col"
                        className="px-4  text-white py-3 text-center text-xs font-medium  uppercase"
                      >
                        USER
                      </th>
                      <th
                        scope="col"
                        className="px-4  text-white py-3 text-center text-xs font-medium  uppercase"
                      >
                        CREATED
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-xs font-medium text-white uppercase"
                      >
                        LAST UPDATED
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-xs font-medium text-white uppercase"
                      >
                        USER PRIORITY
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-center text-xs font-medium text-white uppercase"
                      >
                        STATUS
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3  text-xs font-medium text-white uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredResults?.length > 0 ? (
                      (filteredResults || [])?.map((tkt, index: number) => {
                        return (
                          <tr key={index}>
                            <td className=" px-1 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {index + 1}
                            </td>
                            <td className=" px-1 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {tkt?.ticket_id}
                            </td>
                            <td className=" px-1 text-end py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              <img
                                className="text-end ml-8 w-16 h-12 rounded"
                                src={`https://darktechteam.com/api/${tkt?.ticket_document}`}
                                alt=""
                              />
                            </td>
                            <td className=" px-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {tkt?.ticket_subject}
                            </td>
                            <td className=" px-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {tkt?.first_name} {tkt?.last_name}
                            </td>

                            <td className=" px-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {tkt?.created_at}
                            </td>
                            <td className=" px-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {tkt?.updated_at}
                            </td>
                            <td className=" px-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {/* {tkt?.ticket_priority == "high" && (
                                <span className="bg-[#00E5FF] p-2 px-4 rounded">
                                  {tkt?.ticket_priority}
                                </span>
                              )} */}
                              <span className="bg-[#00E5FF] p-2 px-4 rounded">
                                {tkt?.ticket_priority}
                              </span>
                            </td>
                            <td className=" px-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {tkt?.ticket_status == "1" ? (
                                <span className="bg-[#C5CAE9] p-2 px-2 rounded">
                                  User Waiting
                                </span>
                              ) : (
                                <span className="bg-red-500 text-white p-2 px-2 rounded">
                                  Closed
                                </span>
                              )}
                            </td>

                            <td className="border-gray-300 mt-2 px-6 justify-center flex py-4 text-[30px] text-indigo-400">
                              <FaEdit
                                onClick={() =>
                                  handleViewBidDetails(tkt?.ticket_id)
                                }
                              />
                              <AiOutlineDelete
                                className="text-[30px] ml-8 text-red-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemove(tkt?.ticket_id);
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
                      className="mx-2 form-select text-sm text-black"
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

export default OpenTickets;
