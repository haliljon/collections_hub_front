import React, { useState } from 'react';
import { BiLike } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addNewComment } from '../store/comments';
import Comment from './Comment';
const ItemCard = ({ item, collection }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const user = users.find(user => user.id == collection.user_id);
    const [toggle, setToggle] = useState(false);
    const [commentText, setCommentText] = useState('');
    const allComments = useSelector(state => state.comments.comments)
    const comments = allComments.filter(comment => comment.item_id == item.id);

    const handlePostComment = async () => {
        try {
            const newComment = {
                content: commentText,
                item_id: item.id,
                user_id: parseInt(localStorage.getItem('id')),
            };
            const addedComment = await dispatch(addNewComment(newComment));
            setCommentText('');
            setToggle(false);
            console.log('addedComment', addedComment);
        } catch (err) {
            console.log("Error posting comment", err);
        }
    };


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
        <div className="card justify-items-center mx-auto m-3" style={{ width: '50vw' }}>

            <h5 className="card-title text-center text-success m-3">{item.name}</h5>
            <section style={{ backgroundColor: '#eee' }}>
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-12 col-lg-10 ">
                            <div class="card m-2">
                                <div class="card-body">
                                    <div class="d-flex flex-start align-items-center">

                                        <FaUserCircle size={60} />
                                        <div className='ms-3'>
                                            <h6 class="fw-bold text-success mb-1">{user.username}</h6>
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
                                        <button type='button' class="btn btn-outline-success d-flex align-items-center me-3" >
                                            <i class="far fa-thumbs-up me-2"></i>
                                            <p class="mb-0"><BiLike /> Like</p>
                                        </button>
                                        <button type='button' onClick={handleToggle} class="btn btn-outline-success  d-flex align-items-center me-3">
                                            <FaCommentDots size={20} />
                                            <p class="mb-0 ms-2">Comment</p>
                                        </button>
                                    </div>
                                </div>
                                {comments.map(comment => <Comment comment={comment} />)}
                                {toggle && <div class="card-footer py-3 border-0" style={{ backgroundColor: `#f8f9fa` }}>
                                    <div class="d-flex flex-start w-100">
                                        <FaUserCircle size={30} />
                                        <div class="form-outline w-100 ms-2">
                                            <textarea class="form-control" id="textAreaExample" rows="4" value={commentText} onChange={(e) => setCommentText(e.target.value)}
                                                style={{ background: '#fff' }}></textarea>
                                            <label class="form-label" for="textAreaExample">Message</label>
                                        </div>
                                    </div>
                                    <div class="float-end mt-2 pt-1">
                                        <button type="button" class="btn btn-success btn-sm me-2" onClick={handlePostComment}>Post comment</button>
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