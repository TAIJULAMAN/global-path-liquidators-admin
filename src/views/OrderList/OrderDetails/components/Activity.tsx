import classNames from "classnames";
import Timeline from "@/components/ui/Timeline";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import isLastChild from "@/utils/isLastChild";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import React, { useState } from "react";

type Event = {
  time: number;
  action: string;
  recipient?: string;
};

type ActivityProps = {
  data?: {
    date: number;
    events: Event[];
  }[];
};

type Product = {
  id: string;
  tracking_status: string;
  tracking_datetime: number;
  img: string;
  price: number;
  quantity: number;
  total_amount: number;
  total: number;
  first_name: string;
  last_name: string;
  email: string;
  shipping_address: string;
  billing_address: string;
  phone_number: string;
  details: Record<string, string[]>;
};

type OrderProductsProps = {
  data?: Product[];
};

const Activity = ({ data = [] }: ActivityProps) => {
  const { id } = useParams();

  const [trakingInfo, setTrakingInfo] = useState<Array<Product>>([]);
  // console.log(trakingInfo);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const getTrackingInfo = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/orderTracking/get-order-tracker/${id}`
      );
      const data = await response.json();
      setTrakingInfo(data?.result);
    };
    getTrackingInfo();
    // }
  }, [id]);

  return (
    <Card className="mb-4">
      <h5 className="mb-4">Activity</h5>

      <Timeline>
        {trakingInfo?.map((event, j) => (
          <Timeline.Item
            key={j}
            media={
              <div className="flex mt-1.5">
                <Badge
                  innerClass={classNames(
                    event.tracking_status ? "bg-emerald-500" : "bg-blue-500"
                  )}
                />
              </div>
            }
          >
            <div
              className={classNames(
                "font-semibold mb-1 text-base",
                event.tracking_status && "text-emerald-500"
              )}
            >
              {event.tracking_status}
            </div>
            {event.tracking_status && (
              <div className="mb-1">
                Recipient:Your order history {event.tracking_status}
              </div>
            )}
            <div>{event.tracking_datetime}</div>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export default Activity;
