import { LanguageProvider } from './contexts/LanguageContext';
import FloatingNav from './components/FloatingNav';
import HeroSection from './components/HeroSection';
import DetailsSection from './components/DetailsSection';
import RSVPSection from './components/RSVPSection';
import MessagesSection from './components/MessagesSection';
import Footer from './components/Footer';
import LanguageToggle from './components/LanguageToggle';
import FallingRoses from './components/FallingRoses';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <FallingRoses />
        <LanguageToggle />
        <FloatingNav />
        <FloatingMusicPlayer />
        <main>
          <HeroSection />
          <DetailsSection />
          <RSVPSection />
          <MessagesSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;