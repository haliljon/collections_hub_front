import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
const Comment = ({ comment }) => {
    const users = useSelector(state => state.users.users);
    const user = users.find(user => user.id == comment.user_id);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    }
    return (
        <><div class="card-body p-4">
            <div class="d-flex flex-start">
                <FaUserCircle size={30} />
                <div className="ms-2">
                    <h6 class="fw-bold mb-1 text-success">{user.username}</h6>
                    <div class="d-flex align-items-center mb-3">
                        <p class="mb-0">
                            {formatDate(comment.created_at)}
                        </p>
                    </div>
                    <p class="mb-0">{comment.content}
                    </p>
                </div>
            </div>
        </div>

            <hr class="my-0" style={{ height: "1px" }} /></>
    )
}
export default Comment;