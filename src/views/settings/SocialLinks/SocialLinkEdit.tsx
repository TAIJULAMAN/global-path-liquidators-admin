import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SocialLinkEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [levelName, setLevelName] = useState("");
  const [socialName, setSocialName] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [status, setStatus] = useState("1");



  const handleSatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(String(e?.target?.value));
  };



  React.useEffect(() => {
    const getAllSociallink= async () => {
      const response = await fetch(
        `https://darktechteam.com/api/socialLinks/single_link/${id}`
      );
      const data = await response.json();

      if (data?.success) {
        setSocialName(data?.result?.social_name);
        setSocialLink(data?.result?.social_link);


        }
    };
    getAllSociallink();
    // }
  }, [id]);

  const handleCreateNew = () => {
    if (socialName !== "") {
      const apiUrl = `https://darktechteam.com/api/socialLinks/update_link/${id}`;
      axios
        .put(apiUrl, {
            social_name : socialName,
            social_link : socialLink,
            social_status : status,


        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/settings/social-links`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl my-4 font-bold text-natural-900">
        {" "}
        EDIT SOCIAL LINKS
      </h1>
      <div className="shadow-lg rounded-lg px-5 py-2 max-w-full">
        <form className="bg-white px-8 pt-6 pb-8 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Social Name
              </label>
              <Input
                placeholder="Social Name"
                className="mb-4 w-full"
                value={socialName}
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
                value={socialLink}
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

export default SocialLinkEdit;
