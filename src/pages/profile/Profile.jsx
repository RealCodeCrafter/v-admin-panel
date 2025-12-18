import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import "./profile.scss"
import { useGetProfileQuery } from '../../context/api/userApi';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const { data, isLoading, error } = useGetProfileQuery();
    console.log(data);
    

    const [tempData, setTempData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: '',
    });

    useEffect(() => {
        if (data?.data) {
            setTempData({
                fullName: data.data.fullName || '',
                email: data.data.email || '',
                phone: data.data.phoneNumber || '',
                address: data.data.address || '',
                dateOfBirth: data.data.dateOfBirth || '',
                gender: data.data.gender || '',
            });
        }
    }, [data]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (data?.data) {
            setTempData({
                fullName: data.data.fullName || '',
                email: data.data.email || '',
                phone: data.data.phoneNumber || '',
                address: data.data.address || '',
                dateOfBirth: data.data.dateOfBirth || '',
                gender: data.data.gender || '',
            });
        }
        setIsEditing(false);
    };

    const handleChange = (field, value) => {
        setTempData(prev => ({ ...prev, [field]: value }));
    };

    if (isLoading) {
        return <div className="profile container">Loading...</div>;
    }

    if (error) {
        return <div className="profile container">Error loading profile data</div>;
    }

    return (
        <div className="profile container">
            <div className='profile__header'>
                <h2 className='profile__header-title'>User Profile</h2>
                {/* <div>
                    {!isEditing ? (
                        <button className="profile__header-btnEdit" onClick={handleEdit}>
                            <Edit2 size={18} />
                            Edit
                        </button>
                    ) : (
                        <div className="profile__header-actionButtons">
                            <button className="profile__header-btnSave" onClick={handleSave}>
                                <Save size={18} />
                                Save
                            </button>
                            <button className="profile__header-btnCancel" onClick={handleCancel}>
                                <X size={18} />
                                Close
                            </button>
                        </div>
                    )}
                </div> */}
            </div>

            <div className="profile-box">
                <div className="profile-box-imageSection">
                    <div className="profile-box-imageWrapper">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="profile-box-profileImage" />
                        ) : (
                            <div className="profile-box-avatarPlaceholder">
                                <User size={60} color="#667eea" />
                            </div>
                        )}
                    </div>
                    {isEditing && (
                        <div className="profile-box-uploadSection">
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="profile-box-fileInput"
                            />
                            <label htmlFor="imageUpload" className="profile-box-uploadButton">
                                📷 Upload a picture
                            </label>
                        </div>
                    )}
                </div>

                <div className="profile-box-infoSection">
                    <h3 className="profile-box-infoSection-sectionTitle">Personal Information</h3>

                    <div className="profile-box-infoSection-infoGrid">
                        <div className="profile-box-infoSection-infoItem">
                            <label className="profile-box-infoSection-label">
                                <User size={18} className="profile-box-infoSection-icon" />
                                Full name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={tempData.fullName}
                                    onChange={(e) => handleChange('fullName', e.target.value)}
                                    className="profile-box-infoSection-input"
                                />
                            ) : (
                                <div className="profile-box-infoSection-value">
                                    {data?.data?.fullName || 'N/A'}
                                </div>
                            )}
                        </div>

                        <div className="profile-box-infoSection-infoItem">
                            <label className="profile-box-infoSection-label">
                                <Mail size={18} className="profile-box-infoSection-icon" />
                                Email
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={tempData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="profile-box-infoSection-input"
                                />
                            ) : (
                                <div className="profile-box-infoSection-value">
                                    {data?.data?.email || 'N/A'}
                                </div>
                            )}
                        </div>

                        <div className="profile-box-infoSection-infoItem">
                            <label className="profile-box-infoSection-label">
                                <Phone size={18} className="profile-box-infoSection-icon" />
                                Phone Number
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={tempData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="profile-box-infoSection-input"
                                />
                            ) : (
                                <div className="profile-box-infoSection-value">
                                    {data?.data?.phoneNumber || '+998'}
                                </div>
                            )}
                        </div>

                        <div className="profile-box-infoSection-infoItem">
                            <label className="profile-box-infoSection-label">
                                <MapPin size={18} className="profile-box-infoSection-icon" />
                                Address
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={tempData.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className='profile-box-infoSection-input'
                                />
                            ) : (
                                <div className="profile-box-infoSection-value">
                                    {data?.data?.address || 'N/A'}
                                </div>
                            )}
                        </div>

                        <div className="profile-box-infoSection-infoItem">
                            <label className="profile-box-infoSection-label">
                                <Calendar size={18} className="profile-box-infoSection-icon" />
                                Date of birth
                            </label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={tempData.dateOfBirth ? tempData.dateOfBirth.slice(0, 10) : ''}
                                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                    className="profile-box-infoSection-input"
                                />
                            ) : (
                                <div className="profile-box-infoSection-value">
                                    {data?.data?.dateOfBirth ? data.data.dateOfBirth.slice(0, 10) : 'N/A'}
                                </div>
                            )}
                        </div>

                        <div className="profile-box-infoSection-infoItem">
                            <label className="profile-box-infoSection-label">
                                👤 Gender
                            </label>
                            {isEditing ? (
                                <select
                                    value={tempData.gender}
                                    onChange={(e) => handleChange('gender', e.target.value)}
                                    className="profile-box-infoSection-input"
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <div className="profile-box-infoSection-value">
                                    {data?.data?.gender || 'N/A'}
                                </div>
                            )}
                        </div>

                        <div className="profile-box-infoSection-infoItem">
                            <label className="profile-box-infoSection-label">
                                📅 Registered Date
                            </label>
                            <div className="profile-box-infoSection-value">
                                {data?.data?.registeredDate?.$date 
                                    ? data.data.registeredDate.$date.slice(0, 10) 
                                    : data?.data?.registeredDate
                                    ? new Date(data.data.registeredDate).toLocaleDateString()
                                    : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}