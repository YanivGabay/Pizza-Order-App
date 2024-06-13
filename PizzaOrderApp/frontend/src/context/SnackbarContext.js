import React, { createContext, useContext, useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarContext = createContext();

/**
 * Custom hook to use the Snackbar context.
 * 
 * @returns {Object} The Snackbar context value
 */
export const useSnackbar = () => useContext(SnackbarContext);

/**
 * Provides Snackbar-related state and functionality to its children.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The child components
 * @returns {JSX.Element} The rendered component
 */
export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [snackPack, setSnackPack] = useState([]);

    useEffect(() => {
        if (snackPack.length && !open) {
            // Set the Snackbar to open
            setOpen(true);
        }
    }, [snackPack, open]);

    /**
     * Enqueues a Snackbar message with a specific severity.
     * 
     * @param {string} message - The message to display in the Snackbar
     * @param {string} severity - The severity of the alert (e.g., "success", "error", "warning", "info")
     */
    const enqueueSnackbar = (message, severity) => {
        setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
    };

    /**
     * Handles the closing of the Snackbar.
     * 
     * @param {Event} event - The event that triggered the close
     * @param {string} reason - The reason for closing the Snackbar
     */
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
