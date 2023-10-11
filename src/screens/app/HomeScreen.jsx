import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import YouTubeCard from '../../components/Card'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { headerPayload } from '../../utils/utils'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const navigation = useNavigation();
    const [list, setList] = useState([])

    const handleClick = (data) => {
        navigation.navigate('Detail', data)
    }


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            console.log("inside :::")
            axios.get(`${process.env.REACT_APP_URL}videos`, {
                headers: headerPayload,
            })
                .then((response) => {
                    setList(response?.data);
                })
                .catch((error) => {
                    console.error('Error:', JSON.stringify(error));
                });
        } catch (err) {
            console.log("Error::", err)
            console.log("Error 22::", JSON.stringify(err))
        }
    }

    return (
        <View style={styles.container}>

            <ScrollView>
                {list?.map((item, index) => {
                    return (<YouTubeCard
                        key={index}
                        title={item?.title}
                        thumbnail={item?.thumbnail}
                        url={item?.url}
                        onPress={()=> handleClick(item)} />)
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
        backgroundColor: '#222', // Dark background color


    }
})