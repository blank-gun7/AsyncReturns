import { z } from "zod";

export const adServeQuerySchema = z.object({
  tool_type: z.enum(["TERMINAL", "VSCODE", "CURSOR", "OTHER"]).default("OTHER"),
  session_id: z.string().uuid(),
});

export const impressionRequestSchema = z.object({
  impression_token: z.string().min(1),
  duration_ms: z.number().int().min(5000),
  tool_type: z.enum(["TERMINAL", "VSCODE", "CURSOR", "OTHER"]).default("OTHER"),
  cli_session_id: z.string().min(1),
});

export const clickRequestSchema = z.object({
  impression_id: z.string().cuid(),
});

export const createCampaignSchema = z.object({
  name: z.string().min(1).max(100),
  ad_text: z.string().min(1).max(60),
  ad_icon: z.string().min(1).max(4),
  ad_color: z.string().regex(/^#[0-9a-fA-F]{3,8}$/),
  ad_url: z.string().url(),
  target_region: z.enum(["INDIA", "GLOBAL", "ALL"]).default("INDIA"),
  priority: z.number().int().min(0).max(100).default(0),
});

export const updateCampaignSchema = createCampaignSchema.partial().extend({
  status: z.enum(["ACTIVE", "PAUSED", "DRAFT"]).optional(),
});

export const purchaseBlocksSchema = z.object({
  campaign_id: z.string().cuid(),
  blocks: z.number().int().min(1).max(10000),
});

export const requestPayoutSchema = z.object({
  method: z.enum(["UPI", "PAYPAL", "WISE"]),
});

export const updatePaymentMethodSchema = z.object({
  payment_method: z.enum(["UPI", "PAYPAL", "WISE", "NONE"]),
  payment_details: z.record(z.string()).optional(),
});
