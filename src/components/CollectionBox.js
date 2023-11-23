import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteCollection } from "../store/collections"
import isAdmin from "./auth/isAdmin"
import { useDarkMode } from "./DarkModeContext"
import { useLanguageRussian } from "./LanguageRussianContext"

const CollectionBox = ({ collection }) => {
    const { isDarkMode } = useDarkMode()
    const isRussian = useLanguageRussian().isRussian
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.users.loading);
    const error = useSelector(state => state.users.error);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong: {error}</p>;

    const current_user = parseInt(localStorage.getItem('id'));
    const user = users.find(user => user.id === collection.user_id)
    const timeFormatter = (time) => {
        const date = new Date(time);
        return date.toLocaleString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true,
        });
    };

    const handleDelete = async () => {
        try {
            if (collection) {
                await dispatch(deleteCollection(collection.id))
            }
        } catch (err) {
            console.log('Error deleting collection', err);
        }
    }

    return (
        <div class='container'>
            <div class="row justify-content-md-center">
                <div class="col-sm-12 col-md-8 mt-4 mx-auto">
                    <div class={`card text-center shadow mb-5 bg-${isDarkMode ? 'dark' : 'white'} rounded`}>
                        <div class={`card-header fst-italic text-${isDarkMode ? 'white' : 'dark'}`}>
                            {(isRussian ? 'создатель' : 'by')} {(user.id == current_user ? "You" : user.username)}
                        </div>
                        <div class="card-body">
                            <img src={collection.image_url} height={75} width={100} alt="collection image" />
                            <h5 class="card-title">
                                <Link to={`/collection/${collection.id}`} className={`link-${isDarkMode ? 'light' : 'success'}`} state={{ collection }}>{collection.name}</Link>
                            </h5>
                            <p class="card-text">{collection.description}</p>
                            <Link to={`/collection/${collection.id}`} className={`btn btn-${isDarkMode ? '' : 'outline-'}success m-1`} state={{ collection }}>{isRussian ? 'Cмотреть' : 'View'}</Link>
                            {(user.id === current_user || isAdmin()) && (<>
                                <button type="button" class={`btn btn-${isDarkMode ? '' : 'outline-'}danger m-1`} onClick={handleDelete}>{isRussian ? 'Удалить' : 'Delete'}</button></>)}
                        </div>
                        <div class={`card-footer text-${isDarkMode ? 'white' : 'muted'}`}>
                            {isRussian ? 'Создано' : 'Created at'} {timeFormatter(collection.created_at)}, {isRussian ? 'Отредактировано' : 'edited at'} {timeFormatter(collection.updated_at)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionBox;