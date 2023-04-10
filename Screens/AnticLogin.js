/*


    const handleSubmit = () => {
        console.log(version);
        if (register) {
            // registro
            fetch(API_ENDPOINT_REGISTER, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation,
                    version
                })
            })
                .then(response => response.json())
                .then(JsonResponse => {
                    if (JsonResponse.status === 0) {
                        setSomeError(JsonResponse.message)
                        setShowError(true)
                        setTimeout(() => {
                            setShowError(false)
                        }, 3000);
                    } else if (JsonResponse.status === 2) {
                        alert('Sorry, tienes que actualizar la aplicación')
                    } else {
                        // Register Correcto
                        console.log(JsonResponse);
                        alert('correcto, ahora tiene que iniciar sesión')
                        setRegister(false)
                    }
                })
                .catch((err) => {
                    setSomeError("Servidor temporalmente Offline")
                    setShowError(true)
                    setTimeout(() => {
                        setShowError(false)
                    }, 3000);
                })
        } else {
            // login            
            fetch(API_ENDPOINT_LOGIN, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password,
                    email,
                    version
                })
            })
                .then(response => response.json())
                .then(JsonResponse => {
                    if (JsonResponse.status === 0) {
                        setSomeError(JsonResponse.message)
                        setShowError(true)
                        setTimeout(() => {
                            setShowError(false)
                        }, 3000);
                    } else if (JsonResponse.status === 2) {
                        console.log('wtf');
                        Dialog.show({
                            type: ALERT_TYPE.WARNING,
                            title: 'Warning',
                            textBody: 'Sorry\nActualización necesaria.\nHay nuevas cositas ricas listas para tí.\n(nuevos virus recién salidos del horno)\nApetece, verdad?\nDate prisa, hazte con todos!',
                            button: 'close',
                        })
                    } else {
                        // Login Correcto
                        console.log(JsonResponse);
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
    }

    const loginButtons = (x) => {
        let color = x === 'register' ? register ? 'darkorange' : 'white' : register ? 'white' : 'darkorange'
        return {
            color: color,
            fontSize: 16,
            fontWeight: 500,
            margin: 3
        }
    }

    return (
        <AlertNotificationRoot>
            <SafeAreaView style={{ backgroundColor: 'black', height: '100%', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 25, marginTop: '25%' }}>Welcome to <Text style={{ color: 'orange' }}>Suujigemu</Text></Text>
                <View style={{ flexDirection: 'row', borderTopColor: 'orange', borderTopWidth: 1, borderRadius: 8, padding: 5 }}>
                    <Pressable onPress={() => setRegister(!register)}>
                        <Text style={loginButtons("register")}>Register</Text>
                    </Pressable>
                    <Text style={{ marginLeft: 18 }}></Text>
                    <Pressable onPress={() => setRegister(!register)}>
                        <Text style={loginButtons("login")}>Login</Text>
                    </Pressable>
                </View>
                <View style={{ borderWidth: 1, borderColor: 'orange', borderRadius: 15, padding: '3%' }}>

                    {register ?
                        <>
                            <InputForm name={'Name'} type={'name'} value={name} setValue={setName} handlesubmit={handleSubmit} />
                            <InputForm name={'Email'} type={'email'} value={email} setValue={setEmail} handlesubmit={handleSubmit} />
                            <InputForm name={'Password'} type={'password'} value={password} setValue={setPassword} handlesubmit={handleSubmit} />
                            <InputForm name={'RepeatPassword'} type={'password'} value={password_confirmation} setValue={setPasswordConfirmation} handlesubmit={handleSubmit} />
                        </>
                        :
                        <>
                            <InputForm name={'Email'} type={'email'} value={email} setValue={setEmail} handlesubmit={handleSubmit} />
                            <InputForm name={'Password'} type={'password'} value={password} setValue={setPassword} handlesubmit={handleSubmit} />
                        </>
                    }

                </View>
                <Pressable style={{ backgroundColor: 'orange', padding: 12, borderRadius: 13, marginTop: 10 }} onPress={handleSubmit} >
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>{register ? 'Register' : 'Login'}</Text>
                </Pressable>
                {showError && <View style={{ padding: 5, borderColor: 'red', borderWidth: 1, borderRadius: 5, margin: 6 }}><Text style={{ color: 'white', fontWeight: '600' }}>{someError}</Text></View>}
            </SafeAreaView>
        </AlertNotificationRoot>
    )


*/