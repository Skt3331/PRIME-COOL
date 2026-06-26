import { useState, useRef } from "react";
import { X, Navigation, Compass, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function WhatsAppWidget({
  whatsapp,
}: {
  whatsapp: { enabled: boolean; number: string; defaultMessage: string };
}) {
  if (!whatsapp?.enabled) return null;

  const [position, setPosition] = useState({ x: 0, y: 0 }); // offset from bottom-right
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    // If modal is open, ignore drags
    if (isModalOpen) return;
    e.preventDefault();
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
    e.currentTarget.releasePointerCapture(e.pointerId);

    const dx = startPos.current.x - e.clientX;
    const dy = startPos.current.y - e.clientY;
    currentPos.current = {
      x: currentPos.current.x + dx,
      y: currentPos.current.y + dy,
    };

    // If it was just a click (no movement), open geolocation modal
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      setIsModalOpen(true);
    }
  };

  const handleDirectChat = () => {
    setIsModalOpen(false);
    const formattedNumber = whatsapp.number.replace(/\D/g, "");
    const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(
      whatsapp.defaultMessage
    )}`;
    window.open(url, "_blank");
  };

  const handleLocationChat = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser. Redirecting to standard chat...");
      handleDirectChat();
      return;
    }

    setIsLoading(true);
    toast.info("Accessing live satellite coordinates...");

    const options = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        setIsModalOpen(false);
        const { latitude, longitude, accuracy } = position.coords;
        
        toast.success(`Location resolved within ${Math.round(accuracy)} meters!`);

        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const formattedNumber = whatsapp.number.replace(/\D/g, "");
        const locationMessage = `${whatsapp.defaultMessage} (My Service Location: ${mapsLink})`;
        
        const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(locationMessage)}`;
        
        // Brief delay before redirecting for better UX
        setTimeout(() => {
          window.open(url, "_blank");
        }, 800);
      },
      (error) => {
        setIsLoading(false);
        let errorMsg = "Unable to resolve coordinates.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "Location coordinates unavailable.";
            break;
          case error.TIMEOUT:
            errorMsg = "Location request timed out.";
            break;
        }
        toast.error(`${errorMsg} Redirecting to standard chat...`);
        
        // Redirect anyway without location after 1.5s
        setTimeout(() => {
          handleDirectChat();
        }, 1500);
      },
      options
    );
  };

  return (
    <>
      {/* Floating Interactive Widget */}
      <div
        className="fixed z-40 rounded-full bg-[#25D366] text-white p-4 shadow-[0_0_25px_rgba(37,211,102,0.4)] cursor-grab active:cursor-grabbing touch-none transition-transform hover:scale-110 flex items-center justify-center"
        style={{
          bottom: `max(2rem, calc(2rem + ${position.y}px))`,
          right: `max(2rem, calc(2rem + ${position.x}px))`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        title="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 448 512"
          className="h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </div>

      {/* Futuristic Glassmorphic Geolocation Request Console Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => !isLoading && setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-sky-500/30 bg-slate-900/90 p-6 text-foreground shadow-[0_0_50px_rgba(14,165,233,0.3)] backdrop-blur-2xl transition-all duration-300 transform scale-100 flex flex-col items-center">
            {/* Close Button */}
            {!isLoading && (
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 rounded-full border border-border p-1 text-muted-foreground hover:text-foreground hover:bg-slate-800 transition"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Radar Animation / Satellite Pulse */}
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-950/40 border border-sky-500/20">
              <div className="absolute inset-0 rounded-full border-2 border-sky-500/40 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
              <div className="absolute h-14 w-14 rounded-full border border-purple-500/30 animate-pulse" />
              
              {isLoading ? (
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              ) : (
                <Compass className="h-8 w-8 text-primary animate-float" />
              )}
            </div>

            {/* Title / Description */}
            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-sky-400 font-mono uppercase">
                RADAR DISPATCH ACTIVE
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Prime Dispatch Console
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Would you like to transmit your live service coordinates? 
                This allows proprietor <strong>Saurav Temgire</strong> to route engineers to your site instantly.
              </p>
            </div>

            {/* Console Feedback during Load */}
            {isLoading && (
              <div className="w-full bg-slate-950/80 rounded-lg p-3 border border-sky-500/10 font-mono text-[11px] text-sky-400 mb-6 text-center space-y-1 animate-pulse">
                <div>&gt; INITIALIZING SATELLITE HANDSHAKE...</div>
                <div>&gt; REQUESTING GEOLOCATION TELEMETRY...</div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="w-full space-y-3">
              <button
                onClick={handleLocationChat}
                disabled={isLoading}
                className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-purple-600 text-white px-5 py-3 text-sm font-semibold shadow-[0_0_20px_rgba(14,165,233,0.35)] hover:opacity-95 transition disabled:opacity-50 duration-300 group cursor-pointer"
              >
                <Navigation className="h-4.5 w-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Yes, Transmit GPS &amp; Chat</span>
              </button>

              <button
                onClick={handleDirectChat}
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-xl border border-border bg-slate-800/40 hover:bg-slate-800 text-foreground px-5 py-3 text-sm font-medium transition disabled:opacity-50 cursor-pointer"
              >
                Chat Without Location
              </button>
            </div>
            
            {/* Trust disclaimer */}
            <div className="mt-4 text-[10px] text-muted-foreground/60 text-center font-mono">
              Coordinates used strictly for service navigation dispatch.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
