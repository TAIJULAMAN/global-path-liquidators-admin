import { FaEdit } from "react-icons/fa";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Button, Input } from "@/components/ui";

export type ICategory = {
  manifest_id: number;
  manifest_name: string;
  manifest_status: string;
};

const Manifest = () => {
  const [allManifest, setAllManifest] = useState<Array<ICategory>>([]);
  const [manifestName, setManifestName] = useState("");
  const [status, setStatus] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEditCategory = (id: number) => {
    navigate(`/manifest-edit/${id}`);
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
    }
  };

  React.useEffect(() => {
    // if (refetch) {
    const getAllManifest = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/manifests/all-manifests`
      );
      const data = await response.json();
      setAllManifest(data?.result);
      setRefetch(false);
    };
    getAllManifest();
    // }
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (manifestName !== "") {
        const manifest_name = manifestName;

        const response = await fetch(
          `https://darktechteam.com/api/manifests/create-manifest`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ manifest_name }), // convert object to JSON string
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
            title: "Manifest Added Successfully",
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
      title: "Do you want manifest?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/manifests/manifest/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("Store Deleted successfully");
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
      <h1 className="text-3xl font-bold mb-5 text-natural-900 uppercase">
        MANIFEST LIST
      </h1>

      <div className="shadow-lg rounded-lg lg:w-full max-w-full">
        <form className="bg-white dark:bg-gray-800 rounded-lg  my-4 p-5">
          <div>
            <label className="block text-natural-900 text-sm font-semibold mb-2">
              Manifest Name
            </label>
             <Input
              className="mb-4 w-full"  
              placeholder="Enter Manifest Name"
              onChange={(e) => {
                e.preventDefault();
                setManifestName(e.target.value);
              }} />
          </div>

          <div className="flex text-center items-center justify-center my-4">
            <Button
             variant="solid"
             onClick={(e) => {
              e.preventDefault();
              handleCreateNew();
            }}
            >
              CREATE MANIFEST
              </Button>
          </div>
        </form>
      </div>

      <div className="my-5 p-6 px-0">
        <div className="w-full relative overflow-x-auto border rounded-lg dark:border-gray-700 dark:bg-gray-800">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-sm uppercase bg-[#42A5F5] text-white dark:bg-gray-700">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Manifest Name
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Manifest Status
                </th>

                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allManifest.length > 0 &&
                allManifest.map((manifest, key) => {
                  return (
                    <tr key={key} className="bg-white border-b-2 dark:border-gray-700 dark:bg-gray-800">
                      <td
                        scope="row"
                        className="px-6 text-center py-4  whitespace-nowrap"
                      >
                        {key + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center whitespace-nowrap"
                      >
                        {manifest?.manifest_name}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center whitespace-nowrap="
                      >
                        {manifest?.manifest_status != "1"
                          ? "Inactive"
                          : "Active"}
                      </td>

                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() =>
                            handleEditCategory(manifest?.manifest_id)
                          }
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(manifest?.manifest_id);
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

export default Manifest;
