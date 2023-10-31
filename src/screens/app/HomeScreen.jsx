import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { headerPayload } from '../../utils/utils'
import { useNavigation } from '@react-navigation/native'
import TopPlacesCarousel from '../../components/Home/TopPlacesCarousel'
import SectionHeader from '../../components/shared/SectionHeader'
import LeftToRightCorousel from '../../components/Home/LeftToRightCarousel'
// import MyListCarousel from '../../components/Home/MyListCarousel'
// import TrendingCarousel from '../../components/Home/TrendingCarousel'
// import WatchingForCarousel from '../../components/Home/WatchingForCarousel'
// import CrimeChroniclesCarousel from '../../components/Home/CrimeChroniclesCarousel'
// import AdventureEscapadesCarousle from '../../components/Home/AdventureEscapadesCarousle'

const HomeScreen = () => {

    const navigation = useNavigation();
    const [list, setList] = useState({})

    const [videoList, setVideoList] = useState([])
    const [catList, setCatList] = useState([])

    // const [popularGenreList, setPopularGenreList] = useState([])
    // const [horrorMysList, setHorrorMysList] = useState([])
    // const [musicManiaList, setMusicManiaList] = useState([])
    // const [sciFiList, setSciFiList] = useState([])
    // const [crimeChroList, setCrimeChroList] = useState([])
    // const [adventureEscList, setAdventureEscList] = useState([])

    const handleClick = (data) => {
        navigation.navigate('Detail', data)
    }


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            axios.get(`${process.env.REACT_APP_URL}videos`, {
                headers: headerPayload,
            })
                .then((response) => {
                    setVideoList(response?.data)
                    return getCategoryAPICall(response?.data)
                })
                .catch((error) => {
                    console.error('Error video:', JSON.stringify(error));
                });
        } catch (err) {
            console.log("Error::", err)
            console.log("Error 22::", JSON.stringify(err))
        }
    }

    const getCategoryAPICall = (listData) => {
        try {
            axios.get(`${process.env.REACT_APP_URL_Two}category`, {
                headers: headerPayload,
            })
                .then((response) => {
                    setCatList(response.data)
                    return structureData(response?.data, listData);
                })
                .catch((error) => {
                    console.error('Error cat:', error);
                    // console.error('Error cat:', JSON.stringify(error));
                });
        } catch (err) {
            console.log("Error::", err)
            console.log("Error 22::", JSON.stringify(err))
        }

    }

    const structureData = (cat, listItem) => {
        let container = {}
        for (const item of cat) {
            container[item?.name] = listItem.filter(data => data?.genre === item?.name)?.sort((a, b) => {
                if (a?.priority < b?.priority) {
                    return -1;
                }
                if (a?.priority > b?.priority) {
                    return 1;
                }
                // If priorities are equal, preserve the original order
                return 0;
            });
        }
        setList(container);
    }

    const favChangeHandler = (data) => {
        const popular = videoList.map((item) => {
            if (item.id === data.id) {
                item.isFav = item.isFav ? false : true;
            }
            return item;
        })
        setVideoList(popular)
        structureData(catList, popular);
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>

            </View>

            <ScrollView>

                {Object?.keys(list)?.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <SectionHeader
                                title={item}
                                buttonTitle="See All"
                                onPress={false}
                            />
                            {index === 0 && <TopPlacesCarousel list={list[item]} favChangeHandler={favChangeHandler} />}
                            {index !== 0 && <LeftToRightCorousel list={list[item]} />}

                        </React.Fragment>

                    )
                })}


                {/* <SectionHeader
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
                <LeftToRightCorousel list={crimeChroList} /> */}

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