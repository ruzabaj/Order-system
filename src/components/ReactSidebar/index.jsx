import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar';
import SidebarPro from './SidebarPro';
import "../../scss/reactSidebar.scss";

const ReactSidebar = ({dineinTabs, paymentStatus, toggleArrow, arrow, startBillNum, endBillNum, FoodBeverageSum}) => {
    return (
        <ProSidebarProvider>
            <SidebarPro dineinTabs={dineinTabs} paymentStatus={paymentStatus} toggleArrow={toggleArrow} arrow={arrow} startBillNum={startBillNum} endBillNum={endBillNum} FoodBeverageSum={FoodBeverageSum}/>
        </ProSidebarProvider>
  )
}

export default ReactSidebar