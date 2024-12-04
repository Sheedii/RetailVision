import { React, useState, useEffect } from 'react'
import './topTen.css'
import Agenda from '../../component/agenda2/Agenda3';
import CustomDropdown from '../../pricing/priceCheckBox/PriceCheckBox';
import axios from 'axios';
import Table from '../topTenTable/TopTenTable';
import Correlation from '../../assets/correlation.svg';
import { useNavigate } from 'react-router-dom';
const TopTen = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGranularity, setSelectedGranularity] = useState('rayon');
    const [selectedRayon, setSelectedRayon] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [sort, setSort] = useState([]);
    const [filters, setFilters] = useState({});
    const [applyClicked, setApplyClicked] = useState(false); // State to track Apply button click
    const [available, setAvailable] = useState(false);
    const navigate = useNavigate();

    const handleGranularitySelect = (selectedOptions) => {
        if (selectedOptions == 'Marché') {
            setSelectedGranularity('marche');
        } else if (selectedOptions == 'Sous Famille') {
            setSelectedGranularity('sous_famille');
        } else {
            const lowercasedOptions = selectedOptions.map(option => option.toLowerCase());
            setSelectedGranularity(lowercasedOptions[0]);
        }
    };

    const handleCategoryOptionSelect = (selectedOptions) => {
        setSelectedRayon(selectedOptions);
    };

    const handleSortSelect = (selectedOptions) => {
        const lowercasedOptions = selectedOptions.map(option => option.toLowerCase());
        setSort(lowercasedOptions);
    };

    const handleApplyButtonClick = () => {
        setApplyClicked(true);
        setAvailable(true);
    };

    useEffect(() => {
        const fetchCategoryOptions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/affinity/category-options/', {
                    params: {
                        granularity: selectedGranularity
                    }
                });
                setCategoryOptions(response.data);
            } catch (error) {
                console.error('Error fetching category options:', error);
            }
        };

        if (selectedGranularity) {
            fetchCategoryOptions();
        }
    }, [selectedGranularity]); // Fetch options on granularity change

    useEffect(() => {
        setFilters({
            period: selectedDate,
            granularity: selectedGranularity,
            category: selectedRayon[0],
            sort_by: sort[0],
        });
    }, [selectedDate, selectedGranularity, selectedRayon, sort]);


    const handleNavigate = () => {
        navigate('/Correlation2');
    };

    const handleNavigateTopTen = () => {
        navigate('/Comprator2');
    };

    return (
        <div className='Top10'>
            <div className='choosed3'>
                <div className='TopTenPageChangerButtons'>
                    <div className='ComparatorpageChanger'>Top Products</div>
                </div>
                <div className="correlationPageNavigateButtons" onClick={handleNavigate}>Correlation</div>
                <div className="GoToComparatorButtonsTop" onClick={handleNavigateTopTen}>Comparator</div>
                <div className='topTenFilters'>
                    <div className='topTenPeriode'>
                        Date
                        <Agenda onDateChange={setSelectedDate} />
                    </div>
                    <div className='topTenCategory'>
                        Granularity
                        <div className='topTenGranularity' >
                            <CustomDropdown onSelect={handleGranularitySelect}
                                options={['Rayon', 'Marché', 'Famille', 'Sous Famille', 'Departement', 'UBS', 'Segment']} />
                        </div>
                    </div>
                    <div className='topTenPeriode'>
                        {selectedGranularity}
                        <div className='topTenCategoryOption' >
                            <CustomDropdown options={categoryOptions} onSelect={handleCategoryOptionSelect} />
                        </div>
                    </div>
                    <div className='topTenPeriode'>
                        Sort by
                        <div className='topTenSort' >
                            <CustomDropdown onSelect={handleSortSelect}
                                options={['Sales', 'Revenue', 'Growth']} />
                        </div>
                    </div>
                    <div>
                        <button className='ComparatorApply' onClick={handleApplyButtonClick}>Apply</button>
                    </div>
                </div>
                {!available ? (
                <div className="ComparatorRectangle">
                    {console.log('filters',filters)}
                  {!filters.period ? (
                    <div className="ComparatorCategory">filters selected (0)</div>
                  ) : (
                    <div >
                      <div className='selectedFiltersTopten DateTop'>Date :<div style={{ color: '#08074e' }}>{filters.period}</div></div>
                      <div className='selectedFiltersOneComp'>Granularity :<div style={{ color: '#08074e' }}>{filters.granularity}</div></div>
                      <div className='selectedFiltersTopten categoryTop'>{selectedGranularity} :<div style={{ color: '#08074e' }}>{filters.category}</div></div>
                      <div className='selectedFiltersTopten sort_byTop'>Sort By :<div style={{ color: '#08074e' }}>{filters.sort_by}</div></div>
                    </div>
                  )}
                </div>
              ) : (
                <Table filters={filters}
                    applyClicked={applyClicked}
                    setApplyClicked={setApplyClicked}
                />
            )}
            </div>
        </div >
    )
}

export default TopTen;
