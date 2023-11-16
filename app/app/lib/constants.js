"use client";

import Link from "next/link";
import Image from "next/image";


export const Distilleries = [
  {
      name: "North British",
      soldFor: "£5,250",
      percentageReturn: "15.12%",
      heldFor: "434 days",
  },
  {
      name: "Deanston",
      soldFor: "£3,772.15",
      percentageReturn: "13.81%",
      heldFor: "534 days",
  },
  {
      name: "Glen Moray",
      soldFor: "£7,326",
      percentageReturn: "30.82%",
      heldFor: "534 days",
  },
  {
      name: "Bladnoch",
      soldFor: "£2,800",
      percentageReturn: "16.33%",
      heldFor: "894 days",
  },
  {
      name: "Aultmore",
      soldFor: "£4,754.55",
      percentageReturn: "36.28%",
      heldFor: "510 days",
  },
  {
      name: "Tullibardine",
      soldFor: "£5,500",
      percentageReturn: "21.94%",
      heldFor: "568 days",
  },
];

export const Advert = [
  {
      header: "Own Tokens Backed by Real World Assets and Yield",
      soldFor: "£5,250",
      balance: "$25,000",
      coinHeld: " $DCask",
      text: "Each cask of whiskey cost an average of $4500. Digicask would fractionalize each barrel to 100 $DCask tokens, so you can start investing in whiskey for as low as $45. 1 $DCask token is 1 of 100 fraction of a whiskey cask.",
  },
];

export const Blogs = [
  {
      name: "Whisky Cask Investment Better than Gold",
      image: "/images/IMG_4448.png",
      alt: "blog image",
  },
  {
      name: "Whisky Cask offers Investors protection against volatility",
      image: "/images/IMG_4449.png",
      alt: "blog image",
  },
];

export const Investing = [
  {
      name: "Learn how to fund your wallet with $USDC by card.",
      address: "",
  },
  {
      name: "Learn how to deposit $USDC directly to your wallet.",
      address: "",
  },
];

export const Tiers = [
    {
      title: 'Tier 1',
      duration: '0 Months',
      id: 1,
    },
    {
      title: 'Tier 2',
      duration: '12 Months',
      id: 2,
    },
    {
      title: 'Tier 3',
      duration: '18 Months',
      id: 3,
    },
    {
      title: 'Tier 4',
      duration: '24 Months',
      id: 4,
    },
  ];

  export const menuLinks = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Exchange',
      href: '/exchange',
    },
    {
      label: 'Profile',
      href: '/profile',
    },
  ];