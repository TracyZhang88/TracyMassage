/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface Therapist {
  id: string;
  name: string;
  bio?: string;
}

export type Location = "wyong" | "gosford";

export interface AppointmentSlot {
  time: string; // HH:mm
  location?: Location;
  available: boolean;
}

export interface AppointmentRequest {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  service: string; // service id
  duration: number; // minutes
  location: Location;
}

export interface AppointmentListItem {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  duration: number;
  location?: Location;
  therapistId?: string;
}
