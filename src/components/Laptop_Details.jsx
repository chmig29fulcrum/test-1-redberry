import React from 'react';
import { useState, useRef, useContext, useEffect } from 'react';
import Select from 'react-select';

import { Link, useNavigate } from 'react-router-dom';

import back from '../assets/img/tanamshromlis_info_00.png';
import backM from '../assets/img/tanamshromlis_info_02.png';
import camera from '../assets/img/laptop_details_00.png';

import footerLogo from '../assets/img/tanamshromlis_info_01.png';
import FormInput from './FormInput';
import FormRadio from './FormRadio';
import LaptopContext from './LaptopContext';

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

  const {
    token,
    name,
    surname,
    team,
    position,
    email,
    phoneNumber,
    laptopPhoto,
    laptopName,
    laptopBrand,
    cpu,
    cpuCore,
    cpuThread,
    ram,
    memType,
    date,
    price,
    laptopState,
    setLaptopPhoto,
    setLaptopName,
    setLaptopBrand,
    setCpu,
    setCpuCore,
    setCpuThread,
    setRam,
    setMemType,
    setDate,
    setPrice,
    setLaptopState,
  } = useContext(LaptopContext);

  const navigate = useNavigate();

  const [brandsArray, setBrandsArray] = useState([]);
  const [cpuArray, setCpuArray] = useState([]);
  const [brandsHidden, setBrandsHidden] = useState('');
  const [cpuHidden, setCpuHidden] = useState('');
  const [preview, setPreview] = useState('');

  const handleBack = (event) => {
    //  console.log('handleSubmit');
    navigate('/tanamshromlis_info');
  };

  const create = async () => {
    console.log(create);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('team_id', team);
    formData.append('position_id', position);
    formData.append('phone_number', phoneNumber);
    formData.append('email', email);
    formData.append('token', token);
    formData.append('laptop_name', laptopName);
    formData.append('laptop_image', preview);
    formData.append('laptop_brand_id', laptopBrand);
    formData.append('laptop_cpu', cpu);
    formData.append('laptop_cpu_cores', cpuCore);
    formData.append('laptop_cpu_threads', cpuThread);
    formData.append('laptop_ram', ram);
    formData.append('laptop_hard_drive_type', memType);
    formData.append('laptop_state', laptopState);
    formData.append('laptop_purchase_date', date);
    formData.append('laptop_price', price);

    const response = await fetch(
      `https://pcfy.redberryinternship.ge/api/laptop/create`,
      {
        method: 'POST',
        headers: {
          //'Content-Type': 'multipart/form-data',
          //  'Content-Type': 'application/json',
          /*
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          type: 'formData',
          */
          // 'Content-Type': 'undefined',
        },
        body: formData,
        /*
        body: JSON.stringify({
          name: name,
          surname: surname,
          team_id: team,
          position_id: position,
          phone_number: phoneNumber,
          email: email,
          token: token,
          laptop_name: laptopName,
          // laptop_image: laptopPhoto,
          laptop_image:laptopPhoto            
          laptop_brand_id: laptopBrand,
          laptop_cpu: cpu,
          laptop_cpu_cores: cpuCore,
          laptop_cpu_threads: cpuThread,
          laptop_ram: ram,
          laptop_hard_drive_type: memType,
          laptop_state: laptopState,
          laptop_purchase_date: date,
          laptop_price: price,
        }),
        */
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
    // console.log({ memType });
    // console.log({ laptopState });
    // console.log(`brands= ${laptopBrand}`);

    //  console.log(`cpu= ${cpu}`);
    // console.log(`laptopPhoto= ${laptopPhoto}`);

    //console.log(`memType=${memType}`);

    //console.log(`laptopState=${laptopState}`);

    if (!laptopBrand) {
      document.getElementById('brandsSelect').style.border = '1px solid red';
    }
    if (!cpu) {
      document.getElementById('cpuSelect').style.border = '1px solid red';
    }
    if (laptopBrand && cpu && memType && laptopState) {
      console.log({ memType });
      console.log({ laptopState });

      //  create();
    }
  };

  const getBrandsArray = async () => {
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
        let options = [];
        Data.data?.map((item) =>
          options.push({ value: item.id, label: item.name })
        );
        setBrandsArray(options);
      } else {
        console.log('error');
        //  setAlert(data.message, 'error');
      }
    } catch (err) {
      console.log(err, 'catch error');
      //  setAlert(err, 'error');
    }
  };
  const getCpuArray = async () => {
    //  console.log('getPositionsArray');

    try {
      const response = await fetch(
        `https://pcfy.redberryinternship.ge/api/cpus`,
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
        //  console.log(Data.data);
        let options = [];
        Data.data?.map((item) =>
          options.push({ value: item.id, label: item.name })
        );
        setCpuArray(options);
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
    getBrandsArray();
    getCpuArray();
  }, []);

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

  const [drag, setDrag] = useState(false);
  const [imageDropped, setImageDropped] = useState(false);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    setImageDropped(true);
    //setLaptopPhoto(files[0]);
    setPreview(files[0]);
    /*
    if (files[0].size > 2000000) {
      console.log('File too large');
      return;
    }
    */
    // console.log('1');
    var reader = new FileReader();

    reader.onload = (e) => {
      setLaptopPhoto(reader.result);
      // console.log(reader.result); //base64encoded string
    };
    reader.readAsDataURL(files[0]);
    // console.log('2');

    /*
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
    */

    //setLaptopPhoto(files[0]);
    // console.log(e.dataTransfer);
    // setImage(files[0]);
    //setPreviewUrl(URL.createObjectURL(files[0]));
    setDrag(false);
  };

  const handleMemTypeChange = (e) => {
    setMemType(e.target.value);
  };
  const handleLaptopStateChange = (e) => {
    setLaptopState(e.target.value);
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
                <div className='flex-row text-[#898989]'>2/2</div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className=''>
              <div className='bg-white rounded-xl p-4'>
                <div className='flex items-center justify-center '>
                  <label className='custom-file-upload-m '>
                    <div className='drop-area-m !rounded-xl   '>
                      <div className='flex flex-col items-center justify-center'>
                        <div className=''>
                          <img src={camera} />
                        </div>
                        <div className='text-[#4386A9] mt-4'>
                          ჩააგდე ან ატვირთე
                        </div>
                        <div className='text-[#4386A9]'>ლეპტოპის ფოტო</div>
                        <div className='flex flex-col items-center justify-center mt-4 '>
                          <input type='file' />
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className=''>
                  <FormInput
                    name='laptopName'
                    type='text'
                    placeholder='HP'
                    label='ლეპტოპის სახელი'
                    hint='ლათინური ასოები, ციფრები, !@#$%^&*()_+='
                    value={laptopName}
                    onChange={(e) => setLaptopName(e.target.value)}
                    id='1'
                    pattern='^[a-zA-Z0-9!@#$%^&*()_+=]{1,}$'
                    inputCss='w-[358px]'
                  />
                </div>
                <div className='mt-6'>
                  <Select
                    id='brandsSelect'
                    styles={customStyles}
                    className=''
                    options={brandsArray}
                    onChange={(e) => {
                      setBrandsHidden(e.value);
                      setLaptopBrand(e.value);
                      document.getElementById('brandsSelect').style.border =
                        '1px solid #EBEBEB';
                    }}
                    defaultValue={''} /*{teamsArray[teamIndex]}*/
                    placeholder={'ლეპტოპის ბრენდი'}
                  />
                  <input
                    className='selectInput'
                    name='brands'
                    value={brandsHidden}
                    type='text'
                    title=''
                  />
                </div>
              </div>
              <div className='bg-white rounded-xl p-4 mt-2'>
                <div className=''>
                  <Select
                    id='cpuSelect'
                    styles={customStyles}
                    className=''
                    options={cpuArray}
                    onChange={(e) => {
                      // console.log(e);
                      setCpuHidden(e.label);
                      setCpu(e.label);
                      // console.log(`set cpu ${cpu}`);
                      document.getElementById('cpuSelect').style.border =
                        '1px solid #EBEBEB';
                    }}
                    defaultValue={''} /*{teamsArray[teamIndex]}*/
                    placeholder={'CPU'}
                  />
                  <input
                    className='selectInput'
                    name='cpu'
                    value={cpuHidden}
                    type='text'
                    title=''
                  />
                </div>
                <div className=''>
                  <FormInput
                    name='cpuCore'
                    type='text'
                    placeholder='14'
                    label='CPU-ს ბირთვი'
                    hint='მხოლოდ ციფრები'
                    value={cpuCore}
                    onChange={(e) => setCpuCore(e.target.value)}
                    id='4'
                    pattern='^[0-9]{1,}$'
                    inputCss='w-[358px]'
                  />
                </div>
                <div className=''>
                  <FormInput
                    name='cpuThread'
                    type='text'
                    placeholder='365'
                    label='CPU-ს ნაკადი'
                    hint='მხოლოდ ციფრები'
                    value={cpuThread}
                    onChange={(e) => setCpuThread(e.target.value)}
                    id='5'
                    pattern='^[0-9]{1,}$'
                    inputCss='w-[358px]'
                  />
                </div>
                <div className=''>
                  <FormInput
                    name='ram'
                    type='text'
                    placeholder='16'
                    label='ლეპტოპის RAM (GB)'
                    hint='მხოლოდ ციფრები'
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                    id='6'
                    pattern='^[0-9]{1,}$'
                    inputCss='w-[358px]'
                  />
                </div>
                <div className='mt-6'>
                  <label className='text-lg font-bold'>მეხსიერების ტიპი</label>
                  <div className=' flex mt-2'>
                    <FormRadio
                      changed={handleMemTypeChange}
                      id='7'
                      isSelected={memType === 'SSD'}
                      label='SSD'
                      value='SSD'
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormRadio
                      changed={handleMemTypeChange}
                      id='8'
                      isSelected={memType === 'HDD'}
                      label='HDD'
                      value='HDD'
                    />
                  </div>
                </div>
              </div>
              <div className='bg-white rounded-xl p-4 mt-2'>
                <div className=''>
                  <FormInput
                    name='date'
                    type='text'
                    placeholder='დდ / თთ / წწწწ'
                    label='შეძენის რიცხვი (არჩევითი)'
                    hint='&nbsp;'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    id='9'
                    pattern='^[0-9/]{1,10}$'
                    inputCss='w-[358px]'
                  />
                </div>
                <div className=''>
                  <FormInput
                    name='price'
                    type='text'
                    placeholder='0000'
                    label='ლეპტოპის ფასი'
                    hint='მხოლოდ ციფრები'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id='10'
                    pattern='^[0-9]{1,}$'
                    inputCss='w-[358px]'
                  />
                </div>
                <div className='mt-6'>
                  <label className='text-lg font-bold'>
                    ლეპტოპის მდგომარეობა
                  </label>
                  <div className='flex mt-2'>
                    <FormRadio
                      changed={handleLaptopStateChange}
                      id='11'
                      isSelected={laptopState === 'new'}
                      label='ახალი'
                      value='new'
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormRadio
                      changed={handleLaptopStateChange}
                      id='12'
                      isSelected={laptopState === 'used'}
                      label='მეორადი'
                      value='used'
                    />
                  </div>
                </div>
                <div className='flex  text-[#62A1EB] mt-2 mb-16 pt-8'>
                  <div className='flex mt-4 border'>
                    <Link
                      to='/tanamshromlis_info'
                      className='btn btn-ghost btn-sm rounded-btn'
                    >
                      უკან
                    </Link>
                  </div>
                  <div className='flex ml-[130px] border'>
                    <button className=' w-[176px] bg-[#62A1EB] hover:bg-[#1A5DAB] text-white text-base font-bold py-[18px] px-4 rounded-lg'>
                      დამახსოვრება
                    </button>
                  </div>
                </div>
              </div>
            </form>
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
                <div className='mt-2'></div>
              </div>
              <div className='flex flex-col items-center justify-center  text-base font-bold  text-center w-[289px]'>
                ლეპტოპის მახასიათებლები
                <div className='flex items-center justify-center border-b-2 border-black w-[185px] mt-2'></div>
              </div>
            </div>
            <div className='flex items-center justify-center  bg-[#FFFFFF] w-[1226px]  rounded-3xl'>
              <form onSubmit={handleSubmit} className=''>
                <div className='flex items-center justify-center '>
                  {imageDropped ? (
                    <div>
                      <img src={URL.createObjectURL(preview)} alt='image' />
                    </div>
                  ) : drag ? (
                    <div
                      onDragStart={(e) => dragStartHandler(e)}
                      onDragLeave={(e) => dragLeaveHandler(e)}
                      onDragOver={(e) => dragStartHandler(e)}
                      onDrop={(e) => onDropHandler(e)}
                      className='drop-area'
                    >
                      ჩააგდე
                    </div>
                  ) : (
                    <div
                      onDragStart={(e) => dragStartHandler(e)}
                      onDragLeave={(e) => dragLeaveHandler(e)}
                      onDragOver={(e) => dragStartHandler(e)}
                      className='drop-area'
                    >
                      <div className='flex flex-col items-center justify-center'>
                        <div className=''>ჩააგდე ან ატვირთე</div>
                        <div className=''>ლეპტოპის ფოტო</div>
                        <div className='flex flex-col items-center justify-center mt-8 '>
                          <label className='custom-file-upload h-[60px] w-[233px] bg-[#62A1EB] hover:bg-[#1A5DAB] rounded-3xl'>
                            ატვირთე
                            <input type='file' />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex items-center justify-center '>
                  <FormInput
                    name='laptopName'
                    type='text'
                    placeholder='HP'
                    label='ლეპტოპის სახელი'
                    hint='ლათინური ასოები, ციფრები, !@#$%^&*()_+='
                    value={laptopName}
                    onChange={(e) => setLaptopName(e.target.value)}
                    id='1'
                    pattern='^[a-zA-Z0-9!@#$%^&*()_+=]{1,}$'
                    inputCss='mr-[63px] w-[407px]'
                  />
                  <div className='w-[408px]  mt-[40px] '>
                    <Select
                      id='brandsSelect'
                      styles={customStyles}
                      className=''
                      options={brandsArray}
                      onChange={(e) => {
                        setBrandsHidden(e.value);
                        setLaptopBrand(e.value);
                        document.getElementById('brandsSelect').style.border =
                          '1px solid #EBEBEB';
                      }}
                      defaultValue={''} /*{teamsArray[teamIndex]}*/
                      placeholder={'ლეპტოპის ბრენდი'}
                    />
                    <input
                      className='selectInput'
                      name='brands'
                      value={brandsHidden}
                      type='text'
                      title=''
                    />
                  </div>
                </div>
                <div className=''>
                  <div className='flex items-center justify-center border-b-2 border-[#EBEBEB] w-[878px] mt-2'></div>
                </div>
                <div className='flex items-center justify-center '>
                  <div className='w-[277px]  mt-[40px] '>
                    <Select
                      id='cpuSelect'
                      styles={customStyles}
                      className=''
                      options={cpuArray}
                      onChange={(e) => {
                        // console.log(e);
                        setCpuHidden(e.label);
                        setCpu(e.label);
                        // console.log(`set cpu ${cpu}`);
                        document.getElementById('cpuSelect').style.border =
                          '1px solid #EBEBEB';
                      }}
                      defaultValue={''} /*{teamsArray[teamIndex]}*/
                      placeholder={'CPU'}
                    />
                    <input
                      className='selectInput'
                      name='cpu'
                      value={cpuHidden}
                      type='text'
                      title=''
                    />
                  </div>
                  <FormInput
                    name='cpuCore'
                    type='text'
                    placeholder='14'
                    label='CPU-ს ბირთვი'
                    hint='მხოლოდ ციფრები'
                    value={cpuCore}
                    onChange={(e) => setCpuCore(e.target.value)}
                    id='4'
                    pattern='^[0-9]{1,}$'
                    inputCss='mr-[63px] w-[276px]'
                  />
                  <FormInput
                    name='cpuThread'
                    type='text'
                    placeholder='365'
                    label='CPU-ს ნაკადი'
                    hint='მხოლოდ ციფრები'
                    value={cpuThread}
                    onChange={(e) => setCpuThread(e.target.value)}
                    id='5'
                    pattern='^[0-9]{1,}$'
                    inputCss='mr-[63px] w-[276px]'
                  />
                </div>
                <div className='flex items-center justify-center '>
                  <FormInput
                    name='ram'
                    type='text'
                    placeholder='16'
                    label='ლეპტოპის RAM (GB)'
                    hint='მხოლოდ ციფრები'
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                    id='6'
                    pattern='^[0-9]{1,}$'
                    inputCss='mr-[63px] w-[407px]'
                  />
                  <div className='flex flex-col items-center justify-center '>
                    <label className='text-lg font-medium '>
                      მეხსიერების ტიპი
                    </label>
                    <div className='m-6 flex'>
                      <FormRadio
                        changed={handleMemTypeChange}
                        id='7'
                        isSelected={memType === 'SSD'}
                        label='SSD'
                        value='SSD'
                      />
                      <FormRadio
                        changed={handleMemTypeChange}
                        id='8'
                        isSelected={memType === 'HDD'}
                        label='HDD'
                        value='HDD'
                      />
                    </div>
                  </div>
                </div>
                <div className=''>
                  <div className='flex items-center justify-center border-b-2 border-[#EBEBEB] w-[878px] mt-2'></div>
                </div>
                <div className='flex items-center justify-center '>
                  <FormInput
                    name='date'
                    type='text'
                    placeholder='დდ / თთ / წწწწ'
                    label='შეძენის რიცხვი (არჩევითი)'
                    hint='&nbsp;'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    id='9'
                    pattern='^[0-9/]{1,10}$'
                    inputCss='mr-[63px] w-[407px]'
                  />
                  <FormInput
                    name='price'
                    type='text'
                    placeholder='0000'
                    label='ლეპტოპის ფასი'
                    hint='მხოლოდ ციფრები'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id='10'
                    pattern='^[0-9]{1,}$'
                    inputCss='w-[407px]'
                  />
                </div>
                <div className='flex flex-col  justify-center '>
                  <label className='text-lg font-medium '>
                    ლეპტოპის მდგომარეობა
                  </label>
                  <div className='m-6 flex'>
                    <FormRadio
                      changed={handleLaptopStateChange}
                      id='11'
                      isSelected={laptopState === 'new'}
                      label='ახალი'
                      value='new'
                    />
                    <FormRadio
                      changed={handleLaptopStateChange}
                      id='12'
                      isSelected={laptopState === 'used'}
                      label='მეორადი'
                      value='used'
                    />
                  </div>
                </div>
                <div className='float-right mt-[100px] mb-[0px]'>
                  უკან
                  <button className=' w-[176px] bg-[#62A1EB] hover:bg-[#1A5DAB] text-white text-base font-bold py-[18px] px-4 rounded-lg'>
                    დამახსოვრება
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

export default Laptop_Info;
