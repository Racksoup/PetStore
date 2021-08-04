import React from 'react';

const UpdateUser = (props) => {
  return (
    <div className='UpdateUserBox'>
      <h3 className='UpdateUserTitle'>Update User</h3>
      <form>
        <div className='UpdateUserItem'>
          <p className='UpdateUserItemTag'>Username:</p>
          <input className='UpdateUserInput' />
        </div>
        <div className='UpdateUserItem'>
          <input type='submit' value='Submit' className='UpdateUserSubmit' />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
