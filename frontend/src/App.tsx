import "./App.css";
import prodServiceFactory from "./services/prodService";
import { DevApiDashboard } from "./components/ApiTesterDashboard";
import { ListMgmt } from "./components/ListMgmt";
import { useState } from "react";
// import mockService from "./services/mockService";



function App() {
  const [selectedComponent, setSelectedComponent] = useState("ListMgmt");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      <div>
        <select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)}>
          <option value="ListMgmt">List Management</option>
          <option value="ApiDashboard">API Dashboard</option>
        </select>
      </div>

      {selectedComponent === "ListMgmt" && <ListMgmt senderId={1} />}
      {selectedComponent === "ApiDashboard" && <DevApiDashboard serviceFactory={prodServiceFactory} />}
    </div>

  );
}

export default App;