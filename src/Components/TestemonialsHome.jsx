import React, { useState, useEffect } from 'react';
import './TestemonialsHome.css';
import TestemonialCard from './TestemonialCard';

const TestemonialsHome = () => {
  const testimonials = [
    {
      name: 'New Customer',
      text: 'This is a new testimonial added for demonstration purposes.',
    },
    {
      name: 'Samer Singh',
      text: 'The service is top class the staff is super experienced overall the best class experience. Great offers too. I loved the experience here. 100% recommended.',
    },
    {
      name: 'New Customer',
      text: 'This is a new testimonial added for demonstration purposes.',
    },
    {
      name: 'Samer Singh',
      text: 'The service is top class the staff is super experienced overall the best class experience. Great offers too. I loved the experience here. 100% recommended.',
    },
  ];

  const [index, setIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(100);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const nextSlide = () => {
    if (slideWidth === 33.33) {
      if (index <= testimonials.length - 4) {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }
    } else {
      if (index < testimonials.length - 1) {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }
    }
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setShowRightArrow(true);
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (slideWidth === 33.33) {
        if (index === testimonials.length - 3) {
          setIndex(0);
        } else if (index < testimonials.length - 3) {
          nextSlide();
        }
      } else {
        if (index === testimonials.length - 1) {
          setIndex(0);
        } else {
          nextSlide();
        }
      }
    }, 10000);

    return () => {
      clearInterval(autoScroll);
    };
  }, [index, slideWidth, testimonials.length]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 425) {
        setSlideWidth(100);
      } else if (width <= 640) {
        setSlideWidth(50);
      } else {
        setSlideWidth(33.33);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize, { passive: true });
  }, []);

  useEffect(() => {
    setShowRightArrow(index < testimonials.length - 3);
  }, [index, testimonials.length]);

  return (
    <div className='testimonialsHomeWrapper'>
      <div className='testimonialsContainer'>
        <h2>Hear what our customers say about us</h2>
        {index > 0 && (
          <div className='arrow leftArrow' onClick={prevSlide}>
            <span className="material-symbols-outlined chevron-arrow">chevron_left</span>
          </div>
        )}
        <div className="testimonialBoxWrapper">
          <div
            className='testimonialSlider'
            style={{
              transform: `translateX(-${index * slideWidth}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className='testimonialCardWrapper'>
                <TestemonialCard 
                  name={testimonial.name} 
                  text={testimonial.text.length > 150 ? `${testimonial.text.slice(0, 150)}...` : testimonial.text} 
                />
              </div>
            ))}
          </div>
        </div>
        {showRightArrow && (
          <div className='arrow rightArrow' onClick={nextSlide}>
            <span className="material-symbols-outlined chevron-arrow">chevron_right</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestemonialsHome;