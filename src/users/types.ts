import type { RaRecord } from "react-admin";

/**
 * Represents a user record as returned by the Admin API.
 * Now uses a single 'role' string instead of an array.
 */
export interface UserRecord extends RaRecord {
  id: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  role: string; // Changed from roles: string[]
}

/**
 * Data required to update a user.
 * Matches the updated UserUpdateDto on the backend.
 */
export interface UserUpdatePayload {
  email: string;
  userName: string;
  role: string; // Changed from roles: string[]
}
