import { IconText } from "@/components/shared";
import { Avatar, Button, Card } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { HiMail, HiPhone } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import Timeline from "@/components/ui/Timeline";
import Badge from "@/components/ui/Badge";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Swal from "sweetalert2";
import axios from "axios";

type Bid = {
  id: string;
  first_name: string;
  last_name: string;
  productCode: string;
  billing_address: string;
  img: string;
  product_name: string;
  comment_id: string;
  shipping_address: number;
  total_amount: number;
  amount: number;
  product_image: string;
  email: string;
  bidStatus: string;
  created_at: string;
  phone_number: string;
  sent_by: string;
  ticketId: string;
  comment: string;
  details: Record<string, string[]>;
};
const ReplyTicket = () => {
  const { id } = useParams();
  const [ticketDetails, setTicketDetails] = useState<Bid[]>([]);
  const [ticketReply, setTicketreply] = useState("");
  const adminId = localStorage.getItem("adminId");
  // console.log(adminId);
  const userComments = ticketDetails.filter(
    (comment) => comment?.sent_by === "user"
  );
  const adminComments = ticketDetails.filter(
    (comment) => comment?.sent_by === "admin"
  );

  // console.log(userComments);
  // console.log(adminComments);

  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [ticketSubject, setTicketSubj] = useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    const getAllTicket = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/tickets/ticket/${id}`
      );
      const data = await response.json();

      setTicketSubj(data?.result?.ticket_subject);
      setRefetch(false);
    };
    getAllTicket();
  }, [refetch, id]);



   const handleAnswereUpdate = async () => {
    try {
      const apiUrl = `https://darktechteam.com/api/tickets/update/${id}`;
      const response = await axios.put(apiUrl, {
        is_answered: 1,

      });
      console.log("POST request successful");
      console.log("Response:", response.data);

    } catch (error) {
      console.error("Error:", error);
    }
  };
  




  const handleCreateCoupon = async () => {
    try {
      const ticket_id = id;
      const admin_id = adminId;
      const comment = ticketReply;
      const sent_by = "admin";

      const addData = {
        ticket_id,
        admin_id,
        comment,
        sent_by,

      };

      const response = await fetch(
        `https://darktechteam.com/api/ticket-comments/new-comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      const insertId = responseData.result?.insertId;
      if (insertId) {
        setRefetch(!refetch);
        handleAnswereUpdate(); // Toggle refetch state to trigger useEffect
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  useEffect(() => {
    const getTktData = async () => {
      try {
        const response = await fetch(
          `https://darktechteam.com/api/ticket-comments/ticket-comments/${id}`
        );
        const data = await response.json();
        setTicketDetails(data?.result);
      } catch (error) {
        console.error("Error fetching ticket comments:", error);
      }
    };

    getTktData();
  }, [id, refetch]);

  const handleTicketClose = async () => {
    try {
      const response = await fetch(
        `https://darktechteam.com/api/tickets/close-ticket/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        Swal.fire({
          icon: "success",
          // toast: true,
          title: "Ticket Close Successfully",
          // position: "top-end",
          showConfirmButton: true,
          // timer: 3000,
          // timerProgressBar: true,
        });
        navigate(`/tickets-open`);
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Ticket closed successfully
      // You can handle the success response here
    } catch (error) {
      console.error("Error closing ticket:", error);
      // Handle error
    }
  };

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let getDate = year + "-" + month + "-" + day;
    return getDate;
  }

  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className=" col-span-2">
          <div className="bg-white card p-3">
            <h4 className="mt-2 ">Ticket #{id}</h4>
            <h4 className="mt-0 ">Subject: {ticketSubject}</h4>
          </div>

          <div>
            {ticketDetails
              ?.sort((a, b) => b.comment.localeCompare(a.comment))
              ?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={
                    item?.sent_by === "admin" ? "text-right" : "text-left"
                  }
                >
                  {item?.sent_by === "admin" ? (
                    <div className="w-full mr-7 bg-[#26A69A] dark:bg-[#26A69A] text-white shadow rounded-e-md inline-block max-w-2/3 my-1">
                      <p className="py-2 px-4">{item?.comment}</p>
                      <span className="text-right">
                        <small>{formatDate(item?.ticket_issued)}</small>
                      </span>
                      <div className="text-right">
                        {/* <small onClick={()=>handleDownload(ticketDetails?.ticket_document)} className="text-[14px] text-blue-600 underline hover:text-blue-800 cursor-pointer mr-2">Attachment File</small><small className="text-[11px]">{formatDate(item?.ticket_issued)}</small> */}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full bg-[#42A5F5] dark:bg-[#42A5F5] shadow text-white rounded-s-md inline-block max-w-2/3 my-1">
                      <p className="py-2 px-4">{item?.comment}</p>
                      <div>
                        {/* <small onClick={()=>handleDownload(ticketDetails?.ticket_document)} className="text-[14px] text-blue-600 underline hover:text-blue-800 cursor-pointer mr-2">Attachment File</small><small className="text-[11px]">{formatDate(item?.ticket_issued)}</small> */}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="mt-3 p-2 bg-white">
            {/* <p>New Reply</p> */}
            <div className="text-md text-natural-900 font-semibold mb-2">
            New Reply
              </div>
            <div>
              <SunEditor
                height="200"
                setContents={ticketReply}
                onChange={(content) => setTicketreply(content)}
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
            <div className="flex mt-4 mb-3 text-center items-center justify-center">
              <Button
                variant="solid"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateCoupon();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>

        <div className="card">
          <Card>
            <div className="flex mt-2 text-end items-end justify-end">
              <button
                className="bg-[#E64A19] hover:bg-[#F4511E] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleTicketClose();
                }}
              >
                Close Ticket
              </button>
            </div>
            <div className="flex items-center">
              {/* <Avatar shape="circle" src={data?.img} /> */}
              <div className="ltr:ml-2 rtl:mr-2">
                <div className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                  <span className="font-semibold"> Ticket:#{id}</span>
                </div>
                {/* <span>
              <span className="font-semibold">{data?.previousOrder} </span>
              previous orders
            </span> */}
              </div>
            </div>

            <hr className="my-5" />
            <IconText
              className="mb-4"
              icon={<HiMail className="text-xl opacity-70" />}
            >
              <span className="font-semibold"> Ticket:#{id}</span>
            </IconText>
            <IconText icon={<HiPhone className="text-xl opacity-70" />}>
              <span className="font-semibold">
                {ticketDetails[0]?.comment_id}
              </span>
            </IconText>
            <hr className="my-5" />
            <h6 className="mb-4">UserName</h6>
            <address className="not-italic">
              <div className="mb-1">{ticketDetails[0]?.comment_id}</div>
            </address>
            <hr className="my-5" />
            <h6 className="mb-4">User Information</h6>
            <address className="not-italic">
              <div className="mb-1">{ticketDetails[0]?.comment_id}</div>
            </address>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReplyTicket;
