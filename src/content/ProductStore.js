import React, { useEffect, useState, useRef } from "react";
import AcceptDel from "./component/AcceptDel";
import axios from "axios";

function ProductStore({ token }) {
  const [dataProduct, setDataProduct] = useState([]);
  const [dialog, setDialog] = useState({
    msg: "",
    isShow: false,
  });

  const [sellerID, setSellerID] = useState("");
  const [lot, setLot] = useState("");
  const [draw, setDraw] = useState("");
  const [drawDate, setDrawdate] = useState("");
  const [pack, setPack] = useState("");
  // const [number, setNumber] = useState("");

  const numProduct = useRef();

  function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  // function getlottery_m() {
  //   axios
  //     .get(
  //       "http://b169-2403-6200-88a4-4c62-9496-55ba-1f0c-4d43.ngrok.io/getLotteryForSeller/" +
  //         token
  //     )

  //     .then(function (response) {
  //       console.log(response);
  //       console.log("dataproduct",response.data.lottery);
  //       if (response.data.status == "200OK") {
  //         setDataProduct(response.data.lottery);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  function getlotto_m() {
    axios
      .get(
        "http://b169-2403-6200-88a4-4c62-9496-55ba-1f0c-4d43.ngrok.io/getLotteryForSeller/" +
          token
      )

      .then(function (response) {
        console.log(response.data);
        if (response.data.status == "200OK") {
          setDataProduct(response.data.lottery);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function del_lottery() {
    axios
      .delete("http://b169-2403-6200-88a4-4c62-9496-55ba-1f0c-4d43.ngrok.io/deleteLottery",
       {data:{
        token: token,
        Number_lottery: numProduct.current,
        SID: sellerID,
        Lot: lot,
        Draw: draw,
        DrawDate: drawDate,
        pack: pack
        
      }})
      .then(function (response) {
        console.log(response);
        console.log("dataDel",{token: token,
          Number_lottery: numProduct.current,
          SID: sellerID,
          Lot: lot,
          Draw: draw,
          DrawDate: drawDate,
          pack: pack})
        // console.log(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    // getlottery_m();
    getlotto_m();
  }, []);

  const handleDelete = (num, id, lot, draw, drawDate, pack) => {
    setDialog({
      msg: "คุณยืนยันจะลบหรือไม่?",
      isShow: true,
    });

    setSellerID(id);
    setLot(lot);
    setDraw(draw);
    setDrawdate(drawDate);
    setPack(pack);
    numProduct.current = num;

    console.log(
      "del data",
      numProduct.current,
      sellerID,
      lot,
      draw,
      drawDate,
      pack
    );
  };

  const conFirmtodel = (c) => {
    if (c == true) {
      // setDataProduct(dataProduct.filter((p) => p.num !== numProduct.current));
      del_lottery();
      setDialog({
        msg: "คุณยืนยันจะลบหรือไม่?",
        isShow: false,
      });
      console.log("del it!!!");
    } else {
      setDialog({
        msg: "คุณยืนยันจะลบหรือไม่?",
        isShow: false,
      });
    }
  };

  console.log(
    "DATAs",
    dataProduct.filter((p) => p.Status !== "reserved")
  );
  return (
    <>
      {/* bg-[#D4FAAF]  */}
      <div class="grid grid-cols-2  ">
      <h1 class="mb-5  text-2xl font-semibold	 ">
        สินค้าภายในร้าน  
      </h1>
      
      <h2 class="m-1 ml-5  text-xl justify-self-end">ทั้งหมด {dataProduct.length} รายการ  </h2>
      </div>
      <div class=" flex justify-center items-center bg-white  font-prompt">
        <div class="overflow-x-auto  2xl:w-[560px] xl:w-[450px] sm:w-[400px] h-[420px]">
          <table class="w-full ">
            <thead class=" border-b border-t border-[#E54E3D]">
              <tr>
                {/* <th class="w-32 p-2 text-sm tracking-wider font-medium text-center">ชื่อร้านค้า</th> */}
                <th class=" p-2 text-sm tracking-wider font-medium text-center">
                  เลขสลาก
                </th>
                <th class="w-30 p-2 text-sm tracking-wider font-medium text-center">
                  ประเภท
                </th>
                <th class=" p-2 text-sm tracking-wider font-medium text-center">
                  เพิ่มเติม
                </th>
                <th class="w-30 p-2 text-sm tracking-wider font-medium text-center">
                  สถานะ
                </th>
                <th class="w-30  p-2 text-sm tracking-wider font-medium text-center">
                  จัดการ
                </th>
              </tr>
            </thead>
            {/* {dataProduct.map((data,i)=>(i))} */}
            {dataProduct.map((data) => (
              <tbody class="divide-y border-b border-t border-[#E54E3D]">
                <tr class=" border-b  border-[#E54E3D]">
                  <td class="p-3 text-sm font-light whitespace-nowrap text-center">
                    {data.Number}{" "}
                  </td>
                  <td class="p-3 text-sm font-light whitespace-nowrap text-center">
                    <span
                      class={`p-1.5 text-xs ${
                        data.pack == "Y" ? "bg-[#D4FAAF] " : "bg-[#D3FAFA]"
                      } rounded-full`}
                    >
                      {data.pack == "Y" ? "สลากชุด" : "สลากเดี่ยว"}
                    </span>
                  </td>
                  <td class="p-3 text-sm font-light whitespace-nowrap text-center">
                    {data.pack == "Y" ? (
                      <div class="">
                        <p class="flex justify-center">
                          งวดที่ :
                          {[...Array(Number(data.Draw.length))].map((_, i) => (
                            <p>{data.Draw[i].replace("|", ",")} </p>
                          ))}
                        </p>
                        <p class="flex justify-center">
                          ชุดที่ :
                          {[...Array(Number(data.Lot.length))].map((_, i) => (
                            <p>{data.Lot[i].replace("|", ",")} </p>
                          ))}
                        </p>
                      </div>
                    ) : (
                      <div class="flex flex-col">
                        <p>งวดที่ : {data.Draw}</p>
                        <p>ชุดที่ : {data.Lot}</p>
                      </div>
                    )}
                  </td>
                  <td>
                    <p class={`text-sm font-light whitespace-nowrap ${data.Status =="Available"?"text-green-500":data.Status =="reserved"?"text-gray-500" :"text-red-500" } `}>
                      {data.Status == "Available"
                        ? "วางจำหน่าย"
                        : data.Status == "reserved"
                        ? "รอตรวจสอบ"
                        : "ขายแล้ว"}
                    </p>
                  </td>
                  {data.Status == "Available" ? (
                    <td class="p-3 text-sm font-light whitespace-nowrap text-center">
                      <button
                        class=" bg-[#E54E3D] text-white font-light p-2 text-center"
                        onClick={() =>
                          handleDelete(
                            data.Number,
                            data.SID,
                            data.Lot,
                            data.Draw,
                            data.DrawDate,
                            data.pack
                          )
                        }
                      >
                        {" "}
                        ลบ{" "}
                      </button>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              </tbody>
            ))}
            {dialog.isShow && (
              <AcceptDel onShowing={conFirmtodel} text={dialog.msg} />
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductStore;
