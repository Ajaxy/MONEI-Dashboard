import React, {PropTypes} from 'react';
import {InfiniteTable} from 'components/Table';
import ChannelRow, {NUM_COLUMNS} from './ChannelRow';

const ChannelsView = ({channels, loadMore, viewChannel, isFetching}) => (
  <section className="ui basic segment padded-bottom">
    <h1 className="ui header">Channels</h1>
    <InfiniteTable
      isFetching={isFetching}
      isLastPage={true}
      selectable={!isFetching && channels.length > 0}
      numColumns={NUM_COLUMNS}
      onLoadMore={loadMore}
      autoLoad={true}
      className="large striped single line"
      header={<ChannelRow isHeader={true}/>}
      footer={<ChannelRow isFooter={true}/>}
    >
      {
        (channels.length > 0 || isFetching) ? channels.map((channel, index) =>
          <ChannelRow
            key={index}
            channel={channel}
            onClick={viewChannel}
          />)
        : <tr><td colSpan={NUM_COLUMNS} className="center aligned">No channels yet</td></tr>
      }
    </InfiniteTable>
  </section>
);

export default ChannelsView;