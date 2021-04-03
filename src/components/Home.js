import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import UserInfoSecond from './UserInfo/UserInfoSecond';



const Home = () => {

    const [users, setUsers] = useState(null)
    console.log(users)


    // firestoreのusersコレクションにはこのようなデーターが入っています

    // {
    //     id: "AgoxL9Vtt1MJum4m"
    //     timestamp: 2021年4月3日18:24:16 UTC + 9
    //     userDesc: "カレーが好きです"
    //     userImage:"https://firebasestorage.googleapis.com/v0/b/nf-project-12f23.appspot.com/o/images%2FAgoxL9Vtt1MJum4m?alt=media&token=3126b747-b41b-4541-9b01-cc811a54d4a4"
    //     username:"naoya"

    //    このようなデータが他にも３つほど
    // }

    // usersコレクションの中身を全て取得してsetUsersに格納しています
    useEffect(() => {
        db.collection('users').orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                const users = snapshot.docs.map(doc => {
                    return doc.data()
                })

                setUsers(users)
            })
    }, [])
    return (
        <>
            {/* users配列の中身の数だけ<Link>を生成しています */}
            {users?.map((user) => (
                <>
                    {/* Routerのpathで'/users:id'の:idの部分はどんな文字列が渡ってきても<UserSecond/>に遷移と書いてあります。
                    ${user.id}の部分にはfirestoreのusersコレクションから取得したidを渡しています
                    例として上記のIDを渡して<UserInfoSecond/>のコンポーネントに遷移した際に,
                    localhost:3000/userinfo/AgoxL9Vtt1MJum4m ← この最後の/以降の文字列が渡したIDの部分
                    といったURLに変化します */}

                    {/* 以降の説明はUserInfoSecondへ */}
                    <Link style={{ marginRight: '10px' }} to={`userinfo/${user.id}`} >{user.username}</Link>
                </>
            ))}
        </>
    )
}

export default Home;