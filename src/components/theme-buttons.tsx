"use client";
import { ClientOnly } from "@/components/client-only";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColorTheme, colorThemes, type Theme } from "@/lib/themes";
import { capitalize, cn } from "@/lib/utils";
import { Check, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const useCustomTheme = () => {
  const { theme, themes, ...props } = useTheme();
  const isDark = String(theme).startsWith("dark-");
  return {
    ...props,
    theme: String(theme) as Theme,
    themes: themes as Theme[],
    isDark,
    isActiveTheme: (t: Theme) => t === theme,
    isActiveColor: (color: ColorTheme) => String(theme).replace("dark-", "").includes(color),
    swapMode: () => props.setTheme(isDark ? String(theme).replace("dark-", "") : `dark-${theme}`),
    setThemeColor: (color: ColorTheme) => props.setTheme(isDark ? `dark-${color}` : color)
  };
};

const ThemeModeButton = () => {
  const { isDark, swapMode } = useCustomTheme();

  return (
    <ClientOnly>
      <Button variant="outline" size="icon" onClick={swapMode}>
        {isDark ? <MoonIcon /> : <SunIcon />}
      </Button>
    </ClientOnly>
  );
};
ThemeModeButton.displayName = "ThemeModeButton";

const ThemeColorButton = () => {
  const { theme, setThemeColor, isActiveColor } = useCustomTheme();

  return (
    <ClientOnly>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button asChild variant="outline" size="icon">
            <div>
              <span className="h-6 w-6 bg-primary rounded-full" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Theme Color</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {colorThemes.map(t => (
            <DropdownMenuItem
              key={t}
              onClick={() => setThemeColor(t)}
              className={cn({ "pointer-events-none border border-primary": isActiveColor(t) })}
            >
              <div className="flex gap-2 items-center w-full">
                <span className={cn(t, "h-4 w-4 bg-primary rounded-full")} />
                <span>{capitalize(t)}</span>
                {theme.includes(t) && <Check className="w-4 h-4 ml-auto" />}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ClientOnly>
  );
};
ThemeColorButton.displayName = "ThemeColorButton";

export { ThemeModeButton, ThemeColorButton };
