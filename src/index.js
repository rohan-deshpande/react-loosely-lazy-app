import React from 'react';
import ReactDOM from 'react-dom';
import { lazyForPaint, LazySuspense } from 'react-loosely-lazy';
import { LazyComponent as LazyDependencyComponent } from 'react-loosely-lazy-component';

const LazyAppComponent = lazyForPaint(() =>
  import(/* webpackChunkName: "app-async" */ './async')
);
const Loading = ({ componentName }) => <div>loading {componentName}...</div>;
const App = () => (
  <div>
    <LazySuspense fallback={<Loading componentName="App Async" />}>
      <LazyAppComponent />
    </LazySuspense>
    <LazySuspense fallback={<Loading componentName="Dependency Async" />}>
      <LazyDependencyComponent />
    </LazySuspense>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
