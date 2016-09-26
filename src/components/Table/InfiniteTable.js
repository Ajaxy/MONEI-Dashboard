import React, {Component, PropTypes} from 'react';
import Table from './Table';
import Loader from 'components/Loader';

class InfiniteTable extends Component {
  componentDidMount() {
    const {autoLoad} = this.props;
    if(autoLoad) this.initBottomListener();
  }

  componentDidUpdate() {
    this.element.visibility("refresh");
  }

  componentWillUnmount() {
    this.element.visibility("destroy");
  }

  initBottomListener() {
    setTimeout(() => {
      this.element.visibility({
        once: false,
        observeChanges: true,
        includeMargin: true,
        onBottomVisible: () => {
          const {onLoadMore, isLastPage, isFetching} = this.props;
          if(!isLastPage && !isFetching) onLoadMore();
        }
      })
    }, 1000);
  }

  render() {
    const {children, numColumns, count, total, autoLoad, isLastPage, isFetching, onLoadMore} = this.props;
    return (
      <div ref={(s) => { this.element = $(s); }}>
        <Table
          {...this.props}
          children={[
            ...children,
            ((isFetching) ? (
              <tr key={typeof children == 'array' ?
                children.length: 999999}>
                <td colSpan={numColumns}>
                  <Loader active={true} inline={true}/>
                </td>
              </tr>
            ): null)
          ]}
          footer={
            <tr>
              <th colSpan={numColumns-1} >
                {(count && total) ?
                  `Showing ${count} of ${total}`
                  : ''}
              </th>
              <th className="right aligned">
                {(!isLastPage && !autoLoad) ?
                  <button
                    className="ui basic button center"
                    disabled={isFetching}
                    onClick={onLoadMore}
                  >Show more</button>
                  : null}
              </th>
            </tr>
          }
        />
      </div>
    );
  }
}

InfiniteTable.propTypes = Object.assign({}, Table.propTypes, {
  count: PropTypes.number,
  total: PropTypes.number,
  autoLoad: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
});

export default InfiniteTable;
