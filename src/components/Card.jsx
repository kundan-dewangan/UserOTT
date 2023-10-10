import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const YouTubeCard = ({ title, channel, thumbnail, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.channel}>{channel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333', // Dark background color
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    color: '#fff', // White text color
    marginBottom: 8,
  },
  channel: {
    fontSize: 14,
    color: '#aaa', // Light gray text color
  },
});

export default YouTubeCard;
