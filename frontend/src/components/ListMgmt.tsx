import { inputBox, sectionSubTitle, sectionTitle, secondaryButton, primaryButton, standardButton, flexCol, flexRowSimple, microButton } from "@/styling/classNames";
import { useEffect, useState } from "react";
import { apiServiceFactory } from "shared"


/**
 * This JSX component shows a list of mailing lists. For each list it shows the name
 * and number of recipients on the list.
 */
export const ListMgmt = ({ senderId }: { senderId: number }) => {
    const [lists, setLists] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [createToggle, setCreateToggle] = useState(false);
    const [newListName, setNewListName] = useState("");

    const { getAll, search, deleteItem, newItem, updateItem } = apiServiceFactory("list")

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
            setLists(response.items);
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

    const handleCreateList = async () => {
        try {
            await newItem({ name: newListName, senderId });
            setNewListName("");
            setCreateToggle(false);
            fetchLists(); // Refresh the list after creation
        } catch (error) {
            console.error("Error creating new list:", error);
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

    return (
        <div>
            <div className={sectionTitle}>Mailing Lists</div>

            {createToggle && (

                <div className={flexCol}>

                    <div className={flexRowSimple}>
                        <div className={sectionSubTitle}>
                            Enter details
                        </div>
                    </div>
                    <div className={flexRowSimple}>

                        <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="List name"
                            className={inputBox}
                        />
                    </div>
                    <div className={flexRowSimple}>
                        <button onClick={handleCreateList} className={primaryButton}>Create</button>
                        <button onClick={() => setCreateToggle(false)} className={standardButton}>Cancel</button>
                    </div>
                </div>
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
                        {lists.map((list) => (
                            <div key={list.id} className="flex flex-row justify-end">
                                <div className={flexCol}>{list.name} - {list.recipientCount}</div>
                                <div className={flexCol}>
                                    <button onClick={() => handleChangeName(list.id)} className={microButton}>Edit</button>

                                </div>
                                <div className={flexCol}>
                                    <button onClick={() => handleDelete(list.id)} className={microButton}>Delete</button>

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