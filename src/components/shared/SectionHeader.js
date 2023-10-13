import React from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { sizes, spacing } from '../../constants/theme';
import Icon from './Icon';

const SectionHeader = ({
  title,
  containerStyle,
  titleStyle,
  onPress,
  buttonTitle = 'Button',
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {onPress && <Button title={buttonTitle} onPress={onPress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: spacing.s,
    marginRight: spacing.m,
    marginTop: spacing.l,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default SectionHeader;
