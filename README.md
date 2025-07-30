# Karthik's Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Showcasing my skills as a Full Stack Developer and ML Enthusiast.

## 🚀 Features

- **Modern Design**: Glassmorphism/neumorphism design with dark theme
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Smooth animations using Framer Motion
- **Interactive**: Hover effects, micro-animations, and smooth scrolling
- **SEO Optimized**: Proper meta tags and structured data
- **Fast Loading**: Optimized performance with Next.js
- **Contact Form**: Functional contact form with validation
- **Easter Egg**: Hidden console message for developers

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Email**: EmailJS (configurable)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Navigation.tsx      # Navigation bar
│   │   ├── Hero.tsx            # Hero section with typing animation
│   │   ├── About.tsx           # About section
│   │   ├── Skills.tsx          # Skills with animated progress bars
│   │   ├── Projects.tsx        # Project showcase
│   │   └── Contact.tsx         # Contact form and info
│   ├── lib/                    # Utility functions
│   └── styles/                 # Additional styles
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Design Features

- **Glassmorphism**: Translucent glass-like elements
- **Gradient Text**: Beautiful gradient text effects
- **Animated Progress Bars**: Skills section with animated progress
- **Hover Effects**: Interactive elements with smooth transitions
- **Mobile Menu**: Responsive hamburger menu
- **Smooth Scrolling**: Anchor link navigation
- **Loading States**: Form submission and loading animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the portfolio directory:
```bash
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

### Personal Information
Update the following files with your information:
- `src/app/layout.tsx` - Update metadata
- `src/components/Hero.tsx` - Update name and description
- `src/components/About.tsx` - Update about content
- `src/components/Skills.tsx` - Update skills and levels
- `src/components/Projects.tsx` - Update projects
- `src/components/Contact.tsx` - Update contact information

### Styling
- Colors: Update `tailwind.config.ts` for custom color schemes
- Animations: Modify `src/app/globals.css` for custom animations
- Layout: Adjust component styles in individual files

### Contact Form
To enable email functionality:
1. Sign up for EmailJS
2. Update the EmailJS configuration in `src/components/Contact.tsx`
3. Add your EmailJS service ID and template ID

## 🎯 Sections

### Hero Section
- Animated typing effect
- Gradient background with floating elements
- Call-to-action buttons
- Social media links

### About Section
- Personal introduction
- Feature cards with icons
- Journey description
- Skill badges

### Skills Section
- Categorized skills (Frontend, Backend, ML/AI, Tools)
- Animated progress bars
- Currently learning section
- Interactive skill levels

### Projects Section
- Project cards with GitHub integration
- Technology tags
- Star and fork counts
- Live demo links (when available)

### Contact Section
- Functional contact form with validation
- Social media links
- What I'm looking for section
- Professional interests

## 🌟 Special Features

### Easter Egg
Open the browser console to see a hidden welcome message!

### Performance Optimizations
- Next.js Image optimization
- Lazy loading for components
- Optimized animations
- Minimal bundle size

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Other Platforms
The portfolio can be deployed to any static hosting service.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons

---

**Built with ❤️ by Karthik**

Connect with me:
- GitHub: [@ckarthik77](https://github.com/ckarthik77)
- Email: karthik@example.com 