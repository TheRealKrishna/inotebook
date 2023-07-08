import AddNote from './AddNote'
import Notes from './Notes'


export default function Dashboard() {
  return (
    <div className='container'>
      <h1 className='my-4'>Dashboard</h1>
        <hr/>
        <AddNote/>
        <hr/>
        <Notes/>
    </div>
  )
}
