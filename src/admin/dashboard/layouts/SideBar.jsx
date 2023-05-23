import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../../App';
import { FaSquare, FaMoneyBillAlt, FaPlusSquare } from 'react-icons/fa';
import { GiCartwheel} from 'react-icons/gi';
import logo from "../../../assets/logo.svg"
import { FiLogOut } from 'react-icons/fi';


function SideBar() {
  const {adminState, dispatchadmin} = useContext(AdminContext)
  const Loginbutton= () =>{
        
    if(adminState){
        return <div>
            <button className="logoutbtnDash  flex items-center gap-4 hover:text-[#393E46] "><Link className="nav-link hover:text-[#393E46]" to="/adminsignout">logout</Link><FiLogOut/></button>
        </div>
    }
    else{
        return <div>
                <button className="logoutbtnDash"><Link  to="/signin">login</Link></button>
  
            </div>
    }
  }

  return (
    <div className="sidebar">
    <div className="logo-details">
      <img src={logo} alt="logo" className='w-40' /><span className='logo_name1'>MobiLoco</span>
    </div>
      <ul className="nav-links">
        <li>
            <Link className="dashlinks" to="/dashboard">
            <i className='bx bx-grid-alt' ></i>
            <span className="allLinks_name">Dashboard</span>
            </Link>
        </li>
        <li>
            <Link className="dashlinks" to="/dashboard/addvehicules">
            <i className="fa-sharp fa-solid fa-square-plus"></i>
            <span className="allLinks_name">Add vehicules</span>
            </Link>
        </li>

        <li>
            <Link className="dashlinks" to="/dashboard/getvehicules">
            <i className="fa-sharp fa-solid fa-motorcycle"></i>
            <span className="allLinks_name">Mes vehicules</span>
            </Link>
        </li>

        <li>
            <Link className="dashlinks" to="/dashboard/vehiculesreports">
            <i className="fa-solid fa-sack-dollar"></i>
            <span className="allLinks_name">Mes Revenues</span>
            </Link>
        </li>
        <li>
          <Link className="dashlinks" to="/dashboard/getusers">
          <i className="fa-solid fa-users"></i>
            <span className="allLinks_name">Utilisateurs</span>
          </Link>
        </li>
      </ul>

      <div className="logoutbtnDashDiv">
        <Loginbutton/>
      </div>
  </div>
  );
}

export default SideBar;
