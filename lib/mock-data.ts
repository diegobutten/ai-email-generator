import type {
  EmailTemplate,
  EmailHistoryItem,
  FeatureItem,
  QuickActionChip,
} from "@/types/email";

export const templates: EmailTemplate[] = [
  {
    id: "job-application",
    title: "Job Application",
    description: "Introduce yourself and pitch your fit for an open role.",
    icon: "briefcase",
    emailType: "job-application",
  },
  {
    id: "sick-leave",
    title: "Sick Leave",
    description: "Let your manager know you need time off to recover.",
    icon: "thermometer",
    emailType: "sick-leave",
  },
  {
    id: "follow-up",
    title: "Follow-up",
    description: "Check in after a meeting, interview, or unanswered email.",
    icon: "rotate-cw",
    emailType: "follow-up",
  },
  {
    id: "business-proposal",
    title: "Business Proposal",
    description: "Pitch a partnership, deal, or new piece of work.",
    icon: "handshake",
    emailType: "business-proposal",
  },
  {
    id: "thank-you",
    title: "Thank You",
    description: "Show appreciation after an interview, meeting, or favor.",
    icon: "heart",
    emailType: "thank-you",
  },
  {
    id: "complaint",
    title: "Complaint",
    description: "Raise an issue clearly and ask for a resolution.",
    icon: "alert-triangle",
    emailType: "complaint",
  },
  {
    id: "invitation",
    title: "Invitation",
    description: "Invite someone to an event, call, or gathering.",
    icon: "calendar",
    emailType: "invitation",
  },
  {
    id: "recommendation",
    title: "Recommendation",
    description: "Vouch for a colleague, student, or collaborator.",
    icon: "star",
    emailType: "recommendation",
  },
  {
    id: "resignation",
    title: "Resignation",
    description: "Give notice and leave on a professional note.",
    icon: "log-out",
    emailType: "resignation",
  },
  {
    id: "customer-support",
    title: "Customer Support",
    description: "Respond to a customer question, issue, or request.",
    icon: "life-buoy",
    emailType: "customer-support",
  },
];

export const quickActions: QuickActionChip[] = [
  { id: "qa-professional", label: "Professional", tone: "professional" },
  { id: "qa-friendly", label: "Friendly", tone: "friendly" },
  { id: "qa-formal", label: "Formal", tone: "formal" },
  { id: "qa-casual", label: "Casual", tone: "casual" },
  { id: "qa-apology", label: "Apology", tone: "apologetic" },
  { id: "qa-follow-up", label: "Follow-up", emailType: "follow-up" },
  { id: "qa-meeting", label: "Meeting", emailType: "invitation" },
  { id: "qa-thank-you", label: "Thank You", emailType: "thank-you" },
  { id: "qa-job-application", label: "Job Application", emailType: "job-application" },
  { id: "qa-customer-support", label: "Customer Support", emailType: "customer-support" },
];

export const emailHistory: EmailHistoryItem[] = [
  {
    id: "h1",
    subject: "Interview Availability — Frontend Engineer Role",
    preview: "Thank you for considering my application. I'm available for an interview...",
    date: "2026-07-04",
    isFavorite: true,
    fullBody:
      "Hi Maria,\n\nThank you for considering my application for the Frontend Engineer role. I'm available for an interview any weekday afternoon this week or next.\n\nLooking forward to speaking with you.\n\nBest,\nJordan",
  },
  {
    id: "h2",
    subject: "Following Up: Marketing Partnership Proposal",
    preview: "I wanted to check in on the proposal I sent last week regarding...",
    date: "2026-07-02",
    isFavorite: false,
    fullBody:
      "Hi Sam,\n\nI wanted to check in on the proposal I sent last week regarding a co-marketing partnership. Happy to answer any questions.\n\nBest,\nAlex",
  },
  {
    id: "h3",
    subject: "Sick Leave — Out July 1st",
    preview: "I'm feeling unwell and won't be able to come into the office today...",
    date: "2026-06-30",
    isFavorite: false,
    fullBody:
      "Hi Team,\n\nI'm feeling unwell and won't be able to come into the office today. I'll check email periodically and follow up on anything urgent tomorrow.\n\nThanks,\nPriya",
  },
  {
    id: "h4",
    subject: "Thank You for the Opportunity",
    preview: "I really appreciated the chance to speak with your team about...",
    date: "2026-06-27",
    isFavorite: true,
    fullBody:
      "Hi Chris,\n\nI really appreciated the chance to speak with your team about the Product Designer role. It confirmed how excited I am about the opportunity.\n\nWarm regards,\nTaylor",
  },
];

export const features: FeatureItem[] = [
  {
    id: "f1",
    title: "AI Powered",
    description: "Draft polished, on-topic emails in seconds from a short prompt.",
    icon: "sparkles",
  },
  {
    id: "f2",
    title: "Multiple Tones",
    description: "Switch between professional, friendly, formal, or casual instantly.",
    icon: "sliders-horizontal",
  },
  {
    id: "f3",
    title: "Multi-language",
    description: "Generate emails in seven languages without leaving the page.",
    icon: "languages",
  },
  {
    id: "f4",
    title: "Email Templates",
    description: "Start faster with ready-made templates for common situations.",
    icon: "layout-template",
  },
  {
    id: "f5",
    title: "Copy in One Click",
    description: "Send the finished email straight to your clipboard.",
    icon: "copy",
  },
  {
    id: "f6",
    title: "Responsive Design",
    description: "A layout that feels native on desktop, tablet, and mobile.",
    icon: "smartphone",
  },
];
