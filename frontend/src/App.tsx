import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from './redux/store/store';
import AppRoutes from './components/AppRoute';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
            <Toaster />
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;