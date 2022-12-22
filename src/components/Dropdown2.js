import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownComponent2({dropdownData, filterTodoByState}) {
    const dropdownComponent =dropdownData.map((i,j) =>{
    return <div key={j} onClick={() => {
        filterTodoByState(i.state)
    }}>
        <Dropdown.Item >
        {i.category}
        </Dropdown.Item>
    </div>
    }) 
  return (
    <DropdownButton id="dropdown-basic-button" title="Coupons By Category">
        <div onClick={() => {
        filterTodoByState("all")
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