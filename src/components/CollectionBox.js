import { Link } from "react-router-dom"
import { deleteCollection } from "../store/collections"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchUsers } from "../store/users"

const CollectionBox = ({ collection }) => {
    const dispatch = useDispatch()
    // const users = useSelector(state => state.users.users);
    const users = [{ id: 1, name: 'user1' }, { id: 2, name: 'user2' }]
    const loading = useSelector(state => state.users.loading);
    const error = useSelector(state => state.users.error);
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong: {error}</p>;

    const current_user = localStorage.getItem('id')
    const user = users.find(user => user.id === collection.user_id)

    console.log('users:', users);
    const timeFormatter = (time) => {
        const date = new Date(time);
        return date.toLocaleString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true,
        });
    };

    const handleDelete = () => {
        dispatch(deleteCollection(collection.id))
    }


    console.log('current user', current_user);
    return (
        <div class='container'>
            <div class="row justify-content-md-center">
                <div class="col-8 mt-4">
                    <div class="card text-center shadow mb-5 bg-white rounded">
                        <div class="card-header fst-italic">
                            by {user ? (user.id == current_user ? "You" : user.name) : "Loading..."}
                        </div>
                        <div class="card-body">
                            <img src={collection.image_url} height={75} width={100} alt="collection image" />
                            <h5 class="card-title">
                                <Link to={`/collection/${collection.id}`} className="link-success" state={{ collection }}>{collection.name}</Link>
                            </h5>
                            <p class="card-text">{collection.description}</p>
                            <Link to={`/collection/${collection.id}`} className="btn btn-outline-success m-1" state={{ collection }}>View</Link>
                            {user.id == current_user && (<>
                                <button type="button" class="btn btn-outline-danger m-1" onClick={handleDelete}>Delete</button></>)}
                        </div>
                        <div class="card-footer text-muted">
                            Created at {timeFormatter(collection.created_at)}, edited at {timeFormatter(collection.updated_at)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionBox;