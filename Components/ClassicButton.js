import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'

const ClassicButton = ({ title, cost, win, icon, color, handleclick, boardSize }) => {

    squareSize = boardSize / 2.6

    return (        
            <View style={{ backgroundColor: color, borderWidth: 1, borderRadius: 3, width: squareSize, height: squareSize, justifyContent:'center', margin: 5 }}>
                <Pressable onPress={() => handleclick(title)} style={{ paddingBottom: win ? 0 : 25, alignItems: 'center' }}>            
                    <Image source={icon} style={{ width: 40, height: 40, marginBottom: 5, marginTop: 12 }} />
                    <Text style={{position:'relative', color: 'black'}}>{cost && <Text>Cuesta: {cost > 1000 ? cost / 1000 + "K" : cost} points</Text>}</Text>
                    <Text style={{position:'relative', color: 'black'}}>{win && <Text>Ganas: {win > 1000 ? win / 1000 + "K" : win} points</Text>}</Text>
                </Pressable>
            
            </View>        
    )
}

export default ClassicButton