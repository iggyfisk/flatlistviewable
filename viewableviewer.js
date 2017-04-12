/**
 * @flow
 */

 import React, { Component } from 'react';
 import {
   StyleSheet,
   Text,
   View,
   FlatList,
 } from 'react-native';

import getData from './storage';

const renderItem = ({ item }) => {
 return (
   <View style={styles.listItem}>
    <Text style={styles.itemText}>{item}</Text>
   </View>
 );
}

const renderSeparator = () => <View style={styles.listSeparator} />;

type ViewableState = {
 refreshing: Boolean,
 items: Array<String>,
 viewableItems: Array<String>,
};

export default class ScrollTest extends Component {
  state: ScrollTestState = {
    refreshing: false,
    items: [],
    viewableItems: [],
  };

  load: Function = () => {
    this.setState({ refreshing: true });
    getData().then(items => this.setState({ items, refreshing: false }));
  }

  onViewableItemsChanged: Function = ({ viewableItems }) => {
    this.setState({ viewableItems: viewableItems.map(i => i.item) });
  };

  componentDidMount() {
    this.load();
  }

  render() {
    const viewable = this.state.viewableItems.join(', ');

    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {`${viewable} are visible`}
          </Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={this.state.items}
            keyExtractor={i => i}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderItem}
            refreshing={this.state.refreshing}
            onRefresh={this.load}
            onViewableItemsChanged={this.onViewableItemsChanged}
          />
        </View>
       </View>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  statusContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 55,
  },
  statusText: {
    fontSize: 14,
    textAlign: 'center',
  },
  listItem: {
    height: 200,
    justifyContent: 'center',
    backgroundColor: '#eeccee',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 26,
    textAlign: 'center',
  },
  listSeparator: {
    height: 20,
  },
});
