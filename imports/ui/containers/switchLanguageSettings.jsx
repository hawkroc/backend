import React from 'react'
import { connect } from 'react-redux'
import LanguageSelectorComponent from '../components/switchLanguages'
import { setLanguage } from '../../redux/actions/navigationActions'
import store from '../../redux/store'
import enUS from 'antd/lib/locale-provider/en_US'
import deDE from 'antd/lib/locale-provider/de_DE'
import zhTW from 'antd/lib/locale-provider/zh_TW'
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('en');


const View = ({
    onLanguageSelected
}) => {
    return (
        <div>
       <LanguageSelectorComponent  {...{onLanguageSelected}}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
     language:state.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLanguageSelected: (value) => {
          let lg;
            switch(value){          
                case 'cn':
                lg= Object.assign({}, zhTW);  
                break;
                case 'de':         
                lg= Object.assign({}, deDE);  
                break;
                default:
                lg=Object.assign({}, enUS);  
            }   
            dispatch(setLanguage(lg));
         
           
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)