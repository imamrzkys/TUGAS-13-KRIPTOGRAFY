---
name: Amber Carbon
colors:
  surface: '#161311'
  surface-dim: '#161311'
  surface-bright: '#3d3836'
  surface-container-lowest: '#110d0c'
  surface-container-low: '#1f1b19'
  surface-container: '#231f1d'
  surface-container-high: '#2e2927'
  surface-container-highest: '#393431'
  on-surface: '#eae1dd'
  on-surface-variant: '#d8c2b4'
  inverse-surface: '#eae1dd'
  inverse-on-surface: '#342f2d'
  outline: '#a08d80'
  outline-variant: '#534439'
  surface-tint: '#ffb77f'
  primary: '#ffb77f'
  on-primary: '#4e2600'
  primary-container: '#d98b4a'
  on-primary-container: '#542900'
  inverse-primary: '#8e4e10'
  secondary: '#b5c4ff'
  on-secondary: '#00287c'
  secondary-container: '#113fab'
  on-secondary-container: '#a1b5ff'
  tertiary: '#66d9cc'
  on-tertiary: '#003732'
  tertiary-container: '#33aea2'
  on-tertiary-container: '#003c36'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcc4'
  primary-fixed-dim: '#ffb77f'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6f3800'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b5c4ff'
  on-secondary-fixed: '#00164e'
  on-secondary-fixed-variant: '#0c3da9'
  tertiary-fixed: '#84f5e8'
  tertiary-fixed-dim: '#66d9cc'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#161311'
  on-background: '#eae1dd'
  surface-variant: '#393431'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin: 24px
---

## Brand & Style
The brand personality is authoritative, technical, and sophisticated, tailored for cybersecurity professionals and cryptographers. The design system adopts a **Modern Corporate** style with **Glassmorphism** accents, emphasizing a "mission-control" aesthetic. It balances high-density data visualization with a warm, premium dark aesthetic to reduce eye strain during deep technical analysis. 

The emotional response should be one of focused precision and reliability. The interface uses depth and subtle luminosity to guide the user's eye through complex cryptographic state matrices and algorithmic rounds.

## Colors
The color palette is built on a "Warm Charcoal" foundation to create a high-end, low-fatigue environment. 

- **Background**: The base is a deep warm charcoal (#1A1614), providing a grounded, non-pure-black canvas.
- **Surface**: Panels and cards use #242019, differentiated from the background by a subtle 1px border in a slightly lighter shade.
- **Typography**: Primary information is rendered in a warm off-white (#F5F1EA) for high legibility, while metadata and labels use a warm gray (#A39A8E).
- **Accents**: Copper (#D98B4A) serves as the primary action color, providing a mechanical, industrial feel. A brightened Navy/Indigo is reserved for active states, selections, and focus indicators to provide a cool contrast to the warm base.

## Typography
This design system utilizes **Geist** for its systematic, developer-friendly proportions in primary UI and body text. For data-heavy elements, state matrices, and technical labels, **JetBrains Mono** is employed to ensure character distinctness (important for hex codes and bitwise operations).

Headlines are set with tight tracking to maintain a compact, technical look. Labels are always uppercase when used in navigation or as section headers to enhance the structural hierarchy.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a base unit of 4px. Technical dashboards should utilize a 12-column grid for desktop views, allowing for flexible sidebars and wide data visualization areas.

- **Sidebars**: Fixed at 280px for toolsets and navigation.
- **Gaps**: Use `md` (16px) for standard component spacing and `sm` (8px) for related items within a group.
- **Safe Areas**: Maintain a 24px outer margin on all main viewports.
- **Responsibility**: On mobile, the grid collapses to 4 columns; sidebars transform into bottom sheets or hidden drawers.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows. 

- **Level 0 (Base)**: #1A1614.
- **Level 1 (Panels)**: #242019 with a 1px border (Hex: #2F2A24).
- **Level 2 (Popovers/Tooltips)**: #2F2A24 with a subtle ambient shadow (0px 8px 16px rgba(0,0,0,0.4)).
- **Interactivity**: Use background blurs (12px) for overlays to maintain context of the underlying data while creating a clear visual stack.

## Shapes
The shape language is **Soft** and precise. A 4px radius (`0.25rem`) is the standard for most UI components (buttons, inputs, cards) to maintain a professional, architectural feel. Larger containers may use an 8px radius. State matrix cells remain sharp or minimally rounded (2px) to maximize the "data grid" aesthetic.

## Components

### Buttons
- **Primary**: Copper (#D98B4A) background with dark text (#1A1614). High-contrast and bold.
- **Secondary**: Outlined in Copper with Copper text.
- **Ghost**: Warm Gray text, appearing only on hover with a subtle #242019 background.

### State Matrix Cells
- **Default**: Background #2A2520 with warm off-white monospaced text.
- **Changed State**: Apply a soft glowing Copper (#D98B4A) or Teal (#26A69A) **outline** (1px or 2px internal). The background remains dark to ensure text legibility.

### AES Rounds Sidebar
- **Navigation Items**: Must display unique sequential numbering. Ensure the loop or component mapping correctly reflects the index (e.g., Round 7, Round 8, Round 9).
- **Active Round**: Highlighted using the Navy/Indigo accent as a left-hand border indicator and a subtle background tint.

### Input Fields
- Dark backgrounds (#1A1614) with a #2F2A24 border. 
- On focus, the border shifts to Copper (#D98B4A) with a 2px outer glow.

### Chips/Tags
- Small, uppercase JetBrains Mono text. 
- Backgrounds should be low-opacity versions of the accent colors (e.g., Copper at 15% opacity).