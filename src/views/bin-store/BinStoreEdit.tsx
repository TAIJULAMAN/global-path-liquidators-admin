import { Input } from '@/components/ui';
import React from 'react';

const BinStoreEdit = () => {
    return (
        <div className="py-3 px-5">
        <div>
          <div className="mt-5 text-2xl text-natural-900 font-semibold my-3">
            Edit Product
          </div>
          <form className="border rounded p-5 dark:border-gray-600">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Product Name
                </div>
                <Input
                  placeholder="Enter Product Name"
                />
              </div>
              <div>
                <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Category
                </div>
                <select
                  className="form-input p-3 border shadow text-sm border-[#E3F2FD] mt-0 w-full"
                >
               <option value="Apparel Product">Apparel Product</option>
                  <option value="Plastics">Plastics</option>
                </select>
              </div>
              <div>
                <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Source Store
                </div>
                <Input
                  placeholder="Enter Source Store"
                />
              </div>
              <div>
                <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Product Condition
                </div>
                <select
                  className="form-input p-3 border shadow text-sm border-[#E3F2FD] mt-0 w-full"
                >
                 <option value="Customer Returns">Customer Returns</option>
                  <option value="Master Case">Master Case</option>
                </select>
              </div>
              <div>
                <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Product Type
                </div>
                <select
                  className="form-input p-3 border shadow text-sm border-[#E3F2FD] mt-0 w-full"
                >
                  <option value="Manifasted">Manifasted</option>
                  <option value="Unmanifasted">Unmanifasted</option>
                </select>
              </div>
              <div>
                <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Enter Product Price
                </div>
                <Input
                  placeholder="Enter Product Price"
                />
              </div>
              <div>
                <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Product Image
                </div>
                <input
                  type="file"
                  className="w-full mt-3 py-2 px-4 border-0 border-b-2 shadow-sm flex-1 focus:outline-none"
                  placeholder="Enter Product image"
                  name="image"
                />
              </div>
              <div>
                <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                  Enter Offer
                </div>
                <Input
                  placeholder="Enter Offer"
                />
              </div>
            </div>
            <div className="mt-5 flex text-center items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                UPDATE PRODUCT
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default BinStoreEdit;