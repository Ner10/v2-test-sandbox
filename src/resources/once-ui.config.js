const baseURL = "https://api-docs.vercel.app";

const routes = {
  '/api-reference':  true,
  '/sandbox':    true,
}

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

const style = {
  theme: "dark", // dark | light
  neutral: "gray", // sand | gray | slate
  brand: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100"
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false
  },
};

const layout = {
  // units are set in REM
  header: {
    width: 200, // max-width of the content inside the header
  },
  body: {
    width: 200, // max-width of the body
  },
  sidebar: {
    width: 17, // width of the sidebar
    collapsible: false, // accordion or static render
  },
  content: {
    width: 44, // width of the main content block
  },
  sideNav: {
    width: 17, // width of the sideNav on document pages
  },
  footer: {
    width: 44, // width of the content inside the footer
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: false,
    size: 2,
    color: "brand-on-background-weak",
    opacity: 20,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/once-ui-system",
  }
];

const schema = {
  logo: "",
  type: "Organization",
  name: "Payment API Docs",
  description: "Multi-Merchant Payment System API Documentation - Secure payment processing for merchants.",
  email: "support@payment-system.com",
  locale: "tr_TR"
};

const meta = {
  home: {
    title: `API Docs – ${schema.name}`,
    description: schema.description,
    path: "/",
    image: "/api/og/generate?title=Payment API&description=Multi-Merchant Payment System Documentation"
  },
  apiReference: {
    title: `API Reference – ${schema.name}`,
    description: "Complete API reference for payment endpoints",
    path: "/api-reference",
    image: "/api/og/generate?title=API Reference"
  },
  sandbox: {
    title: `API Sandbox – ${schema.name}`,
    description: "Test API endpoints with live examples",
    path: "/sandbox",
    image: "/api/og/generate?title=API Sandbox"
  }
};

export { dataStyle, effects, style, layout, baseURL, social, schema, meta, routes, fonts };
