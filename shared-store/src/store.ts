import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPayload { name: string; role: string };

const userSlice = createSlice({
    name: 'user',
    initialState: { name: '', role: '' },
    reducers: {
        setUser: (state, action: PayloadAction<UserPayload>) => {
            state.name = action.payload.name;
            state.role = action.payload.role;
        },
    },
});

interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

const githubUsersSlice = createSlice({
    name: 'githubUsers',
    initialState: [] as GitHubUser[],
    reducers: {
        setUsers: (state, action: PayloadAction<GitHubUser[]>) => {
            state.length = 0;
            state.push(...action.payload);
        },
        addUser: (state, action: PayloadAction<GitHubUser>) => {
            state.push(action.payload);
        },
        updateUser: (state, action: PayloadAction<GitHubUser>) => {
            const index = state.findIndex(u => u.id === action.payload.id);
            if (index !== -1) state[index] = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export const { setUsers, addUser, updateUser } = githubUsersSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        githubUsers: githubUsersSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;