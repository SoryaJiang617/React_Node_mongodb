import { useEffect } from "react"
import { useNavigate } from "react-router-dom" 
import { useSelector,useDispatch } from "react-redux"
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals,reset } from "../features/goals/goalSlice"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {goals,isLoading,isError,message} = useSelector((state) => state.goals)
  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getGoals())
    return () => {
      dispatch(reset())
    } //when the component unmounts then need to return from user effect,so return reset
  },[user,navigate, isError, message, dispatch])

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>welcome {user && user.name}</h1>
        <p>goals Dashboard</p>
      </section>
      <GoalForm/>
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>you have not set any goals</h3>)}
      </section>
    </>
  )
}

export default Dashboard