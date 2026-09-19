// Single reusable lead-capture flow shared by every CTA form on the landing page.

export const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyuI9hKInszAvkFCaJ7VyqYusrw_DTh_XS242lcRhPhVPMA9us_xnR5gZZaUcPXW3j_wA/exec";

export const LEAD_SOURCE = "Workshop Landing Page";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmValues = Record<UtmKey, string>;

/** Persist UTM params from the current URL the first time a visitor lands. */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value && value.trim() !== "") {
        window.localStorage.setItem(key, value.trim());
      }
    }
  } catch (error) {
    console.error("UTM capture failed", error);
  }
}

export function getStoredUtmParams(): UtmValues {
  const result = { utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "" } as UtmValues;
  if (typeof window === "undefined") return result;
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const stored = window.localStorage.getItem(key);
      const value = stored ?? params.get(key) ?? "";
      result[key] = value === "undefined" || value === "null" ? "" : value;
    }
  } catch (error) {
    console.error("UTM read failed", error);
  }
  return result;
}

export type LeadPayload = {
  full_name: string;
  email: string;
  whatsapp: string;
  razorpay_payment_id?: string;
  payment_status?: string;
};

/** POSTs the lead to the Apps Script web app as form parameters (doPost-friendly). */
export async function submitLead(lead: LeadPayload): Promise<void> {
  const utm = getStoredUtmParams();
  const data = new URLSearchParams();
  data.append("full_name", lead.full_name);
  data.append("email", lead.email);
  data.append("whatsapp", lead.whatsapp);
  for (const key of UTM_KEYS) data.append(key, utm[key]);
  data.append("landing_page", typeof window === "undefined" ? "" : window.location.href);
  data.append("referrer", typeof document === "undefined" ? "" : document.referrer);
  data.append("lead_source", LEAD_SOURCE);
  data.append("razorpay_payment_id", lead.razorpay_payment_id ?? "");
  data.append("payment_status", lead.payment_status ?? "PENDING");

  const response = await fetch(APPS_SCRIPT_URL, { method: "POST", body: data });
  if (!response.ok) {
    throw new Error(`Apps Script responded with ${response.status}`);
  }
}
