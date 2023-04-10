import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from "react-redux"
import clasicLogo from "../Media/classic.png"
import carreraLogo from "../Media/carrera.png"
import rankingLogo from "../Media/ranking.png"
import arrowLeft from "../Media/arrow_left_orange.png"
import arrowRight from "../Media/arrow_right_orange.png"
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = ({ navigation }) => {

    const game = useSelector(state => state.game)
    const register = true
    const arrowSize = 60
    const [selected, setSelected] = useState(0)
    const modes = [
        {
            title: "Modo Clásico",
            png: clasicLogo,
            screen: 'ClassicScreen'
        },
        {
            title: "Ranking Clásico",
            png: rankingLogo,
            screen: 'RankingClassic'
        },
        {
            title: "Modo Carrera",
            png: carreraLogo,
            screen: 'CarreraScreen'
        }
    ]

    const handleClick = (x) => {
        let temp = selected
        temp = temp + x
        if (temp > modes.length - 1) {
            temp = 0;
        } else if (temp < 0) {
            temp = modes.length - 1
        }
        setSelected(temp)
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'black', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
            <View style={{ alignContent: 'center', alignItems: 'center', top: -35 }}>
                <Text style={{ color: 'white', fontSize: 23 }}><Text style={{ color: 'orange' }}>Suujigemu</Text></Text>
                <Text style={{ color: 'white', fontWeight: 700, fontSize: 11, marginBottom: 5 }}>{game.player.name}</Text>
                <View style={{ margin: 2, flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable onPress={() => handleClick(-1)}>
                        <Image source={arrowLeft} style={{ width: arrowSize, height: arrowSize }} />
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate(modes[selected].screen)} >
                        <View className='col' style={{ backgroundColor: 'white', color: 'white', borderColor: 'orange', borderWidth: 3, padding: 15, borderRadius: 15, alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>{modes[selected].title}</Text>
                            <Image source={modes[selected].png} style={{ width: 100, height: 100, margin: 12 }} />
                        </View>
                    </Pressable>
                    <Pressable onPress={() => handleClick(+1)}>
                        <Image source={arrowRight} style={{ width: arrowSize, height: arrowSize }} />
                    </Pressable>
                </View>                
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen