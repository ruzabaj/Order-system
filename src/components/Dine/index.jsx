import React, { useState } from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft} from "react-icons/ai";

const Dine = ({ dineinTabs, paymentStatus }) => {
    const [arrow, setArrow] = useState(true);
    const toggleArrow = () => {
        setArrow(!arrow)
    }
    return (
        <section className='dine-tabs-info'>
            <div className="offcanvas offcanvas-start show" data-bs-scroll="true" tabIndex="0" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                </div>
                <div className="offcanvas-body">
                    <div className='dine-tabs-list'>
                        <div className='total-info'>
                            <label> <span>Total Sales : </span>{dineinTabs.TOTALSALES}</label>
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
                        <button className="btn-side-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" onClick={toggleArrow}>{arrow?<AiOutlineArrowRight className='icon-arrow' />:<AiOutlineArrowLeft className='icon-arrow' />}</button>
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
                            <label><span>Cash : </span>{paymentStatus.Cash}</label>
                        </div>
                        <div>
                            <label><span>Complementary : </span>{paymentStatus.Complimentary}</label>
                        </div>
                        <div>
                            <label><span>Credit : </span>{paymentStatus.Credit}</label>
                        </div>
                        <div>
                            <label><span>Credit Card : </span>{paymentStatus.CreditCard}</label>
                        </div>
                        <div>
                            <label><span> Mobile Payment : </span>{paymentStatus.MobilePayment}</label>
                        </div>
                        <div>
                            <label><span> No Chargeable : </span>{paymentStatus.NonChargeable}</label>
                        </div>
                        <div>
                            <label><span> Split : </span>{paymentStatus.Split}</label>
                        </div>
                        <div>
                            <label><span> Discount Amount : </span>{paymentStatus.DiscountAmountSum}</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dine