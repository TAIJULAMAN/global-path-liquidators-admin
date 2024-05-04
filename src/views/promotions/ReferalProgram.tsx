import { Button, Input } from "@/components/ui";
import React from "react";

const ReferalProgram = () => {
  return (
    <div>
      {/* <!-- form --> */}
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-5 text-natural-900 uppercase">Referral Program</h1>
       {/* form part */}
        <div className="shadow-lg rounded-lg px-5 py-2  lg:w-full max-w-full">
          <div className="mb-2 text-md text-natural-900 font-semibold dark:text-white">
            Referral Bonus
          </div>
          <Input className="mb-4" />

          <div className="mb-2 text-md text-natural-900 font-semibold dark:text-white">
            Total Payout
          </div>
          <Input className="mb-4" />

          <div className="mb-2 text-md text-natural-900 font-semibold dark:text-white">
            Confirm password
          </div>
          <Input className="mb-4" />

         <div className="flex justify-center my-5">
         <Button variant="solid" type="submit" className="mb-5">
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
              <th  className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
              Referral #	
              </th>
              {/* 2 */}
              <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
              Referee	
              </th>
              {/* 3 */}
              <th  className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
              Last Seen Online	
              </th>
              {/* 4 */}
              <th  className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
              Referrer	
              </th>
             
              {/* 5 */}
              <th  className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
              Total Payout	
              </th>
              {/* 6 */}
              <th  className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
              Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="item-center text-center justify-between">
              {/* 1 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      1
                    </div>
              </td>
              {/* 2 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      referee
                    </div>
              </td>
              {/* 3 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      12:30 PM
                    </div>
              </td>
              {/* 4 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                     aman
                    </div>
              </td>
              {/* 5 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                     $1234
                    </div>
              </td>
              {/* 6 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                   note desc
                    </div>
              </td>
             
            </tr>
            <tr className="item-center text-center justify-between">
              {/* 1 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      1
                    </div>
              </td>
              {/* 2 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      referee
                    </div>
              </td>
              {/* 3 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      12:30 PM
                    </div>
              </td>
              {/* 4 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                     aman
                    </div>
              </td>
              {/* 5 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                     $1234
                    </div>
              </td>
              {/* 6 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                   note desc
                    </div>
              </td>
             
            </tr>
            <tr className="item-center text-center justify-between">
              {/* 1 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      1
                    </div>
              </td>
              {/* 2 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      referee
                    </div>
              </td>
              {/* 3 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      12:30 PM
                    </div>
              </td>
              {/* 4 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                     aman
                    </div>
              </td>
              {/* 5 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                     $1234
                    </div>
              </td>
              {/* 6 */}
              <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                   note desc
                    </div>
              </td>
             
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default ReferalProgram;
