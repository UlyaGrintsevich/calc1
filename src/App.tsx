import React from 'react';
import { ExcelProvider } from './contexts/ExcelContext';
import AppLayout from './components/AppLayout';

const App: React.FC = () => {
  return (
      <ExcelProvider>
        <AppLayout />
      </ExcelProvider>
  );
};

export default App;
