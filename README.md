**Homy**

An Airbnb-style full-stack web application for creating, viewing, editing, and deleting property listings, complete with user authentication, reviews, and image uploads. Built with Node.js, Express, MongoDB (Atlas), EJS, and Bootstrap.

---

## 🚀 Live Demo

[Homy](https://homy-11lv.onrender.com)

---

## 📋 Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Database Seeding](#database-seeding)
* [Usage](#usage)
* [API Endpoints](#api-endpoints)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## ✨ Features

* **User Authentication**: Sign up, log in, and log out using Passport.js & session-based auth.
* **Property Listings**: Create, read, update, and delete listings (CRUD).
* **Image Upload**: Integration with Cloudinary for uploading and storing images.
* **Reviews**: Authenticated users can post, view, and delete reviews with star ratings.
* **Authorization**: Only listing owners can edit or delete their listings; only review authors can delete their reviews.
* **Responsive UI**: Built with Bootstrap for mobile-friendly designs.
* **Search & Filters**: Search bar with autocomplete and filters by location and price range.
* **Error Handling**: Centralized error handler with Joi-based input validation and custom ExpressError.
* **Session Store**: Sessions stored in MongoDB via `connect-mongo` for persistence.

---

## 🛠 Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB Atlas via Mongoose
* **Authentication**: Passport.js (passport-local)
* **Storage & Uploads**: Cloudinary, Multer
* **Templating**: EJS with ejs-mate
* **CSS Framework**: Bootstrap 5
* **Validation**: Joi
* **Session Management**: express-session & connect-mongo

---



<!-- Add screenshots of the homepage, listing page, new/edit forms -->



## 🏗 Getting Started

### Prerequisites

* Node.js (v14+)
* npm
* MongoDB Atlas account
* Cloudinary account

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/homy.git
   cd homy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env` and fill in your keys:

   ```bash
   cp .env.example .env
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

You should now see the app running at `http://localhost:3000`.

### Environment Variables

```env
# MongoDB Atlas connection
DB_URL=mongodb+srv://<USER>:<PASS>@cluster0.mongodb.net/homy

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Session secret\SESSION_SECRET=your_secret_here
```

### Database Seeding

Seed the database with sample listings:

```bash
node init/seed.js
```

---

## 👨‍💻 Usage

* Register a new account or log in.
* View all listings or search by location/price.
* Create new listings with image uploads.
* Edit/delete your own listings.
* Add and delete reviews on listings.

---

## 📡 API Endpoints

| Method | Path                              | Description                |
| ------ | --------------------------------- | -------------------------- |
| GET    | `/listings`                       | List all properties        |
| GET    | `/listings/new`                   | Render new listing form    |
| POST   | `/listings`                       | Create new listing         |
| GET    | `/listings/:id`                   | Show details for a listing |
| GET    | `/listings/:id/edit`              | Render edit form           |
| PUT    | `/listings/:id`                   | Update a listing           |
| DELETE | `/listings/:id`                   | Delete a listing           |
| POST   | `/listings/:id/reviews`           | Add a review to a listing  |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review            |

---

## ☁️ Deployment

Deployed on Render:

1. Connect GitHub repo.
2. Set **Environment Variables** on Render dashboard.
3. Deploy and access your URL.

---



## 🤝 Contributing

1. Fork it ([https://github.com/APD007/Homy/fork](https://github.com/APD007/Homy/fork))
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

---

