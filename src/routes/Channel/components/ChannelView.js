import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Loader from 'components/Loader';
import ChannelGuide from '../containers/ChannelGuideContainer';
import ChannelSettings from './ChannelSettings';
import ChannelWebhooks from '../containers/ChannelWebhooksContainer';
import ChannelZapier from '../containers/ChannelZapierContainer';

const ChannelView = ({channel, baseUrl, channelId, currentTab, zapierToken, copy, isFetching, isSandboxMode}) => (
  <section className="ui basic segment padded-bottom">
    <h1 className="ui header">
      {channel.name || channelId}
      {' '}
      {isSandboxMode && <span className="text orange">(only for testing purposes)</span>}
    </h1>
    <div className="ui secondary pointing large menu no-padding">
      <Link className="item" activeClassName="active" to={`${baseUrl}/guides`}>Ecommerce Guides</Link>
      <Link className="item" activeClassName="active" to={`${baseUrl}/settings`}>Settings</Link>
      <Link className="item" activeClassName="active" to={`${baseUrl}/zapier`}>Zapier</Link>
      <Link className="item" activeClassName="active" to={`${baseUrl}/webhooks`}>Webhooks</Link>
    </div>
    { isFetching ?
      <Loader active={isFetching} inline={false} />
      : currentTab === 'guides' ?
      <ChannelGuide channel={channel} />
      : currentTab === 'settings' ?
      <ChannelSettings channel={channel} copy={copy} />
      : currentTab === 'webhooks' ?
      <ChannelWebhooks channelId={channelId} />
      : currentTab === 'zapier' ?
      <ChannelZapier channelId={channelId} />
      : null
    }
  </section>
);

export default ChannelView;
