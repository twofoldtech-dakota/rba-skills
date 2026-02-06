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
					label: 'Plan',
					collapsed: true,
					items: [
						{ label: 'Discovery & Requirements', autogenerate: { directory: 'plan/discovery-and-requirements' } },
						{ label: 'Proposals & Scoping', autogenerate: { directory: 'plan/proposals-and-scoping' } },
						{ label: 'Project Kickoff', autogenerate: { directory: 'plan/project-kickoff' } },
						{ label: 'Sprint Ceremonies', autogenerate: { directory: 'plan/sprint-ceremonies' } },
						{ label: 'Change & Transition', autogenerate: { directory: 'plan/change-and-transition' } },
					],
				},
				{
					label: 'Build',
					collapsed: true,
					items: [
						{ label: 'Content Modeling', autogenerate: { directory: 'build/content-modeling' } },
						{ label: 'Component Development', autogenerate: { directory: 'build/component-development' } },
						{ label: 'Platform Configuration', autogenerate: { directory: 'build/platform-configuration' } },
						{ label: 'Architecture & Integration', autogenerate: { directory: 'build/architecture-and-integration' } },
						{ label: 'Design Systems', autogenerate: { directory: 'build/design-systems' } },
					],
				},
				{
					label: 'Test & Review',
					collapsed: true,
					items: [
						{ label: 'Code Review', autogenerate: { directory: 'test-and-review/code-review' } },
						{ label: 'Testing', autogenerate: { directory: 'test-and-review/testing' } },
						{ label: 'Auditing', autogenerate: { directory: 'test-and-review/auditing' } },
						{ label: 'Compliance & Security', autogenerate: { directory: 'test-and-review/compliance-and-security' } },
					],
				},
				{
					label: 'Operate',
					collapsed: true,
					items: [
						{ label: 'Deployment & Go-Live', autogenerate: { directory: 'operate/deployment-and-go-live' } },
						{ label: 'Performance', autogenerate: { directory: 'operate/performance' } },
						{ label: 'Troubleshooting', autogenerate: { directory: 'operate/troubleshooting' } },
						{ label: 'Knowledge Transfer', autogenerate: { directory: 'operate/knowledge-transfer' } },
					],
				},
				{
					label: 'Communicate',
					collapsed: true,
					items: [
						{ label: 'Client-Facing', autogenerate: { directory: 'communicate/client-facing' } },
						{ label: 'Internal', autogenerate: { directory: 'communicate/internal' } },
						{ label: 'Enablement', autogenerate: { directory: 'communicate/enablement' } },
					],
				},
				{
					label: 'Browse by Discipline',
					collapsed: true,
					items: [
						{ label: 'Strategy', slug: 'disciplines/strategy' },
						{ label: 'Design', slug: 'disciplines/design' },
						{ label: 'Engineering', slug: 'disciplines/engineering' },
						{ label: 'Security & Oversight', slug: 'disciplines/security' },
					],
				},
				{
					label: 'Browse by Platform',
					badge: { text: 'Tech', variant: 'note' },
					collapsed: true,
					items: [
						{ label: 'Sitecore', slug: 'platforms/sitecore' },
						{ label: 'Umbraco', slug: 'platforms/umbraco' },
						{ label: 'Optimizely', slug: 'platforms/optimizely' },
						{ label: 'Microsoft Azure', slug: 'platforms/azure' },
					],
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
