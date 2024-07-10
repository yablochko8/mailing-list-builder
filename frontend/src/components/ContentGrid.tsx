import { makePascal } from "@/services/util/makePascal";
import { microButton, sectionSubTitle, sectionDetail } from "@/styling/classNames";
import { DataType, apiServiceFactory } from "shared";
import { EditButton } from "./EditMaker";
// import { useState } from "react";


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
    const { deleteItem } = apiServiceFactory(dataType);

    const handleDelete = async (id: number) => {
        try {
            await deleteItem(id);
        } catch (error) {
            console.error(`Error deleting ${dataType}: ${error}`);
        }
        onChange();
    };




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
                            <EditButton id={item.id} dataType={dataType} />
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
