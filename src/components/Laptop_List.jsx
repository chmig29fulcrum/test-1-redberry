import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useContext, useEffect } from 'react';

import back from '../assets/img/tanamshromlis_info_00.png';
import backM from '../assets/img/tanamshromlis_info_02.png';

import LaptopContext from './LaptopContext';
import LaptopThumbnail from './LaptopThumbnail';

function Laptop_list() {
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

  const token = process.env.REACT_APP_TOKEN;
  console.log(token);
  const navigate = useNavigate();
  const [laptopsArray, setLaptopsArray] = useState([]);

  const handleBack = (event) => {
    //  console.log('handleSubmit');
    navigate('/');
  };

  const getLaptopsArray = async () => {
    console.log('getLaptopsArray');
    try {
      const response = await fetch(
        `https://pcfy.redberryinternship.ge/api/laptops?token=${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const Data = await response.json();
      // console.log(response.ok);
      if (response.ok && response.status === 200) {
        console.log(Data.data);
        let options = [];
        Data.data?.map((item) =>
          options.push({
            image: item.laptop.image,
            laptopName: item.laptop.name,
            id: item.laptop.id,
            name: item.user.name,
            surname: item.user.surname,
          })
        );
        setLaptopsArray(options);
        console.log(options);

        //  setTeamsArray(options);
      } else {
        console.log('error');
        //  setAlert(data.message, 'error');
      }
    } catch (err) {
      console.log(err, 'catch error');
      //  setAlert(err, 'error');
    }
  };

  useEffect(() => {
    getLaptopsArray();
  }, []);

  return (
    <>
      {laptopsArray.length > 0 && (
        <>
          {isMobile ? (
            <>
              <div className='flex flex-col bg-white h-full w-full '>
                <div className='flex flex-row p-4 '>
                  <div className='flex mt-1 h-full '>
                    <button onClick={handleBack} className=''>
                      <img src={backM} />
                    </button>
                  </div>
                  <div className='flex flex-col items-center justify-center w-full  '>
                    <div className='flex-row text-base font-bold'>
                      ჩანაწერების სია
                    </div>
                  </div>
                </div>
                <div className='w-[50px] '>
                  <LaptopThumbnail
                    image={laptopsArray[0].image}
                    laptopName={laptopsArray[0].laptopName}
                    id={laptopsArray[0].id}
                    name={laptopsArray[0].name}
                    surname={laptopsArray[0].surname}
                    cssM='M'
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='absolute mt-[53px] ml-[70px]'>
                <button onClick={handleBack} className=''>
                  <img src={back} />
                </button>
              </div>
              <div className=' flex flex-col items-center justify-center  h-full '>
                <div className='  flex   text-black font-bold mt-[91px]'>
                  <div className='flex flex-col items-center justify-center  text-2xl font-bold   text-center '>
                    ჩანაწერების სია
                    <div className='mt-2'></div>
                  </div>
                </div>
              </div>
              <div className='mt-[10px] w-[1206px] flex items-center justify-center'>
                <LaptopThumbnail
                  image={laptopsArray[0].image}
                  laptopName={laptopsArray[0].laptopName}
                  id={laptopsArray[0].id}
                  name={laptopsArray[0].name}
                  surname={laptopsArray[0].surname}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Laptop_list;
