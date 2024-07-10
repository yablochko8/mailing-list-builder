import { makePascal } from "@/services/util/makePascal";
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

    const { newItem } = apiServiceFactory(dataType);

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
                    <div className={flexRowSimple}>{makePascal(inputField)}</div>
                    <div className={flexRowSimple}>
                        <input
                            key={inputField}
                            type={typeof (DefaultCreationValues[dataType] as any)[inputField] === "number" ? "number" : "text"}
                            value={(newItemDetails as any)[inputField]}
                            onChange={(e) => setNewItemDetails({ ...newItemDetails, [inputField]: e.target.value })}
                            placeholder={makePascal(inputField)}
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
