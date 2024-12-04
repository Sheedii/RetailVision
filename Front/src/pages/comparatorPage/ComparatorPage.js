import React from 'react'
import { AppNavbar, AppHeader, Footer } from '../../component';
import {ComparatorComponent} from '../../affinity'

const ComparatorPage = () => {
  return (
    <div>
            <AppNavbar />
            <AppHeader title="Affinity Testing" />
            <ComparatorComponent />
            <Footer />
    </div>
  )
}

export default ComparatorPage
