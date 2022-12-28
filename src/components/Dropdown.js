import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownComponent({filterTodoByState}) {
    const myStates = ["Lagos", "Imo", "Anambra"]
    const dropdownComponent = myStates.map((i,j) =>{
    return <div key={j} onClick={() => {
        filterTodoByState(i)
    }}>
        <Dropdown.Item >
        {i}
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