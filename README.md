# Chat App

## Project description

A chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.

## The 5 Ws

1. Who—The users of the mobile chat app. These could be friends, family or other
   students on this course. Your codebase will be used by other developers working on
   the product.
2. What—A native chat app built with React Native, as well as all the relevant
   documentation.
3. When—Whenever users of your chat app want to communicate with each other.
4. Where—The app will be optimized for both Android and iOS devices. You will use
   Expo to develop the app and Google Firestore to store the chat messages.
5. Why—Mobile chat apps are among the most commonly downloaded and used apps
   in the world, so knowing how to build a chat app is an indispensable skill. The app
   will demonstrate your React Native development skills.

## User Stories

● As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
● As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
● As a user, I want to send images to my friends to show them what I’m currently doing.
● As a user, I want to share my location with my friends to show them where I am.
● As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
● As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## Key Features

● A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
● A page displaying the conversation, as well as an input field and submit button.
● The chat must provide users with two additional communication features: sending images
and location data.
● Data gets stored online and offline

## Technical Requirements

● The app must be written in React Native.
● The app must be developed using Expo.
● The app must be styled according to the given screen design.
● Chat conversations must be stored in Google Firestore Database.
● The app must authenticate users anonymously via Google Firebase authentication.
● Chat conversations must be stored locally.
● The app must let users pick and send images from the phone’s image library.
● The app must let users take pictures with the device’s camera app, and send them.
● The app must store images in Firebase Cloud Storage.
● The app must be able to read the user’s location data.
● Location data must be sent via the chat in a map view.
● The chat interface and functionality must be created using the Gifted Chat library.
● The app’s codebase must contain comments.

## Project dependencies

React Native, Expo, and Expo Go App

## Getting Started

To run this app locally, you'll need to follow these steps:

Clone this repository.

Set up Expo in your development environment:

Install Expo and Expo CLI, as this is the platform you’ll use to build your app;

```
npm install -g expo-cli
```

Install Expo Go app on your mobile device, so that you can test your app on your own mobile device;

Search for the Expo Go app in the relevant app store for your device (iOS or Android)

Create an Expo account.

## Prerequisites

Before installing Expo, ensure you have a suitable version of Node installed. At the time of writing, Expo only supports Node 16.. at max.

Node.js: Download and install Node.js. For this you can use the nvm tool https://github.com/nvm-sh/nvm

```
nvm install 16.19.0
nvm use 16.19.0
nvm alias default 16.19.0
```

Navigate to the chat-app directory and install all dependencies:

```
npm install
```

Initialize the app in your terminal:

```
npx expo start
```

Use the Expo Go App on your mobile device to check the UI
