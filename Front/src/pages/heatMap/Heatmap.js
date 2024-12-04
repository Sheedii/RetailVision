import React from 'react'
import {AppNavbar, AppHeader, HeatMapBox, Footer} from '../../component';
import { HeatmapCom } from '../../customerBehavior';
import { useParams } from 'react-router-dom';

const Heatmap = () => {
  const { start, end } = useParams();
  return (
    <div>
      <AppNavbar/>
      <AppHeader title="Customer Behavior" />
      {/*<HeatMapBox start={start} end={end} />*/}
      <HeatmapCom/>
      <Footer/>
    </div>
  )
}

export default Heatmap
