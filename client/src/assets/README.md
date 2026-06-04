# Sonar — Logo Assets

## Files

| File | Format | Size | Use |
|------|--------|------|-----|
| `sonar-logo.svg` | SVG | 480×160 | Full lockup — nav bars, docs, marketing |
| `sonar-mark.svg` | SVG | 160×160 | Standalone mark — app icons, avatars, compact UI |
| `favicon.svg` | SVG | 32×32 | Browser favicon (modern browsers) |
| `favicon.ico` | ICO | 16/32/48px | Browser favicon (universal fallback) |
| `favicon-32.png` | PNG | 32×32 | Fallback / meta tags |
| `favicon-48.png` | PNG | 48×48 | Taskbar / larger favicon contexts |

## Usage

### HTML head

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="48x48" href="/favicon-48.png">
```

### Notes

- All assets are dark-background (built for dark mode first)
- SVGs are standalone — no external fonts or dependencies
- The mark SVG is square and safe for circular cropping
