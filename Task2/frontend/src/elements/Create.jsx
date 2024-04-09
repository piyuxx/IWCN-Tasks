import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create( props ) {
  console.log(props)
    const [values, setValues] = useState({
        title: '',
        description: ''
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        axios.post('/add_user', values)
            .then((res) => {
                props.setShowForm(!props.showForm);
                console.log(res);
                props.setBool(prev => !prev)
            })
            .catch((err) => console.log(err));

        navigate('/');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
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
                    <button className="btn btn-primary">
                        Add Note
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Create;
