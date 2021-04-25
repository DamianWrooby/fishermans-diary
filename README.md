# Fisherman's diary

Fisherman's Diary is a Next.js based web application dedicted to anglers. Users can save information about fish species, method, bait etc. by interactive map. It is possible also to display fish caught by society or display place of catch on map.

[Live demo](https://fishermans-diary.vercel.app/pl)

You can also retrieve all non-private catches of chosen user from the following endpoint:

```
/api/catches/[User_ID]
```

i.e.

```
https://fishermans-diary.vercel.app/api/catches/SdhsQ32h0bT0CM2hQhSHBnTyrVZ2
```

## Main goal

Create something like fullstack app with authentication and database.

## Why did I choose these technologies and tools?

- **Next.js**: gives a lot of possibilities - good performance and scaling as static site generator and also good SEO as SSR if you need
- **Firebase**: delivers backend solutions for those who wants to focus on frontend
- **Typescript**: becomes default choise in 2021
- **Tailwind.css nad Chakra UI**: I decided not focus on custom graphic design and try utility-first approach

## Upcoming features

- Fish rating
- Stats

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
