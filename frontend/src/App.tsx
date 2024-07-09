import "./App.css";
import prodService from "./services/prodService";
import { ApiDashboard } from "./components/ApiTesterDashboard";
// import mockService from "./services/mockService";



function App() {


  return (
    <>
      <ApiDashboard apiService={prodService} />
    </>

  );
}

export default App;