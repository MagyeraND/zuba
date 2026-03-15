export interface GenericProvider {
  generate(prompt: string, model: string): Promise<string>;
  embed?(text: string, model: string): Promise<number[]>;
  stream?(prompt: string, model: string): AsyncGenerator<string>;
}

export class OpenAIAdapter implements GenericProvider {
  private apiKey: string;

  constructor(apiKey: string = process.env.OPENAI_API_KEY || '') {
    this.apiKey = apiKey;
  }

  async generate(prompt: string, model: string): Promise<string> {
    console.log(`[OpenAI] Generating with ${model}`);
    // Mock API call to OpenAI
    return `Mocked OpenAI Response for model ${model}`;
  }
}
