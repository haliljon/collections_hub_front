import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCollection } from '../store/collections';
import isAdmin from './auth/isAdmin';
import { useDarkMode } from './DarkModeContext';
import { useLanguageRussian } from './LanguageRussianContext';

const CollectionBox = ({ collection }) => {
  const { isDarkMode } = useDarkMode();
  const { isRussian } = useLanguageRussian();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Something went wrong:
        {error}
      </p>
    );
  }

  const currentUser = parseInt(localStorage.getItem('id'), 10);
  const user = users.find((user) => user.id === collection.user_id);
  const timeFormatter = (time) => {
    const date = new Date(time);
    return date.toLocaleString('en-US', {
      day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true,
    });
  };

  const handleDelete = async () => {
    try {
      if (collection) {
        await dispatch(deleteCollection(collection.id));
      }
    } catch (err) {
      console.log('Error deleting collection', err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-sm-12 col-md-8 mt-4 mx-auto">
          <div className={`card text-center shadow mb-5 bg-${isDarkMode ? 'dark' : 'white'} rounded`}>
            <div className={`card-header fst-italic text-${isDarkMode ? 'white' : 'dark'}`}>
              {(isRussian ? 'создатель' : 'by')}
              {' '}
              {(user.id === currentUser ? 'You' : user.username)}
            </div>
            <div className="card-body">
              <img src={collection.image_url} height={75} width={100} alt="collection" />
              <h5 className="card-title">
                <Link to={`/collection/${collection.id}`} className={`link-${isDarkMode ? 'light' : 'success'}`} state={{ collection }}>{collection.name}</Link>
              </h5>
              <p className="card-text">{collection.description}</p>
              <Link to={`/collection/${collection.id}`} className={`btn btn-${isDarkMode ? '' : 'outline-'}success m-1`} state={{ collection }}>{isRussian ? 'Cмотреть' : 'View'}</Link>
              {(user.id === currentUser || isAdmin()) && (
                <>
                  <button type="button" className={`btn btn-${isDarkMode ? '' : 'outline-'}danger m-1`} onClick={handleDelete}>{isRussian ? 'Удалить' : 'Delete'}</button>
                </>
              )}
            </div>
            <div className={`card-footer text-${isDarkMode ? 'white' : 'muted'}`}>
              {isRussian ? 'Создано' : 'Created at'}
              {' '}
              {timeFormatter(collection.created_at)}
              ,
              {' '}
              {isRussian ? 'Отредактировано' : 'edited at'}
              {' '}
              {timeFormatter(collection.updated_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBox;

CollectionBox.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
  }).isRequired,
};
