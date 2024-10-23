// import Sidebar from "../components/Sidebar";
// // import { BarChart, LineGraph, PieChart } from "../components/chart";

//   const Landing = () => {
//     return (
//       <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
//         <Sidebar />
//         <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
//           <div>
//             <div className="sm:w-[66%] mt-10 max-sm:w-[80%]">
//               <h3 className="text-3xl dark:text-whiteSecondary text-blackPrimary font-bold mb-7 max-sm:text-2xl">
//                 Traffic Overview
//               </h3>
//               {/* <LineGraph /> */}
//             </div>
//             <div className="sm:w-[66%] mt-10 max-sm:w-[80%]">
//               <h3 className="text-3xl dark:text-whiteSecondary text-blackPrimary font-bold mb-7 max-sm:text-2xl">
//                 Orders Overview
//               </h3>
//               {/* <BarChart /> */}
//             </div>
//             <div className="sm:w-[50%] mt-10 max-sm:w-[70%]">
//               <h3 className="text-3xl dark:text-whiteSecondary text-blackPrimary font-bold mb-7 max-sm:text-2xl">
//                 Source Overview
//               </h3>
//               {/* <PieChart /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
//   export default Landing;
import Sidebar from "../components/Sidebar";
// import { BarChart, LineGraph, PieChart } from "../components/chart";
import "../../src/landing.css"; // Import the CSS file


const Landing = () => {
  return (
    <div className="landing-container">
      <Sidebar />
      <div className="content-container">
        <div className="app_mainbody">
          <div className="app_overview">
            <div className="page_title d-flex align-items-center justify-content-between">
              <h2 className='page-title-heading'>Dashboard Overview</h2>
              <select name="" id="" className="form-select">
                <option value="" selected>Today</option>
                <option value="">Month</option>
                <option value="">Year</option>
              </select>
            </div>
            <div className="page_cards">
              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="card widget_card">
                    <div className="widget_heading">Online Registrations</div>
                    <div className="widget_content">
                      <div className="widget_numbers">7,265</div>
                      <div className="widget_growth">+11.02%<i className="fa fa-line-chart ms-1" aria-hidden="true"></i></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card widget_card prmy_bg">
                    <div className="widget_heading">Onsite Registrations</div>
                    <div className="widget_content">
                      <div className="widget_numbers">3,671</div>
                      <div className="widget_growth">-0.03%<i className="fa fa-line-chart ms-1" aria-hidden="true"></i></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card widget_card">
                    <div className="widget_heading">New Registrations</div>
                    <div className="widget_content">
                      <div className="widget_numbers">156</div>
                      <div className="widget_growth">+15.03%<i className="fa fa-line-chart ms-1" aria-hidden="true"></i></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card widget_card prmy_bg">
                    <div className="widget_heading">Total Registered</div>
                    <div className="widget_content">
                      <div className="widget_numbers">9,318</div>
                      <div className="widget_growth">+6.08%<i className="fa fa-line-chart ms-1" aria-hidden="true"></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-container">
            <h3 className="section-title section-title-dark">
            
            </h3>
            {/* <LineGraph /> */}
          </div>
          <div className="section-container">
            <h3 className="section-title section-title-dark">
             
            </h3>
            {/* <BarChart /> */}
          </div>
          <div className="section-container">
            <h3 className="section-title section-title-dark">
           
            </h3>
            {/* <PieChart /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
