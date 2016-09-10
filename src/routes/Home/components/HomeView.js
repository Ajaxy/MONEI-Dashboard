import React from 'react';
import Footer from 'components/Footer';

export const HomeView = () => (
  <div className="ui text big">
    <section className="ui very padded basic segment">
      <div className="ui centered grid">
        <div className="fourteen wide aligned center column">
          <h1 className="ui centered header" style={{fontSize: '4em'}}>Welcome to MONEI</h1>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default HomeView;
