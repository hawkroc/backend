import React from 'react'
import { connect } from 'react-redux'
import { LocaleProvider } from 'antd'
import HeaderContentLayout from '../layouts/headerContent'
import BodyContentLayout from '../layouts/bodyContent'
import RootComponents from '../components/rootComponents'
const View = ({
    language
}) => {
 console.log("this is language "+JSON.stringify(language));
    return (
   
       <LocaleProvider locale={language}>
          <div className="list">
            <HeaderContentLayout />
            <BodyContentLayout />
          </div>
        </LocaleProvider>
     //   <RootComponents  {...{language}}/>
    )
}

const mapStateToProps = (state) => {
    return {
        language: state.navigation.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)