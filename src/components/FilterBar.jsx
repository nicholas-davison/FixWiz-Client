import { Form, FormControl } from "react-bootstrap";
import { useState } from "react";

export const FilterBar = ({ categories, onFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchText, setSearchText] = useState("");

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        onFilter(e.target.value, searchText); // Apply filter when category changes
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        onFilter(selectedCategory, e.target.value); // Apply filter as the user types
    };

    return (
        <Form className="d-flex m-4 " >
            <Form.Control
                as="select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="me-2"
            >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </Form.Control>
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchText}
                onChange={handleSearchChange}
            />
        </Form>
    );
};
