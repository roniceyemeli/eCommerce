import axios from 'axios';
import { useEffect, useState } from 'react'

const ProductsApi = () => {

    const [products, setProducts] = useState([]);
    const [callback,setCallback] = useState(false);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page*10}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products);
            console.log('your products list', res.data.products)
            setResult(res.data.products)
        }
        getProducts()
    }, [callback, category, sort, search, page])

    return (

            {
                products: [products, setProducts],
                callback: [callback,setCallback],
                category: [category, setCategory],
                search: [search, setSearch],
                page: [page, setPage],
                sort: [sort, setSort],
                result: [result, setResult]   
            }
        
    )
}

export default ProductsApi;
