import React, { Fragment, useState, useEffect } from 'react';
import './Shop.css';
import { getPetLists } from '../../actions/shop';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Pets = ({ getPetLists, petLists }) => {
  useEffect(() => {
    getPetLists();
  }, [getPetLists]);

  const pets = ['Dog', 'Cat', 'Bird', 'Aquarium', 'Small', 'Reptile'];
  console.log(petLists[pets[0]]);
  return (
    <Fragment>
      <div className='ShopBackground' style={{ height: '610px' }}></div>
      <div className='PetGrid'>
        {pets.map((pet) => {
          return (
            <div className='PetContainer'>
              <h1 className='PetContainerTitle'>{pet}</h1>
              <div className='TopPetContainer'>
                {petLists[pet] &&
                  petLists[pet].map((item, i) => {
                    if (i < 2) {
                      return (
                        <div className='PetContainerItemContainer'>
                          <img
                            className='PetContainerImage'
                            src={`api/inventory/image/${item.image_filename}`}
                            alt={item.image_filename}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
              <div className='BottomPetContainer'>
                {petLists[pet] &&
                  petLists[pet].map((item, i) => {
                    if (i >= 2) {
                      return (
                        <div className='PetContainerItemContainer'>
                          <img
                            className='PetContainerImage'
                            src={`api/inventory/image/${item.image_filename}`}
                            alt={item.image_filename}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

Pets.propTypes = {
  getPetLists: PropTypes.func.isRequired,
  petLists: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  petLists: state.shop.petLists,
});

export default connect(mapStateToProps, { getPetLists })(Pets);
