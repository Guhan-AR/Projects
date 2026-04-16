import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export default function Logo({ className, variant = "default" }: LogoProps) {
  // Using the realistic image provided by the user
  // This image already contains the "Ark Hospital" text
  const logoUrl = "/logo.png";

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logoUrl} 
        alt="Ark Hospital Logo" 
        className={cn(
          "h-12 md:h-16 w-auto object-contain transition-all",
          variant === "white" && "brightness-0 invert"
        )}
      />
    </div>
  );
}
