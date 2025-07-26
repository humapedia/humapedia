// Theme Types for Humapedia Platform

// Theme Configuration
export interface ThemeConfig {
  name: string;
  displayName: string;
  description: string;
  colors: ColorScheme;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  borderRadius: BorderRadiusConfig;
  shadows: ShadowConfig;
  transitions: TransitionConfig;
  breakpoints: BreakpointConfig;
}

// Color Scheme
export interface ColorScheme {
  primary: ColorPalette;
  secondary: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
  neutral: ColorPalette;
  background: BackgroundColors;
  text: TextColors;
  border: BorderColors;
  input: InputColors;
  card: CardColors;
  muted: MutedColors;
  accent: AccentColors;
  destructive: DestructiveColors;
  ring: RingColors;
}

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface BackgroundColors {
  default: string;
  secondary: string;
  muted: string;
  accent: string;
}

export interface TextColors {
  default: string;
  secondary: string;
  muted: string;
  accent: string;
  destructive: string;
}

export interface BorderColors {
  default: string;
  input: string;
  ring: string;
}

export interface InputColors {
  background: string;
  border: string;
  placeholder: string;
  focus: string;
}

export interface CardColors {
  background: string;
  foreground: string;
  border: string;
}

export interface MutedColors {
  background: string;
  foreground: string;
}

export interface AccentColors {
  background: string;
  foreground: string;
}

export interface DestructiveColors {
  background: string;
  foreground: string;
}

export interface RingColors {
  default: string;
  focus: string;
}

// Typography Configuration
export interface TypographyConfig {
  fontFamily: FontFamilyConfig;
  fontSize: FontSizeConfig;
  fontWeight: FontWeightConfig;
  lineHeight: LineHeightConfig;
  letterSpacing: LetterSpacingConfig;
}

export interface FontFamilyConfig {
  sans: string[];
  serif: string[];
  mono: string[];
}

export interface FontSizeConfig {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  '8xl': string;
  '9xl': string;
}

export interface FontWeightConfig {
  thin: number;
  extralight: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
}

export interface LineHeightConfig {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
}

