export class LongText extends React.Component {
  state = {
    isFullTextShown: false,
    description: '',
  }

  componentDidMount() {
    this.getDesc()
  }

  getDesc() {
    const allowedTextLength = this.props.textLen
    const desc = this.props.body
    if (desc.length < allowedTextLength) {
      this.setState({ description: desc, isFullTextShown: true })
    } else {
      this.setState({ description: `${desc.substring(0, allowedTextLength + 1)}...`, isFullTextShown: false })
    }
  }

  onToggleFullText = () => {
    const { isFullTextShown } = this.state
    const desc = this.props.body
    if (isFullTextShown) {
      this.setState({ description: `${desc.substring(0, allowedTextLength + 1)}...`, isFullTextShown: false })
    } else {
      this.setState({ description: desc, isFullTextShown: true })
    }
  }

  render() {
    const { description, isFullTextShown } = this.state
    const desc = this.props.body
    return (
      <section className="long-text">
        <p>{description}</p>
        {/* {desc.length > allowedTextLength && <button onClick={this.onToggleFullText}>{isFullTextShown ? 'Read Less...' : 'Read more...'}</button>} */}
      </section>
    )
  }
}
