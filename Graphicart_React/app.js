
function WelcomFunc({propos,children}) {
    return <div>
        <h1>Bonjour {propos}</h1>
        <p>{children}</p>
    </div>
}

class Welcom extends React.Component{
    render(){
        console.log(this)
        return (
            <div>
                <h1>Bonjour {this.props.name}</h1>
                <p>{this.props.children}</p>
            </div>
        )
    }
}


class Clock extends React.Component{

    constructor (props){
        super(props)
        this.state= {date: new Date()}
        this.timer = null
    }
// lorsqu'un composant est monté
    componentDidMount (){
        this.timer = window.setInterval(this.tick.bind(this),1000)
    }
// lorsqu'un composant est supprimé
    componentwillUnmount(){
        window.clearInterval(this.timer)
    }

    tick(){
        this.setState({date: new Date()})
    }

    render(){
        const date = new Date();
        return (
            <div>il est {date.toLocaleDateString()} {date.toLocaleTimeString()}

            </div>
        )
    }
}

class ManuelIncrement extends React.Component{

    constructor(props){
        super(props)
        this.state = {n: 0}
    } 
    
     increment() {
        this.setState((state,props)=>({n:state.n+1}))
    }
    render() {
        return <div> la valeur est : {this.state.n} <button onClick={this.increment.bind(this)}>+</button></div>
        
    }
}
class Increment extends React.Component{
constructor(props){
    super(props)
    this.state = {n:props.start,timer:null}
    this.toggle=this.toggle.bind(this)
    this.reinitialisation=this.reinitialisation.bind(this)
    
}

componentDidMount(){
   this.play()

}
increment(){
    this.setState((state, props)=>({n:state.n+props.step}))
}
pause(){
   window.clearInterval(this.state.timer)
   this.setState({
    timer:null
   })
}
play(){
    window.clearInterval(this.state.timer)
    this.setState({
        timer:window.setInterval(this.increment.bind(this),1000)
    })
}
componentwillUnmount(){
   window.clearInterval(this.state.timer)
}

label(){
    return this.state.timer?'Pause':'Play'
}

toggle(){
    return this.state.timer?this.pause():this.play()
}

reinitialisation(){
    this.pause()
    this.play()
    return this.setState((props,state)=>({
        n:0
    }))
}

    render(){
        return(
           
            <div> 
                valeur: {this.state.n}
           <button onClick={this.toggle}>{this.label()}</button>
           <button onClick={this.reinitialisation}>réinitialisation</button>
            </div>
        )
    }

}

Increment.defaultProps={
    start:0,
    step:1
};

function Home(){
    return (
        <div>
            <Welcom name="Ivan"> Comment vous allez </Welcom>
            <Clock/>
            <Increment/>
            <ManuelIncrement/>
        </div>
    )
}

ReactDOM.render(<Home/>, document.querySelector('.app'))