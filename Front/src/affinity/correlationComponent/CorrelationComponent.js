import React, { useState } from 'react';
import './correlationComponent.css';
import OneProdSearch from '../oneProdSearch/OneProdSearch';
import ManyProdSearch from '../manyProdSearch/ManyProdSearch';
import Agenda from '../correlationAgenda/CorrelationAgenda';
import Table from './Table';
import ManualTable from './ManualTable';
import { useNavigate } from 'react-router-dom';

const CorrelationComponent = () => {
  const [focused, setFocused] = useState('Automatic');
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });
  const [applyClicked, setApplyClicked] = useState(false); // State to track Apply button click
  const [available, setAvailable] = useState(false);

  const navigate = useNavigate();

  const handleClick = (choice) => {
    setFocused(choice);
    setAvailable(false);
  };

  const handleSelectItem = (selectItem) => {
    setSelectedProduct(selectItem);
  };

  const handleSelectItems = (selectItem) => {
    setSelectedProducts(selectItem);
  };

  const handleApplyButtonClick = () => {
    setApplyClicked(true);
    setAvailable(true);
  };

  const handleNavigate = () => {
    navigate('/Comprator2');
  };

  const handleNavigateTopTen = () => {
    navigate('/Top10');
  };

  return (
    <div className="correlationComponent">
      <div className="correlationWrapper">
        <div className='correlationpageChangerButtons'>
          <div className='correlationpageChanger'>Correlation Matrix</div>
        </div>
        <div className="GoToComparatorButtons" onClick={handleNavigate}>Comparator</div>
        <div className="GoToTopTenButtons" onClick={handleNavigateTopTen}>Top Products</div>
        <div className='correlationChoices'>
          <div className='correlationchangeChoice'>
            <div
              className={focused === 'Automatic' ? 'AutomaticFocused' : 'Automatic'}
              onClick={() => handleClick('Automatic')}
            >
              One Product
            </div>
            <div
              className={focused === 'Manual' ? 'ManualFocused' : 'Manual'}
              onClick={() => handleClick('Manual')}
            >
              Many Products
            </div>
          </div>
          <div className='correlationOneProdFilters'>
            {focused === 'Automatic' ? (
              <div className='correlationArticle'>
                Product <OneProdSearch className='correlationArticleSelection' onSelectItem={handleSelectItem} />
              </div>
            ) : (
              <div className='correlationArticle'>
                Product <ManyProdSearch className='correlationArticleSelection' onSelectItem={handleSelectItems} number={8} />
              </div>
            )}

            <div className='CorrelationTimeLine'>
              TimeLine
              <Agenda onDateChange={setSelectedDate} />
            </div>
            <div>
              <button className='CorrelationApply' onClick={handleApplyButtonClick}>Apply</button>
            </div>
          </div>
        </div>
        <div className='correlationLine'></div>
        <div>
          {focused === 'Automatic' ? (
            <div>
              {!available ? (
                <div className="ComparatorRectangle">
                  {selectedProduct.length === 0 ? (
                    <div className="ComparatorCategory">filters selected (0)</div>
                  ) : (
                    <div>
                      <div className='selectedFiltersOneComp'>Selected Product : <div style={{ color: '#08074e' }}>{selectedProduct}</div></div>
                      <div className='selectedFiltersOneComp'>First Date Range : <div style={{ color: '#08074e' }}>{selectedDate.start}</div> to <div style={{ color: '#08074e' }}>{selectedDate.end}</div></div>
                    </div>
                  )}
                </div>
              ) : (
                <Table
                  selectedItem={selectedProduct}
                  startDate={selectedDate.start}
                  endDate={selectedDate.end}
                  applyClicked={applyClicked}
                  setApplyClicked={setApplyClicked} // Pass down the setter function
                />
              )}
            </div>
          ) : (
            <div>
              {!available ? (
                <div className="ComparatorRectangle">
                  {selectedProducts.length === 0 ? (
                    <div className="ComparatorCategory">filters selected (0)</div>
                  ) : (
                    <div>
                      <div className='selectedFiltersOneComp'>Selected Products :
                        <div style={{ color: '#08074e' }}>
                          {selectedProducts.map((product, index) => (
                            <span key={index}>
                              * {product}
                              <br />
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className='selectedFiltersOneComp'>First Date Range : <div style={{ color: '#08074e' }}>{selectedDate.start}</div> to <div style={{ color: '#08074e' }}>{selectedDate.end}</div></div>
                    </div>
                  )}
                </div>
              ) : (
                <ManualTable
                  selectedItems={selectedProducts}
                  startDate={selectedDate.start}
                  endDate={selectedDate.end}
                  applyClicked={applyClicked}
                  setApplyClicked={setApplyClicked}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorrelationComponent;
