# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/db89fa16-7b4f-46b9-8b4a-3155ac9fe193

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/db89fa16-7b4f-46b9-8b4a-3155ac9fe193) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## AI Assistant (Chat)

- Frontend: Floating chat bubble (`src/components/chat/ChatBubble.tsx`) opens a panel (`src/components/chat/ChatPanel.tsx`).
- Backend: Azure Functions (SWA `/api`) at `api/chat/index.js` answers strictly from `api/knowledge/telelogic.json`.
- Logo: Replace `public/assistant-logo.svg` with your company logo (keep similar dimensions for best results).

Azure OpenAI (optional):
- Set environment variables in SWA App Settings to enable refinement:
	- `AZURE_OPENAI_ENDPOINT` (e.g., https://your-ai-resource.openai.azure.com)
	- `AZURE_OPENAI_DEPLOYMENT` (model deployment name, e.g., gpt-4o-mini)
	- `AZURE_OPENAI_API_VERSION` (default: 2024-10-01-preview)
	- `AZURE_OPENAI_API_KEY` (only if not using Managed Identity)

Knowledge base:
- Edit `api/knowledge/telelogic.json`. The assistant will only answer from this JSON; otherwise it returns a polite fallback.

Local dev (optional):
- Run the frontend (vite) and the functions in separate terminals or via SWA CLI if you prefer.

## Cookie consent banner

This project includes a styled cookie consent banner (`src/components/CookieConsent.tsx`) consistent with the shadcn/tailwind theme.

- It supports Accept and Decline actions and persists the choice in `localStorage` under `telelogic-cookie-consent`.
- Text is localized via the `LanguageContext` keys under `cookie.*`.
- Links to `Privacy` and `Terms` are wired to `/privacy` and `/terms` routes.

Customize:
- Update copy in `src/contexts/LanguageContext.tsx` (keys starting with `cookie.`).
- Styling can be adjusted in the component markup using tailwind classes.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/db89fa16-7b4f-46b9-8b4a-3155ac9fe193) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
