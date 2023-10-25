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
import CrimeChroniclesCarousel from '../../components/Home/CrimeChroniclesCarousel'
import AdventureEscapadesCarousle from '../../components/Home/AdventureEscapadesCarousle'
import LeftToRightCorousel from '../../components/Home/LeftToRightCarousel'

const HomeScreen = () => {

    const navigation = useNavigation();
    const [list, setList] = useState([])
    const [popularGenreList, setPopularGenreList] = useState([])
    const [horrorMysList, setHorrorMysList] = useState([])
    const [musicManiaList, setMusicManiaList] = useState([])
    const [sciFiList, setSciFiList] = useState([])
    const [crimeChroList, setCrimeChroList] = useState([])
    const [adventureEscList, setAdventureEscList] = useState([])

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
                    const popular = response?.data.filter((item) => item.genre === 'Popular Genres')?.map(item => ({ ...item, isFav: false }))
                    const horrorMys = response?.data.filter((item) => item.genre === 'Horror Hysteria')
                    const musicMan = response?.data.filter((item)=> item.genre === 'Music Mania')
                    const sciFi = response?.data.filter((item) => (item.genre === 'Sci-Fi Spectacles' || item.genre === 'Music Mania' || item.genre === 'Crime Chronicles' || item.genre === 'Adventure Escapades'))
                    const scrimeChro = response?.data.filter((item)=> item.genre === 'Crime Chronicles')
                    const adventureEsc = response?.data.filter((item)=> item.genre === 'Adventure Escapades')
                    setPopularGenreList(popular)
                    setHorrorMysList(horrorMys)
                    setMusicManiaList(musicMan)
                    setSciFiList(sciFi)
                    setCrimeChroList(scrimeChro)
                    setAdventureEscList(adventureEsc)
                })
                .catch((error) => {
                    console.error('Error:', JSON.stringify(error));
                });
        } catch (err) {
            console.log("Error::", err)
            console.log("Error 22::", JSON.stringify(err))
        }
    }

    const favChangeHandler = (data) => {
        const popular = popularGenreList.map((item) => {
            if (item.id === data.id) {
                item.isFav = item.isFav ? false : true;
            }
            return item;
        })
        setPopularGenreList(popular)
    }

    return (
        <View style={styles.container}>
            <View style={{flex:1}}>

            </View>

            <ScrollView>
                <SectionHeader
                    title="Popular Genres"
                    buttonTitle="See All"
                    onPress={false}
                />
                <TopPlacesCarousel list={popularGenreList} favChangeHandler={favChangeHandler} />


                <SectionHeader
                    title="Music Mania"
                    buttonTitle=""
                    onPress={false}
                />
                <LeftToRightCorousel list={musicManiaList} />


                <SectionHeader
                    title="Horror Hysteria"
                    buttonTitle=""
                    onPress={false}
                />
                <LeftToRightCorousel list={horrorMysList} />


                <SectionHeader
                    title="Sci-Fi Spectacles"
                    buttonTitle=""
                    onPress={false}
                />
                <LeftToRightCorousel list={sciFiList} />


                <SectionHeader
                    title="Adventure Escapades"
                    buttonTitle=""
                    onPress={false}
                />
                <LeftToRightCorousel list={adventureEscList} />


                <SectionHeader
                    title="Crime Chronicles"
                    buttonTitle=""
                    onPress={false}
                />
                <LeftToRightCorousel list={crimeChroList} />


                {/* <SectionHeader
                    title="All List"
                    buttonTitle=""
                    onPress={false}
                />
                <Text>  </Text>
                {list?.map((item, index) => {
                    return (<YouTubeCard
                        key={index}
                        title={item?.title}
                        thumbnail={item?.thumbnail}
                        url={item?.url}
                        onPress={() => handleClick(item)} />)
                })} */}

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