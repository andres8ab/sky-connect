# Sky Connect - Airport Information

A modern web application for browsing and searching airports worldwide. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Browse paginated list of airports
- Search airports by name or code
- View detailed airport information
- Interactive map showing airport location
- Dark mode support
- Responsive design
- Search history
- Smooth animations and transitions

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- AviationStack API key

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sky-connect.git
   cd sky-connect
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:

   ```
   NEXT_PUBLIC_AVIATIONSTACK_API_KEY=your_api_key_here
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Leaflet](https://leafletjs.com/) - Maps
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Three.js](https://threejs.org/) - 3D animations
- [Tanstack](https://tanstack.com/) - Data management
- [Jest](https://jestjs.io/) - Testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Component testing

## Project Structure

```
sky-connect/
├── app/                    # Next.js app directory
│   ├── airport/           # Airport details page
│   ├── search/            # Airport search page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── constants/             # data constants
├── data/                  # data for components
├── hooks/                 # hooks for components
├── lib/                   # utils
├── services/              # API services
├── store/                 # Zustand store
├── types/                 # TypeScript types
└── __tests__/             # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
