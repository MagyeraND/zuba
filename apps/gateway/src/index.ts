import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: true });

// Basic health check
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', service: 'zuba-gateway', timestamp: new Date().toISOString() };
});

// Zod Schema for basic validation mock
const ChatRequestSchema = z.object({
  prompt: z.string().min(1),
  modelPreference: z.string().optional(),
});

// Routing endpoints
fastify.post('/chat', async (request, reply) => {
  try {
    const body = ChatRequestSchema.parse(request.body);
    
    // TODO: Call @zuba/router to make routing decision
    
    return { 
      status: 'success', 
      message: 'Request passed gateway validation',
      prompt: body.prompt,
      // mock router decision
      routedTo: 'mock-model-router',
    };
  } catch (error) {
    reply.status(400).send({ status: 'error', error: 'Invalid request payload' });
  }
});

fastify.post('/completion', async (request, reply) => {
  return { status: 'mocked', endpoint: '/completion' };
});

fastify.post('/embedding', async (request, reply) => {
  return { status: 'mocked', endpoint: '/embedding' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    fastify.log.info(`Gateway listening on http://0.0.0.0:3001`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
