import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
const items = [
  {
    src: 'https://m.media-amazon.com/images/I/710oKdXHsYL._UY560_.jpg',
    altText: 'Slide 1',
    caption: '2018 Hyundai Elantra SEL',
  },
  {
    src: 'https://m.media-amazon.com/images/I/71NucV5x2BL._UY560_.jpg',
    altText: 'Slide 2',
    caption: '2018 Chevrolet Cruze LT',
  },
  {
    src: 'https://m.media-amazon.com/images/I/71X5lEQqlkL._UY560_.jpg',
    altText: 'Slide 3',
    caption: '2018 Ford Fusion SE',
  },
  {
    src: 'https://m.media-amazon.com/images/I/71qEmibN65L._UY560_.jpg',
    altText: 'Slide 4',
    caption: '2018 Nissan Sentra S',
  },
  {
    src: 'https://m.media-amazon.com/images/I/71RN6Mi9SsL._UY560_.jpg',
    altText: 'Slide 5',
    caption: '2017 Nissan Altima 2.5 SV',
  },
  {
    src: 'https://m.media-amazon.com/images/I/71aR7YBvK8L._UY560_.jpg',
    altText: 'Slide 6',
    caption: '2018 Honda Accord Sport 1.5T',
  },
  {
    src: 'https://m.media-amazon.com/images/I/719Ni6IqnCL._UY560_.jpg',
    altText: 'Slide 7',
    caption: '2018 Toyota Corolla SE',
  },
  {
    src: 'https://m.media-amazon.com/images/I/71T1xLp8iRL._UY560_.jpg',
    altText: 'Slide 8',
    caption: '2018 Toyota Camry XSE',
  }
];
class PopularSedanCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
  onExiting() {
    this.animating = true;
  }
  onExited() {
    this.animating = false;
  }
  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }
  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }
  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  render() {
    const { activeIndex } = this.state;
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionHeader={item.caption} />
        </CarouselItem>
      );
    });
    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}
export default PopularSedanCarousel;
