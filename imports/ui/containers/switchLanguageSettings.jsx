import React from 'react'
import { connect } from 'react-redux'
import LanguageSelectorComponent from '../components/switchLanguages'
import { setLanguage } from '../../redux/actions/navigationActions'
import enUS from 'antd/lib/locale-provider/en_US'
import deDE from 'antd/lib/locale-provider/de_DE'
import zhTW from 'antd/lib/locale-provider/zh_TW'
import jaJP from 'antd/lib/locale-provider/ja_JP'
 import en from '../../../public/language/en'
 import zh from '../../../public/language/zh'
 import de from '../../../public/language/de'
 import ja from '../../../public/language/ja'


const View = ({
    onLanguageSelected
}) => {
    return (
        <LanguageSelectorComponent  {...{onLanguageSelected}}/>
    )
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLanguageSelected: (value) => {

            let lg;

            switch(value){          
                case 'cn':
                    lg = Object.assign({}, {language:zhTW,languageConfig:zh})
                    break;

                case 'de':         
                    lg = Object.assign({}, {language:deDE,languageConfig:de})
                    break;
                case 'jp':         
                    lg = Object.assign({}, {language:jaJP,languageConfig:ja})
                    break;
                default:
                lg = Object.assign({}, {language:enUS,languageConfig:en})
            }

            dispatch(setLanguage(lg))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)