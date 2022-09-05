import React from 'react';
import { useState, useRef, useContext, useEffect } from 'react';
import Select from 'react-select';

import { Link, useNavigate } from 'react-router-dom';

import back from '../assets/img/tanamshromlis_info_00.png';
import backM from '../assets/img/tanamshromlis_info_02.png';

import footerLogo from '../assets/img/tanamshromlis_info_01.png';
import FormInput from './FormInput';

import LaptopContext from './LaptopContext';

function Tanamshromlis_Info() {
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

  const {
    name,
    surname,
    team,
    position,
    email,
    phoneNumber,
    setName,
    setSurname,
    setTeam,
    setPosition,
    setEmail,
    setPhoneNumber,
  } = useContext(LaptopContext);

  const navigate = useNavigate();

  const [teamsArray, setTeamsArray] = useState([]);
  const [positionsArray, setPositionsArray] = useState([]);
  const [teamHidden, setTeamHidden] = useState('');
  const [positionHidden, setPositionHidden] = useState('');

  const getTeamsArray = async () => {
    //console.log('getTeamsArray');

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
        let options = [];
        Data.data?.map((item) =>
          options.push({ value: item.id, label: item.name })
        );
        setTeamsArray(options);
      } else {
        console.log('error');
        //  setAlert(data.message, 'error');
      }
    } catch (err) {
      console.log(err, 'catch error');
      //  setAlert(err, 'error');
    }
  };
  const getPositionsArray = async () => {
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
        let options = [];
        //console.log(team);
        Data.data?.map((item) => {
          if (item.team_id == team) {
            options.push({ value: item.id, label: item.name });
          }
        });
        setPositionsArray(options);
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
    getTeamsArray();
  }, []);

  useEffect(() => {
    console.log('test');
    getPositionsArray();
  }, [team]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(teamHidden);
    console.log(team);
    if (!team) {
      document.getElementById('teamSelect').style.border = '1px solid red';
    }
    if (!position) {
      document.getElementById('positionSelect').style.border = '1px solid red';
    }
    if (team && position) {
      navigate('/laptop_details');
    }

    //  console.log('handleSubmit');
    //console.log(mailRef);

    // const data = new FormData(e.target);
    // console.log(Object.fromEntries(data.entries()));
    //console.log(data);
  };

  const handleBack = (event) => {
    //  console.log('handleSubmit');
    navigate('/');
  };

  const customStyles = {
    placeholder: (provided, state) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      color: 'black',
      padding: '15px 20px 15px 5px',
    }),
    control: (base, state) => ({
      ...base,
      background: '#EBEBEB',
      // match with the menu
      borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
      // Overwrittes the different states of border
      // borderColor: state.isFocused ? 'yellow' : 'green',
      borderColor: state.isFocused ? '#EBEBEB' : '#EBEBEB',
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        // Overwrittes the different states of border
        // borderColor: state.isFocused ? 'red' : 'blue',
      },
    }),

    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className='flex flex-col bg-[#f6f6f6] h-full w-full'>
            <div className='flex flex-row p-4 '>
              <div className='flex mt-1 h-full '>
                <button onClick={handleBack} className=''>
                  <img src={backM} />
                </button>
              </div>
              <div className='flex flex-col items-center justify-center w-full  '>
                <div className='flex-row text-base font-bold'>
                  თანამშრომლის ინფო
                </div>
                <div className='flex-row text-[#898989]'>1/2</div>
              </div>
            </div>
            <div className='bg-white rounded-xl p-4'>
              <form onSubmit={handleSubmit} className=''>
                <div className=''>
                  <FormInput
                    name='name'
                    type='text'
                    placeholder='გრიშა'
                    label='სახელი'
                    hint='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='1'
                    pattern='^[ა-ჰ]{2,}$'
                    inputCss=' w-[358px]'
                  />
                </div>
                <div className=''>
                  <FormInput
                    name='surname'
                    type='text'
                    placeholder='ბაგრატიონი'
                    label='გვარი'
                    hint='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    id='2'
                    pattern='^[ა-ჰ]{2,}$'
                    inputCss='w-[358px]'
                  />
                </div>
                <div className='mt-6'>
                  <Select
                    id='teamSelect'
                    styles={customStyles}
                    className=''
                    options={teamsArray}
                    onChange={(e) => {
                      setTeamHidden(e.value);
                      setTeam(e.value);
                      document.getElementById('teamSelect').style.border =
                        '1px solid #EBEBEB';
                    }}
                    defaultValue={''} /*{teamsArray[teamIndex]}*/
                    placeholder={'თიმი'}
                  />
                  <input
                    className='selectInput'
                    name='team'
                    value={teamHidden}
                    type='text'
                    title=''
                  />
                </div>
                <div className='mt-6'>
                  <Select
                    className='
                          bg-[#EBEBEB] bg-clip-padding bg-no-repeat
                          border border-solid border-gray-300
                          rounded
                      '
                    id='positionSelect'
                    styles={customStyles}
                    options={positionsArray}
                    onChange={(e) => {
                      setPositionHidden(e.value);
                      setPosition(e.value);
                      document.getElementById('positionSelect').style.border =
                        '1px solid #EBEBEB';
                    }}
                    defaultValue={''} /*{teamsArray[teamIndex]}*/
                    placeholder={'პოზიცია'}
                    required
                  />
                  <input
                    className='selectInput'
                    name='position'
                    value={positionHidden}
                    type='text'
                    title=''
                  />
                </div>
                <div className=''>
                  <FormInput
                    name='email'
                    type='email'
                    placeholder='grish666@redberry.ge'
                    label='მეილი'
                    hint='უნდა მთავრდებოდეს @redberry.ge-ით'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='5'
                    pattern='\w*@redberry.ge\b{13}$'
                  />
                </div>
                <div className=''>
                  <FormInput
                    name='phoneNumber'
                    type='text'
                    placeholder='+995 598 00 07 01'
                    label='ტელეფონის ნომერი'
                    hint='ქართული მობ-ნომრის ფორმატი'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    id='6'
                    pattern='^[+995][0-9]{12}$'
                  />
                </div>
                <div className='float-right mt-[40px] mb-[0px]'>
                  <button className=' w-[132px] bg-[#62A1EB] hover:bg-[#1A5DAB] text-white text-base font-bold py-[11px] px-4 rounded-lg'>
                    შემდეგი
                  </button>
                </div>
              </form>
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
          <div className=' flex flex-col items-center justify-center  h-full bg-[#F6F6F6]'>
            <div className='  flex   text-black font-bold mt-[91px]'>
              <div className='flex flex-col items-center justify-center  text-base font-bold   text-center w-[223px]'>
                თანამშრომლის ინფო
                <div className='flex items-center justify-center border-b-2 border-black w-[185px] mt-2'></div>
              </div>
              <div className='  text-base font-bold  text-center w-[289px]'>
                ლეპტოპის მახასიათებლები
                <div className=''></div>
              </div>
            </div>
            <div className='flex items-center justify-center  bg-[#FFFFFF] w-[1226px] h-[973px] mt-[32px] rounded-3xl'>
              <form onSubmit={handleSubmit} className=''>
                <div className='flex items-center justify-center '>
                  <FormInput
                    name='name'
                    type='text'
                    placeholder='გრიშა'
                    label='სახელი'
                    hint='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='1'
                    pattern='^[ა-ჰ]{2,}$'
                    inputCss='mr-[63px] w-[407px]'
                  />
                  <FormInput
                    name='surname'
                    type='text'
                    placeholder='ბაგრატიონი'
                    label='გვარი'
                    hint='მინიმუმ 2 სიმბოლო, ქართული ასოები'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    id='2'
                    pattern='^[ა-ჰ]{2,}$'
                    inputCss='w-[407px]'
                  />
                </div>
                <div className='w-[878px]  mt-[40px] '>
                  <Select
                    id='teamSelect'
                    styles={customStyles}
                    className=''
                    options={teamsArray}
                    onChange={(e) => {
                      setTeamHidden(e.value);
                      setTeam(e.value);
                      document.getElementById('teamSelect').style.border =
                        '1px solid #EBEBEB';
                    }}
                    defaultValue={''} /*{teamsArray[teamIndex]}*/
                    placeholder={'თიმი'}
                  />
                  <input
                    className='selectInput'
                    name='team'
                    value={teamHidden}
                    type='text'
                    title=''
                  />
                </div>
                <div className='w-[878px] mt-[40px] '>
                  <Select
                    className='
                          bg-[#EBEBEB] bg-clip-padding bg-no-repeat
                          border border-solid border-gray-300
                          rounded
                      '
                    id='positionSelect'
                    styles={customStyles}
                    options={positionsArray}
                    onChange={(e) => {
                      setPositionHidden(e.value);
                      setPosition(e.value);
                      document.getElementById('positionSelect').style.border =
                        '1px solid #EBEBEB';
                    }}
                    defaultValue={''} /*{teamsArray[teamIndex]}*/
                    placeholder={'პოზიცია'}
                    required
                  />
                  <input
                    className='selectInput'
                    name='position'
                    value={positionHidden}
                    type='text'
                    title=''
                  />
                </div>

                <FormInput
                  name='email'
                  type='email'
                  placeholder='grish666@redberry.ge'
                  label='მეილი'
                  hint='უნდა მთავრდებოდეს @redberry.ge-ით'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='5'
                  pattern='\w*@redberry.ge\b{13}$'

                  // refer={mailRef}
                />
                <FormInput
                  name='phoneNumber'
                  type='text'
                  placeholder='+995 598 00 07 01'
                  label='ტელეფონის ნომერი'
                  hint='უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  id='6'
                  pattern='^[+995][0-9]{12}$'

                  // setPhoneNumber={setPhoneNumber}
                />
                <div className='float-right mt-[100px] mb-[0px]'>
                  <button className=' w-[176px] bg-[#62A1EB] hover:bg-[#1A5DAB] text-white text-base font-bold py-[18px] px-4 rounded-lg'>
                    შემდეგი
                  </button>
                </div>
              </form>
            </div>

            <div className='mt-[50px] mb-[50px]'>
              <img src={footerLogo} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Tanamshromlis_Info;
