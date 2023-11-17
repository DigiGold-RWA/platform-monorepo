'use client';

import Link from 'next/link';
import Image from 'next/image';

export const Blogs = [
  {
    name: '8 reasons why you should  consider Gold in your Investment Portfolio',
    image: '/images/Body.png',
    alt: 'blog image',
  },
  {
    name: 'What is tokenized gold and why it is the future of owning gold?',
    image: '/images/gold-bars.png',
    alt: 'blog image',
  },
];

export const Services = [
  {
    title: 'Backed by Real World Asset',
    text: 'All our issued tokens are backed by 24 carat 99.9% pure Dubai Gold.',
  },
  {
    title: 'Audit report of our Asset',
    text: 'We work with an independent firm to audit or reserve and publish it monthly',
  },
  {
    title: 'Redeem physical Gold for your token',
    text: 'When you owe more than 1kg of 1 $DGold , you can redeem it as physical Gold',
  },
  {
    title: 'Build your Gold Investment Portfolio',
    text: 'Using Dollar Cost Average (DCA) Investment technique, start buying $DGold as low as $32 periodically',
  },
  {
    title: 'Gold are vaulted with a Custodian',
    text: 'All Gold are vaulted by an Internationally trusted custodian in the UAE',
  },
  {
    title: 'Zero Vaulting Fee',
    text: 'Our fees include a one time minting and burning fees. We also charge 0.1% for every transfers. See fees structure',
  },
  {
    title: 'Buy with a Card or Crypto',
    text: 'You can fund your wallet with $USDT to buy gold, from your  Card, Metamask, or Direct $USDT deposit.',
  },
  {
    title: 'Built on Klaytn Blockchain',
    text: '$DGOLD is tokenized on the Klaytn blockchain . DigiGold is supported by the Klaytn Foundation.',
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

export const Help = [
  { title: 'Launch a tokenized backed asset', value: 1 },
  { title: 'List $DGold on your wallet/exchange', value: 2 },
  {
    title:
      'Enable my customers to buy, sell and hold, or transfer digital assets',
    value: 3,
  },
  { title: 'Integrate $DGold to your app', value: 4 },
  { title: 'Settlement', value: 5 },
  { title: 'Access $DGold', value: 6 },
];
