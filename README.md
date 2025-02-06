# GoalTracker

An AI-powered goal tracking application that transforms big ambitions into actionable daily micro-tasks, with persistent data storage and comprehensive progress analytics.

## Features

- 🎯 Break down large goals into manageable micro-tasks
- 🤖 AI-powered task generation using OpenAI GPT-4
- 📊 Visual progress tracking and analytics
- 📱 Responsive design for desktop and mobile
- 🗂️ Goal categorization (Career, Health, Education, Personal, Finance)
- ⏱️ Task completion tracking
- 📈 Progress visualization with charts

## Tech Stack

- **Frontend**
  - React with TypeScript
  - TanStack Query for data fetching
  - Recharts for data visualization
  - Tailwind CSS with shadcn/ui components
  - Wouter for routing

- **Backend**
  - Express.js
  - PostgreSQL with Drizzle ORM
  - OpenAI API integration

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=your_postgresql_database_url
OPENAI_API_KEY=your_openai_api_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/s2k14/goal-tracker.git
cd goal-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Push the database schema:
```bash
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Usage

1. **Creating a Goal**
   - Click "New Goal" in the navigation bar
   - Fill in the goal details including title, description, and category
   - Set a target date for completion
   - The AI will automatically generate initial micro-tasks

2. **Managing Tasks**
   - View tasks for each goal on the goal details page
   - Mark tasks as complete by clicking the checkbox
   - Track progress through the visual progress indicator

3. **Analytics**
   - Visit the Analytics page to view overall progress
   - See goal distribution by category
   - Track completion rates and trends

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
