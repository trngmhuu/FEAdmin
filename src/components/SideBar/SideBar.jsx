import React from 'react'
import './sideBar.css'

function SideBar() {
    return (
        <aside id='sidebar' className='sidebar'>
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a href="/home" className="nav-link">
                        <i className="bi bi-grid"></i>
                        <span>Tổng quan</span>
                    </a>
                </li>

                <li className="nav-link">
                    <a
                        className="nav-link collapsed"
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapse"
                        href="#"
                    >
                        <i className='bi bi-menu-button-wide'></i>
                        <span>Documents</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id="components-nav"
                        className="nav-content collapse"
                        data-bs-parent="#sidebar-nav"
                    >
                        <li>
                            <a href="#">
                                <i className="bi bi-circle"></i>
                                <span>Person</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="bi bi-circle"></i>
                                <span>Suppliers</span>
                            </a>
                        </li>
                    </ul>
                </li>

            </ul>
        </aside>
    )
}

export default SideBar