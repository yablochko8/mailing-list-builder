import "./App.css";
import prodServiceFactory from "./services/prodService";
import { DevApiDashboard } from "./components/ApiTesterDashboard";
import { useState } from "react";
import { flexCol, flexRowMP2, flexRowBordered, selectedHeaderButton, unselectedHeaderButton } from "./styling/classNames";
import { ContentManager } from "./components/ContentManager";
import { DataType } from "shared";
// import mockService from "./services/mockService";



function App() {
  const [selectedComponent, setSelectedComponent] = useState<DataType | "Internal">("sender");

  return (
    <div className="min-h-screen max-v-screen">
      <div className={flexCol}>
        <div className={flexRowMP2}>
          <button onClick={() => setSelectedComponent("sender")} className={selectedComponent === "sender" ? selectedHeaderButton : unselectedHeaderButton}>Senders</button>
          <button onClick={() => setSelectedComponent("recipient")} className={selectedComponent === "recipient" ? selectedHeaderButton : unselectedHeaderButton}>Recipients</button>
          <button onClick={() => setSelectedComponent("list")} className={selectedComponent === "list" ? selectedHeaderButton : unselectedHeaderButton}>Lists</button>
          <button onClick={() => setSelectedComponent("blast")} className={selectedComponent === "blast" ? selectedHeaderButton : unselectedHeaderButton}>Blasts</button>
          <button onClick={() => setSelectedComponent("message")} className={selectedComponent === "message" ? selectedHeaderButton : unselectedHeaderButton}>Messages</button>
          <button onClick={() => setSelectedComponent("Internal")} className={selectedComponent === "Internal" ? selectedHeaderButton : unselectedHeaderButton}>API Dashboard</button>
        </div>

        <div className={flexRowBordered}>
          {selectedComponent === "sender" && <ContentManager dataType="sender" />}
          {selectedComponent === "recipient" && <ContentManager dataType="recipient" />}
          {selectedComponent === "list" && <ContentManager dataType="list" />}
          {selectedComponent === "blast" && <ContentManager dataType="blast" />}
          {selectedComponent === "message" && <ContentManager dataType="message" />}
          {selectedComponent === "Internal" && <DevApiDashboard serviceFactory={prodServiceFactory} />}

        </div>

      </div>
    </div>

  );
}

export default App;