export interface LetterSpacingConfig {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

// Spacing Configuration
export interface SpacingConfig {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

// Border Radius Configuration
export interface BorderRadiusConfig {
  none: string;
  sm: string;
  default: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

// Shadow Configuration
export interface ShadowConfig {
  sm: string;
  default: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

// Transition Configuration
export interface TransitionConfig {
  none: string;
  all: string;
  default: string;
  colors: string;
  opacity: string;
  shadow: string;
  transform: string;
}

// Breakpoint Configuration
export interface BreakpointConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'auto';

export type ThemeMode = 'light' | 'dark';

// Theme Context
export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ThemeMode;
  systemTheme: ThemeMode;
}

// Theme Provider Props
export interface ThemeProviderProps {
  children: any;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  themes?: Theme[];
  forcedTheme?: Theme;
  enableColorScheme?: boolean;
  attribute?: string;
  value?: Record<Theme, string>;
}

// Theme Utilities
export interface ThemeUtils {
  getTheme: () => Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: () => boolean;
  isLight: () => boolean;
  isSystem: () => boolean;
}

// CSS Custom Properties
export interface CSSCustomProperties {
  [key: `--${string}`]: string;
}

// Theme CSS Variables
export interface ThemeCSSVariables {
  // Colors
  '--background': string;
  '--foreground': string;
  '--card': string;
  '--card-foreground': string;
  '--popover': string;
  '--popover-foreground': string;
  '--primary': string;
  '--primary-foreground': string;
  '--secondary': string;
  '--secondary-foreground': string;
  '--muted': string;
  '--muted-foreground': string;
  '--accent': string;
  '--accent-foreground': string;
  '--destructive': string;
  '--destructive-foreground': string;
  '--border': string;
  '--input': string;
  '--ring': string;
  '--radius': string;
  '--chart-1': string;
  '--chart-2': string;
  '--chart-3': string;
  '--chart-4': string;
  '--chart-5': string;
}

// Theme Constants
export const THEMES = {
  LIGHT: 'light' as const,
  DARK: 'dark' as const,
  AUTO: 'auto' as const,
} as const;

export const THEME_ATTRIBUTE = 'data-theme';

export const THEME_STORAGE_KEY = 'humapedia-theme';

// Default Theme Configuration
export const DEFAULT_LIGHT_THEME: ThemeConfig = {
  name: 'light',
  displayName: 'Light',
  description: 'Light theme for Humapedia',
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    background: {
      default: '#ffffff',
      secondary: '#f8fafc',
      muted: '#f1f5f9',
      accent: '#f8fafc',
    },
    text: {
      default: '#0f172a',
      secondary: '#475569',
      muted: '#64748b',
      accent: '#3b82f6',
      destructive: '#dc2626',
    },
    border: {
      default: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#3b82f6',
    },
    input: {
      background: '#ffffff',
      border: '#e2e8f0',
      placeholder: '#94a3b8',
      focus: '#3b82f6',
    },
    card: {
      background: '#ffffff',
      foreground: '#0f172a',
      border: '#e2e8f0',
    },
    muted: {
      background: '#f8fafc',
      foreground: '#64748b',
    },
    accent: {
      background: '#f1f5f9',
      foreground: '#0f172a',
    },
    destructive: {
      background: '#fef2f2',
      foreground: '#dc2626',
    },
    ring: {
      default: '#3b82f6',
      focus: '#3b82f6',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
      3: '.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  spacing: {
    0: '0px',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
  },
  transitions: {
    none: 'none',
    all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    default: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const DEFAULT_DARK_THEME: ThemeConfig = {
  ...DEFAULT_LIGHT_THEME,
  name: 'dark',
  displayName: 'Dark',
  description: 'Dark theme for Humapedia',
  colors: {
    ...DEFAULT_LIGHT_THEME.colors,
    background: {
      default: '#0f172a',
      secondary: '#1e293b',
      muted: '#334155',
      accent: '#1e293b',
    },
    text: {
      default: '#f8fafc',
      secondary: '#cbd5e1',
      muted: '#94a3b8',
      accent: '#60a5fa',
      destructive: '#f87171',
    },
    border: {
      default: '#334155',
      input: '#334155',
      ring: '#60a5fa',
    },
    input: {
      background: '#1e293b',
      border: '#334155',
      placeholder: '#64748b',
      focus: '#60a5fa',
    },
    card: {
      background: '#1e293b',
      foreground: '#f8fafc',
      border: '#334155',
    },
    muted: {
      background: '#334155',
      foreground: '#94a3b8',
    },
    accent: {
      background: '#334155',
      foreground: '#f8fafc',
    },
    destructive: {
      background: '#450a0a',
      foreground: '#f87171',
    },
  },
};

// Theme Utilities
export const createThemeCSSVariables = (theme: ThemeConfig): ThemeCSSVariables => ({
  '--background': theme.colors.background.default,
  '--foreground': theme.colors.text.default,
  '--card': theme.colors.card.background,
  '--card-foreground': theme.colors.card.foreground,
  '--popover': theme.colors.background.default,
  '--popover-foreground': theme.colors.text.default,
  '--primary': theme.colors.primary[500],
  '--primary-foreground': theme.colors.primary[50],
  '--secondary': theme.colors.secondary[500],
  '--secondary-foreground': theme.colors.secondary[50],
  '--muted': theme.colors.muted.background,
  '--muted-foreground': theme.colors.muted.foreground,
  '--accent': theme.colors.accent.background,
  '--accent-foreground': theme.colors.accent.foreground,
  '--destructive': theme.colors.destructive.background,
  '--destructive-foreground': theme.colors.destructive.foreground,
  '--border': theme.colors.border.default,
  '--input': theme.colors.input.border,
  '--ring': theme.colors.ring.default,
  '--radius': theme.borderRadius.default,
  '--chart-1': theme.colors.primary[500],
  '--chart-2': theme.colors.secondary[500],
  '--chart-3': theme.colors.success[500],
  '--chart-4': theme.colors.warning[500],
  '--chart-5': theme.colors.error[500],
});

export const applyTheme = (theme: ThemeConfig, element?: HTMLElement): void => {
  const target = element || document.documentElement;
  const cssVariables = createThemeCSSVariables(theme);
  
  Object.keys(cssVariables).forEach((property) => {
    const value = cssVariables[property as keyof ThemeCSSVariables];
    target.style.setProperty(property, value);
  });
};

export const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const isSystemTheme = (theme: Theme): boolean => theme === 'auto';

export const resolveTheme = (theme: Theme): ThemeMode => {
  if (isSystemTheme(theme)) {
    return getSystemTheme();
  }
  return theme as ThemeMode;
}; 