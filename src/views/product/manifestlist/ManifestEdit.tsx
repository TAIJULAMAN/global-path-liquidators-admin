import { Button, Input } from "@/components/ui";
import Identification from "@/views/account/KycForm/components/Identification";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ManifestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manifestName, setManifest] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  //   console.log(manifestName);
  React.useEffect(() => {
    // if (refetch) {
    const getManifest = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/manifests/manifest/${id}`
      );
      const data = await response.json();
      if (data?.result?.length > 0) {
        setManifest(data.result[0].manifest_name);
        setIsChecked(data?.result[0].manifest_status != "0" ? true : false);
      }
    };
    getManifest();
    // }
  }, [id]);
  const handleCreateNew = () => {
    if (manifestName !== "") {
      const apiUrl = `https://darktechteam.com/api/manifests/manifest/${id}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          manifest_name: manifestName,
          manifest_status: isChecked ? "1" : "0",
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("POST request successful");
        console.log("Response:", data);
        navigate(`/manifest`);
        Swal.fire({
          icon: "success",
          title: "Manifest  Updated Successfully",
          showConfirmButton: true,
        });
      
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle error if necessary
      });
    }
  };
  

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Set the state to the checked value
    if (!event.target.checked) {
      //   setSetupCost(0);
    }
  };

  return (
    <div>
      <h2 className="text-3xl mb-5 font-bold text-natural-900 uppercase">  Edit manifest</h2>
      <div className="max-w-full shadow-lg rounded-lg">
        <form className="bg-white dark:bg-gray-800 p-5 my-4">
          <div>
            <label className="block text-natural-900 text-md font-bold mb-2">
              Manifest Name
            </label>
             <Input
              placeholder="Manifest Name"
              className="mb-4 w-full"
              value={manifestName}
              onChange={(e) => {
                e.preventDefault();
                setManifest(e.target.value);
              }} />
          </div>
          <div className="my-4 flex gap-2">
            <input
              type="checkbox"
              name="enable_setup_cost"
              className="rounded-full inline-block"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="text-natural-900 text-md font-semibold block">
              Manifest Status : {isChecked ? "Active" : "Inactive"}
            </label>
          </div>

          <div className="flex text-center items-center justify-center">
            <Button
             variant="solid"
             onClick={(e) => {
              e.preventDefault();
              handleCreateNew();
            }}
              >
            UPDATE MANIFEST
      </Button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ManifestEdit;
