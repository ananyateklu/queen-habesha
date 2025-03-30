# Queen Habesha Hair Salon

Welcome to Queen Habesha, Minnesota's premier Ethiopian hair salon specializing in traditional Ethiopian and modern hair care techniques. Our website showcases our expertise in African hair care, braiding, and styling services.

## About Queen Habesha

Queen Habesha brings authentic Ethiopian hair care traditions to Minneapolis, offering:

- Traditional Ethiopian braiding and styling
- Natural hair care and treatments
- Expert care for all hair types and textures

## Features

- **Hero Section**: Dynamic landing page with animated content and call-to-action buttons.
- **Hairstyle Gallery**: Interactive carousel showcasing various hairstyles with auto-advance.
- **Services Showcase**: Comprehensive grid display of our service offerings.
- **Team Profiles**: Meet our expert stylists with social media integration.
- **Live Reviews & Map**: Real-time Google Reviews integration and interactive Google Maps.
- **Contact Information**: Detailed business information alongside the map.
- **Responsive Design**: Optimized for all devices using a mobile-first approach with smooth-scrolling navigation.
- **Performance**: Optimized image loading (Next/Image), dynamic imports, and smooth animations (Framer Motion).
- **SEO**: Foundational SEO optimization with metadata and semantic HTML.

## Tech Stack

### Core Technologies

- Next.js 15.1 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Google Maps API & Places API integration
- React Icons for visual elements

### Development Tools

- ESLint for code quality
- npm/yarn for package management
- Git for version control

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
├── app/                 # Next.js 15 app directory
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

- **Optimizations**: Includes dynamic imports for heavy components (like Google Maps), optimized images via `Next/Image`, and efficient animations using Framer Motion.
- **Environment**: Requires Google Maps API key and Place ID set up in `.env.local`.
- **Code Quality**: Maintained using ESLint and TypeScript.
- **Structure**: Follows standard Next.js App Router conventions.

## Deployment

The project is optimized for deployment on Vercel:

```bash
npm run build
npm run start
```
