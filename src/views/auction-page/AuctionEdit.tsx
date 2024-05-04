import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@/components/ui/Input";
import axios from "axios";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Button } from "@/components/ui";
const UpdateBinStoreProduct = () => {
  const { id } = useParams();
  const [auctionData, setAuction] = useState([""]);
  const [isChecked, setIsChecked] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [title, setTitle] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [status, setStatus] = useState("");
  const [day, setDay] = useState("");
  const [currentBid, setCurrentBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [auctionDescription, setAuctionDescription] = useState("");

  const navigate = useNavigate();
  React.useEffect(() => {
    const getBinProduct = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/auctions/getSingleAuctionProducts/${id}`
      );
      const data = await response.json();
      if (data?.success) {
        setAuction(data?.result);
        setStartPrice(data?.result?.Starting_Price);
        setTitle(data?.result?.Title);
        setCurrentBid(data?.result?.Current_Bid);
        setStartTime(data?.result?.Start_Time);
        setEndTime(data?.result?.End_Time);
        setAuctionDescription(data?.result?.Description);
        setIsChecked(data?.result?.Status === "active" ? true : false);
      }
    };
    getBinProduct();
    // }
  }, []);
  const handleDay = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDay(e.target.value);
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); 
    if (!event.target.checked) {
    }
  };
  const handleUpdate = () => {
    if (startPrice !== "") {
      const apiUrl = `https://darktechteam.com/api/auctions/update-item/${id}`;
      axios
        .put(apiUrl, {
          Title: title,
          Starting_Price: startPrice,
          Description: auctionDescription,
          Current_Bid: currentBid,
          Start_Time: startTime,
          End_Time: endTime,
          Status: isChecked ? "active" : "inactive",
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/auction-page`);
    }
  };

  return (
    <div>
      <div className="text-3xl text-natural-900 font-bold mb-5 uppercase">
        Update Auction Product
      </div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <div className="text-md text-natural-900 font-semibold mb-2">
            Starting Price
          </div>

          <Input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-natural-900 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Starting Price"
            value={startPrice}
            onChange={(e) => {
              e.preventDefault();
              setStartPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="text-md text-natural-900 font-semibold mb-2">
            Product Title
          </div>

          <Input
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-natural-900 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="text-md text-natural-900 font-semibold mb-2">
            Current Bid
          </div>

          <Input
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-natural-900 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Current Bid"
            value={currentBid}
            onChange={(e) => {
              e.preventDefault();
              setCurrentBid(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="text-md text-natural-900 font-semibold mb-2">
            Start Time
          </div>
          <Input
            placeholder="Start Time"
            type="date"
            value={startTime}
            onChange={(e) => {
              e.preventDefault();
              setStartTime(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="text-md text-natural-900 font-semibold mb-2">
            End Time
          </div>
          <Input
            placeholder="Start Time"
            type="date"
            value={endTime}
            onChange={(e) => {
              e.preventDefault();
              setEndTime(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <div>
            <div className="mt-2 text-md text-natural-900 font-semibold mb-2">
              Auction Description
            </div>
            <div>
              <SunEditor
                height="200"
                setContents={auctionDescription}
                onChange={(content) => setAuctionDescription(content)}
                setOptions={{
                  buttonList: [
                    ["undo", "redo"],
                    ["bold", "underline", "italic", "strike"],
                    ["font", "fontSize", "formatBlock"],
                    ["paragraphStyle", "blockquote"],
                    ["fontColor", "hiliteColor"],
                    ["removeFormat"],
                    "/",
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
        </div>
        <div className="my-4 flex gap-2">
          <input
            type="checkbox"
            name="enable_setup_cost"
            className="rounded-full inline-block"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label className="text-natural-900 text-sm font-semibold block">
            Auction Status : {isChecked ? "Active" : "Inactive"}
          </label>
        </div>
        <div className="flex mb-5 mt-1 text-center items-center justify-center">
          <Button
           variant="solid" 
           onClick={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
           >
        UPDATE AUCTION PRODUCT
      </Button>
        </div>
    </div>
  );
};

export default UpdateBinStoreProduct;
