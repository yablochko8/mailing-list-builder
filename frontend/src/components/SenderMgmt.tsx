import { inputBox, sectionTitle, secondaryButton, primaryButton } from "@/styling/classNames";
import { useEffect, useState } from "react";
import { DataType, apiServiceFactory, DataShapes } from "shared"
import { NewItemMaker } from "./NewItemMaker";
import { ContentGrid } from "./ContentGrid";


type ContentManagerProps = {
    dataType: DataType
}
/**
 * Let's make this work for Sender.
 */
export const ContentManager = (props: ContentManagerProps) => {
    const [displayItems, setItems] = useState<DataShapes[typeof props.dataType][]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [createToggle, setCreateToggle] = useState(false);

    const [key, setKey] = useState(0); // Add this line
    console.log("Key is", key)

    const { getAll, search } = apiServiceFactory(props.dataType)
    const title = props.dataType.charAt(0).toUpperCase() + props.dataType.slice(1) + "s"

    useEffect(() => {
        fetchItems();
    }, []);


    /**
     * Handles getAll AND search. This is invoked on first render.
     */
    const fetchItems = async () => {
        try {
            let response;
            if (searchQuery.trim() === "") {
                response = await getAll();
            } else {
                response = await search(searchQuery);
            }
            console.log("setItems now....", displayItems)
            setItems(response.items);
            console.log("setItems done....", response.items); // Log the new items, not the current state
            setKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error("Error searching lists:", error);
        }
    };



    const handleCreated = () => {
        setCreateToggle(false);
        fetchItems();
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
                        <button onClick={fetchItems} className={secondaryButton}>Search</button>
                    </div>
                    <ContentGrid dataType={props.dataType} items={displayItems} onChange={() => fetchItems()} gridKey={key} />

                    <button onClick={() => setCreateToggle(true)} className={primaryButton}>Create New</button>

                </div>
            )}


        </div>
    );
};