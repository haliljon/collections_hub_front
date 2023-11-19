import { useDispatch, useSelector } from "react-redux";
import CollectionBox from "../components/CollectionBox";

const Home = ({ loggedInStatus }) => {
    const dispatch = useDispatch()
    const collections = useSelector(state => state.collections.collections);
    const loading = useSelector(state => state.collections.loading);
    const error = useSelector(state => state.collections.error);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong: {error}</p>;

    return (
        <div>
            <h1 className="text-center mt-5 p-4">Listing of all collections</h1>
            <p>Welcome to the Home page!</p>
            <h2>Status: {loggedInStatus}</h2>
            {collections.map((collection) => (
                <CollectionBox collection={collection} key={collection.id} />)
            )}
        </div>
    );
};
export default Home;