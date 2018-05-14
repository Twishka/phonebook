import React, {Component} from 'react';
import styled from 'styled-components';
import update from 'immutability-helper';
import {Input} from 'reactstrap';

const ContactBase = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContactTable = styled.table`
    margin: 20px;
    text-align: center;
    border-spacing: 0 4px;
    thead th {
        background-color: #e5deee;
    }
    
    td, th {
        padding: 5px;
    }
    
    tbody tr:nth-child(odd) td {
        background-color: #eedee0;
    }
    
    tbody tr:nth-child(even) td {
        background-color: #e0deee;
    }
    
    img {
        display:block;
        height:15px;
        width:auto;
        opacity: 0.6;
    }
    
    
    .tdimg.tdimg {
        background: transparent;
    }
    
    .search {
        background: white url(search-icon.png) no-repeat scroll;
        background-size: 15px, auto;
        background-position: 0.5%, 50%;
        padding-left: 22px;
        width: 100%;
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */
        box-sizing: border-box;
        -webkit-appearance: none;
    }
    
`;

function anyKeyIncludes(obj, value) {
    return Object.keys(obj).find(function(key) {
        return String(obj[key]).toLowerCase().includes(value.toLowerCase());
    })
}

// const anyKeyIncludes = (obj, value) => Object.keys(obj).find(
//     key => String(obj[key]).toLowerCase().includes(value.toLowerCase();

class Phonebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: JSON.parse(localStorage.getItem('contacts')) || [],

            // contacts: [
            //     {name: "John", surname: "Doe", number: "+380734562396"},
            //     {name: "Richard", surname: "Brown", number: "+752127637543"},
            //     {name: "Alice", surname: "Smith", number: "+47227876347"},
            // ],
            filteredContacts: [],
            newContact: {},
            currentlyEditing: null,
            editedContact: {},
            searchString: "",
        };
    };

    render() {
        const contacts = this.state.searchString
            ? this.state.contacts.filter(contact => anyKeyIncludes(contact, this.state.searchString))
            : this.state.contacts;
        return (
            <ContactBase>
                <ContactTable>
                    <thead>
                    <tr>
                        <td colSpan={"3"}>
                            <Input type={"search"}
                                   className={"search"}
                                   placeholder={"Search"}
                                   onChange={this.search}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map(this.renderContact)}
                    <tr>
                        <td>
                            <input value={this.state.newContact.name} onChange={this.onChange('name')}
                                   placeholder={"First Name"}/>
                        </td>
                        <td>
                            <input value={this.state.newContact.surname} onChange={this.onChange('surname')}
                                   placeholder={"Last Name"}/>
                        </td>
                        <td>
                            <input value={this.state.newContact.number} onChange={this.onChange('number')}
                                   placeholder={"Phone Number"}/>
                        </td>
                        <td className="tdimg" title={"Add"} onClick={this.addContact}>
                            <img src={"add-icon.png"} alt={"Add"}/>
                        </td>

                    </tr>
                    </tbody>
                </ContactTable>

            </ContactBase>
        );
    };

    saveContactsLocal = () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    };

    renderContact = (contact, index) => {
        if (this.state.currentlyEditing === index) {
            return (
                <tr>
                    <td>
                        <Input value={this.state.editedContact.name} onChange={this.onEdit('name')}/>
                    </td>
                    <td>
                        <Input value={this.state.editedContact.surname} onChange={this.onEdit('surname')}/>
                    </td>
                    <td>
                        <Input value={this.state.editedContact.number} onChange={this.onEdit('number')}/>
                    </td>
                    <td className="tdimg" title="Save" onClick={() => this.saveChanges(index)}>
                        <img src={"check-icon.png"}/>
                    </td>
                </tr>
            )
        }

        return (
            <tr>
                <td onClick={() => this.editContact(index)}>{contact.name}</td>
                <td onClick={() => this.editContact(index)}>{contact.surname}</td>
                <td onClick={() => this.editContact(index)}>{contact.number}</td>
                <td className="tdimg" title={"Delete"}
                    onClick={() => this.deleteContact(index)}>
                    <img src={"delete-icon.png"} alt={"Delete"}/></td>
            </tr>
        );
    };

    onEdit = fieldName => event => {
        const editedContact = {...this.state.editedContact, [fieldName]: event.target.value};
        this.setState({editedContact});
    };

    onChange = fieldName => event => {
        const newContact = {...this.state.newContact, [fieldName]: event.target.value};
        this.setState({newContact});
    };

    search = event => {
        this.setState({searchString: event.target.value})
    };

    addContact = () => {
        console.log(this.state);
        this.setState({
            contacts: [...this.state.contacts, this.state.newContact],
            newContact: {
                name: '',
                surname: '',
                number: ''
            },
        });
        this.saveContactsLocal();
    };

    deleteContact = (index) => {
        let contacts = this.state.contacts;
        contacts.splice(index, 1);
        this.setState({contacts});
        this.saveContactsLocal();
    };

    editContact = (index) => {
        this.setState({
            currentlyEditing: index,
            editedContact: {...this.state.contacts[index]}
        });
    };

    saveChanges = (index) => {
        const contacts = this.state.contacts;
        const updContacts = update(contacts, {$splice: [[index, 1, this.state.editedContact]]});
        this.setState({currentlyEditing: null, contacts: updContacts});
        this.saveContactsLocal();
    };
}

export default Phonebook;