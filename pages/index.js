// import { Inter } from 'next/font/google'

import About from '../components/home/About';
import HeroSection from '../components/home/HeroSection';

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <HeroSection />
      <About />
    </div>
  );
}
