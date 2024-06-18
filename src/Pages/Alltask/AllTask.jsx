import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Edit from '../../Components/Edit'
import Add from '../../Components/Add'
import Delete from '../../Components/Delete'

function AllTask() {
  return (
<div className='container'>

<div className='text-end mt-3'>
  <Add />
</div>

<div className='table-responsive'>
  <Table striped bordered hover className='mt-5'>
    <thead>
      <tr>
        <th>#</th>
        <th>User Name</th>
        <th>Batch Name</th>
        <th>Tutor Name</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td><Edit /></td>
        <td><Delete /></td>
      </tr>
    </tbody>
  </Table>
</div>

</div>
  )
}

export default AllTask