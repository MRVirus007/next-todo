import { Metadata } from 'next';
import ClientComponent from './client';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A Todo Application Create By MR',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientComponent>
        {children}
      </ClientComponent>
    </>
  );
}
