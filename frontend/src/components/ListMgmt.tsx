import { useEffect, useState } from "react";
import { apiServiceFactory } from "shared"


/**
 * This JSX component shows a list of mailing lists. For each list it shows the name
 * and number of recipients on the list.
 */
export const ListMgmt = ({ senderId }: { senderId: number }) => {
    const [lists, setLists] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [newListName, setNewListName] = useState("");

    const { getAll, search, deleteItem, newItem, updateItem } = apiServiceFactory("list")

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        try {
            const response = await getAll();
            setLists(response.items);
        } catch (error) {
            console.error("Error fetching lists:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await search(searchQuery);
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
            setShowCreatePopup(false);
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
            <div className="font-bold text-red-600">Mailing Lists</div>

            {showCreatePopup && (

                <div className="popup">
                    <button onClick={() => setShowCreatePopup(false)}>Back to Search</button>

                    <h3>Create New List</h3>
                    <input
                        type="text"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        placeholder="Enter list name"
                    />
                    <button onClick={handleCreateList}>Create</button>
                    <button onClick={() => setShowCreatePopup(false)}>Cancel</button>
                </div>
            )}

            {!showCreatePopup && (
                <div>
                    <button onClick={() => setShowCreatePopup(true)}>Create New</button>

                    <div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search lists..."
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <ul>
                        {lists.map((list) => (
                            <div key={list.id} className="list-item">
                                <span className="list-name">{list.name}</span>
                                <span className="recipient-count"> - Recipients: {list.recipientCount}</span>
                                <button onClick={() => handleDelete(list.id)}>Delete</button>
                                <button onClick={() => handleChangeName(list.id)}>Rename</button>
                            </div>
                        ))}
                    </ul>

                </div>
            )}


        </div>
    );
};