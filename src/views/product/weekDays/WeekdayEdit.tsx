import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const WeekdayEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [weekdayName, setWeekdayName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  React.useEffect(() => {
    const getWeekday = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/weekdays/single-day/${id}`
      );
      const data = await response.json();
      console.log(data);
      if (data?.success) {
        setWeekdayName(data?.result[0]?.weekday_name);
        setIsChecked(data?.result[0]?.bin_status === 1 ? true : false);
      }
    };
    getWeekday();
    // }
  }, [id]);

  const handleCreateNew = () => {
    if (weekdayName !== "") {
      const apiUrl = `https://darktechteam.com/api/weekdays/update-weekday/${id}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          weekday_name: weekdayName,
          bin_status: isChecked ? "1" : "0"
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
          title: "Weekday Updated Successfully",
          showConfirmButton: true,
        });
        navigate(`/all-weekdays`);
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle error if necessary
      });
    }
  };
  
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
    }
  };
  return (
    <div>
      <h1 className="text-3xl my-10 font-bold text-natural-900">
        {" "}
        EDIT WEEKDAYS
      </h1>
      <div className="shadow-lg rounded-lg px-5 py-2 max-w-full">
        <form className="bg-white px-8 pt-6 pb-8 my-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Week Name
            </label>
            <Input
              placeholder="Category Name"
              className="mb-4 w-full"
              value={weekdayName}
              onChange={(e) => {
                e.preventDefault();
                setWeekdayName(e.target.value);
              }}
            />
            <div className="my-4 flex gap-2">
              <input
                type="checkbox"
                name="enable_setup_cost"
                className="rounded-full inline-block"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="text-gray-700 text-sm font-boldblock">
                Weekday Status : {isChecked ? "Active" : "Inactive"}
              </label>
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

export default WeekdayEdit;
