import type { EmailFormData, GeneratedEmail } from "@/types/email";

const subjectByType: Record<string, string> = {
  professional: "Regarding {topic}",
  "job-application": "Application for the {topic} Position",
  "sick-leave": "Sick Leave — Out Today",
  "follow-up": "Following Up: {topic}",
  "business-proposal": "Proposal: {topic}",
  "thank-you": "Thank You — {topic}",
  complaint: "Issue With {topic}",
  invitation: "You're Invited: {topic}",
  recommendation: "Recommendation for {topic}",
  resignation: "Notice of Resignation",
  "customer-support": "Re: {topic}",
};

const openingByTone: Record<string, string> = {
  professional: "I hope this email finds you well.",
  friendly: "Hope you're having a great week!",
  formal: "I trust this message reaches you in good health.",
  casual: "Hey — hope all's good on your end!",
  apologetic: "I want to start by apologizing for any inconvenience this may cause.",
  confident: "I'm reaching out because I believe this is worth your time.",
  persuasive: "I wanted to share something I think could genuinely help.",
};

const closingByTone: Record<string, string> = {
  professional: "Best regards,",
  friendly: "Cheers,",
  formal: "Yours sincerely,",
  casual: "Talk soon,",
  apologetic: "Thank you for your understanding,",
  confident: "Looking forward to your response,",
  persuasive: "I'd love to hear your thoughts,",
};

/** Pull a short topic phrase out of the free-text prompt for the subject line */
function extractTopic(prompt: string): string {
  const cleaned = prompt.trim().replace(/^write (a|an)\s+/i, "").replace(/\bemail\b/gi, "").trim();
  const words = cleaned.split(/\s+/).slice(0, 6).join(" ");
  return words || "Our Conversation";
}

function buildBody(data: EmailFormData): string {
  const opening = openingByTone[data.tone] ?? openingByTone.professional;
  const closing = closingByTone[data.tone] ?? closingByTone.professional;
  const greeting = data.recipientName ? `Hi ${data.recipientName},` : "Hi there,";
  const signOff = data.senderName || "Your name";
  const companyLine = data.companyName ? ` at ${data.companyName}` : "";

  const middleByLength: Record<string, string> = {
    short: data.prompt,
    medium: `${data.prompt}\n\nPlease let me know if you have any questions — happy to provide more detail whenever it's useful.`,
    long: `${data.prompt}\n\nTo give a bit more context: this is something I've thought through carefully, and I wanted to make sure the reasoning behind it was clear rather than just the ask itself. If anything here needs more detail or you'd like to jump on a call to discuss, I'm glad to make time.\n\nPlease let me know if you have any questions.`,
  };

  const middle = middleByLength[data.length] ?? data.prompt;
  const instructions = data.additionalInstructions
    ? `\n\n(Note: ${data.additionalInstructions})`
    : "";

  return `${greeting}\n\n${opening} ${middle}${instructions}\n\n${closing}\n${signOff}${companyLine}`;
}

export async function mockGenerateEmail(data: EmailFormData): Promise<GeneratedEmail> {
  // Simulate network + model latency
  await new Promise((resolve) => setTimeout(resolve, 1400 + Math.random() * 500));

  const topic = extractTopic(data.prompt);
  const subjectTemplate = subjectByType[data.emailType] ?? subjectByType.professional;
  const subject = subjectTemplate.replace("{topic}", topic.replace(/\b\w/g, (c) => c.toUpperCase()));

  return {
    id: `gen_${Date.now()}`,
    subject,
    body: buildBody(data),
    createdAt: new Date().toISOString(),
  };
}

export async function mockImproveEmail(current: GeneratedEmail): Promise<GeneratedEmail> {
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 400));
  return {
    ...current,
    id: `gen_${Date.now()}`,
    body: current.body.replace(
      /\n\n(Best regards|Cheers|Yours sincerely|Talk soon|Thank you for your understanding|Looking forward to your response|I'd love to hear your thoughts),/,
      "\n\nA quick recap of the key point above, tightened up for clarity, then the sign-off:\n\n$1,"
    ),
  };
}

export async function mockTranslateEmail(
  current: GeneratedEmail,
  language: string
): Promise<GeneratedEmail> {
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 400));
  return {
    ...current,
    id: `gen_${Date.now()}`,
    subject: `[${language}] ${current.subject}`,
    body: `(Translated to ${language})\n\n${current.body}`,
  };
}
