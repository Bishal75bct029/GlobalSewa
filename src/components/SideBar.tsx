'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

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

const SideBar = () => {
  const pathname = usePathname();
  const [isActive, setisActive] = useState<string>('/');
  console.log(isActive, pathname, 'he');

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
        {navLinks.map((navLink, idx) => {
          return (
            <Link
              href={navLink.route}
              key={idx}
              onClick={() => setisActive(navLink.route)}
              className={cn('sidebar-link text-16', isActive === navLink.route && 'bg-bank-gradient')}
            >
              <Image
                src={navLink.imagePath}
                height={30}
                width={30}
                alt=""
                className={cn(isActive === navLink.route && 'brightness-[3] invert-0')}
              />
              <span className={cn('sidebar-label', isActive === navLink.route && '!text-white')}>{navLink.label}</span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default SideBar;
