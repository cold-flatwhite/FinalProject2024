# Petcare Provider Application

## Data model and Collections
Our data model consists of the following three collections:
1. **users** - Stores basic user information such as name, address, and email.
2. **providers** - Stores detailed information about service providers, including name, experience, services offered, and open for work status.
3. **orders** - Stores detailed information about orders, including request content, breed, date, user ID, and provider ID.


## CRUD operations

### users Collection
- **Create**: Create a user document upon registration. Store user information such as name, address, and email.
- **Read**: Fetch user information to display on the profile page. Ensure that users can see their current information upon login.
- **Update**: Update the user document when the user updates their profile, allowing modifications to name, address, and email.

### providers Collection
- **Create**: Register as a provider and create a provider document. Store provider information such as name, email, address, service offered, and open status.
- **Read**: Fetch provider information to display in search results on the search screen. Show existing providers to users.
- **Update**: Update the provider document when the provider modifies their profile information.

### orders Collection
- **Create**: Create an order document when a user (client) places an order with a provider.
- **Read**: Fetch order details to display on the orders screen. Users can view details of their orders and cancel them.
- **Update**: Providers can accept or reject orders, which updates the order status. Clients can also update their orders, such as canceling them.
- **Delete**: Delete order documents when the order is canceled by the client.


## Current State of the Application
We have implemented user registration, login, profile management, provider registration, order creation, and order management functionalities.

### Screenshots
1. **Login Screen** - Users can log in using email and password.
![login](https://github.com/user-attachments/assets/c0f98996-036a-4979-8ce1-4ca1236fe518)
2. **Signup Screen** - Users can create a new account
![signup](https://github.com/user-attachments/assets/ad0516b8-0606-4770-9c6e-f7241fd0340f)
3. **Profile Screen** - Users can view and update their personal information.
![profile](https://github.com/user-attachments/assets/224cce29-3f60-4511-90fb-348410dcde24)
4. **Search Screen** - Users can search on map(after we import map API) and check list of available petcare providers.
![search](https://github.com/user-attachments/assets/d31cc0ae-b9f5-4ee4-bd77-0dee955a00d2)
5. **Post Order Screen** - Users can view provider information and post their order.
![post order](https://github.com/user-attachments/assets/7a3ed268-cccc-4b90-8d84-ca9a870939c4)
6. **Provider Registration Screen** - Users can register as providers and offer services.
![petcare register](https://github.com/user-attachments/assets/ce271794-16bb-4103-a693-53e7ecaae170)
7. **Order Screen** - Users can view and manage orders.
![orders](https://github.com/user-attachments/assets/9b86fd11-e237-4a6e-92f8-3984aeaeb70d)
8. **Order Information Screen** - Users can view order details and cancel the order.
![order_info](https://github.com/user-attachments/assets/e0669105-d602-48fe-bac0-2fb1e146548e)
9. and providers can confirm or reject orders.
![order comfirm](https://github.com/user-attachments/assets/defc5b15-384a-4e90-ade5-8c32deb738af)


#### Contributions

- **Xin SUN**:
- 1. Search Screen:
     I developed the SearchScreen component to display a list of available providers.
     It uses Firestore to fetch provider data in real-time and updates the list accordingly.
     The screen is divided into two sections: a top section with a placeholder for a map and a bottom section
     that shows either a message when no providers are available or a FlatList of providers if they are present.
     The ProviderItem component is used to render each provider in the list."
     
  2. Post Order Screen:
     I created the PostOrderScreen component for placing orders.
     Users can view provider details, select a service request and breed, set a date, and submit the order.
     The component uses DropDownPicker for service and breed selection, DateTimePicker for date selection,
     and upon confirmation, writes the order data to the database and navigates back to the main screen.
     A cancel button is also provided to return to the main screen."
  
  3. Provider Registration Screen:
     I created the ProviderScreen component to manage provider profiles.
     It displays and updates user information like name, address, and email, along with toggles for experience and availability.
     It also allows users to select services they offer if they are open for work and handles submission to the database.
     
  4. Order Screen:
     I developed the OrderScreen component, which displays a list of orders.
     It fetches orders from Firebase Firestore, including user and provider details,
     and categorizes them as either 'post' or 'received.'
     Orders are displayed in a FlatList with a loading spinner while data is being fetched.
     The screen provides a visual distinction between different order types and statuses,
     and navigates to an order details screen when an item is selected."
     
  5. Order Information Screen:
     I created the OrderInfoScreen component to display detailed information about a specific order.
     It provides functionality for the current user to confirm or reject the order based on their role (provider or client).
     The screen shows relevant order details, such as client or provider information, request, and status.
     If the order is ongoing, providers can choose to confirm or reject it. The status is updated in Firebase Firestore,
     and the user is alerted of the update’s success."

- **Wanyi JIANG**:
- 1. Login Screen:
     The LoginScreen component provides a user interface for logging into the application.
     It includes fields for entering email and password, and a login button that authenticates users using Firebase.
     If login is successful, the user is navigated to the 'Main' screen.
     The component also handles errors, displaying appropriate alerts for different authentication issues,
     and provides a link to the signup screen for new users."
     
  3. Signup Screen:
     I created the SignupScreen component to handle user registration.
     It includes fields for email, password, and password confirmation.
     On form submission, it checks for matching passwords, then attempts to create a new user with Firebase Authentication.
     If successful, the user is navigated to the 'Main' screen; if not, appropriate error messages are displayed.
     The screen also provides a link to navigate to the login page for already registered users."
     
  4. Profile Screen:
     I created the ProfileScreen component to manage user profiles.
     It displays and allows editing of user details like name, address, and email.
     It retrieves and updates user data in Firebase. The component includes a 'Sign Out' button in the header for user logout.
     Validation checks ensure all fields are filled and the email format is correct before updating the profile.
     If sign out is successful, the user is navigated to the login screen."
  


