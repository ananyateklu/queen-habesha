import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Gallery from '@/components/home/Gallery';
import Crew from '@/components/home/Crew';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Gallery />
      <Crew />
      <Testimonials />
      <Contact />
    </main>
  );
}
