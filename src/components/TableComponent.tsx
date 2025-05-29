import React, { useState } from 'react';
import { useExcel } from '../contexts/useExcel';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import NumberInput from './NumberInput';
import {
    PERIODS,
    ORGANIZATIONS,
    ORGANIZATION,
    PERIOD,
    ORG_CONFIG,
} from '../utils/config';
import { calculateTargetPrice } from '../utils/utils';

const TableComponent: React.FC = () => {
    const { setInputValue } = useExcel();

    const [products, setProducts] = useState<{ price: number; targetPrice: number }[]>([]);
    const [hoveredCell, setHoveredCell] = useState<{ org: string; period: string } | null>(null);

    const addProduct = () => {
        if (products.length < 7) {
            setProducts([...products, { price: 0, targetPrice: 0 }]);
        }
    };

    const removeProduct = () => {
        if (products.length > 0) {
            setProducts(products.slice(0, -1));
        }
    };

    const handlePriceChange = (index: number, value: number) => {
        const newProducts = [...products];
        newProducts[index].price = value;
        newProducts[index].targetPrice = calculateTargetPrice(value);
        setProducts(newProducts);
        setInputValue(value || 0);
    };

    const getTotalTargetPrice = () => {
        return products.reduce((total, product) => total + (product.targetPrice || 0), 0);
    };

    const calculateOrganizationPayments = () => {
        const totalPayments: { [org in ORGANIZATION]: { [period in PERIOD]: number | null } } = {} as any;
        const totalTargetPrice = getTotalTargetPrice();

        for (let org of ORGANIZATIONS) {
            totalPayments[org] = {} as { [period in PERIOD]: number | null };

            for (let period of PERIODS) {
                const orgConfig = ORG_CONFIG[org];
                const isInstallment = period.includes('Рассрочка');
                if (isInstallment) {
                    totalPayments[org][period] = null;
                    continue;
                }

                if (typeof orgConfig === 'function') {
                    const config = orgConfig(totalTargetPrice);
                    totalPayments[org][period] =
                        config[period] != null ? config[period] * totalTargetPrice : null;
                } else {
                    const rate = orgConfig[period];
                    totalPayments[org][period] = rate != null ? totalTargetPrice * rate : null;
                }
            }
        }

        return totalPayments;
    };

    const totalTargetPrice = getTotalTargetPrice();
    const organizationPayments = calculateOrganizationPayments();

    return (
        <Grid container columnSpacing={0} rowSpacing={0} maxWidth="xl">
            <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Кредит/Лизинг
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell width="15%" align="center" />
                                {PERIODS.filter(p => !p.includes('Рассрочка')).map((value, idx) => (
                                    <TableCell
                                        key={idx}
                                        align="center"
                                        sx={{
                                            backgroundColor: hoveredCell?.period === value ? '#e0e0e0' : undefined,
                                            transition: 'background-color 0.2s ease',
                                        }}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ORGANIZATIONS.map((org, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            width: '18%',
                                            backgroundColor: hoveredCell?.org === org ? '#e0e0e0' : undefined,
                                            transition: 'background-color 0.2s ease',
                                        }}
                                    >
                                        {org}
                                    </TableCell>
                                    {PERIODS.filter(p => !p.includes('Рассрочка')).map((period) => {
                                        const periodValue = organizationPayments[org]?.[period] || 0;

                                        return (
                                            <TableCell
                                                onMouseEnter={() => setHoveredCell({ org, period })}
                                                onMouseLeave={() => setHoveredCell(null)}
                                                sx={{
                                                    fontWeight: 'bold',
                                                    backgroundColor:
                                                        hoveredCell?.org === org || hoveredCell?.period === period
                                                            ? '#f0f0f0'
                                                            : undefined,
                                                    transition: 'background-color 0.2s ease',
                                                }}
                                                align="center"
                                                padding="none"
                                                key={period}
                                            >
                                                {periodValue == null || isNaN(periodValue)
                                                    ? '-'
                                                    : `${Math.round(periodValue)} р.`}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                            <TableRow style={{ backgroundColor: 'grey' }}>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Средний платёж
                                </TableCell>
                                {PERIODS.filter(p => !p.includes('Рассрочка')).map((period) => {
                                    const validOrgs = ORGANIZATIONS.filter(
                                        (org) =>
                                            organizationPayments[org]?.[period] != null &&
                                            !isNaN(organizationPayments[org]?.[period]!)
                                    );
                                    const avg =
                                        validOrgs.reduce(
                                            (sum, org) =>
                                                sum + (organizationPayments[org]?.[period] || 0),
                                            0
                                        ) / (validOrgs.length || 1);

                                    return (
                                        <TableCell
                                            sx={{
                                                fontWeight: 'bold',
                                                backgroundColor: '#ccc',
                                            }}
                                            align="center"
                                            padding="none"
                                            key={period}
                                        >
                                            {isNaN(avg) || avg === 0 ? '-' : `${Math.round(avg)} р.`}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={12} style={{ marginTop: '20px' }}>
                <Typography variant="h6">
                    Общая сумма: {totalTargetPrice.toFixed(2)} р.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {products.map((product, index) => (
                        <Grid item xs={2} key={index}>
                            <NumberInput
                                label={`Цена ${index + 1}`}
                                onInputChange={(value) => handlePriceChange(index, value)}
                            />
                            <TextField
                                label={`Цена продажи ${index + 1}`}
                                value={
                                    isNaN(product.targetPrice)
                                        ? '-'
                                        : product.targetPrice.toFixed(2)
                                }
                                fullWidth
                                variant="standard"
                                style={{ marginTop: '10px' }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Button
                    variant="contained"
                    onClick={addProduct}
                    style={{ marginTop: '20px', marginRight: '10px' }}
                    disabled={products.length >= 7}
                >
                    +
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={removeProduct}
                    style={{ marginTop: '20px' }}
                    disabled={products.length === 0}
                >
                    -
                </Button>
            </Grid>
        </Grid>
    );
};

export default TableComponent;
