import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/content/clear';

import s from './CreatePoll.css';

class CreatePoll extends React.Component {
  constructor() {
    super();
    this.state = {
      answers: [],
      title: '',
      answer: '',
      multiple: false,
      error: '',
      titleError: '',
      answerError: '',
      titleFocus: false,
    };
  }

  addAnswer = () => {
    const { answers, answer } = this.state;
    if (answer !== '') {
      answers.push(answer);
      this.setState({ answers, answer: '', error: '', answerError: '' });
    }
    else {
      this.setState({ answerError: "Answer can't be empty" });
    }
  }

  removeAnswer = (event, i) => {
    const { answers } = this.state;
    answers.splice(i, 1);
    this.setState({ answers });
  }

  changeTitle = (event) => {
    this.setState({ title: event.target.value, titleError: '' });
  }

  changeAnswer = (event) => {
    this.setState({ answer: event.target.value, answerError: '' });
  }

  keyPress = (event) => {
    if (event.which === 13) {
      this.addAnswer();
    }
  }

  multipleCheck = () => {
    this.setState({ multiple: !this.state.multiple });
  }

  submit = () => {
    let error = '';
    let titleError = '';
    if (this.state.answers.length === 0) {
      error = 'Poll must have answers';
    }
    if (this.state.title === '') {
      titleError = 'Poll must have a title';
    }
    this.setState({ error, titleError });
  }

  titleFocus = () => {
    this.setState({ titleFocus: true });
  }

  titleBlur = () => {
    this.setState({ titleFocus: false });
  }

  render() {
    const { answer,
         title,
         answers,
         multiple,
         error,
         titleError,
         answerError,
         titleFocus } = this.state;

    let answerList = answers.map((item, i) => (
      <div>
        <Divider />
        <ListItem
          rightIconButton={
            <IconButton
              touch
              onMouseUp={() => this.removeAnswer(i)}
            >
              <Delete />
            </IconButton>
          }
          primaryText={item}
          key={i}
        />
        <Divider />
      </div>
    ));

    return (
      <div className="container">
        <div className="row">
          <h1 className="center-text">Create Poll</h1>
          <div className="center-text col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <Paper zDepth={2} className={s.container}>
              <TextField
                value={title}
                id="poll-title-input"
                floatingLabelText="Poll Title"
                className={`${s.titleField} ${titleFocus || title ? s.focus : ''}`}
                floatingLabelStyle={{ color: 'black' }}
                floatingLabelFocusStyle={{ color: this.context.muiTheme.palette.accent1Color }}
                onChange={this.changeTitle}
                errorText={titleError}
                onFocus={this.titleFocus}
                onBlur={this.titleBlur}
              />

              <List classNmae={s.answers}>
                {answerList}
              </List>

            </Paper>

            <div className={s.addDiv}>
              <TextField
                value={answer}
                id="poll-answer-input"
                floatingLabelText="Add Answer"
                className={s.answerField}
                floatingLabelStyle={{ color: 'black' }}
                floatingLabelFocusStyle={{ color: this.context.muiTheme.palette.accent1Color }}
                onChange={this.changeAnswer}
                onKeyDown={this.keyPress}
                errorText={answerError}
              />

              <FloatingActionButton
                mini
                secondary
                className={s.add}
                onMouseUp={this.addAnswer}
              >
                <Add />
              </FloatingActionButton>
            </div>

            <Checkbox
              label="Enable multiple answers?"
              checked={multiple}
              onCheck={this.multipleCheck}
              className={s.checkbox}
            />

            <FlatButton
              primary
              label="Create Poll"
              onMouseUp={this.submit}
            />
            <span className={s.error}>{error}</span>
          </div>
        </div>
      </div>
    );
  }
}

CreatePoll.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default withStyles(s)(CreatePoll);
