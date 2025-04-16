import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Hairstyles from '@/components/home/Hairstyles';
import Crew from '@/components/home/Crew';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Hairstyles />
      <Services />
      <Crew />
      <Testimonials />
      <Contact />

    </main>
  );
}
