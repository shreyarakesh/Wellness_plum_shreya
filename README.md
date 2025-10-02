
<img width="754" height="154" alt="Screenshot 2025-10-02 at 7 24 36 pm" src="https://github.com/user-attachments/assets/e54ed895-e9f2-4bf8-978b-32b705b0e497" />




![WhatsApp Image 2025-10-02 at 19 24 50](https://github.com/user-attachments/assets/42a7c14d-1b39-4a37-b4e4-d252c8095eab)

<img width="793" height="67" alt="Screenshot 2025-10-02 at 7 26 05 pm" src="https://github.com/user-attachments/assets/95765e52-6ab7-4d3f-b203-d292b2282103" />



This project was developed as a solution to Problem Statement 3: AI-Generated Wellness Recommendation Board, which focuses on leveraging AI to promote healthier lifestyles through personalized digital experiences.
In today’s world, individuals are overwhelmed with general health advice from multiple sources, yet struggle to find tailored, actionable guidance that aligns with their age, lifestyle, and specific wellness goals. Modern wellness platforms often lack personalization, context awareness, and practical recommendations that users can easily adopt.
The AI-Generated Wellness Recommendation Board addresses this gap by combining user profile capture (age, gender, and primary goal such as sleep improvement, weight management, or stress reduction) with AI-generated health and wellness tips. These tips are concise, engaging, and safe, designed to encourage micro-habit changes rather than overwhelming users with complex medical information.
The solution is implemented as a web application using React + Vite for the frontend. React provides a modular component-based architecture for smooth navigation and reusable UI, while Vite offers fast development and build performance. For state management, a React Context API is used, ensuring consistent data flow across multiple screens such as profile, tips board, detail view, and favorites.
To safeguard sensitive API keys and maintain best practices, the project also integrates a Node/Express backend proxy. The proxy securely handles communication with AI providers (such as OpenAI’s API), preventing the exposure of keys in the browser and allowing centralized configuration of models and request limits.
The application has been designed with mock mode for offline demos and real AI mode for production-ready deployments. This ensures evaluators, instructors, or users can interact with the system without needing API credentials, while still supporting real-world scenarios when connected to the backend proxy.
Ultimately, this project demonstrates how generative AI can be responsibly embedded in consumer-facing applications to provide trustworthy, personalized wellness guidance while maintaining a balance between usability, security, and scalability.







**STEPS FOLLOWED :**


**Clone the repository:**
git clone https://github.com/shreyarakesh/Wellness_plum_shreya.git
cd wellness-react-vite

**Install dependencies:**
npm install

**Run the app locally:**
npm run dev

Open your browser at the displayed local URL (default http://localhost:5173/



<img width="783" height="48" alt="Screenshot 2025-10-02 at 7 27 14 pm" src="https://github.com/user-attachments/assets/1cd2d7dd-926c-48ce-a86a-92fbd3576bd7" />



The AI-Generated Wellness Recommendation Board is designed as a multi-screen application that guides users through a seamless and engaging journey, from capturing their personal details to receiving tailored wellness recommendations.
The application flow consists of four main stages:
<img width="807" height="466" alt="Screenshot 2025-10-02 at 7 28 48 pm" src="https://github.com/user-attachments/assets/ee215784-bead-4b4d-be76-8bdb8530762e" />


1.	**Profile Screen**
o	Users begin by entering their age, gender, and primary wellness goal (e.g., weight management, improving sleep, boosting energy, stress reduction, or general wellness).
o	Advanced users can also configure optional AI settings, such as selecting a model or toggling between direct API access and the secure backend proxy.
o	This stage ensures that AI outputs are personalized and context-aware, rather than generic.
2.	**Tips Board**
o	Once the profile is saved, the application generates five concise wellness tips, displayed as scrollable, interactive cards.
o	Each card includes a short title, an icon/emoji representing the category (e.g., 🛏️ for sleep, 💧 for hydration, 🍳 for nutrition), and a category label (e.g., Sleep, Nutrition, Movement).
o	Users may regenerate the board to receive fresh suggestions, promoting exploration and diversity of recommendations.
o	A prompt preview option is also available, allowing transparency into the AI query used for generating tips, aligning with responsible AI practices.
3.	**Detail View**
o	Tapping on any tip card opens a detailed explanation view.
o	The AI provides a “why” section (explaining the relevance of the tip), along with step-by-step actionable advice (limited to 5–6 clear steps).
o	Additional metadata includes time commitment (e.g., “10 minutes/day”) and a safety note (e.g., “If discomfort occurs, consult a professional”), ensuring practicality and responsible use.
o	Users can save a tip directly from this screen for future reference.
4.	**Favorites**
o	Users can bookmark and manage favorite tips, which are stored locally via browser LocalStorage.
o	This persistence ensures that even after closing or refreshing the application, saved tips remain accessible.
o	A dedicated favorites screen provides a personalized wellness board, allowing users to curate their most relevant recommendations over time.

**Modes of Operation:**
•	**Mock Mode (Offline Demo)**: Works without any API keys. The system generates tips from a pre-defined dataset, making it ideal for demonstrations, evaluations, or environments without internet connectivity.
•	**Real AI Mode** (with Proxy): When configured, the frontend communicates through a secure Node/Express proxy. The proxy handles API calls to OpenAI (or other compatible providers), ensuring that API keys are kept private and never exposed to the browser. This makes the app production-ready and secure for deployment.
By combining these flows and modes, the application achieves a balance of usability, reliability, and security while offering a polished end-to-end user experience.





**SCREEN 1(LIGHT MODE)**
<img width="1141" height="897" alt="Screenshot 2025-10-02 at 7 21 17 pm" src="https://github.com/user-attachments/assets/42b6504b-e96c-4143-8729-ed21dc41928d" />

**SCREEN 1(DARK MODE)**
<img width="1144" height="924" alt="Screenshot 2025-10-02 at 7 29 53 pm" src="https://github.com/user-attachments/assets/d5693543-2f24-4eca-9844-172b37ac1303" />

**SCREEN 2(LIGHT MODE)**
<img width="1141" height="920" alt="Screenshot 2025-10-02 at 7 30 27 pm" src="https://github.com/user-attachments/assets/b0a17412-6f6e-4d95-a53c-8d625dfdf7fa" />

**SCREEN 2(DARK MODE)**
<img width="1144" height="923" alt="Screenshot 2025-10-02 at 7 31 44 pm" src="https://github.com/user-attachments/assets/588fded7-af6a-4ea9-abca-870dd56ac382" />

**SCREEN 3(LIGHT MODE)**
<img width="1149" height="916" alt="Screenshot 2025-10-02 at 7 32 30 pm" src="https://github.com/user-attachments/assets/4124f7e9-8fd0-430d-8a22-a0b9205a752b" />

**SCREEN 3(DARK MODE)**
<img width="1150" height="922" alt="Screenshot 2025-10-02 at 7 32 52 pm" src="https://github.com/user-attachments/assets/f15d14f0-92bc-4fc3-b214-06b3a9e3c227" />

**SCREEN 4(LIGHT MODE)**
<img width="1141" height="919" alt="Screenshot 2025-10-02 at 7 33 21 pm" src="https://github.com/user-attachments/assets/24959bfa-1eda-4908-9b89-4d3d5442a8bc" />


<img width="802" height="52" alt="Screenshot 2025-10-02 at 7 36 53 pm" src="https://github.com/user-attachments/assets/ba597e5a-091e-44a6-bdc3-048442b11f5e" />
The quality and clarity of prompts directly affect the consistency, reliability, and safety of AI-generated outputs. For this project, two distinct prompt templates were crafted: one for generating short, actionable tips (displayed as cards) and another for producing detailed explanations (shown in the detail view).
<img width="546" height="485" alt="Screenshot 2025-10-02 at 7 37 16 pm" src="https://github.com/user-attachments/assets/ba8ca4ae-bfac-44be-8898-cfc673c774e9" />



You are a health coach. Create 5 concise wellness tips for the following user:
- Age: {age}
- Gender: {gender}
- Primary goal: {goal}

Guidelines:
- Keep tone positive, practical, and evidence-informed.
- Avoid medical diagnoses or prescriptive treatment.
- Return a JSON array of 5 items. Each item must have: {title, icon, category}.
- Title should be ≤ 8 words for readability.
- Use simple emojis for icons to make tips engaging and easy to scan.
- Choose category from: Sleep, Nutrition, Movement, Mindfulness, Hydration, Recovery.
Purpose:
•	Keeps suggestions short and practical, ideal for display in card format.
•	Icons (e.g., 🛏️, 💧, 🍳) add quick visual recognition.
•	Categories enable tagging and filtering in the UI.

<img width="769" height="43" alt="Screenshot 2025-10-02 at 7 37 50 pm" src="https://github.com/user-attachments/assets/fa32ba17-1684-4550-a99b-ca5082b43c02" />
You are a health coach. Create a detailed explanation with numbered, step-by-step advice for the following user:
- Age: {age}
- Gender: {gender}
- Primary goal: {goal}

**Guidelines:**
- Keep tone encouraging, realistic, and evidence-informed.
- Avoid prescriptive medical instructions.
- Return a JSON object with fields: {title, why, steps:[...], time_commitment, safety_note}.
- Limit steps to a maximum of 6. Keep them concise and actionable.
- Include a "why" section explaining relevance to the user’s goal.
- Provide "time_commitment" (e.g., 10 minutes/day).
- Add a "safety_note" reminding users to consult professionals if discomfort occurs.

**Tip to expand: {shortTip as JSON}**
Purpose:
•	Expands a concise tip into contextualized guidance.
•	Adds “why” explanation to help users understand benefits.
•	Provides step-by-step micro-actions to make adoption easy.
•	Safety notes reinforce responsible AI use in health contexts.


<img width="788" height="46" alt="Screenshot 2025-10-02 at 7 38 22 pm" src="https://github.com/user-attachments/assets/dfc76e43-e2a4-4876-84fb-d75cb4bfcc35" />




**Strict JSON Enforcement**: Prompts explicitly instruct the model to returnstructured JSON, preventing invalid outputs that would break parsing.

**Length Control:** Titles are capped at 8 words for card readability, and steps are capped at 6 items to avoid overwhelming users.

**Category Constraint**: Restricting categories to a fixed set (Sleep, Nutrition, Movement, Mindfulness, Hydration, Recovery) ensures consistency and clarity in presentation.

**Tone Guidance**: The prompt specifies a positive, practical, evidence-informed tone, avoiding overly technical or prescriptive language.

**Safety Emphasis**: The safety_note field encourages safe practices and reminds users to seek professional advice when necessary.

**Iteration & Testing**: Early versions of the prompt produced verbose outputs; refinements included stronger instructions to maintain brevity, JSON compliance, and user-friendly language.

**Few-Shot Examples**: Included example tips and JSON structures in the prompt to guide the AI’s output, helping it produce consistent, predictable results.

**Chain-of-Thought Reasoning**: The AI is encouraged to “think step by step” when generating detailed instructions, ensuring that multi-step advice is logical and actionable.

**Output Validation Instructions**: Added instructions for the AI to self-check its JSON structure and truncate or correct fields if they exceed limits.

**User-Centric Framing**: Prompts explicitly remind the AI to focus on actionable, easy-to-follow advice tailored to the user’s profile.

**Brevity & Clarity**: Iteratively refined prompts to reduce verbosity, ensuring quick inspiration via cards while maintaining actionable depth in details.

**Error Recovery**: Designed prompts to gracefully handle missing or ambiguous user data, ensuring the AI still produces valid output.

**Future Extensibility**: Structured JSON format allows easy addition of new fields, categories, or metadata for analytics without breaking existing logic.

**Impac**t: This structured approach ensures AI outputs remain consistent, safe, user-friendly, and actionable, while balancing quick inspiration (cards) with deeper guidance (detailed steps).


<img width="800" height="62" alt="Screenshot 2025-10-02 at 7 41 54 pm" src="https://github.com/user-attachments/assets/788d8624-b601-41bf-a25a-e1542a06c03a" />



**Client-Server Separation:**
The project follows a client-server architecture:

**Frontend**: Built with React + Vite, responsible for UI rendering, state management, and user interactions.

**Backend:** Node.js + Express server acts as a proxy for AI calls and manages any sensitive operations, ensuring security and modularity.

**Frontend Structure:**

**UI Components**: Separate React components for each feature: TipsBoard, TipCard, TipDetail, ProfileForm, Favorites.

**State Management**: React Context (AppStateContext) maintains global state like user profile, AI configuration, tips, favorites, and UI preferences (dark mode).

**Services**: aiService.js handles AI API interactions and transforms responses into structured JSON.

**Styling**: CSS modules and global styles ensure consistent theming, including light/dark mode support.

**Animations**: framer-motion used for smooth transitions and card animations.

**Backend Structure:**

**Proxy Server**: Routes AI requests from the frontend, adds authentication, and manages rate limits.

**Environment Management**: Sensitive API keys and tokens are kept in .env files (not committed to GitHub).

**Scalability**: Modular endpoints allow easy addition of new AI features or analytics without breaking existing code.

**AI Integration:**

**Prompt Engineering**: Frontend sends structured prompts with strict JSON enforcement, category constraints, and safety notes.

**Few-Shot & Chain-of-Thought**: Backend and frontend prompts encourage stepwise reasoning and example-guided responses.

**Validation**: AI outputs are validated before rendering, ensuring consistent display and preventing malformed data.

**Routing & Navigation:**

Single-page navigation using component state rather than React Router (simpler for a card-based workflow).

Back-and-forth between tips board and detailed tip views handled via callbacks and conditional rendering.

**Impact**: This architecture ensures a modular, maintainable, and secure system, while keeping the user experience fast, interactive, and responsive.

<img width="598" height="445" alt="Screenshot 2025-10-02 at 7 43 52 pm" src="https://github.com/user-attachments/assets/cf8ef62c-2db8-4b2f-b56e-541ee74d14eb" />

<img width="768" height="50" alt="Screenshot 2025-10-02 at 7 44 34 pm" src="https://github.com/user-attachments/assets/ab235580-2a71-46a0-be12-c6004954f57f" />

<img width="790" height="667" alt="Screenshot 2025-10-02 at 7 44 47 pm" src="https://github.com/user-attachments/assets/2d1c6d9a-be9e-4333-86a2-58d2af4d85f2" />



**AI Response Reliability**

Issue: AI outputs may occasionally be malformed JSON, which can break parsing in the frontend.

Improvement: Add schema validation (e.g., Zod/JSON Schema) and a JSON repair step to gracefully handle malformed responses.

**Accessibility (A11y)**

Issue: Current UI has limited keyboard navigation and screen reader support.

Improvement: Add ARIA roles, ensure contrast compliance, and support full keyboard navigation.

**Internationalization (i18n)**

Issue: App is currently English-only.

Improvement: Add multi-language support using libraries like i18next and enable RTL language support.

**Data Persistence & Syncing**

Issue: Favorites and profile data are stored only in LocalStorage.

Improvement: Integrate with a backend database or cloud sync service (e.g., Firebase, MongoDB) to enable cross-device access.

**Offline Support**

Issue: App requires internet for AI responses.

Improvement: Convert into a PWA and cache static assets and mock AI responses for offline usage.

**Security Enhancements**

Issue: API keys are secured in the backend proxy, but advanced protections are missing.

Improvement: Add authentication, rate limiting, and logging for production environments.

**UI Theming & Customization**

Issue: App only supports dark mode by default.

Improvement: Add theme toggle, font size adjustments, and custom color palettes for personalization.

**BONUS WORK**

Dark Mode: Fully implemented dark mode throughout the app for better readability and modern UI.

Smooth Animations: Added subtle motion using Framer Motion for card transitions and tip expansions.

Favorites Feature: Users can save favorite tips and access them in a dedicated section.

Prompt Viewer: Users can inspect the AI prompt that generated the tips for transparency and experimentation.

Responsive Grid Layout: Tips board dynamically adjusts to screen size for mobile and desktop.
