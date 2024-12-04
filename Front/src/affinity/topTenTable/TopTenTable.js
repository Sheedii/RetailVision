import React, { useState, useEffect } from 'react';
import './topTenTable.css';
import axios from 'axios';
import Loader from '../../component/loading/loading'

const TopTenTable = ({ filters, applyClicked, setApplyClicked }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    let rank=1;

    useEffect(() => {
        const fetchTopProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/affinity/top-products/', {
                    params: {
                        period: filters.period,
                        category: filters.category,
                        sort_by: filters.sort_by,
                        granularity: filters.granularity
                    },
                });
                setProducts(response.data);
                console.log('response.data',response.data);
            } catch (error) {
                console.error('Error fetching top products:', error);
            } finally {
                setLoading(false);
                setApplyClicked(false);
            }
        };

        if (filters.period && filters.category && filters.sort_by && filters.granularity && applyClicked ) {
            fetchTopProducts();
            console.log("check");
        }
    }, [applyClicked]);

    // Render loader if loading is true
    if (loading) {
        return( <div className="AffinityLoader" ><Loader /></div> )
    }
    
    return (
        <div className="topTenTableTontainer">
            <table className="price-table">
                <thead>
                    <tr>                        
                        <th>Rank</th>
                        <th>Product</th>
                        <th>Sales</th>
                        <th>Revenue</th>
                        <th>Growth (%)<div className='topTenHelp'>compared to d-1</div></th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={rank}>
                                <td>{rank++}</td>
                                <td>{product.lib}</td>
                                <td>{product.total_sales.toFixed(2)}</td>
                                <td>{product.total_revenue.toFixed(2)}</td>
                                <td className={product.growth > 0 ? 'PositiveCase' : 'negativeCase'}>{product.growth.toFixed(2)} %</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No chosen filters</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TopTenTable;
