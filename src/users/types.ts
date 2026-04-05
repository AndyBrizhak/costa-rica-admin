import type { RaRecord } from "react-admin";

/**
 * Represents a user record as returned by the Admin API.
 * Follows the backend projection in AdminUserService.
 */
export interface UserRecord extends RaRecord {
  id: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  roles: string[];
}

/**
 * Data required to update a user's roles and basic info.
 * Matches UserUpdateDto on the backend.
 */
export interface UserUpdatePayload {
  email: string;
  userName: string;
  roles: string[];
}
