# LightDisc
A mobile app used to GeoLocate and track the score of players that play LightDisc courses in local neighborhoods.

## How to Run (Locally)
* Clone the repo and run the following command in the root directory of the project:
    * `npx expo-cli start -c`
* Then press "i" to start iOS simulator (for local development)
* You can also scan the QR code that shows up to open the build in your Expo Go app (must install Expo Go app first)
    * Make sure your phone is on the same wifi as the laptop you are hosting the app on (Metro Bundler hosts when you run the above command)

# Tasks

## Completed
* Initial App setup (for iOS, Android, and eventually mobile)
* Authorized with Google Maps API and displays basic (static) Map view
* Initialize map to display current phone location
* Researched EAS and Free Provisioning
* Moved coordinate to be stored in JSON
* Implement basic routing using built in Expo Router (stack)

## Doing
* Create a page for tracking & displaying throws
* Refactor and break up Views/Components into separate files
  
## To-Do
* Update location on a configurable polling basis
* Create first Light Disc course (local and hardcoded)
* Add the concept of user profiles
* Remove .env from git track and move to eas.json
