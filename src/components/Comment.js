import { FaUserCircle } from 'react-icons/fa';
import { RiChatDeleteFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../store/comments';
import isAdmin from './auth/isAdmin';
import { useDarkMode } from './DarkModeContext';
import { useLanguageRussian } from './LanguageRussianContext';

const Comment = ({ comment }) => {
  const { isDarkMode } = useDarkMode();
  const { isRussian } = useLanguageRussian();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const user = users.find((user) => user.id === comment.user_id);
  const currentUserId = parseInt(localStorage.getItem('id'), 10);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const handleDeleteComment = async () => {
    try {
      if (comment) {
        await dispatch(deleteComment(comment.id));
      }
    } catch (err) {
      console.log('Error deleting comment', err);
    }
  };
  return (
    <>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-grow-1">
            <FaUserCircle size={30} className={`${isDarkMode ? 'text-white' : ''}`} />
            <div className="ms-2">
              <h6 className={`fw-bold mb-1 text-${isDarkMode ? 'white' : 'success'}`}>{user.username}</h6>
              <div className="d-flex align-items-center mb-3">
                <p className={`mb-0 ${isDarkMode ? 'text-white' : ''}`}>
                  {formatDate(comment.created_at)}
                </p>
              </div>
              <p className={`mb-0 ${isDarkMode ? 'text-white' : ''}`}>{comment.content}</p>
            </div>
          </div>
          {(user.id === currentUserId || isAdmin())
                        && (
                        <button type="button" className={`btn btn-${isDarkMode ? '' : 'outline-'}success align-items-center`} onClick={handleDeleteComment} style={{ height: '40px' }}>
                          <p className="m-0">
                            <RiChatDeleteFill size={20} />
                            {' '}
                            {isRussian ? 'Удалить' : 'Delete'}
                          </p>
                        </button>
                        )}

        </div>
      </div>

      <hr className="my-0" style={{ height: '1px' }} />
    </>
  );
};
export default Comment;

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    created_at: PropTypes.string,
    user_id: PropTypes.number,
  }).isRequired,
};
