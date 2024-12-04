import React, { useState, useMemo, useRef, useEffect } from 'react';
import './chartRanking.css';
import chart from '../../assets/chart.svg';
import aziza from '../../assets/aziza.svg';
import carrefourMarket from '../../assets/carrefour_market.svg';
import carrefour from '../../assets/carrefour.svg';
import mg from '../../assets/mg.svg';
import monoprix from '../../assets/monoprix.svg';
import axios from 'axios';

const ChartRanking = () => {
  const [data, setData] = useState({});

  const [two, setTwo] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Indice_prix/');
      const result = response.data;

      // Format the values to two decimal places
      const formattedData = {
        aziza: parseFloat(result.aziza.toFixed(2)),
        carrefourHyper: parseFloat(result.carrefourHyper.toFixed(2)),
        carrefourMarket: parseFloat(result.carrefourMarket.toFixed(2)),
        monoprix: parseFloat(result.monoprix.toFixed(2)),
      };

      setData(formattedData);
      console.log('data : ', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const usageCounts = useMemo(() => {
    const counts = {};
    Object.values(data).forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
    console.log('counts ', counts);
    return counts;
  }, [data]);

  let k=0;
  const getClassName = (key, value) => {
    const count = usageCounts[value] || 0;
    const baseClass = `${key}_logo`;
    const formattedValue = value < 1 ? `0${(value * 100).toFixed(0)}` : `${(value * 100).toFixed(0)}`;
    if (count === 2 && !two) {
      k++;
    }
    else if (count === 2 && two) {
      k++;
    }
    if (k==1){
      return `${baseClass} _${formattedValue}`;
    } else if (k==2) {
      k=0;
      return `${baseClass} second_${formattedValue}`;
    }
    return `${baseClass} _${formattedValue}`;
  };

  return (
    <div>
      <div className='logosChart'>
        <img className={getClassName('aziza', data.aziza)} src={aziza} alt="aziza_logo" />
        <img className='mg_logo _100' src={mg} alt="mg_logo" />
        <img className={getClassName('carrefour', data.carrefourHyper)} src={carrefour} alt="carrefour_logo" />
        <img className={getClassName('carrefourMarket', data.carrefourMarket)} src={carrefourMarket} alt="carrefourMarket_logo" />
        <img className={getClassName('monoprix', data.monoprix)} src={monoprix} alt="monoprix_logo" />
      </div>
      <img className='Mg_ranking_chart' src={chart} alt="Mg_ranking_chart" />
    </div>
  );
};

export default ChartRanking;
