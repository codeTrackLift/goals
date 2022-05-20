import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal, updateGoal } from '../features/goals/goalSlice'
import { FaRegEdit, FaTimesCircle, FaSave, FaRegWindowClose } from 'react-icons/fa'

const updateButtonStyle = {
    border:'none',
    color:'cornflowerblue',
    backgroundColor:'transparent'
}

const saveButtonStyle = {
    border:'none',
    color:'cornflowerblue',
    backgroundColor:'transparent',
    marginInline:'1rem'
}

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
                <form 
                    className='goal-edit-form' 
                    onSubmit={e => e.preventDefault()}
                >
                    <div className='form-group'>
                        <input 
                            type='text'
                            name='text'
                            id='text'
                            placeholder='Enter goal text'
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{fontSize:'0.75rem',width:'90%'}}
                        />
                    </div>
                    <p style={{color:'cornflowerblue'}}>Save?</p>
                    <button 
                        className='goal-save-icon' 
                        type='button' 
                        onClick={onUpdateGoal} 
                        style={saveButtonStyle}
                    >
                        <FaSave size={25} />
                    </button>
                    <button 
                        className='goal-skip-save-icon' 
                        type='button' 
                        onClick={() => setShowEditForm(prevState => !prevState)} style={saveButtonStyle}
                    >
                        <FaTimesCircle size={25} />
                    </button>
                </form>
            ) : (
                <div className="goal-text-wrapper">
                    <hr style={{marginInline:'1rem'}} />
                    <h3>{goal.text}</h3>
                    <button 
                        className='goal-edit icon' 
                        style={updateButtonStyle}
                        onClick={() => setShowEditForm(prevState => !prevState)}
                    >
                        <FaRegEdit size={20}/> Update
                    </button>
                </div>
            )}
            <button 
                className='close' 
                style={{margin:'-0.5rem',color:'cornflowerblue',}}  
                onClick={onDeleteGoal}
            >
                <span>Delete </span><FaRegWindowClose size={20}/>
            </button>
        </div>
    )
}

export default GoalItem