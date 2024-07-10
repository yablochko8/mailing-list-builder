import { flexCol, microButton, sectionSubTitle, sectionDetail } from "@/styling/classNames";
import { DataType, apiServiceFactory } from "shared";

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


    const handleChangeName = async (id: number) => {
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

    return (
        <>
            <div key={gridKey}>
                {items.map((item) => (
                    <div key={item.id} className="flex flex-row justify-end">



                        {Object.entries(item).filter(([key]) => !colsToExclude.includes(key)).map(([key, value]) => (
                            <div key={key} className={flexCol}>
                                <span className={sectionSubTitle}>{key}:</span>
                                <span className={sectionDetail}>{String(value)}</span>
                            </div>
                        ))}



                        <div className={flexCol}>
                            <button onClick={() => handleChangeName(item.id)} className={microButton}>Edit</button>

                        </div>
                        <div className={flexCol}>
                            <button onClick={() => handleDelete(item.id)} className={microButton}>Delete</button>

                        </div>

                    </div>
                ))}


            </div>


        </>

    );

};
