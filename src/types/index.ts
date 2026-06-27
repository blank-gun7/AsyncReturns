export type {
  UserRole,
  Region,
  CampaignStatus,
  PaymentMethod,
  PaymentProvider,
  BlockPurchaseStatus,
  PayoutStatus,
  ToolType,
  TargetRegion,
} from "@prisma/client";

export interface AdServeResponse {
  campaign_id: string;
  ad_text: string;
  ad_icon: string;
  ad_color: string;
  ad_url: string;
  impression_token: string;
  display_seconds: number;
}

export interface ImpressionRequest {
  impression_token: string;
  duration_ms: number;
  tool_type: string;
  cli_session_id: string;
}

export interface ImpressionResult {
  success: boolean;
  earned_usd: number;
}

export interface ClickRequest {
  impression_id: string;
}

export interface WalletSummary {
  balance_usd: number;
  lifetime_earned_usd: number;
  pending_usd: number;
  payment_method: string;
}

export interface CampaignSummary {
  id: string;
  name: string;
  status: string;
  impressions_delivered: number;
  impressions_remaining: number;
  clicks: number;
  priority: number;
  ctr: number;
}

export interface PayoutSummary {
  id: string;
  amount_usd: number;
  amount_local: number;
  currency: string;
  method: string;
  status: string;
  requested_at: Date;
  processed_at: Date | null;
}

export interface ImpressionTokenPayload {
  campaign_id: string;
  developer_id: string;
  iat: number;
}
