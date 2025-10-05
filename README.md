# 🌍 BeenThere – Social Travel Tracking App

BeenThere is a social travel app that turns your adventures into interactive stories shared on a world map.  
Simply tap on a country you’ve visited, mark it as *You've been there*, and see which of your friends have been there too.  
Each destination includes two ratings — one for **fun ❤️** and another for **security 🛡️**.  

You can upload travel photos, browse your friends’ trips, and share helpful travel tips.  
The **Friends Activity Feed** shows updates like *"John has been to Italy 5 days ago"* with photos and captions, creating a live feed of global adventures.  
BeenThere isn’t just about tracking where you’ve been — it’s about connecting with others through shared journeys.

---

## 🚀 Tech Stack

**Frontend (Mobile App):**
- React Native  
- Expo  
- JavaScript / TypeScript  
- Map integration (interactive world map)  

**Backend:**
- Java Spring Boot  
- Hibernate (Spring Data JPA)  
- PostgreSQL  
- Docker & Docker Compose  

---

## ⚙️ Features

- 🗺️ Interactive world map – mark visited countries  
- 👥 View friends who have been to selected destinations  
- ❤️🛡️ Dual rating system for “Fun” and “Security”  
- 📸 Upload and view trip photos  
- 💬 Share and read travel tips  
- 📰 Friends Activity Feed – recent trips with photos and descriptions  
- ⚙️ Settings section for profile editing, privacy, friends list, and account deletion  

---

## 🛠️ Backend Setup (Spring Boot + PostgreSQL)

1. Ensure **Docker Desktop** or **Docker Daemon** is running.
2. Ensure you're using Intelij Idea from Application.class
(In intelij open just the backend folder)
3. Navigate to the backend folder:
   ```bash
   cd backend
   docker-compose up
   ```
4. CLick on the green button next to the Application.calss to start the application
5. In case you need to restart:

   ```bash
   docker-compose down -v
   docker-compose up
   ```

## 📱 Install dependencies 
1. Install *expo go* app on your phone
> [!TIP]
> IOS system prefered on the mobile device.
3. Navigate to the Trippin folder and run:

   ```bash
   npm install
   npx expo start
   ```

   In case you use wsl:
   ```bash
   npx expo start --tunnel
   ```
4. Navigate to the expo go app on your mobile device and scan generated QR code.
> [!NOTE]
> Keep in mind that you have to be in the same network (mobile device and your laptop) to run the application.
> In Trippin/hooks/api.ts - baseURL has to be the same as the one under the generated QR code 

***Enjoy your travel!***
