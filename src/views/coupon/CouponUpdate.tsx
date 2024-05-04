import { Button, Input } from "@/components/ui";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CouponUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [couponValuePerchantage, setCouponvaluePerchantage] = useState("");
  const [couponValueFlat, setCouponvalueFlat] = useState("");
  const [usesLimit, setUsesLimit] = useState("");
  const [couponStart, setCoupoStartDate] = useState("");
  const [couponEnd, setCoupoEndDate] = useState("");
  const [couponType, setCoupontype] = useState("");

  // console.log(
  //   couponCode,
  //   couponValuePerchantage,
  //   couponValueFlat,
  //   usesLimit,
  //   couponStart,
  //   couponEnd
  // );

  React.useEffect(() => {
    const getCoupon = async () => {
      const response = await fetch(
        `https://darktechteam.com/api/coupons/single/${id}`
      );
      const data = await response.json();
      if (data?.success) {
        setCouponCode(data?.result[0]?.code);
        setCoupontype(data?.result[0]?.coupon_type);
        setCouponvaluePerchantage(data?.result[0]?.percentage_amount);
        setCouponvalueFlat(data?.result[0]?.flat_amount);
        setCoupoStartDate(data?.result[0]?.valid_from);
        setCoupoEndDate(data?.result[0]?.valid_to);
        setUsesLimit(data?.result[0]?.usage_limit);
      }
    };
    getCoupon();
  }, [id]);
  const handleCreateNew = () => {
    if (couponCode !== "") {
      const apiUrl = `https://darktechteam.com/api/coupons/update/${id}`;
      axios
        .put(apiUrl, {
          code: couponCode,
          flat_amount: couponValueFlat,
          percentage_amount: couponValuePerchantage,
          valid_from: couponStart,
          valid_to: couponEnd,
        })
        .then((response) => {
          console.log("POST request successful");
          console.log("Response:", response.data);
        });
      navigate(`/generate-coupon`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl mb-10 font-bold text-natural-900 uppercase">
        {" "}
        COUPON EDIT
      </h1>
      <div className="shadow-lg rounded-lg px-0 py-0 lg:w-full max-w-full">
        <form className="bg-white dark:bg-gray-800 p-5">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="mb-2 ">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Coupon Code
              </label>

              <Input
                placeholder="Enter Coupon Code"
                className="w-full"
                value={couponCode}
                onChange={(e) => {
                  e.preventDefault();
                  setCouponCode(e.target.value);
                }}
              />
            </div>
            {couponType === "percentage_amount" && (
              <div className="mb-2">
                <label className="block text-natural-900 text-md font-semibold mb-2">
                  Coupon Value
                </label>

                <Input
                  placeholder="Enter Percentage Coupon Value"
                  className="w-full"
                  type="number"
                  value={couponValuePerchantage}
                  onChange={(e) => {
                    e.preventDefault();
                    setCouponvaluePerchantage(e.target.value);
                  }}
                />
              </div>
            )}

            {couponType === "flat_amount" && (
              <div className="mb-2">
                <label className="block text-natural-900 text-md font-semibold mb-2">
                  Coupon Value
                </label>

                <Input
                  placeholder="Enter Flat Coupon Value"
                  className="w-full"
                  value={couponValueFlat}
                  onChange={(e) => {
                    e.preventDefault();
                    setCouponvalueFlat(e.target.value);
                  }}
                />
              </div>
            )}
            <div className="mb-2">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Enter Usage limit
              </label>

              <Input
                placeholder="Enter Usage limit"
                className="w-full"
                value={usesLimit}
                type="number"
                onChange={(e) => {
                  e.preventDefault();
                  setUsesLimit(e.target.value);
                }}
              />
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="mb-4 ">
              <label className="block text-natural-900 text-md font-semibold mb-2">
                Coupon Start
              </label>

              <Input
                className="w-full"
                type="date"
                value={couponStart}
                onChange={(e) => {
                  e.preventDefault();
                  setCoupoStartDate(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-natural-700 text-md font-semibold mb-2">
                Coupon End
              </label>

              <Input
                className="w-full"
                type="date"
                value={couponEnd}
                onChange={(e) => {
                  e.preventDefault();
                  setCoupoEndDate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-center text-center items-center my-2">
            <Button
              variant="solid"
              onClick={(e) => {
                e.preventDefault();
                handleCreateNew();
              }}
            >
              CREATE COUPON
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponUpdate;
