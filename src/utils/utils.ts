import {ORG_CONFIG, ORGANIZATION, ORGANIZATIONS, PERIOD, PERIODS} from "./config";
import _ from "lodash";

export type CalculationData = {
    [key in ORGANIZATION]: { [key in PERIOD]: number | null }
};

export type AverageData = {
    [key in PERIOD]: number | null
};


export function buildData(input: number): CalculationData {
    return ORGANIZATIONS.reduce((acc, org) => {
        acc[org] = PERIODS.reduce((innerAcc, period) => {
            let configValue = ORG_CONFIG[org][period];
            innerAcc[period] = configValue === null ? null : input * configValue;
            return innerAcc;
        }, {} as { [key in PERIOD]: number | null });
        return acc;
    }, {} as CalculationData);
}

export function calculateAveragePayments(tableData: CalculationData) {
    let averageData = {} as { [key in PERIOD]: number | null };
    for (let period of PERIODS) {
        let mean = _.mean(Object.values(tableData).map(orgValues => orgValues[period]).filter(value => value != null));
        averageData[period] = mean;
    }
    return averageData;
}


export function calculateTargetPrice(sourcePrice: number): number {
    if (sourcePrice === 0) return 0;

    if (sourcePrice <= 100) return sourcePrice * 2 + 400;
    if (sourcePrice <= 200) return sourcePrice * 2 + 400;
    if (sourcePrice <= 300) return sourcePrice * 2 + 350;
    if (sourcePrice <= 400) return sourcePrice * 2 + 300;
    if (sourcePrice <= 500) return sourcePrice * 2 + 250;
    if (sourcePrice <= 600) return sourcePrice * 2 + 200;
    if (sourcePrice <= 700) return sourcePrice * 2 + 150;
    if (sourcePrice <= 800) return sourcePrice * 2 + 100;
    if (sourcePrice <= 900) return sourcePrice * 2 + 25;
    if (sourcePrice <= 1000) return sourcePrice * 1.95;

    if (sourcePrice <= 1100) return sourcePrice * 1.88;
    if (sourcePrice <= 1200) return sourcePrice * 1.87;
    if (sourcePrice <= 1300) return sourcePrice * 1.86;
    if (sourcePrice <= 1400) return sourcePrice * 1.85;
    if (sourcePrice <= 1500) return sourcePrice * 1.8;
    if (sourcePrice <= 1600) return sourcePrice * 1.79;
    if (sourcePrice <= 1700) return sourcePrice * 1.78;
    if (sourcePrice <= 1800) return sourcePrice * 1.77;
    if (sourcePrice <= 1900) return sourcePrice * 1.76;
    if (sourcePrice <= 2000) return sourcePrice * 1.75;
    if (sourcePrice <= 2100) return sourcePrice * 1.74;
    if (sourcePrice <= 2200) return sourcePrice * 1.73;
    if (sourcePrice <= 2300) return sourcePrice * 1.72;
    if (sourcePrice <= 2400) return sourcePrice * 1.71;
    if (sourcePrice <= 2600) return sourcePrice * 1.7;
    if (sourcePrice <= 2700) return sourcePrice * 1.69;
    if (sourcePrice <= 2800) return sourcePrice * 1.68;
    if (sourcePrice <= 2900) return sourcePrice * 1.67;
    if (sourcePrice <= 3000) return sourcePrice * 1.66;
    if (sourcePrice <= 3100) return sourcePrice * 1.65;
    if (sourcePrice <= 3200) return sourcePrice * 1.64;
    if (sourcePrice <= 3300) return sourcePrice * 1.63;
    if (sourcePrice <= 3400) return sourcePrice * 1.62;
    if (sourcePrice <= 3500) return sourcePrice * 1.61;
    if (sourcePrice <= 3600) return sourcePrice * 1.6;
    if (sourcePrice <= 3700) return sourcePrice * 1.59;
    if (sourcePrice <= 3800) return sourcePrice * 1.58;
    if (sourcePrice <= 4400) return sourcePrice * 1.57;
    if (sourcePrice <= 4900) return sourcePrice * 1.565;
    if (sourcePrice <= 5900) return sourcePrice * 1.562;
    if (sourcePrice <= 6900) return sourcePrice * 1.555;
    if (sourcePrice <= 7900) return sourcePrice * 1.55;
    if (sourcePrice <= 8900) return sourcePrice * 1.5455;
    if (sourcePrice <= 9900) return sourcePrice * 1.54;
    if (sourcePrice <= 10900) return sourcePrice * 1.535;
    if (sourcePrice <= 11900) return sourcePrice * 1.531;
    if (sourcePrice <= 12900) return sourcePrice * 1.528;
    if (sourcePrice <= 13900) return sourcePrice * 1.525;

    return sourcePrice * 1.525;
}




