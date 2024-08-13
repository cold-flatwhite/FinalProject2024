# Petcare Provider Application - Petopia

## Data model and Collections
Our data model consists of the following three collections:
1. **users** - Stores basic user information such as name, address, email, and location.
2. **providers** - Stores detailed information about service providers, including experience, services offered, open for work status, and profile image.
3. **orders** - Stores detailed information about orders, including request content, date, user ID, provider ID, and order status.


## CRUD operations

### users Collection
- **Create**: Create a user document upon registration. Store user information such as name, address, email, and location.
- **Read**: Fetch user information to display on the profile page. Ensure that users can see their current information upon login.
- **Update**: Update the user document when the user updates their profile, allowing modifications to name, address, email, and location.

### providers Collection
- **Create**: Register as a provider and create a provider document. Store provider information such as services offered, open status, experience, and profile image.
- **Read**: Fetch provider information to display in search results on the search screen. Show existing providers to users, including their profile image.
- **Update**: Update the provider document when the provider modifies their profile information, including their image and services offered.

### orders Collection
- **Create**: Create an order document when a user (client) places an order with a provider.
- **Read**: Fetch order details to display on the orders screen. Users can view details of their orders and cancel them.
- **Update**: Providers can accept or reject orders, which updates the order status. Clients can also update their orders, such as canceling them.
- **Delete**: Delete order documents when the order is canceled by the client.

## These functionalities are added in this iteration2:
- **Authentication**:  Added forgot password functionality, allowing users to reset their passwords via email. Implemented all other authentication-related functionalities, including password visibility toggling,
     user registration, and error handling during the authentication process.
- **Camera use**: Integrated Expo Image Picker to allow users to upload or take profile pictures. Added functionality to store and retrieve profile images from Firebase Storage. Developed the ImageManager component to handle image picking and uploading, with permission handling for camera access.
- **Location use**:Implemented location tracking using Expo Location and Google Maps API, Added functionality to display user or provider locations on an interactive map.
- **External API use**: Google places, change the coordinates to readable address, and GooglePlacesAutocomplete.

## Current State of the Application
We have implemented user registration, login, profile management, provider registration, order creation, order management functionalities, image management, location services, and notification scheduling.

### Screenshots
1. **Login Screen** - Users can log in using email and password.
![login](https://github.com/user-attachments/assets/c1059aa3-5d40-4616-9811-9702a9fb99c0)

2. **Signup Screen** - Users can create a new account
![signup](https://github.com/user-attachments/assets/89bd3f3c-7c9f-4724-889d-7309c3f101ea)

3. **Profile Screen** - Users can view, update their personal information, and view their location on a map.
![profile](https://github.com/user-attachments/assets/ae54c7cf-eddc-407d-878b-ff24aab32215)

4. **Search Screen** - Users can search on a map and check a list of available petcare providers.
![search](https://github.com/user-attachments/assets/3bafa752-54c4-4d14-b282-45590fed71b3)

5. **Post Order Screen** - Users can view provider information, view the provider's image, and post their order.
![postorder](https://github.com/user-attachments/assets/bf41ad2a-c767-4c1e-90c5-cdda7fec3655)

6. **Provider Registration Screen** - Users can register as providers, upload their profile image, and offer services.
![providersignup](https://github.com/user-attachments/assets/4f6388ef-3d8f-4eff-833f-b95b9ba94e87)

7. **Order Screen** - Users can view and manage orders.
![myorders](https://github.com/user-attachments/assets/98582d84-072f-4a6b-97a3-47467b12699f)

8. **Order Information Screen** - Users can view order details, cancel the order, and providers can confirm or reject orders.
![orderinfo](https://github.com/user-attachments/assets/caae6372-a8b8-41e6-b492-e55dc8d0efa2)

9. **Location and Notification Features** - Users can view and update their location, and schedule notifications related to orders and profile updates. 
![location](https://github.com/user-attachments/assets/13d11455-41c4-4863-8506-31c4bc6e122a)


#### Contributions

- **Xin SUN**:
- 1. Search Screen:
     Developed the SearchScreen component to display a list of available providers.
     Integrated Google Places API for location search and mapping functionalities.
     Added real-time data fetching from Firestore for displaying providers on the map and in a list.
     
  2. Post Order Screen:
     Created the PostOrderScreen component for placing orders.
     Users can view provider details, select a service request, set a date, and submit the order.
     Integrated Firebase Storage for handling provider profile images.
  
  3. Provider Registration Screen:
     Developed the ProviderScreen component to manage provider profiles.
     Integrated location tracking to store and display provider locations.
     Added functionality to upload and display profile images using Firebase Storage.

  4. Order Screen:
     Developed the OrderInfoScreen component to display detailed information about orders.
     Added functionality for providers to accept or reject orders and for clients to cancel them.

  6. Order Information Screen:
     I created the OrderInfoScreen component to display detailed information about a specific order.
     It provides functionality for the current user to confirm or reject the order based on their role (provider or client).
     The screen shows relevant order details, such as client or provider information, request, and status.
     If the order is ongoing, providers can choose to confirm or reject it. The status is updated in Firebase Firestore,
     and the user is alerted of the update’s success
     
  8. Location Manager:
     Implemented location tracking using Expo Location and Google Maps API.
     Added functionality to display user or provider locations on an interactive map.

  9. Notification Manager:
     Integrated local notification functionality using Expo Notifications API.
     Users can schedule and receive reminders related to their orders.

  10. Authentication:
     Added forgot password functionality, allowing users to reset their passwords via email.
     

- **Wanyi JIANG**:
- 1. Login Screen:
     Developed the LoginScreen component for user authentication.
     Integrated Firebase Authentication for email/password login.
     Added input validation and error handling for user login.
     Added input visibility.
     
  2. Signup Screen:
     Created the SignupScreen component for user registration.
     Implemented password strength validation and user account creation using Firebase Authentication.
     Added functionality to check if an account already exists before registration.
     
  3. Profile Screen:
     Developed the ProfileScreen component for managing user profiles.
     Implemented functionality for editing user information, including name, address, email.
     Added a Sign Out button and ensured proper logout functionality using Firebase Authentication.

  5. Camera & Image Functionality:
     Integrated Expo Image Picker to allow users to upload or take profile pictures.
     Added functionality to store and retrieve profile images from Firebase Storage.
     Developed the ImageManager component to handle image picking and uploading, with permission handling for camera access.

  6. Authentication:
     Implemented all other authentication-related functionalities, including password visibility toggling,
     user registration, and error handling during the authentication process.


  


