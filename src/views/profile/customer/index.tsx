import React, { useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import { Button } from '@/components/ui'
import { HiOutlinePlus } from 'react-icons/hi'

const index = () => {
    const [page, setPage] = useState(1) // default page is 1 //
    const [perPage, setPerPage] = useState(10)
    const tableRef = useRef(null)

    const [allUser, setAllusers] = useState([])
    const [refetch, setRefetch] = useState(false)

    console.log(allUser)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    // const handleEditCategory = (role_id: number) => {
    //     navigate(`/adminrole/edit/${role_id}`)
    // }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        // if (refetch) {
        const getAllUser = async () => {
            const response = await fetch(
                `https://darktechteam.com/api/users/allUsers`,

            )
            console.log(response)
            const data = await response.json()
            setAllusers(data?.result)
            setRefetch(false)
        }
        getAllUser()
    }, [refetch])

    return (
        <div>
            <div>
                
                <Link to='/profiles/create-customer'>
                <Button className="my-2" variant="twoTone" icon={<HiOutlinePlus />}>
                    <span>
                        <span>CREATE A NEW CUSTOMER</span>
                    </span>
                </Button>
            </Link>

            </div>
            <div className="text-3xl text-natural-900 font-bold my-5">
                ALL CUSTOMERS
            </div>
            <div className="py-5">
                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                            <div className="min-w-full overflow-hidden">
                                <table
                                    ref={tableRef}
                                    className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                >
                                    <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-center px-6 py-3"
                                            >
                                                SL NO
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-center px-6 py-3"
                                            >
                                                USER NAME
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-center px-6 py-3"
                                            >
                                                EMAIL
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-center px-6 py-3"
                                            >
                                                MOBILE
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-center px-6 py-3"
                                            >
                                                REG. DATE
                                            </th>

                                            <th
                                                scope="col"
                                                className="text-center px-6 py-3"
                                            >
                                                ACTION
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUser?.length > 0 &&
                                            allUser?.map((user, index) => {
                                                return (
                                                    <tr
                                                        key={index}
                                                        className="border-b-2 border-gray-700 dark:bg-gray-800"
                                                    >
                                                        <td
                                                            scope="row"
                                                            className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {index + 1}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {user?.first_name
                                                                ? user?.first_name
                                                                : '-'}{' '}
                                                            {user?.last_name
                                                                ? user?.last_name
                                                                : '-'}
                                                        </td>

                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {user?.email
                                                                ? user?.email
                                                                : '-'}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {user?.phone_number
                                                                ? user?.phone_number
                                                                : '-'}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {user?.registration_date
                                                                ? user?.registration_date
                                                                : '-'}
                                                        </td>
                                                        <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">

                                                            {/* `/profiles/all/customer/details/:id` */}
                                                            {/* <Link to="/profiles/all/customer/details/2"> */}
                                                            <FaEdit />
                                                            {/* </Link> */}

                                                            <AiOutlineDelete className="text-[30px] ml-8 text-red-400" />
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Table Footer */}
                            <div className="px-4 flex justify-between">
                                {/* limit dropdown */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <label
                                            htmlFor="table-pagination-limit"
                                            className="text-sm text-gray-700 dark:text-gray-200"
                                        >
                                            Show
                                        </label>
                                        <select
                                            id="table-pagination-limit"
                                            className="mx-2 form-select text-sm text-black"
                                            value={perPage}
                                            onChange={(e) =>
                                                setPerPage(
                                                    parseInt(e.target.value),
                                                )
                                            }
                                        >
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="250">250</option>
                                            <option value="500">500</option>
                                        </select>
                                        <label
                                            htmlFor="table-pagination-limit"
                                            className="text-sm text-gray-700 dark:text-gray-200"
                                        >
                                            Entries
                                        </label>
                                    </div>
                                </div>
                                {/* Pagination */}
                                <nav className="flex items-center justify-end space-x-2">
                                    <button
                                        className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md"
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 1}
                                    >
                                        <span aria-hidden="true">«</span>
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                    </button>
                                    {1}
                                    <button
                                        className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md"
                                        onClick={() => setPage(page + 1)}
                                    >
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">»</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index
