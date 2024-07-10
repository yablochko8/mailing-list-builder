import "./App.css";
import prodServiceFactory from "./services/prodService";
import { DevApiDashboard } from "./components/ApiTesterDashboard";
import { ListMgmt } from "./components/ListMgmt";
import { useState } from "react";
import { flexCol, flexRowMP2, flexRowBordered } from "./styling/classNames";
// import mockService from "./services/mockService";



function App() {
  const [selectedComponent, setSelectedComponent] = useState("ListMgmt");

  return (
    <div className="min-h-screen max-v-screen">
      <div className={flexCol}>

        <div className={flexRowMP2}>
          <select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)}>
            <option value="ListMgmt">List Management</option>
            <option value="ApiDashboard">API Dashboard</option>
          </select>
        </div>

        <div className={flexRowBordered}>
          {selectedComponent === "ListMgmt" && <ListMgmt senderId={1} />}
          {selectedComponent === "ApiDashboard" && <DevApiDashboard serviceFactory={prodServiceFactory} />}
        </div>

      </div>
    </div>

  );
}

export default App;