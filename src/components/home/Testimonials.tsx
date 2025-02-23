'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Regular Client',
        image: '/images/testimonial-1.jpg',
        quote: 'Queen Habesha is the only salon I trust with my natural hair. Their expertise in African hair care is unmatched, and the results are always stunning.',
    },
    {
        name: 'Michael Chen',
        role: 'First-Time Client',
        image: '/images/testimonial-2.jpg',
        quote: 'I was amazed by their attention to detail and knowledge of different hair types. The braiding work they did was absolutely beautiful.',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Beauty Influencer',
        image: '/images/testimonial-3.jpg',
        quote: 'The stylists here are true artists. They combine traditional Ethiopian techniques with modern trends to create unique and gorgeous styles.',
    },
    {
        name: 'David Thompson',
        role: 'Wedding Client',
        image: '/images/testimonial-4.jpg',
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
                            <div key={index} className="px-4">
                                <div className="bg-white rounded-lg shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 relative">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-yellow-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <FaQuoteLeft className="text-yellow-200 text-4xl absolute -top-4 -left-2" />
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