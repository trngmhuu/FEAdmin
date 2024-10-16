import React from 'react'
import PageTitle from '../pageTitle/PageTitle'
import './mainTour.css'
import SearchTableTour from './SearchTableTour/SearchTableTour'

function MainTour() {
    return (
        <main id="main" className="main">
            <PageTitle page="Quản lý Tour" />
            <SearchTableTour />
        </main>
    )
}

export default MainTour