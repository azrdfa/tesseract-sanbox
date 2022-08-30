import React, { useState } from 'react'
import { Card, Form, Stack, Button } from 'react-bootstrap';

const InvoiceForm = () => {

  const [payload, setPayload] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    products: [{ description: "", quantity: 0, price: 0 }]
  })

  const onInvoiceNumberInputChange = (event) => {
    setPayload({ ...payload, invoiceNumber: event.target.value })
  }

  const onInvoiceDateInputChange = (event) => {
    setPayload({ ...payload, invoiceDate: event.target.value })
  }

  const onDueDateInputChange = (event) => {
    setPayload({ ...payload, dueDate: event.target.value })
  }

  const onAddProductButtonClick = (event) => {
    event.preventDefault();
    setPayload({ ...payload, products: [...payload.products, { description: "", quantity: 0, price: 0 }] })
  }

  const onRemoveProductButtonClick = (index) => {
    return (event) => {
      event.preventDefault()
      setPayload({...payload, products: payload.products.filter((_elem, elemIndex) => index !== elemIndex)})
    }
  }

  const onProductDescriptionInputChange = (index) => {
    return (event) => {
      payload.products[index].description = event.target.value;
      setPayload({...payload})
    }
  }

  const onProductQuantityInputChange = (index) => {
    return (event) => {
      payload.products[index].quantity = event.target.value;
      setPayload({...payload})
    }
  }

  const onProductPriceInputChange = (index) => {
    return (event) => {
      payload.products[index].price = event.target.value;
      setPayload({...payload})
    }
  }

  return (
    <Card>
      <Card.Header>
        Invoice Form
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="invoiceNumberInput">
            <Form.Label>Invoice Number</Form.Label>
            <Form.Control type="text" placeholder='Enter Invoice Number' value={payload.invoiceNumber} onChange={onInvoiceNumberInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="invoiceDateInput">
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control type="date" placeholder='Enter Invoice Date' value={payload.invoiceDate} onChange={onInvoiceDateInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dueDateInput">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" placeholder='Enter Due Date' value={payload.dueDate} onChange={onDueDateInputChange} />
          </Form.Group>
          {payload.products.map((elem, index) => {
            return (
              <Stack key={index} className='mb-3' direction='horizontal' gap={1}>
                <Form.Group>
                  <Form.Label column="sm">Desc</Form.Label>
                  <Form.Control value={elem.description} onChange={onProductDescriptionInputChange(index)} placeholder='...' />
                </Form.Group>
                <Form.Group>
                  <Form.Label column="sm">Quantity</Form.Label>
                  <Form.Control value={elem.quantity} onChange={onProductQuantityInputChange(index)} placeholder='...' />
                </Form.Group>
                <Form.Group>
                  <Form.Label column="sm">Price</Form.Label>
                  <Form.Control value={elem.price} onChange={onProductPriceInputChange(index)} placeholder='...' />
                </Form.Group>
                <Button
                  onClick={index === payload.products.length - 1 ? onAddProductButtonClick : onRemoveProductButtonClick(index)}
                  variant={index === payload.products.length - 1 ? "primary" : "danger"}
                  className='mt-auto'>
                  {index === payload.products.length - 1 ? "Add" : "Remove"}
                </Button>
              </Stack>
            )
          })}
        </Form>
      </Card.Body>
    </Card >
  )
}

export default InvoiceForm 