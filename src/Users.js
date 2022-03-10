import React, {useState} from 'react'
import axios from 'axios'
import {useAsync} from 'react-async'
import User from './User'

// react-async
// 장점 : 비동기 기능 대부분 탑재, 훅말고 컴포넌트 형태로 사용가능, 특정 promise 도중에 취소 가능
// 단점 : 옵션이 조금 복잡하다.

async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data
}

function Users() {
    const [userId, setUserId] = useState(null)
    const {data: users, error, isLoading, reload, run} = useAsync({
        deferFn: getUsers
    })

    if(isLoading) return <div>로딩중..</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!users) return <button onClick={run}>불러오기</button>

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => setUserId(user.id)}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={reload}>reload</button>
            {userId && <User id={userId} />}
        </>
    )
}

export default Users