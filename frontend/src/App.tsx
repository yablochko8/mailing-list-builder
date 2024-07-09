import "./App.css";
import prodServiceFactory from "./services/prodService";
import { ApiDashboard } from "./components/ApiTesterDashboard";
import { ListMgmt } from "./components/ListMgmt";
// import mockService from "./services/mockService";



function App() {


  return (
    <>
      <ListMgmt senderId={1} />


      {/* <ApiDashboard apiService={prodServiceFactory} /> */}
    </>

  );
}

export default App;