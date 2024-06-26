# LightDisc
A mobile app used to GeoLocate and track the score of players that play LightDisc courses in local neighborhoods.

## How to Run (Locally)
* Make sure you have NodeJS, npm, and nvm installed
    * Install NodeJS [here](https://nodejs.org/en/download/) which includes npm
    * Install NVM [here](https://sourceforge.net/projects/nvm-for-windows.mirror/) for controlling node versions
    * Restart/open a new terminal/bash instance to ensure $path updated
    * Run `node -v` and ensure it is version 16
        * If not, run `nvm install 16` and then `nvm use 16` of node
        * Rerun `node -v` and ensure it reads as `16.20 (will likely require another terminal/bash restart)
* Clone the repo and run the following command in the root directory of the project:
    * `npx expo-cli start -c`
    * It will likely ask you to install `expo-cli@6.3.10`, allow it to by confirming with `y`
    * This will likely occur with TypeScript dependencies, confirm as well
    * You will likely get an error about `react-native@0.72.6`, so run `npx expo-cli install react-native@0.72.6` to solve this
* Then press "i" to start iOS simulator (for local development) - **for MacOS only**
    * For development on Windows, and due to the fact that web development is currently bugged, testing can only be done by using the QR solution below
* You can also scan the QR code that shows up to open the build in your Expo Go app (must install Expo Go app first)
    * Make sure your phone is on the same wifi as the laptop you are hosting the app on (Metro Bundler hosts when you run the above command)

# Tasks

## Completed
* Initial App setup (for iOS, Android, and eventually webapp)
* Authorized with Google Maps API and displays basic (static) Map view
* Initialize map to display current phone location
* Researched EAS and Free Provisioning
* Moved coordinate to be stored in JSON
* Implement basic routing using built in Expo Router (stack)
* Refactor and break up Views/Components into separate files
* Add Golf Goal icon
* Write method to shred GPS data from JSON into Markers
* Big refactors with data flow, storage, and ScoreComponent
* Create a page for tracking & displaying throws
* Refactor MapComponent
* Make ScoreComponent page show chart of current scores
* Update ScoreComponent styling
* Add ability to store/read more course data in JSON file
* Research solutions for Version 2
* Removed save button and added reset button in Map Component
* Add stroke sum count on Score page
* Style MapComponent
* Adding check for isSimulator

## Doing
* Add display for distance to hole calculation

## To-Do
* Debug why buttons overlap or skew text (Add and Save)
* Refactor to using SQLite instead of asyncstorage
* Update location on a configurable polling basis
* Create first Light Disc course (local and hardcoded)
* Add the concept of user profiles
* Remove .env from git track and move to eas.json
### Live Tracking Module (Version 2)
* Use some sort of IOT device, attached to the disc
* Either Bluetooth (e.g. AirTag) or GPS (e.g. ?)
* Should be able to pair phone device to specific tracker (screen design tbd)
* Should be able to see device location in addition to phone's location
* Distance/direction display optional
### Live Creation Module (Version 3)
* Should be able to use App interface to create a new course to be saved
* Likely will require Cloud solution to store created maps, and ability to download/source them
* Easiest option is likely standing under (or pointing at) light post and tapping a button to add