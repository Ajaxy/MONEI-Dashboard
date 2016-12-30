import Widget from './containers/WidgetContainer';
import RequireAuth from 'containers/RequireAuth';

// Sync route definition
export default {
  path: 'widget',
  component: RequireAuth(Widget)
};
