import React, { useEffect } from 'react'
import './App.css'
import { initializeAuth } from './features/auth/authSlice'
import { Provider } from 'react-redux'
import { AppRouter } from './routes/AppRouter'
import { useAppDispatch } from './store/StoreHooks'
import { store } from './store'
import { ErrorBoundary } from './components/ErrorBoundary'

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch]);

  return <>{children}</>;
}

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <AuthInitializer>
          <AppRouter />
        </AuthInitializer>
      </ErrorBoundary>
    </Provider>
  );
}

export default App
