import { useState } from "react";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import type { MouseEvent } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import Upload from "@/components/ui/Upload";
import axios from "axios";

const ExcelPopup = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [excelFile, setExcel] = useState<File | null>(null);
  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = (e: MouseEvent) => {
    console.log("onDialogClose", e);
    setIsOpen(false);
  };

  const onDialogOk = (e: MouseEvent) => {
    console.log("onDialogOk", e);
    setIsOpen(false);
  };

  // create-product-excel file upload
  const handleUploadExcellFile = async () => {
    try {
      const formData = new FormData();
      if (excelFile) {
        formData.append("excelsheet", excelFile);
      }

      const response = await axios.post(
        `https://darktechteam.com/api/products/upload-excelsheet`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("check", response);
      // const data = await response;
      console.log(response.data.result);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div>
      <Button variant="solid" onClick={() => openDialog()}>
        IMPORT
      </Button>
     
      <Dialog isOpen={dialogIsOpen} closable={false}>
        <h5 className="mb-4">Import Employee CSV file</h5>

        <div>
          <span>Download sample product CSV file</span>
          <Button variant="solid" onClick={onDialogOk} className="mx-4">
            Download
          </Button>
        </div>
        <div className="mx-4 my-10">
          <label className="ml-3" htmlFor="">
            Select Excel File
          </label>
          <input
            type="file"
            className="w-full mt-0 py-2 px-3 border-0 border-b-2 shadow-lg focus:outline-none"
            placeholder="Select Excel File"
            name="excelsheet"
            onChange={(e) => {
              e.preventDefault();
              if (e.target.files) setExcel(e.target?.files[0]);
            }}
          />
        </div>

        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            // type="submit"
            // loading={isSubmitting}
            onClick={onDialogOk}
          >
            Upload
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ExcelPopup;
