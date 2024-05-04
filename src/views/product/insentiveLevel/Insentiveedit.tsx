import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Insentiveedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [levelName, setLevelName] = useState("");

  const [lower_limits, setLowerLimit] = useState("");
  const [upperLimits, setUpperlimit] = useState("");
  const [level_discounts, setLevelDiscount] = useState("");
  React.useEffect(() => {
    const getAllInsentive = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/incentive-levels/get-single/${id}`
      );
      const data = await response.json();
      console.log(data);
      if (data?.success) {
        setLevelName(data?.result?.status_level);
        setLowerLimit(data?.result?.lower_limit);
        setUpperlimit(data?.result?.upper_limit);
        setLevelDiscount(data?.result?.level_discount);
        }
    };
    getAllInsentive();
    // }
  }, [id]);

  const handleCreateNew = () => {
    if (levelName !== "") {
      const apiUrl = `https://darktechteam.com/api/incentive-levels/update/${id}`;
      axios
        .put(apiUrl, {
        status_level : levelName,
        lower_limit : lower_limits,
        upper_limit : upperLimits,
        level_discount :level_discounts

        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/all-insentive-level`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl my-10 font-bold text-natural-900">
        {" "}
        EDIT INSENTIVE LEVEL
      </h1>
      <div className="shadow-lg rounded-lg px-5 py-2 max-w-full">
        <form className="bg-white px-8 pt-6 pb-8 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Insentive Level Name
              </label>
              <Input
                placeholder="Insentive Level Name"
                className="mb-4 w-full"
                value={levelName}
                onChange={(e) => {
                  e.preventDefault();
                  setLevelName(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Lower Limit
              </label>
              <Input
                placeholder="Lower Limit"
                className="mb-4 w-full"
                value={lower_limits}
                onChange={(e) => {
                  e.preventDefault();
                  setLowerLimit(e.target.value);
                }}
              />
            </div>
       
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Insentive Upper Limit
              </label>
              <Input
                placeholder="Insentive Upper Limit"
                className="mb-4 w-full"
                value={upperLimits}
                onChange={(e) => {
                  e.preventDefault();
                  setUpperlimit(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Level Discount
              </label>
              <Input
                placeholder="Level Discount"
                className="mb-4 w-full"
                value={level_discounts}
                onChange={(e) => {
                  e.preventDefault();
                  setLevelDiscount(e.target.value);
                }}
              />
            </div>
       
          </div>

          <div className="flex text-center items-center justify-center">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              UPDATE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Insentiveedit;
