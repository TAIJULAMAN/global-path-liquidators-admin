import { Button } from "@/components/ui";
import Tabs from "@/components/ui/Tabs";
import { Link } from "react-router-dom";
const { TabNav, TabList, TabContent } = Tabs;
const Delivery = () => {
  return (
    <div>
      <Tabs defaultValue="tab2">
        <TabList>
          <TabNav value="tab1">Delivery Request</TabNav>
          <TabNav value="tab2">Processed Delivery</TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value="tab1">
            <section className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
              {/* table part*/}
              <div className="inline-block min-w-full overflow-hidden bg-white">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-[#42A5F5] text-white dark:bg-gray-700 ">
                    <tr className="uppercase">
                      {/* 1 */}
                      <th className="px-6 py-3 text-left leading-4 tracking-wider">
                        Order Id
                      </th>
                      {/* 2 */}
                      <th className="px-6 py-3 text-left text-sm leading-4 tracking-wider">
                        Open Date
                      </th>
            {/* 3 */}
                      <th className="px-6 py-3 text-left text-sm leading-4 tracking-wider">
        seller
                      </th>
                      {/* 4 */}
                      <th className="px-6 py-3 text-left text-sm leading-4 tracking-wider">
                        Deal Name
                      </th>
                      {/* 5 */}
                      <th className="px-6 py-3  text-left text-sm leading-4 tracking-wider">
                        Deal Model
                      </th>
                      {/* 6 */}
                      <th className="px-6 py-3  text-left text-sm leading-4 tracking-wider">
                        Weight
                      </th>
                      {/* 7 */}
                      <th className="px-6 py-3  text-left text-sm leading-4 tracking-wider">
                        Price
                      </th>
                      {/* 8 */}
                      <th className="px-6 py-3  text-left text-sm leading-4 tracking-wider">
                        Commission
                      </th>
                      {/* 9 */}
                      <th className="px-6 py-3  text-left text-sm leading-4  tracking-wider">
                        Count
                      </th>

                      {/* 10 */}
                      <th className="px-6 py-3 ">
                        # of B.B
                      </th>
                      {/* 11 */}
                      <th className="px-6 py-3 ">
                        Total Shipping Cost
                      </th>
                      {/* 12 */}
                      <th className="px-6 py-3">
                        Total Payout
                      </th>
                      {/* 13 */}
                      <th className="px-6 py-3">
                        Status
                      </th>
                      {/* 14 */}
                      <th className="px-6 py-3">
                        Shipping Label
                      </th>
                      {/* 15 */}
                      <th className="px-6 py-3">
                        Return Label
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="text-gray-700">
                      {/* 1 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5">
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
                      {/* 11 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $15.00
                      </td>
                      {/* 12 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $531.00
                      </td>
                      {/* 13 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        Pending
                      </td>
                      {/* 14 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-300 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                         
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                      {/* 15 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                    <tr className="text-gray-700">
                      {/* 1 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5">
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
                      {/* 11 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $15.00
                      </td>
                      {/* 12 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $531.00
                      </td>
                      {/* 13 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        Pending
                      </td>
                      {/* 14 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-300 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                         
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                      {/* 15 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                    <tr className="text-gray-700">
                      {/* 1 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5">
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
                      {/* 11 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $15.00
                      </td>
                      {/* 12 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $531.00
                      </td>
                      {/* 13 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        Pending
                      </td>
                      {/* 14 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-300 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                         
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                      {/* 15 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
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
                  {/* {metaPage} */}
                  1
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
          </TabContent>
          <TabContent value="tab2">
          <section className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
              {/* table part*/}
              <div className="inline-block min-w-full overflow-hidden bg-white">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-[#42A5F5] text-white dark:bg-gray-700 ">
                    <tr className="uppercase">
                      {/* 1 */}
                      <th className="px-6 py-3 text-left leading-4 tracking-wider">
                        Order Id
                      </th>
                      {/* 2 */}
                      <th className="px-6 py-3 text-left text-sm leading-4 tracking-wider">
                        Open Date
                      </th>
            {/* 3 */}
                      <th className="px-6 py-3 text-left text-sm leading-4 tracking-wider">
        seller
                      </th>
                      {/* 4 */}
                      <th className="px-6 py-3 text-left text-sm leading-4 tracking-wider">
                        Deal Name
                      </th>
                      {/* 5 */}
                      <th className="px-6 py-3  text-left text-sm leading-4 tracking-wider">
                        Deal Model
                      </th>
                      {/* 6 */}
                      <th className="px-6 py-3  text-left text-sm leading-4 tracking-wider">
                        Weight
                      </th>
                      {/* 7 */}
                      <th className="px-6 py-3  text-left text-sm leading-4 tracking-wider">
                        Price
                      </th>
                      {/* 8 */}
                      <th className="px-6 py-3  text-left text-sm leading-4 tracking-wider">
                        Commission
                      </th>
                      {/* 9 */}
                      <th className="px-6 py-3  text-left text-sm leading-4  tracking-wider">
                        Count
                      </th>

                      {/* 10 */}
                      <th className="px-6 py-3 ">
                        # of B.B
                      </th>
                      {/* 11 */}
                      <th className="px-6 py-3 ">
                        Total Shipping Cost
                      </th>
                      {/* 12 */}
                      <th className="px-6 py-3">
                        Total Payout
                      </th>
                      {/* 13 */}
                      <th className="px-6 py-3">
                        Status
                      </th>
                      {/* 14 */}
                      <th className="px-6 py-3">
                        Shipping Label
                      </th>
                      {/* 15 */}
                      <th className="px-6 py-3">
                        Return Label
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="text-gray-700">
                      {/* 1 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5">
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
                      {/* 11 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $15.00
                      </td>
                      {/* 12 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $531.00
                      </td>
                      {/* 13 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        Pending
                      </td>
                      {/* 14 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-300 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                         
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                      {/* 15 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                    <tr className="text-gray-700">
                      {/* 1 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5">
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
                      {/* 11 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $15.00
                      </td>
                      {/* 12 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $531.00
                      </td>
                      {/* 13 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        Pending
                      </td>
                      {/* 14 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-300 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                         
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                      {/* 15 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                    <tr className="text-gray-700">
                      {/* 1 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm leading-5">
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
                      {/* 11 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $15.00
                      </td>
                      {/* 12 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        $531.00
                      </td>
                      {/* 13 */}
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-sm leading-5">
                        Pending
                      </td>
                      {/* 14 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-300 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                         
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                      {/* 15 */}
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                        <Link to={`/tickets-open/details/${"2"}`}>
                          <Button
                            variant="solid"
                            type="submit"
                            className="mb-5"
                          >
                            View Details
                          </Button>
                        </Link>
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
                  {/* {metaPage} */}
                  1
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
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Delivery;
