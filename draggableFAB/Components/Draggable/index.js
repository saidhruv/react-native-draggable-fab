import React, { Component } from "react";
import { View, PanResponder, Animated, Button, Text } from "react-native";
import SuperButton from "../SuperButton/";

export default class Dragger extends Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    this._animatedValueX = 0;
    this._animatedValueY = 0;
    this.state.pan.x.addListener(value => (this._animatedValueX = value.value));
    this.state.pan.y.addListener(value => (this._animatedValueY = value.value));

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        this.state.pan._flattenOffset;
      }
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  _flattenOffset = () => {
    this._value += this._offset;
    this._offset = 0;
  };

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[
          panStyle,
          {
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          },
          { flex: 1 }
        ]}
      >
        <SuperButton buttonColor="#363636">
          <SuperButton.Item buttonColor='#FF5722' title="!!!!" onPress={() => console.log("Clicked !")}>
            <Text>
              !
            </Text>
          </SuperButton.Item>
          <SuperButton.Item buttonColor='#CDDC39' title="!!!!" onPress={() => console.log("Clicked @")}>
            <Text>
              @
            </Text>
          </SuperButton.Item>
          <SuperButton.Item buttonColor='#03A9F4' title="!!!!" onPress={() => console.log("Clicked #")}>
            <Text>
              #
            </Text>
          </SuperButton.Item>
          <SuperButton.Item buttonColor='#009688' title="!!!!" onPress={() => console.log("Clicked $")}>
            <Text>
              $
            </Text>
          </SuperButton.Item>
          <SuperButton.Item buttonColor='#673AB7' title="!!!!" onPress={() => console.log("Clicked %")}>
            <Text>
              %
            </Text>
          </SuperButton.Item>
        </SuperButton>
      </Animated.View>
    );
  }
}
