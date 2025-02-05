# Dental Pilot AI

Professional Clinical Assistant for Evidence-Based Dentistry

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_MISTRAL_API_KEY=your_mistral_api_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by the GitHub Actions workflow in `.github/workflows/deploy.yml`.

The site is accessible at: https://www.dentalpilotai.com