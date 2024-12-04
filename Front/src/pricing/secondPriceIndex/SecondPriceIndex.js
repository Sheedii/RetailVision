import React, { useState, useEffect } from 'react';
import './secondPriceIndex.css';
import axios from 'axios';
import Search from '../secondPriceIndexSearch/SecondPriceIndexSearch';
import CustomDropdown from '../priceCheckBox/PriceCheckBox';
import overView from '../../assets/CategorieView.svg';
import { useNavigate } from 'react-router-dom';
import Table from '../secondPriceIndexTable/SecondPriceIndexTable'

const SecondPriceIndex = () => {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedMDD, setSelectedMDD] = useState([]);
    const [selectedList, setSelectedList] = useState('');
    const [selectedEtat, setSelectedEtat] = useState([]);
    const [selectedRayon, setSelectedRayon] = useState('');
    const [selectedBucket, setSelectedBucket] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [mdd, setMdd] = useState([]);
    const [etat, setEtat] = useState([]);
    const [articles, setArticles] = useState([]);
    const [liste_de_guerre_course, setGuerreCourse] = useState([]);
    const [bucket_de_ca, setBucketCA] = useState([]);
    const [filters, setFilters] = useState({});
    const [applyClicked, setApplyClicked] = useState(false);
    const [available, setAvailable] = useState(false);



    const handleNavigate = () => {
        navigate('/priceIndex');
    };

    const handleSelectItems = (selectItem) => {
        setSelectedProduct(selectItem);
    };

    const handleMDDSelect = (selectedOptions) => {
        setSelectedMDD(selectedOptions);
        console.log("selectedList",selectedOptions);
    };

    const handleListSelect = (selectedOptions) => {
        if (selectedOptions[0] === "Course") {
            setGuerreCourse('Liste de course');
        } else if (selectedOptions[0] === "guerre") {
            setGuerreCourse('Liste de guerre');
        } else if (selectedOptions.length === 0 ) {
            setGuerreCourse([]);
        }
    };

    const handleEtatSelect = (selectedOptions) => {
        setSelectedEtat(selectedOptions);
    };
    const handleBucketSelect = (selectedOptions) => {
        setSelectedBucket(selectedOptions);
    };

    const handleRayonSelect = (selectedOptions) => {
        setSelectedRayon(selectedOptions);
    };

    useEffect(() => {
        const fetchFilters = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/get-pivot-filters/', {
                    params: { rayon: selectedRayon[0] }
                });
                const data = response.data;
                setMdd(data.mdd || []);
                setEtat(data.etat || []);
                setArticles(data.article || []);
                setBucketCA(data.bucket_de_ca || []);
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
    }, [selectedRayon]);

    useEffect(() => {
        setFilters({
            rayon: selectedRayon[0],
            etat: selectedEtat[0],
            MDD: selectedMDD[0],
            liste_de_guerre_course: liste_de_guerre_course,
            bucket_de_ca: selectedBucket[0],
            article: selectedProduct[0],
        });
        console.log("filters", filters);
    }, [selectedRayon, selectedEtat, selectedMDD, liste_de_guerre_course, selectedBucket, selectedProduct]);


    const handleApplyButtonClick = () => {
        setApplyClicked(true);
        setAvailable(true);
    };

    return (
        <div className="priceIndexComponent">
            <div className="priceIndexWrapper">
                <div className="PageChangerButton">
                    <div className="secondPageChanger">General pivot</div>
                </div>
                <div className="SecondpageChangerButton" onClick={handleNavigate}>Categorie view</div>
                <div className='SecondPriceIndexChoices'>
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
                            Article* <Search className='ArticleSelection' onSelectItem={handleSelectItems} article={articles} />
                        </div>
                        <div className='categorie'> MDD
                            <div className='MDDSelection'>
                                <CustomDropdown
                                    options={mdd}
                                    onSelect={handleMDDSelect}
                                />
                            </div>
                        </div>
                        <div className='categorie'> Etat
                            <div className='EtatSelection'>
                                <CustomDropdown
                                    options={etat}
                                    onSelect={handleEtatSelect}
                                />
                            </div>
                        </div>
                        <div className='categorie'> List
                            <div className='EtatSelection'>
                                <CustomDropdown
                                    options={['Course', 'guerre']}
                                    onSelect={handleListSelect}
                                />
                            </div>
                        </div>
                        <div className='categorie'> Buckets
                            <div className='BucketSelection'>
                                <CustomDropdown
                                    options={bucket_de_ca}
                                    onSelect={handleBucketSelect}
                                />
                            </div>
                        </div>
                        <div>
                            <button className='PriceIndexApply' onClick={handleApplyButtonClick}>Apply</button>
                        </div>
                    </div>
                </div>
                <div className='PriceLine'></div>
                <div className='tableGeneralPivot'>
                    {!available ? (
                        <div className="ComparatorRectangle">
                            {!filters.rayon ? (
                                <div className="ComparatorCategory">filters selected (0)</div>
                            ) : (
                                <div>
                                    <div className='selectedFiltersOneComp'>Rayon : <div style={{ color: '#08074e' }}>{filters.rayon}</div></div>
                                    <div className='selectedFiltersOneComp'>Article(s) :
                                        <div style={{ color: '#08074e' }}>
                                            {selectedProduct.map((product, index) => (
                                                <span key={index}>
                                                    * {product}
                                                    <br />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='selectedFiltersOneComp'>MDD : <div style={{ color: '#08074e' }}>{filters.MDD}</div> </div>
                                    <div className='selectedFiltersOneComp'>Etat : <div style={{ color: '#08074e' }}>{filters.etat}</div> </div>
                                    <div className='selectedFiltersOneComp'>List : <div style={{ color: '#08074e' }}>{filters.liste_de_guerre_course}</div> </div>
                                    {console.log("list choice : ",filters.liste_de_guerre_course )}
                                    <div className='selectedFiltersOneComp'>Bucket : <div style={{ color: '#08074e' }}>{filters.bucket_de_ca}</div> </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Table filters={filters} articles={selectedProduct}
                            applyClicked={applyClicked} setApplyClicked={setApplyClicked}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecondPriceIndex;
