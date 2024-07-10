import { inputBox, sectionSubTitle, primaryButton, standardButton, flexCol, flexRowSimple } from "@/styling/classNames";
import { useState } from "react";
import { DataType, DefaultCreationValues, apiServiceFactory } from "shared";

type NewItemProps = {
    dataType: DataType;
    onCancel: () => void;
    onCreated: () => void;
}

export const NewItemMaker = (props: NewItemProps) => {

    const { dataType, onCancel, onCreated } = props;

    const [newItemDetails, setNewItemDetails] = useState(DefaultCreationValues[dataType]);

    const newItem = apiServiceFactory(dataType).newItem;

    const handleCreate = async () => {
        try {
            await newItem(newItemDetails);
            onCreated();
        } catch (error) {
            console.error(`Error creating new ${dataType}, ${error}`);
        }
    };

    return (
        <div className={flexCol}>

            <div className={flexRowSimple}>
                <div className={sectionSubTitle}>
                    Enter details
                </div>
            </div>


            {Object.keys(newItemDetails).map((inputField) => (
                <div className={flexCol}>
                    <div className={flexRowSimple}>{inputField.charAt(0).toUpperCase() + inputField.slice(1)}</div>
                    <div className={flexRowSimple}>
                        <input
                            key={inputField}
                            type={typeof (DefaultCreationValues[dataType] as any)[inputField] === "number" ? "number" : "text"}
                            value={(newItemDetails as any)[inputField]}
                            onChange={(e) => setNewItemDetails({ ...newItemDetails, [inputField]: e.target.value })}
                            placeholder={inputField.charAt(0).toUpperCase() + inputField.slice(1)}
                            className={inputBox} />
                    </div>
                </div>
            ))
            }

            <div className={flexRowSimple}>
                <button onClick={handleCreate} className={primaryButton}>Create</button>
                <button onClick={() => onCancel()} className={standardButton}>Cancel</button>
            </div>
        </div >
    );

};
