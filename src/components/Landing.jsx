import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import landing_00 from '../assets/img/landing_00.png';
import landing_01 from '../assets/img/landing_01.png';
import landing_m01 from '../assets/img/landing_m01.png';

function Landing() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    window.screen.width <= 390 ? setIsMobile(true) : setIsMobile(false);
  }, [window.screen.width]);
  const handleResize = () => {
    if (window.innerWidth <= 390) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  window.addEventListener('resize', handleResize);

  const navigate = useNavigate();

  const handleBtn1Click = () => {
    navigate('/tanamshromlis_info');
  };

  const handleBtn2Click = () => {
    navigate('/laptop_list');
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className='flex items-center justify-center mt-[67px]'>
            <img src={landing_00} />
          </div>
          <div className='flex items-center justify-center mt-[117px] '>
            <img className='' src={landing_m01} />
          </div>
          <div className='mt-[123px] '>
            <div className='flex items-center justify-center '>
              <button
                onClick={handleBtn1Click}
                className=' w-[358px] bg-[#62A1EB] hover:bg-[#1A5DAB] text-white text-base font-bold py-[18px] px-4 rounded-lg'
              >
                ჩანაწერის დამატება
              </button>
            </div>
            <div className='flex items-center justify-center  mt-[16px]'>
              <button
                onClick={handleBtn2Click}
                className=' w-[358px] bg-[#62A1EB] hover:bg-[#1A5DAB] text-white text-base font-bold py-[18px] px-4 rounded-lg'
              >
                ჩანაწერების სია
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex items-center justify-center mt-[79px]'>
            <img src={landing_00} />
          </div>
          <div className='flex items-center justify-center mt-[85px] ml-[114px]'>
            <img className='' src={landing_01} />
          </div>
          <div className='mt-[123px] '>
            <div className='flex items-center justify-center '>
              <button
                onClick={handleBtn1Click}
                className=' w-[387px] bg-[#62A1EB] hover:bg-[#1A5DAB] text-white text-base font-bold py-[18px] px-4 rounded-lg'
              >
                ჩანაწერის დამატება
              </button>
            </div>
            <div className='flex items-center justify-center  mt-[26px]'>
              <button
                onClick={handleBtn2Click}
                className=' w-[387px] bg-[#62A1EB] hover:bg-[#1A5DAB] text-white text-base font-bold py-[18px] px-4 rounded-lg'
              >
                ჩანაწერების სია
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Landing;
