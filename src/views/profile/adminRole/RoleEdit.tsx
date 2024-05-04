import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const RoleEdit = () => {
    const { role_id } = useParams()
    const navigate = useNavigate()
    const [roleName, setRoleName] = useState('')
    //   console.log(category_id);
    React.useEffect(() => {
        // if (refetch) {
        const getCategory = async () => {
            const response = await fetch(
                `https://darktechteam.com/api/admins/single-adminRole/${role_id}`,
            )
            const data = await response.json()
            if (data?.success) {
                setRoleName(data?.result?.category_name)
            }
            console.log(data.result)
        }
        getCategory()
        // }
    }, [])
    //   const handleCreateNew = () => {
    //     if (categoryName !== "") {
    //       const apiUrl = `http://localhost:5000/api/category/update-category/${category_id}`;
    //       axios
    //         .put(apiUrl, {
    //           category_name: categoryName,
    //           status: isChecked ? "active" : "inactive",
    //         })
    //         .then((response) => {
    //           console.log("POST request successful");
    //           console.log("Response:", response.data);
    //         });
    //       navigate(`/product/category`);
    //     }
    //     //    setRefetch(true);
    //   };
    //   const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setIsChecked(event.target.checked); // Set the state to the checked value
    //     if (!event.target.checked) {
    //       //   setSetupCost(0);
    //     }
    //   };
    return (
        <div>
            <h2>Hello Category Edit</h2>
            <div className="lg:w-[50%] max-w-full lg:px-0">
                <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 my-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Category Name"
                            value={roleName}
                            onChange={(e) => {
                                e.preventDefault()
                                setRoleName(e.target.value)
                            }}
                        />
                    </div>

                    <div className="flex text-center items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                // handleCreateNew();
                            }}
                        >
                            UPDATE CATEGORY
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RoleEdit
