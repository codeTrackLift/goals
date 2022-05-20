import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import capitalize from '../utils/capitalize'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login')
        }
    }, [user, navigate, isError, message])

    useEffect(() => {
        dispatch(getGoals())

        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className="heading">
            <h1><span style={{color:'silver'}}>Welcome</span> {user && capitalize(user.name)}</h1>
            <p>Goals Dashboard</p>
        </section>

        <GoalForm />

        <section className="content">
            { goals.length > 0 ? (
                <div className='goals'>
                    {goals.map((goal) => {
                        return <GoalItem key={goal._id} goal={goal} />
                    })}
                </div>
            ) : ( 
                <h3 style={{color:'silver'}}>You have no goals</h3>
            )}
        </section>
    </>
}

export default Dashboard