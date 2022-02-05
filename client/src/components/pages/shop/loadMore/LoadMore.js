import React, { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import './loadMore.scss';

const LoadMore = () => {

    const state = useContext(GlobalState);
    const [page, setPage] = state.ProductsApi.page;
    const [result] = state.ProductsApi.result;
    console.log('result is', result.length) 
    return (
        <div className='load-more'>
            {
                result.length < page * 10 ? "" :
                <button onClick={()=>setPage(page+1)}>view more</button>
            }{
                result.length > page * 10 ? "" :
                <button onClick={()=>setPage(page-1)}>view less</button>
            }
        </div>
    )
}

export default LoadMore;
