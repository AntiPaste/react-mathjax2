import React from 'react';
import PropTypes from 'prop-types' ;

class Text extends React.Component {
  componentDidMount() {
    this.refreshMathJax();
  }

  componentDidUpdate() {
    this.refreshMathJax();
  }

  refreshMathJax() {
    const { MathJax } = this.context;
    if (!MathJax) {
      throw Error("Could not find MathJax while attempting typeset! Probably MathJax script hasn't been loaded or MathJax.Context is not in the hierarchy")
    }

    this.props.onTypeset();
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.div]);
    MathJax.Hub.Queue(this.props.onTypesetDone);
  }

  render() {
    const { classes, options } = this.props;

    return (
      <div key={ this.props.text } ref={ (div) => this.div = div }>
        { this.props.text }
      </div>
    );
  }
}

Text.propTypes = {
  onTypeset: PropTypes.func,
  onTypesetDone: PropTypes.func,
};

Text.defaultProps = {
  onTypeset: () => {},
  onTypesetDone: () => {},
};

Text.contextTypes = {
  MathJax: PropTypes.object,
};

export default Text;
