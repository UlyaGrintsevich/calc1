
import React from 'react';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography, styled } from '@mui/material';
import TableComponent from './TableComponent';

const UpdatedDateTypography = styled(Typography)(({ theme }) => ({
    fontSize: 'x-small',
    marginLeft: 'auto', // Move the updated date to the right
}));

const AppLayout: React.FC = () => {
    return (
        <>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <UpdatedDateTypography>
                        Обновлено {__BUILD_DATE__}
                    </UpdatedDateTypography>
                </Toolbar>
            </AppBar>
            <Box mt={2}>
                <Container maxWidth="xl">
                    <TableComponent/>
                </Container>
            </Box>
        </>
    );
};

export default AppLayout;
