var _a;
import { configureStore, createSlice } from '@reduxjs/toolkit';
// interface UserPayload { name: string; role: string };
var userSlice = createSlice({
    name: 'user',
    initialState: { name: '', role: '' },
    reducers: {
        setUser: function (state, action) {
            state.name = action.payload.name;
            state.role = action.payload.role;
        },
    },
});
var githubUsersSlice = createSlice({
    name: 'githubUsers',
    initialState: [],
    reducers: {
        setUsers: function (state, action) {
            return action.payload;
        },
        addUser: function (state, action) {
            state.push(action.payload);
        },
        updateUser: function (state, action) {
            var index = state.findIndex(function (u) { return u.id === action.payload.id; });
            if (index !== -1)
                state[index] = action.payload;
        },
    },
});
export var setUser = userSlice.actions.setUser;
export var setUsers = (_a = githubUsersSlice.actions, _a.setUsers), addUser = _a.addUser, updateUser = _a.updateUser;
export var store = configureStore({
    reducer: {
        user: userSlice.reducer,
        githubUsers: githubUsersSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});
