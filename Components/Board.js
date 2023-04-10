import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { colorInicial, colors } from './Config/Colors'
import cuadroPNG from '../Media/frame.png'
import squarePNG from '../Media/square.png'
import { convertirCadena } from '../Funcionalidades/ConvertirCadena'

const Board = ({ size, handleWin, navigation }) => {

    const values = useSelector(state => state.game.values)
    const dimension = values.dimension

    const squareSize = (size / dimension)
    const arrayBuid = [...Array(dimension)]                 // pel map() dins del render
    const operandsJunts = values.operandsShuffled            // tots en un array per mostrar facil ( i remenats)
    const [operandColors, setOperandColors] = useState([])  // useeffect omple aixo al montar comp
    const [operandOwners, setOperandOwners] = useState({})  // useeffect omple aixo. Un array per cada result
    const [operandResults, setOperandResults] = useState([])// results actuals segons seleccionats
    const [selected, setSelected] = useState(0)             // al render hi ha un onclick={()=>setSelected(*)}   

    useEffect(() => {
        // segons dimensió => creem tants operands com toca (dimensio al cuadrat)        
        for (let index = 0; index < Math.pow(dimension, 2); index++) {
            setOperandColors(prev => [...prev, colorInicial])
        }

        // Creem un objeto dinamic amb {0: [], 1: [] ...} per cada result
        let helper = {}
        for (let index = 0; index < values.results.length; index++) {
            helper = { ...helper, [index]: [] }
        }
        setOperandOwners(helper)

        // Creem array amb tants zeros com results
        let tempArray = []
        for (let i = 0; i < values.results.length; i++) {
            tempArray.push(0)
        }
        setOperandResults(tempArray)
    }, [dimension])


    // Cambia color square operand segons selector actiu (si ja te owner => será neutre)    
    const changeColor = (x) => {
        let result = operandColors.map((c, i) => {
            if (x === i) {
                if (c === colorInicial) {
                    return colors[selected]
                } else {
                    return colorInicial
                }
            } else {
                return c
            }
        })
        setOperandColors(result)
    }

    // Cambia owner. Si ja te, primer pasará a ser de ningu (por que me da la gana)
    const changeOwner = (x) => {
        let encontrado = false;
        Object.keys(operandOwners).forEach(selector => {
            if (operandOwners[selector].includes(x)) {
                setOperandOwners({
                    ...operandOwners,
                    [selector]: [...operandOwners[selector].filter(function (item) {
                        return item !== x
                    })]
                })
                encontrado = true
            }
        });

        // si no s'ha trobat, no era de ningu, per tant ara pertany a [selected]
        if (!encontrado) {
            setOperandOwners({
                ...operandOwners,
                [selected]: [...operandOwners[selected], x]
            })
        }
    }

    // Volem cacular els resultats
    useEffect(() => {
        let cadenaString;
        let tempArray = [];
        Object.keys(operandOwners).forEach(element => {
            cadenaString = ''
            for (let i = 0; i < operandOwners[element].length; i++) {
                cadenaString = cadenaString + operandsJunts[operandOwners[element][i]]
            }
            tempArray.push(convertirCadena(cadenaString))
        });
        setOperandResults(tempArray)
    }, [operandOwners])

    const calculafinal = () => {
        // Si no hi ha results tornem false pk si no pot haber errors
        let completed = operandResults.length > 0 && true;
        // comprobem si tots els operands tenen el result correcte
        operandResults.forEach((element, i) => {
            if (element !== values.results[i]) {
                completed = false
            }
        });
        // comprobem si s'han fer servir tots els operands
        operandColors.forEach((element, i) => {
            if (element == "white") {
                completed = false
            }
        })
        return completed
    }

    useEffect(() => {
        setTimeout(() => {
            if (calculafinal()) {
                handleWin()
            }
        }, 100);
    }, [operandResults])

    // Click a un operand
    const handleClickOperand = (x) => {
        changeColor(x)
        changeOwner(x)
    }

    // Style

    const getNumeritosStyle = (a, b) => ({
        position: 'relative',
        top: -25,
        fontWeight: 700,
        color: a === b ? 'green' : 'red'
    });

    return (
        <View style={{ backgroundColor: 'black' }}>
            {arrayBuid.map((cosa, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                    {arrayBuid.map((cosa, index2) => (
                        <Pressable key={index2} onPress={() => handleClickOperand((index * dimension) + index2)}>
                            <View style={{
                                justifyContent: 'center', alignItems: 'center',
                                backgroundColor: operandColors[(index * dimension) + index2],
                                width: squareSize, height: squareSize, borderWidth: 5, borderColor: 'white'
                            }}
                                onClick={() => handleClickOperand((index * dimension) + index2)}>
                                <ImageBackground source={squarePNG} resizeMode="cover" style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }} >
                                    <Text style={{ fontSize: 23, fontWeight: 700, color: 'black' }}>{operandsJunts[(index * dimension) + index2]}</Text>
                                </ImageBackground>
                            </View>
                        </Pressable>
                    ))}
                </View>
            ))}
            <Text style={{ color: 'orange', marginTop: 2, fontWeight: '700' }}>Objectives:</Text>
            <View style={{ flexDirection: 'row' }}>
                {values.results.map((cosa, index) => (
                    <View key={"a" + index}>
                        <View key={"b" + index} style={{ flexDirection: 'row' }}>
                            <Pressable onPress={() => setSelected(index)}>
                                <View key={index} style={{ backgroundColor: colors[index], width: squareSize, height: squareSize, borderWidth: selected === index ? 1 : 25 }} >
                                    <ImageBackground source={cuadroPNG} resizeMode="cover" style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }} >
                                        <Text style={{ fontWeight: 800, color: values.results[index] === operandResults[index] ? 'green' : 'red' }}>{cosa}</Text>
                                    </ImageBackground>
                                </View>
                            </Pressable>
                        </View>
                        <View key={"c" + index} style={{ alignItems: 'center' }}>
                            <Text style={getNumeritosStyle(values.results[index], operandResults[index])}>{operandOwners[index] && operandOwners[index].map((cosa, index) => (
                                operandsJunts[cosa]
                            ))} = {operandResults[index]}</Text>
                        </View>
                    </View>
                ))}

            </View>
        </View>
    )
}

export default Board