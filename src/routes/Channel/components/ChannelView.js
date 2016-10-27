import React, {PropTypes} from 'react';
import cx from 'classnames';
import classNames from './ChannelView.scss';
import {Link} from 'react-router';
import Loader from 'components/Loader';
import ChannelGuide from '../containers/ChannelGuideContainer';
import ChannelSettings from './ChannelSettings';
import ChannelWebhooks from '../containers/ChannelWebhooksContainer';
import ChannelZapier from '../containers/ChannelZapierContainer';

const ChannelView = ({channel, baseUrl, channelId, currentTab, zapierToken, copy, isFetching}) => (
  <section className="ui basic segment padded-bottom">
    <h1 className={cx("ui header", classNames.breadcrumb)}>
      <Link className={cx("ui section", classNames.link, classNames.active)} to="/channels">Channels</Link>
      <span className="divider"> / </span>
      <span className={cx("ui section", classNames.link)}>
        {channel.name || channelId}
      </span>
    </h1>
    <div className="ui segments">
      <div className="ui top attached tabular menu">
        <Link className="item" activeClassName="active" to={`${baseUrl}/guides`}>Quick Start Guides</Link>
        <Link className="item" activeClassName="active" to={`${baseUrl}/settings`}>Settings</Link>
        <Link className="item" activeClassName="active" to={`${baseUrl}/zapier`}>Zapier</Link>
        <Link className="item" activeClassName="active" to={`${baseUrl}/webhooks`}>Webhooks</Link>
      </div>
      <div className="ui bottom attached active tab segment">
        { isFetching ? 
            <Loader active={isFetching} inline={true}/> 
          : currentTab === 'guides' ?
            <ChannelGuide channel={channel}/>
          : currentTab === 'settings' ?
            <ChannelSettings channel={channel} copy={copy}/>
          : currentTab === 'webhooks' ? 
            <ChannelWebhooks channelId={channelId}/> 
          : currentTab === 'zapier' ? 
            <ChannelZapier channelId={channelId}/>
          : null
        }
      </div>
    </div>
  </section>
);

export default ChannelView;