import  { Navbar } from "./components/Navbar/Navbar";
import  { Header } from "./components/Header/Header";
import  { Card } from "./components/Card/Card";
import { useLayoutEffect } from 'react';
import { websiteStateObject, skeletonStateObject, dataStateObject, getSkeletonConfig } from './state'
import './App.css';

export const App = () => {

  const websiteState = websiteStateObject.subscribe()
  const skeletonState = skeletonStateObject.subscribe()
  const dataState = dataStateObject.subscribe()

  /**
   * The "sm-loading" class and the configuration are set once, on the "body", instead of every card.
   * While the data is loading the class is present, otherwise it is removed.
   */
  useLayoutEffect(() => {
    document.body.classList.toggle('sm-loading', dataState.dataStatus === 'loading')
  }, [dataState.dataStatus])

  useLayoutEffect(() => {
    document.body.setAttribute('data-sm-config', JSON.stringify(getSkeletonConfig(skeletonState)))
  }, [skeletonState])

  /** The "color-scheme" of the page, which the "inherit" theme of the skeleton takes. */
  useLayoutEffect(() => {
    const { colorScheme } = websiteState
    if (colorScheme === 'normal') document.documentElement.style.removeProperty('color-scheme')
    else document.documentElement.style.colorScheme = colorScheme
  }, [websiteState.colorScheme])

  const cards = [
    {
      imgUrl: '01.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '02.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '03.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '04.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '05.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '06.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '07.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '08.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '09.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '10.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '11.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
    {
      imgUrl: '12.png',
      title: 'Skeleton',
      subtitle: 'Mammoth',
      description: 'Skeleton Mammoth shows placeholders while the data is loading, so the layout does not jump when the real text appears on the page.',
    },
  ]

  return <div className={`app app--${websiteState.websiteTheme}`}>
    <Navbar />
    <div className='content'>
      <Header />
      <div className='cards'>
        {cards.map((card, index) => <Card key={index} {...card} />)}
      </div>
    </div>
  </div>
}
