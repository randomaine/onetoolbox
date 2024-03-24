import { Vinyl } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.kw.title'),
  path: '/kw',
  description: translate('tools.kw.description'),
  keywords: ['music', 'kw'],
  component: () => import('./kw.vue'),
  icon: Vinyl,
  createdAt: new Date('2024-03-24'),
});
