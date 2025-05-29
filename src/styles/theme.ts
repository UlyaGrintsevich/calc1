import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Custom primary color
        },
        secondary: {
            main: '#dc004e', // Custom secondary color
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', // Custom font family
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
        },
    },
    spacing: 8, // Default spacing unit
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderLeft: 'none', // Remove left border
                    borderTop: 'none', // Remove top border
                    borderRight: '1.5px solid #ccc', // Add right border
                    borderBottom: '1.5px solid #ccc', // Add bottom border
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': {
                        backgroundColor: '#E8E8E8', // Custom background color
                        fontWeight: 'bold', // Custom font weight
                        color: '#123', // Custom text color
                    },
                },
            },
        },
    },
});

export default theme;
