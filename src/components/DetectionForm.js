import React, { useState } from 'react'
import { createWorker, PSM } from 'tesseract.js';
import { Button, Card, Form } from 'react-bootstrap';

const DetectionForm = ({ setOcrData, isLoadingOcrData, setIsLoadingOcrData, setShowErrorToast, setErrorToastMsg }) => {
	const [payload, setPayload] = useState("")

	const onInputChange = (event) => {
		setPayload(event.target.value)
	}

	const onButtonSubmit = async (event) => {
		event.preventDefault();
		const worker = createWorker({ logger: m => console.log(m) });
		try {
			setIsLoadingOcrData(true)
			setOcrData({
				sparse_texts: [],
				segmentations: [],
				imageUrl: ""
			})
			await worker.load();
			await worker.loadLanguage('eng+ind');
			await worker.initialize('eng+ind');
			await worker.setParameters({
				tessedit_pageseg_mode: PSM.SPARSE_TEXT_OSD,
			});
			const res = await worker.recognize(payload);
			await worker.terminate();
			console.log({ res })
			setOcrData({
				sparse_texts: res.data.blocks,
				segmentations: [],
				imageUrl: payload
			})
		} catch (error) {
			setErrorToastMsg("Please try again later")
			setShowErrorToast(true)
		} finally {
			setIsLoadingOcrData(false)
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
						<Form.Control type="text" placeholder="Enter Image URL" value={payload} onChange={onInputChange} disabled={isLoadingOcrData} />
					</Form.Group>
					<Button variant="primary" onClick={onButtonSubmit} disabled={isLoadingOcrData || payload === ""}>
						Detect Text
					</Button>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default DetectionForm