// aiService.js

// -------------------
// Mock Bank (Fallback)
// -------------------
const mockBank = [
  { title: 'Set a consistent sleep window', icon: '🛏️', category: 'Sleep', image: 'https://source.unsplash.com/400x200/?sleep' },
  { title: 'Drink water before coffee', icon: '💧', category: 'Hydration', image: 'https://source.unsplash.com/400x200/?water' },
  { title: '10-minute brisk walk', icon: '🚶‍♂️', category: 'Movement', image: 'https://source.unsplash.com/400x200/?walking' },
  { title: 'Protein with every meal', icon: '🍳', category: 'Nutrition', image: 'https://source.unsplash.com/400x200/?protein' },
  { title: '2-minute box breathing', icon: '🧘', category: 'Mindfulness', image: 'https://source.unsplash.com/400x200/?meditation' },
  { title: 'Evening screen-light limit', icon: '📵', category: 'Sleep', image: 'https://source.unsplash.com/400x200/?sleep' },
  { title: 'Prep fruit/veg snack box', icon: '🫐', category: 'Nutrition', image: 'https://source.unsplash.com/400x200/?fruit' },
  { title: 'Post-lunch stretch break', icon: '🤸', category: 'Movement', image: 'https://source.unsplash.com/400x200/?exercise' },
  { title: 'Gratitude note at night', icon: '📓', category: 'Mindfulness', image: 'https://source.unsplash.com/400x200/?gratitude' },
  { title: 'Electrolytes after workout', icon: '🥤', category: 'Hydration', image: 'https://source.unsplash.com/400x200/?drink' }
];

// -------------------
// Few-Shot Examples
// -------------------
const fewShotShortTips = [
  { title: 'Morning hydration', icon: '💧', category: 'Hydration', image: 'https://source.unsplash.com/400x200/?water' },
  { title: '5-min meditation', icon: '🧘', category: 'Mindfulness', image: 'https://source.unsplash.com/400x200/?meditation' }
];

// -------------------
// Helpers
// -------------------
const ensureImage = (tip) => ({
  ...tip,
  image: tip.image ?? `https://source.unsplash.com/400x200/?${tip.category?.toLowerCase()}`
});

const getUseProxy = (ai) => ai.useProxy !== false;

const safeJSONParse = (text, fallback) => {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(fallback)) return Array.isArray(parsed) ? parsed : fallback;
    if (typeof fallback === 'object') return parsed && typeof parsed === 'object' ? parsed : fallback;
    return fallback;
  } catch {
    return fallback;
  }
};

// -------------------
// Prompt Builder
// -------------------
function buildPrompt(profile, mode, shortTip = null) {
  const basePrompt = `You are a health coach. Create ${
    mode === 'short' ? '5 concise wellness tips' : 'a detailed step-by-step explanation'
  } for a user:
- Age: ${profile.age ?? 'Unknown'}
- Gender: ${profile.gender ?? 'Unspecified'}
- Primary goal: ${profile.goal ?? 'General wellness'}

Guidelines:
- Positive, practical, evidence-informed.
- Avoid medical diagnoses; consult professionals if relevant.
`;

  const formatInstruction =
    mode === 'short'
      ? `Return JSON array of 5 items: {title, icon, category, image}. Title <= 8 words. Categories: Sleep, Nutrition, Movement, Mindfulness, Hydration, Recovery. Emoji optional. Image optional.`
      : `Return JSON object: {title, why, steps:[...], time_commitment, safety_note, image}. Max 6 actionable steps. Optional image.`;

  const fewShotExample = mode === 'short'
    ? `Example output:\n${JSON.stringify(fewShotShortTips, null, 2)}\n`
    : '';

  const chainOfThought = mode === 'detail'
    ? `Think step by step before giving final JSON. Explain why each step helps achieve the goal.\n`
    : '';

  return shortTip
    ? `${basePrompt}${formatInstruction}\n${fewShotExample}${chainOfThought}Tip to expand: ${JSON.stringify(shortTip)}`
    : `${basePrompt}${formatInstruction}\n${fewShotExample}${chainOfThought}`;
}

// -------------------
// AI API Caller
// -------------------
async function callAI(prompt, ai, useProxy = true) {
  const url = useProxy
    ? '/api/chat-completions'
    : ai.apiBase?.replace(/\/+$/, '') + '/chat/completions';

  const headers = { 'Content-Type': 'application/json' };
  if (!useProxy && ai.apiKey) headers['Authorization'] = `Bearer ${ai.apiKey}`;

  const body = useProxy
    ? JSON.stringify({ prompt, model: ai.model ?? 'gpt-4o-mini' })
    : JSON.stringify({
        model: ai.model ?? 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      });

  const res = await fetch(url, { method: 'POST', headers, body });
  if (!res.ok) throw new Error(`AI API error: ${res.status}`);
  return res.json();
}

// -------------------
// Mock Tips Generator
// -------------------
function getRandomMock(count = 5) {
  const shuffled = [...mockBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(ensureImage);
}

// -------------------
// Public Functions
// -------------------
export async function generateShortTips(profile, ai, setStatus) {
  const prompt = buildPrompt(profile, 'short');
  setStatus('Generating…');

  try {
    const data = await callAI(prompt, ai, getUseProxy(ai));
    const text = getUseProxy(ai) ? data.text ?? '[]' : data.choices?.[0]?.message?.content ?? '[]';
    const tips = safeJSONParse(text, getRandomMock());

    return { tips: tips.map(ensureImage), prompt };
  } catch (error) {
    console.warn('Short tips generation failed, using mock:', error);
    setStatus('Mock mode');
    return { tips: getRandomMock(), prompt };
  } finally {
    setStatus('Done');
  }
}

export async function generateDetail(profile, tip, ai, setStatus) {
  const prompt = buildPrompt(profile, 'detail', tip);
  setStatus('Generating…');

  try {
    const data = await callAI(prompt, ai, getUseProxy(ai));
    const text = getUseProxy(ai) ? data.text ?? '{}' : data.choices?.[0]?.message?.content ?? '{}';
    const detail = safeJSONParse(text, {
      title: tip.title,
      why: 'Supports your goal by improving daily habits with low effort.',
      steps: [
        'Pick a consistent time that fits your routine.',
        'Set a reminder and prepare in advance.',
        'Start small; increase weekly.',
        'Track completion with a simple checkmark.',
        'Review progress weekly.'
      ],
      time_commitment: '5–15 minutes/day',
      safety_note: 'If pain or discomfort occurs, stop and consult a professional.',
      image: `https://source.unsplash.com/400x200/?${tip.category?.toLowerCase()}`
    });

    return { detail: ensureImage(detail), prompt };
  } catch (error) {
    console.warn('Detail generation failed, using mock:', error);
    setStatus('Mock mode');
    return {
      detail: ensureImage({
        title: tip.title,
        why: 'Supports your goal by improving daily habits with low effort.',
        steps: [
          'Pick a consistent time that fits your routine.',
          'Set a reminder and prepare in advance.',
          'Start small; increase weekly.',
          'Track completion with a simple checkmark.',
          'Review progress weekly.'
        ],
        time_commitment: '5–15 minutes/day',
        safety_note: 'If pain or discomfort occurs, stop and consult a professional.',
        image: `https://source.unsplash.com/400x200/?${tip.category?.toLowerCase()}`
      }),
      prompt
    };
  } finally {
    setStatus('Done');
  }
}
