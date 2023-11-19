import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addNewItem } from "../store/items";
import { fetchCollections } from "../store/collections";

const AddItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [itemName, setItemName] = useState("");
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const [customInputs, setCustomInputs] = useState({});
    const collections = useSelector(state => state.collections.collections);
    const loading = useSelector(state => state.collections.loading);
    const error = useSelector(state => state.collections.error);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong: {error}</p>;

    const collection = collections.find(collection => collection.id == id);
    const current_user_id = localStorage.getItem("id")

    if (!collection) {
        return <p>Collection not found</p>; // or handle the error in your preferred way
    }

    // State to store values of dynamic custom_ inputs

    const createInputField = (attribute, type) => (
        <div className="form-group" key={attribute}>
            <label htmlFor={attribute}>{collection[attribute]}</label>
            <input
                type={type}
                className="form-control"
                id={attribute}
                placeholder={`Enter ${collection[attribute]}`}
                onChange={(e) => handleCustomInputChange(attribute, e.target.value)}
            />
        </div>
    );

    const createFormElements = (filterFn, type) => {
        const customAttributes = Object.keys(collection).filter(filterFn);
        return customAttributes.map(attribute => createInputField(attribute, type));
    };

    const handleInputChange = (e) => {
        setItemName(e.target.value);
    };

    // Function to handle changes in dynamic custom_ inputs
    const handleCustomInputChange = (attribute, value) => {
        setCustomInputs({
            ...customInputs,
            [attribute]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            name: itemName,
            collection_id: collection.id,
            tags: tags,
            ...customInputs,
        };
        console.log('newItem', newItem);
        dispatch(addNewItem(newItem));
        navigate(`/collection/${collection.id}`, { state: { collection } });
    }

    //Tags
    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };

    const isCreator = (current_user_id === collection.user_id);

    if (!isCreator) {
        return <p className="m-5 p-5 text-center"> You don't have permission to add items to this collection</p>;
    }

    return (
        <div className="col-md col-sm-12 col-xs-12 container-main d-flex flex-row align-items-center login p-0 mt-5">
            <div className="col-md-12 d-flex flex-column align-items-center session-overlay justify-content-center mt-5">
                <div className="input-box col-md d-flex flex-column align-items-center justify-content-center">
                    <div className="intro">
                        <span className="line" />
                        <h4 className="intro__title">Add New Item to the {collection.name} Collection</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>

                            <input type="text" className="form-control" id="name" placeholder={`Enter the item name `} onChange={handleInputChange} />
                        </div>
                        {createFormElements(key => key.startsWith('custom_str') && collection[key] !== null, 'text')}
                        {createFormElements(key => key.startsWith('custom_int') && collection[key] !== null, 'number')}
                        {createFormElements(key => key.startsWith('custom_date') && collection[key] !== null, 'date')}
                        {createFormElements(key => key.startsWith('custom_bool') && collection[key] !== null, 'checkbox')}
                        {createFormElements(key => key.startsWith('custom_text') && collection[key] !== null, 'textarea')}

                        <label>
                            Tags:
                            <input className="form-control"
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                            />
                            <button type="button" className="btn btn-outline-success mt-2 float-end" onClick={handleAddTag}>
                                Add Tag
                            </button>
                        </label>

                        <div>
                            {tags.map((tag, index) => (
                                <div key={index}>
                                    {`${tag} `}
                                    <button type="button" className="btn btn-outline-success  mb-1 btn-sm" onClick={() => handleRemoveTag(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button type="submit" className="btn btn-success float-end mt-3" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddItem;

