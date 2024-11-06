import React, { useEffect, useState } from 'react';
import tutorial from './../../images/tutorials.svg';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import caretDown from '../../images/caretDown.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import playButton from '../../images/playButton.svg';
import Cardloader from '../../utils/cardLoader/Cardloader';

const CoursesBody = () => {
  // const data = [
  //   {
  //     id: 1,
  //     img: tutorial,
  //   },
  //   {
  //     id: 2,
  //     img: tutorial,
  //   },
  //   {
  //     id: 3,
  //     img: tutorial,
  //   },
  //   {
  //     id: 4,
  //     img: tutorial,
  //   },
  //   {
  //     id: 5,
  //     img: tutorial,
  //   },
  //   {
  //     id: 6,
  //     img: tutorial,
  //   },
  //   {
  //     id: 7,
  //     img: tutorial,
  //   },
  //   {
  //     id: 8,
  //     img: tutorial,
  //   },
  //   {
  //     id: 9,
  //     img: tutorial,
  //   },
  // ];
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch('https://mma.foodeeexpress.com.ng/api/courses')
      .then((res) => {
        if (!res.ok) {
          // Throw an error if the response status is not OK
          // throw new Error(`HTTP error! Status: ${res.status}`);
          setError('Failed to load data. Please try again later.');
          setLoading(false);
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setLoading(false);
        setCardData(data);
      })
      .catch((error) => {
        // Handle errors here
        // console.error('Error fetching data:', error);
        // Optionally set an error state to display an error message to the user
        setLoading(false);
        setError('Failed to load data. Please try again later.');
      });
  }, []);

  console.log(cardData, 'cardData');

  const stripHtmlTags = (str) => {
    return str.replace(/&lt;[^&gt;]*&gt;/g, '');
  };

  return (
    <div className='bg-[#04161A] px-4 text-white'>
      <div className='max-w-[1200px]  mx-auto  py-[3rem] md:py-[3rem]'>
        <div
        //    className="md:h-screen  items-center justify-center my-auto  "
        >
          <div className='flex items-center justify-between gap-[12px] md:gap-[38px]'>
            <div className='flex items-center justify-center w-full relative'>
              <span className='absolute left-[15px] md:left-[30px] text-[#808080]'>
                <CiSearch size={24} />
              </span>
              <input
                placeholder='Search'
                className='w-full pl-[50px] md:pl-[65px]  bg-[#021F26] border border-[#021F26] text-white outline-none rounded-full h-[50px] text-sm'
                type='search'
              />
            </div>
            <div className=''>
              <div className='w-full  bg-[#021F26] text-left border border-[#021F26] text-white outline-none rounded-full px-[12px] md:px-[26px] pr-[25px] md:pr-[36px] py-[14px] font-bold text-sm flex items-center gap-[10px] md:gap-[20px]'>
                <p className=''>Category</p>
                <LazyLoadImage
                  src={caretDown}
                  alt='mma image'
                  className='w-[14px] h-[14px]'
                />
              </div>
            </div>
          </div>
          {loading ? (
            <div className='my-[61px]'>
              <Cardloader />
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 mt-[61px] gap-8 md:gap-y-[61px] pb-[61px]'>
              {cardData?.data?.map((item) => (
                <div
                  // to={`/course/${item.id}`}
                  key={item.id}
                  className='max-w-sm rounded overflow-hidden'
                >
                  <div key={item.id} className=''>
                    <div className=' flex flex-col overflow-hidden'>
                      {/* <LazyLoadImage src={item.img} alt='mma icons' /> */}
                      <div>
                        <LazyLoadImage
                          src={`${item.thumbnail}`}
                          alt='mma'
                          className='rounded-tr-[50px] rounded-tl-[50px]'
                        />
                      </div>
                      <div className='bg-course rounded-br-[50px] rounded-bl-[50px] py-[21px]'>
                        <div className='flex justify-between items-center md:mx-[25px]   '>
                          <div className=''>
                            <p className='text-xl font-bold'>{item.title}</p>
                            <p className='text-sm text-[#EFEFEF] mt-[5px] capitalize w-full'>
                              {stripHtmlTags(item.short_description)}
                            </p>
                          </div>
                          <Link to={`${item.video_url}`} target='_blank'>
                            <LazyLoadImage src={playButton} alt='mma' />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesBody;
