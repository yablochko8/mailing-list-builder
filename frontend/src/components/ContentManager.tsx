import { inputBox, sectionTitle, secondaryButton, primaryButton } from "@/styling/classNames";
import { useEffect, useState } from "react";
import { DataType, apiServiceFactory, DataShapes } from "shared"
import { NewItemMaker } from "./NewItemMaker";
import { ContentGrid } from "./ContentGrid";


type ContentManagerProps = {
    dataType: DataType;
    userToken?: string
}
/**
 * Let's make this work for Sender.
 */
export const ContentManager = (props: ContentManagerProps) => {

    const { dataType, userToken } = props

    const [displayItems, setItems] = useState<DataShapes[typeof dataType][]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [createToggle, setCreateToggle] = useState(false);

    const [key, setKey] = useState(0);

    const { getAll, search } = apiServiceFactory(dataType, userToken)
    const title = dataType.charAt(0).toUpperCase() + dataType.slice(1) + "s"


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
            setItems(response.items);
            setKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error("Error searching lists:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleCreated = () => {
        setCreateToggle(false);
        fetchItems();
        setKey(prevKey => prevKey + 1);
    };


    return (
        <div>
            <div className={sectionTitle}>{title}</div>

            {createToggle && (<NewItemMaker key={key} dataType={dataType} onCancel={() => setCreateToggle(false)} onCreated={handleCreated} />
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
                    <ContentGrid dataType={dataType} items={displayItems} onChange={() => fetchItems()} gridKey={key} />

                    <button onClick={() => setCreateToggle(true)} className={primaryButton}>Create New</button>

                </div>
            )}


        </div>
    );
};