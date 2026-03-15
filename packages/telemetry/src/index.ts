export interface RequestMetrics {
  promptId: string;
  model_id: string;
  latency_ms: number;
  cost: number;
  success: boolean;
  fallbackTriggered: boolean;
}

export const TelemetryLogger = {
  logRequest: (metrics: RequestMetrics) => {
    // In production, this would emit to Prometheus/Grafana or Datadog
    console.log(`[TELEMETRY] Request completed. Model: ${metrics.model_id} | Latency: ${metrics.latency_ms}ms | Cost: $${metrics.cost.toFixed(6)} | Success: ${metrics.success}`);
  },
  logError: (error: Error) => {
    console.error(`[TELEMETRY] Error: ${error.message}`);
  }
};
