import React, { useState } from 'react'
import { createWorker } from 'tesseract.js';
import { Button, Card, Form } from 'react-bootstrap';

const DetectionForm = () => {
	const [payload, setPayload] = useState("")
	const [result, setResult] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const onInputChange = (event) => {
		setPayload(event.target.value)
	}

	const onButtonSubmit = async (event) => {
		event.preventDefault();
		const worker = createWorker({ logger: m => console.log(m) });
		try {
			setIsLoading(true)
			setResult("")
			await worker.load();
			await worker.loadLanguage('eng');
			await worker.initialize('eng');
			await worker.setParameters({
				tessjs_create_box: '1',
			});
			const res = await worker.recognize(payload);
			await worker.terminate();
			setResult(res)
			console.log({ res })
		} catch (error) {
			alert("Please try again later")
		} finally {
			setIsLoading(false)
		}
	}

	return (
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
					<Button variant="primary" onClick={onButtonSubmit} disabled={isLoading}>
						Detect Text
					</Button>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default DetectionForm