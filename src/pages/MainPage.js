import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { DetectionForm, InvoiceForm } from '../components'

const MainPage = () => {
  return (
    <Container fluid>
      <br />
      <Row>
        <Col md={5}>
          <Stack gap={3}>
            <DetectionForm />
            <InvoiceForm />
          </Stack>
        </Col>
      </Row>
      <br />
    </Container>
  )
}

export default MainPage