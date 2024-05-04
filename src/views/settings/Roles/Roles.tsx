import React from "react";

const Roles = () => {
  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-3xl font-bold mb-5 uppercase text-natural-900">
        Set Role Wise Permission
      </h1>
      <table className="w-full text-left text-black dark:text-white  border rounded-lg">
        <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
          <tr className="text-center uppercase ">
            <th scope="col" className="px-6 py-3">
              Page/Feature
            </th>
            <th scope="col" className="px-6 py-3">
              Super Admin
            </th>
            <th scope="col" className="px-6 py-3">
              Admin
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm">
        <tr className="border-b-2 border-gray-300 text-black">
            <td scope="row" className="px-6 py-4 text-center">
              Dashboard
            </td>
            <td className="px-6 py-4 flex justify-center items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="flex">
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </div>
              </label>
            </td>
            <td className="px-6 py-4">
                <table className="w-full text-sm text-left text-black dark:text-white">
                  <thead className="text-xs text-black uppercase  border border-gray-300 dark:text-white dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 ">
                        Page/Feature
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Super Admin
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr className="border border-gray-300">
                      <td className="px-3 py-2 flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="px-3 py-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </td>
          </tr>
        
        </tbody>
      </table>
    </div>
  );
};

export default Roles;
