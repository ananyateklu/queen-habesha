'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 44.9688,
    lng: -93.2474
};

type FormData = {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
};

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({
        type: null,
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email) {
            setFormStatus({
                type: 'error',
                message: 'Please fill in all required fields.'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormStatus({
                type: 'error',
                message: 'Please enter a valid email address.'
            });
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setFormStatus({
                type: 'success',
                message: 'Thank you for your message. We\'ll get back to you soon!'
            });
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch {
            setFormStatus({
                type: 'error',
                message: 'Something went wrong. Please try again later.'
            });
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
                    <p className="text-xl text-gray-600">Get in touch with our expert stylists</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-lg shadow-lg p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                    Service Type
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                >
                                    <option value="">Select a service</option>
                                    <option value="Hair Styling">Hair Styling</option>
                                    <option value="Hair Treatment">Hair Treatment</option>
                                    <option value="Hair Coloring">Hair Coloring</option>
                                    <option value="Braiding">Braiding & Extensions</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                />
                            </div>

                            {formStatus.message && (
                                <div
                                    className={`p-4 rounded-md ${formStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
                                >
                                    {formStatus.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-yellow-600 text-white py-3 px-6 rounded-md hover:bg-yellow-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Information and Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Salon Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <FaMapMarkerAlt className="text-yellow-600 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-900">Address</h4>
                                        <p className="text-gray-600">123 Cedar Ave S</p>
                                        <p className="text-gray-600">Minneapolis, MN 55454</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <FaPhone className="text-yellow-600 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                                        <p className="text-gray-600">+1 (612) 555-0123</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <FaEnvelope className="text-yellow-600 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-900">Email</h4>
                                        <p className="text-gray-600">info@queenhabesha.com</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Hours</h4>
                                    <p className="text-gray-600">Tuesday - Saturday: 9:00 AM - 7:00 PM</p>
                                    <p className="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
                                    <p className="text-gray-600">Monday: Closed</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={15}
                                >
                                    <Marker position={center} />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact; 