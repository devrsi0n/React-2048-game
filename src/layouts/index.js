import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from '../components/Footer';

export default function Layouts() {
  return (
    <div>
      <Header />
      <Main />
      <footer style={{ width: '90vw', margin: 'auto' }}>
        <Footer
          name="devrsi0n"
          profileUrl="https://github.com/devrsi0n"
          repoUrl="https://github.com/devrsi0n/React-2048-game"
        />
      </footer>
    </div>
  );
}
