/**
 * Layer: 2-entities
 * Slice: session
 *
 * Provides authentication context and session management.
 * Dependency direction: 2-entities -> 1-shared
 */
export { AuthProvider, useAuth } from "./context";
export * from "./model";
