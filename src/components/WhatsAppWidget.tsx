import { useState, useRef, useEffect } from "react";

export function WhatsAppWidget({
  whatsapp,
}: {
  whatsapp?: { enabled?: boolean; number?: string; defaultMessage?: string };
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // offset from bottom-right
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  // Hide the initial tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  if (whatsapp?.enabled === false) return null;

  const phoneNum = whatsapp?.number || "+917507408461";
  const defaultMsg =
    whatsapp?.defaultMessage ||
    "Hi Prime Cool, I need HVAC / AC service assistance in Pune.";

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = startPos.current.x - e.clientX;
    const dy = startPos.current.y - e.clientY;

    // Update visual position
    setPosition({
      x: currentPos.current.x + dx,
      y: currentPos.current.y + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }

    const dx = startPos.current.x - e.clientX;
    const dy = startPos.current.y - e.clientY;
    currentPos.current = {
      x: currentPos.current.x + dx,
      y: currentPos.current.y + dy,
    };

    // If it was just a click (no significant drag movement), open WhatsApp chat directly
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) {
      handleDirectChat();
    }
  };

  const handleDirectChat = () => {
    const formattedNumber = phoneNum.replace(/\D/g, "");
    const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(defaultMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed z-50 group flex items-center select-none"
      style={{
        bottom: `max(1.5rem, calc(1.5rem + ${position.y}px))`,
        right: `max(1.5rem, calc(1.5rem + ${position.x}px))`,
      }}
    >
      {/* Tooltip Popup */}
      <div
        onClick={handleDirectChat}
        className={`hidden sm:flex items-center gap-2 mr-3 px-3.5 py-2 rounded-2xl bg-slate-900/95 text-white border border-emerald-500/30 text-xs font-semibold shadow-2xl backdrop-blur-xl transition-all duration-300 cursor-pointer ${
          showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="whitespace-nowrap">Chat on WhatsApp (24x7)</span>
      </div>

      {/* WhatsApp Floating Button */}
      <button
        type="button"
        className="relative rounded-full bg-[#25D366] text-white p-3.5 sm:p-4 shadow-[0_0_25px_rgba(37,211,102,0.5)] cursor-grab active:cursor-grabbing touch-none transition-transform hover:scale-110 active:scale-95 flex items-center justify-center border border-white/20"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        title="Chat with us on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border border-white text-[9px] font-bold items-center justify-center text-slate-900">
            1
          </span>
        </span>
        <svg
          viewBox="0 0 448 512"
          className="h-7 w-7 sm:h-8 sm:w-8 fill-current drop-shadow"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </button>
    </div>
  );
}
