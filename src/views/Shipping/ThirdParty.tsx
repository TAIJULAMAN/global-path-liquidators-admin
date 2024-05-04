import React from 'react';
import { Link } from 'react-router-dom';

const ThirdParty = () => {
    return (
        <section className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
              {/* table part*/}
              <div className="align-middle inline-block min-w-full overflow-hidden bg-white">
                <table className="min-w-full border rounded-lg border-gray-300">
                  <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
                    <tr>
                      {/* 1 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider">
                        Order Id
                      </th>
                      {/* 2 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Open Date
                      </th>
                      {/* 3 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Seller
                      </th>
                      {/* 4 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Deal Name
                      </th>
                      {/* 5 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Deal Model
                      </th>
                      {/* 6 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Weight
                      </th>
                      {/* 7 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Price
                      </th>
                      {/* 8 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Commission
                      </th>
                      {/* 9 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                        Count
                      </th>

                      {/* 10 */}
                      <th className="px-6 py-3 border-b-2 border-gray-300">
                        # of B.B
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      {/* 1 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5 text-gray-800">
                              {" "}
                              1082
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* 2 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div className="text-sm leading-5">
                          2023-01-29
                        </div>
                      </td>
                      {/* 3 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        Cody Green
                      </td>
                      {/* 4 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        PlayStation 5
                      </td>
                      {/* 5 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        PS5 Digital Bundle
                      </td>
                      {/* 6 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        05
                      </td>
                      {/* 7 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $486.0
                      </td>
                      {/* 8 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $60.00
                      </td>
                      {/* 9 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        1
                      </td>
                      {/* 10 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        1
                      </td>
                    
                    
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* bottom part */}
              <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
              <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <label
                      htmlFor="table-pagination-limit"
                      className="text-sm text-gray-700 dark:text-gray-200"
                    >
                      Show
                    </label>
                    <p className="px-2">10</p>
                    <label
                      htmlFor="table-pagination-limit"
                      className="text-sm text-gray-700 dark:text-gray-200"
                    >
                      Entries
                    </label>
                  </div>
                </div>
                 <nav className="flex items-center justify-end space-x-2">
                  <button
                    className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
                    // disabled={metaPage === 1}
                    // onClick={(e) => setPage(page - 1)}
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                  {/* {metaPage} */}1
                  <button
                    className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
                    // onClick={() => setPage(page + 1)}
                  >
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </button>
                </nav>
              </div>
            </section>
    );
};

export default ThirdParty;