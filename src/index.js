import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import '@material-ui/core'
import './index.css';
import Button from '@material-ui/core/Button';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            listToDo: [],
            listDone: []
        };
    }

    updateInput(key, value) {
        // update react state
        this.setState({[key]: value});
    }

    addItem() {
        // create a new item with unique id
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()

        };

        // copy current list of items
        const listToDo = [...this.state.listToDo];

        // add the new item to the list
        listToDo.push(newItem);

        // update state with new list, reset the new item input
        this.setState({
            listToDo,
            newItem: ""
        });

    }

    deleteItem(id) {
        // copy current list of items
        const listToDo = [...this.state.listToDo];
        // filter out the item being deleted item => item.id !== id
        const updatedList = listToDo.filter(function (item) {
            return item.id !== id
        });


        this.setState({listToDo: updatedList});
    }

    addDoneItem(id) {
        // copy current list of items
        const listToDo = [...this.state.listToDo];

        const listNew = listToDo.splice(this.state.listToDo);

        this.setState({listDone: listNew});

        console.log(listNew, 'первый');
        console.log(this.state.listDone);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div>
                        <br/>
                        <input
                            type="text"
                            placeholder="Type item here"
                            value={this.state.newItem}
                            onChange={e => this.updateInput("newItem", e.target.value)}
                        />
                        <button onClick={() => this.addItem()} disabled={!this.state.newItem.length}>
                            <i> + </i>
                        </button>
                        <br/> <br/>
                        <ul>
                            {this.state.listToDo.map(item => {
                                return (
                                    <li key={item.id}>
                                        {item.value}
                                        <button onClick={() => this.addDoneItem(item.id)}>
                                            <i>x</i>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <ul>
                            {this.state.listDone.map(item => {
                                return (
                                    <li key={item.id}>
                                        {item.value}
                                        <button onClick={() => this.deleteItem(item.id)}>
                                            <i>x</i>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));