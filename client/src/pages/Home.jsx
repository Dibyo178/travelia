import React from 'react';
import Hero from '../components/Hero';
import PopularDestinations from '../components/PopularDestinations';
import ExploreNearby from '../components/ExploreNearby';
import GetToKnowUs from '../components/GetToKnowUs';
import RecommendedTrips from '../components/RecommendedTrips';

const Home = () => {
  return (
    <main>
      <Hero />
      <PopularDestinations />
      <ExploreNearby />
      <GetToKnowUs/>
      <RecommendedTrips/>
    </main>
  );
};

export default Home;