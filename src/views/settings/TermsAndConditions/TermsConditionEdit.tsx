import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const TermsConditionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [terms, setTerm] = useState("");
  const [socialName, setSocialName] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [status, setStatus] = useState("1");



  const handleSatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(String(e?.target?.value));
  };



  React.useEffect(() => {
    const getAllSociallink= async () => {
      const response = await fetch(
        `https://darktechteam.com/api/termsConditions/single/${id}`
      );
      const data = await response.json();

      if (data?.success) {
        setTerm(data?.result[0]?.term);



        }
    };
    getAllSociallink();
    // }
  }, [id]);

  const handleCreateNew = () => {
    if (terms !== "") {
      const apiUrl = `https://darktechteam.com/api/termsConditions/update/${id}`;
      axios
        .put(apiUrl, {
            term : terms,
            termStatus : status,


        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/settings/terms-conditions`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl my-4 font-bold text-natural-900">
        {" "}
        EDIT TERMS & CONDITIONS
      </h1>
      <div className="shadow-lg rounded-lg px-5 py-2 max-w-full">
        <form className="bg-white px-8 pt-6 pb-8 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Term
              </label>
   

                <div>
                  <SunEditor
                    height="200"
                    setContents={terms}
                    onChange={(content) => setTerm(content)}
                    setOptions={{
                      buttonList: [
                        ["undo", "redo"],
                        ["bold", "underline", "italic", "strike"],
                        ["font", "fontSize", "formatBlock"],
                        ["paragraphStyle", "blockquote"],
                        ["fontColor", "hiliteColor"],
                        ["removeFormat"],
                        "/", // Line break
                        ["outdent", "indent"],
                        ["align", "horizontalRule", "list", "lineHeight"],
                        ["table", "link", "image", "video", "audio"],
                        ["fullScreen", "showBlocks", "codeView"],
                        ["preview", "print"],
                      ],
                    }}
                  />
                </div>




            </div>
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

export default TermsConditionEdit;
