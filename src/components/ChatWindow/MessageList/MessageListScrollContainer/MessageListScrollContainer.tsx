/* istanbul ignore file */
import React from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { Message } from '@twilio/conversations/lib/message';
import throttle from 'lodash.throttle';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
  outerContainer: {
    minHeight: 0,
    flex: 1,
    position: 'relative',
  },
  innerScrollContainer: {
    height: '100%',
    overflowY: 'auto',
    padding: '0 1.2em 0',
  },
  messageListContainer: {
    overflowY: 'auto',
    flex: '1',
    paddingBottom: '1em',
  },
  button: {
    position: 'absolute',
    bottom: '14px',
    right: '2em',
    zIndex: 100,
    padding: '0.5em 0.9em',
    visibility: 'hidden',
    opacity: 0,
    boxShadow: '0px 4px 16px rgba(18, 28, 45, 0.2)',
    transition: 'all 0.5s ease',
  },
  showButton: {
    visibility: 'visible',
    opacity: 1,
    bottom: '24px',
  },
});

interface MessageListScrollContainerProps extends WithStyles<typeof styles> {
  messages: Message[];
}

interface MessageListScrollContainerState {
  isScrolledToBottom: boolean;
  showButton: boolean;
  messageNotificationCount: number;
}

export class MessageListScrollContainer extends React.Component<
  MessageListScrollContainerProps,
  MessageListScrollContainerState
> {
  chatThreadRef = React.createRef<HTMLDivElement>();
  state = { isScrolledToBottom: true, showButton: false, messageNotificationCount: 0 };

  scrollToBottom() {
    const innerScrollContainerEl = this.chatThreadRef.current!;
    innerScrollContainerEl.scrollTop = innerScrollContainerEl!.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
    this.chatThreadRef.current!.addEventListener('scroll', this.handleScroll);
  }

  // This component updates as users send new messages:
  componentDidUpdate(prevProps: MessageListScrollContainerProps, prevState: MessageListScrollContainerState) {
    const hasNewMessages = this.props.messages.length !== prevProps.messages.length;

    if (prevState.isScrolledToBottom && hasNewMessages) {
      this.scrollToBottom();
    } else if (hasNewMessages) {
      const numberOfNewMessages = this.props.messages.length - prevProps.messages.length;

      this.setState(previousState => ({
        // If there's at least one new message, show the 'new message' button:
        showButton: !previousState.isScrolledToBottom,
        // If 'new message' button is visible,
        // messageNotificationCount will be the number of previously unread messages + the number of new messages.
        // Otherwise, messageNotificationCount is set to 1:
        messageNotificationCount: previousState.showButton
          ? previousState.messageNotificationCount + numberOfNewMessages
          : 1,
      }));
    }
  }

  handleScroll = throttle(() => {
    const innerScrollContainerEl = this.chatThreadRef.current!;

    if (!innerScrollContainerEl) return;

    const isScrolledToBottom =
      Math.abs(
        innerScrollContainerEl.clientHeight + innerScrollContainerEl.scrollTop - innerScrollContainerEl!.scrollHeight
      ) < 1;

    this.setState(prevState => ({
      isScrolledToBottom,
      showButton: isScrolledToBottom ? false : prevState.showButton,
    }));
  }, 300);

  handleClick = () => {
    const innerScrollContainerEl = this.chatThreadRef.current!;

    innerScrollContainerEl.scrollTo({ top: innerScrollContainerEl.scrollHeight, behavior: 'smooth' });

    this.setState({ showButton: false });
  };

  componentWillUnmount() {
    const innerScrollContainerEl = this.chatThreadRef.current!;

    innerScrollContainerEl.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.outerContainer}>
        <div className={classes.innerScrollContainer} ref={this.chatThreadRef} data-cy-message-list-inner-scroll>
          <div className={classes.messageListContainer}>
            {this.props.children}
            <Button
              className={clsx(classes.button, { [classes.showButton]: this.state.showButton })}
              onClick={this.handleClick}
              startIcon={<ArrowDownwardIcon />}
              color="primary"
              variant="contained"
              data-cy-new-message-button
            >
              {this.state.messageNotificationCount} new message
              {this.state.messageNotificationCount > 1 && 's'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MessageListScrollContainer);
