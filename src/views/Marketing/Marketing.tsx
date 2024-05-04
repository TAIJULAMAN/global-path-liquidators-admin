import { Input } from "@/components/ui";
import Tabs from "@/components/ui/Tabs";
import { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const { TabNav, TabList, TabContent } = Tabs;
import Button from "@/components/ui/Button";

const Marketing = () => {
  const [description, setDescription] = useState(
    "Write Your Description Here...."
  );
  return (
    <div>
      {/* header */}
      <h1 className="text-3xl font-bold mb-5 text-natural-900 uppercase">Send a Mass e-Mail</h1>

      {/* title field */}
      <div className="mb-4">
        <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
          Title
        </div>
        <Input placeholder="Enter Product Name " />
      </div>

      <div className="flex flex-col">
        <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
          Description
        </div>
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
        </div>
        <div className="mt-5 flex gap-2">
          <Button type="reset" onClick={() => setDescription("")}>
            Reset
          </Button>
          <Button
            variant="solid"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
