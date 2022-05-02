import React from "react";
import { useState, useEffect } from "react";
import Header from "../content/component/Header";
import Pic from "../Assets/5fb952383d4b9b0cc0fd7d2e_800x0xcover_3aaaqsST.jpg";
import Checkrigis from "../content/Addmin/Checkregis";
import CheckPayment from "../content/Addmin/CheckPayment";
import Tracking from "../content/Addmin/Tracking";
import axios from "axios";

function Account_admin() {
  const [toggleState, setToggleState] = useState(1);
  const [dataPayment, setDataPayment] = useState([]);
  const [dataSeller, setDataseller] = useState([]);
  const [dataTracking, setDataTracking] = useState([]);
  const [haveData,setHavedata] =useState(true);
  const [editMode, setEditMode] = useState(false);
  const changeTofalse = () => {
    setEditMode(false);
  };
  const admin_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluMTAxIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjUxNDcwOTk4LCJleHAiOjE2NTE1MDY5OTh9.a-N7lJMOtwBAQyULIcJdlXM5RGCZaiq3ID5HWD0WXJ8";
  const URl ="http://b169-2403-6200-88a4-4c62-9496-55ba-1f0c-4d43.ngrok.io/"
  // console.log(editMode);

  function getProfileAdmin() {
    axios
      .get(
       "http://b169-2403-6200-88a4-4c62-9496-55ba-1f0c-4d43.ngrok.io/getOrderPayment/"+admin_token
      )
      .then(function (response) {
        // handle success
        if (response.data.status == "200OK") {
          setDataPayment(response.data.orderPayment);
          setHavedata(true);

          console.log(dataPayment);
        } else if (response.data.status == "200NF") {
          //not found in order status Audit Payment
          setHavedata(false);
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function getSellerinfo() {
    axios
      .get(
        "http://b169-2403-6200-88a4-4c62-9496-55ba-1f0c-4d43.ngrok.io/getSellerIdentity/" +admin_token
      )
      .then(function (response) {
        // handle success
        if (response.data.status == "200OK") {
          setDataseller(response.data.sellerAccount);

          console.log(dataSeller);
        } else if (response.data.status == "200NF") {
          //not found in order status Audit Payment
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function getTrackinginfo() {
    axios
      .get("http://b169-2403-6200-88a4-4c62-9496-55ba-1f0c-4d43.ngrok.io/getCommon/" + admin_token)
      .then(function (response) {
        // handle success
        if (response.data.status == "200OK") {
          setDataTracking(response.data.data);

          // console.log(dataSeller)
        } else if (response.data.status == "200NF") {
          //not found in order status Audit Payment
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    getProfileAdmin();
    getSellerinfo();
    getTrackinginfo();
  }, []);

  const toggleTab = (index) => {
    console.log(index);
    setToggleState(index);
  };

  console.log(haveData)
  return (
    <>
    
      <div class="h-screen flex justify-center  bg-[#FFE5A3] overflow-hidden	 font-prompt ">
        <div
          class="flex flex-col p-8 m-8 bg-white  xl:w-[820px] 
     md:w-[700px] min-w-[650px] h-[800px] shadow-xl "
        >
          <h1 class="text-xl text-[#E54E3D] font-black ml-6">บัญชีของคุณ</h1>
          <Header name={"แอดมิน123"} undername={"แอดมิน"} picture={Pic} />
          <div class="flex">
            <div class=" min-w-[160px] h-[590px] border-r">
              <div
                class={`mt-4 cursor-pointer ${
                  toggleState === 1
                    ? "bg-red-100 border-l-4 border-[#E54E3D]"
                    : ""
                } hover:bg-red-100 h-[40px]`}
                onClick={() => {
                  toggleTab(1);
                }}
              >
                <p class="pt-2 pl-4">การลงทะเบียน</p>
              </div>

              <div
                class={`cursor-pointer ${
                  toggleState === 2
                    ? "bg-red-100 border-l-4 border-[#E54E3D]"
                    : ""
                } hover:bg-red-100 h-[40px]`}
                onClick={() => {
                  toggleTab(2);
                }}
              >
                <p class="pt-2 pl-4">ตรวจสอบการชำระ</p>
              </div>

              <div
                class={`cursor-pointer ${
                  toggleState === 3
                    ? "bg-red-100 border-l-4 border-[#E54E3D]"
                    : ""
                } hover:bg-red-100 h-[40px]`}
                onClick={() => {
                  toggleTab(3);
                }}
              >
                <p class="pt-2 pl-4">แจ้งเลขพัสดุ</p>
              </div>
            </div>
            <div class="p-7 ">
              <div class={toggleState === 1 ? "" : "hidden"}>
                <Checkrigis data={dataSeller} />
              </div>

              <div class={toggleState === 2 ? "flex-initial	" : "hidden"}>
                <CheckPayment data={dataPayment} checkData={haveData} />
              </div>

              <div class={toggleState === 3 ? "" : "hidden"}>
                <Tracking data={dataTracking} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account_admin;
