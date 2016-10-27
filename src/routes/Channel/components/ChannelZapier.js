import React, {PropTypes} from 'react';
import {Table} from 'components/Table';
import classNames from './ChannelZapier.scss';
import Loader from 'components/Loader';

const ZAPIER_INSTRUCTIONS_URL = "https://s3.amazonaws.com/microapps-open-assets/MONEI-Zapier-Instruction.pdf";
const ChannelZapier = ({zapierToken, isFetching, copy}) => (
  <div className="ui basic segment padded-bottom">
    <Table 
      selectable={true}
      className="large definition fixed single line"
    >
      <tr className={classNames.row} onClick={() => copy(zapierToken, "API Token")}>
        <td className="two wide">API Token</td>
        { !zapierToken ? <td><Loader isFetching={true} inline={true}/></td> : null}
        {!!zapierToken ? <td>{zapierToken}</td> : null}
      </tr>
      <tr className="center aligned">
        <td colSpan="2"><a target="_blank" href={ZAPIER_INSTRUCTIONS_URL}>Zapier instructions</a></td>
      </tr>
    </Table>
  </div>
);

export default ChannelZapier;