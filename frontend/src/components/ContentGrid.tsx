import { makePascal } from "@/services/util/makePascal";
import { microButton, sectionSubTitle, sectionDetail, primaryButton, secondaryButton, standardButton } from "@/styling/classNames";
import { DataType, apiServiceFactory } from "shared";
import { EditButton, EditModalContents } from "./EditMaker";
import { useState } from "react";




type ContentGridProps = {
    dataType: DataType;
    items: any[];
    onChange: () => void;
    gridKey: number;
}

export const ContentGrid = (props: ContentGridProps) => {

    const { dataType, items, onChange, gridKey } = props;

    const colsToExclude = [
        "id",
        "createdAt",
        "updatedAt",
        "deletedAt",
        "version",
        "clerkId",
    ];
    const { deleteItem, updateItem } = apiServiceFactory(dataType);

    const handleDelete = async (id: number) => {
        try {
            await deleteItem(id);
        } catch (error) {
            console.error("Error deleting list:", error);
        }
        onChange();
    };


    const handleEdit = async (id: number) => {
        const newName = prompt("Enter new name for the list:");
        if (newName !== null) {
            try {
                await updateItem(id, { name: newName });
            } catch (error) {
                console.error("Error updating list name:", error);
            }
        }
        onChange();
    };

    const [isModalOpen, setIsModalOpen] = useState(false);







    return (
        <>
            <div key={gridKey} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Object.keys(items[0] || {}).filter(key => !colsToExclude.includes(key)).length + 2}, minmax(0, 1fr))` }}>
                {Object.keys(items[0] || {}).filter(key => !colsToExclude.includes(key)).map(key => (
                    <div key={key} className={sectionSubTitle}>
                        {makePascal(key)}
                    </div>
                ))}
                <div className={sectionSubTitle}></div>
                <div className={sectionSubTitle}></div>

                {items.map((item) => (
                    <>
                        {Object.entries(item).filter(([key]) => !colsToExclude.includes(key)).map(([key, value]) => (
                            <div key={`${item.id}-${key}`} className={sectionDetail}>
                                {String(value)}
                            </div>
                        ))}
                        <div>
                            <button onClick={() => handleEdit(item.id)} className={microButton}>Edit</button>
                            <EditButton id={1} dataType={dataType} />
                        </div>
                        <div>
                            <button onClick={() => handleDelete(item.id)} className={microButton}>Delete</button>
                        </div>
                    </>
                ))}
            </div>


        </>

    );

};
