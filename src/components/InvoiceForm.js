import React from 'react'
import { Card, Form, Stack, Button } from 'react-bootstrap';

const InvoiceForm = ({ invoicePayload, setInvoicePayload, setSelectedInvoiceInput }) => {

  const onInputChange = (inputName) => {
    return (event) => {
      switch (inputName) {
        case "invoiceNumber":
          setInvoicePayload({ ...invoicePayload, invoiceNumber: event.target.value })
          break;
        case "invoiceDate":
          setInvoicePayload({ ...invoicePayload, invoiceDate: event.target.value })
          break;
        case "dueDate":
          setInvoicePayload({ ...invoicePayload, dueDate: event.target.value })
          break;
        case (inputName.includes("productDescription")): {
          const index = parseInt(inputName.charAt(inputName.length - 1))
          invoicePayload.products[index].description = event.target.value;
          setInvoicePayload({ ...invoicePayload })
          break;
        }
        case (inputName.includes("productQuantity")): {
          const index = parseInt(inputName.charAt(inputName.length - 1))
          invoicePayload.products[index].quantity = event.target.value;
          setInvoicePayload({ ...invoicePayload })
          break;
        }
        case (inputName.includes("productPrice")): {
          const index = parseInt(inputName.charAt(inputName.length - 1))
          invoicePayload.products[index].price = event.target.value;
          setInvoicePayload({ ...invoicePayload })
          break;
        }
        default:
          break;
      }
    }
  }

  const onInputFocus = (inputName) => {
    return () => {
      setSelectedInvoiceInput(inputName)
    }
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
              value={invoicePayload.invoiceNumber}
              onChange={onInputChange("invoiceNumber")}
              onFocus={onInputFocus("invoiceNumber")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="invoiceDateInput">
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control
              type="date"
              placeholder='Enter Invoice Date'
              value={invoicePayload.invoiceDate}
              onChange={onInputChange("invoiceDate")}
              onFocus={onInputFocus("invoiceDate")}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dueDateInput">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              placeholder='Enter Due Date'
              value={invoicePayload.dueDate}
              onChange={onInputChange("dueDate")}
              onFocus={onInputFocus("dueDate")}

            />
          </Form.Group>
          {invoicePayload.products.map((elem, index) => {
            return (
              <Stack key={index} className='mb-3' direction='horizontal' gap={1}>
                <Form.Group>
                  <Form.Label column="sm">Desc</Form.Label>
                  <Form.Control
                    placeholder='...'
                    value={elem.description}
                    onChange={onInputChange(`productDescription${index}`)}
                    onFocus={onInputFocus(`productDescription${index}`)}

                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label column="sm">Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder='...'
                    value={elem.quantity}

                    onChange={onInputChange(`productQuantity${index}`)}
                    onFocus={onInputFocus(`productQuantity${index}`)}

                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label column="sm">Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder='...'
                    value={elem.price}
                    onChange={onInputChange(`productPrice${index}`)}
                    onFocus={onInputFocus(`productPrice${index}`)}

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