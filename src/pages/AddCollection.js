import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewCollection } from '../store/collections';
import { useDarkMode } from '../components/DarkModeContext';

const AddCollection = () => {
    const { isDarkMode } = useDarkMode()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [collection, setCollection] = useState({
        name: '',
        image_url: '',
        customFields: [],
    });
    const [customFieldType, setCustomFieldType] = useState('');

    const handleInputChange = (e) => {
        setCollection({
            ...collection,
            [e.target.name]: e.target.value,
        });
    };

    const handleCustomFieldTypeChange = (e) => {
        setCustomFieldType(e.target.value);
    };

    const addCustomField = () => {
        if (customFieldType) {
            const typeCount = collection.customFields.filter(field => field.type === customFieldType).length;
            const maxCountPerType = 3;
            if (typeCount < maxCountPerType) {
                setCollection({
                    ...collection,
                    customFields: [
                        ...collection.customFields,
                        { type: customFieldType, value: '' },
                    ],
                });
            } else {
                alert(`You cannot add more than ${maxCountPerType} fields of type ${customFieldType}`);
            }
        }
    };

    const handleCustomFieldValueChange = (index, value) => {
        const updatedCustomFields = [...collection.customFields];
        updatedCustomFields[index].value = value;
        setCollection({
            ...collection,
            customFields: updatedCustomFields,
        });
    };

    const user_id = parseInt(localStorage.getItem('id'));
    const handleSubmit = (e) => {
        e.preventDefault();
        const customFieldsObject = collection.customFields.reduce((result, field, index) => {
            let key;
            if (field.type.startsWith('string')) {
                const count = (result.custom_str_count || 0) + 1;
                key = `custom_str${count}`;
                result.custom_str_count = count;
            } else if (field.type.startsWith('boolean')) {
                const count = (result.custom_bool_count || 0) + 1;
                key = `custom_bool${count}`;
                result.custom_bool_count = count;
            } else if (field.type.startsWith('date')) {
                const count = (result.custom_date_count || 0) + 1;
                key = `custom_date${count}`;
                result.custom_date_count = count;
            } else if (field.type.startsWith('integer')) {
                const count = (result.custom_int_count || 0) + 1;
                key = `custom_int${count}`;
                result.custom_int_count = count;
            }

            if (key) {
                result[key] = field.value;
            }

            return result;
        }, {});

        Object.keys(customFieldsObject).forEach(key => {
            if (key.includes("_count")) {
                delete customFieldsObject[key];
            }
        });


        const formattedCollection = {
            name: collection.name,
            image_url: collection.image_url,
            user_id: user_id,
            ...customFieldsObject,
        };

        dispatch(addNewCollection(formattedCollection));
        navigate(`/my_collections`);
    };

    return (
        <div>
            <div className="col-md col-sm-12 col-xs-12 container-main d-flex flex-row align-items-center login p-0 mt-5">
                <div className="col-md-12 d-flex flex-column align-items-center session-overlay justify-content-center mt-5">
                    <div className="input-box col-md d-flex flex-column align-items-center justify-content-center">
                        <div className="intro">
                            <span className="line" />
                            <h4 className="intro__title">Add New Item to the {collection.name} Collection</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={collection.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL:</label>
                                <input
                                    type="text"
                                    id="image_url"
                                    name="image_url"
                                    className='form-control'
                                    value={collection.image_url}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="customFieldType">Custom Field Type:</label>
                                <select
                                    id="customFieldType"
                                    name="customFieldType"
                                    value={customFieldType}
                                    onChange={handleCustomFieldTypeChange}
                                    className="form-select form-select-sm"
                                >
                                    <option value="">Select Type</option>
                                    <option value="string">String</option>
                                    <option value="boolean">Boolean</option>
                                    <option value="text">Text</option>
                                    <option value="date">Date</option>
                                    <option value="integer">Integer</option>
                                </select>
                                <button type="button" className={`btn btn-${isDarkMode ? '' : 'outline-'}success mt-2 float-end w-100`} onClick={addCustomField}>
                                    Add Custom Field
                                </button>
                            </div>
                            {collection.customFields.map((customField, index) => (
                                <div key={index}>
                                    <label htmlFor={`customField${index}`}>{customField.type}:</label>
                                    <input
                                        className='form-control'
                                        type="text"
                                        id={`customField${index}`}
                                        name={`customField${index}`}
                                        value={customField.value}
                                        onChange={(e) =>
                                            handleCustomFieldValueChange(index, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                            <button type="submit" className="btn btn-success float-end mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCollection;
