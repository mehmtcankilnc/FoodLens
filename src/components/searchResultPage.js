import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function SearchResultPage({ result }) {
  return (
    <ScrollView>
      {result && result.length > 0 ? (
        result.map((item, index) => (
          <View key={index}>
            <Text>{item.food_name}</Text>
            <Text>{item.food_description}</Text>
          </View>
        ))
      ) : (
        <Text>Sonuç bulunamadı</Text>
      )}
    </ScrollView>
  );
}
