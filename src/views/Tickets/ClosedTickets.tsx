import React from "react";
// import TicketNote from "./TicketNote"; 
import ReferalProgram from "../promotions/ReferalProgram";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

const ClosedTickets = () => {
  return (
    <section className="overflow-x-auto p-5">
    <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-3xl mb-5 font-bold text-natural-900 uppercase">
          {" "}
          close Ticket
        </h1>
    </div>
    {/* heading */}
    <div className="mt-6 md:flex md:items-center md:justify-between">
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
      <div className="relative flex items-center mt-4 md:mt-0">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search"
          className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
    </div>
    {/* table part*/}
    <section className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
     
      {/* table part*/}
      <div className="inline-block min-w-full overflow-hidden px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full border rounded-lg dark:border-gray-700">
          <thead className="bg-[#42A5F5] text-white dark:bg-gray-700 ">
            <tr>
              {/* 1 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider">
              Ticket No	
              </th>
              {/* 2 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
                Open Date
              </th>
              {/* 3 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
              Order Id	
              </th>
              {/* 4 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
              Client	
              </th>
              {/* 5 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
              Issue type	
              </th>
              {/* 6 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
              Supporting Documents	
              </th>
              {/* 7 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
              Description
              </th>
              {/* 8 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">
              Solution	
              </th>
              {/* 9 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4  tracking-wider">
              Status	
              </th>

              {/* 10 */}
              <th className="px-6 py-3 border-b-2 border-gray-300 ">
              Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              {/* 1 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <div className="flex items-center">
                    <div className="text-sm leading-5">  6</div>
                </div>
              </td>
              {/* 2 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <div className="text-sm leading-5">02/02/2024</div>
              </td>
              {/* 3 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              1234
              </td>
              {/* 4 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              Shah Aman
              </td>
              {/* 5 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              shipment
              </td>
              {/* 6 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              NID
              </td>
              {/* 7 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              Product Description
              </td>
              {/* 8 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              talked to customer
              </td>
              {/* 9 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              Open
              </td>
              {/* 10 */}
              <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-300 text-sm leading-5">
                <Link to={`/tickets-open/details/${"2"}`}>
                  <Button variant="solid" type="submit" className="mb-5">
                   SUBMIT
                  </Button>
                </Link>
              </td>
            </tr>
            <tr>
              {/* 1 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <div className="flex items-center">
                    <div className="text-sm leading-5">  6</div>
                </div>
              </td>
              {/* 2 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <div className="text-sm leading-5">02/02/2024</div>
              </td>
              {/* 3 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              1234
              </td>
              {/* 4 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              Shah Aman
              </td>
              {/* 5 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              shipment
              </td>
              {/* 6 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              NID
              </td>
              {/* 7 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              Product Description
              </td>
              {/* 8 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              talked to customer
              </td>
              {/* 9 */}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
              Open
              </td>
              {/* 10 */}
              <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-300 text-sm leading-5">
                <Link to={`/tickets-open/details/${"2"}`}>
                  <Button variant="solid" type="submit" className="mb-5">
                   SUBMIT
                  </Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
     
    </section>
    {/* bottom part */}
    <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {/* <div> */}
        <p className="text-sm leading-5 text-blue-700">
          Showing
          <span className="font-medium px-2">1</span>
          to
          <span className="font-medium px-2">3</span>
          of
          <span className="font-medium px-2">3</span>
          results
        </p>
        {/* </div> */}
      </div>
      <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
        <a
          href="#"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span>previous</span>
        </a>
        <p className="bg-blue-800 text-white px-4 py-2 rounded">1</p>
        <a
          href="#"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <span>Next</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
  );
};

export default ClosedTickets;
