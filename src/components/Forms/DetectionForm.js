import React, { useState } from 'react'
import { createWorker } from 'tesseract.js';
import { Button, Card, Form, Toast, ToastContainer } from 'react-bootstrap';

const DetectionForm = ({ setDataWords, isLoading, setIsLoading, setImageUrl }) => {
	const [payload, setPayload] = useState("")
	const [showErrorToast, setShowErrorToast] = useState(false)

	const onInputChange = (event) => {
		setPayload(event.target.value)
	}

	const onErrorToastButtonClick = () => {
		setShowErrorToast(false);
	}

	const onButtonSubmit = async (event) => {
		event.preventDefault();
		const worker = createWorker();
		try {
			setIsLoading(true)
			setDataWords([])
			setImageUrl("")
			await worker.load();
			await worker.loadLanguage('eng');
			await worker.initialize('eng');
			await worker.setParameters({
				tessjs_create_box: '1',
			});
			const res = await worker.recognize(payload);
			await worker.terminate();
			setDataWords(res.data.words)
			setImageUrl(payload)
		} catch (error) {
			setShowErrorToast(true)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Card>
				<Card.Header>
					Detection Form
				</Card.Header>
				<Card.Body>
					<Form>
						<Form.Group className="mb-3" controlId="imageUrlInput">
							<Form.Label>Image URL</Form.Label>
							<Form.Control type="text" placeholder="Enter Image URL" value={payload} onChange={onInputChange} disabled={isLoading} />
						</Form.Group>
						<Button variant="primary" onClick={onButtonSubmit} disabled={isLoading || payload === ""}>
							Detect Text
						</Button>
					</Form>
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
					<Toast.Body>Please try again later</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	)
}

export default DetectionForm