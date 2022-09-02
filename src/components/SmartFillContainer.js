import React, { useMemo } from 'react'
import { Alert, Card, Spinner } from 'react-bootstrap';
import moment from 'moment'
import BoxesSmartFill from './BoxesSmartFill';

const SmartFillContainer = ({ ocrData, isLoadingOcrData, invoicePayload, setInvoicePayload, selectedInvoiceInput, setShowErrorToast, setErrorToastMsg }) => {
	const isOcrDataAvailable = useMemo(() => {
		return Boolean(ocrData.sparse_texts.length && ocrData.imageUrl)
	}, [ocrData])

	const onSparseTextClick = (sparseText) => {
		if (selectedInvoiceInput === "invoiceNumber") {
			setInvoicePayload({ ...invoicePayload, invoiceNumber: sparseText })
		}
		else if (selectedInvoiceInput === "invoiceDate") {
			const isValidInvoiceDate = moment(sparseText).isValid();
			if (isValidInvoiceDate) {
				const invoiceDate = moment(sparseText).format("YYYY-MM-DD")
				setInvoicePayload({ ...invoicePayload, invoiceDate: invoiceDate })
			} else {
				setErrorToastMsg(`"${sparseText}" isn't a valid date format`)
				setShowErrorToast(true)
			}
		}
		else if (selectedInvoiceInput === "dueDate") {
			const isValidDueDate = moment(sparseText).isValid();
			if (isValidDueDate) {
				const dueDate = moment(sparseText).format("YYYY-MM-DD")
				setInvoicePayload({ ...invoicePayload, dueDate: dueDate })
			} else {
				setErrorToastMsg(`"${sparseText}" isn't a valid date format`)
				setShowErrorToast(true)
			}
		}
		else if (selectedInvoiceInput.includes("productDescription")) {
			const productIndex = parseInt(selectedInvoiceInput.charAt(selectedInvoiceInput.length - 1))
			invoicePayload.products[productIndex].description = sparseText;
			setInvoicePayload({ ...invoicePayload })
		}
		else if (selectedInvoiceInput.includes("productQuantity")) {
			const isValidProductQuantity = !isNaN(parseInt(sparseText));
			if (isValidProductQuantity) {
				const productIndex = parseInt(selectedInvoiceInput.charAt(selectedInvoiceInput.length - 1))
				invoicePayload.products[productIndex].quantity = parseInt(sparseText);
				setInvoicePayload({ ...invoicePayload })
			} else {
				setErrorToastMsg(`"${sparseText}" isn't a valid number format`)
				setShowErrorToast(true)
			}
		}
		else if (selectedInvoiceInput.includes("productPrice")) {
			const isValidProductPrice = !isNaN(parseFloat(sparseText.replace(',', '.')));
			if (isValidProductPrice) {
				const productIndex = parseInt(selectedInvoiceInput.charAt(selectedInvoiceInput.length - 1))
				invoicePayload.products[productIndex].price = parseFloat(sparseText.replace(',', '.'));
				setInvoicePayload({ ...invoicePayload })
			} else {
				setErrorToastMsg(`"${sparseText}" isn't a valid number format`)
				setShowErrorToast(true)
			}
		}
	}

	const FocusAlert = () => {
		if (!isLoadingOcrData && selectedInvoiceInput && ocrData.sparse_texts.length) {
			if (selectedInvoiceInput === "invoiceNumber") {
				return <Alert variant="warning">Selecting value for Invoice Number!</Alert>
			}
			else if (selectedInvoiceInput === "invoiceDate") {
				return <Alert variant="warning">Selecting value for Invoice Date!</Alert>
			}
			else if (selectedInvoiceInput === "dueDate") {
				return <Alert variant="warning">Selecting value for Due Date!</Alert>
			}
			else if (selectedInvoiceInput.includes("productDescription")) {
				return <Alert variant="warning">{`Selecting value for Product Description (${parseInt(selectedInvoiceInput.charAt(selectedInvoiceInput.length - 1)) + 1})!`}</Alert>
			}
			else if (selectedInvoiceInput.includes("productQuantity")) {
				return <Alert variant="warning">{`Selecting value for Product Quantity (${parseInt(selectedInvoiceInput.charAt(selectedInvoiceInput.length - 1)) + 1})!`}</Alert>
			}
			else if (selectedInvoiceInput.includes("productPrice")) {
				return <Alert variant="warning">{`Selecting value for Product Price (${parseInt(selectedInvoiceInput.charAt(selectedInvoiceInput.length - 1)) + 1})!`}</Alert>
			}
			return;
		}
		return;
	}

	return (
		<Card>
			<Card.Header>SmartFill</Card.Header>
			<Card.Body>
				{isLoadingOcrData && <div className='d-flex justify-content-center m-3'><Spinner animation="border" variant="primary" size="lg" /></div>}
				<FocusAlert />
				{(!isLoadingOcrData && isOcrDataAvailable) && <BoxesSmartFill ocrData={ocrData} onSparseTextClick={onSparseTextClick} />}
			</Card.Body>
		</Card>
	)
}

export default SmartFillContainer