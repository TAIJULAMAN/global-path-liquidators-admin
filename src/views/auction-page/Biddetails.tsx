import { IconText } from "@/components/shared";
import { Avatar, Card } from "@/components/ui";
import React, { useState } from "react";
import { HiMail, HiPhone } from "react-icons/hi";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import Timeline from "@/components/ui/Timeline";
import Badge from "@/components/ui/Badge";
type Bid = {
  id: string;
  first_name: string;
  last_name: string;
  productCode: string;
  billing_address: string;
  img: string;
  product_name: string;
  price: number;
  shipping_address: number;
  total_amount: number;
  amount: number;
  product_image: string;
  email: string;
  bidStatus: string;
  created_at: string;
  phone_number: string;
  details: Record<string, string[]>;
};
const Biddetails = () => {
  const { id } = useParams();
  const [bidData, setBidDetails] = useState<Bid[]>([]);
  const [refetch, setRefetch] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const getAllBid = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/bids/single-bid/${id}`
      );
      const data = await response.json();
      setBidDetails(data?.result);
    };
    getAllBid();
    // }
  }, []);

  return (
    <div>
      <h4 className="mt-5">BID DETAILS #{id}</h4>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="w-full card relative overflow-x-auto col-span-2 ">
          <table className="w-full text-sm text-left rtl:text-right border rounded-lg dark:border-gray-700">
            <thead className="text-sm uppercase bg-[#42A5F5] text-white dark:bg-gray-700">
              <tr>
                <th scope="col" className="text-start px-6 py-3">
                  IMAGE
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  BID DATE
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  PRODUCT NAME
                </th>

                <th scope="col" className="text-center px-6 py-3">
                  BID AMOUNT
                </th>
                <th scope="col" className="text-end px-6 py-3">
                  BID STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {bidData?.length > 0 ? (
                (bidData || [])?.map((bid, index: number) => {
                  return (
                    <tr key={index} className="border-b-2 dark:bg-gray-800 dark:border-gray-500">
                      <td className=" px-4 py-3 whitespace-nowrap text-sm font-medium text-natural-900">
                        <img
                          className="ml-4 w-16 h-12 rounded"
                          src={`https://darktechteam.com/api/${bid?.product_image}`}
                          alt=""
                        />
                      </td>
                      <td className="text-center px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {bid?.created_at}
                      </td>

                      <td className="text-center px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {bid?.product_name}
                      </td>

                      <td className="text-center px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        ${bid?.amount}
                      </td>
                      <td className="text-center px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        <span className="bg-[#C5CAE9] p-2 px-2 rounded">
                          {bid?.bidStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td>
                  <span className="w-full flex justify-center items-center p-5">
                    No Order data found
                  </span>
                </td>
              )}
            </tbody>
          </table>

          <div className="mt-4">
            <Card className="mb-4">
              <h5 className="mb-4">Activity</h5>

              <Timeline>
                <Timeline.Item
                  key={0}
                  media={
                    <div className="flex mt-1.5">
                      <Badge
                      />
                    </div>
                  }
                >
                  <div
                    className={classNames(
                      "font-semibold mb-1 text-base"
                      //   event.tracking_status && "text-emerald-500"
                    )}
                  >
                    {/* {event.tracking_status} */}
                  </div>
                  {/* {event.tracking_status && (
                <div className="mb-1">
                  Recipient:Your order history {event.tracking_status}
                </div>
              )}
              <div>{event.tracking_datetime}</div> */}
                </Timeline.Item>
              </Timeline>
            </Card>
          </div>
        </div>

        <div className="card">
          <Card>
            <h5 className="mb-4">Customer</h5>

            <div className="flex items-center">
              {/* <Avatar shape="circle" src={data?.img} /> */}
              <div className="ltr:ml-2 rtl:mr-2">
                <div className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                  {bidData[0]?.first_name} {bidData[0]?.last_name}
                </div>
                {/* <span>
              <span className="font-semibold">{data?.previousOrder} </span>
              previous orders
            </span> */}
              </div>
            </div>

            <hr className="my-5" />
            <IconText
              className="mb-4"
              icon={<HiMail className="text-xl opacity-70" />}
            >
              <span className="font-semibold"> {bidData[0]?.email}</span>
            </IconText>
            <IconText icon={<HiPhone className="text-xl opacity-70" />}>
              <span className="font-semibold">{bidData[0]?.phone_number}</span>
            </IconText>
            <hr className="my-5" />
            <h6 className="mb-4">Shipping Address</h6>
            <address className="not-italic">
              <div className="mb-1">{bidData[0]?.shipping_address}</div>
            </address>
            <hr className="my-5" />
            <h6 className="mb-4">Billing address</h6>
            <address className="not-italic">
              <div className="mb-1">{bidData[0]?.billing_address}</div>
            </address>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Biddetails;
