import { Button, Form, Input } from 'antd'
import React from 'react'
import './searchTable.css'

function SearchTable() {
    return (
        <ul className='searchtable-container'>
            <li className='search-container'>
                <h6>Tìm kiếm người dùng</h6>
                <Form layout="inline">

                    <Form.Item >
                        <Input
                            name="name"
                            placeholder="Tên"
                        />
                    </Form.Item >
                    <Form.Item>
                        <Input
                            name="email"
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            name="phone"
                            placeholder="Số điện thoại"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" >
                            Xóa Trắng
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" >
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form >
            </li>
        </ul>
    )
}

export default SearchTable