import React from "react";
import { useLocation,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './cart.css';
import Logo from './imgComponents/waitforprocess.png';
import './slipSuccess.css';
import { global_url_token } from "./global_url_token";

//////customer

const SlipPayment = (card_props)=>{
    const paymentInfo = useLocation()
    const paymentInfoState = paymentInfo.state
    console.log("paymentInfoState",paymentInfoState)
    return (
        <div className="h-screen" style={{backgroundColor:"#FFE5A3"}}>
            <div className="h-16"/>
            <div className="font-prompt flex justify-center">
                <div class="flex flex-col p-8 m-8 bg-white rounded-xl shadow-xl min-w-[44.25%] w-[97%] 2xl:w-[44.25%] xl:w-[53.1%] lg:w-[66.375%] md:w-[88.5%] sm:w-[95%] xs:w-[97%]" style={{}}>
                    <div>
                        <h1 class="text-xl font-semibold mb-2" style={{color:"#E54E3D"}}>การชำระเงิน</h1>
                        <div className="justify-left" style={{marginTop:"0vw"}}></div>
                        <div style={{height:"1vw"}}></div>
                        {/* <div style={{marginBottom:"0vw",paddingTop:"1vw",paddingBottom:"0.8vw", borderTopWidth:"0.1vw", borderColor:"#999191"}}>
                            <p style={{display:"flex", justifyContent:"space-between", paddingBottom:"0vw", color:"#000000"}}>ยอดเงินที่ต้องชำระ<span class="text-2xl font-semibold" style={{color:"#E54E3D"}}>{}&ensp; บาท</span></p>
                        </div> */}
                        <div className="flex" style={{justifyContent:"center", marginBottom:"1vw",paddingTop:"1vw",paddingBottom:"0.8vw", borderTopWidth:"0.1vw", borderColor:"#999191", justifyItems:"center"}}>
                            <img style={{maxWidth:"70%",justifySelf:"center"}} src={Logo} />
                        </div>
                    </div>
                    <div className="" style={{display:"flex",justifyContent:"center", width:"100%"}}>
                    </div>
                    <div>
                        <form>
                            <Link to="/home">
                                <button id="goToPaymentMethod" className="flex goToPaymentMethod">
                                    <p>กลับสู่หน้าหลัก</p>
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlipPayment