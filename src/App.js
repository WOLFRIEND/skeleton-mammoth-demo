import  { Navbar } from "./components/Navbar/Navbar";
import  { Header } from "./components/Header/Header";
import  { Card } from "./components/Card/Card";
import { websiteStateObject } from './state'
import './App.css';

export const App = () => {

  const websiteState = websiteStateObject.subscribe()

  const cards = [
    {
      imgUrl: '01.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '02.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '03.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '04.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '05.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '06.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '07.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '08.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '09.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '10.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '11.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
    {
      imgUrl: '12.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
    },
  ]

  return <div className={`app app--${websiteState.websiteTheme}`}>

    <Header />
    <div className='container'>
      <Navbar />
      <div className='cards'>
        {cards.map((card, index) => <Card key={index} {...card} />)}
      </div>
    </div>
  </div>
}