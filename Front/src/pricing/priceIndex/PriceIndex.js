// src/components/PriceIndex.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './priceindex.css';
import Search from '../priceIndexSearch/PriceIndexSearch';
import CustomDropdown from '../priceCheckBox/PriceCheckBox';
import Table from '../priceFirstTable/PriceFirstTable';
import Table2 from '../priceSecondTable/PriceSecondTable';
import overView from '../../assets/GenralPivot.svg'
import { useNavigate } from 'react-router-dom';

const PriceIndex = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedMDD, setSelectedMDD] = useState('');
    const [selectedHomologation, setSelectedHomologation] = useState('');
    const [selectedRayon, setSelectedRayon] = useState('');
    const [selectedCategorie, setSelectedCategorie] = useState('');
    const [MDD, setMDD] = useState([]);
    const [homologation, setHomologation] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [focused, setFocused] = useState('byBucket');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const [applyClicked, setApplyClicked] = useState(false);
    const [available, setAvailable] = useState(false);


    const handleClick = (choice) => {
        setFocused(choice);
        setAvailable(false);
    };

    const handleSelectItem = (selectItem) => {
        setSelectedProduct(selectItem);
    };

    const handleRayonSelect = (selectedOptions) => {
        console.log('hedhy hiya', selectedOptions);
        setSelectedRayon(selectedOptions);
    };

    const handleCategorieSelect = (selectedOptions) => {
        setSelectedCategorie(selectedOptions);
    };

    const handleMDDSelect = (selectedOptions) => {
        setSelectedMDD(selectedOptions);
    };

    const handleHomologationSelect = (selectedOptions) => {
        setSelectedHomologation(selectedOptions);
    };

    const handleNavigate = () => {
        navigate('/SecondPriceIndexPage');
    };

    useEffect(() => {
        const fetchFilters = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/filters/', {
                    params: { rayon: selectedRayon[0] }
                });
                const data = response.data;
                setCategorie(data.categories || []);
                setMDD(data.mdd || []);
                setHomologation(data.homologation || []);
            } catch (error) {
                console.error('Error fetching filters:', error);
                setError('Failed to load filters.');
            } finally {
                setLoading(false);
            }
        };

        if (selectedRayon) {
            fetchFilters();
        }
        console.log("categorie : ", categorie);
        console.log("MDD : ", MDD);
        console.log("homologation : ", homologation);
    }, [selectedRayon]);

    useEffect(() => {
        setFilters({
            rayon: selectedRayon[0],
            category: selectedCategorie[0],
            MDD: selectedMDD[0],
            homologation: selectedHomologation[0],
        });
        console.log("filters", filters);
    }, [selectedRayon, selectedCategorie, selectedMDD, selectedHomologation]);

    const handleApplyButtonClick = () => {
        setApplyClicked(true);
        setAvailable(true);
    };

    return (
        <div className="priceIndexComponent">
            <div className="priceIndexWrapper">
                <div className='pageChangerButtons'>
                    <div className='pageChanger'>Categorie view</div>
                </div>
                <div class="SecondpageChangerButtons" onClick={handleNavigate}>General Pivot</div>
                <div className='priceIndexChoices'>
                    <div className='changeChoice'>
                        <div
                            className={focused === 'byBucket' ? 'byBucketFocused' : 'byBucket'}
                            onClick={() => handleClick('byBucket')}
                        >
                            By bucket
                        </div>
                        <div
                            className={focused === 'byList' ? 'byListFocused' : 'byList'}
                            onClick={() => handleClick('byList')}
                        >
                            By list
                        </div>
                    </div>
                    <div className='priceCategories'>
                        <div className='categorie'> Rayon*
                            <div className='RayonSelection'>
                                <CustomDropdown
                                    options={['11 - EPICERIE SALEE', '12 - PFLS', '15 - EPICERIE SUCREE', '10 - LIQUIDE', '14 - DROGUERIE', '16 - VRAC', '17 - BEBE', '13 - PARFUMERIE']}
                                    onSelect={handleRayonSelect}
                                />
                            </div>
                        </div>
                        <div className='categorie'>
                            Categorie*   {/*<Search onSelectItem={handleSelectItem} categorie={categorie} />*/}
                            <div className='CategorieSelection'>
                                <CustomDropdown
                                    options={categorie}
                                    onSelect={handleCategorieSelect}
                                />
                            </div>
                        </div>
                        <div className='categorie'> MDD
                            <div className='MDDSelection'>
                                <CustomDropdown
                                    options={MDD}
                                    onSelect={handleMDDSelect}
                                />
                            </div>
                        </div>
                        <div className='categorie'> Homologation
                            <div className='HomologationSelection'>
                                <CustomDropdown
                                    options={homologation}
                                    onSelect={handleHomologationSelect}
                                />
                            </div>
                        </div>
                        <div>
                            <button className='PriceIndexApply' onClick={handleApplyButtonClick}>Apply</button>
                        </div>
                    </div>
                </div>
                <div className='PriceLine'></div>
                {focused === 'byBucket' && (
                    <div className='TableByBucket'>
                        {console.log('filters', filters)}
                        {!available ? (
                            <div className="ComparatorRectangle">
                                {!filters.rayon ? (
                                    <div className="ComparatorCategory">filters selected (0)</div>
                                ) : (
                                    <div>
                                        <div className='selectedFiltersOneComp'>Rayon : <div style={{ color: '#08074e' }}>{filters.rayon}</div></div>
                                        <div className='selectedFiltersOneComp'>Category : <div style={{ color: '#08074e' }}>{filters.category}</div></div>
                                        <div className='selectedFiltersOneComp'>MDD : <div style={{ color: '#08074e' }}>{filters.MDD}</div> </div>
                                        <div className='selectedFiltersOneComp'>Homologation : <div style={{ color: '#08074e' }}>{filters.homologation}</div> </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Table2 filters={filters}
                                applyClicked={applyClicked}
                                setApplyClicked={setApplyClicked}
                            />
                        )}
                    </div>
                )}
                {focused === 'byList' && (
                    <div className='TableByList'>
                        {!available ? (
                            <div className="ComparatorRectangle">
                                {!filters.rayon ? (
                                    <div className="ComparatorCategory">filters selected (0)</div>
                                ) : (
                                    <div>
                                        <div className='selectedFiltersOneComp'>Rayon : <div style={{ color: '#08074e' }}>{filters.rayon}</div></div>
                                        <div className='selectedFiltersOneComp'>Category : <div style={{ color: '#08074e' }}>{filters.category}</div></div>
                                        <div className='selectedFiltersOneComp'>MDD : <div style={{ color: '#08074e' }}>{filters.MDD}</div> </div>
                                        <div className='selectedFiltersOneComp'>Homologation : <div style={{ color: '#08074e' }}>{filters.homologation}</div> </div>
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
                )}
                {/*
                <div>
                    <div className="priceRectangle">
                        <div className="category">category selected (0)</div>
                    </div>
                </div>
                 */}


            </div>
        </div>
    );
};

export default PriceIndex;
