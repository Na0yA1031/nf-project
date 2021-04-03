import React from 'react';
import UserInfo from './components/UserInfo/UserInfo';
import { Reset } from 'styled-reset'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserInfoSecond from './components/UserInfo/UserInfoSecond';
import Home from './components/Home';



const App = () => {
    return (
        <>
            <Reset />
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' ><Home /></Route>

                    {/* この書き方はpath='/userinfo'をベースにレンダリングを分岐させる書き方になっています。
                    renderにはpropsが自動で渡ってきているのでpropsの中の様々なプロパティの中のmatchを取り出し、
                    さらにmatchの中のurlを取り出すという書き方になっています。
                    urlの中身には/'userinfo'が入ってます */}
                    <Route path='/userinfo' render={({ match: { url } }) => (
                        <Switch>

                            {/* pathが'/userinfo'(後ろの/はあってもなくてもOK)ならuserinfoへ遷移) */}
                            <Route exact path={`${url}/`}>
                                <UserInfo />
                            </Route>

                            {/* pathが'/userinfo'(/:idの部分はどんな文字列が渡ってきてもUserSecondに遷移) */}
                            <Route path={`${url}/:id`}>
                                <UserInfoSecond />
                            </Route>
                        </Switch>
                    )} />

                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App;