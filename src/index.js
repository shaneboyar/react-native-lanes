import React, { Component } from "react";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Text
} from "react-native";
import _ from "lodash";

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
      default:
        this._layoutAnimationStyle = () => LayoutAnimation.spring();
    }
  }

  _renderLanes = () => {
    const { width } = Dimensions.get("screen");

    return React.Children.map(this.props.children, (child, index) => {
      var flexValue;
      var fontSize = this.props.defaultFontSize;
      if (this.state.openIndex === null || this.props.children.length === 1) {
        flexValue = 1;
      } else if (this.state.openIndex === index) {
        flexValue = this.props.expandAmount;
        fontSize = this.props.expandedFontSize;
      } else {
        flexValue = 0.1 / (this.props.children.length - 1);
        fontSize = this.props.collapsedFontSize;
      }
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            this._layoutAnimationStyle();
            this.setState({
              openIndex: this.state.openIndex === index ? null : index
            });
          }}
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
    return (
      <View style={{ flex: 1, ...this.props.style }}>
        {this._renderLanes()}
      </View>
    );
  }
}

Lanes.defaultProps = {
  expandAmount: 0.9,
  defaultFontSize: 34,
  expandedFontSize: 68,
  collapsedFontSize: 16,
  animation: "easeInEaseOut"
};

export default Lanes;
