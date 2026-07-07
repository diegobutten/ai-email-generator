export type EmailType =
  | "professional"
  | "follow-up"
  | "job-application"
  | "sick-leave"
  | "complaint"
  | "invitation"
  | "recommendation"
  | "resignation"
  | "customer-support"
  | "thank-you"
  | "business-proposal";

export type EmailTone =
  | "professional"
  | "friendly"
  | "formal"
  | "casual"
  | "apologetic"
  | "confident"
  | "persuasive";

export type EmailLength = "short" | "medium" | "long";

export type EmailLanguage =
  | "english"
  | "spanish"
  | "french"
  | "german"
  | "portuguese"
  | "filipino"
  | "japanese";

export interface EmailFormData {
  prompt: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  companyName?: string;
  emailType: EmailType;
  tone: EmailTone;
  language: EmailLanguage;
  length: EmailLength;
  additionalInstructions?: string;
}

export interface GeneratedEmail {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
}

export interface EmailHistoryItem {
  id: string;
  subject: string;
  preview: string;
  date: string;
  isFavorite: boolean;
  fullBody: string;
}

export interface EmailTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  emailType: EmailType;
}

export interface QuickActionChip {
  id: string;
  label: string;
  emailType?: EmailType;
  tone?: EmailTone;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type GenerationStatus = "idle" | "loading" | "success" | "error";
