import React from 'react';
import { useState, useRef, useContext, useEffect } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';
import back from '../assets/img/tanamshromlis_info_00.png';
import backM from '../assets/img/tanamshromlis_info_02.png';

function Laptop_Info() {
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

  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [brand, setBrand] = useState('');

  const token = process.env.REACT_APP_TOKEN;

  const params = useParams();

  const navigate = useNavigate();
  const [laptopInfo, setLaptopInfo] = useState('');
  // console.log(laptopInfo);
  //console.log('LaptopInfo');

  const getTeam = async () => {
    console.log('getTeam');
    console.log(laptopInfo.user.team_id);

    try {
      const response = await fetch(
        `https://pcfy.redberryinternship.ge/api/teams`,
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
        // console.log(Data.data);
        Data.data?.map((item) => {
          if (laptopInfo.user.team_id === item.id) setTeam(item.name);
        });
      } else {
        console.log('error');
        //  setAlert(data.message, 'error');
      }
    } catch (err) {
      console.log(err, 'catch error');
      //  setAlert(err, 'error');
    }
  };
  const getPosition = async () => {
    //  console.log('getPositionsArray');

    try {
      const response = await fetch(
        `https://pcfy.redberryinternship.ge/api/positions`,
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
        // console.log(Data.data);
        //console.log(team);
        Data.data?.map((item) => {
          if (laptopInfo.user.position_id === item.id) {
            setPosition(item.name);
          }
        });
      } else {
        console.log('error');
        //  setAlert(data.message, 'error');
      }
    } catch (err) {
      console.log(err, 'catch error');
      //  setAlert(err, 'error');
    }
  };
  const getBrand = async () => {
    //console.log('getTeamsArray');

    try {
      const response = await fetch(
        `https://pcfy.redberryinternship.ge/api/brands`,
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
        // console.log(Data.data);
        //console.log(team);
        Data.data?.map((item) => {
          if (laptopInfo.laptop.brand_id === item.id) {
            setBrand(item.name);
          }
        });
      } else {
        console.log('error');
        //  setAlert(data.message, 'error');
      }
    } catch (err) {
      console.log(err, 'catch error');
      //  setAlert(err, 'error');
    }
  };

  const getLaptopInfo = async () => {
    // console.log('getLaptopInfo');

    try {
      const response = await fetch(
        `https://pcfy.redberryinternship.ge/api/laptop/${params.id}?token=${token}`,
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
        setLaptopInfo(Data.data);
        //  console.log(laptopInfo.length);
        console.log(Data.data);
      } else {
        console.log('error');
        //  setAlert(data.message, 'error');
      }
    } catch (err) {
      console.log(err, 'catch error');
      //  setAlert(err, 'error');
    }
  };

  const handleBack = (event) => {
    //  console.log('handleSubmit');
    navigate('/laptop_list');
  };

  useEffect(() => {
    getLaptopInfo();
  }, []);

  useEffect(() => {
    if (laptopInfo !== '') {
      getTeam();
      getPosition();
      getBrand();
    }
  }, [laptopInfo]);

  return (
    <>
      {laptopInfo !== '' && team !== '' && position !== '' && brand !== '' && (
        <>
          {isMobile ? (
            <>
              <div className='flex flex-col bg-white h-full w-full p-4'>
                <div className='flex flex-row  '>
                  <div className='flex mt-1 h-full '>
                    <button onClick={handleBack} className=''>
                      <img src={backM} />
                    </button>
                  </div>
                  <div className='flex flex-col items-center justify-center w-full  '>
                    <div className='flex-row text-xl font-bold'>
                      ლეპტოპის ინფო
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center '>
                  <img
                    src={`https://pcfy.redberryinternship.ge${laptopInfo.laptop.image}`}
                    alt='image'
                  />
                </div>
                <div className=''>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>სახელი:</div>
                    <div className='w-[235px] text-[#797979]'>
                      {laptopInfo.user.name}&nbsp;{laptopInfo.user.surname}
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>თიმი:</div>
                    <div className='w-[235px] text-[#797979]'>{team}</div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>პოზიცია:</div>
                    <div className='w-[235px] text-[#797979]'>{position}</div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>მეილი:</div>
                    <div className='w-[235px] text-[#797979]'>
                      {laptopInfo.user.email}
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>ტელ. ნომერი:</div>
                    <div className='w-[235px] text-[#797979]'>
                      {laptopInfo.user.phone_number}
                    </div>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='flex items-center justify-center border-b-2 border-[#EBEBEB] w-[358px] mt-2'></div>
                </div>
                <div className=' mt-4'>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>ლეპტოპის სახელი:</div>
                    <div className='w-[235px] text-[#797979]'>
                      {laptopInfo.laptop.name}
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>ლეპტოპის ბრენდი:</div>
                    <div className='w-[235px] text-[#797979]'>{brand}</div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>RAM:</div>
                    <div className='w-[235px] text-[#797979]'>
                      {laptopInfo.laptop.ram}
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>მეხსიერების ტიპი:</div>
                    <div className='w-[235px] text-[#797979]'>
                      {laptopInfo.laptop.hard_drive_type}
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>CPU:</div>
                    <div className='w-[235px] text-[#797979]'>
                      {laptopInfo.laptop.cpu.name}
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>CPU-ს ბირთვი:</div>
                    <div className='w-[235px] text-[#797979]'>
                      {laptopInfo.laptop.cpu.cores}
                    </div>
                  </div>
                  <div className='flex'>
                    <div className='w-[192px] font-bold'>CPU-ს ნაკადი:</div>
                    <div className='w-[235px] text-[#797979]'>
                      {laptopInfo.laptop.cpu.threads}
                    </div>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='flex items-center justify-center border-b-2 border-[#EBEBEB] w-[358px] mt-2'></div>
                </div>
                <div className='flex mt-4'>
                  <div className='w-[192px] font-bold'>მდგომარეობა:</div>
                  <div className='w-[235px] text-[#797979]'>
                    {laptopInfo.laptop.state === 'used' ? (
                      <div className=''>მეორადი</div>
                    ) : (
                      <div className=''>ახალი</div>
                    )}
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-[192px] font-bold'>ლეპტოპის ფასი:</div>
                  <div className='w-[235px] text-[#797979]'>
                    {laptopInfo.laptop.price}&nbsp;₾
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-[192px] font-bold'>შევსების რიცხვი:</div>
                  <div className='w-[235px] text-[#797979]'>
                    {laptopInfo.laptop.purchase_date}
                  </div>
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
                    ლეპტოპის ინფო
                    <div className='mt-2'></div>
                  </div>
                </div>
              </div>
              <div className='flex  flex-col justify-center items-center'>
                <div className='flex justify-center items-center'>
                  <div className='w-[577px] flex justify-center items-center '>
                    <img
                      classname='w-[577px]'
                      src={`https://pcfy.redberryinternship.ge${laptopInfo.laptop.image}`}
                      alt='image'
                    />
                  </div>
                  <div className='w-[577px]'>
                    <div className='flex'>
                      <div className='w-[192px] font-bold'>სახელი:</div>
                      <div className='w-[235px] text-[#797979]'>
                        {laptopInfo.user.name}&nbsp;{laptopInfo.user.surname}
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='w-[192px] font-bold'>თიმი:</div>
                      <div className='w-[235px] text-[#797979]'>{team}</div>
                    </div>
                    <div className='flex'>
                      <div className='w-[192px] font-bold'>პოზიცია:</div>
                      <div className='w-[235px] text-[#797979]'>{position}</div>
                    </div>
                    <div className='flex'>
                      <div className='w-[192px] font-bold'>მეილი:</div>
                      <div className='w-[235px] text-[#797979]'>
                        {laptopInfo.user.email}
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='w-[192px] font-bold'>ტელ. ნომერი:</div>
                      <div className='w-[235px] text-[#797979]'>
                        {laptopInfo.user.phone_number}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <div className='flex items-center justify-center border-b-2 border-[#EBEBEB] w-[1178px] mt-2'></div>
                </div>
                <div className='flex mt-6'>
                  <div className='w-[577px] '>
                    <div className='flex'>
                      <div className='w-[235px] font-bold'>
                        ლეპტოპის სახელი:
                      </div>
                      <div className=' text-[#797979]'>
                        {laptopInfo.laptop.name}
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='w-[235px] font-bold'>
                        ლეპტოპის ბრენდი:
                      </div>
                      <div className=' text-[#797979]'>{brand}</div>
                    </div>
                    <div className='flex'>
                      <div className='w-[235px] font-bold'>RAM:</div>
                      <div className=' text-[#797979]'>
                        {laptopInfo.laptop.ram}
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='w-[235px] font-bold'>
                        მეხსიერების ტიპი:
                      </div>
                      <div className=' text-[#797979]'>
                        {laptopInfo.laptop.hard_drive_type}
                      </div>
                    </div>
                  </div>
                  <div className='w-[577px]'>
                    <div className='flex'>
                      <div className='w-[192px] font-bold'>CPU:</div>
                      <div className=' text-[#797979]'>
                        {laptopInfo.laptop.cpu.name}
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='w-[192px] font-bold'>CPU-ს ბირთვი:</div>
                      <div className=' text-[#797979]'>
                        {laptopInfo.laptop.cpu.cores}
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='w-[192px] font-bold'>CPU-ს ნაკადი:</div>
                      <div className=' text-[#797979]'>
                        {laptopInfo.laptop.cpu.threads}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <div className='flex items-center justify-center border-b-2 border-[#EBEBEB] w-[1178px] mt-2'></div>
                </div>
                <div className='flex mt-6'>
                  <div className='w-[577px] '>
                    <div className='flex '>
                      <div className='w-[235px] font-bold'>
                        ლეპტოპის მდგომარეობა:
                      </div>
                      <div className='w-[235px]  text-[#797979]'>
                        {laptopInfo.laptop.state === 'used' ? (
                          <div className=''>მეორადი</div>
                        ) : (
                          <div className=''>ახალი</div>
                        )}
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='w-[235px] font-bold'>ლეპტოპის ფასი:</div>
                      <div className='w-[235px]  text-[#797979]'>
                        {laptopInfo.laptop.price}&nbsp;₾
                      </div>
                    </div>
                  </div>
                  <div className=' w-[577px]'>
                    <div className='flex'>
                      <div className='w-[192px]  font-bold'>
                        შევსების რიცხვი:
                      </div>
                      <div className='w-[235px] text-[#797979]'>
                        {laptopInfo.laptop.purchase_date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Laptop_Info;
