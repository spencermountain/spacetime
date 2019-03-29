export interface Spacetime {
  dayName: () => string;
}

type SpacetimeConstructor = (timestamp: number) => Spacetime;

interface SpacetimeStatic extends SpacetimeConstructor {
  now: () => Spacetime;
}

declare const spacetime: SpacetimeStatic;
export default spacetime;
