import { classifyRequest } from './classifier';
import { handleEscalation, evaluateConfidence } from './escalation';

export interface RouterPayload {
  prompt: string;
  minCapabilityScore?: number;
  maxLatencyMs?: number;
  maxCostPer1k?: number;
}

// Mock Model Registry lookup (will be replaced by @zuba/models)
const AVAILABLE_MODELS = [
  { id: 'llama-3-8b', provider: 'local', cost: 0.0001, latency: 50, capability: 40 },
  { id: 'claude-3-haiku', provider: 'anthropic', cost: 0.00025, latency: 200, capability: 70 },
  { id: 'gpt-4o', provider: 'openai', cost: 0.005, latency: 600, capability: 95 },
  { id: 'claude-3.5-sonnet', provider: 'anthropic', cost: 0.003, latency: 500, capability: 98 },
];

export async function routeRequest(payload: RouterPayload): Promise<any> {
  // 1. Classify
  const classification = await classifyRequest(payload.prompt);
  
  // 2. Determine base constraints from classification
  let targetCapability = payload.minCapabilityScore || (classification.complexity === 'high' ? 80 : 40);
  
  // 3. Rank Models (Cost-aware routing algorithm)
  const rankedModels = AVAILABLE_MODELS
    .filter(m => m.capability >= targetCapability)
    .filter(m => !payload.maxLatencyMs || m.latency <= payload.maxLatencyMs)
    .filter(m => !payload.maxCostPer1k || m.cost <= payload.maxCostPer1k)
    .map(m => {
      // Score = Capability - LatencyPenalty - CostPenalty
      const score = m.capability - (m.latency / 100) - (m.cost * 1000);
      return { ...m, score };
    })
    .sort((a, b) => b.score - a.score); // Highest score first

  if (rankedModels.length === 0) {
    throw new Error('No models available satisfying constraints');
  }

  const selectedModel = rankedModels[0];
  console.log(`Routed to: ${selectedModel.id} (Score: ${selectedModel.score})`);

  // 4. Execute (Mock)
  const mockResponse = `Response from ${selectedModel.provider} using ${selectedModel.id} for prompt: "${payload.prompt.substring(0, 20)}..."`;

  // 5. Evaluate Confidence (Fallback/Escalation triggers)
  const isConfident = evaluateConfidence(mockResponse);
  if (!isConfident) {
    return handleEscalation(payload, `Low confidence from ${selectedModel.id}`);
  }

  return {
    model: selectedModel.id,
    provider: selectedModel.provider,
    response: mockResponse,
    cost: classification.estimatedTokens * selectedModel.cost,
    telemetry: {
      latencyMs: selectedModel.latency,
      category: classification.category
    }
  };
}
