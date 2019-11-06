import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import '@material-ui/core'
import './index.css';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Input} from "@material-ui/core";


const CardStyle = {
    width: "300px"
};

const CardHolder = {
    display: "flex"
};

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
        this.setState({[key]: value});
    }

    addItem() {
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()

        };

        const listToDo = [...this.state.listToDo];
        listToDo.push(newItem);

        this.setState({
            listToDo,
            newItem: ""
        });

    }

    addDoneItem(id) {
        const listToDo = [...this.state.listToDo];
        const listNew = this.state.listDone;
        listToDo.forEach(function (item, index, object) {
            if (item.id === id) {
                listNew.push(item);
                listToDo.splice(index, 1);
            }
        });

        this.setState({listToDo: listToDo, listDone: listNew});
    }

    addToDoItem(id) {
        const listDone = [...this.state.listDone];
        const listNew = this.state.listToDo;
        listDone.forEach(function (item, index, object) {
            if (item.id === id) {
                listNew.push(item);
                listDone.splice(index, 1);
            }
        });

        this.setState({listDone: listDone, listToDo: listNew});
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && this.state.newItem.length) {
            this.addItem();
        }
    };

    render() {
        return (
            <Container>
                <br/>
                <Input
                    type="text"
                    placeholder="Введите текст..."
                    value={this.state.newItem}
                    onChange={e => this.updateInput("newItem", e.target.value)}
                    onKeyDown={this.handleKeyDown}
                />
                <Button onClick={() => this.addItem()} disabled={!this.state.newItem.length}>Добавить</Button>
                <br/> <br/>
                <div style={CardHolder}>
                    <Card style={CardStyle}>
                        <CardContent>
                            <h3>Не готово</h3>
                            <ul>
                                {this.state.listToDo.map(item => {
                                    return (
                                        <li key={item.id}>
                                            {item.value}
                                            <button onClick={() => this.addDoneItem(item.id)}>
                                                Готово
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card style={CardStyle}>
                        <CardContent>
                            <h3>Готово</h3>
                            <ul>
                                {this.state.listDone.map(item => {
                                    return (
                                        <li key={item.id}>
                                            {item.value}
                                            <button onClick={() => this.addToDoItem(item.id)}>
                                                <i>Не готово</i>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));