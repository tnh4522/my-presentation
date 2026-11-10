export type SlideAccent =
  | "cyan"
  | "amber"
  | "violet"
  | "gold"
  | "rose"
  | "emerald"
  | "indigo";

export interface SlideBullet {
  label?: string;
  text: string;
  subItems?: string[];
  highlight?: boolean;
  tone?: "default" | "success" | "danger" | "warning" | "accent";
}

export interface SlideData {
  id: number;
  act: string;
  actNumber: number;
  title: string;
  subtitle?: string;
  tag: string;
  accent: SlideAccent;
  bullets: SlideBullet[];
  visualPrompt: string;
  voiceover: string;
  voiceoverVi?: string;
  keyStat?: {
    label: string;
    value: string;
    sub: string;
  };
}

export const SLIDES: SlideData[] = [
  {
    id: 1,
    actNumber: 1,
    act: "Act I · The Mystery of Night",
    title: "Why Is the Night Sky Dark?",
    subtitle: "Olbers' Paradox & The Secret of Our Universe",
    tag: "Cosmic Presentation",
    accent: "cyan",
    bullets: [
      {
        text: "A simple question that confused scientists for 100 years.",
        highlight: true,
        tone: "accent",
      },
    ],
    visualPrompt:
      "Deep starry night sky over a quiet horizon, cinematic lighting.",
    voiceover:
      "Hello everyone. Today I want to talk about a very simple question: why is the sky dark at night? It sounds easy, but this question confused scientists for almost a hundred years. And the answer tells us something amazing about our universe.",
    voiceoverVi:
      "Xin chào mọi người. Hôm nay tôi muốn nói về một câu hỏi đơn giản: tại sao bầu trời đêm lại tối? Câu hỏi này từng làm các nhà khoa học bối rối suốt gần một trăm năm, và câu trả lời cho ta biết một điều tuyệt vời về vũ trụ.",
    keyStat: {
      label: "Scientific Mystery",
      value: "~100 Years",
      sub: "From simple question to modern cosmology",
    },
  },
  {
    id: 2,
    actNumber: 1,
    act: "Act I · The Mystery of Night",
    title: "A Simple Question",
    tag: "Observation vs. Theory",
    accent: "indigo",
    bullets: [
      {
        label: "What we see:",
        text: "A black sky with a few small stars.",
      },
      {
        label: "What astronomers saw:",
        text: "A real scientific problem.",
        highlight: true,
        tone: "warning",
      },
      {
        text: "Theory vs. Expectation did not match.",
        tone: "accent",
      },
    ],
    visualPrompt:
      "A silhouette of an astronomer looking up at a dark sky with a glowing question mark.",
    voiceover:
      "Look at the sky tonight. It is black, and we can see only a few stars. Most people never ask why. But for astronomers, this was a real problem. It did not fit their ideas.",
    voiceoverVi:
      "Hãy nhìn lên bầu trời tối nay: đen thẫm, chỉ có vài ngôi sao. Hầu hết chúng ta chưa bao giờ thắc mắc, nhưng với các nhà thiên văn, đây là một vấn đề thực sự vì nó không khớp với lý thuyết.",
    keyStat: {
      label: "Core Conflict",
      value: "Sight ≠ Theory",
      sub: "Everyday darkness hid a deep physics puzzle",
    },
  },
  {
    id: 3,
    actNumber: 1,
    act: "Act I · The Mystery of Night",
    title: "Heinrich Olbers (1823)",
    tag: "Historical Origin · 1823",
    accent: "amber",
    bullets: [
      {
        label: "Who:",
        text: "Heinrich Olbers, German astronomer.",
      },
      {
        label: "The 1823 Question:",
        text: '"If the universe has so many stars, why isn\'t the night sky bright?"',
        highlight: true,
        tone: "accent",
      },
      {
        text: "Known today as Olbers' Paradox.",
      },
    ],
    visualPrompt:
      "Vintage portrait of astronomer Heinrich Olbers next to a telescope and a starry backdrop.",
    voiceover:
      "In 1823, a German astronomer called Heinrich Olbers asked a smart question. If there are so many stars, why is the night sky not bright? We now call this Olbers' Paradox.",
    voiceoverVi:
      "Năm 1823, nhà thiên văn người Đức Heinrich Olbers hỏi: nếu vũ trụ có nhiều sao như vậy, tại sao bầu trời đêm không sáng? Câu hỏi này được gọi là Nghịch lý Olbers.",
    keyStat: {
      label: "Formulated In",
      value: "1823",
      sub: "Heinrich Wilhelm Matthias Olbers (Germany)",
    },
  },
  {
    id: 4,
    actNumber: 2,
    act: "Act II · The Logic of Infinity",
    title: "Olbers' Logic",
    tag: "Mathematical Balance",
    accent: "cyan",
    bullets: [
      {
        label: "Assumption:",
        text: "An endless number of stars, each as bright as our Sun.",
      },
      {
        label: "Distance vs. Quantity:",
        text: "Concentric shells of stars around Earth",
        subItems: [
          "Farther stars = Weaker light.",
          "Farther shells = Many more stars.",
        ],
      },
      {
        label: "Result:",
        text: "The two effects balance each other out!",
        highlight: true,
        tone: "accent",
      },
    ],
    visualPrompt:
      "Concentric rings of stars around Earth showing fewer close stars and many distant stars.",
    voiceover:
      "Think of a universe with endless stars. Each star is as bright as our Sun. Stars that are far away look weaker. But there are many more of them. So the two things are equal.",
    voiceoverVi:
      "Giả sử vũ trụ có vô số ngôi sao, mỗi sao sáng như Mặt Trời. Sao ở xa trông yếu hơn nhưng số lượng lại nhiều hơn rất nhiều, nên hai hiệu ứng này cân bằng nhau.",
    keyStat: {
      label: "Shell Brightness Law",
      value: "1/r² × r² = 1",
      sub: "Every shell adds the exact same total light",
    },
  },
  {
    id: 5,
    actNumber: 2,
    act: "Act II · The Logic of Infinity",
    title: "Every Direction Has a Star",
    tag: "Line of Sight Geometry",
    accent: "emerald",
    bullets: [
      {
        text: "Look in any direction → Your eyes must meet a star.",
        highlight: true,
        tone: "accent",
      },
      {
        label: "The Forest Analogy:",
        text: "Like standing in a dense forest—every line of sight hits a tree trunk.",
      },
    ],
    visualPrompt:
      "Split image comparing lines of sight in a dense forest of trees with lines of sight in a universe full of stars.",
    voiceover:
      "Look in any direction. If there are endless stars, you will meet a star at last. It is like standing in a forest. In every direction, you see a tree.",
    voiceoverVi:
      "Nhìn theo bất kỳ hướng nào, mắt bạn cuối cùng cũng gặp một ngôi sao, giống như đứng giữa rừng: hướng nào cũng thấy một cái cây.",
    keyStat: {
      label: "Line of Sight",
      value: "100% Hit Rate",
      sub: "No empty gaps in an infinite starry forest",
    },
  },
  {
    id: 6,
    actNumber: 2,
    act: "Act II · The Logic of Infinity",
    title: "The Sky Should Be Bright",
    tag: "Theoretical Prediction",
    accent: "gold",
    bullets: [
      {
        label: "In Theory:",
        text: "100% of the sky is covered by starlight.",
        highlight: true,
        tone: "warning",
      },
      {
        text: "Night should shine as brightly as the surface of the Sun.",
      },
      {
        text: "Darkness should not exist.",
      },
    ],
    visualPrompt:
      "A surreal illustration of a night landscape where the entire sky is blindingly bright golden-white with overlapping stars.",
    voiceover:
      "So, the whole sky should be full of stars. The night sky should be bright all the time. We should never see darkness. The idea looked perfect.",
    voiceoverVi:
      "Vì vậy về lý thuyết, cả bầu trời phải phủ kín sao và sáng rực mãi mãi. Lý thuyết trông thật hoàn hảo.",
    keyStat: {
      label: "Theoretical Sky",
      value: "5,500 °C Glow",
      sub: "Every point as bright as the Sun's surface",
    },
  },
  {
    id: 7,
    actNumber: 2,
    act: "Act II · The Logic of Infinity",
    title: "But Reality Is Different",
    tag: "Theory vs. Reality",
    accent: "amber",
    bullets: [
      {
        label: "Theory says:",
        text: "Bright forever.",
        tone: "warning",
      },
      {
        label: "Reality says:",
        text: "The night sky is dark.",
        tone: "accent",
      },
      {
        label: "Conclusion:",
        text: "One of them must be wrong!",
        highlight: true,
        tone: "danger",
      },
    ],
    visualPrompt:
      "High-contrast split screen: half blindingly bright sky (Theory), half pitch-black starry night (Reality).",
    voiceover:
      'But when we go outside at night, the sky is dark. This is a fact. The idea says "bright", but the real world says "dark". One of them is wrong.',
    voiceoverVi:
      "Nhưng ngoài đời, bầu trời đêm lại tối. Lý thuyết nói “sáng”, thực tế nói “tối”: một trong hai phải sai.",
    keyStat: {
      label: "Observed Sky",
      value: "Pitch Black",
      sub: "Direct contradiction with infinite static theory",
    },
  },
  {
    id: 8,
    actNumber: 2,
    act: "Act II · The Logic of Infinity",
    title: "A Shock for Astronomers",
    tag: "Scientific Crisis",
    accent: "violet",
    bullets: [
      {
        label: "Why was it shocking?",
        text: "Both pillars of reasoning held firm:",
        subItems: [
          "Astronomy logic = Correct ✅",
          "Mathematical proof = Correct ✅",
        ],
      },
      {
        text: "No obvious mistake → Scientists needed a brand-new explanation.",
        highlight: true,
        tone: "accent",
      },
    ],
    visualPrompt:
      "19th-century astronomers looking puzzled around a chalkboard full of geometry and star charts.",
    voiceover:
      "This surprised scientists. The idea was good in both astronomy and maths. They could not find a mistake. They needed a new answer.",
    voiceoverVi:
      "Điều này gây chấn động vì logic đúng cả về thiên văn lẫn toán học, không có lỗi rõ ràng. Các nhà khoa học cần một lời giải thích mới.",
    keyStat: {
      label: "Math & Geometry",
      value: "100% Valid ✅",
      sub: "If the math is right, the assumptions must be wrong",
    },
  },
  {
    id: 9,
    actNumber: 3,
    act: "Act III · The Failed Hypothesis",
    title: "First Idea: Dust and Gas",
    tag: "Early Hypothesis",
    accent: "indigo",
    bullets: [
      {
        label: "Hypothesis:",
        text: "Space is filled with cosmic dust and gas.",
      },
      {
        text: "Dust absorbs starlight + Light has a limited speed.",
      },
      {
        label: "Claim:",
        text: "Distant starlight is blocked before reaching Earth.",
        highlight: true,
        tone: "accent",
      },
    ],
    visualPrompt:
      "Distant glowing stars shining through a thick dark nebula cloud of cosmic dust toward Earth.",
    voiceover:
      "Some people said there is dust and gas in space. The dust and gas take the light. So light from very far stars cannot reach the Earth.",
    voiceoverVi:
      "Có người cho rằng bụi và khí trong không gian hấp thụ ánh sáng, nên ánh sáng từ những ngôi sao rất xa không bao giờ đến được Trái Đất.",
    keyStat: {
      label: "Proposed Shield",
      value: "Cosmic Dust",
      sub: "Interstellar clouds blocking distant starlight",
    },
  },
  {
    id: 10,
    actNumber: 3,
    act: "Act III · The Failed Hypothesis",
    title: "Why the Idea Fails ❌",
    tag: "Thermodynamics Counter-Proof",
    accent: "rose",
    bullets: [
      {
        label: "Law of Energy:",
        text: "Energy cannot just disappear.",
        highlight: true,
        tone: "danger",
      },
      {
        label: "Step 1:",
        text: "Dust absorbs starlight.",
      },
      {
        label: "Step 2:",
        text: "Dust gets hot.",
      },
      {
        label: "Step 3:",
        text: "Hot dust glows and radiates light to Earth!",
      },
      {
        label: "Verdict:",
        text: "The sky would still be bright.",
        tone: "warning",
      },
    ],
    visualPrompt:
      "Diagram showing starlight hitting a dust cloud, the cloud heating up and glowing bright red/white toward Earth.",
    voiceover:
      "But people soon said no to this idea. Energy cannot disappear. When dust takes starlight, it gets hot. Then it makes its own light. So the sky would still be bright.",
    voiceoverVi:
      "Ý tưởng này nhanh chóng bị bác bỏ: năng lượng không tự biến mất. Bụi hấp thụ ánh sáng sẽ nóng lên và tự phát sáng, nên bầu trời vẫn sáng.",
    keyStat: {
      label: "Conservation of Energy",
      value: "Dust Glows 🔥",
      sub: "Absorbed starlight re-radiates toward Earth",
    },
  },
  {
    id: 11,
    actNumber: 3,
    act: "Act III · The Failed Hypothesis",
    title: "A Stable, Infinite Universe?",
    tag: "Shattering the Old Model",
    accent: "violet",
    bullets: [
      {
        label: "The Old Assumption:",
        text: "The universe is stable, unchanging, and endless.",
      },
      {
        text: "If true → Night sky MUST be bright.",
        tone: "warning",
      },
      {
        text: "Since night is dark → Our picture of the universe is wrong.",
        highlight: true,
        tone: "danger",
      },
    ],
    visualPrompt:
      "A shattered glass sphere containing stars, symbolizing a broken model of a static universe.",
    voiceover:
      "Imagine a universe that never changes and never ends. In this universe, the night sky must be very bright. But the night is dark. So this idea of the universe is wrong.",
    voiceoverVi:
      "Nếu vũ trụ ổn định, không thay đổi và vô tận, bầu trời đêm phải rất sáng. Nhưng đêm lại tối, nên bức tranh này về vũ trụ có gì đó sai.",
    keyStat: {
      label: "Classical Model",
      value: "Broken ❌",
      sub: "Static + Infinite + Eternal cannot all be true",
    },
  },
  {
    id: 12,
    actNumber: 3,
    act: "Act III · The Failed Hypothesis",
    title: "The Birth of Olbers' Paradox",
    tag: "Definition of a Paradox",
    accent: "cyan",
    bullets: [
      {
        label: "What is a Paradox?",
        text: "Perfect logic leading to a result that contradicts reality.",
        highlight: true,
        tone: "accent",
      },
      {
        label: "Perfect Argument:",
        text: '"The sky is bright."',
        tone: "warning",
      },
      {
        label: "Visible Fact:",
        text: '"The sky is dark."',
        tone: "accent",
      },
      {
        text: "Time to rethink the cosmos!",
      },
    ],
    visualPrompt:
      'Bold typography "PARADOX" with an impossible optical illusion triangle floating in deep space.',
    voiceover:
      "This is Olbers' Paradox. A paradox is when good logic gives an answer that is not true in real life. Scientists had to think again.",
    voiceoverVi:
      "Nghịch lý là khi logic hoàn hảo dẫn đến kết quả trái với thực tế. Các nhà khoa học phải suy nghĩ lại.",
    keyStat: {
      label: "Paradox Structure",
      value: "Logic ↔ Fact",
      sub: "Forces a revolution in how we view space & time",
    },
  },
  {
    id: 13,
    actNumber: 4,
    act: "Act IV · Space, Time & A Beginning",
    title: "Answer 1 – Limited Stars",
    tag: "Possibility 01 · Finite Space",
    accent: "emerald",
    bullets: [
      {
        label: "Possibility 1:",
        text: "What if the universe has existed forever?",
      },
      {
        text: "Then the number of stars must be limited.",
        highlight: true,
        tone: "accent",
      },
      {
        text: "Space is NOT infinite → It must have an edge or boundary.",
      },
    ],
    visualPrompt:
      "A finite cluster of galaxies enclosed within a glowing spherical boundary surrounded by complete emptiness.",
    voiceover:
      "Here is the first answer. If the universe is very old, the number of stars cannot be endless. So space is not endless. It has an end.",
    voiceoverVi:
      "Nếu vũ trụ tồn tại mãi mãi thì số sao phải hữu hạn, nghĩa là không gian có ranh giới và không vô tận về kích thước.",
    keyStat: {
      label: "Option 1",
      value: "Finite Space",
      sub: "Limited number of stars with an outer boundary",
    },
  },
  {
    id: 14,
    actNumber: 4,
    act: "Act IV · Space, Time & A Beginning",
    title: "Answer 2 – Limited Time",
    tag: "Possibility 02 · Finite Age",
    accent: "amber",
    bullets: [
      {
        label: "Possibility 2:",
        text: "What if the number of stars is endless?",
      },
      {
        text: "Then the universe cannot be infinitely old.",
        highlight: true,
        tone: "warning",
      },
      {
        text: "Starlight from everywhere hasn't had enough time to reach us yet.",
      },
    ],
    visualPrompt:
      "A cosmic hourglass floating in space with glowing galaxies flowing through it like sand.",
    voiceover:
      "Here is the second answer. If there are endless stars, the universe cannot be endlessly old. If it were, the light from all stars would be here now. The sky would be bright. So the universe has an age.",
    voiceoverVi:
      "Nếu số sao là vô hạn thì vũ trụ không thể già vô tận, nếu không ánh sáng từ mọi nơi đã đến được chúng ta. Vậy tuổi của vũ trụ phải hữu hạn.",
    keyStat: {
      label: "Option 2",
      value: "Finite Time",
      sub: "The universe has a limited age (~13.8 billion years)",
    },
  },
  {
    id: 15,
    actNumber: 4,
    act: "Act IV · Space, Time & A Beginning",
    title: "The Universe Has a Beginning",
    tag: "Breakthrough Discovery",
    accent: "cyan",
    bullets: [
      {
        label: "Key Insight:",
        text: "The universe started at a specific point in time.",
        highlight: true,
        tone: "accent",
      },
      {
        text: "Light from the farthest stars is still traveling toward us.",
      },
      {
        text: "The dark night sky proves the universe is not eternal and unchanging.",
      },
    ],
    visualPrompt:
      "Beams of starlight racing through dark space toward Earth, not yet reaching the planet.",
    voiceover:
      "So the universe began at one time. It is not endlessly old. The light from the farthest stars is not here yet. The dark sky tells us: the universe is not forever and it does change.",
    voiceoverVi:
      "Vũ trụ phải có một khởi đầu; ánh sáng từ những ngôi sao xa nhất đơn giản là chưa đến nơi. Bầu trời tối cho ta biết vũ trụ không vĩnh cửu và bất biến.",
    keyStat: {
      label: "Speed of Light",
      value: "300,000 km/s",
      sub: "Distant starlight is still on its journey to Earth",
    },
  },
  {
    id: 16,
    actNumber: 4,
    act: "Act IV · Space, Time & A Beginning",
    title: "A Clue for the Big Bang",
    tag: "Modern Cosmology",
    accent: "gold",
    bullets: [
      {
        text: "Olbers' Paradox = The universe is dynamic, not stable.",
      },
      {
        label: "A foundational clue for the Big Bang Theory:",
        text: "Birth of the cosmos",
        highlight: true,
        tone: "warning",
        subItems: [
          "The cosmos began from a hot, dense state.",
          "The cornerstone of modern cosmology.",
        ],
      },
    ],
    visualPrompt:
      "A dramatic, glowing cosmic expansion representing the Big Bang evolving into stars and galaxies.",
    voiceover:
      "Olbers' Paradox shows that the universe does not stay the same. Later, it became a clue for the Big Bang theory. This theory says the universe began very hot and very small. It is the base of modern space science.",
    voiceoverVi:
      "Nghịch lý Olbers trở thành một manh mối quan trọng cho thuyết Vụ Nổ Lớn: vũ trụ bắt đầu từ trạng thái rất nóng và đặc, nền tảng của vũ trụ học hiện đại.",
    keyStat: {
      label: "Cosmic Origin",
      value: "The Big Bang",
      sub: "From a hot, dense state to stars & galaxies",
    },
  },
  {
    id: 17,
    actNumber: 5,
    act: "Act V · The Expanding Horizon",
    title: "An Expanding Universe",
    tag: "Accelerating Cosmos",
    accent: "violet",
    bullets: [
      {
        text: "The universe is expanding continuously.",
        highlight: true,
        tone: "accent",
      },
      {
        label: "Rule:",
        text: "Farther galaxy = Moving away faster.",
      },
      {
        text: "The expansion is speeding up → Leading to a lonely cosmic future.",
      },
    ],
    visualPrompt:
      "Spiral galaxies moving outward in all directions with glowing arrows showing increasing speed with distance.",
    voiceover:
      "The story goes on. Today we know that the universe is growing bigger. Galaxies that are far from us move away faster. And this is getting faster and faster.",
    voiceoverVi:
      "Ngày nay ta biết vũ trụ đang giãn nở: thiên hà càng xa thì càng chuyển động ra xa nhanh hơn, và sự giãn nở còn đang tăng tốc.",
    keyStat: {
      label: "Hubble's Rule",
      value: "Farther = Faster",
      sub: "Accelerating expansion stretches starlight",
    },
  },
  {
    id: 18,
    actNumber: 5,
    act: "Act V · The Expanding Horizon",
    title: "Light That Never Arrives",
    tag: "Beyond the Cosmic Horizon",
    accent: "rose",
    bullets: [
      {
        text: "Distant galaxies move away faster than the speed of light.",
        highlight: true,
        tone: "danger",
      },
      {
        text: "Their light can never reach Earth, no matter how long we wait.",
      },
      {
        text: "Forever hidden beyond our cosmic horizon.",
      },
    ],
    visualPrompt:
      'A boundary circle around Earth ("Observable Universe") with distant galaxies outside fading into redness and darkness.',
    voiceover:
      "Because of this, many far galaxies move away faster than light. Their light can never reach the Earth. We can wait a very long time, but it will not come. We can never see these parts of the universe.",
    voiceoverVi:
      "Vì thế nhiều thiên hà xa xôi lùi ra nhanh hơn tốc độ ánh sáng, nên ánh sáng của chúng không bao giờ đến được Trái Đất, dù chúng ta chờ bao lâu.",
    keyStat: {
      label: "Cosmic Horizon",
      value: "v > c",
      sub: "Space expands faster than light can cross it",
    },
  },
  {
    id: 19,
    actNumber: 5,
    act: "Act V · The Expanding Horizon",
    title: "What About Aliens? 🛸",
    tag: "Cosmic Isolation",
    accent: "emerald",
    bullets: [
      {
        text: "What if intelligent life lives in those ultra-distant galaxies?",
      },
      {
        text: "No light, no signals can ever cross that gap.",
        highlight: true,
        tone: "warning",
      },
      {
        text: "Forever unreachable → A possible reason we haven't found anyone yet.",
      },
    ],
    visualPrompt:
      "A lone radio telescope on Earth pointing into deep space toward a faint, unreachable distant galaxy.",
    voiceover:
      "Think about this. Maybe aliens live in those far galaxies. We can never see them. We can never get their light or their signals. Maybe this is one reason why we cannot find anyone.",
    voiceoverVi:
      "Nếu có người ngoài hành tinh ở những thiên hà đó, chúng ta sẽ không bao giờ nhận được ánh sáng hay tín hiệu của họ. Có lẽ đó là một lý do khiến ta chưa tìm thấy ai.",
    keyStat: {
      label: "Signal Reach",
      value: "Unreachable",
      sub: "Light & radio waves cannot cross the horizon gap",
    },
  },
  {
    id: 20,
    actNumber: 5,
    act: "Act V · The Expanding Horizon",
    title: "The Power of Human Thinking",
    tag: "Final Reflection",
    accent: "cyan",
    bullets: [
      {
        label: "Isaac Newton:",
        text: "A falling apple → Law of Gravity 🍎",
      },
      {
        label: "James Clerk Maxwell:",
        text: "A few equations → Electromagnetic Waves ⚡",
      },
      {
        label: "Heinrich Olbers:",
        text: "A dark night sky → The Universe Has a Beginning 🌌",
        highlight: true,
        tone: "accent",
      },
      {
        label: "Final Thought:",
        text: "Keep asking questions. Thank you for listening!",
        tone: "success",
      },
    ],
    visualPrompt:
      "Three clean icon cards showing an apple, mathematical wave equations, and a starry night sky.",
    voiceover:
      "From one simple question about the night sky, people found a big secret of the universe. Newton used a falling apple to find gravity. Maxwell used a few equations to find electromagnetic waves. Olbers used the dark sky to show that the universe has a beginning. Human thinking is great. Maybe one day we will find the last secret of the universe. Thank you for listening.",
    voiceoverVi:
      "Từ một câu hỏi đơn giản về bầu trời đêm, con người đã khám phá ra một bí mật sâu xa của vũ trụ. Newton dùng quả táo rơi, Maxwell dùng vài phương trình, còn Olbers dùng bầu trời tối để chỉ ra vũ trụ có một khởi đầu. Logic và trí tưởng tượng của con người thật đáng kinh ngạc. Cảm ơn mọi người đã lắng nghe.",
    keyStat: {
      label: "Human Curiosity",
      value: "Keep Asking ✨",
      sub: "Simple questions unlock the secrets of the cosmos",
    },
  },
];

export const ACTS = [
  { number: 1, title: "Act I · The Mystery of Night", slides: [1, 2, 3] },
  { number: 2, title: "Act II · The Logic of Infinity", slides: [4, 5, 6, 7, 8] },
  { number: 3, title: "Act III · The Failed Hypothesis", slides: [9, 10, 11, 12] },
  { number: 4, title: "Act IV · Space, Time & A Beginning", slides: [13, 14, 15, 16] },
  { number: 5, title: "Act V · The Expanding Horizon", slides: [17, 18, 19, 20] },
];
