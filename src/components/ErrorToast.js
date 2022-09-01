import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap';

const ErrorToast = ({ showErrorToast, setShowErrorToast, errorToastMsg }) => {

    const onClose = () => {
        setShowErrorToast(false);
    }

    return (
        <ToastContainer className="p-3" position="top-end">
            <Toast
                onClose={onClose}
                show={showErrorToast}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{errorToastMsg}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ErrorToast