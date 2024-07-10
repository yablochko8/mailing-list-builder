import { flexCol, flexRowMP2, inputBox, primaryButton, secondaryButton, sectionDetail, sectionSubTitle, sectionTitle } from "@/styling/classNames";
import { useState } from "react";
import { ApiServiceFactory, DataType, dataTypes } from "shared";


export const DevApiDashboard = ({ serviceFactory }: { serviceFactory: ApiServiceFactory }) => {

    const [dataType, setDataType] = useState<DataType>(dataTypes[0]);
    const [inputId, setInputId] = useState<number>(1);
    const [query, setQuery] = useState<string>("");
    const [bodyParams, setBodyParams] = useState<string>(`{"key":"value"}`);
    const [valuesFromServer, setValuesFromServer] = useState(["nothing yet"]);

    const { getAll, getOne, search, deleteItem, newItem, updateItem } = serviceFactory(dataType)

    return (
        <>
            <div className={flexCol}>



                <div className={sectionSubTitle}>Choose data type</div>
                <select
                    className={inputBox}
                    value={dataType}
                    onChange={(e) => setDataType(e.target.value as DataType)}
                >
                    {dataTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>


                <div className={sectionSubTitle}>Enter id number</div>
                <div className={sectionDetail}>( getOne / deleteItem / update requests ):</div>

                <input
                    className={inputBox}
                    type="number"
                    value={inputId}
                    onChange={(e) => {
                        setInputId(Number(e.target.value));
                    }} />

                <div className={sectionSubTitle}>Enter body parameters</div>
                <div className={sectionDetail}>( newItem / update requests ):</div>

                <textarea
                    className={inputBox}
                    value={bodyParams}
                    onChange={(e) => {
                        setBodyParams(e.target.value);
                    }} />



                <div className={sectionSubTitle}>Enter query string here (for search requests):</div>
                <input
                    className={inputBox}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }} />


                <div className={flexRowMP2}>
                    <button className={primaryButton} onClick={() => {
                        getAll()
                            .then(response => setValuesFromServer([JSON.stringify(response)]))
                            .catch(error => setValuesFromServer([`Error: ${error.message}`]));
                    }}>getAll</button>

                    <button className={secondaryButton} onClick={() => {
                        getOne(inputId)
                            .then(response => setValuesFromServer([JSON.stringify(response)]))
                            .catch(error => setValuesFromServer([`Error: ${error.message}`]));
                    }}>getOne</button>

                    <button className={secondaryButton} onClick={() => {
                        search(query)
                            .then(response => setValuesFromServer([JSON.stringify(response)]))
                            .catch(error => setValuesFromServer([`Error: ${error.message}`]));
                    }}>search</button>

                    <button className={secondaryButton} onClick={() => {
                        deleteItem(inputId)
                            .then(response => setValuesFromServer([JSON.stringify(response)]))
                            .catch(error => setValuesFromServer([`Error: ${error.message}`]));
                    }}>deleteItem</button>

                    <button className={secondaryButton} onClick={() => {
                        newItem(JSON.parse(bodyParams))
                            .then(response => setValuesFromServer([JSON.stringify(response)]))
                            .catch(error => setValuesFromServer([`Error: ${error.message}`]));
                    }}>newItem</button>

                    <button className={secondaryButton} onClick={() => {
                        updateItem(inputId, JSON.parse(bodyParams))
                            .then(response => setValuesFromServer([JSON.stringify(response)]))
                            .catch(error => setValuesFromServer([`Error: ${error.message}`]));
                    }}>update</button>
                </div>

                <div className={flexCol}>
                    <div className={sectionSubTitle}>Server output data:</div>
                    {valuesFromServer.map((value, index) => {
                        return <div key={index} className={sectionDetail}>{value}</div>;
                    })}
                </div>

            </div>
        </>
    );


};
