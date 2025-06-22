import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Animated,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CELL_COUNT = 6;
const CELL_SIZE = 55;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = "#fff";
const NOT_EMPTY_CELL_BG_COLOR = "black";
const ACTIVE_CELL_BG_COLOR = "#bae3cd";

const animationsColor = [...new Array(CELL_COUNT)].map(
  () => new Animated.Value(0)
);
const animationsScale = [...new Array(CELL_COUNT)].map(
  () => new Animated.Value(1)
);

const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

export default function EmailVerifyModal({ visible, onClose, onVerify }) {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <Animated.Text
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </Animated.Text>
    );
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: wp("5%"),
            borderRadius: 10,
            width: wp("85%"),
            alignItems: "center",
            gap: wp("4%"),
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: wp("5%") }}>
            E-Posta Doğrulama
          </Text>
          <Text style={{ textAlign: "center" }}>
            E-posta adresinize gelen 6 haneli kodu girin
          </Text>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={Platform.select({
              android: "sms-otp",
              default: "one-time-code",
            })}
            renderCell={renderCell}
          />

          <View style={{ flexDirection: "row", gap: wp("5%") }}>
            <Pressable onPress={onClose}>
              <Text style={{ color: "gray", fontWeight: "600" }}>İptal</Text>
            </Pressable>
            <Pressable onPress={() => onVerify(value)}>
              <Text style={{ color: "blue", fontWeight: "700" }}>Doğrula</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: hp("2%"),
    justifyContent: "center",
  },
  cell: {
    width: wp("11%"),
    height: wp("11%"),
    lineHeight: wp("11%"),
    fontSize: 24,
    borderWidth: 2,
    borderColor: "green",
    textAlign: "center",
    marginHorizontal: wp("1%"),
  },
});
