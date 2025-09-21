
import React, { StrictMode, useState, useEffect, useRef, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons ---
const FeatherIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-red-light"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
);
const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-red-light"><path d="M11 20A7 7 0 0 1 4 13V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M15.5 8.5c.3-1 .5-2.2.5-3.5a2 2 0 0 0-2-2h-1"></path><path d="M10 22s.5-1 2-3c1.5-2 2.5-4 2.5-6a4.5 4.5 0 0 0-4.5-4.5c-2.5 0-4.5 2-4.5 4.5 0 2 1 4 2.5 6 1.5 2 2 3 2 3z"></path></svg>
);
const DiamondIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-brand-red-light"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"></path></svg>
);
const StarIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);


// --- Reusable Animated Item for Scroll Animations ---
interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedItem = ({ children, delay = 0 }: AnimatedItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`animated-item ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Page Components ---

const LoadingScreen = ({ isExiting }: { isExiting: boolean }) => (
  <div className={`fixed inset-0 bg-brand-dark flex items-center justify-center z-50 transition-opacity duration-500 ${isExiting ? 'animate-fade-out' : 'opacity-100'}`}>
    <h1 className="text-5xl font-playfair text-brand-white animate-gentle-pulse">Softly</h1>
  </div>
);

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/80 backdrop-blur-sm">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-playfair font-bold text-brand-white">Softly</h1>
      <nav className="hidden md:flex space-x-8">
        <a href="#features" className="font-poppins text-brand-white hover:text-brand-red-light transition-colors">Features</a>
        <a href="#products" className="font-poppins text-brand-white hover:text-brand-red-light transition-colors">Products</a>
        <a href="#testimonials" className="font-poppins text-brand-white hover:text-brand-red-light transition-colors">Testimonials</a>
      </nav>
      <button className="px-6 py-2 bg-gradient-to-r from-brand-red-light to-brand-red-dark text-white font-poppins rounded-full hover:opacity-90 transition-opacity">
        Shop Now
      </button>
    </div>
  </header>
);

const Hero = () => (
  <section className="min-h-screen flex items-center justify-center text-center bg-gradient-to-b from-brand-dark via-brand-gray to-brand-dark px-6">
    <div>
      <h2 className="text-5xl md:text-7xl font-playfair font-bold text-brand-white leading-tight mb-4">
        Experience Unmatched <br /> <span className="text-brand-red-light">Softness &amp; Strength</span>
      </h2>
      <p className="font-poppins text-lg text-brand-white/80 max-w-2xl mx-auto mb-8">
        Discover the premium touch of Softly. Crafted for comfort, designed for life.
      </p>
      <a href="#products" className="px-8 py-4 bg-gradient-to-r from-brand-red-light to-brand-red-dark text-white font-poppins rounded-full hover:opacity-90 transition-opacity text-lg">
        Explore Collection
      </a>
    </div>
  </section>
);

const featuresData = [
    { icon: <FeatherIcon />, title: "Velvety Soft", description: "Our unique lotion-infused layers provide a gentle touch for sensitive skin." },
    { icon: <DiamondIcon />, title: "Remarkably Strong", description: "Engineered with 3-ply thickness for superior durability and absorbency." },
    { icon: <LeafIcon />, title: "Eco-Conscious", description: "Made from 100% responsibly sourced, biodegradable materials." }
];

const Features = () => (
  <section id="features" className="py-20 bg-brand-dark px-6">
    <div className="container mx-auto text-center">
      <h3 className="text-4xl font-playfair font-bold mb-12">Why Choose Softly?</h3>
      <div className="grid md:grid-cols-3 gap-10">
        {featuresData.map((feature, index) => (
          <AnimatedItem key={index} delay={index * 150}>
            <div className="bg-brand-gray p-8 rounded-lg h-full">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h4 className="text-2xl font-poppins font-semibold text-brand-white mb-2">{feature.title}</h4>
              <p className="font-poppins text-brand-white/70">{feature.description}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </div>
  </section>
);

const productsData = [
  { name: "Classic Comfort", price: "$4.99", image: "https://beeimg.com/images/h75406989731.jpg" },
  { name: "Aloe Vera Infused", price: "$5.99", image: "https://beeimg.com/images/m23869043112.jpg" },
  { name: "Family Pack", price: "$18.99", image: "https://beeimg.com/images/q43041298801.jpg" },
];

const Products = () => (
  <section id="products" className="py-20 bg-brand-gray px-6">
    <div className="container mx-auto text-center">
      <h3 className="text-4xl font-playfair font-bold mb-12">Our Products</h3>
      <div className="grid md:grid-cols-3 gap-10">
        {productsData.map((product, index) => (
          <AnimatedItem key={index} delay={index * 150}>
            <div className="bg-brand-dark rounded-lg overflow-hidden group">
              <img src={product.image} alt={product.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"/>
              <div className="p-6">
                <h4 className="text-2xl font-poppins font-semibold text-brand-white">{product.name}</h4>
                <p className="text-xl font-poppins text-brand-red-light mt-2">{product.price}</p>
              </div>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </div>
  </section>
);

const testimonialsData = [
  { name: "Sarah J.", quote: "Softly is a game-changer. I'll never go back to my old brand. The quality is just undeniable.", rating: 5 },
  { name: "Mike R.", quote: "The strength is what surprised me. It's soft, yes, but it doesn't fall apart. Great for a family with kids!", rating: 5 },
  { name: "Emily C.", quote: "I love that it's eco-friendly without compromising on luxury. It feels good to use and good to buy.", rating: 5 },
];

const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-brand-dark px-6">
    <div className="container mx-auto text-center">
      <h3 className="text-4xl font-playfair font-bold mb-12">What Our Customers Say</h3>
      <div className="grid md:grid-cols-3 gap-10">
        {testimonialsData.map((testimonial, index) => (
          <AnimatedItem key={index} delay={index * 150}>
            <div className="bg-brand-gray p-8 rounded-lg h-full flex flex-col justify-between">
              <p className="font-poppins text-brand-white/80 italic mb-6">"{testimonial.quote}"</p>
              <div>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => <StarIcon key={i} className="w-5 h-5 text-brand-red-light" />)}
                </div>
                <h4 className="text-xl font-poppins font-semibold text-brand-white">- {testimonial.name}</h4>
              </div>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-gray py-10 px-6">
    <div className="container mx-auto text-center font-poppins text-brand-white/60">
      <p>&copy; {new Date().getFullYear()} Softly. All Rights Reserved.</p>
      <p>Crafted with care for you and the planet.</p>
    </div>
  </footer>
);


// --- Main App Component ---
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsExiting(true); // Start fade-out animation
      setTimeout(() => setIsLoading(false), 500); // Remove from DOM after animation
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen isExiting={isExiting} />;
  }

  return (
    <div className="animate-fade-in">
      <Header />
      <main>
        <Hero />
        <Features />
        <Products />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
