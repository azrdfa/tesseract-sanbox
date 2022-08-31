import React from 'react'
import { Button } from 'react-bootstrap';


const WordsSmartFill = ({ words, onWordButtonClick }) => {
    return (
        <>
            {words.map((elem, index) => {
                return (
                    <Button key={index} style={{ margin: "4px" }} onClick={onWordButtonClick(elem.text)}>{elem.text}</Button>
                )
            })}
        </>
    )
}

export default WordsSmartFill