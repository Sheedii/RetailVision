import React, { useState } from 'react';
import './comparatorComponent.css';
import OneProdSearch from '../oneProdSearch/OneProdSearch';
import ManyProdSearch from '../manyProdSearch/ManyProdSearch';
import Agenda from '../correlationAgenda/CorrelationAgenda';
import OneProdTable from './OneCompTable';
import TwoProdTable from './TwoCompTable';
import { useNavigate } from 'react-router-dom';
import ProductCards from './ProductCards'
import ProductDateCads from './ProductDateCards'

const ComparatorComponent = () => {

  const [focused, setFocused] = useState('Automatic');
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedDate1, setSelectedDate1] = useState({ start: null, end: null });
  const [selectedDate2, setSelectedDate2] = useState({ start: null, end: null });
  const [applyClicked, setApplyClicked] = useState(false);
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

  const handleNavigate = () => {
    navigate('/Correlation2');
  };

  const handleNavigateTopTen = () => {
    navigate('/Top10');
  };
  const handleApplyButtonClick = () => {
    setApplyClicked(true);
    setAvailable(true);
  };

  return (
    <div className="correlationComponent">
      <div className="correlationWrapper">
        <div className='ComparatorPageChangerButtons'>
          <div className='ComparatorpageChanger'>Comparator</div>
        </div>
        <div className="SecondComparatorPageChangerButtons" onClick={handleNavigate}>Correlation</div>
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
              Two Products
            </div>
          </div>

          {/* Render search based on the focused state */}
          {focused === 'Automatic' ? (
            <div className='correlationOneProdFilters'>
              <div className='correlationArticle'>
                Product <OneProdSearch className='correlationArticleSelection' onSelectItem={handleSelectItem} />
              </div>
              <div className='CorrelationTimeLine'>
                TimeLine One
                <Agenda onDateChange={setSelectedDate1} />
              </div>
              <div className='CorrelationTimeLine'>
                TimeLine Two
                <Agenda onDateChange={setSelectedDate2} />
              </div>
              <div>
                <button className='ComparatorApply' onClick={handleApplyButtonClick}>Apply</button>
              </div>
            </div>
          ) : (
            <div className='correlationOneProdFilters'>
              <div className='correlationArticle'>
                Product <ManyProdSearch className='correlationArticleSelection' onSelectItem={handleSelectItems} number={2} />
              </div>
              <div className='CorrelationTimeLine'>
                TimeLine
                <Agenda onDateChange={setSelectedDate1} />
              </div>
              <div>
                <button className='ComparatorApply' onClick={handleApplyButtonClick}>Apply</button>
              </div>
            </div>
          )}

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
                      <div className='selectedFiltersOneComp'>First Date Range : <div style={{ color: '#08074e' }}>{selectedDate1.start}</div> to <div style={{ color: '#08074e' }}>{selectedDate1.end}</div></div>
                      <div className='selectedFiltersOneComp'>Second Date Range : <div style={{ color: '#08074e' }}>{selectedDate2.start}</div> to <div style={{ color: '#08074e' }}>{selectedDate2.end}</div></div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <ProductDateCads
                    selectedProduct1={selectedProduct}
                    selectedStart={selectedDate1.start}
                    selectedEnd={selectedDate1.end}
                    selectedStart2={selectedDate2.start}
                    selectedEnd2={selectedDate2.end}
                    applyClicked={applyClicked}
                  />
                  <OneProdTable
                    selectedProduct={selectedProduct}
                    selectedStart1={selectedDate1.start}
                    selectedEnd1={selectedDate1.end}
                    selectedStart2={selectedDate2.start}
                    selectedEnd2={selectedDate2.end}
                    applyClicked={applyClicked}
                    setApplyClicked={setApplyClicked}
                  />
                </div>
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
                      <div className='selectedFiltersOneComp'>Selected Product : <div style={{ color: '#08074e' }}>{selectedProducts[0]}</div></div>
                      <div className='selectedFiltersOneComp'>Selected Product : <div style={{ color: '#08074e' }}>{selectedProducts[1]}</div></div>
                      <div className='selectedFiltersOneComp'>First Date Range : <div style={{ color: '#08074e' }}>{selectedDate1.start}</div> to <div style={{ color: '#08074e' }}>{selectedDate1.end}</div></div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className='ComparatorProductNames'>
                    <div className='selectedFiltersOneComp'>Product One : <div style={{ color: '#08074e' }}>{selectedProducts[0]}</div></div>
                    <div className='selectedFiltersOneComp'>Product Two : <div style={{ color: '#08074e' }}>{selectedProducts[1]}</div></div>
                  </div>
                  <ProductCards
                    selectedProduct1={selectedProducts[0]}
                    selectedProduct2={selectedProducts[1]}
                    selectedStart={selectedDate1.start}
                    selectedEnd={selectedDate1.end}
                    applyClicked={applyClicked}
                  />
                  <TwoProdTable
                    selectedStart={selectedDate1.start}
                    selectedEnd={selectedDate1.end}
                    selectedProduct1={selectedProducts[0]}
                    selectedProduct2={selectedProducts[1]}
                    applyClicked={applyClicked}
                    setApplyClicked={setApplyClicked}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default ComparatorComponent
