import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ConditionEdit = () => {
  const { condition_id } = useParams();
  const navigate = useNavigate();
  const [conditionName, setConditionName] = useState("");
  React.useEffect(() => {
    const getCondition = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/conditions/single-condition/${condition_id}`
      );
      const data = await response.json();
      if (data?.success) {
        setConditionName(data?.result?.condition_name);
      }
    };
    getCondition();
    // }
  }, [condition_id]);
  const handleCreateNew = () => {
    if (conditionName !== "") {
      const apiUrl = `https://darktechteam.com/api/conditions/update-condition/${condition_id}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          condition_name: conditionName
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        Swal.fire({
          icon: "success",
          title: "Condition Updated Successfully",
          showConfirmButton: true,
        });
        navigate(`/product/condition`);
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle error if necessary
      });
    }
  };
  

  return (
    <div>
      <h1 className="text-3xl mb-5 font-bold text-natural-900 uppercase">
        {" "}
        CONDITION EDIT
      </h1>
      <div className="shadow-lg rounded-lg lg:w-full max-w-full">
        <form className="bg-white dark:bg-gray-800 p-5">
          <div>
            <label className="block text-natural-900 text-sm font-semibold mb-2">
              Condition Name
            </label>

            <Input
              placeholder="Category Name"
              className="w-full"
              value={conditionName}
              onChange={(e) => {
                e.preventDefault();
                setConditionName(e.target.value);
              }}
            />
          </div>

          <div className="flex text-center items-center justify-center my-5">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              UPDATE CONDITION
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConditionEdit;
