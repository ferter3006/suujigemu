import { View, Text, Button, Pressable, Image, ScrollView } from 'react-native'
import backIcon from "../Media/back.png"
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EfectoEscritura from '../Funcionalidades/EfectoEscritura'
import { useSelector } from 'react-redux'
import { API_ENDPOINT_CLASSICRANK } from '../api'
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification'

const RankingClassic = ({ route, navigation }) => {

    const player = useSelector(state => state.game.player)
    const { boardSize } = route.params
    const backSize = 40
    const spanStyle = { color: 'gray', fontSize: 16 }
    const [allplayers, setAllPlayers] = useState()

    const handleBack = () => {
        navigation.navigate('HomeScreen')
    }

    useEffect(() => {
        fetch(API_ENDPOINT_CLASSICRANK, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(JsonResponse => {
                if (JsonResponse.status === 1) {
                    setAllPlayers(JsonResponse.players)
                    console.log(JsonResponse.players);
                } else {
                    Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: 'Error de servidor, disculpe las molestias',
                        button: 'close',
                    })
                }
            })
    }, [])

    return (
        <AlertNotificationRoot>
            <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: 'orange', fontWeight: 700, fontSize: 18 }}>Ranking</Text>
                    <Text style={{ color: 'white', marginBottom: 15 }}>Clasificacion General</Text>
                    <Pressable style={{ position: 'absolute', top: 6, left: 16 }} onPress={handleBack}>
                        <Image source={backIcon} style={{ width: backSize, height: backSize }} />
                    </Pressable>
                    <View style={{ backgroundColor: 'white', width: boardSize, height: boardSize, justifyContent: 'center', alignItems: 'center' }}>
                        <ScrollView>
                            <Text style={{marginTop:15, marginBottom: 25, fontSize: 26}}>Clasificación</Text>
                            {allplayers &&
                                allplayers.map((clasplayer, index) => (
                                    <Text key={index}
                                        style={{ fontWeight: clasplayer.name === player.name ? 800 : 300 }}
                                    >{index + 1} - {clasplayer.name} - {clasplayer.clasic_mode_points} points</Text>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </AlertNotificationRoot>
    )
}

export default RankingClassic