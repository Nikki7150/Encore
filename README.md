# Encore

## Description
I am a chronic music listener and I love a good concert, even though I haven't been to many. But I normally get all my concert information from Instagram or other places ont he internet and I tend to forget them. And in cases where I dont forget them, I dont know where to get the tickets and when they go on sale. I keep having to go to Ticketmaster and other platforms to find the event, check when it goes on sale and manually save it to my calendar. Too much work right? 
So when I saw a reel, whilst searching for coding project ideas, that said we could use Ticketmaster API to create our own concert finder, I immediately got the ideas to make it such that I can keep track of all the events my music artists have in the future both through the app and then exporting the data for specific events to my calendar. 
I didn't know exactly how I was going to do that, so i pitched my idea to Claude and planned what APIs i would need and how I would add that calendar export. I only used Claude to get the basic file structure I would need to make this app a reality. Then I went into a tutorial rabbit hole to learn how to export events to calendar apps and started building. 
As a consumer, I know what struggles many people go through when searching for concerts and artists, So i made sure to make everything simple to use and yet stylishly customized so everyone could get around this app. 
I added features like following artists so you wouldn't have to search for the artist time and time again and just directly go to their profile and check what events they have in store at a glance. I also added saving events, both to the app so they are stored in a timeline so you dont forget which concert is coming next and I've added that calendar export for each event so you get a reminder whenever the event is live. 
I am super happy with the way this project flows and am also extremely proud of the UI I've created with all the color scheme matching what a concert would feel like. I hope you enjoy moving around this app. Have fun!

## Features
- As a guest user, without logging in, you can search up events and download the .ics files for any event you want. However, to get the full experience with saving events on app and following artists, you will have to login with an email.
- Signup using email, password, and username
- Login using email and password
- Live event search in "Explore" tab supporting both precise city-based search and broader keyword search across artists, venues, and event names
- Authentication system based on Firebase Auth
    - includes a full profile flow with username updates and password changes
- Save and follow system backed by Firestore, scoped by user
    - Saved events populate in "My Events" tab
    - Followed artists populate in the "Following" tab
- Calendar export by generating real .ics files client side so any event can be added to Google Calendar, Apple Calendar, or Outlook with no external api
    - open the downloaded file and it will take you to your calendar app on your device and ask to add the event into your calendar
- Personalized Home dashboard showcasing user's soonest upcoming saved events and followed artists at a glance
    - click on "See all" to see the full list.
- Fully functioning timeline in My Events that updates every time a new event is saved.
- Check all events of your followed artist through their artist card in Following tab

## Technologies used
- React
- Vite
- React Router
- Firebase Authentication
- Firebase Firestore
- Ticketmaster Discovery API

## Limitations
- No Google login or signup
- Cannot order tickets directly through this app - you have to click on "Get tickets" which will take you to the specific Ticketmaster page to but the tickets

## Future Plans
- Expand calendar export to also support writiing into Google Calendar directly through its API
- Add Google login and signup
- Add genre and date-range filtering for search results
- Add multiple-layer search to find specific event at specific city for specific artist
- Add multiple events Calendar export

## How to set up locally
### Prerequisites
- Node.js 18+
- A Firebase project (free tier is enough) with Authentication (Email/Password and Google Providers) and Firestore Database enables
- A Ticketmaster Discovery API consumer key (free)

### Setup
1. Clone the repo and install dependencies:
```bash
npm install
```
 
2. Copy `.env.example` to `.env` and fill in your own values:
```bash
cp .env.example .env
```
 
```
VITE_TICKETMASTER_API_KEY=your_ticketmaster_consumer_key
 
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
 
Firebase config values are found in your Firebase project settings under **Project settings → General → Your apps → SDK setup and configuration**.
 
3. In the Firebase console, enable **Email/Password** and **Google** under **Authentication → Sign-in method**, and create a **Firestore Database**.
4. Publish the following Firestore security rules (**Firestore Database → Rules**), which scope all reads/writes to each signed-in user's own data:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
 
5. Start the dev server:
```bash
npm run dev
```
 
The app will be running at `http://localhost:5173`.

## Notes
- The Ticketmaster consumer key only needs Public APIs access - no consumer secret or OAuth setup is required for search
- .env is git-ignored; never commit any real API keys or Firebase config to version control
- Calendar exports generates `.ics` files entirely client side - no additional Google Calendar API setup is needed for that feature
