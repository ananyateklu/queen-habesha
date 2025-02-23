'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const colorCombos = [
    { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    { bg: 'bg-rose-100', text: 'text-rose-600' },
    { bg: 'bg-purple-100', text: 'text-purple-600' },
    { bg: 'bg-blue-100', text: 'text-blue-600' },
    { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    { bg: 'bg-orange-100', text: 'text-orange-600' },
];

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Regular Client',
        quote: 'Queen Habesha is the only salon I trust with my natural hair. Their expertise in African hair care is unmatched, and the results are always stunning.',
    },
    {
        name: 'Michael Chen',
        role: 'First-Time Client',
        quote: 'I was amazed by their attention to detail and knowledge of different hair types. The braiding work they did was absolutely beautiful.',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Beauty Influencer',
        quote: 'The stylists here are true artists. They combine traditional Ethiopian techniques with modern trends to create unique and gorgeous styles.',
    },
    {
        name: 'David Thompson',
        role: 'Wedding Client',
        quote: 'They did an amazing job styling my entire wedding party. Everyone\'s hair looked perfect throughout the entire day and night.',
    },
];

const Testimonials = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section id="testimonials" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        What Our Clients Say
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600"
                    >
                        Hear from our valued clients
                    </motion.p>
                </div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="testimonials-slider"
                >
                    <Slider {...settings}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="px-4 pb-12">
                                <div className="bg-white rounded-[2rem] shadow-lg p-8 h-full border border-gray-100 hover:border-gray-200 transition-colors duration-300">
                                    <div className="flex items-center mb-6">
                                        <div className={`w-16 h-16 rounded-full ${colorCombos[index % colorCombos.length].bg} flex items-center justify-center mr-4 border border-current/20`}>
                                            <span className={`text-xl font-semibold ${colorCombos[index % colorCombos.length].text}`}>
                                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-yellow-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <FaQuoteLeft className="text-gray-200/50 text-4xl absolute -top-4 -left-2" />
                                        <p className="text-gray-600 italic relative z-10 pl-8">
                                            {testimonial.quote}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </motion.div>
            </div>

            <style jsx global>{`
        .testimonials-slider {
          padding-bottom: 3rem;
        }
        .testimonials-slider .slick-dots {
          bottom: -5px;
        }
        .testimonials-slider .slick-dots li button:before {
          color: #EAB308;
        }
        .testimonials-slider .slick-dots li.slick-active button:before {
          color: #CA8A04;
        }
      `}</style>
        </section>
    );
};

export default Testimonials; 