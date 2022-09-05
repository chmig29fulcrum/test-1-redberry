import { createContext, useState } from 'react';

const LaptopContext = createContext();

export function LaptopProvider({ children }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [laptopPhoto, setLaptopPhoto] = useState('');
  const [laptopName, setLaptopName] = useState('');
  const [laptopBrand, setLaptopBrand] = useState('');
  const [cpu, setCpu] = useState('');
  const [cpuCore, setCpuCore] = useState('');
  const [cpuThread, setCpuThread] = useState('');
  const [ram, setRam] = useState('');
  const [memType, setMemType] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [laptopState, setLaptopState] = useState('');
  return (
    <LaptopContext.Provider
      value={{
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
        setName,
        setSurname,
        setTeam,
        setPosition,
        setEmail,
        setPhoneNumber,
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
      }}
    >
      {children}
    </LaptopContext.Provider>
  );
}

export default LaptopContext;
