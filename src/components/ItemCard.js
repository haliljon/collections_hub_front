import React, { useState } from 'react';
const ItemCard = ({ item, collection }) => {
    const [toggle, setToggle] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const renderCustomKeyValuePairs = (collection, item) => {
        return Object.keys(collection)
            .filter((key) => key.startsWith('custom_'))
            .map((key) => {
                // Check if the value is not null in both collection and item
                if (collection[key] !== null && item[key] !== null) {
                    const formattedValue =
                        key.startsWith('custom_date') ? formatDate(item[key]) : item[key];

                    return (
                        <li className="list-group-item" key={key}>
                            {`${collection[key]} | ${formattedValue}`}
                        </li>
                    );
                }
                return null;
            })
            .filter(Boolean); // Filter out null values from the map
    };

    const handleToggle = () => {
        setToggle(!toggle);
    }
    return (
        <div className="card m-3" style={{ width: '60vw' }}>

            <h5 className="card-title text-center m-3">{item.name}</h5>
            <section style={{ backgroundColor: '#eee' }}>
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-12 col-lg-10 col-xl-8">
                            <div class="card m-2">
                                <div class="card-body">
                                    <div class="d-flex flex-start align-items-center">
                                        <img class="rounded-circle shadow-1-strong me-3"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="60"
                                            height="60" />
                                        <div>
                                            <h6 class="fw-bold text-success mb-1">Lily Coleman</h6>
                                            <p class="text-muted small mb-0">
                                                Shared publicly - {formatDate(item.created_at)}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <h5 class="card-title">{item.name}</h5>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Collection Name | {collection.name}</li>
                                        {renderCustomKeyValuePairs(collection, item)}
                                    </ul>

                                    <div class="small d-flex justify-content-start">
                                        <a href="#!" class="d-flex align-items-center me-3">
                                            <i class="far fa-thumbs-up me-2"></i>
                                            <p class="mb-0">Like</p>
                                        </a>
                                        <a href="#!" onClick={handleToggle} class="d-flex align-items-center me-3">
                                            <i class="far fa-comment-dots me-2"></i>
                                            <p class="mb-0">Comment</p>
                                        </a>
                                    </div>
                                </div>
                                {toggle && <div class="card-footer py-3 border-0" style={{ backgroundColor: `#f8f9fa` }}>
                                    <div class="d-flex flex-start w-100">
                                        <img class="rounded-circle shadow-1-strong me-3"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                                            height="40" />
                                        <div class="form-outline w-100">
                                            <textarea class="form-control" id="textAreaExample" rows="4"
                                                style={{ background: '#fff' }}></textarea>
                                            <label class="form-label" for="textAreaExample">Message</label>
                                        </div>
                                    </div>
                                    <div class="float-end mt-2 pt-1">
                                        <button type="button" class="btn btn-success btn-sm me-2">Post comment</button>
                                        <button type="button" class="btn btn-outline-success btn-sm">Cancel</button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </div >
    )
}

export default ItemCard;