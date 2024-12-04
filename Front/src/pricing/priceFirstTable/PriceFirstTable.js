import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './priceFirstTable.css';
import Loader from '../../component/loading/loading'

const PriceFirstTable = ({ filters, applyClicked, setApplyClicked}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    const handleFilterSubmit = async () => {
      if (filters && Object.keys(filters).length > 0) { // Ensure filters are available
        setLoading(true);
        setError(null);
        console.log("Applying filters:", filters);
        try {
          const response = await axios.post('http://localhost:8000/filtered-data-list/', filters);
          const data = response.data;
          setTableData(data);
          // Debug output
          console.log('Filtered Data:', data);
        } catch (error) {
          console.error('Error fetching filtered data:', error);
          setError('Failed to load filtered data.');
        } finally {
          setLoading(false);
          setApplyClicked(false);
        }
      }
    };

    if (applyClicked) {
      handleFilterSubmit();
    }
  }, [applyClicked]); // Dependency array ensures this runs when filters change

  if (loading) {
    return (<div className="AffinityLoader" ><Loader /></div>)
  }
  if (error) return <div>{error}</div>;

  return (
    <table className="price-table">
      <thead>
        <tr>
          <th>{filters.category ? filters.category : 'ALL Categories'}</th>
          <th>SMG</th>
          <th>Prix P3</th>
          <th>Ind Prix vs. Concurrent min</th>
          <th>Ind Prix vs. CRF Market</th>
          <th>Ind Prix CRF Hyper</th>
          <th>Ind Prix Monop</th>
          <th>Ind Prix Aziza</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Couverture (# REFS)</td>
          <td>{tableData?.smg?.['Couverture(# refs)']}</td>
          <td>{tableData?.prix_p3?.['Couverture(# refs)']}</td>
          <td>{tableData?.concurrents?.['Couverture(# refs)']}</td>
          <td>{tableData?.carrefour_market?.['Couverture(# refs)']}</td>
          <td>{tableData?.carrefour_hyper?.['Couverture(# refs)']}</td>
          <td>{tableData?.monoprix?.['Couverture(# refs)']}</td>
          <td>{tableData?.aziza?.['Couverture(# refs)']}</td>
        </tr>
        <tr>
          <td>Couverture (% CA)</td>
          <td>{tableData?.smg?.['Couverture(% CA)']}</td>
          <td>{tableData?.prix_p3?.['Couverture(% CA)']}</td>
          <td>{tableData?.concurrents?.['Couverture(% CA)']}</td>
          <td>{tableData?.carrefour_market?.['Couverture(% CA)']}</td>
          <td>{tableData?.carrefour_hyper?.['Couverture(% CA)']}</td>
          <td>{tableData?.monoprix?.['Couverture(% CA)']}</td>
          <td>{tableData?.aziza?.['Couverture(% CA)']}</td>
        </tr>
        <tr>
          <td>Indice prix</td>
          <td>{tableData?.smg?.['Indice prix']}</td>
          <td>{tableData?.prix_p3?.['Indice prix']}</td>
          <td>{tableData?.concurrents?.['Indice prix']}</td>
          <td>{tableData?.carrefour_market?.['Indice prix']}</td>
          <td>{tableData?.carrefour_hyper?.['Indice prix']}</td>
          <td>{tableData?.monoprix?.['Indice prix']}</td>
          <td>{tableData?.aziza?.['Indice prix']}</td>
        </tr>
        <tr>
          <td>Liste de guerre</td>
          <td>{tableData?.smg?.['Liste de guerre']}</td>
          <td>{tableData?.prix_p3?.['Liste de guerre']}</td>
          <td>{tableData?.concurrents?.['Liste de guerre']}</td>
          <td>{tableData?.carrefour_market?.['Liste de guerre']}</td>
          <td>{tableData?.carrefour_hyper?.['Liste de guerre']}</td>
          <td>{tableData?.monoprix?.['Liste de guerre']}</td>
          <td>{tableData?.aziza?.['Liste de guerre']}</td>
        </tr>
        <tr>
          <td>Liste de course</td>
          <td>{tableData?.smg?.['Liste de course']}</td>
          <td>{tableData?.prix_p3?.['Liste de course']}</td>
          <td>{tableData?.concurrents?.['Liste de course']}</td>
          <td>{tableData?.carrefour_market?.['Liste de course']}</td>
          <td>{tableData?.carrefour_hyper?.['Liste de course']}</td>
          <td>{tableData?.monoprix?.['Liste de course']}</td>
          <td>{tableData?.aziza?.['Liste de course']}</td>
        </tr>
        <tr>
          <td>Reste de l’assortiment</td>
          <td>{tableData?.smg?.['Reste de l\'assortiment']}</td>
          <td>{tableData?.prix_p3?.['Reste de l\'assortiment']}</td>
          <td>{tableData?.concurrents?.['Reste de l\'assortiment']}</td>
          <td>{tableData?.carrefour_market?.['Reste de l\'assortiment']}</td>
          <td>{tableData?.carrefour_hyper?.['Reste de l\'assortiment']}</td>
          <td>{tableData?.monoprix?.['Reste de l\'assortiment']}</td>
          <td>{tableData?.aziza?.['Reste de l\'assortiment']}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PriceFirstTable;
