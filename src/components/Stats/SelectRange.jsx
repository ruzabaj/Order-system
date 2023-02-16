// import React from 'react'
// import subDays from 'date-fns/subDays';
// import 'rsuite/dist/rsuite.min.css';
// import { DateRangePicker } from 'rsuite';
// import SelectSearch from 'react-select-search';

// const SelectRange = ({selectedOutlet, setSelectedOutlet, listOutlet, monthly, freely, weekly}) => {
//     return (
//         <div className="datepicker-select-search-radio">
//             <div>
//                 <p>Please select your favorite Web language:</p>
//                 <div className='select-range'>
//                     <input type="radio" id="Monthly" name="fav_language" value="Monthly" onClick={handleMonthly} />
//                     <label for="Monthly">Monthly</label>
//                 </div>
//                 <div className='select-range'>
//                     <input type="radio" id="Weekly" name="fav_language" value="Weekly" onClick={handleWeekly} />
//                     <label for="Weekly">Weekly</label>
//                 </div>
//                 <input type="radio" id="Free" name="fav_language" value="Free" onClick={handleFreely} />
//                 <label for="Free">Free Range</label>
//             </div>
//             <div className='select-search'>
//                 <h3>{selectedOutlet}</h3>
//                 <SelectSearch
//                     defaultValue={selectedOutlet}
//                     search
//                     placeholder="Select Outlet Name"
//                     onChange={(event) => setSelectedOutlet(event)}
//                     options={listOutlet}
//                 />
//             </div>
//             <div className='calendar-month-week'>
//                 {freely &&
//                     <div className='calendar'>
//                         <DateRangePicker onOk={(e) => handleDate(e)} />
//                     </div>
//                 }
//                 {monthly &&
//                     <div className='calendar-month'>
//                         <p>Select Single Month</p>
//                         <DateRangePicker showOneCalendar hoverRange="month" ranges={[]} onOk={(e) => handleDate(e)} />
//                     </div>
//                 }
//                 {weekly &&
//                     <div className='calendar-week'>
//                         <p>Select Single Week</p>
//                         <DateRangePicker oneTap showOneCalendar hoverRange="week" ranges={[]} onOk={(e) => handleDate(e)} />
//                     </div>
//                 }
//             </div>
//         </div>
//     )
// }

// export default SelectRange