import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { useAppSlice } from "@/store/slices";
import { colors } from "@/theme";
import { toggleCashMode } from "@/store/thunks";
import { formatCash, formatCoin } from "@/utils";

const styles = StyleSheet.create({
  container: { width: '100%' },
  totalCharged: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});

const TotalBalance = ({
}) => {
  const { isCashMode, totalCash, totalCoin, dispatch } = useAppSlice();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isCashMode ? ["#1a2d26", "#1b2224"] : ["#46213a", "#1a1e22"]}
        start={{ x: 0, y: 0 }}
        end={isCashMode ? { x: 0, y: 1 } : { x: 1, y: 0 }}
        style={styles.totalCharged}
      >
        <View style={styles.leftSection}>
          <FontAwesome5 name={isCashMode ? "dollar-sign" : "bitcoin"} size={20} color="white" />
          <Text style={styles.amountText}>
            {isCashMode ? formatCash(totalCash) : formatCoin(totalCoin)}
          </Text>
        </View>
        <ToggleSwitch
          isOn={isCashMode}
          onColor={colors.green}
          offColor={colors.pink}
          onToggle={() => dispatch(toggleCashMode())}
        />
      </LinearGradient>
    </View>
  );
};

export default TotalBalance;
