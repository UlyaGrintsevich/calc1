import { useContext } from 'react';
import { ExcelContext } from './ExcelContext';

// Custom hook to use the Excel context
export const useExcel = () => {
    const context = useContext(ExcelContext);
    if (!context) {
        throw new Error('useExcel must be used within an ExcelProvider');
    }
    return context;
};
