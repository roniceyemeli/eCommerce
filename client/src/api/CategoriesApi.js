import { useEffect, useState } from 'react';
import axios from 'axios'

const CategoriesApi = () => {

    const [categories, setCategories] = useState([]);
    const [callback, setCallBack] = useState(false);

    useEffect(() => {
        const getCategories = async() =>{
            const res = await axios.get('/api/category')
            setCategories(res.data)
        }
        getCategories()
    }, [callback])

    return (
        {
            categories: [categories, setCategories],
            callback: [callback, setCallBack]
        }
    )
}

export default CategoriesApi;
