import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 24 24" className="text-primary">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#g)" />
        <path
          d="M7 13c3 2 7 2 10 0"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 9c2 1 6 1 8 0"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="font-semibold tracking-tight text-lg">
        AAA/Amazing Massage
      </span>
    </Link>
  );
}

export default function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/gallery", label: "Gallery" },
            { to: "/contact", label: "Contact Us" },
            { to: "/team", label: "Our Team" },
            { to: "/employment", label: "Employment" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "transition-colors hover:text-foreground/80",
                  isActive || location.pathname === item.to
                    ? "text-foreground"
                    : "text-foreground/60",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {location.pathname !== "/contact" && (
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/contact">Book Now</Link>
            </Button>
          )}
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <nav className="grid gap-4 text-base">
                {[
                  { to: "/", label: "Home" },
                  { to: "/about", label: "About Us" },
                  { to: "/gallery", label: "Gallery" },
                  { to: "/contact", label: "Contact Us" },
                  { to: "/team", label: "Our Team" },
                  { to: "/employment", label: "Employment" },
                ].map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          "transition-colors",
                          isActive || location.pathname === item.to
                            ? "text-foreground font-medium"
                            : "text-foreground/70 hover:text-foreground",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
