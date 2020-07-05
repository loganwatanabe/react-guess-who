import React from 'react';
import {Link} from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <Link to='/board/example'>Board Example</Link>
    </div>
  );
}

export default Homepage;