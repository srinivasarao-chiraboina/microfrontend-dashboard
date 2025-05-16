export { };

(async () => {
  const React = await import('react');
  const ReactDOM = await import('react-dom/client');
  const { default: App } = await import('./App');
  const { default: reportWebVitals } = await import('./reportWebVitals');

  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container!);

  const { Provider } = await import('react-redux');
  const { store } = await import('sharedstore/store');
  const { ThemeProvider } = await import('./components/ThemeProvider');

  root.render(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(
        Provider,
        { store, children: React.createElement(App) },
        React.createElement(
          ThemeProvider,
          null,
          React.createElement(App)
        )
      )
    )
  );

  reportWebVitals();
})();
