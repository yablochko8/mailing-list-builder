import { useState } from "react";
import "./App.css";

export const PORT = 4101; // change this to an import before doing anything serious

const serverPath = `http://localhost:${PORT}`;

const getData = async () => {
  const response = await fetch(`${serverPath}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log("The server response was:", json.message);
  return json.message; // unusued here
};

const postDataAndDisplayResponse = async (
  message: string,
  setValuesFromServer: Function
) => {
  const response = await fetch(`${serverPath}/newmessage`, {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  const updatedMessages = json.messages;
  console.log("The server response was:", updatedMessages);
  setValuesFromServer(updatedMessages);
  return json.messages; // unused here
};


const addOneRecipient = async (
  senderId: number,
  name: string,
  email: string
) => {
  const response = await fetch(`${serverPath}/api/recipient/new`, {
    method: "POST",
    body: JSON.stringify({ senderId, name, email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log("The server response was:", json);
  return json.messages; // unused here
};

const getAllSender = async () => {
  const response = await fetch(`${serverPath}/api/sender/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log("The server response was:", json);
  return json.message; // unused here
};

const getOneSender = async () => {
  const response = await fetch(`${serverPath}/api/sender/1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log("The server response was:", json);
  return json.message; // unused here
};

const testSearch = async () => {
  const response = await fetch(`${serverPath}/api/sender/search/jim`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log("The server response was:", json.items);
  return json.message; // unused here
};



function App() {
  const [submittedValue, setSubmittedValue] = useState("");
  const [valuesFromServer, setValuesFromServer] = useState(["starting data"]);

  return (
    <>
      <div>Open the browser console to see this working.</div>
      <button onClick={() => testSearch()}>Call the GET Endpoint</button>
      <br />
      <br />

      <div>Enter text here:</div>
      <input
        type="text"
        value={submittedValue}
        onChange={(e) => {
          setSubmittedValue(e.target.value);
        }}
      />

      <br />
      <button
        onClick={() =>
          addOneRecipient(1, "Jimmy", "jim15@blahhhh.com")
        }
      >
        Add One Recipient
      </button>
      <br />
      <button
        onClick={() =>
          postDataAndDisplayResponse(submittedValue, setValuesFromServer)
        }
      >
        Call the POST Endpoint
      </button>
      {valuesFromServer.map((value, index) => {
        return <div key={index}>{value}</div>;
      })}
    </>
  );
}

export default App;
