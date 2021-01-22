import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

function PlayCard() {
    const [errorMessage, setErrorMessage] = useState(false);
    const [users, setUsers] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);

    const handleInputUsers = event => {
        setUsers(event.target.value);
    };
      
    const handleForm = event => {
        event.preventDefault();
        if (users > 0) {
            setErrorMessage(false);
            axios({
                method: 'post',
                url: '/api/dealCard',
                data: {users},
                headers: {'Content-Type': 'application/json' }
                })
                .then(function (response) {
                    setPlayerCards(response.data);
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data)
                     }
                });

        } else {
            setErrorMessage(true);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Playing Cards Assignment</div>
                        <div className="card-body">
                            <h3>Distributing cards to the players.</h3>
                                <label>Key in the numbers of player:</label>
                                <form onSubmit={handleForm}>
                                    <input type="text" 
                                        required
                                        className="form-control" 
                                        placeholder="Number of players"
                                        value={users}
                                        onChange={handleInputUsers}
                                    />
                                    {
                                        errorMessage == true ? "Input value does not exist or value is invalid" : ""
                                    }
                                    
                                    <hr/>
                                    <button className="btn btn-block btn-primary">Start</button>
                                </form>
                                <div className="results">
                                    <hr/>
                                    <ul>
                                        { 
                                            playerCards.length != 0 && playerCards.map((player, index) => (
                                                <li key={index}>
                                                    { player.join(', ') }
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayCard;

if (document.getElementById('play-card')) {
    ReactDOM.render(<PlayCard />, document.getElementById('play-card'));
}
