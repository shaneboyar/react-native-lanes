import React, { Component } from "react";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Text,
  UIManager,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class Lanes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openIndex: null
    };

    switch (props.animation) {
      case "easeInEaseOut":
        this._layoutAnimationStyle = () => LayoutAnimation.easeInEaseOut();
        return;
      case "linear":
        this._layoutAnimationStyle = () => LayoutAnimation.linear();
        return;
      case "spring":
        this._layoutAnimationStyle = () => LayoutAnimation.spring();
        return;
      default:
        this._layoutAnimationStyle = () => LayoutAnimation.easeInEaseOut();
    }
  }

  _animateLanes = index => {
    this._layoutAnimationStyle();
    this.setState(({ openIndex }) => ({
      openIndex: openIndex === index ? null : index
    }));
  };

  _renderLanes = () => {
    const {
      children,
      defaultFontSize,
      expandAmount,
      expandedFontSize,
      collapsedFontSize
    } = this.props;
    const { openIndex } = this.state;
    const { width } = Dimensions.get("screen");

    return React.Children.map(children, (child, index) => {
      let flexValue;
      let fontSize = defaultFontSize;
      if (openIndex === null || children.length === 1) {
        flexValue = 1;
      } else if (openIndex === index) {
        flexValue = expandAmount;
        fontSize = expandedFontSize;
      } else {
        flexValue = 0.1 / (children.length - 1);
        fontSize = collapsedFontSize;
      }
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => this._animateLanes(index)}
        >
          <View
            style={{
              flex: flexValue,
              width,
              ...child.props.laneStyle
            }}
          >
            <Text style={{ fontSize, ...child.props.titleStyle }}>
              {child.props.title}
            </Text>
            {React.cloneElement(child, child.props)}
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  render() {
    const { style } = this.props;
    return <View style={{ flex: 1, ...style }}>{this._renderLanes()}</View>;
  }
}

Lanes.propTypes = {
  animation: PropTypes.oneOf(["easeInEaseOut", "spring", "linear"]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  collapsedFontSize: PropTypes.number,
  defaultFontSize: PropTypes.number,
  expandAmount: PropTypes.number,
  expandedFontSize: PropTypes.number,
  style: ViewPropTypes.style
};

Lanes.defaultProps = {
  animation: "easeInEaseOut",
  collapsedFontSize: 16,
  defaultFontSize: 34,
  expandAmount: 0.9,
  expandedFontSize: 68,
  style: {}
};

export default Lanes;
