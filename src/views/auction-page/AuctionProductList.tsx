// import React, { useRef, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineDelete } from "react-icons/ai";
// import axios from "axios";
// import Swal from "sweetalert2";

const AuctionProductList = () => {
//   const [page, setPage] = useState(1); // default page is 1 //
//   const [perPage, setPerPage] = useState(10);
//   const tableRef = useRef(null);

//   type Binstore = {
//     bin_id: number;
//     product_name: string;
//     created_at: string;
//     updated_at: string;
//     feature_date: string;
//     weekday: string;
//     flat_rate: string;
//     bin_status: string;
//     product_image: string;
//     category_name: string;
//   };

//   const formatAsMMDDYYYYy = (dateString: string | number | Date) => {
//     const dateObj = new Date(dateString);
//     const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
//     const day = String(dateObj.getDate()).padStart(2, "0"); // Add leading zero if needed
//     const year = dateObj.getFullYear();
//     return `${year}-${month}-${day}`;
//   };
//   const [binStore, setBinstore] = useState<Array<Binstore>>([]);
//   const [refetch, setRefetch] = useState(false);
//   const navigate = useNavigate();

//   const handleCreatePage = () => {
//     navigate("/bin-store/upload-new-products");
//   };
  // console.log(binStore)
//   React.useEffect(() => {
//     // if (refetch) {
//     const getAllBinStore = async () => {
//       const response = await fetch(
//         `https://darktechteam.com/api/bin-store/bin-items`
//       );
//       const data = await response.json();
//       setBinstore(data?.result);
//       setRefetch(false);
//     };
//     getAllBinStore();
//   }, [refetch]);

//   const handleRemove = (id: number) => {
//     Swal.fire({
//       title: "Do you want delete the product?",
//       // text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       cancelButtonColor: "red",
//       confirmButtonText: "Yes,delete it!",
//       cancelButtonText: "No,cancel!",
//     }).then((result) => {
//       {
//         if (result.isConfirmed) {
//           const apiUrl = `https://darktechteam.com/api/bin-store/remove-item/${id}`;
//           axios.delete(apiUrl).then((response) => {
//             console.log("DELETE request successful");
//             console.log("Response:", response.data);
//             alert("Product Deleted successfully");
//           });
//           setRefetch(true);
//         } else if (result.dismiss) {
//           Swal.fire("Cancelled", "", "error");
//         }
//       }
//     });
//   };

//   const handleEditBin = (id: number) => {
//     navigate(`/bin-store/product/edit/${id}`);
//   };

  return (
    <div className="">
      <div className="">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        //   onClick={handleCreatePage}
        >
          CREATE Auction Product
        </button>
      </div>
      <div className="text-2xl text-natural-900 font-semibold my-3">
        All Auction Products
      </div>
      <div className="py-5">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div className="min-w-full overflow-hidden">
                <table
                //   ref={tableRef}
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
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        PRODUCT NAME
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
                        FEATURE DATE
                      </th>
                      <th
                        scope="col"
                        className="px-2  py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        WEEKDAY
                      </th>
                      <th
                        scope="col"
                        className="px-2  py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        FLAT RATE
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
                  {/* <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {binStore?.length > 0 ? (
                      (binStore || [])?.map((binData, index: number) => {
                        return (
                          <tr key={index}>
                            <td className=" px-2 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {index + 1}
                            </td>
                            <td className=" px-2 justify-center  py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              <img
                                className="ml-4 w-16 h-12 rounded"
                                src={`https://darktechteam.com/api/${binData?.product_image}`}
                                alt=""
                              />
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {binData?.product_name}
                            </td>
                            <td className="text-center px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {binData?.category_name}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {formatAsMMDDYYYYy(binData?.feature_date)}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {binData?.weekday}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {binData?.flat_rate}
                            </td>
                            <td className=" px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {binData?.bin_status}
                            </td>

                            <td className="px-2 mt-2 text-end flex py-3  text-[30px] text-indigo-400">
                              <FaEdit
                                onClick={() => handleEditBin(binData?.bin_id)}
                              />
                              <AiOutlineDelete
                                className="mt-0 text-[30px] ml-6 text-red-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemove(binData?.bin_id);
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
                  </tbody> */}
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
                    //   value={perPage}
                    value={10}

                    //   onChange={(e) => setPerPage(parseInt(e.target.value))}
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
                    className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md"
                    // disabled={page === 1}
                    // onClick={() => setPage(page - 1)}
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                  {"page number"}
                  <button
                    className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md"
                    // onClick={() => setPage(page + 1)}
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

export default AuctionProductList;
