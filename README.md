# Solar Power Innovation Limited - Admin Dashboard

A complete Next.js application with integrated admin dashboard for Solar Power Innovation Limited, featuring modern UI components and Convex backend integration.

## Features

### Main Website
- Modern, responsive design with Framer Motion animations
- Hero section with company branding
- About section highlighting services
- Product carousel showcasing solar equipment
- Contact information and company details
- Seamless navigation to admin dashboard

### Admin Dashboard
- **Dashboard Overview**: Key metrics and statistics
- **Analytics**: Revenue trends, order volumes, and customer growth
- **Order Management**: Track and manage customer orders
- **Customer Management**: Maintain customer database
- **Inventory Tracking**: Monitor stock levels and low stock alerts
- **Product Management**: 
  - Single products (panels, batteries, inverters, etc.)
  - Package deals (complete solar systems)
- **Quote Builder**: Create and manage customer quotes
- **Media Library**: Manage images, videos, and documents
- **Settings**: Company information and system configuration

### Technical Features
- **Next.js 14** with App Router
- **Convex** backend for real-time data
- **shadcn/ui** components with Tailwind CSS
- **TypeScript** for type safety
- **Responsive design** for all screen sizes
- **Style isolation** between main site and admin
- **Modern sidebar navigation** with collapsible states

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Convex account

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd solar-power-innovation
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up Convex:
\`\`\`bash
npx convex dev
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                          # Next.js app directory
│   ├── admin/                    # Admin dashboard routes
│   │   ├── analytics/           # Analytics page
│   │   ├── customers/           # Customer management
│   │   ├── dashboard/           # Main dashboard
│   │   ├── inventory/           # Inventory management
│   │   ├── media/               # Media library
│   │   ├── orders/              # Order management
│   │   ├── products/            # Product management
│   │   ├── quotes/              # Quote management
│   │   ├── settings/            # Settings page
│   │   └── layout.tsx           # Admin layout
│   ├── components/              # Main site components
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── admin/                   # Admin-specific components
│   └── ui/                      # shadcn/ui components
├── convex/                      # Convex backend
│   ├── schema.ts                # Database schema
│   ├── auth.ts                  # Authentication
│   ├── products.ts              # Product operations
│   ├── customers.ts             # Customer operations
│   ├── orders.ts                # Order operations
│   ├── quotes.ts                # Quote operations
│   └── inventory.ts             # Inventory operations
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
└── public/                      # Static assets
\`\`\`

## Database Schema

The application uses Convex with the following main tables:
- **users**: User authentication and roles
- **products**: Individual solar products
- **packages**: Complete solar system packages
- **customers**: Customer information and stats
- **orders**: Customer orders and tracking
- **quotes**: Price quotes and proposals
- **inventoryMovements**: Stock movement tracking
- **media**: File uploads and media library
- **settings**: Application configuration

## Key Features

### Admin Dashboard Navigation
- Collapsible sidebar with icon mode
- Responsive design for mobile and desktop
- Breadcrumb navigation
- Quick access to main website

### Product Management
- Single products (panels, batteries, inverters)
- Package deals with component lists
- Stock tracking and low stock alerts
- Category-based organization

### Order Processing
- Order status tracking (pending → processing → shipped → delivered)
- Customer information integration
- Item details and pricing
- Delivery date tracking

### Quote System
- Draft, send, accept/reject workflow
- Automatic quote numbering
- Validity period tracking
- Convert quotes to orders

### Inventory Management
- Real-time stock levels
- Low stock alerts
- Inventory movement tracking
- Stock adjustment capabilities

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables

\`\`\`bash
# Convex
CONVEX_DEPLOYMENT=your-convex-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-convex-url
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Solar Power Innovation Limited.

## Support

For support and questions, contact:
- Email: info@solarpower.ng
- Phone: +234 902 105 5672
- Address: SHOP 4 I.K UMAR AUDI OLD AIRPORT ROAD, AFTER BOMAS SUPERMARKET, MINNA, NIGER STATE.
\`\`\`

Now let's add the remaining UI components that are referenced:
