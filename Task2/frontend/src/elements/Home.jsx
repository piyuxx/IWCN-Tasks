import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Create from './Create'

function Home() {
    const [data, setData] = useState([])
    const [deleted, setDeleted] = useState(true)
    const [showForm, setShowForm] = useState(false);
    const [bool, setBool] = useState()
    const [values, setValues] = useState({
        title: '',
        description: ''
    });
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('/students')
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    
    }, [deleted,bool])
    function handleSubmit(e) {
        e.preventDefault();

        axios.post('/add_user', values)
            .then((res) => {
               setShowForm(!showForm);
                console.log(res);
               setBool(!bool)
               setValues( {title: '',
               description: ''})
            })
            .catch((err) => console.log(err));

        navigate('/');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    function handleDelete(id){
        axios.delete(`/delete/${id}`)
        .then((res)=>{
            setDeleted(!deleted)
        })
        .catch((err)=> console.log(err))
    }
    
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className='container-fluid  vh-100 vw-100 ' style={{ backgroundColor: '#99C7B8' }}>
        <h3>Students</h3>
        <div className='d-flex justify-content-end mb-10'>
                <input
          type="text"
          className="form-control mb-3"
          placeholder="Click here to add a new note"
          onClick={toggleForm}
          style={{ backgroundColor: 'cream' }}
          
        />
        </div>
        {showForm && (
 <form onSubmit={handleSubmit}>
 <div className="card mb-3">
     <div className="card-body">
         <h5 className="card-title">Add Note</h5>
         <div className="form-group">
             <input
                 type="text"
                 className="form-control mb-2"
                 placeholder="Title"
                 name="title"
                 value={values.title}
                 onChange={handleChange}
                 required
             />
             <textarea
                 className="form-control"
                 rows="3"
                 placeholder="Description"
                 name="description"
                 value={values.description}
                 onChange={handleChange}
                 required
             ></textarea>
         </div>
         <button className="btn btn-primary mt-3">
             Add Note
         </button>
     </div>
 </div>
</form>       
      )}
       
            
         <div className="row mt-10">
        {data.map((note) => (
          <div className="col-md-4" key={note.id}>
            <div className="card mb-3">
              <div className="card-body" style={{ backgroundColor: '#F5F5DC' }}>
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
               
                <button onClick={()=>handleDelete(note.id)} className='btn mx-2 btn-danger'>Delete</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home