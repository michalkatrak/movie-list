import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {FaSearch} from 'react-icons/fa';
import styles from './SearchBox.styles';


const SearchBox = () => {
    const classes = styles();
    const [searchString, setSearchString] = useState<string>('');
    const history = useHistory();

    const handleSearch = () => {
        history.push(`/search/${searchString}`);
    };

    return (
        <div className={classes.root}>
            <input
                type="text"
                value={searchString}
                onChange={(a) => setSearchString(a.target.value)}
                className={classes.input}
            />
            <button onClick={handleSearch} className={classes.button}>
                <FaSearch />
            </button>
        </div>
    );
};

export default SearchBox;