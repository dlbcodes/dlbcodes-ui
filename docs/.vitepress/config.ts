import { defineConfig, loadEnv } from 'vitepress'
import tailwindcss from "@tailwindcss/vite";
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin";
import { fileURLToPath, URL } from "node:url";

const isProd = process.env.NODE_ENV === "production";
const showcaseUrl = isProd
  ? "https://dlbcodes-ui-showcase.vercel.app/"
  : "http://localhost:5174";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Design System [WIP]",
  description: "A Vue 3 component library",
  appearance: false,
  cleanUrls: true,
  vite: {
    plugins: [tailwindcss() as any],
    server: {
      fs: {
        allow: [".."],
      },
    },
    resolve: {
      alias: {
        "@dlbcodes/my-design-system": fileURLToPath(
          new URL("../../lib/index.ts", import.meta.url),
        ),
        // If you also import the tokens CSS by package path:
        "@dlbcodes/my-design-system/tokens.css": fileURLToPath(
          new URL("../../lib/styles/tokens.css", import.meta.url),
        ),
      },
    },

  },
  markdown: {
    config(md) {
      md.use(containerPreview, { clientOnly: true });
      md.use(componentPreview, { clientOnly: true });

    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Components", link: "/components/button" },
      { text: "Showcase", link: showcaseUrl },
      { text: "Playground", link: "https://dlbcodes-playground.vercel.app/" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "For LLMs (llms.txt)", link: "/llms.txt" },
          { text: "Theming", link: "/guide/theming" },
          { text: "Architecture", link: "/guide/architecture" },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: "Alert", link: "/components/alert" },
          { text: "Avatar", link: "/components/avatar" },
          { text: "Badge", link: "/components/badge" },
          { text: 'Button', link: '/components/button' },
          { text: "Checkbox", link: "/components/checkbox" },
          { text: "Combobox", link: "/components/combobox" },
          { text: "Disclosure", link: "/components/disclosure" },
          { text: "Dropdown", link: "/components/dropdown" },
          { text: "Empty", link: "/components/empty" },
          { text: "Field", link: "/components/field" },
          { text: "Input", link: "/components/input" },
          { text: "Kbd", link: "/components/kbd" },
          { text: "Label", link: "/components/label" },
          { text: "Modal", link: "/components/modal" },
          { text: "MultiSelect", link: "/components/multiselect" },
          { text: "Panel", link: "/components/panel" },
          { text: "Popover", link: "/components/popover" },
          { text: "Progress", link: "/components/progress" },
          { text: "Select", link: "/components/select" },
          { text: "Separator", link: "/components/separator" },
          { text: "Sidebar", link: "/components/sidebar" },
          { text: "Skeleton", link: "/components/skeleton" },
          { text: "Spinner", link: "/components/spinner" },
          { text: "Switch", link: "/components/switch" },
          { text: "Tabs", link: "/components/tabs" },
          { text: "Textarea", link: "/components/textarea" },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dlbcodes/my-design-system' }
    ]
  }
})