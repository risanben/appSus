export class BookDescription extends React.Component {

    state = {
        txt:'',
        hiddenTxt : null,
        isTextShown: ''
    }

    componentDidMount(){
        console.log('this.props:', this.props)
        this.getDesc()
    }

    getDesc(){
        const desc = this.props.text
        if(desc.length < 100) {
            this.description = desc
            this.setState({more: null})}
        else{
            this.description = desc.substring(0,101)
            this.setState({more: desc.substring(101)})
            
        }
    }

    onReadMore = () =>{
        if(!this.state.more) return
        else{ 
            this.description = this.props.bookDesc
            this.setState({more: null})}
    }


    render(){
        const {hiddenTxt} = this.state
    return <section>
        <p>{this.description}</p>
        {hiddenTxt && <button onClick={this.onReadMore}>Read more...</button>}
    </section>

    }

}


