import { apiRequest } from "@/lib/api/client"
import type {
  CheckoutResponse,
  CreateCheckoutInput,
} from "@/lib/types/checkout"

export function createCheckoutSession(input: CreateCheckoutInput) {
  return apiRequest<CheckoutResponse>("/api/checkout", {
    method: "POST",
    body: JSON.stringify(input),
  })
}
