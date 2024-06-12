import React, { createContext, useContext, useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [snackPack, setSnackPack] = useState([]);

    useEffect(() => {
        if (snackPack.length && !open) {
            // Set the Snackbar to open
            setOpen(true);
        }
     
    }, [snackPack, open]);

    const enqueueSnackbar = (message, severity) => {
        setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setSnackPack((prev) => prev.slice(1));
        if (snackPack.length > 0) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

 

    return (
        <SnackbarContext.Provider value={{ enqueueSnackbar }}>
            {children}
            {snackPack.length > 0 && (
                <Snackbar
                    key={snackPack[0].key}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                   
                >
                    <Alert onClose={handleClose} severity={snackPack[0].severity} sx={{ width: '100%' }}>
                        {snackPack[0].message}
                    </Alert>
                </Snackbar>
            )}
        </SnackbarContext.Provider>
    );
};
