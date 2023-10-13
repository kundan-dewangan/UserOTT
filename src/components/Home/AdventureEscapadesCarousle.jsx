import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors, sizes} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import Carousel from '../shared/Carousel';
import Card from '../shared/Card/Card';
import CardMedia from '../shared/Card/CardMedia';
import CardFavoriteIcon from '../shared/Card/CardFavoriteIcon';

const CARD_HEIGHT = 150;

const AdventureEscapadesCarousle = ({list}) => {
  const navigation = useNavigation();
  return (
    <Carousel
      items={list}
      renderItem={({item, style}) => {
        return (
          <Card
            style={[styles.card]}
            shadowType="dark"
            onPress={() => {
              navigation.navigate('Detail', item);
            }}>
            {/* <CardFavoriteIcon active={false} onPress={() => {}} /> */}
            <SharedElement
              id={`trip.${item.id}.image`}
              style={StyleSheet.absoluteFillObject}>
              <CardMedia source={item.thumbnail} borderBottomRadius />
            </SharedElement>
            {/* <View style={styles.titleBox}>
              <Text style={styles.title}>{item?.title?.length > 20 ? item?.title.slice(0, 20): item?.title}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View> */}
          </Card>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    marginRight: 10
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 40,
    left: 16,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default AdventureEscapadesCarousle;
