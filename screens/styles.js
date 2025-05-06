import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#F8F8F8",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  headerTitleContainer: {
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: "#666",
  },
  headerTitle2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  searchButton: {
    marginTop: 20,
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchButtonText: {
    marginLeft: 10,
    color: "#000",
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "85%",
  },
  modalLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
  },
  modalCategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalCategoryButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E13E79",
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalCategorySelected: {
    backgroundColor: "#E13E79",
  },
  modalCategoryText: {
    fontWeight: "bold",
  },
  modalCategoryTextSelected: {
    color: "#fff",
  },
  modalCategoryTextUnselected: {
    color: "#E13E79",
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  modalButtonLimpar: {
    backgroundColor: "#B8C800",
    marginRight: 10,
  },
  modalButtonFiltrar: {
    backgroundColor: "#E13E79",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
