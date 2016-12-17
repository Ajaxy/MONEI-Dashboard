import Widget from './containers/WidgetView';
import RequireAuth from 'containers/RequireAuth';

// Sync route definition
export default {
  path: 'widget',
  component: RequireAuth(Widget)
};
