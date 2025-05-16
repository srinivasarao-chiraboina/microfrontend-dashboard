import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from 'shared-store/src/store';
import type { AppDispatch } from 'shared-store/src/store';
import { useSelector } from 'react-redux';
import type { RootState } from 'shared-store/src/store';
import './UserList.scss';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.githubUsers);

    const token = localStorage.getItem('authToken');
    const loggedInUser = token ? JSON.parse(atob(token)) : null;

    useEffect(() => {
        if (users.length === 0) {
            fetch('https://api.github.com/users')
                .then(res => res.json())
                .then(data => {
                    const transformed = data.map((user: any) => ({
                        avatar_url: user.avatar_url,
                        id: user.node_id,
                        name: user.login,
                        email: `${user.login}@gmail.com`,
                        role: user.site_admin ? 'admin' : 'viewer',
                        password: ''
                    }));
                    dispatch(setUsers(transformed));
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch users:', err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [users.length]);

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="user-list">
            <div className="header">
                <h2>👥 GitHub Users</h2>
                {loggedInUser?.role === 'admin' && (
                    <Link to="/users/new">+ Add User</Link>
                )}
            </div>

            <div className="user-grid">
                {users.map(user => (
                    <div className="user-card" key={user.id}>
                        <img src={user.avatar_url} alt={user.name} />
                        <h4>{user.name}</h4>
                        <div className="actions">
                            {loggedInUser?.role === 'admin' && (<Link to={`/users/${user.id}/edit`}>Edit</Link>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;