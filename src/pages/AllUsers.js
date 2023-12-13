import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLock, FaUnlock, FaTrash, FaUser } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/users';
import { useDarkMode } from '../components/DarkModeContext';
import { useTranslation } from 'react-i18next'
import { API_ENDPOINTS } from '../components/api';

const AllUsers = () => {
    const { isDarkMode } = useDarkMode()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [selectedUsers]);

    const timeFormatter = (time) => {
        const date = new Date(time);
        return date.toLocaleString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true,
        });
    };

    const handleCheckboxChange = (id) => {
        const newSelectedUsers = [...selectedUsers];
        const index = newSelectedUsers.indexOf(id);
        if (index > -1) {
            newSelectedUsers.splice(index, 1);
        } else {
            newSelectedUsers.push(id);
        }
        setSelectedUsers(newSelectedUsers);
    };

    const handleBlock = () => {
        const promises = selectedUsers.map((user) => {
            const url = `${API_ENDPOINTS.USERS}/${user}`;
            const data = { user: { status: 'blocked' } };

            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        });

        Promise.all(promises)
            .then((responses) => {
                console.log('Blocked', responses);
                setSelectedUsers([]);
            })
            .catch((error) => {
                console.log('Block error', error);
            });
    };


    const handleUnblock = () => {
        const promises = selectedUsers.map((user) => {
            const url = `${API_ENDPOINTS.USERS}/${user}`;
            const data = { user: { status: 'active' } };

            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        });

        Promise.all(promises)
            .then((responses) => {
                console.log('Unblocked', responses);
                setSelectedUsers([]);
            })
            .catch((error) => {
                console.log('Unblock error', error);
            });
    };


    const handleDelete = () => {
        const promises = selectedUsers.map((user) => axios.delete(`${API_ENDPOINTS.USERS}/${user}`));

        Promise.all(promises)
            .then((responses) => {
                console.log('Deleted', responses);
                setSelectedUsers([]);
            })
            .catch((error) => {
                console.log('Delete error', error);
            });
    };

    const handleMakeAdmin = () => {
        const promises = selectedUsers.map((user) => {
            const url = `${API_ENDPOINTS.USERS}/${user}`;
            const data = { user: { role: 'admin' } };

            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        });

        Promise.all(promises)
            .then((responses) => {
                console.log('made Admin', responses);
                setSelectedUsers([]);
            })
            .catch((error) => {
                console.log('Admin error', error);
            });
    };

    const handleMakeUser = () => {
        const promises = selectedUsers.map((user) => {
            const url = `${API_ENDPOINTS.USERS}/${user}`;
            const data = { user: { role: 'user' } };

            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        });

        Promise.all(promises)
            .then((responses) => {
                console.log('made User', responses);
                setSelectedUsers([]);
            })
            .catch((error) => {
                console.log('User error', error);
            });
    };

    const className = (userStatus) => {
        if (userStatus === 'blocked') {
            return 'text-secondary';
        }
        return '';
    };

    return (
        <div className="mt-5 p-5 container">
            <div className="d-flex justify-content-start gap-3">
                <button type="button" className={`btn btn-${isDarkMode ? 'dark' : 'success'}`} onClick={handleBlock}>
                    <FaLock />
                    {' '}
                    {t('Block')}
                </button>
                <button type="button" className={`btn btn-${isDarkMode ? 'dark' : 'success'}`} onClick={handleUnblock}>
                    <FaUnlock />
                    {' '}
                    {t('Unblock')}
                </button>
                <button type="button" className={`btn btn-${isDarkMode ? 'dark' : 'success'}`} onClick={handleDelete}>
                    <FaTrash />
                    {' '}
                    {t('Delete')}
                </button>
                <button type="button" className={`btn btn-${isDarkMode ? 'dark' : 'success'}`} onClick={handleMakeAdmin} >
                    <RiAdminFill />
                    {' '}
                    {t('Make admin')}
                </button>
                <button type="button" className={`btn btn-${isDarkMode ? 'dark' : 'success'}`} onClick={handleMakeUser} >
                    <FaUser />
                    {' '}
                    {t('Make user')}
                </button>
            </div>
            <br />
            <div className='table-responsive'>
                <table className={`table table-${isDarkMode ? 'dark' : 'striped'} table-hover container`}>
                    <thead>
                        <tr>
                            <th>{t('Select')}</th>
                            <th>{t('Name')}</th>
                            <th>{t('Role')}</th>
                            <th>{t('Email')}</th>
                            <th>{t('Last Login')}</th>
                            <th>{t('Registration Time')}</th>
                            <th>{t('Status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ≈
                        {users.map((user) => (

                            <tr key={user.id}>
                                <td>
                                    {/* eslint-disable */}
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleCheckboxChange(user.id)}
                                    />
                                    {/* eslint-disable */}
                                </td>
                                <td className={className(user.status)}>{user.username}</td>
                                <td className={className(user.status)}>{user.role}</td>
                                <td className={className(user.status)}>{user.email}</td>
                                <td className={className(user.status)}>{timeFormatter(user.updated_at)}</td>
                                <td className={className(user.status)}>{timeFormatter(user.created_at)}</td>
                                <td className={className(user.status)}>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
