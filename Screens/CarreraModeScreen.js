import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import Board from '../Components/Board'
import { creadorAleatorioDeValores } from '../Funcionalidades/CreadorRandom'
import { setValues } from '../Redux/gameSlice'
import backIcon from "../Media/back.png"
import { SafeAreaView } from 'react-native-safe-area-context'
import EfectoEscritura from '../Funcionalidades/EfectoEscritura'

const CarreraModeScreen = ({ route, navigation }) => {

    const { boardSize } = route.params
    const dispatch = useDispatch()
    const player = useSelector(state => state.game.player)
    const [play, setPlay] = useState(false)
    const backSize = 40
    
    const spanStyle = { color: 'gray', fontSize: 16 }

    const handleBack = () => {
        navigation.navigate('HomeScreen')
    }

    const handleClick = (x) => {
        console.log(player.modo_carrera_level);
        let creacionRandom = creadorAleatorioDeValores(4, player.modo_carrera_level - 2, player.modo_carrera_level - 1, false, true)
        dispatch(setValues(creacionRandom))
        setPlay(true)
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'black', height: play ? '' : '100%' }}>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: 'orange', fontWeight: 700, fontSize: 18 }}>Modo Carrera</Text>
                <Pressable style={{ position: 'absolute', top: 6, left: 16 }} onPress={handleBack}>
                    <Image source={backIcon} style={{ width: backSize, height: backSize }} />
                </Pressable>               
                <Text style={{ color: 'white', marginBottom: 15 }}><Text style={spanStyle}>Level: </Text>{player.modo_carrera_level}</Text>
                {play ? <Board size={boardSize} />
                    :
                    <View style={{ backgroundColor: 'white', width: boardSize, height: boardSize, justifyContent: 'center', alignItems: 'center' }}>
                        <View className="row mt-2">
                            {/* <ClasicButton title={'Limited'} icon={grid2x2} color={'lightgreen'} handleclick={handleClick} /> */}
                            {/* <ClasicButton title={'Unlimited'} icon={grid3x3} color={'lightblue'} handleclick={handleClick} /> */}

                            <Text style={{ fontSize: 15, fontWeight: 500 }}><EfectoEscritura text={["Próximamente", "Estamos trabajando en ello", "Dentro de poco", "Desarrollando", "En un futuro cercano", "Seguimos picando código", "En unos días", "En brebe", "En seguida", "3 Tazas de café i nos ponemos", "Ya estamos casi", "Escribiendo funciones", "Creando algoritmos", "Implementando base de datos", "Pensando sistema de puntuación"]} /></Text>

                        </View>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}



export default CarreraModeScreen