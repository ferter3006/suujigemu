import React, { useState } from 'react'

function EfectoEscritura({ text, delay = 100, cursor = true }) {

    const [index, setIndex] = useState(0)
    const [word, setWord] = useState(0)
    const [numWords, setNumWords] = useState(text.length)
    const [back, setBack] = useState(false)
    const [showThis, setShowThis] = useState('')
    const [cursorTick, setCursor] = useState(true)

    useInterval(() => {
        if (word > numWords - 1) { return setWord(0) }

        const lengthActualText = text[word].length

        setShowThis(text[word].slice(0, index))
        if (!back) {
            if (index < lengthActualText) { setIndex(index + 1) }
            else if (index === lengthActualText) { setBack(true) }
        } else {
            if (index > 0) { setIndex(index - 1) }
            else {
                setIndex(0)
                setBack(false)
                setWord(word + 1)
            }
        }
    }, delay)

    useInterval(() => {
        setCursor(!cursorTick)
    }, 500)

    return (
        <>
            {showThis}{cursor ? cursorTick ? '|' : null : null}
        </>
    )
}


/// UseInterval

function useInterval(callback, delay) {

    const intervalRef = React.useRef(null);
    const savedCallback = React.useRef(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        const tick = () => savedCallback.current();
        if (typeof delay === 'number') {
            intervalRef.current = window.setInterval(tick, delay);
            return () => window.clearInterval(intervalRef.current);
        }
    }, [delay]);

    return intervalRef;
}

export default EfectoEscritura