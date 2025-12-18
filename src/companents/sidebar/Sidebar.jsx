import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import { LiaGiftSolid } from "react-icons/lia";
import { GoCodeSquare } from "react-icons/go";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";
import { api } from "../../context/api";
import logo from "../../assets/logo.png"

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Redux store'dan logout
    dispatch(logout());
    
    // RTK Query cache'ni tozalash
    dispatch(api.util.resetApiState());
    
    // localStorage'ni tozalash (logout allaqachon qiladi, lekin qo'shimcha xavfsizlik uchun)
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("bot-base-url");
    
    // Login sahifasiga yuborish
    navigate("/login", { replace: true });
  };

  return (
    <section className="sidebar">

      <div>
        <div className="sidebar-top">
          <img src={logo} alt="" />
          <Link className="sidebar__top">
            <h1>Valescooil.com</h1>
          </Link>
        </div>

        <ul className="sidebar__item">
          <li className="sidebar__list">
            <NavLink to={"dashboard"} className={"sidebar__left__text"}>
              <RxDashboard />
              Dashboard
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"clients"} className={"sidebar__left__text"}>
              <TbUsers />
              Clients
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"gifts"} className={"sidebar__left__text"}>
              <LiaGiftSolid />
              Gifts
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"codes"} className={"sidebar__left__text"}>
              <GoCodeSquare />
              Codes
            </NavLink>
          </li>
        </ul>

      </div>

      <div className="sidebar__btns">
        <div onClick={handleLogout} className="sidebar__btns__info">
          <LuLogOut />
          <p className="sidebar__btns__info-text">Login out</p>
        </div>
      </div>

    </section>
  );
}

export default Sidebar;