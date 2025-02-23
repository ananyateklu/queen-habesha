# Queen Habesha Hair Salon

Welcome to Queen Habesha, Minneapolis's premier Ethiopian hair salon specializing in traditional Ethiopian and modern hair care techniques. Our website showcases our expertise in African hair care, braiding, and styling services.

## About Queen Habesha

Queen Habesha brings authentic Ethiopian hair care traditions to Minneapolis, offering:
- Traditional Ethiopian braiding and styling
- Natural hair care and treatments
- Modern coloring and styling techniques
- Expert care for all hair types and textures

## Website Features

- **Online Booking**: Easy appointment scheduling through our contact form
- **Service Showcase**: Detailed information about our hair care services
- **Expert Stylists**: Meet our experienced team of hair care professionals
- **Client Testimonials**: Real feedback from our satisfied clients
- **Location & Hours**: Interactive map and business hours
- **Responsive Design**: Perfect viewing on all devices
- **Smooth Navigation**: Easy access to all sections
- **Modern Animations**: Beautiful transitions and effects

## Technical Implementation

### Tech Stack
- Next.js 13+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- React Slick for testimonial carousel
- Google Maps API for location
- React Icons for visual elements

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/queen-habesha.git
cd queen-habesha
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Create a `.env.local` file and add:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Start development server:
```bash
npm run dev
# or
yarn dev
```

5. View the website at [http://localhost:3000](http://localhost:3000)

## Project Structure
```
queen-habesha/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── contact/         # Contact/booking page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/          # React components
│   │   ├── home/           # Home page sections
│   │   │   ├── Hero.tsx    # Hero section
│   │   │   ├── Services.tsx # Services section
│   │   │   ├── Crew.tsx    # Team members section
│   │   │   └── Testimonials.tsx # Client reviews
│   │   └── layout/         # Shared layouts
│   │       └── Navbar.tsx  # Navigation bar
│   └── styles/             # Additional styles
├── public/                 # Static assets
│   └── images/            # Website images
├── package.json           # Dependencies
└── README.md             # Documentation
```

## Image Requirements

The website requires the following images in the `public/images` directory:
- `hero-bg.jpg` (1920x1080px) - Salon interior or styling work
- `stylist-1.jpg` to `stylist-3.jpg` (600x800px) - Team member photos
- `testimonial-1.jpg` to `testimonial-4.jpg` (200x200px) - Client photos

## Development Notes

- Built with mobile-first responsive design
- Implements smooth scrolling navigation
- Features form validation for appointments
- Includes SEO optimization
- Uses modern animation effects
- Follows accessibility best practices

## Deployment

Deploy to Vercel with zero configuration:
```bash
npm run build
# or
yarn build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

