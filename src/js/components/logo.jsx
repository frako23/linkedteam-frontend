import { cn } from "@/lib/utils";

/**
 * Marca de LinkedTeam: tres nodos enlazados que forman una L.
 * Hereda el color del texto (currentColor); el tamaño va en className.
 */
export function Logo({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M5.25 5h2.5v11.25H19v2.5H5.25z" />
      <circle cx="6.5" cy="5" r="3" />
      <circle cx="6.5" cy="17.5" r="3" />
      <circle cx="19" cy="17.5" r="3" />
    </svg>
  );
}
