# PawMatch 🐾
**Find your perfect pet match**

## Overview
PawMatch is a smart pet adoption platform that matches people with pets based on their lifestyle — not just appearance. Built as a final project during a degree in Information Systems and Business Administration.

## The Problem
People who want to adopt a pet struggle to find an animal that truly fits their lifestyle. The current adoption process is scattered, confusing, and not user-friendly.

## The Solution
A web platform that combines smart matching, an easy browsing experience, and a clear adoption process.

## Target Audience
- Young adults looking for companionship
- Families with children looking to adopt
- Busy people who want a simple adoption process

## Competitors & Differentiation
| Competitor | What's missing |
|---|---|
| Petfinder | No lifestyle matching, outdated UI |
| BarkBuddy | No adoption process, limited info |
| Adopt a Pet | No smart matching, confusing process |

**PawMatch differentiates by:** combining smart lifestyle-based matching with a modern, intuitive Tinder-style experience and a clear adoption process.

## Live Demo
🔗 https://pawmatch-project-gules.vercel.app

**Demo account:**
- Email: test@pawmatch.com
- Password: Test123456!

## Tech Stack & External Services
| Service | Type | Purpose |
|---|---|---|
| Supabase | Database + Auth + Storage | Database, authentication, avatar storage |
| Vercel | Hosting | Frontend deployment |
| React + Vite | Frontend Framework | UI and app logic |
| React Leaflet | Maps Library | Interactive Israel map with adoption organizations |
| Unsplash | Image API | Pet profile images |
| Vitest | Testing | Unit and integration tests (14/14 passing) |

## Database Schema (ERD)
![Database Schema - ERD](public/erd.png)

## Features
- 🔍 Browse 22 pets available for adoption
- ❤️ Like / Skip pets (Tinder-style)
- 🧠 Smart matching algorithm based on lifestyle quiz
- 📊 Dynamic match percentage per pet
- 🗺️ Interactive map of adoption organizations across Israel
- 👤 User profiles with avatar upload
- 📋 Submit adoption requests
- 🔐 Secure authentication with RLS policies

## Running Locally
```bash
git clone https://github.com/lirazEngadewo/pawmatch-project.git
cd pawmatch-project
npm install
# Add .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

## Tests
```bash
npm test        # Run all tests
npm run test:ui # Visual test dashboard
```
