import { View, Text, TextInput } from 'react-native'
import React from 'react'

function InputForm({ name, value, setValue, handlesubmit, type }) {

    const keyboardType = type === 'email' ? 'email-address' : 'default'

    return (
        <View style={{ margin: '1%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} >
            <Text style={{ color: 'white', flexDirection: 'column', fontWeight: 600, fontSize: 15 }}>{name}</Text>
            <TextInput value={value} onChangeText={setValue} style={tInput} secureTextEntry={type === 'password' ? true : false} keyboardType={keyboardType} />
        </View>
    )
}

const tInput = {
    flexDirection: 'column',
    backgroundColor: "white",
    height: 40,
    width: "55%",    
    textAlign: "center",
    fontSize: 15,
    // width: 180,
    borderRadius: 15,
}

export default InputForm