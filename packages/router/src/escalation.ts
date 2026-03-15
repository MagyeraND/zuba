import { routeRequest, RouterPayload } from './router';

export async function handleEscalation(payload: RouterPayload, previousError?: string) {
  console.warn(`Escalating request due to failure. Previous error: ${previousError}`);
  
  // Force a higher capability constraint to bypass cheaper models
  const escalatedPayload: RouterPayload = {
    ...payload,
    minCapabilityScore: (payload.minCapabilityScore || 0) + 20, // Require a smarter model
    maxLatencyMs: 10000, // Relax latency constraints
    maxCostPer1k: 0.05, // Relax cost constraints
  };

  return routeRequest(escalatedPayload);
}

export function evaluateConfidence(response: string): boolean {
  // Simple heuristic: if the model apologizes or says it doesn't know, confidence is low
  const lowerResponse = response.toLowerCase();
  if (lowerResponse.includes("i'm sorry") || lowerResponse.includes("i don't know") || lowerResponse.includes("as an ai")) {
    return false;
  }
  return true; // High confidence
}
