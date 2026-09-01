import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

function Input({ className, type, showTogglePassword = false, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  const inputType =
    isPassword && showTogglePassword
      ? showPassword
        ? "text"
        : "password"
      : type;
  return (
    <div className=" relative">
      <InputPrimitive
        type={inputType}
        data-slot="input"
        className={cn(
          "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className,
        )}
        {...props}
      />
      {isPassword && showTogglePassword && (
        <button
          type="button"
          className="absolute top-3 right-2"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Icon
              icon="mdi:eye-lock-open-outline"
              className="h-6 w-6 text-gray-400"
            />
          ) : (
            <Icon icon="mdi:eye" className="h-6 w-6 text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
