"use client";

import { trackBookCall, trackFormSubmit, trackLead, trackWhatsappClick } from "@/lib/analytics";

type ContactConversionActionsProps = {
  includeEmail?: boolean;
};

export default function ContactConversionActions({ includeEmail = true }: ContactConversionActionsProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {includeEmail ? (
        <a
          href="mailto:hola@jmmcdevsign.es?subject=Nuevo%20proyecto%20web"
          onClick={() => {
            trackFormSubmit("contact_email");
            trackLead({ source: "contacto", method: "email" });
          }}
          className="inline-flex items-center justify-center rounded-full bg-[rgba(58,109,255,0.22)] px-5 py-2.5 text-sm font-medium hover:bg-[rgba(58,109,255,0.34)]"
        >
          Enviar email
        </a>
      ) : null}
      <a
        href="https://wa.me/34614928994?text=Hola%20jmmc.devsign%2C%20quiero%20informaci%C3%B3n"
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          trackWhatsappClick();
          trackLead({ source: "contacto", method: "whatsapp" });
        }}
        className="inline-flex items-center justify-center rounded-full bg-[rgba(0,213,255,0.2)] px-5 py-2.5 text-sm font-medium hover:bg-[rgba(0,213,255,0.32)]"
      >
        Hablar por WhatsApp
      </a>
      <a
        href="mailto:hola@jmmcdevsign.es?subject=Reserva%20de%20llamada"
        onClick={() => trackBookCall()}
        className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium hover:border-white/45"
      >
        Reservar llamada
      </a>
    </div>
  );
}
