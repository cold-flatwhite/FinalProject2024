# Petcare Provider Application - Petopia

## Introduction
**🙋 What does Petopia do?**
- A platform that connects pet service providers with pet owners looking for services like dog walking, pet sitting, grooming, and training.

**🧐 Why do people use this app?**
- Many pet owners struggle to find reliable and convenient services for their pets. The demand for trusted pet care professionals is increasing.

**🌟 What’s unique about Petopia?**
- Provide a platform that simplifies the process of finding and booking pet services.

**🧑‍💻Contributors**
- Xin SUN & Wanyi JIANG (Janet)


## Presentation
https://docs.google.com/presentation/d/1VbsEOHozrT9_s2OrqqinCqF1L0ODcfVpq0p4-fF0RhU/edit?usp=sharing

## Demo
https://youtu.be/cJoJIx9irjw 


## These functionalities are added in this iteration3:
- **Authentication**:  1. Added textContentType attribute for password text input. 2. Added Welcome screen providing information about the app there to encourage new users to sign up.
- **Notification**: Enabled petcare provider who has recieved order to schedule local notification as reminders for order start day.

## These functionalities are added in this iteration2:
- **Authentication**:  Added forgot password functionality, allowing users to reset their passwords via email. Implemented all other authentication-related functionalities, including password visibility toggling,
     user registration, and error handling during the authentication process.
- **Camera use**: Integrated Expo Image Picker to allow users to upload or take profile pictures. Added functionality to store and retrieve profile images from Firebase Storage. Developed the ImageManager component to handle image picking and uploading, with permission handling for camera access.
- **Location use**:Implemented location tracking using Expo Location and Google Maps API, Added functionality to display user or provider locations on an interactive map.
- **External API use**: Google places, change the coordinates to readable address, and GooglePlacesAutocomplete.
  

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


## Current State of the Application
We have implemented all 5 functionalities: 
Authentication; Camera use; Location use; Notification; External API use

### Screenshots
1. **Welcome Screen** - Users can view information of this app and then being guided to sign up.
![Welcome](https://github.com/user-attachments/assets/4fe13327-ee81-4fd3-81dc-d005b445ebd2)

2. **Signup Screen** - Users can create a new account
![signup](https://github.com/user-attachments/assets/89bd3f3c-7c9f-4724-889d-7309c3f101ea)

3. **Login Screen** - Users can log in using email and password.
![login](https://github.com/user-attachments/assets/c1059aa3-5d40-4616-9811-9702a9fb99c0)

4. **Profile Screen** - Users can view, update their personal information, and view their location on a map.
![Profile](https://github.com/user-attachments/assets/9f9913b1-5338-4c9c-8d48-431eba2c8f3e)

5. **Search Screen** - Users can search on a map and check a list of available petcare providers.
![search](https://github.com/user-attachments/assets/70ae8d77-d94c-4074-b9c3-42328dc2bcab)

7. **Post Order Screen** - Users can view provider information, view the provider's image, and post their order.
![postorder](https://github.com/user-attachments/assets/bf41ad2a-c767-4c1e-90c5-cdda7fec3655)

8. **Provider Registration Screen** - Users can register as providers, upload their profile image, and offer services.
![providersignup](https://github.com/user-attachments/assets/4f6388ef-3d8f-4eff-833f-b95b9ba94e87)

9. **Order Screen** - Users can view and manage orders.
![orders](https://github.com/user-attachments/assets/e1f9c3da-2e07-4aab-8d94-2132f272d520)

10. **Order Information Screen** - Users can view order details, cancel the order, and providers can confirm or reject orders.
![orderinfo](https://github.com/user-attachments/assets/caae6372-a8b8-41e6-b492-e55dc8d0efa2)

11. **Location Features** - Users can view and update their location. 
![location](https://github.com/user-attachments/assets/13d11455-41c4-4863-8506-31c4bc6e122a)

12. **Notification Features** - Users can schedule notification as reminders of order start, this reminder triggers on both ordered day and order start day.
![notification](https://github.com/user-attachments/assets/84ff5c40-8e3f-4bbb-a7f2-cafbe954cde3)


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
     Created the OrderInfoScreen component to display detailed information about a specific order.
     It provides functionality for the current user to confirm or reject the order based on their role (provider or client).
     The screen shows relevant order details, such as client or provider information, request, and status.
     If the order is ongoing, providers can choose to confirm or reject it. The status is updated in Firebase Firestore,
     and the user is alerted of the update’s success
     
  8. Location Manager:
     Implemented location tracking using Expo Location and Google Maps API.
     Added functionality to display user or provider locations on an interactive map.

  9. Authentication:
     Added forgot password functionality, allowing users to reset their passwords via email.
     

- **Wanyi JIANG**:
- 1. Welcome Screen:
     Created Welcome screen, providing informations about the app to encourage new users to sign up.
     
  2. Login Screen:
     Developed the LoginScreen component for user authentication.
     Integrated Firebase Authentication for email/password login.
     Added input validation and error handling for user login.
     Added input visibility.
     
  3. Signup Screen:
     Created the SignupScreen component for user registration.
     Implemented password strength validation and user account creation using Firebase Authentication.
     Added functionality to check if an account already exists before registration.
     
  4. Profile Screen:
     Developed the ProfileScreen component for managing user profiles.
     Implemented functionality for editing user information, including name, address, email.
     Added a Sign Out button and ensured proper logout functionality using Firebase Authentication.

  5. Image Manager:
     Integrated Expo Image Picker to allow users to upload or take profile pictures.
     Added functionality to store and retrieve profile images from Firebase Storage.
     Developed the ImageManager component to handle image picking and uploading, with permission handling for camera access.

  6. Authentication:
     Implemented all other authentication-related functionalities, including password visibility toggling,
     user registration, and error handling during the authentication process.

  7. Notification Manager:
     Integrated local notification functionality using Expo Notifications, with permission handling for notification access.
     Users can schedule and receive reminders related to their orders on both notification set day and order start day.


  


