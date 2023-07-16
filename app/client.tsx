
'use client';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { Provider } from 'mobx-react';
import store from './mobx/store';
import './globals.css';

Modal.setAppElement('body');

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Clean up the modal element when the component unmounts
    return () => {
      Modal.setAppElement('');
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      </Provider>
    </>
  );
}
