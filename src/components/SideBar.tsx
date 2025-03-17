'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import PlaidLink from './PlaidLink';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

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
  const pathname = usePathname();
  const lastSegment = pathname.split('?')[0].split('/').filter(Boolean).pop();
  const [isActive, setisActive] = useState<string>(lastSegment ?? '/');

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4 mt-6">
        <Link href={'/'} className="flex gap-2 mb-[2.5rem] items-center px-4">
          <Image src="/icons/logo.png" width={34} height={34} className="max-xl:size-[2.5rem]" alt="Horizon logo" />
          <h1 className="sidebar-logo !text-[2rem]">GlobalSewa</h1>
        </Link>
        {navLinks.map(({ route, imagePath, label }, idx) => {
          return (
            <Link
              href={route}
              key={idx}
              onClick={() => setisActive(route)}
              className={cn('sidebar-link text-16', isActive.includes(route) && 'bg-bank-gradient')}
            >
              <Image
                src={imagePath}
                height={30}
                width={30}
                alt=""
                className={cn(isActive === route && 'brightness-[3] invert-0')}
              />
              <span className={cn('sidebar-label', isActive.includes(route) && '!text-white')}>{label}</span>
            </Link>
          );
        })}
        <PlaidLink user={user} />
      </nav>
      <Footer type="desktop" user={user} />
    </section>
  );
};

export default SideBar;
