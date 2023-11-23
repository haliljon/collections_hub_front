import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CollectionBox from '../components/CollectionBox';
import { useDarkMode } from '../components/DarkModeContext';
import { useLanguageRussian } from '../components/LanguageRussianContext';

const MyCollections = () => {
  const { isDarkMode } = useDarkMode();
  const { isRussian } = useLanguageRussian();
  const collections = useSelector((state) => state.collections.collections);
  const currentUserId = localStorage.getItem('id');
  const myCollections = collections.filter((collection) => collection.user_id === currentUserId);
  const loading = useSelector((state) => state.collections.loading);
  const error = useSelector((state) => state.collections.error);
  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Something went wrong:
        {error}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-center mt-5 p-4">{isRussian ? 'Список всех моих коллекций' : 'Listing of all my collections'}</h1>
      {myCollections.map((collection) => (
        <CollectionBox collection={collection} key={collection.id} />))}
      <div className="col-9">
        <Link to="/new_collection" className={`btn btn${isDarkMode ? '' : '-outline'}-success m-3 float-end`}>{isRussian ? 'Добавить новую коллекцию' : 'Add new collection'}</Link>
      </div>
    </div>
  );
};
export default MyCollections;
