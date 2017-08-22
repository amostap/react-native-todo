import React from 'react';
import { Image } from 'react-native';
import Img from '../../../assets/images/icon.png';
import styles from './styles';

const Logo = () => <Image style={styles.image} source={Img} />;

export default Logo;
