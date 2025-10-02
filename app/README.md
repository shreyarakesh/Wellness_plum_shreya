
<img width="754" height="154" alt="Screenshot 2025-10-02 at 7 24 36 pm" src="https://github.com/user-attachments/assets/e54ed895-e9f2-4bf8-978b-32b705b0e497" />




![WhatsApp Image 2025-10-02 at 19 24 50](https://github.com/user-attachments/assets/42a7c14d-1b39-4a37-b4e4-d252c8095eab)

<img width="793" height="67" alt="Screenshot 2025-10-02 at 7 26 05 pm" src="https://github.com/user-attachments/assets/95765e52-6ab7-4d3f-b203-d292b2282103" />
This project was developed as a solution to Problem Statement 3: AI-Generated Wellness Recommendation Board, which focuses on leveraging AI to promote healthier lifestyles through personalized digital experiences.
In today’s world, individuals are overwhelmed with general health advice from multiple sources, yet struggle to find tailored, actionable guidance that aligns with their age, lifestyle, and specific wellness goals. Modern wellness platforms often lack personalization, context awareness, and practical recommendations that users can easily adopt.
The AI-Generated Wellness Recommendation Board addresses this gap by combining user profile capture (age, gender, and primary goal such as sleep improvement, weight management, or stress reduction) with AI-generated health and wellness tips. These tips are concise, engaging, and safe, designed to encourage micro-habit changes rather than overwhelming users with complex medical information.
The solution is implemented as a web application using React + Vite (TypeScript) for the frontend. React provides a modular component-based architecture for smooth navigation and reusable UI, while Vite offers fast development and build performance. For state management, a React Context API is used, ensuring consistent data flow across multiple screens such as profile, tips board, detail view, and favorites.
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


1.	Profile Screen
o	Users begin by entering their age, gender, and primary wellness goal (e.g., weight management, improving sleep, boosting energy, stress reduction, or general wellness).
o	Advanced users can also configure optional AI settings, such as selecting a model or toggling between direct API access and the secure backend proxy.
o	This stage ensures that AI outputs are personalized and context-aware, rather than generic.
2.	Tips Board
o	Once the profile is saved, the application generates five concise wellness tips, displayed as scrollable, interactive cards.
o	Each card includes a short title, an icon/emoji representing the category (e.g., 🛏️ for sleep, 💧 for hydration, 🍳 for nutrition), and a category label (e.g., Sleep, Nutrition, Movement).
o	Users may regenerate the board to receive fresh suggestions, promoting exploration and diversity of recommendations.
o	A prompt preview option is also available, allowing transparency into the AI query used for generating tips, aligning with responsible AI practices.
3.	Detail View
o	Tapping on any tip card opens a detailed explanation view.
o	The AI provides a “why” section (explaining the relevance of the tip), along with step-by-step actionable advice (limited to 5–6 clear steps).
o	Additional metadata includes time commitment (e.g., “10 minutes/day”) and a safety note (e.g., “If discomfort occurs, consult a professional”), ensuring practicality and responsible use.
o	Users can save a tip directly from this screen for future reference.
4.	Favorites
o	Users can bookmark and manage favorite tips, which are stored locally via browser LocalStorage.
o	This persistence ensures that even after closing or refreshing the application, saved tips remain accessible.
o	A dedicated favorites screen provides a personalized wellness board, allowing users to curate their most relevant recommendations over time.

Modes of Operation:
•	Mock Mode (Offline Demo): Works without any API keys. The system generates tips from a pre-defined dataset, making it ideal for demonstrations, evaluations, or environments without internet connectivity.
•	Real AI Mode (with Proxy): When configured, the frontend communicates through a secure Node/Express proxy. The proxy handles API calls to OpenAI (or other compatible providers), ensuring that API keys are kept private and never exposed to the browser. This makes the app production-ready and secure for deployment.
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


