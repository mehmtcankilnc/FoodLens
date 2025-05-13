import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function FavoriteCard({ barcode, name }) {
  const navigation = useNavigation();

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getImageProduct();
  }, []);

  const getImageProduct = async () => {
    try {
      if (barcode) {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v2/product/${barcode}?lc=tr`
        );

        if (response.data.status !== 0) {
          setProduct(response.data.product);
          setImage(response.data.product.image_front_url);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductDetail = () => {
    navigation.navigate("ProductDetail", { product: product });
  };

  return (
    <Pressable
      style={{
        width: wp("32%"),
        gap: wp("1%"),
        borderWidth: 2,
        borderRadius: 12,
        padding: hp("1%"),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        elevation: 2,
        borderColor: "#ccc",
      }}
      onPress={handleProductDetail}
    >
      <Image
        source={
          image ? { uri: image } : require("../assets/placeHolderImage.png")
        }
        style={{
          width: wp("25%"),
          height: 100,
          borderRadius: 12,
        }}
      />
      <Text numberOfLines={1} className="text-center font-medium">
        {name}
      </Text>
    </Pressable>
  );
}
