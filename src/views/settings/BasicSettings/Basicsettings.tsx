import { Input } from '@/components/ui';
import React, { useState } from 'react';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Swal from 'sweetalert2';
export type settings = {
    referral_id: number;
    referrer_user_id: string;
    referred_user_id: string;
    total_payout: string;
    ref_bonus: string;

};
const Basicsettings = () => {
    const [gpllogo, setgPLLOGO] = useState<File | null>(null);
    const [aboutImage, setAboutImage] = useState<File | null>(null);
    const [merchdizeAgreeement, setMerchandiseagreement] = useState("");
    const [aboutinfo, setAboutinfo] = useState("");
    const [whygpl, setWhygpl] = useState("");
    const [gplID, setGplid] = useState("");
    

    const [allsettings, setAllSettings] = useState<Array<settings>>([]);
    const [refetch, setRefetch] = useState(false);


    React.useEffect(() => {
        const getallsett= async () => {
          const response = await fetch(
            `https://darktechteam.com/api/settings/get-settings`
          );
          const data = await response.json();
       
          if (data?.success) {
            setAboutinfo(data?.result[0]?.about_us);
            setWhygpl(data?.result[0]?.why_gpl);
            setMerchandiseagreement(data?.result[0]?.merchandise_agreement);
            setgPLLOGO(data?.result[0]?.gpl_logo);
            setAboutImage(data?.result[0]?.about_img);
            setGplid(data?.result[0]?.gpl_settings_id);
          }
        };
        getallsett();
        // }
      }, [refetch]);

      const handleUpdate = async () => {
        try {
          const formData = new FormData();
          formData.append("about_us", String(aboutinfo));
          formData.append("why_gpl", String(whygpl));
          formData.append("merchandise_agreement", String(merchdizeAgreeement));
      
          if (gpllogo) {
            formData.append("logo", gpllogo);
          }
          if (aboutImage) {
            formData.append("about_img", aboutImage);
          }
          const response = await fetch(
            `https://darktechteam.com/api/settings/upload-settings/${gplID}`,
            {
              method: "PUT", // Change method to "PUT" here
              body: formData,
            }
          );
      
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
      
          const responseData = await response.json();
      
        
          if (responseData.success === true) {
            Swal.fire({
              icon: "success",
              // toast: true,
              title: "Setting updated Successfully",
              // position: "top-end",
              showConfirmButton: true,
              // timer: 3000,
              // timerProgressBar: true,
              
            });
            setRefetch(true);
          }
        } catch (error) {
          console.error("Error uploading product:", error);
        }
      };
      



    return (
        <div>
        <div>
            <div className="text-xl text-natural-900 font-bold my-1">
             GPL SETTING 
            </div>

            <form className="border rounded p-5 dark:border-gray-600">
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="">
              <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
               GPL LOGO
              </div>
              <input
                type="file"
                className="p-2 border rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                // onBlur={props.handleBlur}
                placeholder="Enter GPL image"
                // value={props.values.name}
                name="image"
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.files) setgPLLOGO(e.target?.files[0]);
                }}
              />
            </div>
            <div className="">
              <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
               ABOUT LOGO
              </div>
              <input
                type="file"
                className="p-2 border rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                // onBlur={props.handleBlur}
                placeholder="Enter About image"
                // value={props.values.name}
                name="image"
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.files) setAboutImage(e.target?.files[0]);
                }}
              />
            </div>
              </div>

              <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <div className="text-md text-natural-900 font-semibold mt-4 mb-2 dark:text-white">
                Merchandise Agreement
                </div>
                <div>
                  <SunEditor
                    height="120"
                    setContents={merchdizeAgreeement}
                    onChange={(content) => setMerchandiseagreement(content)}
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
              <div>
                <div className="text-md text-natural-900 font-semibold mt-4 mb-2 dark:text-white">
                About Information
                </div>
                <div>
                  <SunEditor
                    height="120"
                    setContents={aboutinfo}
                    onChange={(content) => setAboutinfo(content)}
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
              </div>
              <div>
                <div className="text-md text-natural-900 font-semibold mt-4 mb-2 dark:text-white">
                Why GPL
                </div>
                <div>
                  <SunEditor
                    height="120"
                    setContents={whygpl}
                    onChange={(content) => setWhygpl(content)}
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

              <div className="flex mt-4 text-center items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                GPL LOGO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                ABOUT LOGO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                ABOUT INFO
                </th>
                <th scope="col" className="text-center px-6 py-3">
                 MERCHANDISE AGREEMENT
                </th>
                <th scope="col" className="text-center px-6 py-3">
                WHY GPL
                </th>
          
              </tr>
            </thead>
            <tbody>

                    <tr className="bg-white border dark:bg-gray-800">
            
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                                className="ml-4 w-16 h-12 rounded"
                                src={`https://darktechteam.com/api/${gpllogo}`}
                                alt=""
                              />
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                                className="ml-4 w-16 h-12 rounded"
                                src={`https://darktechteam.com/api/${aboutImage}`}
                                alt=""
                              />
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-[#004D40]  dark:text-white"
                      >
                      
                       <p className="py-2" dangerouslySetInnerHTML={{ __html:aboutinfo }}></p>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-[#004D40]  dark:text-white"
                      >
                        <p className="py-2" dangerouslySetInnerHTML={{ __html:merchdizeAgreeement }}></p>
                      </td>
                      <td
                    scope="row"
                    className="px-6 py-4 text-center font-medium text-[#004D40] dark:text-white"
                    >
                  <p className="py-2" dangerouslySetInnerHTML={{ __html:whygpl }}></p>

                    </td>

                    </tr>
               
            </tbody>
          </table>
        </div>
      </div>



        </div>
    );
};

export default Basicsettings;