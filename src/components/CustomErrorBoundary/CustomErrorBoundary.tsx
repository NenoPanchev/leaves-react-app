import { Box } from '@mui/material';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class CustomErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log('Error from componentDidCatch: ', error);
    }

    render() {
        if (this.state.hasError) {
            return <Box sx={{backgroundColor: 'white', display: 'flex', justifyContent: 'center'}}>
                <img src="/error.png" alt="error-page" />
            </Box>
        }

        return this.props.children;
    }
}

export default CustomErrorBoundary;