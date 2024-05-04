import Card from "@/components/ui/Card";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";

type PaymentInfoProps = {
  label?: string;
  value?: number;
  isLast?: boolean;
};

type PaymentSummaryProps = {
  data?: {
    subTotal: number;
    tax: number;
    deliveryFees: number;
    total: number;
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
  total: string;
  product_image: string;
  deal_type_id: string;
  details: Record<string, string[]>;
};

type OrderProductsProps = {
  data?: Product[];
};

const PaymentInfo = ({ label, value, isLast }: PaymentInfoProps) => {
  return (
    <li
      className={`flex items-center justify-between${!isLast ? " mb-3" : ""}`}
    >
      <span>{label}</span>
      <span className="font-semibold">
        <NumericFormat
          displayType="text"
          value={(Math.round((value as number) * 100) / 100).toFixed(2)}
          prefix={"$"}
          thousandSeparator={true}
        />
      </span>
    </li>
  );
};

const PaymentSummary = ({ data }: PaymentSummaryProps) => {
  const { id } = useParams();

  const [orderList, setAllorderlist] = useState<Array<Product>>([]);
  console.log(orderList);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const getAllOrder = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/orderItems/items-by-order-id/${id}`
      );
      const data = await response.json();
      setAllorderlist(data?.result);
    };
    getAllOrder();
    // }
  }, []);

  // Calculate total amount using map
  // Given subtotalAmount and constants for delivery fee and tax rate
  const subtotalAmount = orderList
    .map((order) => order.total_amount)
    .reduce((acc, curr) => acc + curr, 0);

  const deliveryFee = 15.0;
  const taxRate = 6.0;
  const taxAmount = (subtotalAmount * taxRate) / 100;
  // Calculate total amount including delivery fee and tax
  const totalAmount = subtotalAmount + deliveryFee + taxAmount;

  //   console.log(totalAmount.toFixed(2));
  const finalAmount: number = parseFloat(totalAmount.toFixed(2));
  return (
    <Card className="mb-4">
      <h5 className="mb-4">Payment Summary</h5>
      <ul>
        <PaymentInfo label="Subtotal" value={orderList[0]?.total_amount} />
        <PaymentInfo label="Delivery fee" value={data?.deliveryFees} />
        <PaymentInfo label="Tax(6%)" value={taxAmount} />
        <hr className="mb-3" />
        <PaymentInfo isLast label="Total" value={finalAmount} />
      </ul>
    </Card>
  );
};

export default PaymentSummary;
