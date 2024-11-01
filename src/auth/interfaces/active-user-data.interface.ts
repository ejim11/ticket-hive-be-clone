/**
 * interface for a user that has logged in (payload)
 */
export interface ActiveUserData {
  /**
   * id for user
   */
  sub: number;

  /**
   * user email
   */
  email: string;

  /**
   * user role
   */
  role: string;
}
