import React, { Fragment, useState } from "react";
import AdaptableCard from "@/components/shared/AdaptableCard";
import Table from "@/components/ui/Table";
import Avatar from "@/components/ui/Avatar";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { NumericFormat } from "react-number-format";
import isLastChild from "@/utils/isLastChild";
import { useParams } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  productCode: string;
  deal_type_name: string;
  img: string;
  product_name: string;
  price: number;
  quantity: number;
  total_amount: number;
  total: number;
  product_image: string;
  deal_type_id: string;
  details: Record<string, string[]>;
};

type OrderProductsProps = {
  data?: Product[];
};

const { Tr, Th, Td, THead, TBody } = Table;

const columnHelper = createColumnHelper<Product>();

const ProductColumn = ({ row }: { row: Product }) => {
  return (
    <div className="flex">
      <Avatar size={90} src={row.img} />
      <div className="ltr:ml-2 rtl:mr-2">
        <h6 className="mb-2">{row.name}</h6>
        {Object.keys(row.details).map((key, i) => (
          <div key={key + i} className="mb-1">
            <span className="capitalize">{key}: </span>
            {row.details[key].map((item, j) => (
              <Fragment key={item + j}>
                <span className="font-semibold">{item}</span>
                {!isLastChild(row.details[key], j) && <span>, </span>}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const PriceAmount = ({ amount }: { amount: number }) => {
  return (
    <NumericFormat
      displayType="text"
      value={(Math.round(amount * 100) / 100).toFixed(2)}
      prefix={"$"}
      thousandSeparator={true}
    />
  );
};

const columns = [
  columnHelper.accessor("name", {
    header: "Product",
    cell: (props) => {
      const row = props.row.original;
      return <ProductColumn row={row} />;
    },
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (props) => {
      const row = props.row.original;
      return <PriceAmount amount={row.price} />;
    },
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
  }),
  columnHelper.accessor("total", {
    header: "Total",
    cell: (props) => {
      const row = props.row.original;
      return <PriceAmount amount={row.price} />;
    },
  }),
];

const OrderProducts = ({ data = [] }: OrderProductsProps) => {
  const { id } = useParams();
  // console.log(id);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [orderList, setAllorderlist] = useState<Array<Product>>([]);
  console.log(orderList);
  const [refetch, setRefetch] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const getAllProducts = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/orderItems/items-by-order-id/${id}`
      );
      const data = await response.json();
      setAllorderlist(data?.result);
    };
    getAllProducts();
    // }
  }, []);

  return (
    <AdaptableCard className="mb-4 ">
      <div className="w-full relative overflow-x-auto border rounded-lg dark:border-gray-700">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className=" text-xs uppercase bg-[#42A5F5] text-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                SL NO.
              </th>
              <th scope="col" className="text-center px-6 py-3">
                IMAGE
              </th>
              <th scope="col" className="text-center px-6 py-3">
                PRODUCT NAME
              </th>
              <th scope="col" className="text-center px-6 py-3">
                DEAL TYPE
              </th>

              <th scope="col" className="text-center px-6 py-3">
                TOTAL AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
            {orderList?.length > 0 ? (
              (orderList || [])?.map((order, index: number) => {
                return (
                  <tr key={index} className="border-b-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                    <td className="text-center px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {index + 1}
                    </td>
                    <td className="text-center px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      <img
                        className="ml-4 w-16 h-12 rounded"
                        src={`https://darktechteam.com/api/${order?.product_image}`}
                        alt=""
                      />
                    </td>
                    <td className="text-center px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {order?.product_name}
                    </td>
                    <td className="text-center px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {order?.deal_type_name}
                    </td>

                    <td className="text-center px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      ${order?.price}
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
      </div>
    </AdaptableCard>
  );
};

export default OrderProducts;
