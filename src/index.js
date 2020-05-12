import React from 'react';
import ReactDOM from 'react-dom';
import { lazyForPaint } from 'react-loosely-lazy';

const LazyAppComponent = lazyForPaint(() => import('./async'));
const App = () => (
  <div>
    <LazyAppComponent />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
