import { defineConfig } from 'vitepress'
import tailwindcss from "@tailwindcss/vite";
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin";
import { PluginOption } from 'vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Design System [WIP]",
  description: "A Vue 3 component library",
  appearance: false,
  vite: {
    plugins: [tailwindcss() as any],
    server: {
      fs: {
        allow: [".."],
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
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "For LLMs (llms.txt)", link: "/llms.txt" },
          { text: "Theming", link: "/guide/theming" },
        ],
      },
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
          { text: "MultiSelect", link: "/components/multiselect" },
          { text: "Textarea", link: "/components/textarea" },
          { text: "Select", link: "/components/select" },
          { text: "Tabs", link: "/components/tabs" },
          { text: "Disclosure", link: "/components/disclosure" },
          { text: "Separator", link: "/components/separator" },
          { text: "Skeleton", link: "/components/skeleton" },
          { text: "Progress", link: "/components/progress" },
          { text: "Alert", link: "/components/alert" },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dlbcodes/my-design-system' }
    ]
  }
})