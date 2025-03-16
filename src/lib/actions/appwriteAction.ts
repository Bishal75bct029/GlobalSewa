'use server';

import { cookies } from 'next/headers';
import { client } from '@/app/appwrite';
import { Account, Databases, Users } from 'node-appwrite';

export async function createSessionClient() {
  const session = await cookies().then((data) => data.get('appwrite-session'));

  if (!session || !session.value) {
    throw new Error('No session');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  console.log('client part');
  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}
