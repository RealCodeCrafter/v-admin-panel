import React, { useState, useMemo } from "react";
import "./adminHeader.scss";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSearchDashboardsQuery } from "../../context/api/dashboardApi";

function AdminHeader({ setClose }) {
  const [value, setValue] = useState("");

  const { data, isLoading } = useSearchDashboardsQuery({});

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const filteredData = useMemo(() => {
    if (!value || !data?.data) return [];
    
    return data.data.filter(item => 
      item.firstName?.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, data]);

  return (
    <div className="products__top">
      <button className="products__top-btns" onClick={() => setClose((p) => !p)}>
        <AiOutlineMenu />
      </button>

      <div className="products__top__right">
        <div className="products__top__right-form">
          <input
            onChange={handleChange}
            value={value}
            placeholder="Search..."
            type="text"
          />
          <FiSearch />
        </div>

        {value && (
          <div className="search-result">
            {isLoading && <p>Searching...</p>}
            {!isLoading && filteredData.length === 0 && <p>Not found</p>}

            {filteredData.map((item) => (
              <div
                className="search-result-items"
                key={item.id}
              >
                <p className="search-result-items-title">
                  {item?.firstName}
                </p>
                <p className="search-result-items-text">
                  {item?.phoneNumber}
                </p>
              </div>
            ))}
          </div>
        )}

        <NavLink to={"/admin/profile"} className="products__top__right-profile">
          <button className="products__top__right-profile-btn">
            <FaRegUser />
          </button>
          <p className="products__top__right-profile-title">Admin</p>
        </NavLink>
      </div>
    </div>
  );
}

export default AdminHeader;


// import React, { useState } from "react";
// import "./adminHeader.scss";
// import { FaRegUser } from "react-icons/fa";
// import { AiOutlineMenu } from "react-icons/ai";
// import { FiSearch } from "react-icons/fi";
// import { NavLink } from "react-router-dom";
// import { useSearchDashboardsQuery } from "../../context/api/dashboardApi";

// function AdminHeader({ setClose }) {
//   const [value, setValue] = useState("");

//   const { data, isLoading } = useSearchDashboardsQuery(
//     { firstName: value },
//     { skip: !value }
//   );

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   return (
//     <div className="products__top">
//       <button className="products__top-btns" onClick={() => setClose((p) => !p)}>
//         <AiOutlineMenu />
//       </button>

//       <div className="products__top__right">
//         <div className="products__top__right-form">
//           <input
//             onChange={handleChange}
//             value={value}
//             placeholder="Search..."
//             type="text"
//           />
//           <FiSearch />
//         </div>

//         {value && (
//           <div className="search-result">
//             {isLoading && <p>Searching...</p>}
//             {data?.length === 0 && <p>Not found</p>}

//             {data?.data?.map((item) => (
//               <div
//                 className="search-result-items"
//                 key={item.id}
//               >
//                 <p className="search-result-items-title">
//                 {item?.firstName}
//                 </p>
//                  <p className="search-result-items-text">
//                 {item?.phoneNumber}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         <NavLink to={"/admin/profile"} className="products__top__right-profile">
//           <button className="products__top__right-profile-btn">
//             <FaRegUser />
//           </button>
//           <p className="products__top__right-profile-title">Ramziddin</p>
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// export default AdminHeader;


