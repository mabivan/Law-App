import {NavLink} from "react-router-dom";
import{
    FaHome,
    FaBook,
    FaRobot,
    FaEnvelope,
    FaQuestionCircle,
    FaFileAlt
} from "react-icons/fa";
import "./Sidebar.css";
/*TypeScript*/
interface SidebarProps{
    isOpen:boolean;
}
/*Component*/
const Sidebar =({isOpen}:SidebarProps)=> {
    const Sideitems =[
    {to:"/", icon:<FaHome/>, text:"Home"},
    {to:"AIAssistance", icon:<FaRobot/>, text:"AIAssistance"},
    {to:"LawDictioanay", icon:<FaBook/>, text:"LawDictionary"},
    {to:"Contact", icon:<FaEnvelope/>, text:"Contact"},
    {to:"LegalDocs", icon:<FaFileAlt/>, text:"LegalDocs"},
    {to:"Help", icon:<FaQuestionCircle/>, text:"Help"}
    
    ];
    return(
        <div className={`law-sidebar ${isOpen? "expanded": "collapsed"}`}>
            {Sideitems.map((item)=>(
                <NavLink key={item.to}
                to={item.to} className="Sidebar-link">

                <div className="sidebar-icon">{item.icon}</div>
                <div className="Sidebar-text">{item.text}</div>
                </NavLink>
            ))}
        </div>
    );
};
export default Sidebar;