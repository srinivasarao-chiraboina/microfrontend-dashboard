import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from 'shared-store/src/store';
import type { AppDispatch } from 'shared-store/src/store';
import { useSelector } from 'react-redux';
import type { RootState } from 'shared-store/src/store';
import './UserList.scss';

const UserList = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.githubUsers);

    useEffect(() => {
        fetch('https://api.github.com/users')
            .then(res => res.json())
            .then(data => {
                dispatch(setUsers(data));
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch users:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="user-list">
            <div className="header">
                <h2>👥 GitHub Users</h2>
                <a className="add-user" href="/users/new">+ Add User</a>
            </div>

            <div className="user-grid">
                {users.map(user => (
                    <div className="user-card" key={user.id}>
                        <img src={user.avatar_url} alt={user.login} />
                        <h4>{user.login}</h4>
                        <div className="actions">
                            <a href={user.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
                            <a href={`/users/${user.id}/edit`}>Edit</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;