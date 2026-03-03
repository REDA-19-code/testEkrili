import "./dashboard.css";
import Sidebar from "../components/dashboard-sidebar";
import MyProperties from "../components/MyProperties";

function Dashboard() {
  return (
    <main className="app-layout">
      <Sidebar />
      <MyProperties cards={[]} />
    </main>
  );
}

export default Dashboard;
