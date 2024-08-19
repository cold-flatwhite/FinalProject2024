import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // Styles for ImageManager
  imagePicker: {
    alignItems: "center",
    marginVertical: 15,
  },
  imagePreview: {
    width: 150,
    height: 150,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 75,
    overflow: "hidden", // Ensures that the image fits within the circle
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75, // Makes the image circular
  },

  // Styles for LocationManager
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E6F0FA",
  },
  mapImage: {
    width: 350,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  // Styles for OrderItem
  orderContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  postOrderContainer: {
    backgroundColor: "#FFF3E0",
  },
  receivedOrderContainer: {
    backgroundColor: "#E8F5E9",
  },
  orderDetails: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderType: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
  service: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  pending: {
    fontSize: 14,
    color: "orange",
  },
  accepted: {
    fontSize: 14,
    color: "green",
  },
  rejected: {
    fontSize: 14,
    color: "red",
  },

  // Styles for PressableButton
  defaultStyle: {
    padding: 5,
    backgroundColor: "#0a9396",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  pressableStyle: {
    backgroundColor: "#005f73",
    transform: [{ scale: 0.95 }],
  },

  // Styles for ProviderItem
  card: {
    backgroundColor: "#6495ED",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 2,
  },
  experienceBox: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
    flex: 1,
  },
  experienced: {
    backgroundColor: "green",
  },
  noExperience: {
    backgroundColor: "gray",
  },
  experienceText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  body: {
    marginTop: 5,
  },
  address: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  servicesTags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceTag: {
    backgroundColor: "#333333",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 2,
    margin: 4,
    fontSize: 12,
    color: "#ffffff",
    borderColor: "#4f4f4f",
    borderWidth: 1,
    overflow: "hidden",
    fontWeight: "bold",
    textAlign: "center",
  },

  // Styles for TabStack
  headerStyle: {
    backgroundColor: "#4169E1",
  },
  headerTintColor: {
    color: "white",
  },
  headerRightIcon: {
    marginRight: 10,
  },
  tabBarActiveTintColor: "#4169E1",
  tabBarInactiveTintColor: "gray",

  // Styles for WelcomeScreen
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#E6F0FA',
  },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImage: {
    width: '80%',
    height: '60%',
  },
  welcomeText: {
    fontSize: 18,
    color: '#45afbf',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#d3d3d3',
  },
  welcomeButton: {
    marginTop: 20,
    backgroundColor: '#4169E1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Styles for LoginScreen and SignupScreen
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E6F0FA",
  },
  signupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E6F0FA",
  },
  loginTitle: {
    fontSize: 50,
    fontFamily: "Inter_900Black",
    marginBottom: 24,
    color: "#1E90FF",
  },
  signupTitle: {
    fontSize: 50,
    fontFamily: "Inter_900Black",
    marginBottom: 24,
    color: "#1E90FF",
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  warning: {
    color: "red",
    marginBottom: 8,
  },
  forgotPassword: {
    color: "#0066cc",
    marginTop: 16,
  },
  link: {
    marginTop: 16,
    color: "#0066cc",
  },
});
