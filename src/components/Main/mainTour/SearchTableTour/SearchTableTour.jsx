import { Tag, Button, Form, Input, Table, Modal, message } from 'antd';
import React, { useState, useEffect } from 'react';
import './searchTableTour.css';
import './transition.css';
import { DeleteFilled, ExclamationCircleOutlined, EyeOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const { confirm } = Modal;

function SearchTableTour({ changeComponent }) {
    const [searchParams, setSearchParams] = useState({
        name: '',
        tourCode: '',
    });

    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Thêm biến để kiểm soát chế độ chỉnh sửa
    const [newTour, setNewTour] = useState({
        tourId: '',
        tourCode: '',
        name: '',
        description: '',
        image: '',
        typeTourId: '',
        locationStart: '',
        locationFinish: '',
        availableDates: [], // Chứa nhiều ngày khởi hành
        timeDate: '',
        endDate: '',
        price: '',
        maxPeople: '',
        vehicle: '',
        note: '',
        isActive: true, // Đặt giá trị mặc định là hoạt động
    });

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:8080/tours', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result); // Cập nhật với kết quả từ API
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value,
        });
    };

    const handleReset = () => {
        setSearchParams({
            name: '',
            tourCode: '',
        });
    };

    const handleReload = () => {
        fetchData();
    };

    const handleAdd = () => {
        setIsModalVisible(true);
        setIsEditMode(false); // Chế độ thêm
        setNewTour({ // Reset newTour state
            tourId: '',
            tourCode: '',
            name: '',
            description: '',
            image: '',
            typeTourId: '',
            locationStart: '',
            locationFinish: '',
            availableDates: [],
            timeDate: '',
            endDate: '',
            price: '',
            maxPeople: '',
            vehicle: '',
            note: '',
            isActive: true,
        });
    };

    const handleEdit = (record) => {
        setNewTour(record); // Khi chỉnh sửa, cập nhật thông tin vào newTour
        setIsModalVisible(true); // Hiển thị modal chỉnh sửa
        setIsEditMode(true); // Chế độ chỉnh sửa
    };

    const handleDelete = async (tourId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/tours/${tourId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                fetchData(); // Cập nhật lại danh sách sau khi xóa thành công
                message.success('Tour đã được xóa thành công'); // Thông báo thành công
            } else {
                throw new Error('Failed to delete tour');
            }
        } catch (error) {
            console.error('Error deleting tour:', error);
        }
    };

    const showDeleteConfirm = (tourId) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa Tour này?',
            icon: <ExclamationCircleOutlined />,
            content: `Mã tour: ${tourId}`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDelete(tourId);
            },
            onCancel() {
                console.log('Hủy hành động xóa');
            },
        });
    };

    const handleNewTourChange = (e) => {
        const { name, value } = e.target;
        setNewTour({
            ...newTour,
            [name]: value,
        });
    };

    const handleSaveNewTour = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = isEditMode ? `http://localhost:8080/tours/${newTour.tourId}` : 'http://localhost:8080/tours'; // URL cho chế độ chỉnh sửa và thêm mới
            const method = isEditMode ? 'PUT' : 'POST'; // Chọn phương thức PUT cho chỉnh sửa

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newTour),
            });

            if (response.ok) {
                setIsModalVisible(false);
                fetchData(); // Cập nhật danh sách tour sau khi thêm hoặc chỉnh sửa thành công
                message.success(isEditMode ? 'Tour đã được chỉnh sửa thành công' : 'Tour đã được thêm thành công'); // Thông báo thành công
                setNewTour({ // Reset newTour state
                    tourId: '',
                    tourCode: '',
                    name: '',
                    description: '',
                    image: '',
                    typeTourId: '',
                    locationStart: '',
                    locationFinish: '',
                    availableDates: [],
                    timeDate: '',
                    endDate: '',
                    price: '',
                    maxPeople: '',
                    vehicle: '',
                    note: '',
                    isActive: true,
                });
            } else {
                throw new Error('Failed to save tour');
            }
        } catch (error) {
            console.error('Error saving tour:', error);
            message.error(error.message); // Hiển thị lỗi
        }
    };

    const columns = [
        {
            title: 'Mã Tour',
            dataIndex: 'tourCode',
            key: 'tourCode',
        },
        {
            title: 'Tên Tour',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa điểm khởi hành',
            dataIndex: 'locationStart',
            key: 'locationStart',
        },
        {
            title: 'Địa điểm kết thúc',
            dataIndex: 'locationFinish',
            key: 'locationFinish',
        },
        {
            title: 'Giá (VND)',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Trạng thái',
            key: 'isActive',
            render: (_, { isActive }) => (
                <Tag color={isActive ? 'green' : 'volcano'}>
                    {isActive ? 'Hoạt động' : 'Ngưng hoạt động'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => (
                <div className="action-buttons">
                    <Button type="link" onClick={() => handleEdit(record)}><EyeOutlined /></Button>
                    <Button type="link" danger onClick={() => showDeleteConfirm(record.tourId)}><DeleteFilled /></Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <ul className='searchtable-container'>
                <li className='search-container'>
                    <h6>Tìm kiếm Tour</h6>
                    <Form className="custom-inline-form-tour" layout="inline">
                        <Form.Item>
                            <Input
                                name="name"
                                placeholder="Tên Tour"
                                value={searchParams.name}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                name="tourCode"
                                placeholder="Mã Tour"
                                value={searchParams.tourCode}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleReset}>
                                Xóa Trắng
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Form>
                </li>
            </ul>

            {/* Header của bảng */}
            <div className='table-header'>
                <h6>Bảng dữ liệu</h6>
                <div className='table-header-actions'>
                    <Button
                        type="primary"
                        onClick={() => changeComponent('add')} // Chuyển sang form thêm Tour
                    >
                        <PlusCircleOutlined />
                    </Button>
                    <Button onClick={handleReload}>
                        <ReloadOutlined />
                    </Button>
                </div>
            </div>

            {/* Bảng dữ liệu với pagination */}
            <TransitionGroup>
                <CSSTransition
                    key="searchTable"
                    timeout={300}
                    classNames="fade"
                >
                    {/* Nội dung chính của bạn ở đây, ví dụ: bảng */}
                    <div className='table-container'>
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowKey="id"
                            pagination={{
                                pageSize: 3,
                                showSizeChanger: true,
                                pageSizeOptions: ['3', '5', '10'],
                            }}
                        />
                    </div>
                </CSSTransition>
            </TransitionGroup>


        </div>
    );
}

export default SearchTableTour;
