import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../component/loading/loading'
import Taswira from '../../assets/hoverPricing.svg'

const PriceSecondTable = ({ filters, applyClicked, setApplyClicked }) => {
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
          const response = await axios.post('http://localhost:8000/filtered-data/', filters);
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
    return (<div className="AffinityLoader"><Loader /></div>)
  }
  if (error) return <div>{error}</div>;

  return (
    tableData && (
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
            <td>Q1</td>
            <td className='SMGQ4'>
              {tableData?.smg?.['Q1']}
              <div className='Q4HoverWrapper hidden'>
              The Q1 SMG are :
              </div>
            </td>
            <td>{tableData?.prix_p3?.['Q1']}</td>
            <td>{tableData?.concurrents?.['Q1']}</td>
            <td>{tableData?.carrefour_market?.['Q1']}</td>
            <td>{tableData?.carrefour_hyper?.['Q1']}</td>
            <td>{tableData?.monoprix?.['Q1']}</td>
            <td>{tableData?.aziza?.['Q1']}</td>

          </tr>
          <tr>
            <td>Q2</td>
            <td className='SMGQ4'>{tableData?.smg?.['Q2']}
            <div className='Q4HoverWrapper hidden'>
              The Q2 SMG are :
              </div>
            </td>
            <td>{tableData?.prix_p3?.['Q2']}</td>
            <td>{tableData?.concurrents?.['Q2']}</td>
            <td>{tableData?.carrefour_market?.['Q2']}</td>
            <td>{tableData?.carrefour_hyper?.['Q2']}</td>
            <td>{tableData?.monoprix?.['Q2']}</td>
            <td>{tableData?.aziza?.['Q2']}</td>
          </tr>
          <tr>
            <td>Q3</td>
            <td className='SMGQ4'>{tableData?.smg?.['Q3']}
            <div className='Q4HoverWrapper hidden'>
              The Q3 SMG are :
              </div>
            </td>
            <td>{tableData?.prix_p3?.['Q3']}</td>
            <td>{tableData?.concurrents?.['Q3']}</td>
            <td>{tableData?.carrefour_market?.['Q3']}</td>
            <td>{tableData?.carrefour_hyper?.['Q3']}</td>
            <td>{tableData?.monoprix?.['Q3']}</td>
            <td>{tableData?.aziza?.['Q3']}</td>
          </tr>
          <tr>
            <td>Q4</td>
            <td className='SMGQ4'>{tableData?.smg?.['Q4']}
              <div className='Q4HoverWrapper hidden'>
              The Q4 SMG are :
              </div>
            </td>
            <td>{tableData?.prix_p3?.['Q4']}</td>
            <td>{tableData?.concurrents?.['Q4']}</td>
            <td>{tableData?.carrefour_market?.['Q4']}</td>
            <td>{tableData?.carrefour_hyper?.['Q4']}</td>
            <td>{tableData?.monoprix?.['Q4']}</td>
            <td>{tableData?.aziza?.['Q4']}</td>
          </tr>
        </tbody>
      </table>
    )
  );
};

export default PriceSecondTable;
