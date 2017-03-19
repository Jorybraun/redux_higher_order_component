import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  // this class's sole purpose is to only render the composed
  // component
  class Authentication extends Component {

    constructor(props) {
      super(props);
      
      this._signOut = this._signOut.bind(this);
    }
    
    static contextTypes = {
      router: React.PropTypes.object
    }

    _signOut(props) {
      if(!props.authenticated){
        this.context.router.push('/');
      }
    }

    componentWillMount() {
      this._signOut(this.props)
    }

    componentWillUpdate(nextProps) {
      this._signOut(nextProps)
    }

    render() {
      console.log(this.context);
      return <ComposedComponent {...this.props} /> 
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }



  return connect(mapStateToProps)(Authentication);
}





// IN some other location ... not in this file...
// We want to use this HOC


// import Authentication // this is my HOC
// import Resources // this is the component that I want to wrap

// const ComposedComponent = Authentication(Resources);

// In some render method...
// <ComposedCompoenent />
