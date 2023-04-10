import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import grid2x2 from "../Media/2x2.png"
import grid3x3 from "../Media/3x3.png"
import grid4x4 from "../Media/4x4.png"
import grid5x5 from "../Media/5x5.png"
import backIcon from "../Media/back.png"
import infoIcon from "../Media/info.png"
import easyIcon from "../Media/easy.png"
import hardIcon from "../Media/hard.png"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { creadorAleatorioDeValores } from '../Funcionalidades/CreadorRandom'
import { setClasicPoints, setValues } from '../Redux/gameSlice'
import ClassicButton from '../Components/ClassicButton'
import { API_ENDPOINT_INCREMENT } from '../api'
import Board from '../Components/Board'
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification'
import Stepper from '../Components/Stepper'

const ClassicScreen = ({ route, navigation }) => {

    const dispatch = useDispatch()
    const player = useSelector(state => state.game.player)
    const [play, setPlay] = useState(false)
    const costs = [4, 90, 1600, 25000]
    const hardCosts = [4, 100, 2000, 30000]
    const rewards = [16, 180, 3000, 40000]
    const hardRewards = [16, 220, 4200, 65000]
    const [reward, setReward] = useState(0);
    const [mode, setMode] = useState(0)
    const modeIcon = [easyIcon, hardIcon]

    // Styles
    const spanStyle = { color: 'gray', fontSize: 16 }
    const backSize = 40
    const { boardSize } = route.params
    // END Styles

    const handleChangeMode = () => {
        setMode(prev => prev === 0 ? 1 : 0)
    }

    const handleClick = (x) => {
        if (player.clasic_mode_points < (mode === 0 ? costs[x - 2] : hardCosts[x - 2])) {
            if (x !== 2) {
                alert('No tienes suficientes puntos para entrar aquí aún\n\ntienes: ' + player.clasic_mode_points + '\nNecesitas: ' + (mode === 0 ? costs[x - 2] : hardCosts[x - 2]))
                return
            }
        }

        // Fetch per restar punts (pagar entrada)
        fetch(API_ENDPOINT_INCREMENT, {
            method: 'POST',
            headers: {
                'Content-Type': 'applicaton/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                android_id: player.android_id,
                reward: mode === 0 ? -costs[x - 2] : -hardCosts[x - 2]
            })
        })
            .then(response => response.json())
            .then(JsonResponse => {
                if (JsonResponse.status === 1) {
                    // Si servidor respon be, comença el joc
                    dispatch(setClasicPoints(JsonResponse.player.clasic_mode_points))   // Actualizem puntuació a redux
                    setReward(mode === 0 ? rewards[x - 2] : hardRewards[x - 2])         // Posem reward al valor que toca (per despres guanyar punts)
                    let creacionRandom;
                    if (mode === 0) {
                        // modo facil
                        creacionRandom = creadorAleatorioDeValores(x, 0, 45, false)    // Creem el tablero segons ens interesa
                    } else {
                        // modo dificil
                        creacionRandom = creadorAleatorioDeValores(x, -99, 99, true)    // Creem el tablero segons ens interesa
                    }
                    dispatch(setValues(creacionRandom))                                 // Posem a redux la creació del board que acabm de fer
                    setPlay(true)                                                       // Posem play = true per arrancar el joc (mostrar div)
                } else {
                    alert("Error de Servidor")
                }
            })
    }

    const handleBack = () => {
        if (play) {
            setPlay(false)
        } else {
            navigation.navigate('HomeScreen')
        }
    }

    const handleHide = () => {
        setPlay(false)
    }

    const handleWin = () => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Muy Bien!',
            textBody: "Vas Sobrao!",
            button: "ya lo sé",
            onHide: handleHide
        })
        fetch(API_ENDPOINT_INCREMENT, {
            method: 'POST',
            headers: {
                'Content-Type': 'applicaton/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                android_id: player.android_id,
                reward: reward
            })
        })
            .then(response => response.json())
            .then(JsonResponse => {
                if (JsonResponse.status === 1) {
                    dispatch(setClasicPoints(JsonResponse.player.clasic_mode_points))   // Actualizem puntuació a redux
                } else {
                    alert("Error grave de Servidor")
                }
            })
    }

    const handleInfo = () => {
        if (play) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: '¡INFORMACION!',
                textBody: "¿Como se juega?\nJugando\n¿Cual es el objetivo?\nGanar\n\nDicho esto:\nSelecciona uno de los objetivos (abajo) para ir seleccionando los operandos de arriba y conseguir la solución exacta.\nDebes usar todos los operandos para que se considere correcto\n\nRules:\nSiempre se empieza con un numero(-4+5 = error)\nNo se permiten dos simbolos seguidos (4*-3 = error)\n\nAyuda: \nEn rojo, abajo, en pequeño, se ven el resultado que se esta consiguiendo, si se considera error verás que es = 0.",
            })
        } else {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: '¡INFORMACION!',
                textBody: "Cada nivel tiene un precio y un premio.\nAl entrar -> pagas\nAl ganar->cobras.\nSi entras pero no terminas, pierdes lo invertido (te jodes)\n\nSi no tienes puntos o incluso si estas en negativo (por gilipollas) solo puedes entrar al 1er nivel y estarás, al inicio, aún más en negativo.",
            })
        }
    }

    return (
        <AlertNotificationRoot>
            <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
                <ScrollView>

                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: 'orange', fontWeight: 700, fontSize: 18 }}>Classic Mode</Text>
                        <Text style={{ color: 'white', fontWeight: 700, fontSize: 11 }}>{player.name}</Text>
                        <Pressable style={{ position: 'absolute', top: 6, left: 16 }} onPress={handleBack}>
                            <Image source={backIcon} style={{ width: backSize, height: backSize }} />
                        </Pressable>
                        <Pressable style={{ position: 'absolute', top: 6, left: '85%' }} onPress={handleInfo}>
                            <Image source={infoIcon} style={{ width: backSize, height: backSize }} />
                        </Pressable>
                        <Text style={{ color: 'white', marginBottom: 15 }}><Text style={spanStyle}>Points: </Text>{player.clasic_mode_points} <Text style={spanStyle}>World Position: </Text>{player.classicWorldPosition}</Text>
                        {play ? <Board size={boardSize} handleWin={handleWin} />
                            :
                            <View style={{ backgroundColor: 'white', width: boardSize, height: boardSize, justifyContent: 'center', alignItems: 'center' }}>
                                <Pressable style={{ position: 'absolute', top: 0, left: 5 }} onPress={handleChangeMode}>
                                    <Image source={modeIcon[mode]} style={{ width: 50, height: 50 }} />
                                </Pressable>
                                <View style={{ flexDirection: 'row' }}>
                                    <ClassicButton title={2} cost={mode === 0 ? costs[0] : hardCosts[0]} win={mode === 0 ? rewards[0] : hardRewards[0]} icon={grid2x2} color={'lightgreen'} handleclick={handleClick} boardSize={boardSize} />
                                    <ClassicButton title={3} cost={mode === 0 ? costs[1] : hardCosts[1]} win={mode === 0 ? rewards[1] : hardRewards[1]} icon={grid3x3} color={'lightblue'} handleclick={handleClick} boardSize={boardSize} />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <ClassicButton title={4} cost={mode === 0 ? costs[2] : hardCosts[2]} win={mode === 0 ? rewards[2] : hardRewards[2]} icon={grid4x4} color={'violet'} handleclick={handleClick} boardSize={boardSize} />
                                    <ClassicButton title={5} cost={mode === 0 ? costs[3] : hardCosts[3]} win={mode === 0 ? rewards[3] : hardRewards[3]} icon={grid5x5} color={'tomato'} handleclick={handleClick} boardSize={boardSize} />
                                </View>
                            </View>
                        }
                        <View style={{ backgroundColor: 'white', width: boardSize, justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                            <Stepper inputPunts={player.clasic_mode_points} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AlertNotificationRoot>
    )
}

export default ClassicScreen