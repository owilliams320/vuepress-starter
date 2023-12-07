import type { Meta, StoryObj } from '@storybook/vue3';

import Header from './Header.vue';
import NavItem from './NavItem.vue';
import Button from '../button/Button.vue';
import Icon from '../icon/Icon.vue';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/Header',
  component: Header,
  render: (args: any) => ({
    components: { Header, Button, Icon, NavItem },
    setup() {
      return { args };
    },
    template: `
      <Header :title="args.title" >
        <template v-slot:navigation>
            <NavItem v-for="item in args.navItems" :href="item.href" :active="item.active">{{item.label}}</NavItem>
        </template>
        <template v-slot:actions>
          <Icon>search</Icon>
          <Button v-if="args.headerAction" :label="args.headerAction" primary></Button>
        </template>
      </Header>
    `
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DotCom: Story = {
  args: {
    headerAction: 'Contact us',
    navItems : [
      {
        href: 'https://quickstarts.teradata.com/',
        label: 'Who we help',
        active: true,
      }, {
        href: 'https://docs.teradata.com/',
        label: 'Our platform'
      }, {
        href: 'https://downloads.teradata.com/',
        label: 'Getting started'
      }, {
        href: 'https://support.teradata.com/community',
        label: 'Insights'
      }, {
        href: 'https://support.teradata.com/community',
        label: 'About us'
      }
    ]
  },
};

export const Developers: Story = {
  args: {
    title: 'Developers',
    headerAction: 'Login',
    navItems : [
      {
        href: 'https://quickstarts.teradata.com/',
        label: 'Getting started',
        active: true,
      }, {
        href: 'https://docs.teradata.com/',
        label: 'Docs'
      }, {
        href: 'https://downloads.teradata.com/',
        label: 'Downloads'
      }, {
        href: 'https://support.teradata.com/community',
        label: 'Community'
      }
    ]
  },
};

export const Support: Story = {
  args: {
    title: 'Support',
    headerAction: 'Login'
  }
};

export const Careers: Story = {
  args: {
    title: 'Careers',
    headerAction: 'Login',
    navItems : [
      {
        href: '#',
        label: 'Home',
        active: true,
      }, {
        href: '#',
        label: 'Paths'
      }, {
        href: '#',
        label: 'Talent'
      }, {
        href: '#',
        label: 'Locations'
      }
    ]
  }
};

export const Investors: Story = {
  args: {
    title: 'Investors',
    headerAction: 'Login'
  }
};
