import type { EmailType, EmailTone, EmailLanguage, EmailLength } from "@/types/email";

export const emailTypeOptions: { value: EmailType; label: string }[] = [
  { value: "professional", label: "General / Professional" },
  { value: "job-application", label: "Job Application" },
  { value: "sick-leave", label: "Sick Leave" },
  { value: "follow-up", label: "Follow-up" },
  { value: "business-proposal", label: "Business Proposal" },
  { value: "thank-you", label: "Thank You" },
  { value: "complaint", label: "Complaint" },
  { value: "invitation", label: "Invitation" },
  { value: "recommendation", label: "Recommendation" },
  { value: "resignation", label: "Resignation" },
  { value: "customer-support", label: "Customer Support" },
];

export const emailToneOptions: { value: EmailTone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "apologetic", label: "Apologetic" },
  { value: "confident", label: "Confident" },
  { value: "persuasive", label: "Persuasive" },
];

export const emailLanguageOptions: { value: EmailLanguage; label: string }[] = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "portuguese", label: "Portuguese" },
  { value: "filipino", label: "Filipino" },
  { value: "japanese", label: "Japanese" },
];

export const emailLengthOptions: { value: EmailLength; label: string }[] = [
  { value: "short", label: "Short — 2-3 sentences" },
  { value: "medium", label: "Medium — a short paragraph" },
  { value: "long", label: "Long — fully detailed" },
];
