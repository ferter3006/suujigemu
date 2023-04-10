import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import StepIndicator from 'react-native-step-indicator';

const Stepper = ({ inputPunts }) => {

    const animales = ["Ameba", "Paramecio", "Euglena", "Planaria", "Hidra", "Esponja", "Medusa", "Anémona de mar", "Estrella de mar", "Caracol", "Ameba gigante", "Gusanos de seda", "Araña del agua", "Ostra", "Erizo de mar", "Langosta", "Abeja", "Hormiga", "Pulpo", "Escarabajo rinoceronte", "Cangrejo ermitaño", "Caracol de jardin", "Langostino", "Cangrejo"]
    const puntos = [0, 33, 50, 100, 250, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7500, 9000, 15000, 25000, 50000, 100000, 250000, 500000, 1000000, 1500000, 2000000, 3000000]
    const [labels, setLabels] = useState(["Tontín del pueblo", "Mayordomo"]);
    const [position, setPosition] = useState(0)
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 3,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#7eaec4',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#7eaec4',
        stepStrokeUnFinishedColor: '#dedede',
        separatorFinishedColor: '#7eaec4',
        separatorUnFinishedColor: '#dedede',
        stepIndicatorFinishedColor: '#7eaec4',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 0,
        currentStepIndicatorLabelFontSize: 0,
        stepIndicatorLabelCurrentColor: 'transparent',
        stepIndicatorLabelFinishedColor: 'transparent',
        stepIndicatorLabelUnFinishedColor: 'transparent',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#7eaec4',
    }

    useEffect(() => {

        let first = -1
        let index = 0
        while (first === -1) {
            if (puntos[index] > inputPunts) {         
                first = index
            } else {
                index++
            }
        }
        
        let step = (inputPunts - puntos[index - 1]) / (puntos[index] - puntos[index - 1])
        step = step === 0 ? 0.01 : step        

        setPosition(step)
        setLabels([animales[index - 1], animales[index]])

    }, [inputPunts])

    return (
        <View style={{ width: '100%', backgroundColor: 'white', marginTop: 15 }}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={position}
                labels={labels}
                stepCount={2}
            />
        </View>
    )
}


export default Stepper