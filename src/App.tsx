import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AirScene from './components/AirScene';
import Works from './components/Works';
import Reg from './components/Reg';
import Terms from './components/Terms';
import Address from './components/Address';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useLenis } from './components/useLenis';
import { useReveal } from './components/useReveal';

export type Mode = 'private' | 'biz';

export default function App() {
  const [mode, setMode] = useState<Mode>('private');
  useLenis();
  useReveal('home');

  return (
    <>
      <a className="skip" href="#raboty">К содержанию</a>
      <Header mode={mode} setMode={setMode} />
      <main>
        <Hero mode={mode} setMode={setMode} />
        <Works />
        <AirScene mode={mode} />
        <Reg mode={mode} />
        <Terms mode={mode} setMode={setMode} />
        <Address />
        <Contact mode={mode} />
      </main>
      <Footer />
    </>
  );
}
