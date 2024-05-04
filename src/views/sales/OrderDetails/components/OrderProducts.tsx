import { Fragment } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Table from '@/components/ui/Table'
import Avatar from '@/components/ui/Avatar'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import isLastChild from '@/utils/isLastChild'
import { FaEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'

type Product = {
    id: string
    name: string
    productCode: string
    img: string
    price: number
    quantity: number
    total: number
    details: Record<string, string[]>
}

type OrderProductsProps = {
    data?: Product[]
}

const { Tr, Th, Td, THead, TBody } = Table

const columnHelper = createColumnHelper<Product>()

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
                                {!isLastChild(row.details[key], j) && (
                                    <span>, </span>
                                )}
                            </Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

const PriceAmount = ({ amount }: { amount: number }) => {
    return (
        <NumericFormat
            displayType="text"
            value={(Math.round(amount * 100) / 100).toFixed(2)}
            prefix={'$'}
            thousandSeparator={true}
        />
    )
}

const columns = [
    columnHelper.accessor('name', {
        header: 'Product',
        cell: (props) => {
            const row = props.row.original
            return <ProductColumn row={row} />
        },
    }),
    columnHelper.accessor('price', {
        header: 'Price',
        cell: (props) => {
            const row = props.row.original
            return <PriceAmount amount={row.price} />
        },
    }),
    columnHelper.accessor('quantity', {
        header: 'Quantity',
    }),
    columnHelper.accessor('total', {
        header: 'Total',
        cell: (props) => {
            const row = props.row.original
            return <PriceAmount amount={row.price} />
        },
    }),
]

const OrderProducts = ({ data = [] }: OrderProductsProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <AdaptableCard className="mb-4">
            {/* <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table> */}
            <div className="w-full relative overflow-x-auto shadow-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#42A5F5] text-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                PRODUCT	
                </th>
                <th scope="col" className="text-center px-6 py-3">
                PRICE	
                </th>

                <th scope="col" className="text-center px-6 py-3">
                QUANTITY	TOTAL
                </th>
                <th scope="col" className="text-center px-6 py-3">
                TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
            <tr className="bg-white border dark:bg-gray-800">
                      <td
                        scope="row"
                        className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                       image+details
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                       $252.00	
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                     	2	
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                       $252.00	
                      </td>

                     
                    </tr>
            </tbody>
          </table>
        </div>
        </AdaptableCard>
    )
}

export default OrderProducts
