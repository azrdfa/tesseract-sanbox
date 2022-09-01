import React, { useEffect, useRef, useMemo } from 'react'

const BoxesSmartFill = ({ ocrData, onSparseTextClick }) => {
	const canvasRef = useRef();
	const sparseTextRects = useMemo(() => {
		return ocrData.sparse_texts.map(elem => {
			return {
				x: elem.bbox.x0,
				y: elem.bbox.y0,
				w: elem.bbox.x1 - elem.bbox.x0,
				h: elem.bbox.y1 - elem.bbox.y0,
				text: elem.text
			}
		})
	}, [ocrData.sparse_texts])

	useEffect(() => {
		const canvas = canvasRef.current
		const context = canvas.getContext("2d")
		const img = new Image();
		img.src = ocrData.imageUrl

		function collides(rects, x, y) {
			var isCollision = false;
			var collisionText = "";
			for (var i = 0, len = rects.length; i < len; i++) {
				var left = rects[i].x, right = rects[i].x + rects[i].w;
				var top = rects[i].y, bottom = rects[i].y + rects[i].h;
				if (right >= x
					&& left <= x
					&& bottom >= y
					&& top <= y) {
					isCollision = rects[i];
					collisionText = rects[i].text;
				}
			}
			return [isCollision, collisionText];
		}

		function onCollisionClick(event) {
			var [rect, collisionText] = collides(sparseTextRects, event.offsetX, event.offsetY);
			if (rect) {
				onSparseTextClick(collisionText)
			}
		}

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			context.drawImage(img, 0, 0)
			sparseTextRects.forEach(elem => {
				context.strokeRect(elem.x, elem.y, elem.w, elem.h);
			})
		}

		canvas.addEventListener('click', onCollisionClick)
		return () => canvas.removeEventListener("click", onCollisionClick)
	}, [ocrData.imageUrl, onSparseTextClick, sparseTextRects])

	return (
		<canvas ref={canvasRef} style={{ border: "1px solid #d3d3d3", display: ocrData.imageUrl ? "block" : "none" }} />
	)
}

export default BoxesSmartFill