import React from 'react';
import Svg, {
  Text as SvgText,
  Defs,
  Stop,
  LinearGradient,
} from 'react-native-svg';
import {hp} from '../helper/common';

const GradientText = ({text, gradientColors, fontSize, fontWeight, style}) => {
  return (
    <Svg height={hp(fontSize) + 10} width="100%">
      <Defs>
        <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={gradientColors[0]} />
          <Stop offset="1" stopColor={gradientColors[1]} />
        </LinearGradient>
      </Defs>
      <SvgText
        fill="url(#gradient)"
        fontSize={hp(fontSize)}
        fontWeight={fontWeight}
        x="50%"
        y={hp(fontSize)}
        textAnchor="middle"
        style={style}>
        {text}
      </SvgText>
    </Svg>
  );
};

export default GradientText;
