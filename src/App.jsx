import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import {
  LuLifeBuoy,
  LuReceipt,
  LuBoxes,
  LuPackage,
  LuUserCircle,
  LuBarChart3,
  LuLayoutDashboard,
  LuSettings,
} from "react-icons/lu";

function App() {
  return (
    <main className="App">
      <Sidebar>
        <SidebarItem
          icon={<LuLayoutDashboard size={20} />}
          text="Dashboard"
          alert
        />
        <SidebarItem
          icon={<LuBarChart3 size={20} />}
          text="Statistics"
          active
        />
        <SidebarItem icon={<LuUserCircle size={20} />} text="Users" />
        <SidebarItem icon={<LuBoxes size={20} />} text="Inventory" alert />
        <SidebarItem icon={<LuPackage size={20} />} text="Orders" />
        <SidebarItem icon={<LuReceipt size={20} />} text="Billings" />
        <SidebarItem icon={<LuSettings size={20} />} text="Settings" />
        <SidebarItem icon={<LuLifeBuoy size={20} />} text="Help" />
      </Sidebar>
    </main>
  );
}

export default App;
