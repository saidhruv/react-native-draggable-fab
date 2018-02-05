import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: "#444",
    shadowRadius: 1,
    backgroundColor: "red",
    position: "absolute"
  }
});

export default styles;
