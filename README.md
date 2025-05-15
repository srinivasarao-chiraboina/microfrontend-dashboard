

# Microfrontend Dashboard

This monorepo demonstrates a Microfrontend Architecture using Webpack Module Federation. It includes a host application and three remote apps: a Dashboard, User Management, and a Shared Redux Store.

---

## 📁 Project Structure

```
microfrontend-dashboard/
├── host-app/              # Shell application (container)
├── dashboard-app/         # Remote MFE exposing Dashboard UI
├── user-management-app/   # Remote MFE exposing User Management UI
├── shared-store/          # Remote MFE exposing a shared Redux store
├── package.json           # Root runner scripts
├── README.md              # This file
```

---

## 🧩 Purpose of Each App

- **host-app**: Acts as the container that loads and renders the dashboard and user management remotes.
- **dashboard-app**: Exposes dashboard-related components to the host.
- **user-management-app**: Exposes user creation and listing components to the host.
- **shared-store**: Provides a Redux store (`store.ts`) and reusable slices to all apps. This allows shared state management across microfrontends.

---

## 🔄 How Shared Store Works

1. `shared-store` exposes `store.ts` using `ModuleFederationPlugin`.
2. The `host-app` dynamically loads the store and wraps its `<App />` in `<Provider store={store}>`.
3. Remote apps like `user-management-app` do **not declare their own Redux store** — they use `useDispatch()` and `useSelector()` from the shared store.
4. For example, `UserManagementApp.tsx` fetches GitHub users and dispatches them using `setUsers(data)` from the shared Redux store.
5. UI components like `UserList.tsx` read the state using:
   ```tsx
   const users = useSelector((state: RootState) => state.githubUsers);
   ```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/microfrontend-dashboard.git
cd microfrontend-dashboard
```

---

## 📦 Install Dependencies

Install for each app:

```bash
cd host-app && npm install
cd ../dashboard-app && npm install
cd ../user-management-app && npm install
cd ../shared-store && npm install
cd ..
```

---

## ▶️ Running the Applications

Use these commands in separate terminals or concurrently:

### ✅ Start shared-store (build and serve)

```bash
npm run start:store
```

### ✅ Start Host

```bash
npm run start:host
```

### ✅ Start Dashboard

```bash
npm run start:dashboard
```

### ✅ Start User Management

```bash
npm run start:user
```

---

## 🔗 Localhost Ports

| App                  | Port | URL                          |
|----------------------|------|-------------------------------|
| `shared-store`       | 3003 | http://localhost:3003        |
| `dashboard-app`      | 3001 | http://localhost:3001        |
| `user-management-app`| 3002 | http://localhost:3002        |
| `host-app`           | 3000 | http://localhost:3000        |

---

## 🧠 Highlights

- Uses Webpack Module Federation to dynamically integrate multiple React apps.
- Centralized Redux store is shared and used across host and remotes.
- Data fetched in remotes is dispatched to and read from the shared store.
- Zero duplication of store configuration or slices across apps.

---

## 🤝 Contributing

PRs and feedback welcome. Fork this repo and build your own scalable MFE architecture!
