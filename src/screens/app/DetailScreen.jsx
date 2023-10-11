import { useRoute } from "@react-navigation/native";
import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";

export default function DetailScreen() {
  const [playing, setPlaying] = useState(true);

  const route = useRoute();
  const  data  = route.params;

  console.log("From Home screen:::", data)

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"w2ifba5_1qI"}
        onChangeState={onStateChange}
      />
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.title}>{data?.title}</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{data?.type}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{data?.genre}</Text>
            </View>
          </View>
          <Text style={styles.description}>{data?.description}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#222',
    flex: 1,
  },
  container: {
    padding: 16,
    borderRadius: 8,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white'
  },
  description: {
    fontSize: 16,
    color: '#777',
    marginVertical: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: '#485460',
    padding: 10,
    borderRadius: 4,
    marginRight: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    textTransform: 'capitalize'
  },
});