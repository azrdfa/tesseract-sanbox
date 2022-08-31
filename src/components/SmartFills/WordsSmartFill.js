import React from 'react'
import { Alert, Button, Card, Spinner } from 'react-bootstrap';

const WordsSmartFill = ({ words, isLoading, invoiceFormInputFocus }) => {

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
		<Card>
			<Card.Header>Words SmartFill</Card.Header>
			<Card.Body>
				{isLoading && <div className='d-flex justify-content-center m-3'><Spinner animation="border" variant="primary" size="lg" /></div>}
				<FocusAlert />
				{!isLoading && words.map(elem => {
					return (
						<Button style={{ margin: "4px" }}>{elem.text}</Button>
					)
				})}
			</Card.Body>
		</Card>
	)
}

export default WordsSmartFill