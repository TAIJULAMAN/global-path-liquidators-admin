import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestion] = useState("");
  const [answere, setAnswere] = useState("");
  const [status, setStatus] = useState("");
  const [refetch, setRefetch] = useState(false);


  const handleSatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(String(e?.target?.value));
  };



  React.useEffect(() => {
    const getAllFaq= async () => {
      const response = await fetch(
        `https://darktechteam.com/api/FAQ/faq_info/${id}`
      );
      const data = await response.json();

      if (data?.success) {
        setAnswere(data?.result?.answer);
        setQuestion(data?.result?.question);


        }
    };
    getAllFaq();
    // }
  }, [id]);

  const handleCreateNew = () => {
    if (answere !== "") {
      const apiUrl = `https://darktechteam.com/api/FAQ/update_faq/${id}`;
      axios
        .put(apiUrl, {
            question : questions,
            answer : answere,

        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/settings/faq`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl my-4 font-bold text-natural-900">
        {" "}
        EDIT FAQ
      </h1>
      <div className="shadow-lg rounded-lg px-5 py-2 max-w-full">
        <form className="bg-white px-8 pt-6 pb-8 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Question
              </label>
              <Input
                placeholder="Question"
                className="mb-4 w-full"
                value={questions}
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
                value={answere}
                onChange={(e) => {
                  e.preventDefault();
                  setAnswere(e.target.value);
                }}
              />
            </div>
       
          </div>
  

          <div className="flex mt-5 text-center items-center justify-center">
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

export default UpdateFaq;
