import React, {Component} from 'react';
import { LocaleProvider } from 'antd';
import HeaderContentLayout from '../layouts/headerContent';
import BodyContentLayout from '../layouts/bodyContent';
import deDE from 'antd/lib/locale-provider/de_DE';
class RootComponents extends Component {
state = {
   
     language:{},
  }

componentWillReceiveProps = (nextProps) => {

  this.setState({language:nextProps.language});
      console.log("this is language "+JSON.stringify(language));

 }
    render() {
        return (
            <div>

                <LocaleProvider locale={this.state.language}>
                    <div className="list">
                        <HeaderContentLayout/>
                        <BodyContentLayout/>
                    </div>
                </LocaleProvider>
            </div>
        );
    }

}
export default RootComponents;