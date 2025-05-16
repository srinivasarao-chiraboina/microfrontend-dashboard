import './index.css';
export { };

(async () => {
  const React = await import('react');
  const ReactDOM = await import('react-dom/client');
  const { default: App } = await import('./DashboardApp');
  const { default: reportWebVitals } = await import('./reportWebVitals');

  const { Provider } = await import('react-redux');
  const { store } = await import('sharedstore/store');
  const { BrowserRouter } = await import('react-router-dom');
  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container!);

  root.render(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(
          Provider,
          { store, children: React.createElement(App) }
        )
      )
    )
  );

  reportWebVitals();
})();
