import React from 'react'
import { connect } from 'react-redux'
import { LocaleProvider } from 'antd'
import HeaderContentLayout from '../layouts/headerContent'
import BodyContentLayout from '../layouts/bodyContent'

const View = ({
    language,
    language_config
}) => {

    return (
   
       <LocaleProvider locale={language}>
          <div className="list">
            <HeaderContentLayout />
            <BodyContentLayout {...{ language_config,language }}/> 
          </div>
        </LocaleProvider>
     //   <RootComponents  {...{language}}/>
    )
}

const mapStateToProps = (state) => {
    return {
        language: state.navigation.language,
        language_config: state.navigation.language_config
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)