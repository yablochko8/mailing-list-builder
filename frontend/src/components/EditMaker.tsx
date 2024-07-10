import { makePascal } from "@/services/util/makePascal";
import { inputBox, sectionSubTitle, primaryButton, standardButton, flexCol, flexRowSimple, microButton, sectionDetail } from "@/styling/classNames";
import { useEffect, useState } from "react";
import { DataType, DefaultCreationValues, apiServiceFactory, DataShapes } from "shared";




export const EditButton = ({ id, dataType }: { id: number, dataType: DataType; }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };


    return (
        <>
            <button onClick={toggleModal} className={microButton}>Edit2</button>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <EditModalContents id={id} onCancel={toggleModal} onSave={toggleModal} dataType={dataType} />
                    </div>
                </div>
            )}
        </>
    )
}


type EditMakerProps = {
    dataType: DataType;
    id: number;
    onCancel: () => void;
    onSave: () => void;
}

export const EditModalContents = (props: EditMakerProps) => {

    const { dataType, id, onCancel, onSave } = props;
    const { getOne, updateItem } = apiServiceFactory(dataType)

    const [itemDetails, setItemDetails] = useState<DataShapes[typeof dataType] | null>(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const latestDetails = await getOne(id);
                setItemDetails(latestDetails);
            } catch (error) {
                console.error(`Error fetching ${dataType} details:`, error);
            }
        };

        fetchItemDetails();
    }, [id, dataType]);

    const handleSave = async () => {
        if (!itemDetails) {
            console.error(`Cannot save: itemDetails is null for ${dataType}`);
            return;
        }
        try {
            await updateItem(itemDetails.id, itemDetails);
            onSave();
        } catch (error) {
            console.error(`Error updating ${dataType}:`, error);
        }
    };

    return (
        <div>
            <p className={sectionSubTitle}>Edit {makePascal(dataType)}</p>
            <p className={sectionDetail}>ID: {id}</p>

            {itemDetails && Object.keys(itemDetails).length > 0 ? (
                Object.keys(itemDetails).map((inputField) => (
                    <div key={inputField} className={flexCol}>
                        <div className={flexRowSimple}>{inputField.charAt(0).toUpperCase() + inputField.slice(1)}</div>
                        <div className={flexRowSimple}>
                            <input
                                type={typeof (DefaultCreationValues[dataType] as any)[inputField] === "number" ? "number" : "text"}
                                value={(itemDetails as any)[inputField] || ""}
                                onChange={(e) => setItemDetails({ ...itemDetails, [inputField]: e.target.value })}
                                placeholder={inputField.charAt(0).toUpperCase() + inputField.slice(1)}
                                className={inputBox}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <div></div>
            )}

            <div className={flexRowSimple}>
                <button onClick={handleSave} className={primaryButton}>Save</button>
                <button onClick={() => onCancel()} className={standardButton}>Cancel</button>
            </div>
        </div >
    );

};
