import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Paper from 'material-ui/Paper';

import PollItem from '../../components/pollItem';

import s from './Explore.css';

const polls = {
  trending: {
    header: 'Trending',
  },
  top: {
    header: 'Top',
  },
  new: {
    header: 'New',
  },
  search: {
    header: 'Search',
  },
};

class Explore extends React.Component {

  static propTypes = {
    location: React.PropTypes.object.isRequired,
    routes: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
//    if (!this.props.location.query.q) {
//      this.context.router.push('/explore');
//    }
  }

  render() {
    const tab = this.props.routes[this.props.routes.length - 1].tab;

    let header = null;
    if (polls[tab]) {
      header = <h1 className={s.header}>{polls[tab].header} Polls</h1>;
    }

    return (
      <div className={s.root}>
        <Paper zDepth={2} className="container center-text">

          {header}

          <div className={`${s.content}`}>
            <PollItem
              username="papigers"
              title="Example Title dskjsad asdnasjkdnas djasnjk dasda dasdksan \
                     camckans asdnas dasdnas dasdnaskja sdasjnx asx asjdn asds \
                     dsns xsn cdj jnkas xsjanx"
              choices={[
                ['Mushrooms', 3],
                ['Onions', 1],
                ['Olives', 1],
                ['Zucchini', 1],
                ['Pepperoni', 2],
              ]}
            />

            <PollItem
              username="papigers"
              title="Example Title"
              choices={[
                ['Mushrooms', 3],
                ['Onions', 1],
                ['Olives', 1],
                ['Zucchini', 1],
                ['Pepperoni', 2],
              ]}
            />

            <PollItem
              username="papigers"
              title="Example Title"
              choices={[
                ['Mushrooms', 3],
                ['Onions', 1],
                ['Olives', 1],
                ['Zucchini', 1],
                ['Pepperoni', 2],
              ]}
            />

          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(s)(Explore);