import React, { useState } from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { DetectionForm, InvoiceForm, SmartFillContainer, ErrorToast } from '../components'

const MainPage = () => {
  // DetectionForm as setter others as getter
  const [ocrData, setOcrData] = useState({
    sparse_texts: [],
    segmentations: [],
    imageUrl: ""
  })
  const [isLoadingOcrData, setIsLoadingOcrData] = useState(false)

  // InvoiceForm as setter others as getter
  const [invoicePayload, setInvoicePayload] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    products: [{ description: "", quantity: 0, price: 0 }]
  })
  const [selectedInvoiceInput, setSelectedInvoiceInput] = useState("");

  // ErrorToast as getter others as setter
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMsg, setErrorToastMsg] = useState("")

  return (
    <Container fluid>
      <Row>
        <Col md={12} lg={3} className='mt-3'>
          <Stack gap={3}>
            <DetectionForm
              setOcrData={setOcrData}
              isLoadingOcrData={isLoadingOcrData}
              setIsLoadingOcrData={setIsLoadingOcrData}
              setShowErrorToast={setShowErrorToast}
              setErrorToastMsg={setErrorToastMsg}
            />
            <InvoiceForm
              invoicePayload={invoicePayload}
              setInvoicePayload={setInvoicePayload}
              setSelectedInvoiceInput={setSelectedInvoiceInput}
            />
          </Stack>
        </Col>
        <Col md={12} lg={9} className='mt-3'>
          <SmartFillContainer
            ocrData={ocrData}
            isLoadingOcrData={isLoadingOcrData}
            invoicePayload={invoicePayload}
            setInvoicePayload={setInvoicePayload}
            selectedInvoiceInput={selectedInvoiceInput}
            setShowErrorToast={setShowErrorToast}
            setErrorToastMsg={setErrorToastMsg}
          />
        </Col>
      </Row>
      <ErrorToast
        showErrorToast={showErrorToast}
        setShowErrorToast={setShowErrorToast}
        errorToastMsg={errorToastMsg}
      />
    </Container>
  )
}

export default MainPage