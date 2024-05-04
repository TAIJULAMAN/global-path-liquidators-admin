import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import IconText from "@/components/shared/IconText";
import { HiMail, HiPhone, HiExternalLink } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";

type CustomerInfoProps = {
  data?: {
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    img: string;
    previousOrder: number;
    shippingAddress: {
      line1: string;
      line2: string;
      line3: string;
      line4: string;
    };
    billingAddress: {
      line1: string;
      line2: string;
      line3: string;
      line4: string;
    };
  };
};

type Product = {
  id: string;
  name: string;
  productCode: string;
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

const CustomerInfo = ({ data }: CustomerInfoProps) => {
  const { id } = useParams();

  const [customerInfo, setCustomerInfo] = useState<Array<Product>>([]);
  console.log(customerInfo);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const getCustomerInfo = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/orders/order-by-id/${id}`
      );
      const data = await response.json();
      setCustomerInfo(data?.result);
    };
    getCustomerInfo();
    // }
  }, []);

  return (
    <Card>
      <h5 className="mb-4">Customer</h5>
      <Link
        className="group flex items-center justify-between"
        to="/app/crm/customer-details?id=11"
      >
        <div className="flex items-center">
          <Avatar shape="circle" src={data?.img} />
          <div className="ltr:ml-2 rtl:mr-2">
            <div className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
              {customerInfo[0]?.first_name} {customerInfo[0]?.last_name}
            </div>
            {/* <span>
              <span className="font-semibold">{data?.previousOrder} </span>
              previous orders
            </span> */}
          </div>
        </div>
        <HiExternalLink className="text-xl hidden group-hover:block" />
      </Link>
      <hr className="my-5" />
      <IconText
        className="mb-4"
        icon={<HiMail className="text-xl opacity-70" />}
      >
        <span className="font-semibold"> {customerInfo[0]?.email}</span>
      </IconText>
      <IconText icon={<HiPhone className="text-xl opacity-70" />}>
        <span className="font-semibold">{customerInfo[0]?.phone_number}</span>
      </IconText>
      <hr className="my-5" />
      <h6 className="mb-4">Shipping Address</h6>
      <address className="not-italic">
        <div className="mb-1">{customerInfo[0]?.shipping_address}</div>
      </address>
      <hr className="my-5" />
      <h6 className="mb-4">Billing address</h6>
      <address className="not-italic">
        <div className="mb-1">{customerInfo[0]?.billing_address}</div>
      </address>
    </Card>
  );
};

export default CustomerInfo;
