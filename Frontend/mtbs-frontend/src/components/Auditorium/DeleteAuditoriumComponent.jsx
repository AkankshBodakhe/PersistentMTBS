import React from 'react'

const DeleteAuditoriumComponent = () => {
    deleteAuditorium(id).then((response)=>{
        navigator('/list-auditoriums');
    }).catch(error => {
            console.error(error);
        })
  return (
    <div>DeleteAuditoriumComponent</div>
  )
}

export default DeleteAuditoriumComponent