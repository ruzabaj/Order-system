import React from 'react'
import "../../scss/reactSidebar.scss";
import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import {AiOutlineArrowRight } from "react-icons/ai";
import Piechart from '../Charts/Piechart';

const SidebarPro = ({dineinTabs, paymentStatus, startBillNum, endBillNum, FoodBeverageSum}) => {
    const netTotalSale = dineinTabs.netTOTALSALES;
    const numGuest = dineinTabs.TotalGuests;

    let revenuePerGuest = netTotalSale / numGuest;
    const { collapseSidebar } = useProSidebar();
    // var nf = new Intl.NumberFormat();
    // nf.format("12344555.2344");
    // console.log(nf.format(number))
    return (
        <div className='sidebar'>
            <main>
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
                            <label> <span>Total Sales : </span>{dineinTabs.TOTALSALES}</label>
                            {/* {console.log("123445.1234".toLocaleString(undefined, {maximumFractionDigits:2}))} */}
                            <div className='info'>
                                <label><span>Dine-In : </span>{dineinTabs.DineInSALES = dineinTabs.DineInSALES ?? "0"}</label>
                            </div>
                            <div className='info'>
                                <label><span>Tabs : </span>{(dineinTabs.TabSALES === null) ? "0" : dineinTabs.TabSALES}</label>
                            </div>
                        </div>
                        <hr className="hr-line" />
                        <div className='total-info'>
                            <label> <span>Total Net Sales : </span>{dineinTabs.netTOTALSALES}</label>
                            <div className='info'>
                                <label><span>Dine-In : </span>{dineinTabs.netDineInSALES}</label>
                            </div>
                            <div className='info'>
                                <label><span>Tabs : </span>{(dineinTabs.netTabSALES === null) ? "0" : dineinTabs.netTabSALES}</label>
                            </div>
                        </div>
                        <hr className="hr-line" />
                        <div className='total-info'>
                            <label> <span>VAT: </span>{dineinTabs.TotalVat}</label>
                            <div className='info'>
                                <label><span>Dine-In : </span>{dineinTabs.DineInVAT}</label>
                            </div>
                            <div className='info'>
                                <label><span>Tabs : </span>{dineinTabs.TabVAT = dineinTabs.TabVAT ?? "0"}</label>
                            </div>
                        </div>
                        <hr className="hr-line" />
                        {/* <button className="btn-side-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" onClick={toggleArrow}>{arrow ? <AiOutlineArrowLeft className='icon-arrow' /> : <AiOutlineArrowRight className='icon-arrow' />}</button> */}
                        <div className='total-info'>
                            <label> <span>Total Service Charge : </span>{dineinTabs.TotalServiceCharge}</label>
                            <div className='info'>
                                <label><span>Dine-In : </span>{dineinTabs.DineInServiceCharge}</label>
                            </div>
                            <div className='info'>
                                <label><span>Tabs : </span>{dineinTabs.TabServiceCharge = dineinTabs.TabServiceCharge ?? "0"}</label>
                            </div>
                        </div>
                        <hr className="hr-line" />
                        <Piechart  FoodBeverageSum={FoodBeverageSum} dineinTabs={dineinTabs} />

                        <div className='total-info'>
                            <label> <span>Food Sale : </span>{dineinTabs.FoodSale}</label>
                            <div>
                                <label><span>Beverage Sale : </span>{dineinTabs.BeverageSale}</label>
                            </div>
                            <div>
                                <label><span>Others : </span>{(dineinTabs.OtherSale === null) ? "0:00" : dineinTabs.OtherSale}</label>
                            </div>
                        </div>
                        <hr className="hr-line" />

                    </div>
                    <div className='dine-tabs-paymemnt-status'>
                        <div>
                            <label><span>Credit Card : </span>{paymentStatus.CreditCard}</label>
                        </div>
                        <div>
                            <label><span>Cash : </span>{paymentStatus.Cash}</label>
                        </div>
                        <div>
                            <label><span> Mobile Payment : </span>{paymentStatus.MobilePayment}</label>
                        </div>
                        <div>
                            <label> <span>Credit Sale: </span>{paymentStatus.Credit}</label>
                        </div>
                        <div>
                            <label><span>Complimentary : </span>{paymentStatus.Complimentary}</label>
                        </div>
                        <div>
                            <label><span> Split : </span>{paymentStatus.Split}</label>
                        </div>
                        <div>
                            <label><span> Discount Amount : </span>{dineinTabs.DiscountAmountSum}</label>
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