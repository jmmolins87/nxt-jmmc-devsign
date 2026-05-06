declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function trackLead(params: EventParams = {}) {
  trackEvent("generate_lead", params);
}

export function trackFormSubmit(formName: string) {
  trackEvent("form_submit", { form_name: formName });
}

export function trackWhatsappClick() {
  trackEvent("click_whatsapp");
}

export function trackBookCall() {
  trackEvent("book_call");
}
