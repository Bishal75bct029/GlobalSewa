'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import PlaidLink from './PlaidLink';

const navLinks = [
  {
    label: 'Home',
    route: '/',
    imagePath: '/icons/home.svg',
  },
  {
    label: 'My Banks',
    route: 'my-banks',
    imagePath: '/icons/dollar-circle.svg',
  },
  {
    label: 'Transaction History',
    route: 'transaction-history',
    imagePath: '/icons/transaction.svg',
  },
  {
    label: 'Payment Transfer',
    route: 'payment-transfer',
    imagePath: '/icons/money-send.svg',
  },
  // {
  //   label: 'Connect Bank',
  //   route: './',
  //   imagePath: '/icons/home.svg',
  // },
];

const SideBar = ({ user }: SiderbarProps) => {
  const [isActive, setisActive] = useState<string>('/');

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href={'/'} className="flex gap-2 mb-16 items-center px-4">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {navLinks.map(({ route, imagePath, label }, idx) => {
          return (
            <Link
              href={route}
              key={idx}
              onClick={() => setisActive(route)}
              className={cn('sidebar-link text-16', isActive === route && 'bg-bank-gradient')}
            >
              <Image
                src={imagePath}
                height={30}
                width={30}
                alt=""
                className={cn(isActive === route && 'brightness-[3] invert-0')}
              />
              <span className={cn('sidebar-label', isActive === route && '!text-white')}>{label}</span>
            </Link>
          );
        })}
        <PlaidLink user={user} />
      </nav>
    </section>
  );
};

export default SideBar;
