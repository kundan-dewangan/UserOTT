import { useRoute } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import { View, Alert, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";
import VimeoPlayer from "../../components/VimeoPlayer";
import Orientation from 'react-native-orientation-locker';

export default function DetailScreen() {
  const [playing, setPlaying] = useState(true);

  const route = useRoute();
  const data = route.params;

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  useEffect(() => {
    // Lock the screen orientation to portrait when the component mounts
    Orientation.lockToPortrait();
  }, []);

  const setOrientationToPortrait = () => {
    Orientation.lockToPortrait();
  };

  const setOrientationToLandscape = () => {
    Orientation.lockToLandscape();
  };
  const onFullScreenChange = (state) => {
    if (state) {
      setOrientationToLandscape()
    } else {
      setOrientationToPortrait();
    }
  };

  return (
    <View style={styles.mainContainer}>
      {data?.type === 'youtube' && <YoutubePlayer
        height={300}
        title={data?.title}
        play={playing}
        videoId={data?.playId}
        onChangeState={onStateChange}
        onFullScreenChange={onFullScreenChange}
      />}

      {data?.type === 'vimeo' && <VimeoPlayer playId={data?.playId} />}
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
    top: -28,
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