# Engage Meet 
![Deploy Status](https://github.com/aryaman-titan/engage-meet/actions/workflows/main.yml/badge.svg)


<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/><img src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>

> A cross-platform video calling software developed with react-typescript, material UI and express backend    

## Features

The Video app has the following features:

- [x] Video conferencing with real-time video and audio
- [x] Pre-join room for previewing audio/video configurations
### Flexible Configuration
- [x] Ability to change audio/video configuration in the meet
### Chat
- [x] Persistent chats which stay before & after the meet ends (part of the ADAPT feature)
- [x] Emojis support and auto-links
- [x] File-sharing with various media types
### Accessibility
- [x] Enable/disable camera
- [x] Mute/unmute mic
- [x] Keyboard shortcuts
- [x] Screen sharing
- [x] Pinning any participant

### Cross-platform
- [x] Compatible across all major browsers
- [x] Works across Android, iOS, Windows

### Real-time Indicators 
- [x] Dominant speaker indicator
- [x] Remote participant volume indicator
- [x] Network quality indicator

### Some bonus features
- [x] Screen recording
- [x] QuickChat: disappearing messages
- [x] File-sharing with various media types
- [x] Background blur
- [x] Custom virtual background of your choice 

### Demo

- Homescreen:

![Homescreen](./images/homescreen.png "Homescreen")

- Preview screen:

![Homescreen](./images/preview_screen.png "Preview Screen")

- Video Call:

![Homescreen](./images/video_app.png "Video Call")

- Virtual Background:

![Virtual Background](./images/virtual_bg.png "Virtual Background")

- Quick Chat:

![Quick Chat](./images/quick_chat.png "Quick Chat")

- Flexible Configuration:

![Flexible Configuration](./images/flexible_config.png "Flexible Configuration")
## Application of Agile Methodology
<br>
Microsoft and the Acehacker team kept various sessions for us to learn more about the work culture at Microsoft. We also learned about new technologies that have been developed by Microsoft and about the Agile Methodology. <br><br>

The <strong>Agile Scrum Methodology</strong> has heavily influenced my work in the past 1 month. 
Agile scrum methodology is a project management system that relies on incremental development. Each iteration consists of 2-4 sprints, where each sprint's goal is to build the most important features first and come out with a potentially deliverable product. <br>
Microsoft assigned us three sprints of 1-2 weeks each: <strong>Design, Build, and Adopt.</strong><br><br>
In the <strong>first two weeks</strong>, I made a basic MVP with all the minimum functionalities running, including wireframing.

In the <strong>third and fourth week</strong>, I worked on adding additional features to my web app, with the feedback received from mentors. Also I learned about CI/CD and integrated Github Actions with my project. <br>

In the <strong>last week</strong>, I ended up adding various additional features like virtual background and disappearing messages. Also had a hands-on experience on dockerizing my application and deploying it to production. <br><br>
## Prerequisites

You must have the following installed:

- [Node.js v12+](https://nodejs.org/en/download/)
## Build Instructions

Running the Web App on your Local System
--------------------------------

To run the web app in your local device, run the following commands in your terminal:-

Clone the GitHub repository into your local device by running the following command:
```bash
git clone https://github.com/aryaman-titan/engage-meet

cd engage-meet
```

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!

## To run the app in Docker

This project comes **Docker ready** out of the box. [Docker](https://www.docker.com/)
is a software container platform. A Docker image contains information on everything
required to make an app run. This self-contained system makes it extremely easy to
ensure that your app runs on any OS without worrying about the dependency compatibility.

Regardless of where it???s deployed, _your app will always run the same_ as long as
Docker is installed on the machine.

1. Install Docker: https://docs.docker.com/engine/installation/

2. Clone the repo and move into the directory (see above)
```bash
$ docker-compose up -d
```
Future Possible Functionalities
-------------------------------

1. [WIP] Collaborative Whiteboard
1. [WIP] Captions
