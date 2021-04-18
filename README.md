# Fisherman's diary

Fisherman's Diary is a Next.js based web application dedicted to anglers. Users can save information about fish species, method, bait etc. by interactive map. It is possible also to display fish caught by society or display place of catch on map.

## Main goal

Create something like fullstack app with authentication and database.

## Why did I choose these technologies and tools?

- **Next.js**: gives a lot of possibilities - good performance and scaling as static site generator and also good SEO as SSR if you need
- **Firebase**: delivers backend solutions for those who wants to focus on frontend
- **Typescript**: becomes default choise in 2021
- **Tailwind.css nad Chakra UI**: I decided not focus on custom graphic design and try utility-first approach

## Problems resolved

**Map component rerender** - map rerender resulted in displaying several maps so I had to make sure the map would only be rendered once. To achieve this, I passed proper custom props check function into React.memo().
**Rows sorting in non-english language** - data is stored in English so for correct alphabetical sorting in non-english language I decided to translate data on demand during sorting and then translate back to avoid mixing languages locally in component state
**Sorting by date** - to achieve correct sorting by date every catch has an additional timestamp field in the database

## Upcoming features

- Fish rating
- Ranking
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
