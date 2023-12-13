import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CollectionBox from "../components/CollectionBox";
import { useDarkMode } from "../components/DarkModeContext";
import { useTranslation } from "react-i18next";


const MyCollections = () => {
    const { isDarkMode } = useDarkMode()
    const { t } = useTranslation();
    const collections = useSelector(state => state.collections.collections);
    const current_user_id = localStorage.getItem("id")
    const myCollections = collections.filter(collection => collection.user_id == current_user_id)
    const loading = useSelector(state => state.collections.loading);
    const error = useSelector(state => state.collections.error);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong: {error}</p>;

    return (
        <div>
            <h1 className="text-center mt-5 p-4">{t('Listing of all my collections')}</h1>
            {myCollections.map((collection) => (
                <CollectionBox collection={collection} key={collection.id} />)
            )}
            <div class="col-9">
                <Link to={`/new_collection`} className={`btn btn${isDarkMode ? '' : '-outline'}-success m-3 float-end`}>{t('Add new collection')}</Link>
            </div>
        </div>
    );
};
export default MyCollections;