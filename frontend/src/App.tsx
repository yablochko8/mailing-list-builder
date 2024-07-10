import "./App.css";
import prodServiceFactory from "./services/prodService";
import { DevApiDashboard } from "./components/ApiTesterDashboard";
import { ListMgmt } from "./components/ListMgmt";
import { useState } from "react";
import { flexCol, flexRowMP2, flexRowBordered } from "./styling/classNames";
import { ContentManager } from "./components/SenderMgmt";
// import mockService from "./services/mockService";



function App() {
  const [selectedComponent, setSelectedComponent] = useState("ListMgmt");

  return (
    <div className="min-h-screen max-v-screen">
      <div className={flexCol}>

        <div className={flexRowMP2}>
          <select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)}>
            <option value="SenderMgmt">Sender Management</option>
            <option value="RecipientMgmt">Recipient Management</option>
            <option value="ListMgmt">List Management</option>
            <option value="BlastMgmt">Blast Management</option>
            <option value="MessageMgmt">Message Management</option>
            <option value="ApiDashboard">API Dashboard</option>
          </select>
        </div>

        <div className={flexRowBordered}>
          {selectedComponent === "SenderMgmt" && <ContentManager dataType="sender" />}
          {selectedComponent === "RecipientMgmt" && <ContentManager dataType="recipient" />}
          {selectedComponent === "ListMgmt" && <ListMgmt senderId={1} />}
          {selectedComponent === "BlastMgmt" && <ContentManager dataType="blast" />}
          {selectedComponent === "MessageMgmt" && <ContentManager dataType="message" />}
          {selectedComponent === "ApiDashboard" && <DevApiDashboard serviceFactory={prodServiceFactory} />}
        </div>

      </div>
    </div>

  );
}

export default App;