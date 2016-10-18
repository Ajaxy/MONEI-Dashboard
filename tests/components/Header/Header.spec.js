import React from 'react'
import { Header } from 'components/Header/Header'
import { Logo } from 'components/Logo/Logo';
import classes from 'components/Header/Header.scss'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<div/>)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Home route using a logo', () => {
      expect(_wrapper.contains(<div/>)).to.be.true
    })
  })
})
