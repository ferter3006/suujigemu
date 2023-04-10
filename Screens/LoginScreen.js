import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import InputForm from '../Components/InputForm'
import { SafeAreaView } from 'react-native-safe-area-context'
import { API_ENDPOINT_ANDROID_LOGIN, API_ENDPOINT_ANDROID_REGISTER, API_ENDPOINT_LOGIN, API_ENDPOINT_REGISTER } from '../api'
import { setPlayer } from '../Redux/gameSlice'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { version } from '../package.json'
import DeviceInfo from 'react-native-device-info';

const LoginScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [someError, setSomeError] = useState('')
    const [showError, setShowError] = useState(false)
    const dispatch = useDispatch()
    const [cargando, setCargando] = useState(true)
    const [androidId, setAndroidId] = useState('')

    useEffect(() => {
        DeviceInfo.getAndroidId().then((androidId) => {
            setAndroidId(androidId)
            tiraFetch(androidId)
        });
    }, [])

    const tiraFetch = (androidId) => {
        fetch(API_ENDPOINT_ANDROID_LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version,
                androidId
            })
        })
            .then(response => response.json())
            .then(JsonResponse => {
                console.log(JsonResponse);
                if (JsonResponse.status === 0) {
                    setCargando(false)
                } else if (JsonResponse.status === 2) {
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Warning',
                        //textBody: 'Sorry\nActualización necesaria.\nHay nuevas cositas ricas listas para tí.\n(nuevos virus recién salidos del horno)\nApetece, verdad?\nDate prisa, hazte con todos!',
                        textBody: JsonResponse.message,
                        button: 'close',
                    })
                } else {
                    // Login Correcto                    
                    dispatch(setPlayer(JsonResponse.player))
                    navigation.navigate('HomeScreen')
                }
            })
            .catch((err) => {
                setSomeError("Servidor temporalmente Offline")
                setShowError(true)
                setTimeout(() => {
                    setShowError(false)
                }, 3000);
            })
    }

    const handleRegister = () => {

        if (name.length > 13) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'SuperCaliFragiLísticoError',
                textBody: 'Demasiadas letras\n(maximo 12)',
                button: 'close',
            })
            return
        } else if (name.length < 6) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'JonnyElMudoError',
                textBody: 'Demasiadas pocas letras\n(mínimo 6)',
                button: 'close',
            })
            return
        }
        
        fetch(API_ENDPOINT_ANDROID_REGISTER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version,
                androidId,
                name
            })
        })
            .then(response => response.json())
            .then(JsonResponse => {
                if (JsonResponse.status === 1) {
                    // Login Correcto
                    console.log(JsonResponse);
                    dispatch(setPlayer(JsonResponse.player))
                    navigation.navigate('HomeScreen')
                } else {
                    Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: JsonResponse.message,
                        button: 'close',
                    })
                }
            })
            .catch((err) => {
                setSomeError("Servidor temporalmente Offline")
                setShowError(true)
                setTimeout(() => {
                    setShowError(false)
                }, 3000);
            })
    }

    return (
        <AlertNotificationRoot>
            <SafeAreaView style={{ backgroundColor: 'black', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'orange', fontSize: 23, marginBottom: 8 }}>Suujigemu</Text>
                {cargando ?
                    <View>
                        <ActivityIndicator size="large" color="orange" />
                        <Text style={{ color: 'white' }}>cargando...</Text>
                    </View>
                    :
                    <View style={{ borderWidth: 1, borderColor: 'orange', borderRadius: 15, padding: '3%', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Introduce tu nombre de Guerra</Text>
                        <InputForm type={'name'} value={name} setValue={setName} />
                        <Pressable style={{ backgroundColor: 'orange', padding: 12, borderRadius: 13, marginTop: 10 }} onPress={handleRegister} >
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>Entrar</Text>
                        </Pressable>
                    </View>
                }
                {showError && <View style={{ padding: 5, borderColor: 'red', borderWidth: 1, borderRadius: 5, margin: 6 }}><Text style={{ color: 'white', fontWeight: '600' }}>{someError}</Text></View>}
            </SafeAreaView>
        </AlertNotificationRoot>
    )


}

export default LoginScreen