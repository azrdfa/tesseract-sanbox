import React, { useState } from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { DetectionForm, InvoiceForm, SmartFillContainer } from '../components'

const MainPage = () => {
  const [data, setData] = useState({
    words: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceFormInputFocus, setInvoiceFormInputFocus] = useState("");
  const [invoicePayload, setInvoicePayload] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    products: [{ description: "", quantity: 0, price: 0 }]
  })

  const setDataWords = (words) => {
    setData({ ...data, words })
  }

  return (
    <Container fluid>
      <br />
      <Row>
        <Col sm={12} md={6} lg={4}>
          <Stack gap={3}>
          <DetectionForm
              setDataWords={setDataWords}
              isLoading={isLoading}
              setIsLoading={setIsLoading} />
            <InvoiceForm
              setInvoiceFormInputFocus={setInvoiceFormInputFocus}
              invoicePayload={invoicePayload}
              setInvoicePayload={setInvoicePayload}
            />
          </Stack>
        </Col>
        <Col sm={12} md={6} lg={4}>
          <SmartFillContainer
            words={data.words}
            isLoading={isLoading}
            invoiceFormInputFocus={invoiceFormInputFocus}
            invoicePayload={invoicePayload}
            setInvoicePayload={setInvoicePayload}
          />
        </Col>
      </Row>
      <br />
    </Container>
  )
}

export default MainPage