import { FaEdit } from "react-icons/fa";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Input } from "@/components/ui";

export type Insentive = {
  social_link_id: number;
  social_link: string;
  social_name: string;
  social_status: string;
 level_discount: string;
  cat_id: number;
};

const SocialLinks = () => {
  const [allSocialLinks, setAllsocialLinks] = useState<Array<Insentive>>([]);
  const [socialName, setSocialName] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [status, setStatus] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEditSocialLink = (id: number) => {
    navigate(`/settings/social-links-edit/${id}`);
  };
  const handleSatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(String(e?.target?.value));
  };

  React.useEffect(() => {
    const getAllsociallinks = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/socialLinks/all_links`
      );
      const data = await response.json();
      setAllsocialLinks(data?.result);
      setRefetch(false);
    };
    getAllsociallinks();
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (socialName !== "") {
        const social_name = socialName;
        const social_link = socialLink;
        // const social_status = status;


        const response = await fetch(
          `https://darktechteam.com/api/socialLinks/create_new`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ social_name,social_link }), // convert object to JSON string
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();

        const insertId = responseData.result?.insertId;
        if (insertId) {
          Swal.fire({
            icon: "success",
            title: "Social link Added Successfully",
            showConfirmButton: true,
          });
        }
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const handleRemove = (id: number) => {
    Swal.fire({
      title: "Do you want delete this social links?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/socialLinks/remove_link/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("social links Deleted successfully");
          });
          setRefetch(true);
        } else if (result.dismiss) {
          Swal.fire("Cancelled", "", "error");
        }
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl my-3 font-bold text-natural-900">
       ALL SOCIAL LINKS
      </h1>

      <div className=" shadow-lg rounded-lg px-0 py-0 lg:w-ful max-w-full">
        <form className="bg-white px-8 pt-2 pb-8 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Social Name
              </label>
              <Input
                placeholder="Social Name"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setSocialName(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Social Link
              </label>
              <Input
                placeholder="Social Link"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setSocialLink(e.target.value);
                }}
              />
            </div>
       
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mt-0">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Status
              </label>
              <select
                className="select p-3 dark:bg-gray-800 border rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                onChange={handleSatus}
              >
                <option>Select Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
       
       
          </div>
          <div className="flex text-center items-center justify-center my-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              CREATE SOCIAL LINK
            </button>
          </div>
        </form>
      </div>

      <div className="my-2">
        <div className="w-full relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#42A5F5] text-white  dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                SL NO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                SOCIAL NAME
                </th>
                <th scope="col" className="text-center px-6 py-3">
                SOCIAL LINK
                </th>
                <th scope="col" className="text-center px-6 py-3">
                STATUS
                </th>
            
                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allSocialLinks?.length > 0 &&
                allSocialLinks?.map((links, key) => {
                  return (
                    <tr key={key} className="bg-white border dark:bg-gray-800">
                      <td
                        scope="row"
                        className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {key + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {links?.social_name}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {links?.social_link}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-[#004D40]  dark:text-white"
                      >
                 
                      <span className="bg-[#4DD0E1] text-white px-5 py-2 rounded">
                      {links?.social_status != "1" ? "Inactive" : "Active"}
                    </span>
                      </td>
                
                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() => handleEditSocialLink(links?.social_link_id)}
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(links?.social_link_id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
