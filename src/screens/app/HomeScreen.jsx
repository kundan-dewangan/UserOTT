import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import YouTubeCard from '../../components/Card'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { headerPayload } from '../../utils/utils'
import { useNavigation } from '@react-navigation/native'
import TopPlacesCarousel from '../../components/Home/TopPlacesCarousel'
import { PLACES, TOP_PLACES } from '../../data'
import SectionHeader from '../../components/shared/SectionHeader'
import MyListCarousel from '../../components/Home/MyListCarousel'
import TrendingCarousel from '../../components/Home/TrendingCarousel'
import WatchingForCarousel from '../../components/Home/WatchingForCarousel'

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
                <SectionHeader
                    title="Only on OTT"
                    buttonTitle="See All"
                    onPress={() => { }}
                />
                <TopPlacesCarousel list={TOP_PLACES} />

                <SectionHeader
                    title="My List"
                    buttonTitle=""
                    onPress={false}
                />
                <MyListCarousel list={TOP_PLACES} />
                
                
                <SectionHeader
                    title="Trending on OTT"
                    buttonTitle=""
                    onPress={false}
                />
                <TrendingCarousel list={TOP_PLACES} />


                <SectionHeader
                    title="Watching for you"
                    buttonTitle=""
                    onPress={false}
                />
                <WatchingForCarousel list={PLACES} />

                {list?.map((item, index) => {
                    return (<YouTubeCard
                        key={index}
                        title={item?.title}
                        thumbnail={item?.thumbnail}
                        url={item?.url}
                        onPress={() => handleClick(item)} />)
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