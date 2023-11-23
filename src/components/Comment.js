import { FaUserCircle } from "react-icons/fa";
import { RiChatDeleteFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../store/comments";
import isAdmin from "./auth/isAdmin";
import { useDarkMode } from "./DarkModeContext";
import { useLanguageRussian } from "./LanguageRussianContext";

const Comment = ({ comment }) => {
    const { isDarkMode } = useDarkMode()
    const isRussian = useLanguageRussian().isRussian
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const user = users.find(user => user.id == comment.user_id);
    const current_user_id = parseInt(localStorage.getItem('id'))
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    }

    const handleDeleteComment = async () => {
        try {
            if (comment) {
                await dispatch(deleteComment(comment.id))
            }
        } catch (err) {
            console.log('Error deleting comment', err);
        }
    }
    return (
        <><div class="card-body p-4">
            <div class="d-flex justify-content-between">
                <div className="d-flex flex-grow-1">
                    <FaUserCircle size={30} className={`${isDarkMode ? 'text-white' : ''}`} />
                    <div className="ms-2">
                        <h6 class={`fw-bold mb-1 text-${isDarkMode ? 'white' : 'success'}`}>{user.username}</h6>
                        <div class="d-flex align-items-center mb-3">
                            <p class={`mb-0 ${isDarkMode ? 'text-white' : ''}`}>
                                {formatDate(comment.created_at)}
                            </p>
                        </div>
                        <p class={`mb-0 ${isDarkMode ? 'text-white' : ''}`}>{comment.content}</p>
                    </div>
                </div>
                {(user.id === current_user_id || isAdmin()) &&
                    <button type='button' class={`btn btn-${isDarkMode ? '' : 'outline-'}success align-items-center`} onClick={handleDeleteComment} style={{ height: '40px' }}>
                        <p class="m-0"><RiChatDeleteFill size={20} /> {isRussian ? 'Удалить' : 'Delete'}</p>
                    </button>}

            </div>
        </div>

            <hr class="my-0" style={{ height: "1px" }} /></>
    )
}
export default Comment;