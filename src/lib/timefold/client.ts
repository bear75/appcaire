import { SOLVER_CONFIG } from './config';
import type { SchedulingProblem, SchedulingSolution } from './types';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_TIMEFOLD_API_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_TIMEFOLD_API_URL');
}

if (!process.env.NEXT_PUBLIC_TIMEFOLD_API_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_TIMEFOLD_API_KEY');
}

const API_URL = process.env.NEXT_PUBLIC_TIMEFOLD_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_TIMEFOLD_API_KEY;

/**
 * Timefold API client for scheduling optimization
 */
export class TimefoldClient {
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };

  /**
   * Solve a scheduling problem
   */
  async solve(problem: SchedulingProblem): Promise<SchedulingSolution> {
    const response = await fetch(`${API_URL}/solve`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        problem,
        config: SOLVER_CONFIG,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to solve scheduling problem: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Validate a scheduling solution
   */
  async validateSolution(solution: SchedulingSolution): Promise<boolean> {
    const response = await fetch(`${API_URL}/validate`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(solution),
    });

    if (!response.ok) {
      throw new Error(`Failed to validate solution: ${response.statusText}`);
    }

    const result = await response.json();
    return result.isValid;
  }

  /**
   * Get explanations for a scheduling solution
   */
  async explainSolution(solution: SchedulingSolution): Promise<string[]> {
    const response = await fetch(`${API_URL}/explain`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(solution),
    });

    if (!response.ok) {
      throw new Error(`Failed to explain solution: ${response.statusText}`);
    }

    const result = await response.json();
    return result.explanations;
  }
}

// Export singleton instance
export const timefold = new TimefoldClient();
