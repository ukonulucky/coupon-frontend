import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DropdownComponent from './Dropdown';
import DropdownComponent2 from './Dropdown2';

function ResponsiveExample({couponsProp, filterTodoByState, filterTodoByCategory}) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="d-lg-none d-md-non bg-secondary border-light" onClick={handleShow}>
        Show Categories List
      </Button>

      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='mt-5'>List Of Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex flex-column'> 
         <DropdownComponent  filterTodoByState={filterTodoByState} />
        <div className='mt-5'>
        <DropdownComponent2  filterTodoByCategory={filterTodoByCategory} />
        </div>

        </Offcanvas.Body>
        
      </Offcanvas>
    </>
  );
} 

export default ResponsiveExample;