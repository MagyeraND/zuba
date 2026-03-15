export type TaskCategory = 'general_chat' | 'code_generation' | 'translation' | 'reasoning' | 'summarization' | 'embedding';

export interface ClassificationResult {
  category: TaskCategory;
  complexity: 'low' | 'medium' | 'high';
  estimatedTokens: number;
}

export async function classifyRequest(prompt: string): Promise<ClassificationResult> {
  // Mock Keyword-based classifier for performance over cost
  let category: TaskCategory = 'general_chat';
  let complexity: 'low' | 'medium' | 'high' = 'low';

  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('code') || lowerPrompt.includes('function') || lowerPrompt.includes('debug')) {
    category = 'code_generation';
    complexity = 'high';
  } else if (lowerPrompt.includes('translate') || lowerPrompt.includes('meaning')) {
    category = 'translation';
    complexity = 'medium';
  } else if (lowerPrompt.includes('why') || lowerPrompt.includes('explain') || lowerPrompt.includes('solve')) {
    category = 'reasoning';
    complexity = 'high';
  } else if (lowerPrompt.includes('summarize') || lowerPrompt.includes('tldr')) {
    category = 'summarization';
    complexity = 'medium';
  }

  return {
    category,
    complexity,
    estimatedTokens: prompt.length / 4, // Rough approximation
  };
}
