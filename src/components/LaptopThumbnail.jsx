import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LaptopThumbnail(props) {
  console.log(props.image);
  return (
    <div className={`laptopThumbnail${props.cssM} flex`}>
      <div className={`ltImage${props.cssM} align-top`}>
        <img
          className={`ltImage${props.cssM} `}
          src={`https://pcfy.redberryinternship.ge${props.image}`}
          alt='image'
        />
      </div>
      <div className=''>
        <div className={`cMT10${props.cssM}`}>
          {props.name}&nbsp;{props.surname}
        </div>
        <div className={`cMT10${props.cssM}`}>{props.laptopName}</div>
        <div className={`cMT50${props.cssM}`}>
          <Link to={`/laptop_info/${props.id}`} className=''>
            მეტის ნახვა
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LaptopThumbnail;
