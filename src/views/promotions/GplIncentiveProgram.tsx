import Tabs from "@/components/ui/Tabs";
import { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const { TabNav, TabList, TabContent } = Tabs;
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui";

const GplIncentiveProgram = () => {
  const [description, setDescription] = useState("Write Description Here....");

  return (
    <div>
      <Tabs defaultValue="tab2">
        <TabList>
          <TabNav value="tab1">GPL Programs</TabNav>
          <TabNav value="tab2">Details</TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value="tab1">
            <div>
              <div className="mx-auto">
                {/* <!-- form part--> */}
                <div className="shadow-lg rounded-lg px-5 py-2  lg:w-full max-w-full">
                  <div className="mb-2 text-md text-natural-900 font-semibold dark:text-white">
                    Level
                  </div>
                  <Input className="mb-4" />

                  <div className="mb-2 text-md text-natural-900 font-semibold dark:text-white">
                    Lower Limit
                  </div>
                  <Input className="mb-4" />

                  <div className="mb-2 text-md text-natural-900 font-semibold dark:text-white">
                    Upper Limit
                  </div>
                  <Input className="mb-4" />

                  <div className="mb-2 text-md text-natural-900 font-semibold dark:text-white">
                    Reward Percentage
                  </div>
                  <Input className="mb-4" />

                 <div className="flex justify-center my-5">
                 <Button variant="solid" type="submit" className="mb-5">
                    Submit
                  </Button>
                 </div>
                </div>
                {/* table part */}
                <div className="inline-block min-w-full overflow-hidden my-5">
                  <table className="min-w-full border rounded-lg">
                    <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">
                      <tr>
                        {/* 1 */}
                        <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                        Level	
                        </th>
                        {/* 2 */}
                        <th className="px-2 font-bold text-white py-3 text-center text-xs uppercase">
                        Lower Limit	
                        </th>
                        {/* 3 */}
                        <th className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
                        Upper Limit	
                        </th>
                        {/* 4 */}
                        <th className="px-2 font-bold text-white py-3 text-center text-xs   uppercase">
                        Reward Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="item-center text-center justify-between">
                        {/* 1 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                            Bronze
                          </div>
                        </td>
                        {/* 2 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                            $0.00

                          </div>
                        </td>
                        {/* 3 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                            $7,000.00	
                          </div>
                        </td>
                        {/* 4 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                           0
                          </div>
                        </td>
                      </tr>
                      <tr className="item-center text-center justify-between">
                        {/* 1 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                            Bronze
                          </div>
                        </td>
                        {/* 2 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                            $0.00

                          </div>
                        </td>
                        {/* 3 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                            $7,000.00	
                          </div>
                        </td>
                        {/* 4 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                           0
                          </div>
                        </td>
                      </tr>
                      <tr className="item-center text-center justify-between">
                        {/* 1 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                            Bronze
                          </div>
                        </td>
                        {/* 2 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                            $0.00

                          </div>
                        </td>
                        {/* 3 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                            $7,000.00	
                          </div>
                        </td>
                        {/* 4 */}
                        <td className="px-6 py-2 whitespace-no-wrap border-b-2 border-gray-300">
                          <div className="text-sm leading-5 text-gray-800">
                            {" "}
                           0
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabContent>
          <TabContent value="tab2">
            <div>
              <SunEditor
                height="300"
                setContents={description}
                setDefaultStyle="font-family: 'Georgia', sans-serif; font-size: 20px;"
                onChange={(content) => setDescription(content)}
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
              <div className="my-5 flex gap-2">
                <Button type="reset" onClick={() => setDescription("")}>
                  Reset
                </Button>
                <Button
                  variant="solid"
                  type="submit"
                  // loading={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </div>
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
};

export default GplIncentiveProgram;
