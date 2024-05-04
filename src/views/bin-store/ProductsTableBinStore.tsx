import React, { useRef, ChangeEvent, useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@/components/ui";
import { HiOutlinePlus } from "react-icons/hi";
const ProductsTableBinStore = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const tableRef = useRef(null);
  type Binstore = {
    bin_id: number;
    product_name: string;
    created_at: string;
    updated_at: string;
    feature_date: string;
    weekday: string;
    flat_rate: string;
    bin_status: string;
    product_image: string;
    category_name: string;
    metaPage: number;
  };
  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const metaPage: any = meta?.page;

  const formatAsMMDDYYYYy = (dateString: string | number | Date) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const [binStore, setBinstore] = useState<Array<Binstore>>([]);
  const [refetch, setRefetch] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [weekDay, setWeekDay] = useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    const getAllBinStore = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/bin-store/bin-items?${weekDay ? `weekday=${weekDay}` : ""}&page=${page}&limit=${perPage}`
      );
      const data = await response.json();
      setBinstore(data?.result);
      setMeta(data?.meta);
      setRefetch(false);
    };
    getAllBinStore();
  }, [refetch, page, perPage, weekDay]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredResults = binStore?.filter(
    (item: any) =>
      item?.product_name &&
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
          const apiUrl = `https://darktechteam.com/api/bin-store/remove-item/${id}`;
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
  const handleEditBin = (id: number) => {
    navigate(`/bin-store/product/edit/${id}`);
  };
  const handleWeekDay = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setWeekDay(e.target.value);
  };
  return (
    <div>
      <div className="mb-5">
        <Link to="/bin-store/upload-new-products">
          <Button variant="twoTone" icon={<HiOutlinePlus />}>
            <span>
              <span> CREATE BIN STORE PRODUCT</span>
            </span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <select
            className="select p-4 dark:bg-gray-800 border dark:border-gray-500 rounded-lg text-sm w-full text-natural-900"
            onChange={handleWeekDay}
          >
            <option>Select Day Type</option>
            <option value="">All Data</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </div>
        <div>
          <div className="relative border rounded-lg dark:border-gray-500">
            <label className="sr-only">Search</label>

            <input
              type="text"
              name="table-with-pagination-search"
              id="table-with-pagination-search"
              className="form-input p-4 ps-11 w-full focus:w-full placeholder:text-natural-900 dark:bg-gray-800 rounded-lg"
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
      </div>

      {/* table and header part */}
      <div className="text-3xl text-natural-900 font-bold my-5 uppercase">
        ALL BIN STORE PRODUCTS
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
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredResults?.length > 0 ? (
                      filteredResults?.map((binData, index: number) => {
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
                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
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
                  {/* {metaPage} */} 1
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

export default ProductsTableBinStore;
