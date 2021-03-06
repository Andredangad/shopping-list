import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

class ShoppingList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchValue:'',
            stockShow:true,

        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value){
        this.setState({
        searchValue:value,

        })
    }
    render() {

        return (
            <div>
            <Search searchValue = {this.state.searchValue} filter = {this.handleChange} filterText = {this.state.searchValue}/>
            <Result shoppingItems = {this.props.shoppingItems} state = {this.state}/>
            </div>



        )
    };
}

class Search extends React.Component {
    render() {
  
        return (
            <form>
                <input type="text" placeholder="Search..." onChange={e => this.props.filter(e.target.value)} value={this.props.filterText}/>
                <p>
                    <input type="checkbox" />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        )
    };
}

class Result extends React.Component {
    render() {
        console.log(this.props.state)
        let list = [];
        let currentCategory = null;
        this.props.shoppingItems.forEach(element => {
            if (element.category !== currentCategory) {
                list.push(
                    <TitleList element={element} key={element.category} />
                );
            }
            list.push(
                <ResultList element={element} key={element.name}  />
            );
            currentCategory = element.category;

        })
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{list}</tbody>
            </table>


        )
    };
}


class TitleList extends React.Component {
    render() {
        const category = this.props.element.category;
        return (
            <tr>
                <th>
                    {category}
                </th>
            </tr>
        )
    };
}

class ResultList extends React.Component {

    render() {
        const name = this.props.element.stocked ? this.props.element.name : <span style={{color: 'red'}}>{this.props.element.name}</span>;
        const price = this.props.element.price;
        return (
            <tr>
                <td>
                    {name}
                </td>
                <td>
                    {price}
                </td>
            </tr>
        )
    };
}

const ITEMS = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

ReactDOM.render(
    <ShoppingList shoppingItems={ITEMS} />,
    document.getElementById('root')
);