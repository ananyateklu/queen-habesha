# Queen Habesha Hair Salon

Welcome to Queen Habesha, Minneapolis's premier Ethiopian hair salon specializing in traditional Ethiopian and modern hair care techniques. Our website showcases our expertise in African hair care, braiding, and styling services.

## About Queen Habesha

Queen Habesha brings authentic Ethiopian hair care traditions to Minneapolis, offering:

- Traditional Ethiopian braiding and styling
- Natural hair care and treatments
- Expert care for all hair types and textures

## Features

### Core Components

- **Hero Section**: Dynamic landing page with animated content and call-to-action buttons
- **Hairstyle Gallery**: Interactive carousel showcasing various hairstyles with auto-advance
- **Services Showcase**: Comprehensive grid display of our service offerings
- **Team Profiles**: Meet our expert stylists with social media integration
- **Live Reviews**: Real-time Google Reviews integration with dynamic animations
- **Contact Information**: Interactive map and detailed business information
- **Responsive Navigation**: Smooth-scrolling menu with mobile optimization

### Technical Features

- Responsive design optimized for all devices
- Dynamic image loading and optimization
- Real-time Google Reviews integration
- Interactive Google Maps integration
- Smooth scroll navigation
- Modern UI animations and transitions
- SEO optimization with metadata
- Performance-optimized image loading
- Mobile-first design approach

## Tech Stack

### Core Technologies

- Next.js 13+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Google Maps API integration
- React Icons for visual elements

### Development Tools

- ESLint for code quality
- TypeScript for static typing
- Next.js built-in optimizations
- Image optimization via Next/Image

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Google Maps API key
- Google Places API key

### Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_PLACE_ID=your_google_place_id
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/queen-habesha.git
cd queen-habesha
```

1. Install dependencies:

```bash
npm install
# or
yarn install
```

1. Start development server:

```bash
npm run dev
# or
yarn dev
```

1. View the website at [http://localhost:3000](http://localhost:3000)

## Project Structure

```plaintext
src/
├── app/                 # Next.js 13 app directory
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── home/          # Home page components
│   └── layout/        # Layout components
└── styles/            # Global styles
```

## Key Components

### Home Page Components

- `Hero.tsx`: Landing section with animated content
- `Hairstyles.tsx`: Interactive hairstyle gallery
- `Services.tsx`: Services showcase grid
- `Crew.tsx`: Team member profiles
- `Testimonials.tsx`: Google Reviews integration
- `Contact.tsx`: Contact information and map

### Layout Components

- `Navbar.tsx`: Responsive navigation bar
- `Footer.tsx`: Site footer with contact info

## Development Notes

### Performance Optimizations

- Dynamic imports for heavy components
- Image optimization using Next/Image
- Lazy loading of Google Maps
- Optimized animations with Framer Motion

### SEO Considerations

- Meta tags configuration
- Semantic HTML structure
- Optimized image alt texts
- Mobile responsiveness

## Deployment

The project is optimized for deployment on Vercel:

```bash
npm run build
npm run start
```
