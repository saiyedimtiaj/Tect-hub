<div align="center">
  <h1>Tech Hub Website</h1>
</div>

# Tech Hub

## Introduction

TechShare is a full-featured social networking website similar to Facebook, designed for tech enthusiasts to share, connect, and engage. Users can sign up, create posts, interact with others' posts, follow each other, and access exclusive premium content. The platform also supports an admin role for managing users, posts, and monitoring overall platform statistics.

## Admin Account

```bash
   Email: admin@gmail.com
   password: admin123
```

## user Account

```bash
   Email: user@gmail.com
   password: user123
```

# Project Description

This project is a full-stack tech hub website where users can interact in a community through posting, liking, commenting, and sharing content. Premium users have access to exclusive content, and admins have control over platform management, user activity, and performance reports. The website includes comprehensive user profiles, a dashboard for admins, and membership features for exclusive content access.

# Features

### User Features:

- Home Page: Contains a banner, top posts, pricing card, and latest newsfeed.
- News Feed: Displays all posts with like, comment, share functionality. Users can download posts as PDFs.
- User Profile: Displays user information including the number of posts, followers, following, and the ability to update the profile. Users can follow each other.
- Search & Sorting: Users can search for posts and sort by relevance or date.
- Post Management: Users can create, like, comment, share, and delete posts. Premium users can create premium posts visible only to other premium members.
- Membership: Only premium users can access premium posts. Users can upgrade to a premium membership.
- Forgot Password: Users can recover their accounts via email.

### Admin Features:

- Admin Dashboard: Shows statistics like the total number of posts, revenue, and active users. Admin can view charts for the last six months of posts and memberships.
- User Management: Admin can view and block users.
- Post Management: Admin can monitor and manage all posts.

# Technology Stack

- Frontend:
  - Next js
  - Tanstack Query
  - ShadCN UI
  - Tailwind CSS
  - TypeScript
- Backend:
  - Node.js
  - Express
  - MongoDB (Mongoose)
  - JWT for Authentication

# Installation Guideline

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud-based)
- npm or yarn package manager

# Installation Steps

- Clone the repository:

```Bash
git clone https://github.com/saiyedimtiaj/Tech-Hub-Server
cd Owner avatar
Tech-Hub-Server
npm install
npm run dev
```

# Environment Variables

Create a .env file in the root directory with the following:

```Bash
NEXT_PUBLIC_BASE_API=server url
NEXT_STRIPE_PUBLISHABLE_KEY=stripe publish key
```
