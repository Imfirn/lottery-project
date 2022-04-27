import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartPack from "./components/cartPack";
import CartSingle from "./components/cartSingle";
import axios from "axios";
import './cart.css'

const url_ = 'http://a1f7-2403-6200-88a4-54b-eda0-294a-e446-b93.ngrok.io'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvbGVlIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjUxMDcwMTYxLCJleHAiOjE2NTEwODA5NjF9.KmKrjDS012ivBmVFJ2_Bohs2SkcedVaXKq-V_kMJm-A'

const Cart = (card_props)=>{
    const li_default_cart_data = []
    // const li_default_cart_data = [
    //     {
    //         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvbGVlIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjUwOTY1ODA1LCJleHAiOjE2NTA5Njk0MDV9.7MBSCD88VkHxkNe2c4kdczsVdSzgDZkxzpn9wwQOTco",
    //         Number: "555555",
    //         Amount: "1",
    //         Storename: "ซู่ซู่",
    //         Pack_Flag: "Y",
    //         PackAmount: "2"
    //     },
    //     {
    //         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvbGVlIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjUwOTY1ODA1LCJleHAiOjE2NTA5Njk0MDV9.7MBSCD88VkHxkNe2c4kdczsVdSzgDZkxzpn9wwQOTco",
    //         Number: "111189",
    //         Amount: "1",
    //         Storename: "ซู่ซู่",
    //         Pack_Flag: "N",
    //         PackAmount: "-"
    //     },
    //     {
    //         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvbGVlIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjUwOTY1ODA1LCJleHAiOjE2NTA5Njk0MDV9.7MBSCD88VkHxkNe2c4kdczsVdSzgDZkxzpn9wwQOTco",
    //         Number: "999789",
    //         Amount: "1",
    //         Storename: "ซู่ซู่",
    //         Pack_Flag: "Y",
    //         PackAmount: "5"
    //     }
    //   ]

    const [cartData, setCartData] = useState(li_default_cart_data)
    const [checkFirstGetCart, setCheckGetCart] = useState(true)
    const [cost, setcost] = useState(0)


    useEffect((event)=>{
        if(checkFirstGetCart === true){
            axios.get(url_+'/getCart'+'/'+token)/////////////////////
            .then(function (response) {
                setCartData(response.data.Cart)
                console.log("response.Cart",response.data.Cart)
                console.log("check cartData",cartData)
                
            })
            .catch(function (error) {
                console.log(error);
            });
            setCheckGetCart(false)
        }
        setcost(totalCost(cartData))
        console.log("cartData UseEffect",cartData)
    })

    const removeCartNumber = (item)=>{
        console.log("remove : ", item)
        axios.delete(url_+'/removeLottery', ////////////////////////////
        {data : {
            token: token,
            Number_lottery: item.Number_lottery,
            Storename: item.Storename,
            pack: item.Pack_Flag,
            PackAmount: item.PackAmount
        }})
        .then(function (response) {
            console.log("remove response : ", response)
            axios.get(url_+'/getCart'+'/'+token)/////////////////////
            .then(function (response) {
                setCartData(response.data.Cart)
                console.log("response.Cart",response.data.Cart)
                console.log("check cartData",cartData)
                
            })
            .catch(function (error) {
                console.log(error);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log({
            token: token,
            Number_lottery: item.Number_lottery,
            Storename: item.Storename,
            pack: item.Pack_Flag,
            PackAmount: item.Amount})
    }

    const totalCost = (item)=>{
        console.log("check item",item)
        // const sum = 0//////////////////////////////////////////////////
        const sum = item.reduce((total, element)=> (element.Pack_Flag === "N" ? total+=Number(element.Amount) : total+=((Number(element.Amount))*Number(element.PackAmount))),0) * 80
        console.log("check Total Sum", sum, item)
        return sum
    }
    
    const getOrderID = ()=>{
        axios.post(url_+'/confirmedOrder',{
            token:token,
            deliver:"Yes",
            lotteryList: cartData
        })
            .then(function (response) {
                setCartData(response.data.Cart)
                console.log("response.Cart",response.data.Cart)
                console.log("check cartData",cartData)
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="h-screen font-prompt flex justify-center bg-[#FFE5A3]" style={{}}>
            <div class="flex flex-col p-8 m-8 bg-white rounded-xl shadow-xl min-w-[44.25%] w-[97%] 2xl:w-[44.25%] xl:w-[53.1%] lg:w-[66.375%] md:w-[88.5%] sm:w-[95%] xs:w-[97%]" style={{}}>
                <h1 class="text-lg font-semibold mb-2" style={{color:"#E54E3D"}}>ตะกร้าของคุณ</h1>
                <div className="justify-left" style={{marginTop:"1vw"}}>
                    {cartData.map((element)=>{
                        if (element.Pack_Flag==="N") {
                        return <CartSingle cardInfo={element} numberToRemove={removeCartNumber}/>
                        }else{
                        return <CartPack cardInfo={element} numberToRemove={removeCartNumber}/>
                        }
                    })}
                </div>
                <div style={{height:"2.5vw"}}></div>
                <div style={{marginBottom:"1vw",paddingTop:"1vw",paddingBottom:"0.8vw", borderTopWidth:"0.1vw", borderColor:"#999191"}}>
                    <p style={{display:"flex", justifyContent:"space-between", paddingBottom:"0.6vw", color:"#999191"}}>ยอดรวมสินค้า<span>{cost}&ensp; บาท</span></p>
                    <p style={{display:"flex", justifyContent:"space-between", paddingBottom:"0.6vw", color:"#999191"}}>ค่าจัดส่งสินค้า<span>40 &ensp;บาท</span></p>
                    <p class="text-2xl font-semibold" style={{display:"flex", justifyContent:"right"}}>ยอดรวมสุทธิ &ensp;&ensp;<span> {40+cost} &ensp; บาท</span></p>
                </div>
                <div>
                    <form>
                        <Link to="/paymentmethod" className={cost===0 ? "disableLink" : "enableLink"} state= {{token: token, delivery:"Yes", lotteryList: cartData, cost:cost, costAndDelivery: cost+40}}>
                            <button id="goToPaymentMethod" className="flex goToPaymentMethod" disabled={cost===0 ? true: false} onclick={getOrderID}>
                                <p>ดำเนินการชำระเงิน</p>
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cart