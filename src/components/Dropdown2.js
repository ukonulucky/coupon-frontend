import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownComponent2({ filterTodoByCategory}) {
    const sections = ["E-commerce", "engineering","learning", "software"];
    const dropdownComponent =sections.map((i,j) =>{
    return <div key={j} onClick={() => {
        filterTodoByCategory(i)
    }}>
        <Dropdown.Item >
        {i}
        </Dropdown.Item>
    </div>
    }) 
  return (
    <DropdownButton id="dropdown-basic-button" title="Coupons By Category">
        <div onClick={() => {
        filterTodoByCategory("all")
    }}>
        <Dropdown.Item >
        All Categories
        </Dropdown.Item>
    </div>
     {dropdownComponent}
    </DropdownButton>
  );
}

export default DropdownComponent2;