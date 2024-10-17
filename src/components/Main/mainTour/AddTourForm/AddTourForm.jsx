import React, { useState } from 'react';
import { Form, Input, Button, message, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './addTourForm.css';

const { Option } = Select;

function AddTourForm({ changeComponent }) {
    const [tour, setTour] = useState({
        tourCode: '',
        name: '',
        description: '',
        image: null, // Chúng ta sẽ lưu trữ hình ảnh như là file
        typeTourId: '',
        typeId: '',
        locationStart: '',
        locationFinish: '',
        availableDates: [],
        timeDate: '',
        price: '',
        maxPeople: '',
        vehicle: '',
        note: '',
        isActive: true,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTour({ ...tour, [name]: value });
    };

    const handleImageChange = (file) => {
        setTour({ ...tour, image: file }); // Cập nhật hình ảnh khi có file được tải lên
    };

    const handleSave = () => {
        console.log('Saving new tour:', tour);
        message.success('Tour mới đã được thêm!');
        changeComponent('list'); // Quay lại danh sách tour
    };

    return (
        <div className="add-tour-form-container">
            <div className="form-left">
                <Form layout="vertical">
                    <Form.Item label="Mã Tour">
                        <Input name="tourCode" value={tour.tourCode} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Tên Tour">
                        <Input name="name" value={tour.name} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Mô tả">
                        <Input.TextArea name="description" value={tour.description} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Hình ảnh">
                        <Upload
                            beforeUpload={(file) => {
                                handleImageChange(file);
                                return false; // Ngăn chặn upload tự động
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Loại Tour">
                        <Select name="typeTourId" value={tour.typeTourId} onChange={value => setTour({ ...tour, typeTourId: value })}>
                            <Option value="type1">Loại 1</Option>
                            <Option value="type2">Loại 2</Option>
                            <Option value="type3">Loại 3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="ID Loại">
                        <Input name="typeId" value={tour.typeId} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Địa điểm xuất phát">
                        <Input name="locationStart" value={tour.locationStart} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Địa điểm kết thúc">
                        <Input name="locationFinish" value={tour.locationFinish} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Ngày khởi hành">
                        <Input
                            type="text" // Có thể sử dụng date picker nếu cần
                            name="timeDate"
                            value={tour.timeDate}
                            onChange={handleInputChange}
                            placeholder="Ngày khởi hành"
                        />
                    </Form.Item>
                    <Form.Item label="Giá">
                        <Input type="number" name="price" value={tour.price} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Số người tối đa">
                        <Input type="number" name="maxPeople" value={tour.maxPeople} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Phương tiện">
                        <Input name="vehicle" value={tour.vehicle} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input.TextArea name="note" value={tour.note} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Trạng thái">
                        <Select
                            name="isActive"
                            value={tour.isActive ? 'active' : 'inactive'}
                            onChange={(value) => setTour({ ...tour, isActive: value === 'active' })}
                        >
                            <Option value="active">Hoạt động</Option>
                            <Option value="inactive">Không hoạt động</Option>
                        </Select>
                    </Form.Item>
                    <Button type="primary" onClick={handleSave}>
                        Lưu Tour
                    </Button>
                    <Button onClick={() => changeComponent('list')} style={{ marginLeft: '10px' }}>
                        Hủy
                    </Button>
                </Form>
            </div>
            <div className="form-right">
                {tour.image && (
                    <img
                        src={URL.createObjectURL(tour.image)} // Hiển thị hình ảnh đã tải lên
                        alt="Tour Preview"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                )}
            </div>
        </div>
    );
}

export default AddTourForm;
