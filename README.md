# ScribbleR ✏️

ScribbleR is a modern, web-based reimagining of the classic Nintendo DS game **PictoChat**. Featuring real-time chatrooms, a friends system, and responsive drawing capabilities, ScribbleR brings collaborative sketching into the browser.

## 🚀 Live Demo

👉 [Visit ScribbleR](https://scribbler.anthonysafatli.ca)

## 🧠 Features

- Real-time drawing and messaging with **SignalR**
- Unlimited chatrooms (room = any alphanumeric ID)
- Persistent user accounts with PostgreSQL
- Friends system for easy reconnection
- Fully containerized with **Docker**
- Built from scratch as a first full-stack app

## 🛠️ Tech Stack

- **Frontend**: React
- **Backend**: ASP.NET Core Web API
- **Realtime Communication**: SignalR
- **Database**: PostgreSQL
- **Containerization/Deployment**: Docker

## 📝 Getting Started

1. Go to [https://scribbler.anthonysafatli.ca](https://scribbler.anthonysafatli.ca)
2. Click **Sign In** and create an account using your email, username, and password
3. Enter any alphanumeric Room ID to join or create a room
4. Start drawing and chatting in real time!

### 🧰 Toolbar Guide

- **First Icon**: Select Mode — `Draw`, `Eraser`, or `Text`
- **Second Icon**: Choose Pen Color
- **Third Icon**: Adjust Pen Size

## 📚 What I Learned

This was my **first full-stack project**, and I learned a lot about:

- Using React for UI development
- Managing real-time communication with SignalR
- Working with PostgreSQL databases
- Dockerizing applications for deployment
- Full-stack architecture from the ground up

## 🔮 Future Plans

- ✨ Complete UI redesign with custom styling
- 💬 Chat History: Save and browse past messages
- 🧹 General polish and UX improvements

### Possible Enhancements

- 🔐 **Admin Mode**: Monitor users, sessions, and rooms
- 🏠 **Chatroom Controls**: Public/private rooms, invites, moderation tools
- 👥 **Better Friends System**: Enhanced friend interaction
- 🔑 **JWT Authentication**: Improve scalability/security (currently cookie-based)
