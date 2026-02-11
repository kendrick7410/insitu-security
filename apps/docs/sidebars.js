/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Installation',
      items: [
        'installation/hub',
        'installation/cameras',
        'installation/sensors',
        'installation/keypads-sirens',
        'installation/mobile-app',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/getting-started',
        'configuration/zones',
        'configuration/notifications',
        'configuration/integrations',
      ],
    },
    {
      type: 'category',
      label: 'Dépannage',
      items: [
        'troubleshooting/connection-issues',
        'troubleshooting/battery',
        'troubleshooting/false-alarms',
        'troubleshooting/camera-issues',
      ],
    },
    {
      type: 'doc',
      id: 'maintenance',
      label: 'Maintenance',
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ',
    },
  ],
};

module.exports = sidebars;
