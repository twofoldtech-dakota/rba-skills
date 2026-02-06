// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'SKILLS',
			logo: {
				light: './src/assets/rba-logo-full-color.svg',
				dark: './src/assets/rba-logo-white.svg',
				alt: 'RBA',
			},
			description:
				"DX Intelligence System — Standardized AI expertise for Enterprise Strategy, Design, and Engineering.",
			social: [
				{
					icon: 'linkedin',
					label: 'LinkedIn',
					href: 'https://www.linkedin.com/company/rba-inc-/',
				},
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/rbaconsulting',
				},
			],
			lastUpdated: true,
			editLink: {
				baseUrl: 'https://github.com/twofoldtech-dakota/rba-skills/edit/main/',
			},
			components: {
				Head: './src/components/starlight/Head.astro',
			},
			customCss: [
				'@fontsource/montserrat/400.css',
				'@fontsource/montserrat/500.css',
				'@fontsource/montserrat/600.css',
				'@fontsource/montserrat/700.css',
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Overview', slug: 'getting-started/overview' },
						{ label: 'How to Use Skills', slug: 'getting-started/how-to-use-skills' },
						{ label: 'The RBA Way', slug: 'getting-started/the-rba-way' },
					],
				},
				{
					label: 'Strategy',
					badge: { text: 'Role', variant: 'tip' },
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'roles/strategy' },
						{
							label: 'Project Management',
							autogenerate: { directory: 'roles/strategy/project-management' },
						},
						{
							label: 'Business Analysis',
							autogenerate: { directory: 'roles/strategy/business-analysis' },
						},
						{
							label: 'Digital Strategy',
							autogenerate: { directory: 'roles/strategy/digital-strategy' },
						},
						{
							label: 'Content Strategy',
							autogenerate: { directory: 'roles/strategy/content-strategy' },
						},
						{
							label: 'SEO & GEO',
							autogenerate: { directory: 'roles/strategy/seo-geo' },
						},
					],
				},
				{
					label: 'Design',
					badge: { text: 'Role', variant: 'tip' },
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'roles/design' },
						{
							label: 'UX Design',
							autogenerate: { directory: 'roles/design/ux-design' },
						},
						{
							label: 'UI Design',
							autogenerate: { directory: 'roles/design/ui-design' },
						},
						{
							label: 'Accessibility',
							autogenerate: { directory: 'roles/design/accessibility' },
						},
					],
				},
				{
					label: 'Engineering',
					badge: { text: 'Role', variant: 'tip' },
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'roles/engineering' },
						{
							label: 'Architecture',
							autogenerate: { directory: 'roles/engineering/architecture' },
						},
						{
							label: 'Software Engineering',
							items: [
								{
									label: 'Front-End',
									autogenerate: {
										directory: 'roles/engineering/software-engineering/front-end',
									},
								},
								{
									label: 'Back-End',
									autogenerate: {
										directory: 'roles/engineering/software-engineering/back-end',
									},
								},
								{
									label: 'Full-Stack',
									autogenerate: {
										directory: 'roles/engineering/software-engineering/full-stack',
									},
								},
							],
						},
						{
							label: 'Testing & QA',
							autogenerate: { directory: 'roles/engineering/testing-qa' },
						},
						{
							label: 'DevOps',
							autogenerate: { directory: 'roles/engineering/devops' },
						},
						{
							label: 'Database',
							autogenerate: { directory: 'roles/engineering/database' },
						},
					],
				},
				{
					label: 'Security & Oversight',
					badge: { text: 'Role', variant: 'tip' },
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'roles/security-oversight' },
						{
							label: 'Security',
							autogenerate: { directory: 'roles/security-oversight/security' },
						},
						{
							label: 'Compliance',
							autogenerate: { directory: 'roles/security-oversight/compliance' },
						},
						{
							label: 'Performance',
							autogenerate: { directory: 'roles/security-oversight/performance' },
						},
					],
				},
				{
					label: 'Sitecore',
					badge: { text: 'Tech', variant: 'note' },
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'technologies/sitecore' },
						{
							label: 'XM Cloud',
							autogenerate: { directory: 'technologies/sitecore/xm-cloud' },
						},
						{
							label: 'XP (Experience Platform)',
							autogenerate: { directory: 'technologies/sitecore/xp' },
						},
						{
							label: 'Headless & JSS',
							autogenerate: { directory: 'technologies/sitecore/headless-jss' },
						},
						{
							label: 'Search',
							autogenerate: { directory: 'technologies/sitecore/search' },
						},
						{
							label: 'Commerce & OrderCloud',
							autogenerate: { directory: 'technologies/sitecore/commerce' },
						},
					],
				},
				{
					label: 'Umbraco',
					badge: { text: 'Tech', variant: 'note' },
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'technologies/umbraco' },
						{
							label: 'Umbraco v13+',
							autogenerate: { directory: 'technologies/umbraco/v13-plus' },
						},
						{
							label: 'Umbraco v7-v8 (Legacy)',
							autogenerate: { directory: 'technologies/umbraco/v7-v8-legacy' },
						},
						{
							label: 'Heartcore',
							autogenerate: { directory: 'technologies/umbraco/heartcore' },
						},
					],
				},
				{
					label: 'Optimizely',
					badge: { text: 'Tech', variant: 'note' },
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'technologies/optimizely' },
						{
							label: 'Optimizely CMS',
							autogenerate: { directory: 'technologies/optimizely/optimizely-cms' },
						},
						{
							label: 'Episerver (Legacy)',
							autogenerate: { directory: 'technologies/optimizely/episerver-legacy' },
						},
						{
							label: 'CMP',
							autogenerate: { directory: 'technologies/optimizely/cmp' },
						},
						{
							label: 'Commerce',
							autogenerate: { directory: 'technologies/optimizely/commerce' },
						},
					],
				},
				{
					label: 'Microsoft Azure',
					badge: { text: 'Tech', variant: 'note' },
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'technologies/azure' },
						{
							label: 'Cloud Infrastructure',
							autogenerate: { directory: 'technologies/azure/cloud-infrastructure' },
						},
						{
							label: 'AI Services',
							autogenerate: { directory: 'technologies/azure/ai-services' },
						},
					],
				},
				{
					label: 'Cross-Role Skills',
					badge: { text: 'Shared', variant: 'success' },
					collapsed: true,
					autogenerate: { directory: 'cross-role' },
				},
				{
					label: 'Governance',
					collapsed: true,
					items: [
						{ label: 'Contributing', slug: 'governance/contributing' },
						{ label: 'Skill Standards', slug: 'governance/skill-standards' },
						{ label: 'Review Process', slug: 'governance/review-process' },
					],
				},
			],
		}),
	],
});
