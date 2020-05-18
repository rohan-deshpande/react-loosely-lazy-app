import React from 'react';
import ReactDOM from 'react-dom';
import { lazyForPaint, LazySuspense } from 'react-loosely-lazy';
import { LazyComponent as LazyDependencyComponent } from 'react-loosely-lazy-component';

const LazyAppComponent = lazyForPaint(() =>
  import(/* webpackChunkName: "app-async" */ './async')
);
const LazyModuleComponent = lazyForPaint(() =>
  import(/* webpackChunkName: "app-module" */ './module')
);
const LazyTypeScriptComponent = lazyForPaint(() =>
  import(/* webpackChunkName: "app-ts-async" */ './ts-async')
);
const LazyLazyDependencyComponent = lazyForPaint(() =>
  import(
    /* webpackChunkName: "lazy-lazy-dependency" */ 'react-loosely-lazy-component'
  ).then(m => m.LazyComponent)
);
const Loading = ({ componentName }) => <div>loading {componentName}...</div>;
const App = () => (
  <div>
    <LazySuspense fallback={<Loading componentName="App Async" />}>
      <LazyAppComponent />
    </LazySuspense>
    <LazySuspense fallback={<Loading componentName="App Module" />}>
      <LazyModuleComponent />
    </LazySuspense>
    <LazySuspense fallback={<Loading componentName="App Ts Async" />}>
      <LazyTypeScriptComponent />
    </LazySuspense>
    <LazySuspense fallback={<Loading componentName="Dependency Async" />}>
      <LazyDependencyComponent />
    </LazySuspense>
    <LazySuspense
      fallback={
        <Loading componentName="TODO: Alberto shipped some bugs, he better fix them" />
      }
    >
      <LazyLazyDependencyComponent />
    </LazySuspense>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
