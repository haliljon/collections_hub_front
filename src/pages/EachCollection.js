import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchItems } from '../store/items';
import { fetchCollections } from '../store/collections';
import ItemCard from '../components/ItemCard';

const EachCollection = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const collections = useSelector(state => state.collections.collections);
    useEffect(() => {
        dispatch(fetchCollections());
    }, [dispatch]);
    const allItems = useSelector(state => state.items.items);
    const loadingItems = useSelector(state => state.items.loading);
    const errorItems = useSelector(state => state.items.error);
    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

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
            <Link to={`/collection/${collection.id}/new_item`} className="btn btn-outline-success m-1 float-end">Add new item</Link>
        </div>
    );
}

export default EachCollection;
