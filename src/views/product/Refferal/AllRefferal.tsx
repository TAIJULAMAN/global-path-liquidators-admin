import { FaEdit } from "react-icons/fa";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Input } from "@/components/ui";

export type reff = {
    referral_id: number;
    referrer_user_id: string;
    referred_user_id: string;
    total_payout: string;
    ref_bonus: string;

};

const AllRefferal = () => {
  const [allReffaral, setAllReferral] = useState<Array<reff>>([]);
  const [reffaralBounus, setRefferalBonus] = useState("");
  const [lower_limits, setLowerLimit] = useState("");
  const [lastupdated, setLastupdated] = useState("");
  const [totalPayout, setTotalPayout] = useState("");
  const [refbonusid, setRefbonusId] = useState("");


  const [refetch, setRefetch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEditInsentiveDay = (id: number) => {
    navigate(`/edit-all-insentive-level/${id}`);
  };


  const formatAsMMDDYYYYy = (dateString: string | number | Date) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(dateObj.getDate()).padStart(2, "0"); // Add leading zero if needed
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };

  React.useEffect(() => {
    const getAllReff = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/referrals/all`
      );
      const data = await response.json();
      setAllReferral(data?.result);
      setRefetch(false);
    };
    getAllReff();
  }, [refetch]);


  React.useEffect(() => {
    const getrefbonus = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/refBonus/get_ref_bonus`
      );
      const data = await response.json();
   
      if (data?.success) {
        setRefferalBonus(data?.result?.ref_bonus_amount);
        setTotalPayout(data?.result?.total_ref_payout);
        setLastupdated(data?.result?.updated_at);
        setRefbonusId(data?.result?.ref_bonus_id);
      }
    };
    getrefbonus();
    // }
  }, [refetch]);





  const handleUpdate = () => {
    if (reffaralBounus !== "") {
      const apiUrl = `https://darktechteam.com/api/refBonus/update_ref_bonus/${refbonusid}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ref_bonus_amount: reffaralBounus,
          total_ref_payout: totalPayout,
        }),
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
          title: "Referral Bonus Updated Successfully",
          showConfirmButton: true,
        });
        setRefetch(true);
      })
      
      .catch(error => {
        console.error("Error updating:", error);
        alert("Failed to update. Please try again.");
      });
    }
  
  };
  
  


  return (
    <div>
      <h1 className="text-3xl my-5 font-bold text-natural-900">
      Referral Program
      </h1>

      <div className=" shadow-xl rounded-lg px-0 py-0 lg:w-ful max-w-full">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Referral Bonus
              </label>
              <Input
                placeholder="Referral Bonus"
                className="mb-4 w-full"
                value={reffaralBounus}
                onChange={(e) => {
                  e.preventDefault();
                  setRefferalBonus(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Total Payout
              </label>
              <Input
                placeholder="Total Payout"
                className="mb-4 w-full"
                value={totalPayout}
                onChange={(e) => {
                  e.preventDefault();
                  setTotalPayout(e.target.value);
                }}
              />
            </div>
       
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Updated
              </label>
              <Input
                placeholder="Last Updated"
                className="mb-4 w-full"
                value={formatAsMMDDYYYYy(lastupdated)}
                disabled
                onChange={(e) => {
                  e.preventDefault();
                  setLastupdated(e.target.value);
                }}
              />
            </div>
       
          </div>
          <div className="flex text-center items-center justify-center my-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
             UPDATE
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
                #REFF ID
                </th>
                <th scope="col" className="text-center px-6 py-3">
                REFEREE
                </th>
                <th scope="col" className="text-center px-6 py-3">
                REFEREER
                </th>
                <th scope="col" className="text-center px-6 py-3">
              TOTAL PAYOUT
                </th>
                <th scope="col" className="text-center px-6 py-3">
                REF BONUS
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allReffaral?.length > 0 &&
                allReffaral?.map((reff, key) => {
                  return (
                    <tr key={key} className="bg-white border dark:bg-gray-800">
            
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {reff?.referral_id}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        #{reff?.referrer_user_id}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-[#004D40]  dark:text-white"
                      >
                  #{reff?.referred_user_id}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-[#004D40]  dark:text-white"
                      >
                         ${reff?.total_payout}
                      </td>
                      <td
                    scope="row"
                    className="px-6 py-4 text-center font-medium text-[#004D40] dark:text-white"
                    >
                    <span className="bg-[#80D8FF] text-dark px-5 py-2 rounded">
                        ${reff?.ref_bonus}
                    </span>
                    </td>

                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                          // onClick={() => handleEditInsentiveDay(reff?.referral_id)}
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   handleRemove(reff?.referral_id);
                          // }}
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

export default AllRefferal;
