import React from 'react'
import "../../scss/reactSidebar.scss";
import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import { AiOutlineArrowRight } from "react-icons/ai";
import Piechart from '../Charts/Piechart';

const SidebarPro = ({ dineinTabs, paymentStatus, startBillNum, endBillNum, FoodBeverageSum, toggleArrow }) => {
    const netTotalSale = dineinTabs.netTOTALSALES;
    const numGuest = dineinTabs.TotalGuests;
    console.log(dineinTabs, "dine in tabs")
    let revenuePerGuest = netTotalSale / numGuest;
    const { collapseSidebar } = useProSidebar();
    console.log(dineinTabs.TOTALSALES?.TOTALSALES, "optional chaining")
    console.log(parseInt(dineinTabs.TOTALSALES?.TOTALSALES).toLocaleString(undefined, { maximumFractionDigits: 3 }), "i am here 1 2 3")
    console.log(isNaN(parseInt(dineinTabs.TOTALSALES).toLocaleString(undefined, { maximumFractionDigits: 3 })) ? "hi" : "bye")

    if(!dineinTabs){
        return null
    }
    return (
        <div className='sidebar'>
            <main onClick={toggleArrow}>
                <button onClick={() => collapseSidebar()} className="btn-sidebar" >{<AiOutlineArrowRight className='icon-arrow' />}</button>
            </main>
            <Sidebar>
                <div className='dine-tabs-list'>
                    <div className='bill-no'>
                        <div className='start-bill-no'>
                            <label><span>Starting Bill No : </span>{startBillNum}</label>
                        </div>
                        <div className='end-bill-no'>
                            <label><span>Ending Bill No : </span>{(endBillNum === "") ? "-" : endBillNum}</label>
                        </div>
                        <div className='total-guest'>
                            <label><span>Total No. of Guest : </span>{(dineinTabs.TotalGuests === "") ? "-" : dineinTabs.TotalGuests}</label>
                        </div>
                        <div className='revenue'>
                            <label><span>Revenue Per Guest : </span>{(revenuePerGuest === "") ? "-" : revenuePerGuest.toFixed(2)}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <div className='total-info'>
                        <label> <span>Total Sales : </span> {parseInt(dineinTabs.TOTALSALES).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        <div className='info'>
                            <label><span>Dine-In : </span>{parseInt(dineinTabs.DineInSALES).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        </div>
                        <div className='info'>
                            <label><span>Tabs : </span>{(dineinTabs.TabSALES === null) ? "0" : parseInt(dineinTabs.TabSALES).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <div className='total-info'>
                        <label> <span>Total Net Sales : </span>{parseInt(dineinTabs.netTOTALSALES).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        <div className='info'>
                            <label><span>Dine-In : </span>{parseInt(dineinTabs.netDineInSALES).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        </div>
                        <div className='info'>
                            <label><span>Tabs : </span>{(dineinTabs.netTabSALES === null) ? "0" : dineinTabs.netTabSALES}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <div className='total-info'>
                        <label> <span>Total VAT: </span>{parseInt(dineinTabs.TotalVat).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        <div className='info'>
                            <label><span>Dine-In : </span>{parseInt(dineinTabs.DineInVAT).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        </div>
                        <div className='info'>
                            <label><span>Tabs : </span>{dineinTabs.TabVAT = dineinTabs.TabVAT ?? "0"}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <div className='total-info'>
                        <label> <span>Total Service Charge : </span>{parseInt(dineinTabs.TotalServiceCharge).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        <div className='info'>
                            <label><span>Dine-In : </span>{parseInt(dineinTabs.DineInServiceCharge).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        </div>
                        <div className='info'>
                            <label><span>Tabs : </span>{dineinTabs.TabServiceCharge = dineinTabs.TabServiceCharge ?? "0"}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <Piechart FoodBeverageSum={FoodBeverageSum} dineinTabs={dineinTabs} />

                    <div className='total-info'>
                        <label> <span>Food Sale : </span>{parseInt(dineinTabs.FoodSale).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        <div>
                            <label><span>Beverage Sale : </span>{parseInt(dineinTabs.BeverageSale).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                        </div>
                        <div>
                            <label><span>Others : </span>{(dineinTabs.OtherSale === null) ? "0:00" : dineinTabs.OtherSale}</label>
                        </div>
                    </div>
                    <hr className="hr-line" />

                </div>
                <div className='dine-tabs-paymemnt-status'>
                    <div>
                        <label><span>Credit Card : </span>{parseInt(paymentStatus.CreditCard).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                    </div>
                    <div>
                        <label><span>Cash : </span>{parseInt(paymentStatus.Cash).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                    </div>
                    <div>
                        <label><span> Mobile Payment : </span>{parseInt(paymentStatus.MobilePayment).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                    </div>
                    <div>
                        <label> <span>Credit Sale: </span>{parseInt(paymentStatus.Credit).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                    </div>
                    <div>
                        <label><span>Complimentary : </span>{parseInt(paymentStatus.Complimentary).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                    </div>
                    <div>
                        <label><span> Split : </span>{parseInt(paymentStatus.Split).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                    </div>
                    <div>
                        <label><span> Discount Amount : </span>{parseInt(dineinTabs.DiscountAmountSum).toLocaleString(undefined, { maximumFractionDigits: 3 })}</label>
                    </div>
                </div>
                <hr className="hr-line" />

                {/* </div>
            </div> */}
            </Sidebar>
        </div>
    )
}

export default SidebarPro