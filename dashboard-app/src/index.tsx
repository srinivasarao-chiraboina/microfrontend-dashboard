export {};

(async () => {
  const React = await import('react');
  const ReactDOM = await import('react-dom/client');
  const { default: App } = await import('./App');
  const { default: reportWebVitals } = await import('./reportWebVitals');

  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container!);

  root.render(
    React.createElement(React.StrictMode, null, React.createElement(App))
  );

  reportWebVitals();
})();
