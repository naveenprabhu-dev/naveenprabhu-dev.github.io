import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import ChessSection from '@/components/ChessSection';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div id="home" className="min-h-screen relative selection:bg-neon-mint selection:text-white">
      <Navbar />

      <main className="relative z-10 pt-16">
        <Hero />

        {/* Futuristic Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30 my-10"></div>

        <Projects />

        {/* Futuristic Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-mint to-transparent opacity-30 my-20"></div>

        <ChessSection />

        {/* Futuristic Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30 my-20"></div>

        <BookingSection />
      </main>

      <Footer />
    </div>
  );
}
