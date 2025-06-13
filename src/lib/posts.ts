export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  date: string;
  author: string;
}

export const posts: Post[] = [
  {
    slug: 'deep-dive-into-ai-ethics',
    title: 'A Deep Dive into AI Ethics in Modern Technology',
    excerpt: 'Exploring the complex ethical landscape of artificial intelligence and its impact on society.',
    content: `Artificial intelligence (AI) is rapidly transforming our world, from automating mundane tasks to making groundbreaking discoveries. However, this powerful technology brings with it a host of ethical challenges that we must address.
    One of the primary concerns is algorithmic bias. AI models are trained on vast datasets, and if these datasets reflect existing societal biases, the AI can perpetuate and even amplify these prejudices. This can lead to unfair outcomes in areas like loan applications, hiring processes, and even criminal justice.
    Another critical issue is accountability. When an AI system makes a mistake, who is responsible? The developers, the users, or the AI itself? Establishing clear lines of responsibility is crucial, especially as AI systems become more autonomous.
    Privacy is also a major concern. AI often relies on collecting and analyzing large amounts of personal data. Ensuring this data is handled responsibly and that individuals' privacy rights are protected is paramount.
    Furthermore, the potential for AI to be used for malicious purposes, such as autonomous weapons or sophisticated disinformation campaigns, poses a significant threat to global security and stability.
    Addressing these ethical challenges requires a multi-faceted approach. We need robust regulatory frameworks, ongoing research into bias detection and mitigation, and a commitment to transparency and public discourse. By proactively tackling these issues, we can harness the immense potential of AI for good while minimizing its risks.`,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'abstract technology',
    date: '2024-07-15',
    author: 'Dr. Evelyn Reed',
  },
  {
    slug: 'future-of-responsive-design',
    title: 'The Future of Responsive Web Design in an AI Era',
    excerpt: 'How AI is shaping the next generation of adaptive and personalized user interfaces.',
    content: `Responsive web design has been a cornerstone of modern web development for years, ensuring seamless experiences across a multitude of devices. As we venture further into the AI era, the principles of responsive design are set to evolve in exciting new ways.
    AI can analyze user behavior, preferences, and contextual data in real-time to dynamically adjust layouts, content, and even functionality. Imagine websites that not only adapt to screen size but also to your current task, mood, or accessibility needs.
    Personalization at scale is one of AI's biggest promises for responsive design. Instead of one-size-fits-all breakpoints, AI could generate micro-adjustments to typography, color schemes, and information hierarchy tailored to individual users.
    Moreover, AI-powered tools can assist designers and developers in creating and testing responsive layouts more efficiently. Automated visual regression testing, intelligent component suggestions, and even AI-generated design variations could significantly speed up the development workflow.
    However, this integration also brings challenges. Ensuring that AI-driven adaptations don't compromise usability, accessibility, or user privacy will be critical. Designers will need to work closely with AI systems, guiding them with strong ethical principles and user-centric goals. The future of responsive design is not just about adapting to devices, but about adapting to people.`,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'web design',
    date: '2024-07-20',
    author: 'Marcus Chen',
  },
  {
    slug: 'short-article-test',
    title: 'A Very Short Article',
    excerpt: 'This article is very short to test summary generation context.',
    content: `This is a test. Short content. AI summary might not generate. One more sentence.`,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'testing concept',
    date: '2024-07-21',
    author: 'Test Author',
  },
  {
    slug: 'benefits-of-dark-mode',
    title: 'Unveiling the Benefits of Dark Mode in UI/UX',
    excerpt: 'Why dark themes are more than just a trend, offering tangible advantages for users.',
    content: `Dark mode has become a popular feature in applications and operating systems, and for good reason. Beyond its sleek aesthetic, dark themes offer several tangible benefits for user experience.
    Reduced eye strain, particularly in low-light environments, is one of the most cited advantages. Darker backgrounds with lighter text can be less glaring, making prolonged screen time more comfortable.
    Energy saving is another key benefit, especially for devices with OLED or AMOLED screens. These displays consume less power when displaying black or dark pixels, which can translate to longer battery life.
    Improved readability and focus can also be attributed to dark mode. For some users, light text on a dark background can enhance contrast, making content easier to read and reducing visual clutter, thereby helping to maintain focus on the task at hand.
    While dark mode isn't universally preferred and accessibility considerations for all users must be taken into account (e.g., for individuals with astigmatism), its growing adoption highlights its value in providing users with choice and a more comfortable digital experience.`,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'dark interface',
    date: '2024-07-22',
    author: 'Jane Doe',
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
