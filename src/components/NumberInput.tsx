import React from 'react';
import { TextField, styled } from '@mui/material';

interface NumberInputProps {
    label: string;
    onInputChange: (value: number) => void; // Update to onInputChange
}

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& input[type=number]': {
        '-moz-appearance': 'textfield',
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },
}));

const NumberInput: React.FC<NumberInputProps> = ({ label, onInputChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parseFloat(event.target.value);
        onInputChange(parsedValue); // Use onInputChange
    };

    return (
        <StyledTextField
            label={label}
            type="number"
            onChange={handleChange}
            margin="normal"
            InputProps={{
                inputProps: { min: 0 }, // You can set min value if needed
            }}
        />
    );
};

export default NumberInput;
