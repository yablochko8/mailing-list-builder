import { inputBox, sectionSubTitle, sectionTitle, secondaryButton, primaryButton, standardButton, flexCol, flexRowSimple, microButton } from "@/styling/classNames";
import { useEffect, useState } from "react";
import { DataType, DefaultCreationValues, apiServiceFactory } from "shared"

// import { Sender } from "shared/types/prisma"

type NewItemProps = {
    dataType: DataType;
    onCancel: () => void;
    onCreated: () => void;
}
const NewItemMaker = (props: NewItemProps) => {

    const { dataType, onCancel, onCreated } = props

    const [newItemDetails, setNewItemDetails] = useState(DefaultCreationValues[dataType]);

    const newItem = apiServiceFactory(dataType).newItem

    const handleCreate = async () => {
        try {
            await newItem(newItemDetails);
            onCreated()
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


            {Object.keys(newItemDetails).map((key) => (
                <div className={flexRowSimple}>
                    <input
                        key={key}
                        type="text"
                        value={(newItemDetails as any)[key]}
                        onChange={(e) => setNewItemDetails({ ...newItemDetails, [key]: e.target.value })}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        className={inputBox}
                    />
                </div>
            ))}

            <div className={flexRowSimple}>
                <button onClick={handleCreate} className={primaryButton}>Create</button>
                <button onClick={() => onCancel()} className={standardButton}>Cancel</button>
            </div>
        </div>
    )

}

type ContentManagerProps = {
    dataType: DataType
}
/**
 * Let's make this work for Sender.
 */
export const ContentManager = (props: ContentManagerProps) => {
    const [items, setItems] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [createToggle, setCreateToggle] = useState(false);

    const [key, setKey] = useState(0); // Add this line

    const { getAll, search, deleteItem, newItem, updateItem } = apiServiceFactory(props.dataType)
    const title = props.dataType.charAt(0).toUpperCase() + props.dataType.slice(1) + "s"

    useEffect(() => {
        fetchLists();
    }, []);


    /**
     * Handles getAll AND search. This is invoked on first render.
     */
    const fetchLists = async () => {
        try {
            let response;
            if (searchQuery.trim() === "") {
                response = await getAll();
            } else {
                response = await search(searchQuery);
            }
            setItems(response.items);
        } catch (error) {
            console.error("Error searching lists:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteItem(id);
            fetchLists(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting list:", error);
        }
    };


    const handleChangeName = async (id: number) => {
        const newName = prompt("Enter new name for the list:");
        if (newName !== null) {
            try {
                await updateItem(id, { name: newName });
                fetchLists(); // Refresh the list after update
            } catch (error) {
                console.error("Error updating list name:", error);
            }
        }
    };

    const handleCreated = () => {
        setCreateToggle(false);
        fetchLists();
        setKey(prevKey => prevKey + 1); // Add this line
    };

    return (
        <div>
            <div className={sectionTitle}>{title}</div>

            {createToggle && (<NewItemMaker key={key} dataType={props.dataType} onCancel={() => setCreateToggle(false)} onCreated={handleCreated} />
            )}

            {!createToggle && (
                <div>

                    <div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search lists..."
                            className={inputBox}
                        />
                        <button onClick={fetchLists} className={secondaryButton}>Search</button>
                    </div>
                    <ul>
                        {items.map((item) => (
                            <div key={item.id} className="flex flex-row justify-end">
                                <div className={flexCol}>{item.name} - {item.recipientCount}</div>
                                <div className={flexCol}>
                                    <button onClick={() => handleChangeName(item.id)} className={microButton}>Edit</button>

                                </div>
                                <div className={flexCol}>
                                    <button onClick={() => handleDelete(item.id)} className={microButton}>Delete</button>

                                </div>

                            </div>
                        ))}
                    </ul>
                    <button onClick={() => setCreateToggle(true)} className={primaryButton}>Create New</button>

                </div>
            )}


        </div>
    );
};