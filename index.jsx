import React from 'react';

// the hook
function useSuspendable() {
  const [isLoaded, setLoaded] = React.useState(false);
  const [value, setValue] = React.useState();

  return (prom) => {
    if (!isLoaded) {
      throw prom.then(r => {
        setLoaded(true);
        setValue(r);
      })
    }
    return value;
  }
}

// the usage:

// async function returns promise
function init() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('loaded');
    }, 1000);
  });
}

// component that needs suspending
function Bootstrap(p) {
  const result = p.suspend(init());

  return <div>{{result}}</div>
}

// wrapper component that has the Suspense
export default function App() {
  const suspend = useSuspendable();

  return (
    <React.Suspense fallback="loading">
      <Bootstrap suspend={suspend} />
    </React.Suspense>
  );
}
