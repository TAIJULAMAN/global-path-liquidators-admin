import React from "react";
import { Button, Input } from "@/components/ui";

const GenerateCoupon = () => {
  return (
    <div>
      {/* <!-- form --> */}
      <div className=" mx-auto">
        <h1 className=" text-3xl font-bold mb-5 text-natural-900 uppercase">
          Generate Coupon
        </h1>
        {/* form part */}
        <div className="shadow-lg rounded-lg px-5 py-2  lg:w-full max-w-full">
          <div className="mb-2 text-md text-natural-900 font-semibold dark:text-white">
            Coupon Code
          </div>
          <Input className="mb-4" />

          <div className="mb-2 text-md text-natural-900 font-semibold dark:text-white">
            Coupon Value
          </div>
          <Input className="mb-4" />

          <div className="flex text-center items-center justify-center my-4">
            <Button variant="solid" type="submit">
              Submit
            </Button>
          </div>
        </div>

        {/* table part */}

        <div className="inline-block min-w-full overflow-hidden my-5">
          <table className="min-w-full border rounded-lg">
            <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
              <tr>
                {/* 1 */}
                <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                  Coupon Code
                </th>
                {/* 2 */}
                <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                  Coupon Value
                </th>
                {/* 3 */}
                <th className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
                  Status
                </th>
                {/* 4 */}
                <th className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
                  Created On
                </th>

                {/* 5 */}
                <th className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
                  Used By
                </th>
                {/* 6 */}
                <th className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="item-center text-center justify-between">
                {/* 1 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800"> P5NX6T</div>
                </td>
                {/* 2 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800"> $50.00</div>
                </td>
                {/* 3 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800"> Unused</div>
                </td>
                {/* 4 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800">
                    {" "}
                    Jul 05 2023
                  </div>
                </td>
                {/* 5 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800">
                    {" "}
                    Cody Green
                  </div>
                </td>
                {/* 6 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <button className="px-5 py-2 bg-red-500 text-white rounded  hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="item-center text-center justify-between">
                {/* 1 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800"> P5NX6T</div>
                </td>
                {/* 2 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800"> $50.00</div>
                </td>
                {/* 3 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800"> Unused</div>
                </td>
                {/* 4 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800">
                    {" "}
                    Jul 05 2023
                  </div>
                </td>
                {/* 5 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800">
                    {" "}
                    Cody Green
                  </div>
                </td>
                {/* 6 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <button className="px-5 py-2 bg-red-500 text-white rounded  hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="item-center text-center justify-between">
                {/* 1 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800"> P5NX6T</div>
                </td>
                {/* 2 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800"> $50.00</div>
                </td>
                {/* 3 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800"> Unused</div>
                </td>
                {/* 4 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800">
                    {" "}
                    Jul 05 2023
                  </div>
                </td>
                {/* 5 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <div className="text-sm leading-5 text-gray-800">
                    {" "}
                    Cody Green
                  </div>
                </td>
                {/* 6 */}
                <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                  <button className="px-5 py-2 bg-red-500 text-white rounded  hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GenerateCoupon;
