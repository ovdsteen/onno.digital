import React from 'react';
import { Link } from 'react-router-dom'

import NavigationData from '~/static/data/navigation'

function Item(props) {

    return (
        <li className="navigation__item"  >
            <Link to={`${props.item.slug}`} >{props.item.label}</Link>
        </li>
    );
}

export default function Navigation() {

    let Items = '';

    Items = NavigationData.map((item,key) => {
        return (<Item item={item} key={key} />);
    });

    return (
        <nav className="navigation">
            <ul className="navigation__list">
                {Items}
            </ul>
        </nav>
    );
}
