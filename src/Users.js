import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Users() {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchUsers = async() => {
        try {
            setUsers(null)
            setError(null)
            setLoading(true)

            const response = await axios.get('http://jsonplaceholder.typicode.com/users')
            setUsers(response.data)
        } catch (e) {
            setError(e)
        }
        setLoading(false) // loading is done
    }

    useEffect(() => {
        
        fetchUsers()
    }, [])

    if(loading) {
        return <div>로딩중..</div>
    }

    if(error) return <div>에러가 발생했습니다.</div>

    if(!users) return null

    return (
        <>
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.username} ({user.name})
                </li>
            ))}
        </ul>
        <button onClick={fetchUsers}>reload</button>
        </>
    )
}

export default Users