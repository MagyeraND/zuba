export interface ModelDefinition {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'together' | 'replicate' | 'local';
  cost_per_1k_tokens_input: number;
  cost_per_1k_tokens_output: number;
  latency_ms: number;
  capabilities: number; // 0-100 score
  context_window: number;
}

export const ModelRegistry: Record<string, ModelDefinition> = {
  'gpt-4o': {
    id: 'gpt-4o',
    name: 'GPT-4 Omni',
    provider: 'openai',
    cost_per_1k_tokens_input: 0.005,
    cost_per_1k_tokens_output: 0.015,
    latency_ms: 600,
    capabilities: 95,
    context_window: 128000,
  },
  'claude-3.5-sonnet': {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    cost_per_1k_tokens_input: 0.003,
    cost_per_1k_tokens_output: 0.015,
    latency_ms: 500,
    capabilities: 98,
    context_window: 200000,
  },
  'llama-3-70b-instruct': {
    id: 'llama-3-70b-instruct',
    name: 'Llama 3 70B',
    provider: 'together',
    cost_per_1k_tokens_input: 0.0009,
    cost_per_1k_tokens_output: 0.0009,
    latency_ms: 300,
    capabilities: 85,
    context_window: 8192,
  },
  'llama-3-8b-instruct': {
    id: 'llama-3-8b-instruct',
    name: 'Llama 3 8B',
    provider: 'local',
    cost_per_1k_tokens_input: 0.00005,
    cost_per_1k_tokens_output: 0.00005,
    latency_ms: 50,
    capabilities: 50,
    context_window: 8192,
  }
};
