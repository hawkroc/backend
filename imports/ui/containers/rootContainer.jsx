import React from 'react'
import { connect } from 'react-redux'
import { LocaleProvider } from 'antd'
import HeaderContentLayout from '../layouts/headerContent'
import BodyContentLayout from '../layouts/bodyContent'

const View = ({
    language
}) => {

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