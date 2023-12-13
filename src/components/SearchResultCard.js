import React, { useEffect, useState } from 'react';
import { BiLike } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { addNewComment } from '../store/comments';
import Comment from './Comment';
import { addNewLike, deleteLike } from '../store/likes';
import isAuthenticated from './auth/auth';
import { deleteItem } from '../store/items';
import isAdmin from './auth/isAdmin';
import { useDarkMode } from './DarkModeContext';
import { useTranslation } from 'react-i18next'

const SearchResultCard = ({ item }) => {
    const { isDarkMode } = useDarkMode()
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const allCollections = useSelector(state => state.collections.collections);
    const currentUserId = parseInt(localStorage.getItem('id'));
    const allLikes = useSelector(state => state.likes.likes);
    const allComments = useSelector(state => state.comments.comments);

    const [toggle, setToggle] = useState(false);
    const [liked, setLiked] = useState(false);
    const [commentText, setCommentText] = useState('');

    // Get the collection for the current item
    const collection = allCollections.find(collection => collection.id === item.collection_id);

    // Find the user based on the collection's user_id
    const user = users.find(user => user.id === collection?.user_id);

    // Filter likes and comments for the current item
    const likes = allLikes.filter(like => like.item_id === item.id);
    const comments = allComments.filter(comment => comment.item_id === item.id);
    const currentUserLikes = likes.filter(like => like.user_id === currentUserId);

    const [likesCount, setLikesCount] = useState(likes.length);
    const logged_in = isAuthenticated();


    useEffect(() => {
        setLiked(currentUserLikes.length === 1)
    }, [currentUserLikes])

    const handlePostComment = async () => {
        try {

            const newComment = {
                content: commentText,
                item_id: item.id,
                user_id: currentUserId,
            };
            const addedComment = await dispatch(addNewComment(newComment));
            setCommentText('');
            setToggle(false);
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
                        <li className={`list-group-item ${isDarkMode ? 'bg-dark text-white' : ''}`} key={key}>
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
    let likeColor;
    (liked || isDarkMode) ? likeColor = 'btn-success' : likeColor = 'btn-outline-success';

    const handleLike = async () => {
        try {
            const newLike = {
                item_id: item.id,
                user_id: currentUserId
            }
            if (!liked) {
                await dispatch(addNewLike(newLike))
                setLikesCount(likesCount + 1)
            } else {
                const existingLike = currentUserLikes[0]
                if (existingLike) {
                    await dispatch(deleteLike(existingLike.id))
                    setLikesCount(likesCount - 1)
                }
            }
        } catch (error) {
            console.log('Error handling like', error);
        }
    }

    const handleDeleteItem = () => {
        dispatch(deleteItem(item.id))
    }


    return (
        <div className={`card justify-items-center col-sm-12 col-md-8 col-lg-8 mx-auto m-3 bg-${isDarkMode ? 'dark' : ''}`}>
            <h5 className={`card-title text-center text-${isDarkMode ? 'white' : 'success'} m-3`}>{item.name}</h5>
            <section style={isDarkMode ? { backgroundColor: '#505050' } : { backgroundColor: '#eee' }}>
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-12 col-lg-10 ">
                            <div class={`card m-2 bg-${isDarkMode ? 'dark' : ''}`}>
                                <div class="card-body">
                                    <div class="d-flex flex-start align-items-center">

                                        <FaUserCircle size={60} className={`text-${isDarkMode ? 'white' : ''}`} />
                                        <div className='ms-3'>
                                            {user && (
                                                <>
                                                    <h6 className={`fw-bold text-${isDarkMode ? 'white' : 'success'} mb-1`}>{user.username}</h6>
                                                    <p className={`text-${isDarkMode ? 'white' : 'muted'} small mb-0`}>
                                                        {t('Shared publicly')} - {formatDate(item.created_at)}
                                                    </p>
                                                </>
                                            )}

                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <h5 class={`card-title text-${isDarkMode ? 'white' : ''}`}>{item.name}</h5>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class={`list-group-item ${isDarkMode ? 'bg-dark text-white' : ''}`} >{t('Collection Name')} | {collection.name}</li>
                                        {renderCustomKeyValuePairs(collection, item)}
                                    </ul>
                                    {likesCount > 0 && <p className={`text-${isDarkMode ? 'white' : 'muted'} `}>{likesCount === 1 ? '1 like' : `${likesCount} likes`}</p>}

                                    <div class="small d-flex justify-content-start">
                                        <button disabled={!logged_in} type='button' onClick={handleLike} class={`btn ${likeColor} d-flex align-items-center me-3`} >
                                            <i class="far fa-thumbs-up me-2"></i>
                                            <p class="mb-0"><BiLike /> Like</p>
                                        </button>
                                        <button type='button' disabled={!logged_in} onClick={handleToggle} class={`btn btn-${isDarkMode ? '' : 'outline-'}success  d-flex align-items-center me-3`}>
                                            <FaCommentDots size={20} />
                                            <p class="mb-0 ms-2">{t('Comment')}</p>
                                        </button>
                                        {(currentUserId === user.id || isAdmin()) && <button type='button' onClick={handleDeleteItem} class={`btn btn-${isDarkMode ? '' : 'outline-'}success  d-flex align-items-center me-3`}>
                                            <RiDeleteBin5Fill size={20} />
                                            <p class="mb-0 ms-2">{t('Delete')}</p>
                                        </button>}

                                    </div>
                                </div>
                                {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                                {toggle && <div class={`card-footer py-3 border-0 bg-${isDarkMode ? 'dark' : ''}`} style={{ backgroundColor: `#f8f9fa` }}>
                                    <div class="d-flex flex-start w-100">
                                        <FaUserCircle size={30} className={`${isDarkMode ? 'text-white' : ''}`} />
                                        <div class="form-outline w-100 ms-2">
                                            <textarea class={`form-control ${isDarkMode ? 'bg-dark' : ''}`} id="textAreaExample" rows="4" value={commentText} onChange={(e) => setCommentText(e.target.value)}
                                                style={{ background: '#fff' }}></textarea>
                                            <label class={`form-label ${isDarkMode ? 'text-white' : ''}`} for="textAreaExample">{t('Message')}</label>
                                        </div>
                                    </div>
                                    <div class="float-end mt-2 pt-1">
                                        <button type="button" class="btn btn-success btn-sm me-2" onClick={handlePostComment}>{t('Post comment')}</button>
                                        <button type="button" class={`btn btn-${isDarkMode ? '' : 'outline-'}success btn-sm`}>{t('Cancel')}</button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div >
            </section >

        </div >
    )
}

export default SearchResultCard;