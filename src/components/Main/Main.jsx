import React from 'react'
import './main.css'
import PageTitle from './pageTitle/PageTitle'
import Dashboard from './dashboard/Dashboard'

function Main() {
    return (
        <main id="main" className="main">
            <PageTitle page="Tổng quan" />
            <Dashboard />
        </main>
    )
}

export default Main