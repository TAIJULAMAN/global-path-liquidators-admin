import { Input } from "@/components/ui";
import Button from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import { Link } from "react-router-dom";
const { TabNav, TabList, TabContent } = Tabs;

const PickUp = () => {
  return (
    <Tabs defaultValue="tab2">
      <TabList>
        <TabNav value="tab1">Method Enable/Disable</TabNav>
        <TabNav value="tab2">Shipping(Buyer Label)</TabNav>
        <TabNav value="tab3">Shipping(Seller Label)</TabNav>
        <TabNav value="tab4">PickUp</TabNav>
        <TabNav value="tab5">Drop-Off</TabNav>
      </TabList>
      <div className="p-4">
        {/* 1 */}
        <TabContent value="tab1">
          <div className="inline-block min-w-full overflow-hidden ">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
                <tr>
                  {/* 1 */}
                  <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                    Method
                  </th>
                  {/* 2 */}
                  <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                    enable/disable
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="item-center text-center justify-between">
                  {/* 1 */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      Shipping (Buyer Label)
                    </div>
                  </td>
                  {/* 2 */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
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
                <tr className="item-center text-center justify-between">
                  {/* 1 */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      Shipping (Seller Label)
                    </div>
                  </td>
                  {/* 2 */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
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
                <tr className="item-center text-center justify-between">
                  {/* 1 */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      Pick-up
                    </div>
                  </td>
                  {/* 2 */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
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
                <tr className="item-center text-center justify-between">
                  {/* 1 */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                    <div className="text-sm leading-5 text-gray-800">
                      {" "}
                      Drop-off
                    </div>
                  </td>
                  {/* 2 */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
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
          </div>
        </TabContent>
        {/* 2 */}
        <TabContent value="tab2">
          <div className="shadow-lg rounded-lg p-5 lg:w-full max-w-full">
            <div>
              {" "}
              <div className="text-md text-natural-900 font-semibold mb-2">
                Delivery Method
              </div>
              <Input placeholder="Shipping (Buyer Label)" className="mb-4" />
            </div>

            <div>
              {" "}
              <div className="text-md text-natural-900 font-semibold mb-2">
                Shipping Label Cost
              </div>
              <Input placeholder="111" className="mb-4" />
            </div>

            <div>
              {" "}
              <div className="text-md text-natural-900 font-semibold mb-2">
                Shipping Address
              </div>
              <Input
                placeholder="1 Los Angeles Way, Los Angeles, CA 90001"
                className="mb-4"
              />
            </div>
            <div className="flex justify-center my-5">
              <Button className="mb-5" variant="solid" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </TabContent>
        {/* 3 */}
        <TabContent value="tab3">
          <div className="shadow-lg rounded-lg px-5 py-10  lg:w-full max-w-full">
            <div>
              {" "}
              <div className="text-md text-natural-900 font-semibold mb-2">
                Shipping Address
              </div>
              <Input
                placeholder="1 Los Angeles Way, Los Angeles, CA 90001"
                className="mb-4"
              />
            </div>
          <div className="flex justify-center my-5">
          <Button variant="solid" type="submit">
              Submit
            </Button>
          </div>
          </div>
        </TabContent>
        {/* 4 */}
        <TabContent value="tab4">
          <div className="shadow-lg rounded-lg px-5 py-10  lg:w-full max-w-full">
            <div>
              {" "}
              <div className="text-md text-natural-900 font-semibold mb-2">
                Minimum Pick-up Quantity
              </div>
              <Input placeholder="9" className="mb-4" />
            </div>
           <div className="flex justify-center my-5">
           <Button variant="solid" type="submit">
              Submit
            </Button>
           </div>
          </div>
        </TabContent>
        {/* 5 */}
        <TabContent value="tab5">
          <div>
            <div className="shadow-lg rounded-lg px-5 py-2  lg:w-full max-w-full">
              <div>
                {" "}
                <div className="text-md text-natural-900 font-semibold mb-2">
                  Drop Off Address
                </div>
                <Input placeholder="Address" className="mb-4" />
              </div>

              <div>
                {" "}
                <div className="text-md text-natural-900 font-semibold mb-2">
                  Time From
                </div>
                <Input placeholder="time" className="mb-4" />
              </div>

              <div>
                {" "}
                <div className="text-md text-natural-900 font-semibold mb-2">
                  Time To
                </div>
                <Input placeholder="time" className="mb-4" />
              </div>
              <div className="flex justify-center my-5">
              <Button variant="solid" type="submit">
                Submit
              </Button>
              </div>
            </div>
            <div className="inline-block min-w-full overflow-hidden my-5 ">
              <table className="min-w-full border rounded-lg">
                <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
                  <tr>
                    {/* 1 */}
                    <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                      ID
                    </th>
                    {/* 2 */}
                    <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                      address
                    </th>
                    {/* 3 */}
                    <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                      time
                    </th>
                    {/*4  */}
                    <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                      created on
                    </th>
                    {/* 5 */}
                    <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                      edit
                    </th>
                    {/* 6 */}
                    <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                      enable/disable
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="item-center text-center justify-between">
                    {/* 1 */}
                    <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                      <div className="text-sm leading-5 text-gray-800"> 1</div>
                    </td>
                    {/* 2 */}
                    <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                      <div className="text-sm leading-5 text-gray-800">
                        {" "}
                        16143 Richvale Dr., Whittier, CA 90604
                      </div>
                    </td>
                    {/* 3 */}
                    <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                      <div className="text-sm leading-5 text-gray-800">
                        {" "}
                        10:00:00 - 21:00:00
                      </div>
                    </td>
                    {/* 4 */}
                    <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                      <div className="text-sm leading-5 text-gray-800">
                        {" "}
                        2021-11-10 22:25:46
                      </div>
                    </td>
                    {/* 5 */}
                    <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                      <Link to="/shipping/pick-up/edit/1">
                        <Button className="my-5" variant="solid" type="submit">
                          Edit
                        </Button>
                      </Link>
                    </td>
                    {/* 6 */}
                    <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
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
            </div>
          </div>
        </TabContent>
      </div>
    </Tabs>
  );
};

export default PickUp;
