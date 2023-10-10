import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import YouTubeCard from '../../components/Card'
import { ScrollView } from 'react-native-gesture-handler'

const HomeScreen = () => {

    const handleClick = () => {
        console.log("click;;")
    }  

    return (
        <View style={styles.container}>
           
            <ScrollView>
                {[1, 2, 3, 4, 5].map((item, index) => {
                    return (<YouTubeCard
                        key={index}
                        title="First Card"
                        channel="Kundan"
                        thumbnail="https://marketplace.canva.com/EAEqfS4X0Xw/1/0/1600w/canva-most-attractive-youtube-thumbnail-wK95f3XNRaM.jpg"
                        onPress={handleClick} />)
                })}
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

    }
})