import { useSelector } from 'react-redux';
import { RootState } from 'shared-store/src/store';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './UserStats.scss';

const COLORS = ['#4CAF50', '#FF9800'];

const UserStats = () => {
    const users = useSelector((state: RootState) => state.githubUsers);

    const adminCount = users.filter(user => user.role === 'admin').length;
    const viewerCount = users.length - adminCount;

    const roleData = [
        { name: 'Admins', value: adminCount },
        { name: 'Viewers', value: viewerCount },
    ];

    const countData = [
        { name: 'Total Users', value: users.length },
    ];

    return (
        <div className="user-stats-container">
            <h2>User Stats Overview</h2>

            <div className="tiles">
                <div className="tile">
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                </div>
                <div className="tile">
                    <h3>Admins</h3>
                    <p>{adminCount}</p>
                </div>
                <div className="tile">
                    <h3>Viewers</h3>
                    <p>{viewerCount}</p>
                </div>
            </div>

            <div className="charts">
                <div className="chart-box">
                    <h4>Admin vs Viewer</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={roleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                                {roleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-box">
                    <h4>Total Users</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={countData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                                <Cell fill="#2196F3" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default UserStats;