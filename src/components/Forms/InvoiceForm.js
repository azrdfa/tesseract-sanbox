import React from 'react'
import { Card, Form, Stack, Button } from 'react-bootstrap';

const InvoiceForm = ({ setInvoiceFormInputFocus, invoicePayload, setInvoicePayload }) => {

  const onInvoiceNumberInputChange = (event) => {
    setInvoicePayload({ ...invoicePayload, invoiceNumber: event.target.value })
  }

  const onInputFocus = (inputName) => {
    return (event) => {
      setInvoiceFormInputFocus(inputName)
    }
  }

  const onInvoiceDateInputChange = (event) => {
    setInvoicePayload({ ...invoicePayload, invoiceDate: event.target.value })
  }

  const onDueDateInputChange = (event) => {
    setInvoicePayload({ ...invoicePayload, dueDate: event.target.value })
  }

  const onAddProductButtonClick = (event) => {
    event.preventDefault();
    setInvoicePayload({ ...invoicePayload, products: [...invoicePayload.products, { description: "", quantity: 0, price: 0 }] })
  }

  const onRemoveProductButtonClick = (index) => {
    return (event) => {
      event.preventDefault()
      setInvoicePayload({ ...invoicePayload, products: invoicePayload.products.filter((_elem, elemIndex) => index !== elemIndex) })
    }
  }

  const onProductDescriptionInputChange = (index) => {
    return (event) => {
      invoicePayload.products[index].description = event.target.value;
      setInvoicePayload({ ...invoicePayload })
    }
  }

  const onProductQuantityInputChange = (index) => {
    return (event) => {
      invoicePayload.products[index].quantity = event.target.value;
      setInvoicePayload({ ...invoicePayload })
    }
  }

  const onProductPriceInputChange = (index) => {
    return (event) => {
      invoicePayload.products[index].price = event.target.value;
      setInvoicePayload({ ...invoicePayload })
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
            <Form.Control
              type="text"
              placeholder='Enter Invoice Number'
              value={invoicePayload.invoiceNumber} onChange={onInvoiceNumberInputChange}
              onFocus={onInputFocus("InvoiceNumber")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="invoiceDateInput">
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control
              type="date"
              placeholder='Enter Invoice Date'
              value={invoicePayload.invoiceDate}
              onChange={onInvoiceDateInputChange}
              onFocus={onInputFocus("InvoiceDate")}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dueDateInput">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              placeholder='Enter Due Date'
              value={invoicePayload.dueDate}
              onChange={onDueDateInputChange}
              onFocus={onInputFocus("DueDate")}

            />
          </Form.Group>
          {invoicePayload.products.map((elem, index) => {
            return (
              <Stack key={index} className='mb-3' direction='horizontal' gap={1}>
                <Form.Group>
                  <Form.Label column="sm">Desc</Form.Label>
                  <Form.Control
                    value={elem.description}
                    onChange={onProductDescriptionInputChange(index)}
                    placeholder='...'
                    onFocus={onInputFocus(`ProductDescription${index}`)}

                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label column="sm">Quantity</Form.Label>
                  <Form.Control
                    value={elem.quantity}
                    type="number"
                    onChange={onProductQuantityInputChange(index)}
                    placeholder='...'
                    onFocus={onInputFocus(`ProductQuantity${index}`)}

                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label column="sm">Price</Form.Label>
                  <Form.Control
                    value={elem.price}
                    type="number"
                    onChange={onProductPriceInputChange(index)}
                    placeholder='...'
                    onFocus={onInputFocus(`ProductPrice${index}`)}

                  />
                </Form.Group>
                <Button
                  onClick={index === invoicePayload.products.length - 1 ? onAddProductButtonClick : onRemoveProductButtonClick(index)}
                  variant={index === invoicePayload.products.length - 1 ? "primary" : "danger"}
                  className='mt-auto'>
                  {index === invoicePayload.products.length - 1 ? "Add" : "Remove"}
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