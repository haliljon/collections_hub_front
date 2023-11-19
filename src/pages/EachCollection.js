import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemCard from '../components/ItemCard';

const EachCollection = () => {
    const { id } = useParams();
    const collections = useSelector(state => state.collections.collections);
    const allItems = useSelector(state => state.items.items);
    const loadingItems = useSelector(state => state.items.loading);
    const errorItems = useSelector(state => state.items.error);

    const current_user_id = localStorage.getItem("id")
    const items = allItems.filter(item => item.collection_id == id);
    const collection = collections.find(collection => collection.id == id);
    console.log('collection', collection.id);

    if (loadingItems) return <p>Items loading...</p>;
    if (errorItems) return <p>Something went wrong: {errorItems}</p>;

    const customAttributesCollection = Object.keys(collection)
        .filter(key => key.startsWith('custom_') && collection[key] !== null);

    const customAttributesItem = items.length > 0
        ? Object.keys(items[0])
            .filter(key => key.startsWith('custom_') && items[0][key] !== null)
        : [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };
    return (
        <div className="mt-5 p-5 container">
            <h1 className="text-center p-3">{collection.name} collection</h1>
            {items.map((item) => (
                <ItemCard item={item} key={item.id} collection={collection} />)
            )}
            <div className="col-10">
                {current_user_id === collection.user_id && <Link to={`/collection/${collection.id}/new_item`} className="btn btn-outline-success float-end">Add new item</Link>}
            </div>
        </div>
    );
}

export default EachCollection;
