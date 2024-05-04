// import { Input } from "@/components/ui";
// import Tabs from "@/components/ui/Tabs";
// import { useState } from "react";
// import Button from '@/components/ui/Button'
// import SunEditor from "suneditor-react";
// import "suneditor/dist/css/suneditor.min.css";

// const { TabNav, TabList, TabContent } = Tabs;
// const NewsLeter = () => {
//   const [description, setDescription] = useState("taka de");
//   return (
//     <div className="w-3/4 p-4 mx-auto">
//         {/* header */}
//       <div className="my-10">
//         <h1 className="text-start">Send a Mass e-Mail</h1>
//       </div>
//       {/* title field */}
//       <div >
//         <div className="text-lg text-natural-900 font-semibold mb-2 dark:text-white">
//           Title
//         </div>
//         <Input placeholder="Enter Product Name" />
//       </div>
//       <div className="flex flex-col gap-4 my-5">

//       <div className="text-lg text-natural-900 font-semibold mb-2 dark:text-white">
//          Write your message here
//         </div>
//         <div className="">
//           <SunEditor
//             height="200"
//             setContents={description}
//             onChange={(content) => setDescription(content)}
//             setOptions={{
//               buttonList: [
//                 ["undo", "redo"],
//                 ["bold", "underline", "italic", "strike"],
//                 ["font", "fontSize", "formatBlock"],
//                 ["paragraphStyle", "blockquote"],
//                 ["fontColor", "hiliteColor"],
//                 ["removeFormat"],
//                 "/", // Line break
//                 ["outdent", "indent"],
//                 ["align", "horizontalRule", "list", "lineHeight"],
//                 ["table", "link", "image", "video", "audio"],
//                 ["fullScreen", "showBlocks", "codeView"],
//                 ["preview", "print"],
//               ],
//             }}
//           />
//         </div>
//         <div className="my-5 flex gap-2">
//                     <Button
//                         type="reset"
//                         onClick={() => setDescription('')}
//                     >
//                         Reset
//                     </Button>
//                     <Button
//                         variant="solid"
//                         type="submit"
//                     // loading={isSubmitting}
//                     >
//                         Submit
//                     </Button>
//                 </div>
//       </div>
//     </div>
//   );
// };

// export default NewsLeter;

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Input } from "@/components/ui";

const NewsLeter = () => {
  const [description, setDescription] = useState("Write Your Message Here");
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">Send A Mass Email</h1>
      </div>
      <div className="mb-5">
        <div className=" my-5 text-lg text-natural-900 font-semibold mb-2 dark:text-white">
          Title
        </div>
        <Input placeholder="Enter Product Name" />
      </div>

      <div>
        <SunEditor
          height="200"
          setContents={description}
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
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLeter;
