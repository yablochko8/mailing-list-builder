import "./App.css";
import prodServiceFactory from "./services/prodService";
import { DevApiDashboard } from "./components/ApiTesterDashboard";
import { useEffect, useState } from "react";
import { flexCol, flexRowMP2, flexRowBordered, selectedHeaderButton, unselectedHeaderButton } from "./styling/classNames";
import { ContentManager } from "./components/ContentManager";
import { DataType } from "shared";
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth, useUser } from "@clerk/clerk-react";
// import mockService from "./services/mockService";



const selectedServiceFactory = prodServiceFactory


function App() {

  // AUTH
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const freshToken = await getToken();
      setUserToken(freshToken ?? "");
      console.log(freshToken)
    };

    fetchData();
  }, [getToken]);

  const [selectedComponent, setSelectedComponent] = useState<DataType | "Internal">("sender");


  useEffect(() => {
    if (isSignedIn && user) {
      const registerSender = selectedServiceFactory("sender").newItem
      const saveUserDetails = async () => {
        try {
          const response = await registerSender({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
          });

          if (!response.ok) {
            throw new Error("Failed to save user details");
          }
        } catch (error) {
          console.error(error);
        }
      };

      saveUserDetails();
    }
  }, [isSignedIn, user]);

  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>



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
            {selectedComponent === "sender" && <ContentManager dataType="sender" userToken={userToken} />}
            {selectedComponent === "recipient" && <ContentManager dataType="recipient" userToken={userToken} />}
            {selectedComponent === "list" && <ContentManager dataType="list" userToken={userToken} />}
            {selectedComponent === "blast" && <ContentManager dataType="blast" userToken={userToken} />}
            {selectedComponent === "message" && <ContentManager dataType="message" userToken={userToken} />}
            {selectedComponent === "Internal" && <DevApiDashboard serviceFactory={selectedServiceFactory} />}

          </div>

        </div>
      </div>
    </>

  );
}

export default App;