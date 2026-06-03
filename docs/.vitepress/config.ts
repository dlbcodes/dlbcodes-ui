import { defineConfig } from 'vitepress'
import tailwindcss from "@tailwindcss/vite";
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Design System",
  description: "A Vue 3 component library",
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: [".."],  // allow access to the repo root (parent of docs/)
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
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'Button', link: '/components/button' },
          { text: "Badge", link: "/components/badge" },
          { text: "Spinner", link: "/components/spinner" },
          { text: "Kbd", link: "/components/kbd" },
          { text: "Label", link: "/components/label" },
          { text: "Checkbox", link: "/components/checkbox" },
          { text: "Switch", link: "/components/switch" },
          { text: "Popover", link: "/components/popover" },
          { text: "Dropdown", link: "/components/dropdown" },
          { text: "Field", link: "/components/field" },
          { text: "Input", link: "/components/input" },
          { text: "Modal", link: "/components/modal" },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})