# Social Media Performance Analysis Tool By ScriptDev Team for LevelSuperMind Hackathon

## Overview
The Social Media Performance Analysis Tool is a web application designed to help users analyze social media data efficiently. It enables comparison of post types (images, videos, carousels, etc.) to provide actionable insights on engagement metrics like likes, comments, and shares.

This project leverages cutting-edge technologies including:
- **LangFlow** for building an AI agent powered by GPT-4 and WorkFLow
- **DataStax Astra DB** for scalable and efficient database management
- **React** for the frontend
- **Node.js** for the backend
### Feel free to visit our website at https://calm-grass-040f99400.4.azurestaticapps.net/
## Features
1. **Post Type Analysis:**
   - Compare the performance of different post types (e.g., static images vs. carousels).
   - View engagement metrics like average likes, comments, and shares.

2. **Engagement Dashboard:**
   - Visualize engagement data through bar charts and donut charts.
   - Gain insights into total and comparative engagement statistics.

3. **Real-Time AI Insights:**
   - Use natural language prompts to analyze data, powered by GPT-4 and LangFlow.
   - Example query: *"Compare the engagement rates of video posts versus image posts."*

4. **Additional Features:**
   - Download detailed PDF reports of the analysis.
   - Manage API keys through a user-friendly settings page.

---

## Project Setup: Workflow for Project Creation

### Prerequisites
1. DataStax Astra DB account
2. LangFlow installed for AI agent creation
3. Node.js and npm installed locally
4. React for frontend development

---

### Step 1: Setting Up the Database
1. Log in to your DataStax account and create a new database named `Social_Media_DB`.
   - Select AWS as the cloud provider and `us-east-2` as the region.
2. Once the database is initialized, use the CQL Console to:
   - Create a table with `CREATE TABLE` commands.
   - Populate the table with sample data using `INSERT INTO` commands.

---

### Step 2: Creating the LangFlow Agent
1. Open LangFlow and create a new flow named `Social Media Agent`.
2. Add the following components:
   - **Chat Input**: For user queries.
   - **Prompt**: To organize user questions and instruct the AI.
   - **AI Agent**: Connect this to GPT-4 for data processing and analysis.
3. Link the agent to the database using the Astra DB Tool with the appropriate application token.

---

### Step 3: Backend Configuration
1. Set up a Node.js server to:
   - Receive prompts from the frontend.
   - Route prompts to LangFlow via API.
   - Process responses and send them back to the frontend.
2. Securely store API keys in local storage.

---

### Step 4: Frontend Development
1. Build a React application with the following components:
   - **API Key Input Page**: For connecting to GPT-4.
   - **Prompt Page**: To submit analysis queries.
   - **Social Media Dashboard**: For visualizing engagement data.
2. Use charting libraries like Chart.js or D3.js for data visualization.

---

## Usage
1. Launch the web application and enter your ChatGPT API key.
2. Use the Prompt Page to enter queries for analysis.
3. View insights and visualizations on the Social Media Dashboard.
4. Download detailed reports or update API keys as needed.

---

## Technologies Used
- **LangFlow**: AI agent creation
- **DataStax Astra DB**: Scalable database
- **React**: Frontend framework
- **Node.js**: Backend server
- **ReChart.js**: Data visualization

---

## Screenshots
1. **API Key Input Page:**
   - Securely input and store your API key.

2. **Prompt Page:**
   - Enter natural language queries for data analysis.

3. **Engagement Dashboard:**
   - Visualize insights through detailed charts and analytics.

---
## Teams
1. Bhavik: https://github.com/BhavikPrajapati18
2. Rohit: https://github.com/rohitrath0d2
3. Sreedev: https://github.com/sreedevnair
4. Aman: https://github.com/JAmanOG (Me)
---
## Contributing
We welcome contributions to improve this project. To contribute:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Contact
For questions or feedback, please reach out to us at [jaman0120@example.com].

