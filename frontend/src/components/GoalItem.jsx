import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal, updateGoal } from '../features/goals/goalSlice'
import { FaRegEdit, FaTimesCircle, FaSave, FaRegWindowClose } from 'react-icons/fa'

function GoalItem({ goal }) {
    const [text, setText] = useState(goal.text)
    const [showEditForm, setShowEditForm] = useState(false)

    const dispatch = useDispatch()

    const onUpdateGoal = () => {
        if(text.trim() === '') return

        dispatch(updateGoal({ id: goal._id, text}))
    }

    const onDeleteGoal = () => {
        dispatch(deleteGoal(goal._id))
    }
    
    return (
        <div className='goal'>
            <div style={{color:'gray'}}>{new Date(goal.createdAt).toLocaleString('en-US')}</div>

            { showEditForm ? (
                <form className='goal-edit-form' onSubmit={e => e.preventDefault()}>
                    <div className='form-group'>
                        <input 
                            type='text'
                            name='text'
                            id='text'
                            placeholder='Enter goal text'
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{fontSize:'1rem'}}
                        />
                    </div>
                    <p style={{color:'cornflowerblue'}}>Save?</p>
                    <button type='button' className='goal-save-icon' onClick={onUpdateGoal} style={{border:'none',color:'cornflowerblue',backgroundColor:'transparent',marginInline:'1rem'}}>
                        <FaSave size={25} />
                    </button>
                    <button type='button' className='goal-skip-save-icon' onClick={() => setShowEditForm(prevState => !prevState)} style={{border:'none',color:'cornflowerblue',backgroundColor:'transparent',marginInline:'1rem'}}>
                        <FaTimesCircle size={25} />
                    </button>
                </form>
            ) : (
                <div className="goal-text-wrapper">
                    <hr style={{marginInline:'1rem'}} />
                    <h2>{goal.text}</h2>
                    <button className='goal-edit icon' 
                        style={{border:'none',color:'cornflowerblue',backgroundColor:'transparent'}}
                        onClick={() => setShowEditForm(prevState => !prevState)}>
                        <FaRegEdit size={20}/> Update
                    </button>
                </div>
            )}
            <button className='close' 
                style={{margin:'-0.5rem',color:'cornflowerblue',}}  
                onClick={onDeleteGoal}>
                <span>Delete </span><FaRegWindowClose size={20}/>
            </button>
        </div>
    )
}

export default GoalItem