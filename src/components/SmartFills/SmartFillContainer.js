import React, { useState } from 'react'
import { Alert, Button, Card, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import moment from 'moment'

const SmartFillContainer = ({ words, isLoading, invoiceFormInputFocus, invoicePayload, setInvoicePayload }) => {
	const [showErrorToast, setShowErrorToast] = useState(false)
	const [errorToastMsg, setErrorToastMsg] = useState("")

	const onWordButtonClick = (word) => {
		return () => {
			if (!isLoading && invoiceFormInputFocus && word) {
				if (invoiceFormInputFocus === "InvoiceNumber") {
					setInvoicePayload({ ...invoicePayload, invoiceNumber: word })
				}
				else if (invoiceFormInputFocus === "InvoiceDate") {
					const isValidInvoiceDate = moment(word).isValid();
					if (isValidInvoiceDate) {
						const invoiceDate = moment(word).format("YYYY-MM-DD")
						setInvoicePayload({ ...invoicePayload, invoiceDate: invoiceDate })
					} else {
						setErrorToastMsg(`"${word}" isn't a valid date format`)
						setShowErrorToast(true)
					}
				}
				else if (invoiceFormInputFocus === "DueDate") {
					const isValidDueDate = moment(word).isValid();
					if (isValidDueDate) {
						const dueDate = moment(word).format("YYYY-MM-DD")
						setInvoicePayload({ ...invoicePayload, dueDate: dueDate })
					} else {
						setErrorToastMsg(`"${word}" isn't a valid date format`)
						setShowErrorToast(true)
					}
				}
				else if (invoiceFormInputFocus.includes("ProductDescription")) {
					const productIndex = parseInt(invoiceFormInputFocus.charAt(invoiceFormInputFocus.length - 1))
					invoicePayload.products[productIndex].description = word;
					setInvoicePayload({ ...invoicePayload })
				}
				else if (invoiceFormInputFocus.includes("ProductQuantity")) {
					const isValidProductQuantity = !isNaN(parseInt(word));
					if (isValidProductQuantity) {
						const productIndex = parseInt(invoiceFormInputFocus.charAt(invoiceFormInputFocus.length - 1))
						invoicePayload.products[productIndex].quantity = parseInt(word);
						setInvoicePayload({ ...invoicePayload })
					} else {
						setErrorToastMsg(`"${word}" isn't a valid number format`)
						setShowErrorToast(true)
					}
				}
				else if (invoiceFormInputFocus.includes("ProductPrice")) {
					const isValidProductPrice = !isNaN(parseInt(word));
					if (isValidProductPrice) {
						const productIndex = parseInt(invoiceFormInputFocus.charAt(invoiceFormInputFocus.length - 1))
						invoicePayload.products[productIndex].price = parseInt(word);
						setInvoicePayload({ ...invoicePayload })
					} else {
						setErrorToastMsg(`"${word}" isn't a valid number format`)
						setShowErrorToast(true)
					}
				}
			}
		}
	}

	const onErrorToastButtonClick = () => {
		setShowErrorToast(false);
	}

	const FocusAlert = () => {
		if (!isLoading && invoiceFormInputFocus && words.length) {
			if (invoiceFormInputFocus === "InvoiceNumber") {
				return <Alert variant="warning">Selecting value for Invoice Number!</Alert>
			}
			else if (invoiceFormInputFocus === "InvoiceDate") {
				return <Alert variant="warning">Selecting value for Invoice Date!</Alert>
			}
			else if (invoiceFormInputFocus === "DueDate") {
				return <Alert variant="warning">Selecting value for Due Date!</Alert>
			}
			else if (invoiceFormInputFocus.includes("ProductDescription")) {
				return <Alert variant="warning">{`Selecting value for Product Description (${parseInt(invoiceFormInputFocus.charAt(invoiceFormInputFocus.length - 1)) + 1})!`}</Alert>
			}
			else if (invoiceFormInputFocus.includes("ProductQuantity")) {
				return <Alert variant="warning">{`Selecting value for Product Quantity (${parseInt(invoiceFormInputFocus.charAt(invoiceFormInputFocus.length - 1)) + 1})!`}</Alert>
			}
			else if (invoiceFormInputFocus.includes("ProductPrice")) {
				return <Alert variant="warning">{`Selecting value for Product Price (${parseInt(invoiceFormInputFocus.charAt(invoiceFormInputFocus.length - 1)) + 1})!`}</Alert>
			}
			return;
		}
		return;
	}

	return (
		<>
			<Card>
				<Card.Header>SmartFill</Card.Header>
				<Card.Body>
					{isLoading && <div className='d-flex justify-content-center m-3'><Spinner animation="border" variant="primary" size="lg" /></div>}
					<FocusAlert />
					{!isLoading && words.map((elem, index) => {
						return (
							<Button key={index} style={{ margin: "4px" }} onClick={onWordButtonClick(elem.text)}>{elem.text}</Button>
						)
					})}
				</Card.Body>
			</Card>
			<ToastContainer className="p-3" position="top-end">
				<Toast
					onClose={onErrorToastButtonClick}
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
		</>
	)
}

export default SmartFillContainer