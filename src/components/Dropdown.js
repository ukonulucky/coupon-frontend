import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownComponent({dropdownData, filterTodoByState}) {
    const dropdownComponent =dropdownData.map((i,j) =>{
    return <div key={j} onClick={() => {
        filterTodoByState(i.state)
    }}>
        <Dropdown.Item >
        {i.state}
        </Dropdown.Item>
    </div>
    })
  return (
    <DropdownButton id="dropdown-basic-button" title="Coupons By State">
        <div onClick={() => {
        filterTodoByState("all")
    }}>
        <Dropdown.Item >
        All State
        </Dropdown.Item>
    </div>
     {dropdownComponent}
    </DropdownButton>
  );
}

export default DropdownComponent;