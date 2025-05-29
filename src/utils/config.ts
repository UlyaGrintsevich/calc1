

export enum PAYMENT_TYPE {
  CREDIT = "Кредит",
  INSTALLMENT = "Рассрочка",
}

export const PAYMENT_TYPES = Object.values(PAYMENT_TYPE);

export enum PERIOD {
  M4 = "4 мес",
  M6 = "6 мес",
  M9 = "9 мес",
  M12 = "12 мес",
  M13 = "13 мес",
  M18 = "18 мес",
  M24 = "24 мес",
  M30 = "30 мес",
  M36 = "36 мес",
  M48 = "48 мес",
  M60 = "60 мес",

}

export const PERIODS = Object.values(PERIOD);

export enum ORGANIZATION {
  BankReshenie = 'Банк "Решение"',
  BankSBER = 'Банк "СБЕР"',
  BankDabrabyt = "Банк Дабрабыт",
  LizingAvtoprom = 'Лизинг "Автопром"',
  LizingYuwil = 'Лизинг "Ювилс"',
  LizingSmart = 'Лизинг "Смарт"',
  LizingCapital = 'Лизинг "Кэпитал"',
}

export const ORGANIZATIONS = Object.values(ORGANIZATION);
export function getLizingCapitalConfig(): { [period in PERIOD]: number | null } {
  return {
    [PERIOD.M4]: 0.2875,
    [PERIOD.M6]: 0.196667,
    [PERIOD.M9]: null,
    [PERIOD.M12]: 0.111667,
    [PERIOD.M13]: null,
    [PERIOD.M18]: 0.084444,
    [PERIOD.M24]: 0.070833,
    [PERIOD.M30]: null,
    [PERIOD.M36]: 0.059722,
    [PERIOD.M48]: null,
    [PERIOD.M60]: null,
  };
}
// Универсальный калькулятор лизинга с учетом условий
const rates_9_24: Record<number, number> = {
  9: 0.133111,
  12: 0.105333,
  18: 0.077556,
  24: 0.063667,
};

const rates_9_60: Record<number, number> = {
  9: 0.133111,
  12: 0.105333,
  18: 0.077556,
  24: 0.063667,
  36: 0.053611,
  48: 0.045833,
  60: 0.040278,
};



function calculateLeasingRate(price: number, period: number): number {
  if (period === 36) {
    return price > 2500 ? +(1 / 36 + 0.036 / 2).toFixed(6) : 0.0;
  } else if (price >= 1500 && price <= 2500 && rates_9_24[period]) {
    return rates_9_24[period];
  } else if (price > 10000 && rates_9_60[period]) {
    return rates_9_60[period];
  } else {
    return 0.0;
  }
}



export function getLizingAvtopromConfig(price: number) {
  return {
    [PERIOD.M4]: null,
    [PERIOD.M6]: null,
    [PERIOD.M9]: calculateLeasingRate(price, 9),
    [PERIOD.M12]: calculateLeasingRate(price, 12),
    [PERIOD.M13]: null,
    [PERIOD.M18]: calculateLeasingRate(price, 18),
    [PERIOD.M24]: calculateLeasingRate(price, 24),
    [PERIOD.M30]: null,
    [PERIOD.M36]: calculateLeasingRate(price, 36),
    [PERIOD.M48]: calculateLeasingRate(price, 48),
    [PERIOD.M60]: calculateLeasingRate(price, 60),

  };
}

export function getOrgRate(org: ORGANIZATION, price: number, period: PERIOD): number {
  if (org === ORGANIZATION.LizingAvtoprom) {
    return getLizingAvtopromConfig(price)[period] || 0;
  }
  const config = ORG_CONFIG[org];
  if (typeof config === 'function') {
    return config(price)[period] || 0;
  }
  return config?.[period] || 0;
}

export const ORG_CONFIG: {
  [org in ORGANIZATION]: { [period in PERIOD]: number | null } | ((price: number) => { [period in PERIOD]: number | null });
} = {
  [ORGANIZATION.BankReshenie]: {
    [PERIOD.M4]: null,
    [PERIOD.M6]: null,
    [PERIOD.M9]: null,
    [PERIOD.M12]: 1.09404 / 12,
    [PERIOD.M13]: null,
    [PERIOD.M18]: null,
    [PERIOD.M24]: 1.2012 / 24,
    [PERIOD.M30]: null,
    [PERIOD.M36]: 1.30068 / 36,
    [PERIOD.M48]: 1.39248 / 48,
    [PERIOD.M60]: 1.4838 / 60,

  },

  [ORGANIZATION.BankSBER]: {
    [PERIOD.M4]: null,
    [PERIOD.M6]: null,
    [PERIOD.M9]: null,
    [PERIOD.M12]: null,
    [PERIOD.M13]: 0.08532,
    [PERIOD.M18]: 0.06386,
    [PERIOD.M24]: 0.04997,
    [PERIOD.M30]: null,
    [PERIOD.M36]: 0.03618,
    [PERIOD.M48]: 0.02943,
    [PERIOD.M60]: 0.02547,

  },
  [ORGANIZATION.BankDabrabyt]: {
    [PERIOD.M4]: null,
    [PERIOD.M6]: null,
    [PERIOD.M9]: null,
    [PERIOD.M12]: 0.09233,
    [PERIOD.M13]: null,
    [PERIOD.M18]: 0.064056,
    [PERIOD.M24]: 0.049963,
    [PERIOD.M30]: null,
    [PERIOD.M36]: 0.03578,
    [PERIOD.M48]: 0.028725,
    [PERIOD.M60]: 0.02447,

  },

  [ORGANIZATION.LizingYuwil]: {
    [PERIOD.M4]: 0.2875,
    [PERIOD.M6]: 0.19666,
    [PERIOD.M9]: null,
    [PERIOD.M12]: 0.1125,
    [PERIOD.M13]: null,
    [PERIOD.M18]: 0.08556,
    [PERIOD.M24]: 0.07083,
    [PERIOD.M30]: 0.064,
    [PERIOD.M36]: 0.06028,
    [PERIOD.M48]: null,
    [PERIOD.M60]: null,

  },
  [ORGANIZATION.LizingSmart]: {
    [PERIOD.M4]: null,
    [PERIOD.M6]: null,
    [PERIOD.M9]: null,
    [PERIOD.M12]: 0.10516,
    [PERIOD.M13]: 0.10595,
    [PERIOD.M18]: 0.0755,
    [PERIOD.M24]: 0.06172,
    [PERIOD.M30]: null,
    [PERIOD.M36]: 0.04796,
    [PERIOD.M48]: 0.04187,
    [PERIOD.M60]: null,

  },

  [ORGANIZATION.LizingAvtoprom]: getLizingAvtopromConfig,
  [ORGANIZATION.LizingCapital]: getLizingCapitalConfig(),
};
