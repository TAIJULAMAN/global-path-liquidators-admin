import { FaEdit } from "react-icons/fa";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Input } from "@/components/ui";

export type faq = {
  faq_id: number;
  question: string;
  answer: string;
  social_status: string;
 level_discount: string;
  cat_id: number;
};

const Faq = () => {
  const [allFaq, setAllfaq] = useState<Array<faq>>([]);
  const [questions, setQuestion] = useState("");
  const [answere, setAnswere] = useState("");
  const [status, setStatus] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEditFaq = (id: number) => {
    navigate(`/settings/faq/edit/${id}`);
  };
  const handleSatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(String(e?.target?.value));
  };

  React.useEffect(() => {
    const getAllFaq = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/FAQ/all_faqs`
      );
      const data = await response.json();
      setAllfaq(data?.result);
      setRefetch(false);
    };
    getAllFaq();
  }, [refetch]);

  const handleCreateNew = async () => {
    try {
      if (questions !== "") {
        const question = questions;
        const answer = answere;

        const response = await fetch(
          `https://darktechteam.com/api/FAQ/new_faq`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // specify content type
            },
            body: JSON.stringify({ question,answer }), // convert object to JSON string
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
            title: "FAQ Added Successfully",
            showConfirmButton: true,
          });
        }
        setAnswere("")
        setQuestion("")
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const handleRemove = (id: number) => {
    Swal.fire({
      title: "Do you want delete this FAQ?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes,delete it!",
      cancelButtonText: "No,cancel!",
    }).then((result) => {
      {
        if (result.isConfirmed) {
          const apiUrl = `https://darktechteam.com/api/FAQ/delete_faq/${id}`;
          axios.delete(apiUrl).then((response) => {
            console.log("DELETE request successful");
            console.log("Response:", response.data);
            alert("FAQ Deleted successfully");
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
       Frequently Asked Questions
      </h1>

      <div className=" shadow-lg rounded-lg px-0 py-0 lg:w-ful max-w-full">
        <form className="bg-white px-8 pt-2 pb-8 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Question
              </label>
              <Input
                placeholder="Question"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setQuestion(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Answere
              </label>
              <Input
                placeholder="Answere"
                className="mb-4 w-full"
                onChange={(e) => {
                  e.preventDefault();
                  setAnswere(e.target.value);
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
                handleCreateNew();
              }}
            >
              CREATE FAQ
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
                QUESTION
                </th>
                <th scope="col" className="text-center px-6 py-3">
                ANSWERE
                </th>
             
            
                <th scope="col" className="text-center px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allFaq?.length > 0 &&
                allFaq?.map((faq, key) => {
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
                        {faq?.question}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {faq?.answer}
                      </td>
                 
              
                      <td className="px-6 flex py-4 justify-center text-[30px] text-indigo-400">
                        <FaEdit
                          onClick={() => handleEditFaq(faq?.faq_id)}
                        />
                        <AiOutlineDelete
                          className="text-[30px] ml-8 text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(faq?.faq_id);
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

export default Faq;
