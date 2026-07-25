"use client";

/* Floating WhatsApp contact button — bottom-right, sits below the chatbot launcher. */
export default function WhatsApp() {
  const phone = "923003627458"; // +92 300 3627458
  const text = encodeURIComponent(
    "Hi Naveed! I found your portfolio and would like to connect."
  );
  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-2"
    >
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-bold text-black opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 hidden sm:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/40 transition-transform duration-200 hover:scale-110 active:scale-95">
        {/* ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        <svg viewBox="0 0 32 32" className="relative h-8 w-8 fill-black" aria-hidden="true">
          <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.463 1.712 6.408L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.24 1.59h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.052A12.72 12.72 0 0 0 16.001 3.2Zm0 23.36h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.02 1.054 1.073-3.92-.252-.402a10.56 10.56 0 0 1-1.62-5.643c0-5.867 4.774-10.64 10.643-10.64 2.842 0 5.514 1.108 7.523 3.118a10.57 10.57 0 0 1 3.116 7.526c0 5.868-4.774 10.641-10.642 10.641Zm5.834-7.968c-.32-.16-1.892-.933-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.571-1.587-.95-.848-1.592-1.895-1.779-2.215-.186-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.624-.524-.54-.72-.55l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.306.16.213 2.253 3.44 5.46 4.826.763.33 1.358.527 1.822.674.766.244 1.463.21 2.014.127.614-.092 1.892-.773 2.158-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373Z" />
        </svg>
      </span>
    </a>
  );
}
