import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { use, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import MessageComponent from './components/MessageComponent';

const fetchMessage = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello from the Promise!');
    }, 2000);
  });
};

const messagePromise = fetchMessage();

function App() {
  return (
    <ErrorBoundary fallback={<p>⚠️ Something went wrong</p>}>
      <Suspense fallback={<p>Loading...</p>}>
        <MessageComponent messagePromise={messagePromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
