import {useEffect}from "react"

//module external
import { modalSidebarAdmin } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { useSelector } from "react-redux";
import {
  Outlet,
  useNavigate,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";

//
import SidebarDashboard from "../subcomponents/Sidebardashboard";
import { StateTypeAuth, Userinfo } from "../typeing";

//interface
interface Props{
  path:string
}

//component
const Dashboard = ({path}:Props) => {
  const navigate=useNavigate()
  const [Sidebar, setSidebar] = useRecoilState(modalSidebarAdmin);
const loc=useLocation()
  useEffect(()=>{

    if(loc.pathname == "/dashboard" && path == "admin")
    navigate(`/dashboard/profile`)
    else if(loc.pathname == "/dashboard/me" && path == "user")
    navigate(`/dashboard/me/profile`)

  },[])
  return (
    <section>
      <div className="flex overflow-hidden overflow-x-auto">
        <div
          className={`transition-all ${
            Sidebar ? "grow-0 shrink" : "grow-0 shrink	"
          }`}
        >
          <SidebarDashboard />
        </div>
        <div className={`${
            Sidebar ? "grow" : "grow"
          }`}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
