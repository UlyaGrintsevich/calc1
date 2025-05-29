import React, {createContext, ReactNode, useReducer} from 'react';
import {AverageData, buildData, calculateAveragePayments, calculateTargetPrice, CalculationData} from "../utils/utils";


interface ExcelState {
    data: CalculationData;
    averagePayment: AverageData,
    sourcePrice: number,
    targetPrice: number
}

interface ExcelContextProps {
    state: ExcelState;
    setInputValue: (value: number) => void; // Add setInputValue function
}

const initialState: ExcelState = {
    data: buildData(0),
    averagePayment: calculateAveragePayments(buildData(0)),
    sourcePrice: 0,
    targetPrice: 0
};

interface UpdateInputAction {
    type: 'update_input';
    tableData: CalculationData;
    averagePayment: AverageData,
    sourcePrice: number,
    targetPrice: number
}

type Action = UpdateInputAction;

const ExcelContext = createContext<ExcelContextProps | undefined>(undefined);

const excelReducer = (state: ExcelState, action: Action): ExcelState => {

    switch (action.type) {
        case 'update_input':
            return {
                data: action.tableData,
                sourcePrice: action.sourcePrice,
                targetPrice: action.targetPrice,
                averagePayment: action.averagePayment
            };
        default:
            return state;
    }
};

export const ExcelProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(excelReducer, initialState);

    const setInputValue = (sourcePrice: number) => {
        const targetPrice = calculateTargetPrice(sourcePrice);
        const tableData = buildData(targetPrice);
        let updateInput: UpdateInputAction = {
            type: 'update_input',
            tableData: buildData(targetPrice),
            averagePayment: calculateAveragePayments(tableData),
            sourcePrice,
            targetPrice: targetPrice,
        };
        dispatch(updateInput);
    };

    return (
        <ExcelContext.Provider value={{state, setInputValue}}>
            {children}
        </ExcelContext.Provider>
    );
};

export {ExcelContext};
