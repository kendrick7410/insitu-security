// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'InSitu Security Docs',
  tagline: 'Documentation technique pour vos équipements de sécurité',
  favicon: 'img/favicon.ico',

  url: 'https://docs.insitusecurity.fr',
  baseUrl: '/',

  organizationName: 'insitusecurity',
  projectName: 'docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      navbar: {
        title: 'InSitu Security',
        logo: {
          alt: 'InSitu Security Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'http://localhost:3000',
            label: 'Site principal',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Installation',
                to: '/category/installation',
              },
              {
                label: 'Configuration',
                to: '/category/configuration',
              },
              {
                label: 'Dépannage',
                to: '/category/troubleshooting',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Centre d\'aide',
                href: 'http://localhost:3000/support',
              },
              {
                label: 'Nous contacter',
                href: 'http://localhost:3000/contact',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} InSitu Security.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
