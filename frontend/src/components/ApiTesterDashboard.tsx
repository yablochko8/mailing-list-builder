import { useState } from "react";
import { ApiServiceFactory, DataType, dataTypes } from "shared";


export const DevApiDashboard = ({ serviceFactory }: { serviceFactory: ApiServiceFactory }) => {

    const [dataType, setDataType] = useState<DataType>(dataTypes[0]);
    const [inputId, setInputId] = useState<number>(1);
    const [query, setQuery] = useState<string>("");
    const [bodyParams, setBodyParams] = useState<any>({});
    const [valuesFromServer, setValuesFromServer] = useState(["nothing yet"]);

    const { getAll, getOne, search, deleteItem, newItem, updateItem } = serviceFactory(dataType)

    return (
        <>
            <div>Choose data type you want to interact with:</div>
            <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value as DataType)}
            >
                {dataTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <br />
            <br />
            <br />

            <div>Enter id number here (for getOne / deleteItem / update requests ):</div>
            <input
                type="number"
                value={inputId}
                onChange={(e) => {
                    setInputId(Number(e.target.value));
                }} />
            <br />
            <br />
            <br />


            <div>Enter body parameters here (for newItem / update requests):</div>
            <textarea
                value={bodyParams}
                onChange={(e) => {
                    setBodyParams(e.target.value);
                }} />
            <br />
            <br />
            <br />

            <div>Enter query string here (for search requests):</div>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }} />

            <br />
            <br />
            <br />

            <button onClick={() => {
                getAll()
                    .then(response => setValuesFromServer([JSON.stringify(response)]))
                    .catch(error => setValuesFromServer([`Error: ${error.message}`]));
            }}>getAll</button>

            <button onClick={() => {
                getOne(inputId)
                    .then(response => setValuesFromServer([JSON.stringify(response)]))
                    .catch(error => setValuesFromServer([`Error: ${error.message}`]));
            }}>getOne</button>

            <button onClick={() => {
                search(query)
                    .then(response => setValuesFromServer([JSON.stringify(response)]))
                    .catch(error => setValuesFromServer([`Error: ${error.message}`]));
            }}>search</button>

            <button onClick={() => {
                deleteItem(inputId)
                    .then(response => setValuesFromServer([JSON.stringify(response)]))
                    .catch(error => setValuesFromServer([`Error: ${error.message}`]));
            }}>deleteItem</button>

            <button onClick={() => {
                newItem(JSON.parse(bodyParams))
                    .then(response => setValuesFromServer([JSON.stringify(response)]))
                    .catch(error => setValuesFromServer([`Error: ${error.message}`]));
            }}>newItem</button>

            <button onClick={() => {
                updateItem(inputId, JSON.parse(bodyParams))
                    .then(response => setValuesFromServer([JSON.stringify(response)]))
                    .catch(error => setValuesFromServer([`Error: ${error.message}`]));
            }}>update</button>

            <br />
            <br />
            <br />




            <div>Server output data:</div>

            {valuesFromServer.map((value, index) => {
                return <div key={index}>{value}</div>;
            })}
        </>
    );


};
