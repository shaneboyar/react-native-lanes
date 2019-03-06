# React Native Lanes
[![npm version](http://img.shields.io/npm/v/react-native-lanes.svg?style=flat)](https://npmjs.org/package/react-native-lanes "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dt/react-native-lanes.svg?style=flat)](https://npmjs.org/package/react-native-lanes "View this project on npm")

React Native Lanes is a wrapper component that allows you to create "content lanes" that collapse and expand with a click.
<p align="center">
  <img src="https://giant.gfycat.com/PowerfulScaredIberianmidwifetoad.gif" />
</p>

# Installation
`yarn add react-native-lanes`

# Usage
The above demo was made like so:
```
import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Lanes from "react-native-lanes";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Lanes>
            <View
              title="ONE"
              titleStyle={{ textAlign: "center" }}
              laneStyle={{ backgroundColor: "#9aeff4" }}
            />
            <View
              title="TWO"
              titleStyle={{ textAlign: "center" }}
              laneStyle={{ backgroundColor: "#f49ac2" }}
            />
            <View
              title="THREE"
              titleStyle={{ textAlign: "center" }}
              laneStyle={{ backgroundColor: "#9af49f" }}
            />
          </Lanes>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
```
# Customization

The wrapping `Lanes` component can accept the following props:
* `defaultFontSize`: The font size for all the `title` elements when no lane is expanded.
* `expandedFontSize`: The font size that will be applied to the expanded lane's title.
* `collapsedFontSize`: The font size that will be applied to the collapsed lanes' titles.
* `expandAmount`: A decimal (0-1) representing what percentage of the Lanes component the expanded lane will take up.

Each child component can accept the following props:
* `laneStyle`: A style object that will be applied to the lane's container.
* `titleStyle`: A style object that will be applied to the lane's title.
* `title`: A title for the lane
