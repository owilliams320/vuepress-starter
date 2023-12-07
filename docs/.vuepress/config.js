import { defaultTheme, defineUserConfig } from 'vuepress'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'en-US',
  title: 'Hello Teradata AI Unlimited',
  description: 'Just playing around',
  // head: [
  //   'link',
  //   {
  //     rel: 'preconnect',
  //     href: `https://fonts.googleapis.com`,
  //   },
  //   'link',
  //   {
  //     rel: 'preconnect',
  //     href: `https://fonts.gstatic.com`,
  //     crossorigin: true
  //   },
  //   'link',
  //   {
  //     rel: 'stylesheet',
  //     href: `https://fonts.googleapis.com/css?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap`,
  //   },
  //   'link',
  //   {
  //     rel: 'stylesheet',
  //     href: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block`,
  //   },
  // ],
  theme: defaultTheme({
    repo: 'vuepress/vuepress-next',
    // default theme config
    navbar: [
      {
        text: 'Docs',
        link: '/',
      },
      {
        text: 'Guides',
        link: '/guides/',
      },
    ],

    sidebar: {
      '/guides': [
        {
          text: 'Guides',
          children: [
            '/guides/README.md',
            '/guides/native-object-storage.md',
          ],
        },
      ],
    }

  }),
  alias: {
    //'@theme/Sidebar.vue': path.resolve(__dirname, './components/Sidebar.vue'),
   '@theme/Navbar.vue': path.resolve(__dirname, './components/Navbar.vue'),
   '@theme/NavbarItems.vue': path.resolve(__dirname, './components/NavbarItems.vue'),
  },
})